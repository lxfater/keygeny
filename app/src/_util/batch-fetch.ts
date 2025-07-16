import { DataProvider } from "@refinedev/core";

interface BatchFetchOptions {
  resource: string;
  pageSize?: number;
  delay?: number;
  onProgress?: (current: number, total: number) => void;
  dataProvider: DataProvider;
}

// 延迟函数
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 批量获取所有数据
export const fetchAllData = async (options: BatchFetchOptions): Promise<any[]> => {
  const {
    resource,
    pageSize = 100,
    delay = 500, // 默认500ms延迟
    onProgress,
    dataProvider
  } = options;

  let allData: any[] = [];
  let currentPage = 1;
  let hasMoreData = true;

  // 先获取第一页来获取总数
  const firstPageResult = await dataProvider.getList({
    resource,
    pagination: {
      current: currentPage,
      pageSize: pageSize,
    },
  });

  if (!firstPageResult.data || firstPageResult.data.length === 0) {
    return allData;
  }

  allData = [...firstPageResult.data];
  const totalCount = firstPageResult.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 通知进度
  if (onProgress) {
    onProgress(allData.length, totalCount);
  }

  // 如果只有一页，直接返回
  if (totalPages <= 1) {
    return allData;
  }

  // 继续获取剩余页面
  currentPage = 2;
  
  while (currentPage <= totalPages && hasMoreData) {
    // 添加延迟，避免服务器负担
    await sleep(delay);

    try {
      const result = await dataProvider.getList({
        resource,
        pagination: {
          current: currentPage,
          pageSize: pageSize,
        },
      });

      if (result.data && result.data.length > 0) {
        allData = [...allData, ...result.data];
        
        // 通知进度
        if (onProgress) {
          onProgress(allData.length, totalCount);
        }

        currentPage++;
      } else {
        hasMoreData = false;
      }
    } catch (error) {
      console.error(`Error fetching page ${currentPage}:`, error);
      hasMoreData = false;
    }
  }

  return allData;
};

// 批量获取关联数据
export const fetchRelatedData = async (
  ids: string[],
  resource: string,
  dataProvider: DataProvider,
  batchSize = 50,
  delay = 300
): Promise<any[]> => {
  if (!ids || ids.length === 0) {
    return [];
  }

  // 去重
  const uniqueIds = Array.from(new Set(ids));
  const allData: any[] = [];

  // 分批获取
  for (let i = 0; i < uniqueIds.length; i += batchSize) {
    const batchIds = uniqueIds.slice(i, i + batchSize);
    
    // 添加延迟
    if (i > 0) {
      await sleep(delay);
    }

    try {
      const result = await dataProvider.getMany?.({
        resource,
        ids: batchIds,
      });

      if (result?.data) {
        allData.push(...result.data);
      }
    } catch (error) {
      console.error(`Error fetching batch for ${resource}:`, error);
      // 如果批量获取失败，尝试单个获取
      for (const id of batchIds) {
        try {
          const singleResult = await dataProvider.getOne({
            resource,
            id,
          });
          if (singleResult?.data) {
            allData.push(singleResult.data);
          }
          // 单个获取时也要添加小延迟
          await sleep(100);
        } catch (singleError) {
          console.error(`Error fetching single item ${id}:`, singleError);
        }
      }
    }
  }

  return allData;
};
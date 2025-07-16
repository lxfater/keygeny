import * as XLSX from 'xlsx';

export interface ExcelColumn {
  key: string;
  title: string;
  width?: number;
  formatter?: (value: any) => string;
}

export interface ExcelExportOptions {
  filename?: string;
  sheetName?: string;
  columns: ExcelColumn[];
  data: any[];
}

export const exportToExcel = (options: ExcelExportOptions) => {
  const {
    filename = 'export',
    sheetName = 'Sheet1',
    columns,
    data
  } = options;

  // 创建工作簿
  const wb = XLSX.utils.book_new();

  // 准备表头
  const headers = columns.map(col => col.title);

  // 准备数据行
  const rows = data.map(item => 
    columns.map(col => {
      const value = getNestedValue(item, col.key);
      return col.formatter ? col.formatter(value) : value;
    })
  );

  // 合并表头和数据
  const wsData = [headers, ...rows];

  // 创建工作表
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // 设置列宽
  const colWidths = columns.map(col => ({ width: col.width || 15 }));
  ws['!cols'] = colWidths;

  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // 导出文件
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const fullFilename = `${filename}-${timestamp}.xlsx`;
  
  XLSX.writeFile(wb, fullFilename);
};

// 获取嵌套对象的值
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : '';
  }, obj);
};

// 格式化日期
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString();
};

// 格式化布尔值
export const formatBoolean = (value: boolean): string => {
  return value ? 'Yes' : 'No';
};
import React from "react";
import {useTable} from "@refinedev/react-table";
import {type ColumnDef, flexRender} from "@tanstack/react-table";
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField, BooleanField,
} from "@refinedev/mantine";

import {
  Box,
  Group,
  ScrollArea,
  Table,
  Pagination, Loader,
  Button,
} from "@mantine/core";

import {ColumnFilter, ColumnSorter} from "../../components";
import IProduct from "../../interfaces/product";
import {GetManyResponse, useMany, useDataProvider} from "@refinedev/core";
import IPolicy from "../../interfaces/policy";
import ILicense from "../../interfaces/license";
import {IconCheck, IconX, IconDownload} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import classes from "../../_util/styles/List.module.css"
import { exportToExcel, formatDate, formatBoolean } from "../../_util/excel-export";
import { fetchAllData, fetchRelatedData } from "../../_util/batch-fetch";
import { showNotification, updateNotification } from "@mantine/notifications";

export const LicenseList: React.FC = () => {
  const dataProvider = useDataProvider();
  const [isExporting, setIsExporting] = React.useState(false);
  const columns = React.useMemo<ColumnDef<ILicense>[]>(
    () => [
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({getValue}) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as number}/>
              <EditButton hideText recordItemId={getValue() as number}/>
              <DeleteButton hideText recordItemId={getValue() as number}/>
            </Group>
          );
        },
      },
      {
        id: "product",
        header: "Product",
        enableColumnFilter: false,
        accessorKey: "relationships.product.data.id",
        meta: {
          filterOperator: "contains",
        },
        cell: function render({getValue, table}) {
          const id = getValue() as string;
          const meta = table.options.meta as {
            productsData: GetManyResponse<IProduct>;
          };
          const product = meta.productsData?.data.find(
            (item) => item.id === id,
          );
          return product ? <Link to={`/products/show/${id}`} className={classes.listLink}>{product?.attributes.name}</Link> : "Loading...";
        },
      },
      {
        id: "policy",
        header: "Policy",
        enableColumnFilter: false,
        enableSorting: false,
        accessorKey: "relationships.policy.data.id",
        cell: function render({getValue, table}) {
          const id = getValue() as string;
          const meta = table.options.meta as {
            policyData: GetManyResponse<IPolicy>;
          };
          const policy = meta.policyData?.data.find(
            (item) => item.id === id,
          );
          return policy ? <Link to={`/policies/show/${id}`} className={classes.listLink}>{policy?.attributes.name}</Link> : "Loading...";
        },
      },
      {
        id: "name",
        header: "Name",
        accessorKey: "attributes.name",
      },
      {
        id: "key",
        header: "Key",
        accessorKey: "attributes.key",
      },
      // {
      //     id: "expiry",
      //     header: "Expiry",
      //     accessorKey: "attributes.expiry",
      // },
      {
        id: "status",
        header: "Status",
        accessorKey: "attributes.status",
      },
      {
        id: "uses",
        header: "Uses",
        accessorKey: "attributes.uses",
      },
      // {
      //     id: "protected",
      //     header: "Protected",
      //     accessorKey: "attributes.protected",
      // },
      // {
      //     id: "version",
      //     header: "Version",
      //     accessorKey: "attributes.version",
      // },
      {
        id: "suspended",
        header: "Suspended",
        accessorKey: "attributes.suspended",
        cell: function render({getValue}) {
          return (
            <BooleanField value={getValue() as boolean}
                          trueIcon={<IconCheck />}
                          falseIcon={<IconX />}
            />
          );
        },
      },
      // {
      //     id: "floating",
      //     header: "Floating",
      //     accessorKey: "attributes.floating",
      // },
      // {
      //     id: "scheme",
      //     header: "Scheme",
      //     accessorKey: "attributes.scheme",
      // },
      // {
      //     id: "strict",
      //     header: "Strict",
      //     accessorKey: "attributes.strict",
      // },
      // {
      //     id: "encrypted",
      //     header: "Encrypted",
      //     accessorKey: "attributes.encrypted",
      // },
      // {
      //     id: "maxMachines",
      //     header: "Max Machines",
      //     accessorKey: "attributes.maxMachines",
      // },
      // {
      //     id: "maxProcesses",
      //     header: "Max Processes",
      //     accessorKey: "attributes.maxProcesses",
      // },
      // {
      //     id: "maxUsers",
      //     header: "Max Users",
      //     accessorKey: "attributes.maxUsers",
      // },
      // {
      //     id: "maxCores",
      //     header: "Max Cores",
      //     accessorKey: "attributes.maxCores",
      // },
      // {
      //     id: "maxUses",
      //     header: "Max Uses",
      //     accessorKey: "attributes.maxUses",
      // },
      // {
      //     id: "requireHeartbeat",
      //     header: "Require Heartbeat",
      //     accessorKey: "attributes.requireHeartbeat",
      // },
      // {
      //     id: "requireCheckIn",
      //     header: "Require Check In",
      //     accessorKey: "attributes.requireCheckIn",
      // },
      {
        id: "lastValidated",
        header: "Last Validated",
        accessorKey: "attributes.lastValidated",
        cell: function render({getValue}) {
          return <DateField value={getValue() as string} format="LLL"/>;
        },
      },
      {
        id: "lastCheckIn",
        header: "Last Check In",
        accessorKey: "attributes.lastCheckIn",
        cell: function render({getValue}) {
          return <DateField value={getValue() as string} format="LLL"/>;
        },
      },
      // {
      //     id: "nextCheckIn",
      //     header: "Next Check In",
      //     accessorKey: "attributes.nextCheckIn",
      //     cell: function render({getValue}) {
      //         return <DateField value={getValue() as string} format="LLL"/>;
      //     },
      // },
      // {
      //     id: "lastCheckOut",
      //     header: "Last Check Out",
      //     accessorKey: "attributes.lastCheckOut",
      //     cell: function render({getValue}) {
      //         return <DateField value={getValue() as string} format="LLL"/>;
      //     },
      // },
      {
        "id": "created",
        "header": "Created",
        "accessorKey": "attributes.created",
        cell: function render({getValue}) {
          return <DateField value={getValue() as string} format="LLL"/>;
        },
      },
      {
        "id": "updated",
        "header": "Updated",
        "accessorKey": "attributes.updated",
        cell: function render({getValue}) {
          return <DateField value={getValue() as string} format="LLL"/>;
        },
      },
      // {
      //   id: "status",
      //   header: "Status",
      //   accessorKey: "status",
      //   meta: {
      //     filterElement: function render(props: FilterElementProps) {
      //       return (
      //         <Select
      //           defaultValue="published"
      //           data={[
      //             { label: "Published", value: "published" },
      //             { label: "Draft", value: "draft" },
      //             { label: "Rejected", value: "rejected" },
      //           ]}
      //           {...props}
      //         />
      //       );
      //     },
      //     filterOperator: "eq",
      //   },
      // },
      // {
      //   id: "category.id",
      //   header: "Category",
      //   enableColumnFilter: false,
      //   accessorKey: "category.id",
      //   cell: function render({ getValue, table }) {
      //     const meta = table.options.meta as {
      //       categoriesData: GetManyResponse<ICategory>;
      //     };
      //     const category = meta.categoriesData?.data.find(
      //       (item) => item.id === getValue(),
      //     );
      //     return category?.title ?? "Loading...";
      //   },
      // },
      // {
      //   id: "createdAt",
      //   header: "Created At",
      //   accessorKey: "createdAt",
      //   cell: function render({ getValue }) {
      //     return <DateField value={getValue() as string} format="LLL" />;
      //   },
      //   enableColumnFilter: false,
      // },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQuery: {data: tableData, isLoading},
    },
  } = useTable({
    columns,
    refineCoreProps: {
      pagination: {
        pageSize: 100,
      },
    },
  });
  // const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
  // const { data: categoriesData } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  // Here we get relational data. For example a license's related policy and product.
  // We pass this in to the meta so it can display on the list using the column definitions above.
  const productIds = tableData?.data?.map((item) => item.relationships.product.data.id) ?? [];
  const {data: productsData} = useMany<IProduct>({
    resource: "products",
    ids: productIds,
    queryOptions: {
      enabled: productIds.length > 0,
    },
  });
  const policyIds = tableData?.data?.map((item) => item.relationships.policy.data.id) ?? [];
  const {data: policyData} = useMany<IPolicy>({
    resource: "policies",
    ids: policyIds,
    queryOptions: {
      enabled: productIds.length > 0,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      productsData,
      policyData,
      // categoriesData,
    },
  }));

  const handleExportExcel = async () => {
    setIsExporting(true);
    
    const notificationId = 'export-notification';
    
    showNotification({
      id: notificationId,
      title: 'Exporting data',
      message: 'Fetching all licenses...',
      loading: true,
      autoClose: false,
    });

    try {
      // 获取所有 licenses 数据
      const allLicenses = await fetchAllData({
        resource: 'licenses',
        pageSize: 100,
        delay: 500,
        dataProvider: dataProvider(),
        onProgress: (current, total) => {
          updateNotification({
            id: notificationId,
            title: 'Exporting data',
            message: `Fetching licenses: ${current} / ${total}`,
            loading: true,
            autoClose: false,
          });
        },
      });

      // 提取所有 product 和 policy ID
      const productIds = [...new Set(allLicenses.map(l => l.relationships?.product?.data?.id).filter(Boolean))];
      const policyIds = [...new Set(allLicenses.map(l => l.relationships?.policy?.data?.id).filter(Boolean))];

      updateNotification({
        id: notificationId,
        title: 'Exporting data',
        message: 'Fetching related products...',
        loading: true,
        autoClose: false,
      });

      // 批量获取 products
      const products = await fetchRelatedData(
        productIds,
        'products',
        dataProvider(),
        50,
        300
      );

      updateNotification({
        id: notificationId,
        title: 'Exporting data',
        message: 'Fetching related policies...',
        loading: true,
        autoClose: false,
      });

      // 批量获取 policies
      const policies = await fetchRelatedData(
        policyIds,
        'policies',
        dataProvider(),
        50,
        300
      );

      // 创建映射以便快速查找
      const productMap = new Map(products.map(p => [p.id, p]));
      const policyMap = new Map(policies.map(p => [p.id, p]));

      // 准备导出数据
      const exportData = allLicenses.map(license => {
        const productId = license.relationships?.product?.data?.id;
        const policyId = license.relationships?.policy?.data?.id;
        
        const product = productMap.get(productId);
        const policy = policyMap.get(policyId);
        
        return {
          id: license.id,
          product: product?.attributes?.name || '',
          policy: policy?.attributes?.name || '',
          name: license.attributes?.name || '',
          key: license.attributes?.key || '',
          status: license.attributes?.status || '',
          uses: license.attributes?.uses || 0,
          suspended: license.attributes?.suspended || false,
          lastValidated: license.attributes?.lastValidated || '',
          lastCheckIn: license.attributes?.lastCheckIn || '',
          created: license.attributes?.created || '',
          updated: license.attributes?.updated || '',
        };
      });

      exportToExcel({
        filename: 'licenses-all',
        sheetName: 'All Licenses',
        columns: [
          { key: 'id', title: 'ID', width: 10 },
          { key: 'product', title: 'Product', width: 20 },
          { key: 'policy', title: 'Policy', width: 20 },
          { key: 'name', title: 'Name', width: 25 },
          { key: 'key', title: 'Key', width: 40 },
          { key: 'status', title: 'Status', width: 15 },
          { key: 'uses', title: 'Uses', width: 10 },
          { key: 'suspended', title: 'Suspended', width: 15, formatter: formatBoolean },
          { key: 'lastValidated', title: 'Last Validated', width: 20, formatter: formatDate },
          { key: 'lastCheckIn', title: 'Last Check In', width: 20, formatter: formatDate },
          { key: 'created', title: 'Created', width: 20, formatter: formatDate },
          { key: 'updated', title: 'Updated', width: 20, formatter: formatDate },
        ],
        data: exportData,
      });

      updateNotification({
        id: notificationId,
        color: 'green',
        title: 'Export successful',
        message: `Exported ${exportData.length} licenses to Excel`,
        loading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Export error:', error);
      updateNotification({
        id: notificationId,
        color: 'red',
        title: 'Export failed',
        message: error instanceof Error ? error.message : 'An error occurred during export',
        loading: false,
        autoClose: 5000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <ScrollArea>
        <List>
          <Loader/>
        </List>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea>
      <List
        headerButtons={
          <Button
            onClick={handleExportExcel}
            leftIcon={<IconDownload size={16} />}
            variant="outline"
            loading={isExporting}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export All to Excel'}
          </Button>
        }
      >
        <Table highlightOnHover>
          <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {!header.isPlaceholder && (
                      <Group spacing="xs" noWrap>
                        <Box>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Box>
                        <Group spacing="xs" noWrap>
                          <ColumnSorter column={header.column}/>
                          <ColumnFilter column={header.column}/>
                        </Group>
                      </Group>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
          </thead>
          <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          </tbody>
        </Table>
        <br/>
        <Pagination
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
        />
      </List>
    </ScrollArea>
  );
};

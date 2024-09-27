import React from "react";
import {useShow} from "@refinedev/core";

import {Show} from "@refinedev/mantine";
import {Group, Loader, Stack, Table, Title} from "@mantine/core";
import IProduct from "../../interfaces/product";
import MetadataTable from "../../components/MetadataTable";
import GenerateProductToken from "./components/GenerateProductToken";

export const ProductShow: React.FC = () => {
  const {query: queryResult} = useShow<IProduct>();
  const {data, isLoading} = queryResult;
  const record = data?.data;


  if (!record || isLoading) {
    return (
      <Show>
        <Loader/>
      </Show>
    )
  }
  return (
    <Show isLoading={isLoading}>
      <Group>
        <Stack>
          <GenerateProductToken refetch={queryResult.refetch} />
        </Stack>
      </Group>
      <Table highlightOnHover>
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Name</td>
          <td>{record?.attributes.name}</td>
        </tr>
        <tr>
          <td>Distribution Strategy</td>
          <td>{record?.attributes.distributionStrategy ? record?.attributes.distributionStrategy : "null"}</td>
        </tr>
        <tr>
          <td>Platform</td>
          <td>{record?.attributes.platforms}</td>
        </tr>
        </tbody>
      </Table>
      {
        record &&
        <>
          <Title mt="xs" order={5}>Metadata</Title>
          <MetadataTable record={record}/>
        </>
      }
    </Show>
  );
};

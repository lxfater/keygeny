import React from "react";
import {useShow} from "@refinedev/core";

import {Show} from "@refinedev/mantine";
import {Loader, Table, Title} from "@mantine/core";
import IEntitlement from "../../interfaces/entitlement";
import MetadataTable from "../../components/MetadataTable";


export const EntitlementShow: React.FC = () => {
  const {query: queryResult} = useShow<IEntitlement>();
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
          <td>Code</td>
          <td>{record?.attributes.code}</td>
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

      {/*<Title mt="xs" order={5}>*/}
      {/*  Category*/}
      {/*</Title>*/}
      {/*<Text mt="xs">{categoryData?.data?.title}</Text>*/}
    </Show>
  );
};

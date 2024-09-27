import React from "react";
import {useShow} from "@refinedev/core";

import {Show} from "@refinedev/mantine";
import {Loader, Table, Title} from "@mantine/core";
import IComponent from "../../interfaces/component";
import MetadataTable from "../../components/MetadataTable";


export const ComponentShow: React.FC = () => {
  const {query: queryResult} = useShow<IComponent>();
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
          <td>Fingerprint</td>
          <td>{record?.attributes.fingerprint}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{record?.attributes.name}</td>
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

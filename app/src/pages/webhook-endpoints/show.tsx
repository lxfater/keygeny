import React from "react";
import {useShow} from "@refinedev/core";

import {Show} from "@refinedev/mantine";
import {Loader, Table, Title} from "@mantine/core";
import MetadataTable from "../../components/MetadataTable";
import IWebhook from "../../interfaces/webhook";


export const WebhookShow: React.FC = () => {
  const {query: queryResult} = useShow<IWebhook>();
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
          <td>Url</td>
          <td>{record?.attributes.url}</td>
        </tr>
        <tr>
          <td>Subscriptions</td>
          <td>{record?.attributes.subscriptions}</td>
        </tr>
        </tbody>
      </Table>
    </Show>
  );
};

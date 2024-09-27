import React from "react";
import {useShow} from "@refinedev/core";

import {DateField, Show} from "@refinedev/mantine";
import {Checkbox, Loader, Table, Text, Title} from "@mantine/core";
import MetadataTable from "../../components/MetadataTable";
import IProcess from "../../interfaces/process";
import formatSeconds from "../../_util/resource/formatSeconds";


export const ProcessShow: React.FC = () => {
    const { query: queryResult } = useShow<IProcess>();
    const { data, isLoading } = queryResult;
    const record = data?.data;


    if(!record || isLoading) {
      return (
        <Show>
          <Loader />
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
              <td>Id</td>
              <td>{record?.attributes.pid}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{record?.attributes.status}</td>
            </tr>
            <tr>
              <td>Last Heartbeat</td>
              <td><DateField value={record?.attributes.lastHeartbeat} format={"LLL"}/></td>
            </tr>
            <tr>
              <td>Next Heartbeat</td>
              <td><DateField value={record?.attributes.nextHeartbeat} format={"LLL"}/></td>
            </tr>
            <tr>
              <td>Interval</td>
              <td>{formatSeconds(Number(record?.attributes.interval), true)}</td>
            </tr>
            <tr>
              <td>Created</td>
              <td><DateField value={record?.attributes.created} format={"LLL"}/></td>
            </tr>
            <tr>
              <td>Updated</td>
              <td><DateField value={record?.attributes.updated} format={"LLL"}/></td>
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

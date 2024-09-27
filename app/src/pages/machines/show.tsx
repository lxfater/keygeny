import React from "react";
import {useShow} from "@refinedev/core";

import {DateField, Show} from "@refinedev/mantine";
import {Loader, Table, Title} from "@mantine/core";
import MetadataTable from "../../components/MetadataTable";
import IMachine from "../../interfaces/machine";
import formatSeconds from "../../_util/resource/formatSeconds";


export const MachineShow: React.FC = () => {
  const {query: queryResult} = useShow<IMachine>();
  const {data, isLoading} = queryResult;
  const record = data?.data

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
          <td>Cores</td>
          <td>{record?.attributes.cores}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{record?.attributes.name}</td>
        </tr>
        <tr>
          <td>IP</td>
          <td>{record?.attributes.ip}</td>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>{record?.attributes.hostname}</td>
        </tr>
        <tr>
          <td>Platform</td>
          <td>{record?.attributes.platform}</td>
        </tr>
        <tr>
          <td>Max Processes</td>
          <td>{record?.attributes.maxProcesses}</td>
        </tr>
        <tr>
          <td>Require Heartbeat</td>
          <td>{record?.attributes.requireHeartbeat}</td>
        </tr>
        <tr>
          <td>Heartbeat Status</td>
          <td>{record?.attributes.heartbeatStatus}</td>
        </tr>
        <tr>
          <td>Heartbeat Duration</td>
          <td>{formatSeconds(Number(record?.attributes.heartbeatDuration), true)}</td>
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
          <td>Last Check Out</td>
          <td><DateField value={record?.attributes.lastCheckOut} format={"LLL"}/></td>
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

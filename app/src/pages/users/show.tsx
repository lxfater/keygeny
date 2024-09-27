import React from "react";
import {useShow} from "@refinedev/core";

import {Show} from "@refinedev/mantine";
import {Group, Loader, Stack, Table, Title} from "@mantine/core";
import IUser from "../../interfaces/user";
import MetadataTable from "../../components/MetadataTable";
import {BanUnbanUser} from "./components/BanUnbanUser";


export const UserShow: React.FC = () => {
  const {query: queryResult} = useShow<IUser>();
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
          <BanUnbanUser currentlyBanned={record?.attributes.status === "BANNED"} refetch={queryResult.refetch} />
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
          <td>First Name</td>
          <td>{record?.attributes.firstName}</td>
        </tr>

        <tr>
          <td>Last Name</td>
          <td>{record?.attributes.lastName}</td>
        </tr>

        <tr>
          <td>Email</td>
          <td>{record?.attributes.email}</td>
        </tr>

        <tr>
          <td>Status</td>
          <td>{record?.attributes.status}</td>
        </tr>

        <tr>
          <td>Role</td>
          <td>{record?.attributes.role}</td>
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

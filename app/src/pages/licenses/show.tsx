import React from "react";
import {useShow} from "@refinedev/core";

import {DateField, Show} from "@refinedev/mantine";
import {Group, Loader, Space, Stack, Table, Title} from "@mantine/core";
import ILicense from "../../interfaces/license";
import ChangePolicy from "./components/ChangePolicy";
import {SuspensionButton} from "./components/SuspendReinstateLicense";
import CheckoutLicense from "./components/CheckoutLicense";
import IncrementDecrementLicenseUsage from "./components/IncrementDecrementLicenseUsage";
import RenewLicense from "./components/RenewLicense";
import RevokeLicense from "./components/RevokeLicense";
import AddRemoveLicenseEntitlements from "./components/AddRemoveLicenseEntitlements";
import MetadataTable from "../../components/MetadataTable";
import {IconCheck, IconX} from "@tabler/icons-react";

export const LicenseShow: React.FC = () => {
  const {query: queryResult} = useShow<ILicense>();
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
    <>
      <Show isLoading={isLoading}>
        {
          record?.id &&
          <>
            <Group>
              <Stack>
                <Title mt="xs" order={5}>Policy</Title>
                <ChangePolicy currentPolicy={record?.relationships.policy.data.id}/>
                <Space/>
              </Stack>
              <Stack>
                <Title mt="xs" order={5}>Entitlements</Title>
                <AddRemoveLicenseEntitlements
                  refetch={queryResult.refetch}
                  currentLicenseId={record?.id}
                  currentPolicyId={record?.relationships.policy.data.id}
                />
              </Stack>
              <Group>
                <Stack>
                  <IncrementDecrementLicenseUsage refetch={queryResult.refetch}/>
                  <CheckoutLicense refetch={queryResult.refetch}/>
                </Stack>
                <Stack>
                  <RenewLicense refetch={queryResult.refetch}/>
                  <SuspensionButton currentlySuspended={record?.attributes.suspended} refetch={queryResult.refetch}/>
                  <RevokeLicense refetch={queryResult.refetch}/>
                </Stack>
              </Group>
            </Group>
          </>
        }

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
            <td>Key</td>
            <td>{record?.attributes.key}</td>
          </tr>
          <tr>
            <td>Expiry</td>
            <td>{record?.attributes.expiry}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{record?.attributes.status}</td>
          </tr>
          <tr>
            <td>Uses</td>
            <td>{record?.attributes.uses}</td>
          </tr>
          <tr>
            <td>Protected</td>
            <td>{record?.attributes.protected ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{record?.attributes.version}</td>
          </tr>
          <tr>
            <td>Suspended</td>
            <td>{record?.attributes.suspended ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Floating</td>
            <td>{record?.attributes.floating ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Scheme</td>
            <td>{record?.attributes.scheme}</td>
          </tr>
          <tr>
            <td>Strict</td>
            <td>{record?.attributes.strict ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Encrypted</td>
            <td>{record?.attributes.encrypted ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Max Machines</td>
            <td>{record?.attributes.maxMachines}</td>
          </tr>
          <tr>
            <td>Max Processes</td>
            <td>{record?.attributes.maxProcesses}</td>
          </tr>
          <tr>
            <td>Max Users</td>
            <td>{record?.attributes.maxUsers}</td>
          </tr>
          <tr>
            <td>Max Cores</td>
            <td>{record?.attributes.maxCores}</td>
          </tr>
          <tr>
            <td>Max Uses</td>
            <td>{record?.attributes.maxUses}</td>
          </tr>
          <tr>
            <td>Require Heartbeat</td>
            <td>{record?.attributes.requireHeartbeat ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Check In</td>
            <td>{record?.attributes.requireCheckIn ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Last Validated</td>
            <td><DateField value={record?.attributes.lastValidated} format={"LLL"}/></td>
          </tr>
          <tr>
            <td>Last Check In</td>
            <td><DateField value={record?.attributes.lastCheckIn} format={"LLL"}/></td>
          </tr>
          <tr>
            <td>Next Check In</td>
            <td><DateField value={record?.attributes.nextCheckIn} format={"LLL"}/></td>
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
    </>
  );
};

import React from "react";
import {useShow} from "@refinedev/core";

import {Show} from "@refinedev/mantine";
import {Badge, Checkbox, Loader, Table, Text, Title} from "@mantine/core";
import IPolicy from "../../interfaces/policy";
import AddRemovePolicyEntitlements from "./components/AddRemovePolicyEntitlements";
import MetadataTable from "../../components/MetadataTable";
import {IconCheck, IconX} from "@tabler/icons-react";


export const PolicyShow: React.FC = () => {
  const { query } = useShow<IPolicy>();
  const { data, isLoading } = query;
  const record = data?.data;

  if(!record || isLoading) {
    return (
      <Show>
        <Loader />
      </Show>
    )
  }
  return (
    <>
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
            <td>Duration</td>
            <td>{record?.attributes.duration}</td>
          </tr>
          <tr>
            <td>Strict</td>
            <td>{record?.attributes.strict ? <IconCheck/> : <IconX/>}</td>
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
            <td>Require Product Scope</td>
            <td>{record?.attributes.requireProductScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Policy Scope</td>
            <td>{record?.attributes.requirePolicyScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Machine Scope</td>
            <td>{record?.attributes.requireMachineScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Fingerprint Scope</td>
            <td>{record?.attributes.requireFingerprintScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Components Scope</td>
            <td>{record?.attributes.requireComponentsScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require User Scope</td>
            <td>{record?.attributes.requireUserScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Checksum Scope</td>
            <td>{record?.attributes.requireChecksumScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Version Scope</td>
            <td>{record?.attributes.requireVersionScope ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Check In</td>
            <td>{record?.attributes.requireCheckIn ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Check In Interval</td>
            <td>{record?.attributes.checkInInterval}</td>
          </tr>
          <tr>
            <td>Check In Interval Count</td>
            <td>{record?.attributes.checkInIntervalCount}</td>
          </tr>
          <tr>
            <td>Use Pool</td>
            <td>{record?.attributes.usePool ? <IconCheck/> : <IconX/>}</td>
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
            <td>Encrypted</td>
            <td>{record?.attributes.encrypted ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Protected</td>
            <td>{record?.attributes.protected ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Require Heartbeat</td>
            <td>{record?.attributes.requireHeartbeat ? <IconCheck/> : <IconX/>}</td>
          </tr>
          <tr>
            <td>Heartbeat Duration</td>
            <td>{record?.attributes.heartbeatDuration}</td>
          </tr>
          <tr>
            <td>Heartbeat Cull Strategy</td>
            <td>{ record?.attributes.heartbeatCullStrategy && <Badge>{record?.attributes.heartbeatCullStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Heartbeat Resurrection Strategy</td>
            <td>{ record?.attributes.heartbeatResurrectionStrategy && <Badge>{record?.attributes.heartbeatResurrectionStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Heartbeat Basis</td>
            <td>{ record?.attributes.heartbeatBasis && <Badge>{record?.attributes.heartbeatBasis}</Badge>}</td>
          </tr>
          <tr>
            <td>Machine Uniqueness Strategy</td>
            <td>{ record?.attributes.machineUniquenessStrategy && <Badge>{record?.attributes.machineUniquenessStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Machine Matching Strategy</td>
            <td>{ record?.attributes.machineMatchingStrategy && <Badge>{record?.attributes.machineMatchingStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Component Uniqueness Strategy</td>
            <td>{ record?.attributes.componentUniquenessStrategy && <Badge>{record?.attributes.componentUniquenessStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Component Matching Strategy</td>
            <td>{ record?.attributes.componentMatchingStrategy && <Badge>{record?.attributes.componentMatchingStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Expiration Strategy</td>
            <td>{ record?.attributes.expirationStrategy && <Badge>{record?.attributes.expirationStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Expiration Basis</td>
            <td>{ record?.attributes.expirationBasis && <Badge>{record?.attributes.expirationBasis}</Badge>}</td>
          </tr>
          <tr>
            <td>Renewal Basis</td>
            <td>{ record?.attributes.renewalBasis && <Badge>{record?.attributes.renewalBasis}</Badge>}</td>
          </tr>
          <tr>
            <td>Transfer Strategy</td>
            <td>{ record?.attributes.transferStrategy && <Badge>{record?.attributes.transferStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Authentication Strategy</td>
            <td>{ record?.attributes.authenticationStrategy && <Badge>{record?.attributes.authenticationStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Machine Leasing Strategy</td>
            <td>{ record?.attributes.machineLeasingStrategy && <Badge>{record?.attributes.machineLeasingStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Process Leasing Strategy</td>
            <td>{ record?.attributes.processLeasingStrategy && <Badge>{record?.attributes.processLeasingStrategy}</Badge>}</td>
          </tr>
          <tr>
            <td>Overage Strategy</td>
            <td>{ record?.attributes.overageStrategy && <Badge>{record?.attributes.overageStrategy}</Badge>}</td>
          </tr>
          </tbody>
        </Table>

        {
          record &&
          <>
            <Title size={"h3"} mt={8} order={5}>Metadata</Title>
            <MetadataTable record={record}/>
          </>
        }
        {
          record?.id &&
          <>
            <Title size={"h3"} mt={8} order={5}>Entitlements</Title>
            <AddRemovePolicyEntitlements currentPolicyId={record?.id} refetch={query.refetch}/>
          </>
        }
      </Show>
    </>
  );
};

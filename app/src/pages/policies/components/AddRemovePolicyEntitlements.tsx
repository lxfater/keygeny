import {useSelect} from "@refinedev/mantine";
import IEntitlement from "../../../interfaces/entitlement";
import appState from "../../../_util/appState";
import {useCustom, useNotification} from "@refinedev/core";
import {Accordion, Button, Loader} from "@mantine/core";
import {useState} from "react";
import {FilteredEntitlementResponse, filteredEntitlements} from "../../../_util/resource/entitlement";

const NOTIFICATION_ID = "entitlement-change"
const status: {[key: number]: string} = {
  200: "attached",
  204: "detached",
}

export default function AddRemovePolicyEntitlements({currentPolicyId, refetch}: {currentPolicyId: string, refetch: () => void}) {
  const apiUrl = appState.getState().apiUrl
  const { open, close } = useNotification();

  const handleDetachAttachClick = async (attached: boolean, entitlementId: string) => {
    const apiUrl = appState.getState().apiUrl
    const apiToken = appState.getState().apiToken
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)
    headers.append("Accept", "application/vnd.api+json")
    headers.append("Content-Type", "application/vnd.api+json")

    const res = await fetch(`${apiUrl}/policies/${currentPolicyId}/entitlements`, {
      method: attached ? "DELETE" : "POST",
      headers,
      body: JSON.stringify({
        data: [
          {
            type: "entitlements",
            id: entitlementId,
          }
        ]
      })
    })
    if([200, 204].includes(res.status)) {
      open?.({type: "success", message: `The entitlement has been ${status[res.status]}`})
      close?.(NOTIFICATION_ID)
      refetch()
    } else if(res.status === 422) {
      const data = await res.json()
      open?.({type: data.errors[0].title, message: data.errors[0].detail})
      close?.(NOTIFICATION_ID)
      refetch()
    }
  return await res.json()
  }
  // Gets all Entitlement objects
  const { selectProps, query } = useSelect<IEntitlement>({
    resource: "entitlements",
    // @ts-ignore
    optionLabel: "attributes.name",
  });

  // This gets the current entitlements for the policy
  const { data, isLoading } = useCustom<IEntitlement[]>({ url: `${apiUrl}/policies/${currentPolicyId}/entitlements`, method: "get" });

  let processedEntitlements: FilteredEntitlementResponse[] = [];
  if( (!isLoading && data !== undefined) && (!query.isLoading && query.data !== undefined) ) {
    // @ts-ignore
    processedEntitlements = filteredEntitlements(query.data.data, data.data)
  }
  if(isLoading) {
    return <Loader />
  }
  return (
          <>
            <Accordion chevronPosition={"right"} variant={"contained"} >
            {
              processedEntitlements.map(e =>
                <EntitlementAccordion key={e.data.id} e={e} handleDetachAttachClick={handleDetachAttachClick} />
              )
            }
            </Accordion>
          </>
  )
}

function EntitlementAccordion({e, handleDetachAttachClick}: {e: FilteredEntitlementResponse, handleDetachAttachClick: any}) {
  const [attached, setAttached] = useState(e.attached)
  const entitlementId = e.data.id
  return (
  <>
    <Accordion.Item key={entitlementId} value={entitlementId}>
      <Accordion.Control>{e.data.attributes.name} {attached ? "| Attached": ""}</Accordion.Control>
      <Accordion.Panel>{e.data.attributes.created}</Accordion.Panel>
      <Accordion.Panel>{e.data.attributes.code}</Accordion.Panel>
      <Accordion.Panel>
        <Button onClick={() => { setAttached(!attached); handleDetachAttachClick(attached, entitlementId) }}>
          {attached ? "Detach" : "Attach"}
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  </>
  )
}

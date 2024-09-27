import {useSelect} from "@refinedev/mantine";
import IEntitlement from "../../../interfaces/entitlement";
import appState from "../../../_util/appState";
import {useCustom, useNotification} from "@refinedev/core";
import {Accordion, Button} from "@mantine/core";
import {useState} from "react";
import {filteredEntitlements, FilteredEntitlementResponse} from "../../../_util/resource/entitlement";
import useAppStateStore from "../../../_util/appState";

const NOTIFICATION_ID = "entitlement-change"
const status: {[key: number]: string} = {
  200: "attached",
  204: "detached",
}

export default function AddRemoveLicenseEntitlements({
  currentPolicyId,
  currentLicenseId,
  refetch
  }: {
  currentPolicyId: string,
  currentLicenseId: string,
  refetch: () => void
  }) {
  const apiUrl = useAppStateStore(state => state.apiUrl)
  const { open, close } = useNotification();

  const handleDetachAttachClick = async (attached: boolean, entitlementId: string) => {
    // const apiUrl = appState.getState().apiUrl
    const apiToken = appState.getState().apiToken
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)
    headers.append("Accept", "application/vnd.api+json")
    headers.append("Content-Type", "application/vnd.api+json")

    const res = await fetch(`${apiUrl}/licenses/${currentLicenseId}/entitlements`, {
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

  let allEntitlements: IEntitlement[] = []
  if(!query.isLoading ) {
    // @ts-ignore
    allEntitlements = query.data!.data
  }

  // This gets the current entitlements for the policy
  const { data: policyData, isLoading: policyIsLoading } = useCustom<IEntitlement[]>({ url: `${apiUrl}/policies/${currentPolicyId}/entitlements`, method: "get" });

  // This gets the current entitlements for the license
  const { data: licenseData, isLoading: licenseIsLoading } = useCustom<IEntitlement[]>({ url: `${apiUrl}/licenses/${currentLicenseId}/entitlements`, method: "get" });

  let processedPolicyEntitlements: FilteredEntitlementResponse[] = [];
  if( (!policyIsLoading && policyData !== undefined) && (!query.isLoading) ) {
    // @ts-ignore
    processedPolicyEntitlements = filteredEntitlements(allEntitlements, policyData.data)
  }

  let processedLicenseEntitlements: FilteredEntitlementResponse[] = [];
  if( (!licenseIsLoading && policyData !== undefined) && (!query.isLoading) ) {
    // @ts-ignore
    processedLicenseEntitlements = filteredEntitlements(allEntitlements, licenseData.data)
  }

  const policyEntitlementIds: Set<string> = new Set(processedPolicyEntitlements.filter(p => p.attached).map(p => p.data.id))
  const licenseEntitlementIds: Set<string> = new Set(processedLicenseEntitlements.filter(p => p.attached).map(p => p.data.id))

  let processedEntitlements: FilteredEntitlementResponse[] = []
  allEntitlements.map(entitlement => {
    processedEntitlements.push({
      attached: policyEntitlementIds.has(entitlement.id) || licenseEntitlementIds.has(entitlement.id),
      data: entitlement,
      inherited: policyEntitlementIds.has(entitlement.id),
    })
  })

  return (
    <>
      {
        licenseIsLoading ?
          "Loading!"
          :
          <>
            <Accordion chevronPosition={"right"} variant={"contained"} >
            {
              processedEntitlements.map(e =>
                <EntitlementAccordion key={e.data.id} e={e} handleDetachAttachClick={handleDetachAttachClick} />
              )
            }
            </Accordion>
          </>
      }
    </>
  )
}

function EntitlementAccordion({e, handleDetachAttachClick}: {e: FilteredEntitlementResponse, handleDetachAttachClick: any}) {
  const [attached, setAttached] = useState(e.attached)
  const entitlementId = e.data.id
  return (
  <>
    <Accordion.Item key={entitlementId} value={entitlementId}>
      <Accordion.Control>{e.data.attributes.name} {attached ? "| Attached": ""} {e.inherited && " | Inherited"}</Accordion.Control>
      <Accordion.Panel>{e.data.attributes.created}</Accordion.Panel>
      <Accordion.Panel>{e.data.attributes.code}</Accordion.Panel>
      <Accordion.Panel>
        <Button
          onClick={() => { setAttached(!attached); handleDetachAttachClick(attached, entitlementId) }}
          disabled={e.inherited}
        >
          {e.inherited && "Cannot "}
          {attached ? "Detach" : "Attach"}
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  </>
  )
}

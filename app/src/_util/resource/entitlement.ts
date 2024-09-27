import IEntitlement from "../../interfaces/entitlement";

export type FilteredEntitlementResponse = {
  attached: boolean,
  data: IEntitlement,
  inherited?: boolean,
}

/*
  * This takes all and gets the difference of attached.
  * The idea is find what is available to attach.
  * The output is the whole list, with a boolean if it's attached or not
*/
export function filteredEntitlements(all: IEntitlement[], attached: IEntitlement[]): FilteredEntitlementResponse[] {
  let availableEntitlements: IEntitlement[] = [];
  let allEntitlements: IEntitlement[] = [];
  let unAvailableEntitlements: IEntitlement[] = [];

  // This Gets all Entitlements, does a set different to only get policy Entitlements, then does two filters to
  // get which are available and which are not.
  // @ts-ignore
  const allEntitlementIds = all.map(entitlement => entitlement.id)

  const attachedEntitlementIds = new Set(attached.map(item => item.id))
  const availableEntitlementsIds = new Set([...allEntitlementIds].filter(entitlement => !attachedEntitlementIds.has(entitlement)))
  // @ts-ignore
  unAvailableEntitlements = all.filter(entitlement => !availableEntitlementsIds.has(entitlement.id))
  // @ts-ignore
  availableEntitlements = all.filter(entitlement => availableEntitlementsIds.has(entitlement.id))
  // Here we create a final array where we combine attached and not attached.
  const processedEntitlements: {attached: boolean, data: IEntitlement}[] = []
  availableEntitlements.map(entitlement => {
    processedEntitlements.push({
      attached: false,
      data: entitlement,
    })
  })
  unAvailableEntitlements.map(entitlement => {
    processedEntitlements.push({
      attached: true,
      data: entitlement,
    })
  })
  return processedEntitlements
}

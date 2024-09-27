import {IResource, Metadata, Relationship} from "./index";

interface EntitlementAttributes {
    name: string;
    code: string;
    created: string; // readonly
    updated: string; // readonly
    metadata: Metadata;
}

interface EntitlementRelationships {
    account: Relationship;
    // environment: Relationship;
}

export default interface IEntitlement extends IResource<EntitlementAttributes, EntitlementRelationships> {}

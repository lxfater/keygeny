import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface GroupAttributes {
    name: string;
    maxUsers: string;
    maxLicenses: string;
    metadata: Metadata;
    created: string; // readonly
    updated: string; // readonly
}

interface GroupRelationships {
    account: Relationship;
    // environment: Relationship;
    product: Relationship;
    license: Relationship;
    machine: Relationship;
}

export interface IGroup extends IResource<GroupAttributes, GroupRelationships> {}

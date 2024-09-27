import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface UserAttributes {
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string; // readonly
    role: "user" | "support-agent" | "sales-agent" | "developer" | "read-only" | "admin" | string;
    // permissions: string[]
    metadata: Metadata;
    created: string; // readonly
    updated: string; // readonly
}

interface UserRelationships {
    account: Relationship;
    // environment: Relationship;
    group: Relationship;
    products: RelationshipCollection;
    licenses: RelationshipCollection;
    machines: RelationshipCollection;
    tokens: RelationshipCollection;
}

export default interface IComponent extends IResource<UserAttributes, UserRelationships> {}

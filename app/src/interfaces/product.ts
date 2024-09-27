import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface ProductAttributes {
    name: string;
    url: string;
    distributionStrategy: "LICENSES" | "OPEN" | "CLOSED" | string;
    platforms: string[];
    // permissions: string[];
    metadata: Metadata;
    created: string;
    updated: string;
}

interface ProductRelationships {
    account: Relationship;
    // environment: Relationship;
    policies: RelationshipCollection;
    licenses: RelationshipCollection;
    machines: RelationshipCollection;
    users: RelationshipCollection;
    tokens: RelationshipCollection;
}

export default interface IProduct extends IResource<ProductAttributes, ProductRelationships> {}

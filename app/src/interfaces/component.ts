import { IResource, Metadata, Relationship } from "./index";

interface ComponentAttributes {
    fingerprint: string;
    name: string;
    metadata: Metadata;
    created: string; // readonly
    updated: string; // readonly
}

interface ComponentRelationships {
    account: Relationship;
    // environment: Relationship;
    product: Relationship;
    license: Relationship;
    machine: Relationship;
}

export default interface IComponent extends IResource<ComponentAttributes, ComponentRelationships> {}

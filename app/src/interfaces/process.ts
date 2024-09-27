import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface ProcessAttributes {
    pid: string;
    status: string; // readonly
    lastHeartbeat: string; // readonly
    nextHeartbeat: string; // readonly
    interval: string;
    metadata: Metadata;
    created: string; // readonly
    updated: string; // readonly

}

interface ProcessRelationships {
    account: Relationship;
    // environment: Relationship;
    product: Relationship;
    license: Relationship;
    machine: Relationship;
}

export default interface IProcess extends IResource<ProcessAttributes, ProcessRelationships> {}

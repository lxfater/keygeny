import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface MachineAttributes {
    fingerprint: string,
    cores: number;
    name: string;
    ip: string;
    hostname: string;
    platform: string;
    maxProcesses: number; // readonly
    requireHeartbeat: number; // readonly
    heartbeatStatus: string; // readonly
    heartbeatDuration: number; // readonly
    lastHeartbeat: string; // readonly
    nextHeartbeat: string; // readonly
    lastCheckOut: string; // readonly
    metadata: Metadata;
    created: string; // readonly
    updated: string; // readonly
}

interface MachineRelationships {
    account: Relationship;
    // environment: Relationship;
    product: Relationship;
    license: Relationship;
    owner?: Relationship;
    group?: Relationship;
    components: RelationshipCollection;
    pool: RelationshipCollection;
    processes: RelationshipCollection;
}

export default interface IMachine extends IResource<MachineAttributes, MachineRelationships> {}

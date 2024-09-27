import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface LicenseAttributes {
        name: string;
        key: null | string;
        expiry: string;
        status: string; // readonly
        uses: number;
        protected: boolean;
        version: string; // readonly
        suspended: boolean;
        floating: boolean; // readonly
        scheme: string; // readonly
        strict: boolean; // readonly
        encrypted: boolean; // readonly
        maxMachines: number;
        maxProcesses: number;
        maxUsers: number;
        maxCores: number;
        maxUses: number
        requireHeartbeat: boolean; // readonly
        requireCheckIn: boolean; // readonly
        lastValidated: string; // readonly
        lastCheckOut: string; // readonly
        lastCheckIn: string; // readonly
        nextCheckIn: string; // readonly
        metadata: Metadata;
        created: string; // readonly
        updated: string; // readonly
}

interface LicenseRelationships {
        account: Relationship;
        // environment: Relationship;
        product: Relationship;
        policy: Relationship;
        group?: Relationship;
        owner?: Relationship;
        users: RelationshipCollection;
        machines: RelationshipCollection;
}

export default interface ILicense extends IResource<LicenseAttributes, LicenseRelationships> {}

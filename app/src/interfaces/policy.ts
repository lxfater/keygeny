import {IResource, Metadata, Relationship, RelationshipCollection} from "./index";

interface PolicyAttributes {
    name: string;
    duration: number;
    strict: boolean;
    floating: boolean;
    scheme: "ED25519_SIGN" | "RSA_2048_PKCS1_PSS_SIGN_V2" | "RSA_2048_PKCS1_SIGN_V2" | "RSA_2048_PKCS1_ENCRYPT" | "RSA_2048_JWT_RS256" | string;
    requireProductScope: boolean;
    requirePolicyScope: boolean;
    requireMachineScope: boolean;
    requireFingerprintScope: boolean;
    requireComponentsScope: boolean;
    requireUserScope: boolean;
    requireChecksumScope: boolean;
    requireVersionScope: boolean;
    requireCheckIn: boolean;
    checkInInterval: "day" | "week" | "month" | "year" | string;
    checkInIntervalCount: number;
    usePool: boolean;
    maxMachines: number;
    maxProcesses: number;
    maxUsers: number;
    maxCores: number;
    maxUses: number;
    encrypted: boolean;
    protected: boolean;
    requireHeartbeat: boolean;
    heartbeatDuration: null | number;
    heartbeatCullStrategy: "DEACTIVATE_DEAD" | "KEEP_DEAD" | string;
    heartbeatResurrectionStrategy: "NO_REVIVE" | "1_MINUTE_REVIVE" | "2_MINUTE_REVIVE" | "5_MINUTE_REVIVE" | "10_MINUTE_REVIVE" | "15_MINUTE_REVIVE" | "ALWAYS_REVIVE" | string;
    heartbeatBasis: "FROM_CREATION" | "FROM_FIRST_PING" | string;
    machineUniquenessStrategy: "UNIQUE_PER_ACCOUNT" | "UNIQUE_PER_PRODUCT" | "UNIQUE_PER_POLICY" | "UNIQUE_PER_LICENSE" | string;
    machineMatchingStrategy: "MATCH_ANY" | "MATCH_TWO" | "MATCH_MOST" | "MATCH_ALL" | string;
    componentUniquenessStrategy: "UNIQUE_PER_ACCOUNT" | "UNIQUE_PER_PRODUCT" | "UNIQUE_PER_POLICY" | "UNIQUE_PER_LICENSE" | "UNIQUE_PER_MACHINE" | string;
    componentMatchingStrategy: "MATCH_ANY" | "MATCH_TWO" | "MATCH_MOST" | "MATCH_ALL" | string;
    expirationStrategy: "RESTRICT_ACCESS" | "REVOKE_ACCESS" | "MAINTAIN_ACCESS" | "ALLOW_ACCESS" | string;
    expirationBasis: "FROM_CREATION" | "FROM_FIRST_VALIDATION" | "FROM_FIRST_ACTIVATION" | "FROM_FIRST_DOWNLOAD" | "FROM_FIRST_USE" | string;
    renewalBasis: "FROM_EXPIRY" | "FROM_NOW" | string;
    transferStrategy: "RESET_EXPIRY" | "KEEP_EXPIRY" | string;
    authenticationStrategy: "TOKEN" | "LICENSE" | "MIXED" | "NONE" | string;
    machineLeasingStrategy: "PER_LICENSE" | "PER_USER" | string;
    processLeasingStrategy: "PER_MACHINE" | "PER_LICENSE" | "PER_USER" | string;
    overageStrategy: "ALWAYS_ALLOW_OVERAGE" | "ALLOW_1_25X_OVERAGE" | "ALLOW_1_5X_OVERAGE" | "ALLOW_2X_OVERAGE" | "NO_OVERAGE" | string;
    metadata: Metadata;
    created: string; // readonly
    updated: string; // readonly
}

interface PolicyRelationships {
    account: Relationship;
    // environment: Relationship;
    product: Relationship;
    pool: RelationshipCollection;
    licenses: RelationshipCollection;
}

export default interface IPolicy extends IResource<PolicyAttributes, PolicyRelationships> {}

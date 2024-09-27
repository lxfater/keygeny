import { IResource, Metadata, Relationship } from "./index";

interface TokenAttributes {
    kind: string;
    token: string; // readonly
    name: string;
    expiry: string; // readonly
    // permissions: string[] // ent
    maxActivations: number;
    activations: number; // readonly
    maxDeactivations: number;
    deactivations: number; // readonly
    created: string; // readonly
    updated: string; // readonly
}

interface TokenRelationships {
    account: Relationship;
    // environment: Relationship;
    bearer: Relationship;
}

export default interface IToken extends IResource<TokenAttributes, TokenRelationships> {}

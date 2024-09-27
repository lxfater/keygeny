import { IResource, Metadata, Relationship } from "./index";

interface WebhookAttributes {
    url: string;
    signatureAlgorithm: string;
    subscriptions: WebhookEvent;
    created: string; // readonly
    updated: string; // readonly
}

interface ComponentRelationships {
    account: Relationship;
    // environment: Relationship;
}


enum WebhookEvent {
    ACCOUNT_BILLING_UPDATED = "account.billing.updated",
    ACCOUNT_PLAN_UPDATED = "account.plan.updated",
    ACCOUNT_SUBSCRIPTION_CANCELED = "account.subscription.canceled",
    ACCOUNT_SUBSCRIPTION_PAUSED = "account.subscription.paused",
    ACCOUNT_SUBSCRIPTION_RENEWED = "account.subscription.renewed",
    ACCOUNT_SUBSCRIPTION_RESUMED = "account.subscription.resumed",
    ACCOUNT_UPDATED = "account.updated",
    ARTIFACT_CREATED = "artifact.created",
    ARTIFACT_DELETED = "artifact.deleted",
    ARTIFACT_DOWNLOADED = "artifact.downloaded",
    ARTIFACT_UPDATED = "artifact.updated",
    ARTIFACT_UPLOADED = "artifact.uploaded",
    COMPONENT_CREATED = "component.created",
    COMPONENT_DELETED = "component.deleted",
    COMPONENT_UPDATED = "component.updated",
    ENTITLEMENT_CREATED = "entitlement.created",
    ENTITLEMENT_DELETED = "entitlement.deleted",
    ENTITLEMENT_UPDATED = "entitlement.updated",
    GROUP_CREATED = "group.created",
    GROUP_DELETED = "group.deleted",
    GROUP_OWNERS_ATTACHED = "group.owners.attached",
    GROUP_OWNERS_DETACHED = "group.owners.detached",
    GROUP_UPDATED = "group.updated",
    LICENSE_CHECK_IN_OVERDUE = "license.check-in-overdue",
    LICENSE_CHECK_IN_REQUIRED_SOON = "license.check-in-required-soon",
    LICENSE_CHECKED_IN = "license.checked-in",
    LICENSE_CHECKED_OUT = "license.checked-out",
    LICENSE_CREATED = "license.created",
    LICENSE_DELETED = "license.deleted",
    LICENSE_ENTITLEMENTS_ATTACHED = "license.entitlements.attached",
    LICENSE_ENTITLEMENTS_DETACHED = "license.entitlements.detached",
    LICENSE_EXPIRED = "license.expired",
    LICENSE_EXPIRING_SOON = "license.expiring-soon",
    LICENSE_GROUP_UPDATED = "license.group.updated",
    LICENSE_POLICY_UPDATED = "license.policy.updated",
    LICENSE_REINSTATED = "license.reinstated",
    LICENSE_RENEWED = "license.renewed",
    LICENSE_REVOKED = "license.revoked",
    LICENSE_SUSPENDED = "license.suspended",
    LICENSE_UPDATED = "license.updated",
    LICENSE_USAGE_DECREMENTED = "license.usage.decremented",
    LICENSE_USAGE_INCREMENTED = "license.usage.incremented",
    LICENSE_USAGE_RESET = "license.usage.reset",
    LICENSE_OWNER_UPDATED = "license.owner.updated",
    LICENSE_USERS_ATTACHED = "license.users.attached",
    LICENSE_USERS_DETACHED = "license.users.detached",
    LICENSE_VALIDATION_FAILED = "license.validation.failed",
    LICENSE_VALIDATION_SUCCEEDED = "license.validation.succeeded",
    MACHINE_CHECKED_OUT = "machine.checked-out",
    MACHINE_CREATED = "machine.created",
    MACHINE_DELETED = "machine.deleted",
    MACHINE_GROUP_UPDATED = "machine.group.updated",
    MACHINE_OWNER_UPDATED = "machine.owner.updated",
    MACHINE_HEARTBEAT_DEAD = "machine.heartbeat.dead",
    MACHINE_HEARTBEAT_PING = "machine.heartbeat.ping",
    MACHINE_HEARTBEAT_RESET = "machine.heartbeat.reset",
    MACHINE_HEARTBEAT_RESURRECTED = "machine.heartbeat.resurrected",
    MACHINE_UPDATED = "machine.updated",
    PACKAGE_CREATED = "package.created",
    PACKAGE_DELETED = "package.deleted",
    PACKAGE_UPDATED = "package.updated",
    POLICY_CREATED = "policy.created",
    POLICY_DELETED = "policy.deleted",
    POLICY_ENTITLEMENTS_ATTACHED = "policy.entitlements.attached",
    POLICY_ENTITLEMENTS_DETACHED = "policy.entitlements.detached",
    POLICY_POOL_POPPED = "policy.pool.popped",
    POLICY_UPDATED = "policy.updated",
    PROCESS_CREATED = "process.created",
    PROCESS_DELETED = "process.deleted",
    PROCESS_HEARTBEAT_DEAD = "process.heartbeat.dead",
    PROCESS_HEARTBEAT_PING = "process.heartbeat.ping",
    PROCESS_HEARTBEAT_RESURRECTED = "process.heartbeat.resurrected",
    PROCESS_UPDATED = "process.updated",
    PRODUCT_CREATED = "product.created",
    PRODUCT_DELETED = "product.deleted",
    PRODUCT_UPDATED = "product.updated",
    RELEASE_CONSTRAINTS_ATTACHED = "release.constraints.attached",
    RELEASE_CONSTRAINTS_DETACHED = "release.constraints.detached",
    RELEASE_CREATED = "release.created",
    RELEASE_DELETED = "release.deleted",
    RELEASE_PACKAGE_UPDATED = "release.package.updated",
    RELEASE_PUBLISHED = "release.published",
    RELEASE_UPDATED = "release.updated",
    RELEASE_UPGRADED = "release.upgraded",
    RELEASE_YANKED = "release.yanked",
    SECOND_FACTOR_CREATED = "second-factor.created",
    SECOND_FACTOR_DELETED = "second-factor.deleted",
    SECOND_FACTOR_DISABLED = "second-factor.disabled",
    SECOND_FACTOR_ENABLED = "second-factor.enabled",
    TOKEN_GENERATED = "token.generated",
    TOKEN_REGENERATED = "token.regenerated",
    TOKEN_REVOKED = "token.revoked",
    USER_BANNED = "user.banned",
    USER_CREATED = "user.created",
    USER_DELETED = "user.deleted",
    USER_GROUP_UPDATED = "user.group.updated",
    USER_PASSWORD_RESET = "user.password-reset",
    USER_UNBANNED = "user.unbanned",
    USER_UPDATED = "user.updated"
}

const webhookEventsArray = Object.values(WebhookEvent);
export const webhookEvents = webhookEventsArray.map((value) => ({
    label: value.replace(/\./g, "_").toUpperCase() || "",
    value: value
}));

export default interface IWebhook extends IResource<WebhookAttributes, ComponentRelationships> {}

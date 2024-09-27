const resources = {
  products: "products",
  policies: "policies",
  licenses: "licenses",
  machines: "machines",
  entitlements: "entitlements",
  processes: "processes",
  components: "components",
  "webhook-endpoints": "webhook-endpoints",
  tokens: "tokens",
  users: "users",
}

export const siteConstants = {
  appName: import.meta.env.VITE_APP_NAME ?? "Missing App Name",
  resources,
}

import type {DataProvider, HttpError} from "@refinedev/core";
import appState from "../appState";
function getHeaders(token: string) {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)
    headers.append("Accept", "application/vnd.api+json")
    return headers
}

// @ts-ignore
import get from 'lodash/get'

export const keygenshDataProvider: DataProvider = {
    getOne: async ({resource, id, meta }) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken

        const response = await fetch(`${apiUrl}/${resource}/${id}`, {
            method: 'GET',
            headers: getHeaders(apiToken),
        } as RequestInit)
        if (response.status != 200) { throw response; }
        const data = await response.json()
        return data
    },
    update: async ({ resource, id, variables }) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken

        // @ts-ignore
        const attributes = { ...variables.attributes }
        immutableKeys[resource].update.map(key => delete attributes[key])

        const headers = getHeaders(apiToken)
        headers.append("Content-Type", "application/vnd.api+json")
        const response = await fetch(`${apiUrl}/${resource}/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ data: {type: resource, attributes } })
        })
        if (response.status >= 400 && response.status < 500) {
            const errors: {[key:string]: string} = {}
            const data = await response.json()
            data.errors.map((error: { source: { pointer: string; }; title: string; detail: string; }) => {
                const titleSplit = error.source.pointer.split("/")
                const titleJoin = titleSplit.slice(2)
                const title = titleJoin.join(".")
                errors[title] = `${error.title}: ${title} ${error.detail}`
            })
            const error: HttpError = {
                message: "Unable to update the record",
                statusCode: 422,
                errors,
            }
            return Promise.reject(error);
        } else if (response.status != 200) { throw response; }
        return await response.json()
    },
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken

        const url = new URL(`${apiUrl}/${resource}`)
        const params = new URLSearchParams()
        if (pagination) {
            params.append("page[size]", String(pagination.pageSize))
            params.append("page[number]", String(pagination.current))
        }
        url.search = params.toString()
        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(apiToken),
        })
        if (response.status != 200) { throw response; }
        const data = await response.json()

        filters?.map(filter => {
            switch(filter.operator) {
                case "eq": {
                    data.data = data.data.filter((record: { attributes: { [x: string]: any; }; }) => {
                        console.log(get(record, filter.field), filter.value)
                        return get(record, filter.field) == filter.value
                    })
                    break;
                }
                case "contains": {
                    data.data = data.data.filter((record: { attributes: { [x: string]: string | any[]; }; }) => {
                        return get(record, filter.field).includes(filter.value)
                    })
                    break;
                }
            }
        })

        // Extract total count from response metadata
        // Keygen API typically returns count in links.meta.count
        const total = data.links?.meta?.count || data.meta?.count || data.data?.length || 0;

        // Return in the format expected by Refine
        return {
            data: data.data || [],
            total: total
        }
    },
    create: async ({ resource, variables }) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken

        // @ts-ignore
        const attributes = { ...variables.attributes }
        immutableKeys[resource].create.map(key => delete attributes[key])
        // @ts-ignore
        const relationships = { ...variables.relationships }

        const headers = getHeaders(apiToken)
        headers.append("Content-Type", "application/vnd.api+json")
        const response = await fetch(`${apiUrl}/${resource}`, {
            method: "POST",
            headers,
            body: JSON.stringify({ data: { type: resource, attributes, relationships } })
        })
        if (response.status >= 400 && response.status < 500) {
            const errors: {[key:string]: string} = {}
            const data = await response.json()
            data.errors.map((error: { source: { pointer: string; }; title: string; detail: string; }) => {
                const titleSplit = error.source.pointer.split("/")
                const titleJoin = titleSplit.slice(2)
                const title = titleJoin.join(".")
                errors[title] = `${error.title}: ${title} ${error.detail}`
            })
            const error: HttpError = {
                message: "Unable to create the record",
                statusCode: 422,
                errors,
            }
            return Promise.reject(error);
        }
        else if (response.status != 201) { throw response; }
        return await response.json()
    },
    deleteOne: async ({ resource, id, variables, meta }) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken

        const headers = getHeaders(apiToken)
        headers.append("Content-Type", "application/vnd.api+json")
        const response = await fetch(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE",
            headers,
        })
        if (response.status != 204) { throw response; }

        return { data: { resource, id } } as any

    },
    getApiUrl: () => {
        return appState.getState().apiUrl
    },
    // Optional methods:
    // getMany: () => { /* ... */ },
    // createMany: () => { /* ... */ },
    // deleteMany: () => { /* ... */ },
    // updateMany: () => { /* ... */ },
    custom: async ({url, method, filters, sorters, payload, query, headers, meta}) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken

        const fetchUrl = new URL(`${url}`)

        const fetchParams = new URLSearchParams()
        if(query) {
            Object.entries(query).forEach(([key, value]) => {
                fetchParams.append(key, String(value));
            });
        }

        const fetchHeaders = new Headers()
        fetchHeaders.append("Accept", "application/vnd.api+json")
        if(url.startsWith(apiUrl)) {
            fetchHeaders.append("Authorization", `Bearer ${apiToken}`)
        }
        if(payload) {
            fetchHeaders.append("Content-Type", "application/vnd.api+json")
        }
        if(headers) {
            Object.entries(headers).forEach(([key, value]) => {
                fetchHeaders.append(key, String(value));
            });
        }

        let body = undefined
        if(payload) {
            body = JSON.stringify(payload)
        }
        fetchUrl.search = fetchParams.toString()
        const response = await fetch(fetchUrl, {
            method: method.toUpperCase(),
            headers: fetchHeaders,
            body,
        })
        const data = await response.json()
        return data
    },
};

const globalImmutableKeys: string[] = [
    "created",
    "updated",
]
// Every item here is a key on the object, but cannot be provided in the create / update request
const immutableKeys: {[key: string]: {[key: string]: string[]}} = {
    products: {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
        ]
    },
    entitlements: {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
        ]
    },
    components: {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
            "fingerprint",
        ]
    },
    processes: {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
            "pid",
            "lastHeartbeat",
            "nextHeartbeat",
            "interval",
            "status",
        ]
    },
    machines: {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
            "fingerprint",
            "requireHeartbeat",
            "heartbeatStatus",
            "heartbeatDuration",
            "lastHeartbeat",
            "nextHeartbeat",
            "lastCheckOut",
            "maxProcesses",
        ]
    },
    policies: {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            "scheme",
            "usePool",
            "encrypted",
            "status",
            "version",
            // "floating",
            ...globalImmutableKeys,
        ],
    },
    licenses: {
        create: [
            ...globalImmutableKeys,
            "platforms",
        ],
        update:
            [
                "key",
                "platforms",
                "uses",
                "encrypted",
                "status",
                "version",
                "floating",
                "scheme",
                "strict",
                "requireHeartbeat",
                "requireCheckIn",
                "lastValidated",
                "lastCheckOut",
                "lastCheckIn",
                "nextCheckIn",
                ...globalImmutableKeys,
            ],
    },
    "webhook-endpoints": {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
        ]
    },
    "users": {
        create: [
            ...globalImmutableKeys,
            "fullName",
            "status",
        ],
        update: [
            ...globalImmutableKeys,
            "fullName",
            "status",
        ]
    },
    "groups": {
        create: [
            ...globalImmutableKeys,
        ],
        update: [
            ...globalImmutableKeys,
        ]
    },
}

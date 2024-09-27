import React from "react";
import {Button} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";

const NOTIFICATION_ID = "license-usage-increment"

export default function IncrementDecrementLicenseUsage({refetch}: {refetch: () => void}) {
    const { id } = useParams<{ id: string }>();
    const { open, close } = useNotification();

    const handleClick = async (action: string) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${apiToken}`)
        headers.append("Accept", "application/vnd.api+json")
        headers.append("Content-Type", "application/vnd.api+json")

        const res = await fetch(`${apiUrl}/licenses/${id}/actions/${action}`, {
            method: "POST",
            headers,
        })
        if(res.status === 200) {
            open?.({type: "success", message: `The license has been ${action}`})
            close?.(NOTIFICATION_ID)
            refetch()
        } else if(res.status === 422) {
            const data = await res.json()
            open?.({type: data.errors[0].title, message: data.errors[0].detail})
            close?.(NOTIFICATION_ID)
            refetch()
        }
        return await res.json()
    }

    return (
    <>
        <Button onClick={() => handleClick("increment-usage")}>Increment Usage</Button>
        <Button onClick={() => handleClick("decrement-usage")}>Decrement Usage</Button>
        <Button onClick={() => handleClick("reset-usage")}>Reset Usage</Button>
    </>
)
}
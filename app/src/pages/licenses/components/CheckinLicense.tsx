import React from "react";
import {Button} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";

const NOTIFICATION_ID = "license-checkin"

export default function CheckinLicense({refetch}: {refetch: () => void}) {
    const { id } = useParams<{ id: string }>();
    const { open, close } = useNotification();

    const handleClick = async () => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${apiToken}`)
        headers.append("Accept", "application/vnd.api+json")
        headers.append("Content-Type", "application/vnd.api+json")

        const res = await fetch(`${apiUrl}/licenses/${id}/actions/check-in`, {
            method: "POST",
            headers,
        })
        if(res.status === 200) {
            open?.({type: "success", message: `The license has been checked in`})
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
        <Button type={"submit"} onClick={() => handleClick()}>Checkin License</Button>
  )
}
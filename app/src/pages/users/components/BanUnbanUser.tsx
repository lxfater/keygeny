import React from "react";
import {Button} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";

const NOTIFICATION_ID = "user-change"

export function BanUnbanUser({currentlyBanned, refetch}: {currentlyBanned: boolean, refetch: () => void}) {
    const { id } = useParams<{ id: string }>();
    const { open, close } = useNotification();

    const handleClick = async () => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${apiToken}`)
        headers.append("Accept", "application/vnd.api+json")
        headers.append("Content-Type", "application/vnd.api+json")

        const res = await fetch(`${apiUrl}/users/${id}/actions/${currentlyBanned ? "unban" : "ban"}`, {
            method: "POST",
            headers,
        })
        if(res.status === 200) {
            open?.({type: "success", message: `The user has been ${currentlyBanned ? "unbanned" : "banned"}`})
            close?.(NOTIFICATION_ID)
            refetch()
        }
        return await res.json()
    }

    return (
        <Button type={"submit"} onClick={() => handleClick()}>{currentlyBanned ? "Unban": "Ban"} User</Button>
  )
}
import React from "react";
import {Button} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";

export function SuspensionButton({currentlySuspended, refetch}: {currentlySuspended: boolean, refetch: () => void}) {
    const { id } = useParams<{ id: string }>();
    const { open, close } = useNotification();

    const handleClick = async () => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${apiToken}`)
        headers.append("Accept", "application/vnd.api+json")
        headers.append("Content-Type", "application/vnd.api+json")

        const res = await fetch(`${apiUrl}/licenses/${id}/actions/${currentlySuspended ? "reinstate" : "suspend"}`, {
            method: "POST",
            headers,
        })
        if(res.status === 200) {
            open?.({type: "success", message: `The license has been ${currentlySuspended ? "reinstated" : "suspended"}`})
            close?.("policy-change")
            refetch()
        }
        return await res.json()
    }

    return (
        <Button type={"submit"} onClick={() => handleClick()}>{currentlySuspended ? "Reinstate": "Suspend"} License</Button>
  )
}
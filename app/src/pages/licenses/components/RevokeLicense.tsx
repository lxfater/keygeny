import React, {useState} from "react";
import {Button, Group} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";
import {IconToggleLeft, IconToggleLeftFilled, IconToggleRightFilled} from "@tabler/icons-react";

const NOTIFICATION_ID = "license-revoke"

export default function RevokeLicense({refetch}: { refetch: () => void }) {
    const {id} = useParams<{ id: string }>();
    const {open, close} = useNotification();
    const [disabled, setDisabled] = useState(true)

    const handleClick = async () => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${apiToken}`)
        headers.append("Accept", "application/vnd.api+json")
        headers.append("Content-Type", "application/vnd.api+json")

        const res = await fetch(`${apiUrl}/licenses/${id}/actions/revoke`, {
            method: "DELETE",
            headers,
        })
        if (res.status === 204) {
            open?.({type: "success", message: `The license has been revoked`})
            close?.(NOTIFICATION_ID)
            refetch()
        } else if (res.status === 422) {
            const data = await res.json()
            open?.({type: data.errors[0].title, message: data.errors[0].detail})
            close?.(NOTIFICATION_ID)
            refetch()
        }
        return await res.json()
    }

    return (
      <Group spacing={0}>
          <Button style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                  onClick={() => setDisabled(!disabled)}>
              {disabled ? <IconToggleLeftFilled/>: <IconToggleRightFilled/>}
          </Button>
          <Button style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                  type={"submit"}
                  color={"red"}
                  disabled={disabled}
                  onClick={() => handleClick()}>
              Revoke License
          </Button>
      </Group>
    )
}
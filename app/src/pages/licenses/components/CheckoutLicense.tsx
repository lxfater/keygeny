import React, {useState} from "react";
import {Button, Modal, Textarea, Title} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";
import {useDisclosure} from "@mantine/hooks";

const NOTIFICATION_ID = "license-checkout"

export default function CheckoutLicense({refetch}: { refetch: () => void }) {
  const {id} = useParams<{ id: string }>();
  const {open, close} = useNotification();
  const [licenseKey, setLicenseKey] = useState('')
  const [opened, {toggle: toggleDialog, close: dialogClose}] = useDisclosure(false)

  const handleClick = async () => {
    const apiUrl = appState.getState().apiUrl
    const apiToken = appState.getState().apiToken
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)
    headers.append("Accept", "application/vnd.api+json")
    headers.append("Content-Type", "application/vnd.api+json")

    const res = await fetch(`${apiUrl}/licenses/${id}/actions/check-out`, {
      method: "POST",
      headers,
    })
    if (res.status === 200) {
      toggleDialog()
      open?.({type: "success", message: `The license has been checked out`})
      close?.(NOTIFICATION_ID)
      refetch()
    } else if (res.status === 422) {
      const data = await res.json()
      open?.({type: data.errors[0].title, message: data.errors[0].detail})
      close?.(NOTIFICATION_ID)
      refetch()
    }
    const data = await res.json()
    setLicenseKey(data.data.attributes.certificate)
    return data
  }

  return (
    <>
      <Button type={"submit"} onClick={() => handleClick()}>Checkout License</Button>
      {
        <>
          <Modal size={"lg"} opened={opened} withCloseButton onClose={dialogClose}>
            <Title size={"h2"}>Checkout your license key!</Title>
            <Textarea value={licenseKey} minRows={30}/>
          </Modal>

        </>
      }
    </>
  )
}
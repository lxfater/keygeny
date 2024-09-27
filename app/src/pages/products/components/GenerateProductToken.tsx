import React, {useState} from "react";
import {Button, Group, Modal, Text, Textarea, TextInput, Title} from "@mantine/core";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import {useNotification} from "@refinedev/core";
import {useDisclosure} from "@mantine/hooks";
import useAppStateStore from "../../../_util/appState";

const NOTIFICATION_ID = "generate-product-token"

export default function GenerateProductToken({refetch}: { refetch: () => void }) {
  const {id} = useParams<{ id: string }>();
  const {open, close} = useNotification();
  const [productToken, setProductToken] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [opened, {toggle: toggleDialog, close: dialogClose}] = useDisclosure(false)

  const apiUrl = useAppStateStore(state => state.apiUrl)

  const handleClick = async () => {
    const apiToken = appState.getState().apiToken
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)
    headers.append("Accept", "application/vnd.api+json")
    headers.append("Content-Type", "application/vnd.api+json")

    const res = await fetch(`${apiUrl}/products/${id}/tokens`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "tokens",
          attributes: { name: tokenName }
        }
      })
    })
    if (res.status === 200) {
      toggleDialog()
      open?.({type: "success", message: `New token generated`})
      close?.(NOTIFICATION_ID)
      refetch()
    } else if (res.status === 422) {
      const data = await res.json()
      open?.({type: data.errors[0].title, message: data.errors[0].detail})
      close?.(NOTIFICATION_ID)
      refetch()
    }
    const data = await res.json()
    setProductToken(data.data.attributes.token)
    return data
  }

  return (
    <>
      <Group>
        <TextInput placeholder={"Token name..."} value={tokenName} onChange={e => setTokenName(e.target.value)} />
        <Button type={"submit"} onClick={() => handleClick()}>Generate Token</Button>
      </Group>
      {
        <>
          <Modal size={"lg"} opened={opened} withCloseButton onClose={dialogClose}>
            <Title size={"h2"}>New Product Token: {tokenName}</Title>
            <Textarea value={productToken}/>
          </Modal>

        </>
      }
    </>
  )
}
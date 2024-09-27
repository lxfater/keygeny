import React, {useEffect} from "react";
import {Button, Group, Select} from "@mantine/core";
import IPolicy from "../../../interfaces/policy";
import appState from "../../../_util/appState";
import {useParams} from "react-router-dom";
import { useForm } from "@mantine/form";
import {useSelect} from "@refinedev/mantine";
import {useNotification} from "@refinedev/core";

const NOTIFICATION_ID = "policy-change"

export default function ChangePolicy({currentPolicy}: {currentPolicy: string}) {
    const { id } = useParams<{ id: string }>();

    const { open, close } = useNotification();
    const handleOnSubmit = async (data: {policyId: string}) => {
        const apiUrl = appState.getState().apiUrl
        const apiToken = appState.getState().apiToken
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${apiToken}`)
        headers.append("Accept", "application/vnd.api+json")
        headers.append("Content-Type", "application/vnd.api+json")
        const res = await fetch(`${apiUrl}/licenses/${id}/policy`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
                data: {
                    type: "policies",
                    id: data.policyId,
                }
            })
        })
        if(res.status === 200) {
            open?.({type: "success", message: "The policy has been changed"})
            close?.(NOTIFICATION_ID)
        } else if(res.status === 422) {
            const data = await res.json()
            open?.({type: data.errors[0].title, message: data.errors[0].detail})
            close?.(NOTIFICATION_ID)
        }
        return await res.json()
    }

    const form = useForm({
        // @ts-ignore
        initialValues: {
            policyId: currentPolicy,
        },
    });
    const { selectProps } = useSelect<IPolicy>({
        resource: "policies",
        // @ts-ignore
        optionLabel: "attributes.name",
    });

    useEffect(() => {
        form.setFieldValue("policyId", currentPolicy)
    }, [currentPolicy]);

    return (
    <>
        <form onSubmit={form.onSubmit((data) => handleOnSubmit(data))}>
            <Group>
                <Select
                  {...selectProps}
                  {...form.getInputProps("policyId")}
                  mt={8}
                  placeholder="Pick one"
                />
                <Button disabled={form.getInputProps("policyId").value == ""} type={"submit"}>Save</Button>
            </Group>
        </form>
    </>
  )
}
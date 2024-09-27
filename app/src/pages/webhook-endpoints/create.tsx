import React from "react";
import {Create, useForm} from "@refinedev/mantine";
import {MultiSelect, Text, TextInput} from "@mantine/core";
import IWebhook, {webhookEvents} from "../../interfaces/webhook";

export const WebhookCreate: React.FC = () => {
  const {saveButtonProps, getInputProps, setFieldValue, errors} = useForm<IWebhook>({
    initialValues: {
      attributes: {},
    },
    // validate: {
    //   title: (value) => (value.length < 2 ? "Too short title" : null),
    //   status: (value) => (value.length <= 0 ? "Status is required" : null),
    //   category: {
    //     id: (value) => (value.length <= 0 ? "Category is required" : null),
    //   },
    //   content: (value) => (value.length < 10 ? "Too short content" : null),
    // },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput required mt={8} label="Url" {...getInputProps("attributes.url")} />
        <MultiSelect
          mt={8}
          label={"Subscriptions"}
          searchable
          nothingFound={"No event found"}
          placeholder="Pick one"
          {...getInputProps("attributes.subscriptions")}
          data={webhookSubscriptions}
        />
        {errors.content && (
          <Text mt={2} weight={500} size="xs" color="red">
            {errors.content}
          </Text>
        )}
      </form>
    </Create>
  );
};

const webhookSubscriptions = [
  {label: "ALL", value: "*"},
  ...webhookEvents,
]

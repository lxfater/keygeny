import React from "react";
import {Edit, useForm} from "@refinedev/mantine";
import {Loader, MultiSelect, Select, Text, TextInput} from "@mantine/core";
import {webhookEvents} from "../../interfaces/webhook";

export const WebhookEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: {query: queryResult},
    errors,
  } = useForm({
    initialValues: {
      attributes: { }
    },
    refineCoreProps: {redirect: "show"},
    validate: {
      // attributes.name: (value) => (value.length < 2 ? "Too short name" : null),
      // attributes.distributionStrategy: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

  const SelectStrategy = ({label, path, options}: {
    label: string,
    path: string,
    options: { label: string, value: string }[]
  }) => {
    console.log(options)
    return (
      <Select
        key={label}
        mt={8}
        label={label}
        placeholder="Pick one"
        {...getInputProps(path)}
        data={options}
      />
    )
  }

  // const { selectProps } = useSelect<ICategory>({
  //   resource: "categories",
  //   defaultValue: queryResult?.data?.data.category.id,
  // });
  const {value: metaDataValue} = getInputProps("attributes.metadata")
  if (!queryResult || queryResult.isLoading) {
    return (
      <Edit>
        <Loader/>
      </Edit>
    )
  }
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        {/*<form style={{height: "100dvh"}}>*/}
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
            <Text mt={2} size="xs" color="red">
              {errors.content}
            </Text>
          )}
        </form>
    </Edit>
);
};

const webhookSubscriptions = [
  {label: "ALL", value: "*"},
  ...webhookEvents,
]

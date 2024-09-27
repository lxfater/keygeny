import React from "react";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import {TextInput, Text, JsonInput} from "@mantine/core";

export const EntitlementCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, setFieldValue, errors } = useForm({
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

  // const { selectProps } = useSelect({
  //   resource: "categories",
  // });
  const {value: metaDataValue} = getInputProps("attributes.metadata")

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput mt={8} label="Name" {...getInputProps("attributes.name")} />

        <TextInput mt={8} label="Code" {...getInputProps("attributes.code")} />

        <JsonInput
            mt={8}
            label="Metadata"
            placeholder="{ key: value }"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
            {...getInputProps("attributes.metadata")}
            value={(typeof metaDataValue) === "string" ? metaDataValue : JSON.stringify(metaDataValue, null, 2)}
            onChange={value => {
              try { setFieldValue("attributes.metadata", JSON.parse(value)) }
              catch (e) { setFieldValue("attributes.metadata", value) }
            }}
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

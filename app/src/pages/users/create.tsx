import React from "react";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import {TextInput, Text, JsonInput, Select, PasswordInput} from "@mantine/core";

export const UserCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, setFieldValue, errors } = useForm({
      initialValues: {
          attributes: { },
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

  const {value: metaDataValue} = getInputProps("attributes.metadata")
  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
          <TextInput mt={8} label="First Name" {...getInputProps("attributes.firstName")} />

          <TextInput mt={8} label="Last Name" {...getInputProps("attributes.lastName")} />

          <TextInput required mt={8} label="Email" {...getInputProps("attributes.email")} />

          <PasswordInput mt={8} label="Password" {...getInputProps("attributes.password")} />

          <Select mt={8} label={"Role"} placeholder="Pick one" {...getInputProps("attributes.role")}
                  data={[{ label: "User", value: "user" }, { label: "Support Agent", value: "support-agent" }, { label: "Sales Agent", value: "sales-agent" }, { label: "Developer", value: "developer" }, { label: "Read-only", value: "read-only" }, { label: "Admin", value: "admin" },]}
          />

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

import React, {useEffect} from "react";
import {Edit, Show, useForm} from "@refinedev/mantine";
import {Checkbox, JsonInput, Loader, NumberInput, PasswordInput, Select, Text, TextInput} from "@mantine/core";

export const UserEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    setFieldValue,
    refineCore: {query: queryResult},
    errors,
  } = useForm({
    initialValues: {
      attributes: {
        fingerprint: "",
        name: "",
      }
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


        <TextInput mt={8} label="First Name" {...getInputProps("attributes.firstName")} />

        <TextInput mt={8} label="Last Name" {...getInputProps("attributes.lastName")} />

        <TextInput required mt={8} label="Email" {...getInputProps("attributes.email")} />

        <PasswordInput mt={8} label="Password" {...getInputProps("attributes.password")} />

        <Select mt={8} label={"Check In Interval"} placeholder="Pick one" {...getInputProps("attributes.role")}
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
            try {
              setFieldValue("attributes.metadata", JSON.parse(value))
            } catch (e) {
              setFieldValue("attributes.metadata", value)
            }
          }}
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

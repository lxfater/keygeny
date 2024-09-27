import React from "react";
import {Edit, Show, useForm} from "@refinedev/mantine";
import {JsonInput, Loader, Select, Text, TextInput} from "@mantine/core";

export const ProcessEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    setFieldValue,
    refineCore: {query: queryResult},
    errors,
  } = useForm({
    initialValues: {
      attributes: {
        pid: "",
        interval: "",
        metadata: {},
      }
    },
    refineCoreProps: {redirect: "show"},
    validate: {
      // attributes.name: (value) => (value.length < 2 ? "Too short name" : null),
      // attributes.distributionStrategy: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

  const SelectStrategy = ({label, path, options}
  :{
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
  if(!queryResult || queryResult.isLoading) {
    return (
      <Edit>
        <Loader />
      </Edit>
    )
  }
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
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
          <Text mt={2} size="xs" color="red">
            {errors.content}
          </Text>
        )}
      </form>
    </Edit>
  );
};

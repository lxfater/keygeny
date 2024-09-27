import React, {useEffect, useState} from "react";
import {Edit, Show, useForm, useSelect} from "@refinedev/mantine";

import {Select, TextInput, Text, JsonInput, Loader} from "@mantine/core";

export const ProductEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    setFieldValue,
    refineCore: {query: queryResult},
    errors,
  } = useForm({
    initialValues: {
      attributes: {
        name: "",
        url: "",
        distributionStrategy: "",
        metadata: {},
      }
    },
    refineCoreProps: {redirect: "show"},
    validate: {
      // attributes.name: (value) => (value.length < 2 ? "Too short name" : null),
      // attributes.distributionStrategy: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

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
        <TextInput mt={8} label="Name" {...getInputProps("attributes.name")} />

        <TextInput mt={8} label="Url" placeholder="Url" {...getInputProps("attributes.url")} />

        <Select mt={8} label="Distribution Strategy" placeholder="Pick one"
                {...getInputProps("attributes.distributionStrategy")}
                data={[
                  {label: "Licensed", value: "LICENSED"},
                  {label: "Open", value: "OPEN"},
                  {label: "Closed", value: "CLOSED"},
                ]}
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
        {/*<Select*/}
        {/*  mt={8}*/}
        {/*  label="Status"*/}
        {/*  placeholder="Pick one"*/}
        {/*  {...getInputProps("status")}*/}
        {/*  data={[*/}
        {/*    { label: "Published", value: "published" },*/}
        {/*    { label: "Draft", value: "draft" },*/}
        {/*    { label: "Rejected", value: "rejected" },*/}
        {/*  ]}*/}
        {/*/>*/}
        {/*<Select*/}
        {/*  mt={8}*/}
        {/*  label="Category"*/}
        {/*  placeholder="Pick one"*/}
        {/*  {...getInputProps("category.id")}*/}
        {/*  {...selectProps}*/}
        {/*/>*/}
        {/*<Text mt={8} weight={500} size="sm" color="#212529">*/}
        {/*  Content*/}
        {/*</Text>*/}
        {/*<MDEditor data-color-mode="light" {...getInputProps("content")} />*/}
        {errors.content && (
          <Text mt={2} size="xs" color="red">
            {errors.content}
          </Text>
        )}
      </form>
    </Edit>
  );
};

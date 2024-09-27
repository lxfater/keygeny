import React, {useEffect} from "react";
import {Edit, useForm} from "@refinedev/mantine";
import {Checkbox, Group, JsonInput, Loader, NumberInput, Select, Text, TextInput} from "@mantine/core";
import IMachine from "../../interfaces/machine";

export const MachineEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    setFieldValue,
    refineCore: {query: queryResult },
    errors,
  } = useForm<IMachine>({
    initialValues: {
      attributes: {
        fingerprint: "",
        name: "",
        ip: "",
        hostname: "",
        cores: 0,
        platform: "",
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

  const {value: metaDataValue} = getInputProps("attributes.metadata")
  if(!queryResult || (queryResult && queryResult.isLoading)) {
    return (
      <Edit>
        <Loader />
      </Edit>
    )
  }
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput disabled mt={8} label="Fingerprint" {...getInputProps("attributes.fingerprint")} />

        <TextInput mt={8} label="Name" {...getInputProps("attributes.name")} />
        <Group>
          <TextInput mt={8} label="IP" {...getInputProps("attributes.ip")} />
          <TextInput mt={8} label="Hostname" {...getInputProps("attributes.hostname")} />
        </Group>

        <NumberInput mt={8} label="Cores" {...getInputProps("attributes.cores")} />
        <TextInput mt={8} label="Platform" {...getInputProps("attributes.platform")} />

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

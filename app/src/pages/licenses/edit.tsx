import React from "react";
import {Edit, Show, useForm} from "@refinedev/mantine";
import {Checkbox, Group, JsonInput, Loader, NumberInput, Text, TextInput} from "@mantine/core";

export const LicenseEdit: React.FC = () => {
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
        key: null,
        expiry: "",
        uses: 0,
        protected: false,
        suspended: false,
        maxMachines: 0,
        maxProcesses: 0,
        maxUsers: 0,
        maxCores: 0,
        maxUses: 0,
        metadata: {},
      },
      relationships: {
        policy: {
          data: {
            type: "policies",
            id: "",
          }
        }
      }
    },
    refineCoreProps: {redirect: "show"},
    validate: {
      // attributes.name: (value) => (value.length < 2 ? "Too short name" : null),
      // attributes.distributionStrategy: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

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
        <TextInput disabled mt={8} label="Key" {...getInputProps("attributes.key")} />

        <TextInput mt={8} label="Name" {...getInputProps("attributes.name")} />

        <TextInput mt={8} label="Expiry" {...getInputProps("attributes.expiry")} />

        <NumberInput mt={8} label="Uses" {...getInputProps("attributes.uses")} />

        <Checkbox mt={8} label="Protected" {...getInputProps("attributes.protected", {type: 'checkbox'})} />

        <Checkbox mt={8} label="Suspended" {...getInputProps("attributes.suspended", {type: 'checkbox'})} />

        <Group>
          <NumberInput mt={8} label="Max Machines" {...getInputProps("attributes.maxMachines")} />

          <NumberInput mt={8} label="Max Processes" {...getInputProps("attributes.maxProcesses")} />

          <NumberInput mt={8} label="Max Users" {...getInputProps("attributes.maxUsers")} />

          <NumberInput mt={8} label="Max Cores" {...getInputProps("attributes.maxCores")} />

          <NumberInput mt={8} label="Max Uses" {...getInputProps("attributes.maxUses")} />
        </Group>

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

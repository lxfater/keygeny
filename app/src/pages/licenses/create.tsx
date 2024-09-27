import React from "react";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import {Select, TextInput, Text, NumberInput, Checkbox, JsonInput} from "@mantine/core";
import IPolicy from "../../interfaces/policy";

export const LicenseCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, errors, setFieldValue } = useForm({
    initialValues: {
      attributes: { },
      relationships: {
        policy: {
          data: {
            type: "policy",
            id: "",
          }
        }
      }
    },
    refineCoreProps: { redirect: "show" },
    // validate: {
    //   title: (value) => (value.length < 2 ? "Too short title" : null),
    //   status: (value) => (value.length <= 0 ? "Status is required" : null),
    //   category: {
    //     id: (value) => (value.length <= 0 ? "Category is required" : null),
    //   },
    //   content: (value) => (value.length < 10 ? "Too short content" : null),
    // },
  });

  const { selectProps } = useSelect<IPolicy>({
    resource: "policies",
    // @ts-ignore
    optionLabel: "attributes.name",
  });
  const {value, onChange } = getInputProps("attributes.metadata")

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <Select
            required
            mt={8}
            label="Policy"
            placeholder="Pick one"
            {...selectProps}
            {...getInputProps("relationships.policy.data.id")}
        />

        <TextInput mt={8} label="Name" {...getInputProps("attributes.name")} />

        <TextInput disabled mt={8} label="Key" {...getInputProps("attributes.key")} />

        <TextInput mt={8} label="Expiry" {...getInputProps("attributes.expiry")} />

        <NumberInput mt={8} label="Uses" {...getInputProps("attributes.uses")} />

        <Checkbox mt={8} label="Protected" {...getInputProps("attributes.protected", { type: 'checkbox' })} />

        <Checkbox mt={8} label="Suspended" {...getInputProps("attributes.suspended", { type: 'checkbox' })} />

        <NumberInput mt={8} label="Max Machines" {...getInputProps("attributes.maxMachines")} />

        <NumberInput mt={8} label="Max Processes" {...getInputProps("attributes.maxProcesses")} />

        <NumberInput mt={8} label="Max Users" {...getInputProps("attributes.maxUsers")} />

        <NumberInput mt={8} label="Max Cores" {...getInputProps("attributes.maxCores")} />

        <NumberInput mt={8} label="Max Uses" {...getInputProps("attributes.maxUses")} />

        <JsonInput
            mt={8}
            label="Metadata"
            placeholder="{ key: value }"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
            {...getInputProps("attributes.metadata")}
            value={JSON.stringify(value, null, 2)}
            onChange={value => {
              setFieldValue("attributes.metadata", JSON.parse(value))
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

import React from "react";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import {TextInput, Text, JsonInput, NumberInput, Select} from "@mantine/core";
import IPolicy from "../../interfaces/policy";

export const MachineCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, setFieldValue, errors } = useForm({
    initialValues: {
      attributes: {},
      relationships: {
          license: {
              data: {
                  type: "license",
                  id: "",
              }
          }
      }
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
  const { selectProps } = useSelect<IPolicy>({
      resource: "licenses",
      // @ts-ignore
      optionLabel: "attributes.key",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
          <Select
              required
              mt={8}
              label="License"
              placeholder="Pick one"
              {...selectProps}
              {...getInputProps("relationships.license.data.id")}
          />
          <TextInput required mt={8} label="Fingerprint" placeholder={"705183f0-4f13-4448-832b-44953a383384"} {...getInputProps("attributes.fingerprint")} />

          <NumberInput mt={8} label="Cores" {...getInputProps("attributes.cores")} />

          <TextInput mt={8} label="Name" {...getInputProps("attributes.name")} />

          <TextInput mt={8} label="IP" {...getInputProps("attributes.ip")} />

          <TextInput mt={8} label="Hostname" {...getInputProps("attributes.hostname")} />

          <TextInput mt={8} label="Platform" {...getInputProps("attributes.platform")} />

          <NumberInput disabled mt={8} label="Max Processes" {...getInputProps("attributes.maxProcesses")} />

          <NumberInput disabled mt={8} label="Require Heartbeat" {...getInputProps("attributes.requireHeartbeat")} />

          <TextInput disabled mt={8} label="Heartbeat Status" {...getInputProps("attributes.heartbeatStatus")} />

          <NumberInput disabled mt={8} label="Heartbeat Duration" {...getInputProps("attributes.heartbeatDuration")} />

          <TextInput disabled mt={8} label="Last Heartbeat" {...getInputProps("attributes.lastHeartbeat")} />

          <TextInput disabled mt={8} label="Next Heartbeat" {...getInputProps("attributes.nextHeartbeat")} />

          <TextInput disabled mt={8} label="Last CheckOut" {...getInputProps("attributes.lastCheckOut")} />

          <TextInput disabled mt={8} label="Created" {...getInputProps("attributes.created")} />

          <TextInput disabled mt={8} label="Updated" {...getInputProps("attributes.updated")} />

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

import React from "react";
import {Edit, Show, useForm} from "@refinedev/mantine";
import {Checkbox, Group, JsonInput, Loader, NumberInput, Select, Stack, Text, TextInput, Title} from "@mantine/core";
import IMachine from "../../interfaces/machine";

export const PolicyEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    setFieldValue,
    refineCore: {query: queryResult},
    errors,
  } = useForm<IMachine>({
    initialValues: {
      attributes: {
        name: "",
        duration: 0,
        strict: false,
        floating: false,
        scheme: "",
        requireProductScope: false,
        requirePolicyScope: false,
        requireMachineScope: false,
        requireFingerprintScope: false,
        requireComponentsScope: false,
        requireUserScope: false,
        requireChecksumScope: false,
        requireVersionScope: false,
        requireCheckIn: false,
        checkInInterval: "",
        checkInIntervalCount: 0,
        usePool: false,
        maxMachines: 0,
        maxProcesses: 0,
        maxUsers: 0,
        maxCores: 0,
        maxUses: 0,
        encrypted: false,
        protected: false,
        requireHeartbeat: false,
        heartbeatDuration: null,
        heartbeatCullStrategy: "",
        heartbeatResurrectionStrategy: "",
        heartbeatBasis: "",
        machineUniquenessStrategy: "",
        machineMatchingStrategy: "",
        componentUniquenessStrategy: "",
        componentMatchingStrategy: "",
        expirationStrategy: "",
        expirationBasis: "",
        renewalBasis: "",
        transferStrategy: "",
        authenticationStrategy: "",
        machineLeasingStrategy: "",
        processLeasingStrategy: "",
        overageStrategy: "",
        metadata: {},
      }
    },
    refineCoreProps: {redirect: "show"},
    validate: {
      // attributes.name: (value) => (value.length < 2 ? "Too short name" : null),
      // attributes.distributionStrategy: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

  const {value: metaDatavalue} = getInputProps("attributes.metadata")
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
        <TextInput required mt={8} label="Name" {...getInputProps("attributes.name")} />
        <Title mt={8} size={"h3"}>General</Title>
        <NumberInput mt={8} label="Duration" {...getInputProps("attributes.duration")} />

        <Checkbox mt={8} label="Strict" {...getInputProps("attributes.strict", {type: 'checkbox'})} />

        <Checkbox mt={8} label="Floating" {...getInputProps("attributes.floating", {type: 'checkbox'})} />

        <Checkbox mt={8}
                  label="Require Product Scope" {...getInputProps("attributes.requireProductScope", {type: 'checkbox'})} />

        <Checkbox mt={8}
                  label="Require Policy Scope" {...getInputProps("attributes.requirePolicyScope", {type: 'checkbox'})} />

        <Checkbox mt={8} label="Require Fingerprint Scope" {...getInputProps("attributes.requireFingerprintScope")} />

        <Checkbox mt={8}
                  label="Require User Scope" {...getInputProps("attributes.requireUserScope", {type: 'checkbox'})} />

        <Checkbox mt={8}
                  label="Require Checksum Scope" {...getInputProps("attributes.requireChecksumScope", {type: 'checkbox'})} />

        <Checkbox mt={8}
                  label="Require Version Scope" {...getInputProps("attributes.requireVersionScope", {type: 'checkbox'})} />

        <Select mt={8} label={"Renewal Basis"} placeholder="Pick one"
                {...getInputProps("attributes.renewalBasis")}
                data={[{label: "From Expiry", value: "FROM_EXPIRY"}, {label: "From Now", value: "FROM_NOW"},]}
        />

        <Select mt={8} label={"Transfer Strategy"} placeholder="Pick one"
                {...getInputProps("attributes.transferStrategy")}
                data={[{label: "Reset Expiry", value: "RESET_EXPIRY"}, {label: "Keep Expiry", value: "KEEP_EXPIRY"},]}
        />

        <Select mt={8} label={"Authentication Strategy"} placeholder="Pick one"
                {...getInputProps("attributes.authenticationStrategy")}
                data={[{label: "Token", value: "TOKEN"}, {label: "License", value: "LICENSE"}, {
                  label: "Mixed",
                  value: "MIXED"
                }, {label: "None", value: "NONE"},]}
        />

        <Select mt={8} label={"Process Leasing Strategy"} placeholder="Pick one"
                {...getInputProps("attributes.processLeasingStrategy")}
                data={[{label: "Per Machine", value: "PER_MACHINE"}, {
                  label: "Per License",
                  value: "PER_LICENSE"
                }, {label: "Per User", value: "PER_USER"},]}
        />

        <Select mt={8} label={"Overage Strategy"} placeholder="Pick one"
                {...getInputProps("attributes.overageStrategy")}
                data={[{label: "Always Allow Overage", value: "ALWAYS_ALLOW_OVERAGE"}, {
                  label: "Allow 1.25x Overage",
                  value: "ALLOW_1_25X_OVERAGE"
                }, {label: "Allow 1.5x Overage", value: "ALLOW_1_5X_OVERAGE"}, {
                  label: "Allow 2x Overage",
                  value: "ALLOW_2X_OVERAGE"
                }, {label: "No Overage", value: "NO_OVERAGE"},]}
        />


        <Stack>
          <Title mt={8} size={"h3"}>Heartbeat</Title>
          <Checkbox mt={8} label="Require Heartbeat" {...getInputProps("attributes.requireHeartbeat")} />
          <Group>

            <NumberInput mt={8} label="Heartbeat Duration" {...getInputProps("attributes.heartbeatDuration")} />

            <Select mt={8} label={"Heartbeat Cull Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.heartbeatCullStrategy")}
                    data={[{label: "Deactivate Dead", value: "DEACTIVATE_DEAD"}, {
                      label: "Keep Dead",
                      value: "KEEP_DEAD"
                    },]}
            />

            <Select mt={8} label={"Heartbeat Resurrection Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.heartbeatResurrectionStrategy")}
                    data={[{label: "No Revive", value: "NO_REVIVE"}, {
                      label: "1 Minute Revive",
                      value: "1_MINUTE_REVIVE"
                    }, {label: "2 Minute Revive", value: "2_MINUTE_REVIVE"}, {
                      label: "5 Minute Revive",
                      value: "5_MINUTE_REVIVE"
                    }, {label: "10 Minute Revive", value: "10_MINUTE_REVIVE"}, {
                      label: "15 Minute Revive",
                      value: "15_MINUTE_REVIVE"
                    }, {label: "Always Revive", value: "ALWAYS_REVIVE"},]}
            />

            <Select mt={8} label={"Heartbeat Basis"} placeholder="Pick one"
                    {...getInputProps("attributes.heartbeatBasis")}
                    data={[{label: "From Creation", value: "FROM_CREATION"}, {
                      label: "From First Ping",
                      value: "FROM_FIRST_PING"
                    },]}
            />
          </Group>
        </Stack>
        <Stack>
          <Title mt={8} size={"h3"}>Machine</Title>
          <Checkbox mt={8}
                    label="Require Machine Scope" {...getInputProps("attributes.requireMachineScope", {type: 'checkbox'})} />
          <Group>
            <NumberInput mt={8} label="Max Machines" {...getInputProps("attributes.maxMachines")} />
            <Select mt={8} label={"Machine Uniqueness Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.machineUniquenessStrategy")}
                    data={[{label: "Per Machine", value: "UNIQUE_PER_MACHINE"}, {
                      label: "Per License",
                      value: "UNIQUE_PER_LICENSE"
                    }, {label: "Per Policy", value: "UNIQUE_PER_POLICY"},]}
            />
            <Select mt={8} label={"Machine Matching Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.machineMatchingStrategy")}
                    data={[{label: "Match Any", value: "MATCH_ANY"}, {
                      label: "Match Two",
                      value: "MATCH_TWO"
                    }, {label: "Match Most", value: "MATCH_MOST"}, {label: "Match All", value: "MATCH_ALL"},]}
            />
            <Select mt={8} label={"Machine Leasing Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.machineLeasingStrategy")}
                    data={[{label: "Per License", value: "PER_LICENSE"}, {label: "Per User", value: "PER_USER"},]}
            />

          </Group>
        </Stack>
        <Stack>
          <Title mt={8} size={"h3"}>Component</Title>
          <Checkbox mt={8}
                    label="Require Components Scope" {...getInputProps("attributes.requireComponentsScope", {type: 'checkbox'})} />
          <Group>
            <Select mt={8} label={"Component Uniqueness Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.componentUniquenessStrategy")}
                    data={[{label: "Unique Per Account", value: "UNIQUE_PER_ACCOUNT"}, {
                      label: "Unique Per Product",
                      value: "UNIQUE_PER_PRODUCT"
                    }, {label: "Unique Per Policy", value: "UNIQUE_PER_POLICY"}, {
                      label: "Unique Per License",
                      value: "UNIQUE_PER_LICENSE"
                    }, {label: "Unique Per Machine", value: "UNIQUE_PER_MACHINE"},]}
            />
            <Select mt={8} label={"Component Matching Strategy"} placeholder="Pick one"
                    {...getInputProps("attributes.componentMatchingStrategy")}
                    data={[{label: "Match Any", value: "MATCH_ANY"}, {
                      label: "Match Two",
                      value: "MATCH_TWO"
                    }, {label: "Match Most", value: "MATCH_MOST"}, {label: "Match All", value: "MATCH_ALL"},]}

            />
          </Group>
        </Stack>

        <Group>
          <Stack>
            <Title mt={8} size={"h3"}>Check In</Title>
            <Checkbox mt={8}
                      label="Require Check In" {...getInputProps("attributes.requireCheckIn", {type: 'checkbox'})} />
            <Group>
              <Select mt={8} label={"Check In Interval"}
                      placeholder="Pick one" {...getInputProps("attributes.checkInInterval")}
                      data={[{label: "Day", value: "day"}, {label: "Week", value: "week"}, {
                        label: "Month",
                        value: "month"
                      }, {label: "Year", value: "year"},]}
              />

              <NumberInput mt={8}
                           label="Check In Interval Count" {...getInputProps("attributes.checkInIntervalCount")} />
            </Group>
          </Stack>
        </Group>

        <Group>
          <NumberInput mt={8} label="Max Processes" {...getInputProps("attributes.maxProcesses")} />

          <NumberInput mt={8} label="Max Users" {...getInputProps("attributes.maxUsers")} />

          <NumberInput mt={8} label="Max Cores" {...getInputProps("attributes.maxCores")} />

          <NumberInput mt={8} label="Max Uses" {...getInputProps("attributes.maxUses")} />
        </Group>

        <Checkbox mt={8} label="Protected" {...getInputProps("attributes.protected", {type: 'checkbox'})} />

        <Group>
          <Stack>
            <Title mt={8} size={"h3"}>Expiration</Title>
            <Group>
              <Select mt={8} label={"Expiration Strategy"} placeholder="Pick one"
                      {...getInputProps("attributes.expirationStrategy")}
                      data={[{label: "Restrict Access", value: "RESTRICT_ACCESS"}, {
                        label: "Revoke Access",
                        value: "REVOKE_ACCESS"
                      }, {label: "Maintain Access", value: "MAINTAIN_ACCESS"}, {
                        label: "Allow Access",
                        value: "ALLOW_ACCESS"
                      },]}
              />

              <Select mt={8} label={"Expiration Basis"} placeholder="Pick one"
                      {...getInputProps("attributes.expirationBasis")}
                      data={[{label: "From Creation", value: "FROM_CREATION"}, {
                        label: "From First Validation",
                        value: "FROM_FIRST_VALIDATION"
                      }, {
                        label: "From First Activation",
                        value: "FROM_FIRST_ACTIVATION"
                      }, {label: "From First Download", value: "FROM_FIRST_DOWNLOAD"}, {
                        label: "From First Use",
                        value: "FROM_FIRST_USE"
                      },]}
              />
            </Group>
          </Stack>
        </Group>

        <Title mt={8} size={"h3"}>Misc</Title>
        <Group>

          <TextInput mt={8} label="Created" {...getInputProps("attributes.created")} disabled/>

          <TextInput mt={8} label="Updated" {...getInputProps("attributes.updated")} disabled/>
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
          value={(typeof metaDatavalue) === "string" ? metaDatavalue : JSON.stringify(metaDatavalue, null, 2)}
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

import React, {useState} from "react";
import {useLogin} from "@refinedev/core";
import {Button, ColorScheme, ColorSchemeProvider, Group, TextInput} from "@mantine/core";
import {ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2} from "@refinedev/mantine";
import {IconKey} from "@tabler/icons-react";
import {Header} from "../components/header";
import useAppStateStore from "../_util/appState";

function isToken(token: string): boolean {
  return (token.startsWith("prod-")
    || token.startsWith("admin-")
    || token.startsWith("user-")
  ) && token.length > 60;
}

export default function Login() {
  const [password, setPassword] = useState("")
  const {mutate, isLoading} = useLogin();
  const darkMode = useAppStateStore(state => state.darkMode) as ColorScheme
  const toggleDarkMode = useAppStateStore(state => state.toggleDarkMode)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
    // Calling mutate to submit with the data we've collected from the form.
    mutate(data);

  }
  //   Todo Use authorization for all of this messy filtering to prevent logged out users from accessing the dashboard.
  return (
    <>
      <ColorSchemeProvider colorScheme={darkMode} toggleColorScheme={toggleDarkMode}>
        <ThemedLayoutV2
          Sider={() => <ThemedSiderV2
            Title={(props) => <ThemedTitleV2 collapsed={props.collapsed} text={"Keygen Dashboard"} icon={<IconKey/>}/>}
            render={(props) => <></>}/>}
          Title={({collapsed}) => (
            <ThemedTitleV2
              // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
              collapsed={collapsed}
              icon={collapsed ? <IconKey/> : <IconKey/>}
              text="Keygen Dashboard"
            />
          )}
          Header={Header}
        >
          <div>
            <form onSubmit={onSubmit}>
              <TextInput
                name={"domain"}
                mt={8}
                label="Keygen.sh Url"
                placeholder="https://example.tld/v1"
              />
              <Group>
                <TextInput
                  name={"username"}
                  mt={8}
                  disabled={isToken(password)}
                  label={`${isToken(password) ? "(Not used with token)" : "Username"}`}
                  placeholder="myuser"
                />
                <TextInput
                  name={"password"}
                  type={"password"}
                  mt={8}
                  label={isToken(password) ? "Token" : "Password (or Token)"}
                  placeholder="admin-"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Group>
              <Button mt={8} type={"submit"} data-umami-event={"login button"}>Login</Button>
              {isLoading && " Loading..."}
            </form>
          </div>
        </ThemedLayoutV2>
      </ColorSchemeProvider>
    </>
  )
}
import { ColorScheme } from "@mantine/core";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

type AppConfig = {
    [key: string]: any;
}

const initialConfig: AppConfig = {
    darkMode: "dark",
}

interface AppConfigStore {
    darkMode: ColorScheme
    toggleDarkMode: () => void
    resetAppConfig: () => void
    apiUrl: string
    setApiUrl: (url: string) => void
    apiToken: string
    setApiToken: (token: string) => void
}

const useAppStateStore = create<AppConfigStore>()(
    persist(
        (set, get) => ({
            darkMode: "dark",
            toggleDarkMode: () => set(() => ({darkMode: get().darkMode === "dark" ? "light" : "dark"})),
            resetAppConfig: () => set(initialConfig),
            apiUrl: '',
            setApiUrl: (url: string) => set(() => ({apiUrl: url})),
            apiToken: '',
            setApiToken: (token: string) => set(() => ({apiToken: token})),
        }),
        {
            name: 'config-storage',
            storage: createJSONStorage(() => localStorage)
        }
    ))
export default useAppStateStore
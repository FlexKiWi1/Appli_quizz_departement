import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Module } from "../types";

type ModuleContextType = {
    module: Module,
    setModule: React.Dispatch<React.SetStateAction<Module>>,
    lastTab: string,
    setLastTab: React.Dispatch<React.SetStateAction<string>>,
}

const ModuleContext = createContext<ModuleContextType>({
    module: {},
})

export function ModuleProvider({children}: PropsWithChildren) {
    const [module, setModule] = useState<Module>({})
    const [lastTab, setLastTab] = useState<string>("")

    return <ModuleContext.Provider value={{
        module: module,
        setModule: setModule,
        lastTab: lastTab,
        setLastTab: setLastTab,
    }}>
        {children}
    </ModuleContext.Provider>
}

export function useModule() {
    return useContext(ModuleContext)
}


import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Module } from "../types";

type ModuleContextType = {
    module: Module,
    setModule: (module: Module) => void,
}

const ModuleContext = createContext<ModuleContextType>({
    module: {},
    setModule: (module: Module) => null,
})

export function ModuleProvider({children}: PropsWithChildren) {
    const [module, setModule] = useState<Module>({})

    return <ModuleContext.Provider value={{
        module: module,
        setModule: setModule
    }}>
        {children}
    </ModuleContext.Provider>
}

export function useModule() {
    return useContext(ModuleContext)
}


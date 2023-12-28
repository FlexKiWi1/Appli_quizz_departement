import { Module } from "../../types";
import world from "./world/world";
import french from "./french/french";

const modules: Module[] = [
    world,
    french
]

export default modules;
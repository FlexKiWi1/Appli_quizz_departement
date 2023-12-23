
export type EpciRequestParams = {
    nom: string,
    boost: string,
    codeEpci: string,
    codeDepartement: string,
    codeRegion: string,
    zone: Array<"metro" | "dom" | "com">,
    fields: Array<"nom" | "code" | "population" | "financement" | "type" | "codeRegions" | "codeDepartements" | "centre" | "surface" | "contour" | "bbox" | "zone">,
    geometry: "centre" | "contour" | "bbox",
}
import apiGeo from "./config"
import { EpciRequestParams } from "./types"

export const departments = {
    list: () => apiGeo.get('/departements').then(r => r.data),
    retrieve: (code: number) => apiGeo.get(`/departements/${code}`).then(r => r.data)
}

export const region = {
    list: () => apiGeo.get('/regions').then(r => r.data),
    retrieve: (code: number) => apiGeo.get(`/regions/${code}`).then(r => r.data),
    departments: (code: number) => apiGeo.get(`/regions/${code}/departements`).then(r => r.data)
}

export const epcis = {
    list: async (params: EpciRequestParams) => {
        let urlParams = new URLSearchParams()

        for (const [key, value] of Object.entries(params)) {
            if (value != null) {
                urlParams.set(key, value as string)
            }
        }

        return await apiGeo.get(`/epcis?${urlParams.toString()}`).then(r => r.data)
    }
}
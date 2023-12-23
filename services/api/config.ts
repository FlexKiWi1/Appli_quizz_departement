import axios from "axios";

const apiGeo = axios.create({
    baseURL: "https://geo.api.gouv.fr",
    headers: {
        "Content-Type": "application/json"
    }
})

export default apiGeo;
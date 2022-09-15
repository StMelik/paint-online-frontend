import axios, { AxiosRequestConfig } from 'axios'
import { configApi } from './configApi'

class Api {
    configApi: AxiosRequestConfig

    constructor(configApi: AxiosRequestConfig) {
        this.configApi = configApi
    }

    getImage(id: string): Promise<string> {
        return axios.get('/image', {
            ...this.configApi,
            params: { id }
        })
            .then(res => res.data)
            .catch(e => console.log(e.data))
    }

    postImage(img: string, name: string) {
        axios.post('/image', { img, name }, this.configApi)
            .then(res => console.log(res.data))
            .catch(e => console.log(e.data))
    }
}

export default new Api(configApi)

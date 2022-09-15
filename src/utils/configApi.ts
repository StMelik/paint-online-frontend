import { AxiosRequestConfig } from 'axios'
import { SERVER_URL } from './constants'

export const configApi: AxiosRequestConfig = {
    baseURL: SERVER_URL,
}

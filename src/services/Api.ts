import SignInInterface from '@/types/SignInInterface'
import * as process from 'process'
import axios, { AxiosInstance } from 'axios'
import TokenInterface from '@/types/TokenInterface'
import { AxiosResponse } from 'axios'
import { useAppStore } from '@/store/app'

export function doAuth(login: SignInInterface): Promise<AxiosResponse<any>> {
    return axios.post(
        import.meta.env.VITE_API_URL + '/tokens/authentication',
        {
            data: {
                type: 'tokens',
                attributes: {
                    email: login.email,
                    password: login.password,
                },
            },
        },
        {
            headers: {
                'content-type': 'application/vnd.api+json',
                accept: 'application/vnd.api+json',
            },
        }
    )
}

export function doUserInfo(): Promise<AxiosResponse<any>> {
    const http = createHttp()
    return http.get(import.meta.env.VITE_API_URL + '/my')
}

export function foldersFetch(page: number): Promise<AxiosResponse<any>> {
    const http = createHttp()
    const pageSize = import.meta.env.VITE_API_PAGE_SIZE
    return http.get(
        import.meta.env.VITE_API_URL +
            '/folders?page[number]=' +
            page +
            '&page[size]=' +
            pageSize
    )
}

export function listsFromFolder(page: number): Promise<AxiosResponse<any>> {
    const http = createHttp()
    const pageSize = import.meta.env.VITE_API_PAGE_SIZE
    const storage = useAppStore()
    const folderId = storage.selectedFolder
    return http.get(
        import.meta.env.VITE_API_URL +
            '/folders/' +
            folderId +
            '/lists' +
            '?page[number]=' +
            page +
            '&page[size]=' +
            pageSize
    )
}

function createHttp(): AxiosInstance {
    const storage = useAppStore()
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'content-type': 'application/vnd.api+json',
            accept: 'application/vnd.api+json',
            Authorization: 'Bearer ' + storage.token,
        },
    })
}

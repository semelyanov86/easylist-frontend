import SignInInterface from '@/types/SignInInterface'
import * as process from 'process'
import axios, { AxiosInstance } from 'axios'
import TokenInterface from '@/types/TokenInterface'
import { AxiosResponse } from 'axios'
import { useAppStore } from '@/store/app'
import FolderInterface from '@/types/FolderInterface'
import serializeToJsonApi from '@/services/JsonApiConverter'
import ListInterface from '@/types/ListInterface'
import MovedInterface from '@/types/MovedInterface'

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

export function foldersFetch(
    page: number,
    search: string
): Promise<AxiosResponse<any>> {
    const http = createHttp()
    let pageSize = import.meta.env.VITE_API_PAGE_SIZE
    let postQuery = ''
    if (search) {
        pageSize = import.meta.env.VITE_API_PAGE_SIZE_IN_SEARCH
        postQuery = '&filter[name]=' + search
    }
    return http.get(
        import.meta.env.VITE_API_URL +
            '/folders?page[number]=' +
            page +
            '&page[size]=' +
            pageSize +
            postQuery
    )
}

export function listsFromFolder(
    page: number,
    search: string
): Promise<AxiosResponse<any>> {
    const http = createHttp()
    let pageSize = import.meta.env.VITE_API_PAGE_SIZE
    let postQuery = ''
    if (search) {
        pageSize = import.meta.env.VITE_API_PAGE_SIZE_IN_SEARCH
        postQuery = '&filter[name]=' + search
    }
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
            pageSize +
            postQuery
    )
}

export function createOrUpdateFolder(
    folder: FolderInterface
): Promise<AxiosResponse<any>> {
    const http = createHttp()
    if (folder.id && typeof folder.id === 'number') {
        folder.id = folder.id.toString()
    }
    if (folder.id && folder.id > 0) {
        return http.patch(
            import.meta.env.VITE_API_URL + '/folders/' + folder.id,
            serializeToJsonApi<FolderInterface>(folder, 'folders')
        )
    }
    return http.post(
        import.meta.env.VITE_API_URL + '/folders/',
        serializeToJsonApi<FolderInterface>(folder, 'folders')
    )
}

export function getFolderById(id: number): Promise<AxiosResponse<any>> {
    const http = createHttp()
    return http.get(import.meta.env.VITE_API_URL + '/folders/' + id)
}

export function getListById(id: number): Promise<AxiosResponse<any>> {
    const http = createHttp()
    return http.get(import.meta.env.VITE_API_URL + '/lists/' + id)
}

export function createOrUpdateList(
    list: ListInterface
): Promise<AxiosResponse<any>> {
    const http = createHttp()
    if (list.id && typeof list.id === 'number') {
        list.id = list.id.toString()
    }
    if (list.id && list.id > 0) {
        return http.patch(
            import.meta.env.VITE_API_URL + '/lists/' + list.id,
            serializeToJsonApi<ListInterface>(list, 'lists')
        )
    }
    return http.post(
        import.meta.env.VITE_API_URL + '/lists/',
        serializeToJsonApi<ListInterface>(list, 'lists')
    )
}

export function updateOrderOfFolder(
    moved: MovedInterface<FolderInterface>
): Promise<AxiosResponse<any>> {
    const http = createHttp()
    const storage = useAppStore()
    const prevFolder = storage.folders[moved.moved.newIndex - 1]
    return http.patch(
        import.meta.env.VITE_API_URL + '/folders/' + moved.moved.element.id,
        {
            data: {
                id: moved.moved.element.id.toString,
                type: 'folders',
                attributes: {
                    order: prevFolder.order + 1,
                },
            },
        }
    )
}

export function updateOrderOfList(
    moved: MovedInterface<ListInterface>
): Promise<AxiosResponse<any>> {
    const http = createHttp()
    const storage = useAppStore()
    const prevList = storage.lists[moved.moved.newIndex - 1]
    return http.patch(
        import.meta.env.VITE_API_URL + '/lists/' + moved.moved.element.id,
        {
            data: {
                id: moved.moved.element.id.toString,
                type: 'lists',
                attributes: {
                    order: prevList.order + 1,
                },
            },
        }
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

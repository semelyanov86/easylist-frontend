// Utilities
import { defineStore } from 'pinia'
import UserInterface from '@/types/UserInterface'
import { AxiosError } from 'axios'
import ListInterface from '@/types/ListInterface'
import FolderInterface from '@/types/FolderInterface'

export const useAppStore = defineStore('app', {
    state: () => ({
        token: <string>'',
        error: <string>'',
        errorAlert: <boolean>false,
        user: <UserInterface>{},
        selectedFolder: 1,
        selectedList: <ListInterface>{},
        loading: false,
        folders: [] as FolderInterface[],
        lists: [] as ListInterface[],
        message: '',
    }),
    getters: {
        getAllFolders(state): FolderInterface[] {
            const folders: FolderInterface[] = [
                {
                    id: 1,
                    name: 'default',
                    icon: 'mdi-folder',
                    order: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]
            state.folders.forEach(function (folder) {
                folders.push(folder)
            })
            return folders
        },
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUser(user: UserInterface) {
            this.user = user
        },
        setError(err: string) {
            this.errorAlert = true
            this.error = err
        },
        removeError() {
            this.errorAlert = false
            this.error = ''
        },
        setErrorFromAxios(err: AxiosError) {
            this.errorAlert = true
            // @ts-ignore
            if (err.response && err.response.data && err.response.data.errors) {
                // @ts-ignore
                const errors = err.response.data.errors[0]
                this.error = errors.detail
                return
            }
            this.error = err.message
        },
        addFolder(folder: FolderInterface) {
            if (folder.name == 'default') {
                return
            }
            const foundFolder = this.folders.findIndex(
                (folderCurrent: FolderInterface) =>
                    folderCurrent.id === folder.id
            )
            if (foundFolder < 0) {
                this.folders.push(folder)
            } else {
                this.folders[foundFolder] = folder
            }
        },
        addList(list: ListInterface) {
            const foundList = this.lists.findIndex(
                (listCurrent: ListInterface) => listCurrent.id === list.id
            )
            if (foundList < 0) {
                this.lists.push(list)
            } else {
                this.lists[foundList] = list
            }
        },
        setDefaultsForData() {
            this.folders = []
            this.lists = []
        },
    },
})

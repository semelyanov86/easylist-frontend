// Utilities
import { defineStore } from 'pinia'
import UserInterface from '@/types/UserInterface'
import { AxiosError } from 'axios'
import ListInterface from '@/types/ListInterface'
import FolderInterface from '@/types/FolderInterface'
import ItemInterface from '@/types/ItemInterface'

export const useAppStore = defineStore('app', {
    state: () => ({
        token: <string>'',
        error: <string>'',
        errorAlert: <boolean>false,
        user: <UserInterface>{},
        selectedFolder: 1,
        selectedList: <ListInterface | null>null,
        loading: false,
        folders: [] as FolderInterface[],
        lists: [] as ListInterface[],
        message: '',
        items: [] as ItemInterface[],
        itemsPage: 1,
        itemsSearch: '',
        itemsTotal: 0,
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
            } else if (list.folder_id == this.selectedFolder) {
                this.lists[foundList] = list
            } else {
                this.lists.splice(foundList, 1)
            }
        },
        addListsFromResponse(response: any) {
            const storage = useAppStore()
            response.data.data.forEach(function (result: any) {
                const list: ListInterface = {
                    id: parseInt(result.id),
                    name: result.attributes.name,
                    icon: result.attributes.icon,
                    order: result.attributes.order,
                    folder_id: result.attributes.folder_id,
                    link: result.attributes.link,
                    items_count: result.attributes.items_count
                        ? result.attributes.items_count
                        : 0,
                    created_at: new Date(result.attributes.created_at),
                    updated_at: new Date(result.attributes.updated_at),
                }
                storage.addList(list)
            })
        },
        setDefaultsForData() {
            this.folders = []
            this.lists = []
            this.setDefaultItems()
        },
        setDefaultItems() {
            this.items = []
            this.itemsPage = 1
            this.itemsSearch = ''
            this.itemsTotal = 0
        },
        setItems(items: ItemInterface[]) {
            this.items = items
        },
        addItemsToList(items: ItemInterface[]) {
            items.forEach((item: ItemInterface) => this.items.push(item))
        },
        addItem(item: ItemInterface) {
            const foundItem = this.items.findIndex(
                (itemCurrent: ItemInterface) => itemCurrent.id === item.id
            )
            if (foundItem < 0) {
                this.items.push(item)
            } else {
                this.items[foundItem] = item
            }
        },
        increaseItemsPage() {
            this.itemsPage++
        },
    },
})

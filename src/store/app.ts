// Utilities
import { defineStore } from 'pinia'
import UserInterface from '@/types/UserInterface'
import { AxiosError } from 'axios'
import ListInterface from '@/types/ListInterface'
import FolderInterface from '@/types/FolderInterface'
import ItemInterface from '@/types/ItemInterface'
import { mapListDataFromResponseAttributes } from '@/services/ResponseDataMapper'

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
        onlyStarred: false,
        hideCompleted: false,
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
        getItems(state): ItemInterface[] {
            let items = state.items
            if (state.onlyStarred) {
                items = items.filter((item) => item.is_starred)
            }
            if (state.hideCompleted) {
                items = items.filter((item) => !item.is_done)
            }
            return items
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
                const list = mapListDataFromResponseAttributes(result, null)
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
            this.onlyStarred = false
            this.hideCompleted = false
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
        deleteItem(item: ItemInterface) {
            const foundItem = this.items.findIndex(
                (itemCurrent: ItemInterface) => itemCurrent.id == item.id
            )
            if (foundItem < 0) {
                return
            }
            this.items.splice(foundItem, 1)
        },
        starOrUnstarItem(item: ItemInterface) {
            const foundItem = this.items.findIndex(
                (itemCurrent: ItemInterface) => itemCurrent.id == item.id
            )
            if (foundItem < 0) {
                return
            }
            this.items[foundItem].is_starred = !this.items[foundItem].is_starred
        },
        increaseItemCounter(listId: number) {
            const foundItem = this.lists.findIndex(
                (itemCurrent: ListInterface) => itemCurrent.id == listId
            )
            if (foundItem < 0) {
                return
            }
            this.lists[foundItem].items_count++
        },
        decreaseItemCounter(listId: number | string | undefined) {
            const foundItem = this.lists.findIndex(
                (itemCurrent: ListInterface) => itemCurrent.id == listId
            )
            if (foundItem < 0) {
                return
            }
            this.lists[foundItem].items_count--
        },
        increaseItemsPage() {
            this.itemsPage++
        },
        markItemDoneOrUndone(item: ItemInterface, isDone: boolean) {
            const foundItem = this.items.findIndex(
                (itemCurrent: ItemInterface) => itemCurrent.id == item.id
            )
            if (foundItem < 0) {
                return
            }
            this.items[foundItem].is_done = isDone
        },
        uncrossItemsInList() {
            this.items = this.items.map((item: ItemInterface) => {
                item.is_done = false
                return item
            })
        },
    },
})

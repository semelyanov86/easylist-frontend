<template>
    <v-container>
        <v-container v-if="storage.error">
            <error-alert
                :text="storage.error"
                @click="storage.removeError()"
                v-model="alert"
            />
        </v-container>
        <v-container>
            <message-alert></message-alert>
        </v-container>
        <atom-loading-indicator></atom-loading-indicator>
        <create-list-or-folder
            :folder-dialog="createFolderMode"
            :list-dialog="createListMode"
            @close-folder-dialog="onCloseFolderDialog"
            @close-list-dialog="onCloseListDialog"
            :folder-id="folderId"
            :list-id="listId"
            :move-to-folder-mode="moveToFolderMode"
        ></create-list-or-folder>
        <v-responsive>
            <v-row>
                <v-col cols="12" lg="4">
                    <lists-and-folders-index
                        @create-folder="onCreateFolder"
                        @create-list="onCreateList"
                        @edit-folder="onEditFolder"
                        @edit-list="onEditList"
                        @move-to-folder="onMoveToFolder"
                        @list-selected="onListSelected"
                    ></lists-and-folders-index>
                </v-col>

                <v-col cols="12" md="6" lg="8" v-if="storage.items.length > 0">
                    <items-index @load-more-items="onLoadMoreItems" />
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import ListsAndFoldersIndex from '@/components/organisms/ListsAndFoldersIndex.vue'
import ItemsIndex from '@/components/organisms/ItemsIndex.vue'
import { useAppStore } from '@/store/app'
import { ref } from 'vue'
import ErrorAlert from '@/components/molecules/ErrorAlert.vue'
import AtomLoadingIndicator from '@/components/atoms/AtomLoadingIndicator.vue'
import CreateListOrFolder from '@/templates/CreateListOrFolder.vue'
import MessageAlert from '@/components/molecules/MessageAlert.vue'
import { tr } from 'vuetify/locale'
import { itemsFromList } from '@/services/Api'
import UserInterface from '@/types/UserInterface'
import ItemInterface from '@/types/ItemInterface'
import { mapItemsDataFromResponse } from '@/services/ResponseDataMapper'

export default {
    components: {
        ListsAndFoldersIndex,
        ItemsIndex,
        ErrorAlert,
        AtomLoadingIndicator,
        CreateListOrFolder,
        MessageAlert,
    },
    setup() {
        const storage = useAppStore()
        const createFolderMode = ref(false)
        const createListMode = ref(false)
        const folderId = ref(0)
        const listId = ref(0)
        const moveToFolderMode = ref(false)

        function onCreateFolder() {
            folderId.value = 0
            createFolderMode.value = true
        }

        function onCreateList() {
            listId.value = 0
            createListMode.value = true
        }

        function onCloseFolderDialog(value: boolean) {
            createFolderMode.value = false
        }

        function onCloseListDialog(value: boolean) {
            createListMode.value = false
            moveToFolderMode.value = false
        }

        function onEditFolder(id: number | string) {
            if (typeof id === 'string') {
                folderId.value = parseInt(id)
            } else {
                folderId.value = id
            }
            createFolderMode.value = true
        }

        function onEditList(id: number | string) {
            if (typeof id === 'string') {
                listId.value = parseInt(id)
            } else {
                listId.value = id
            }
            createListMode.value = true
        }

        function onMoveToFolder(id: number | string) {
            if (typeof id === 'string') {
                listId.value = parseInt(id)
            } else {
                listId.value = id
            }
            moveToFolderMode.value = true
            createListMode.value = true
        }

        function loadItemsData(addToExistingArray = false) {
            storage.loading = true
            const listModel = storage.selectedList
            if (!listModel) {
                return
            }
            let id = listModel.id
            if (typeof id === 'string') {
                id = parseInt(id)
            }
            itemsFromList(id, storage.itemsPage, storage.itemsSearch)
                .then((response) => {
                    const items = mapItemsDataFromResponse(response.data)
                    if (addToExistingArray) {
                        storage.addItemsToList(items)
                    } else {
                        storage.setItems(items)
                    }
                    storage.itemsTotal = response.data.meta.total
                    storage.loading = false
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        }

        function onListSelected() {
            loadItemsData(false)
        }

        function onLoadMoreItems() {
            loadItemsData(true)
        }

        return {
            storage,
            onCreateFolder,
            onCreateList,
            onCloseFolderDialog,
            createFolderMode,
            folderId,
            listId,
            onEditFolder,
            onEditList,
            createListMode,
            onCloseListDialog,
            onMoveToFolder,
            moveToFolderMode,
            onListSelected,
            onLoadMoreItems,
        }
    },
}
</script>

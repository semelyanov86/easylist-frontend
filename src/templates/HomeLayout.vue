<template>
    <v-container>
        <messages-block></messages-block>
        <create-list-or-folder
            :folder-dialog="createFolderMode"
            :list-dialog="createListMode"
            @close-folder-dialog="onCloseFolderDialog"
            @close-list-dialog="onCloseListDialog"
            :folder-id="folderId"
            :list-id="listId"
            :move-to-folder-mode="moveToFolderMode"
        ></create-list-or-folder>
        <create-item
            :item-dialog="createItemMode"
            :item-id="itemId"
            @close-item-dialog="onCloseItemDialog"
        ></create-item>
        <send-email-popup
            :email-dialog="sendEmailMode"
            @close-email-popup="sendEmailMode = false"
        ></send-email-popup>
        <make-public-popup
            :public-dialog="makePublicMode"
            @close-public-popup="makePublicMode = false"
        ></make-public-popup>
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

                <v-col cols="12" md="6" lg="8" v-if="storage.selectedList">
                    <items-index
                        @load-more-items="onLoadMoreItems"
                        @items-search="onItemsSearch"
                        @create-item="onCreateItem"
                        @edit-item="onEditItem"
                        @send-email-form="sendEmailMode = true"
                        @make-public-form="makePublicMode = true"
                    />
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
import CreateItem from '@/templates/CreateItem.vue'
import SendEmailPopup from '@/templates/SendEmailPopup.vue'
import MakePublicPopup from '@/templates/MakePublicPopup.vue'
import MessagesBlock from '@/components/molecules/MessagesBlock.vue'

export default {
    components: {
        MessagesBlock,
        MakePublicPopup,
        SendEmailPopup,
        CreateItem,
        ListsAndFoldersIndex,
        ItemsIndex,
        CreateListOrFolder,
    },
    setup() {
        const storage = useAppStore()
        const createFolderMode = ref(false)
        const createListMode = ref(false)
        const sendEmailMode = ref(false)
        const makePublicMode = ref(false)
        const folderId = ref(0)
        const listId = ref(0)
        const moveToFolderMode = ref(false)
        const createItemMode = ref(false)
        const itemId = ref(0)

        function onCreateFolder() {
            folderId.value = 0
            createFolderMode.value = true
        }

        function onCreateList() {
            listId.value = 0
            createListMode.value = true
        }

        function onCreateItem() {
            createItemMode.value = true
        }

        function onEditItem(id: number) {
            itemId.value = id
            onCreateItem()
        }

        function onCloseFolderDialog(value: boolean) {
            createFolderMode.value = false
        }

        function onCloseListDialog(value: boolean) {
            createListMode.value = false
            moveToFolderMode.value = false
        }

        function onCloseItemDialog(value: boolean) {
            itemId.value = 0
            createItemMode.value = false
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

        function onItemsSearch(value: string) {
            if (!value || value.length > 3) {
                loadItemsData(false)
            }
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
            onItemsSearch,
            createItemMode,
            itemId,
            onCreateItem,
            onCloseItemDialog,
            onEditItem,
            sendEmailMode,
            makePublicMode,
        }
    },
}
</script>

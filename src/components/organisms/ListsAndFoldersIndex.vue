<template>
    <v-card class="mx-auto" max-width="600">
        <toolbar
            @search="searchWithFilter"
            @create-folder="onCreateFolder"
            @create-list="onCreateList"
            :showBackButton="storage.selectedFolder !== 1"
            @back-click="onClickBackButton"
            >{{ headerName }}
        </toolbar>
        <lists-and-folders-list
            :nextFolder="nextFolderExists"
            :nextList="nextListExists"
            @load-more-folders="receiveFolders"
            @load-more-lists="receiveLists"
            @edit-folder="onEditFolder"
            @edit-list="onEditList"
            @move-to-folder="onMoveToFolder"
            @folder-selected="onFolderSelected"
        ></lists-and-folders-list>
    </v-card>
</template>

<script lang="ts">
import FolderInterface from '@/types/FolderInterface'
import ListInterface from '@/types/ListInterface'
import { onMounted, ref } from 'vue'
import ListsAndFoldersList from '@/components/molecules/ListsAndFoldersList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'
import { foldersFetch, listsFromFolder } from '@/services/Api'
import { useAppStore } from '@/store/app'
import { AxiosError } from 'axios'
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListsAndFoldersIndex',
    components: {
        ListsAndFoldersList,
        Toolbar,
    },
    emits: [
        'createFolder',
        'createList',
        'editFolder',
        'editList',
        'moveToFolder',
    ],
    setup(props, { emit }) {
        const storage = useAppStore()
        const page = ref(1)
        const listPage = ref(1)
        const nextFolderExists = ref(false)
        const nextListExists = ref(false)
        const searchTerm = ref('')
        const headerName = ref('Choose a list to display items')

        onMounted(() => {
            receiveFolders()
            receiveLists()
        })

        function setDefaultValues() {
            storage.setDefaultsForData()
            page.value = 1
            listPage.value = 1
            nextListExists.value = false
            nextFolderExists.value = false
        }

        function receiveFolders() {
            storage.loading = true
            foldersFetch(page.value, searchTerm.value)
                .then(function (response: any) {
                    nextFolderExists.value = !!response.data.links.next
                    page.value++
                    response.data.data.forEach(function (result: any) {
                        const folder: FolderInterface = {
                            id: parseInt(result.id),
                            name: result.attributes.name,
                            icon: result.attributes.icon,
                            order: result.attributes.order,
                            created_at: new Date(result.attributes.created_at),
                            updated_at: new Date(result.attributes.updated_at),
                        }
                        storage.addFolder(folder)
                        storage.loading = false
                    })
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status == 401) {
                        router.push('/login')
                    }
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        }

        function receiveLists() {
            storage.loading = true
            listsFromFolder(listPage.value, searchTerm.value)
                .then(function (response: any) {
                    nextListExists.value = !!response.data.links.next
                    listPage.value++
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
                    storage.loading = false
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status == 401) {
                        router.push('/login')
                    }
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        }

        function searchWithFilter(value: string | null) {
            if (value != null && value.length < 4) {
                return
            }
            if (value == null) {
                value = ''
            }
            setDefaultValues()
            searchTerm.value = value
            receiveLists()
            receiveFolders()
        }

        function onCreateFolder() {
            emit('createFolder')
        }

        function onCreateList() {
            emit('createList')
        }

        function onEditFolder(id: Number) {
            emit('editFolder', id)
        }

        function onEditList(id: Number) {
            emit('editList', id)
        }

        function onMoveToFolder(id: Number) {
            emit('moveToFolder', id)
        }

        function onFolderSelected(folder: FolderInterface) {
            if (typeof folder.id == 'string') {
                storage.selectedFolder = parseInt(folder.id)
            } else {
                storage.selectedFolder = folder.id
            }
            headerName.value = folder.name
            setDefaultValues()
            receiveLists()
            receiveFolders()
        }

        function onClickBackButton() {
            setDefaultValues()
            storage.selectedFolder = 1
            receiveFolders()
            receiveLists()
            headerName.value = 'Choose a list to display items'
        }

        return {
            nextListExists,
            nextFolderExists,
            receiveFolders,
            receiveLists,
            searchWithFilter,
            onCreateFolder,
            onCreateList,
            onEditFolder,
            onEditList,
            headerName,
            onFolderSelected,
            storage,
            onClickBackButton,
            onMoveToFolder,
        }
    },
})
</script>

<style scoped></style>

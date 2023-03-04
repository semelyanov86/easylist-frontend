<template>
    <v-card
        :class="{ 'mx-auto': true, 'hidden-md-and-down': storage.selectedList }"
        max-width="600"
    >
        <toolbar
            @search="searchWithFilter"
            @create-folder="onCreateFolder"
            @create-list="onCreateList"
            :showBackButton="storage.selectedFolder !== 1"
            @back-click="onClickBackButton"
        >
            <template v-slot:header>{{ headerName }}</template>
            <template v-slot:actions>
                <add-list-or-folder-btn
                    @create-folder="onCreateFolder"
                    @create-list="onCreateList"
                ></add-list-or-folder-btn>
            </template>
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
            @list-selected="onListSelected"
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
import { mapFolderDataFromResponseAttributes } from '@/services/ResponseDataMapper'
import AddListOrFolderBtn from '@/components/molecules/AddListOrFolderBtn.vue'

export default defineComponent({
    name: 'ListsAndFoldersIndex',
    components: {
        AddListOrFolderBtn,
        ListsAndFoldersList,
        Toolbar,
    },
    emits: [
        'createFolder',
        'createList',
        'editFolder',
        'editList',
        'moveToFolder',
        'listSelected',
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

        function receiveFolders(largePaginate = false) {
            storage.loading = true
            foldersFetch(page.value, searchTerm.value, largePaginate)
                .then(function (response: any) {
                    nextFolderExists.value = !!response.data.links.next
                    page.value++
                    response.data.data.forEach(function (result: any) {
                        const folder =
                            mapFolderDataFromResponseAttributes(result)
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
                    storage.addListsFromResponse(response)
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
            receiveFolders(true)
        }

        function onClickBackButton() {
            setDefaultValues()
            storage.selectedFolder = 1
            receiveFolders()
            receiveLists()
            headerName.value = 'Choose a list to display items'
        }

        function onListSelected() {
            emit('listSelected')
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
            onListSelected,
        }
    },
})
</script>

<style scoped></style>

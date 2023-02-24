<template>
    <v-card class="mx-auto" max-width="600">
        <toolbar>Choose a list to display items</toolbar>
        <lists-and-folders-list
            :folders="folders"
            :lists="lists"
        ></lists-and-folders-list>
    </v-card>
</template>

<script lang="ts">
import FolderInterface from '@/types/FolderInterface'
import ListInterface from '@/types/ListInterface'
import { onMounted, PropType, ref } from 'vue'
import ListsAndFoldersList from '@/components/molecules/ListsAndFoldersList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'
import { foldersFetch, listsFromFolder } from '@/services/Api'
import { useAppStore } from '@/store/app'
import { AxiosError } from 'axios'
import router from '@/router'

export default {
    name: 'ListsAndFoldersIndex',
    components: {
        ListsAndFoldersList,
        Toolbar,
    },
    setup() {
        const storage = useAppStore()
        const folders = ref<FolderInterface[]>([])
        const lists = ref<ListInterface[]>([])
        const page = ref(1)
        const listPage = ref(1)

        onMounted(() => {
            receiveFolders()
            receiveLists()
        })

        function receiveFolders() {
            foldersFetch(page.value).then((response: any) => {
                response.data.data
                    .forEach(function (result: any) {
                        const folder: FolderInterface = {
                            id: result.id,
                            name: result.attributes.name,
                            icon: result.attributes.icon,
                            order: result.attributes.order,
                            created_at: new Date(result.attributes.created_at),
                            updated_at: new Date(result.attributes.updated_at),
                        }
                        if (folder.name != 'default') {
                            folders.value.push(folder)
                        }
                    })
                    .catch((error: AxiosError) => {
                        if (error.response?.status == 401) {
                            router.push('/login')
                        }
                        console.log(error)
                        storage.setErrorFromAxios(error)
                    })
            })
        }

        function receiveLists() {
            listsFromFolder(listPage.value).then((response: any) => {
                response.data.data
                    .forEach(function (result: any) {
                        const list: ListInterface = {
                            id: result.id,
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
                        lists.value.push(list)
                    })
                    .catch((error: AxiosError) => {
                        if (error.response?.status == 401) {
                            router.push('/login')
                        }
                        console.log(error)
                        storage.setErrorFromAxios(error)
                    })
            })
        }
        return { folders, lists }
    },
}
</script>

<style scoped></style>

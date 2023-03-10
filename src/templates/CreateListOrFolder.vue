<template>
    <v-dialog v-model="isFolderOpen" activator="parent" width="auto">
        <edit-folder-card
            @save-folder="saveFolder"
            @close-folder="closeFolder"
            :folder-id="folderId"
        ></edit-folder-card>
    </v-dialog>
    <v-dialog v-model="isListOpen" activator="parent" width="auto">
        <edit-list-card
            @save-list="saveList"
            @close-list="closeList"
            :list-id="listId"
            :move-to-folder-mode="moveToFolderMode"
        ></edit-list-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { defineComponent } from 'vue'
import EditFolderCard from '@/components/organisms/EditFolderCard.vue'
import EditListCard from '@/components/organisms/EditListCard.vue'
import FolderInterface from '@/types/FolderInterface'
import { useAppStore } from '@/store/app'
import { createOrUpdateFolder, createOrUpdateList } from '@/services/Api'
import ListInterface from '@/types/ListInterface'
import {
    mapFolderDataFromResponseAttributes,
    mapListDataFromResponse,
} from '@/services/ResponseDataMapper'

export default defineComponent({
    name: 'CreateListOrFolder',
    components: { EditFolderCard, EditListCard },
    emits: ['closeFolderDialog', 'closeListDialog'],
    props: {
        folderDialog: Boolean,
        folderId: Number,
        listDialog: Boolean,
        listId: Number,
        moveToFolderMode: Boolean,
    },
    setup(props, { emit }) {
        const storage = useAppStore()

        const isFolderOpen = computed({
            get: () => props.folderDialog,
            set: (value) => emit('closeFolderDialog', value),
        })

        const isListOpen = computed({
            get: () => props.listDialog,
            set: (value) => emit('closeListDialog', value),
        })

        function saveFolder(folder: FolderInterface) {
            storage.loading = true
            createOrUpdateFolder(folder)
                .then((response) => {
                    const folder = mapFolderDataFromResponseAttributes(
                        response.data.data
                    )
                    storage.addFolder(folder)
                    storage.loading = false
                    closeFolder()
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    closeFolder()
                    storage.loading = false
                })
        }

        function saveList(list: ListInterface) {
            storage.loading = true
            createOrUpdateList(list)
                .then((response) => {
                    const newList = mapListDataFromResponse(
                        response,
                        parseInt(response.data.data.id)
                    )
                    newList.items_count = list.items_count
                    storage.addList(newList)
                    storage.loading = false
                    closeList()
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    closeList()
                    storage.loading = false
                })
        }

        function closeFolder() {
            emit('closeFolderDialog', false)
        }

        function closeList() {
            emit('closeListDialog', false)
        }

        return {
            isFolderOpen,
            saveFolder,
            closeFolder,
            closeList,
            saveList,
            isListOpen,
        }
    },
})
</script>

<style scoped></style>

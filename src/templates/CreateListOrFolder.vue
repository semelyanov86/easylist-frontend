<template>
    <v-dialog v-model="isFolderOpen" activator="parent" width="auto">
        <edit-folder-card
            @save-folder="saveFolder"
            @close-folder="closeFolder"
            :folder-id="folderId"
        ></edit-folder-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { defineComponent } from 'vue'
import EditFolderCard from '@/components/organisms/EditFolderCard.vue'
import FolderInterface from '@/types/FolderInterface'
import { useAppStore } from '@/store/app'
import { createOrUpdateFolder } from '@/services/Api'
import UserInterface from '@/types/UserInterface'

export default defineComponent({
    name: 'CreateListOrFolder',
    components: { EditFolderCard },
    emits: ['closeFolderDialog'],
    props: {
        folderDialog: Boolean,
        folderId: Number,
    },
    setup(props, { emit }) {
        const storage = useAppStore()

        const isFolderOpen = computed({
            get: () => props.folderDialog,
            set: (value) => emit('closeFolderDialog', value),
        })

        function saveFolder(folder: FolderInterface) {
            storage.loading = true
            createOrUpdateFolder(folder)
                .then((response) => {
                    const folder: FolderInterface = {
                        id: response.data.data.id,
                        name: response.data.data.attributes.name,
                        icon: response.data.data.attributes.icon,
                        order: response.data.data.attributes.order,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
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

        function closeFolder() {
            emit('closeFolderDialog', false)
        }

        return { isFolderOpen, saveFolder, closeFolder }
    },
})
</script>

<style scoped></style>

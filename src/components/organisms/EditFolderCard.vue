<template>
    <v-card>
        <atom-card-title>Create New Folder</atom-card-title>
        <edit-folder-form
            @save-folder="saveFolder"
            @close-folder="closeFolder"
            :folder-id="folderId"
        ></edit-folder-form>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import FolderInterface from '@/types/FolderInterface'
import AtomCardTitle from '@/components/atoms/AtomCardTitle.vue'
import EditFolderForm from '@/components/molecules/EditFolderForm.vue'

export default defineComponent({
    name: 'EditFolderCard',
    emits: ['saveFolder', 'closeFolder'],
    props: {
        folderId: Number,
    },
    components: {
        AtomCardTitle,
        EditFolderForm,
    },
    setup(props, { emit }) {
        function saveFolder(folderModel: FolderInterface) {
            emit('saveFolder', folderModel)
        }
        function closeFolder() {
            emit('closeFolder')
        }
        return { saveFolder, closeFolder }
    },
})
</script>

<style scoped></style>

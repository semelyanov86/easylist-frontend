<template>
    <v-card>
        <atom-card-title>Create New List</atom-card-title>
        <edit-list-form
            @save-list="saveList"
            @close-list="closeList"
            :list-id="listId"
            :move-to-folder-mode="moveToFolderMode"
        ></edit-list-form>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import ListInterface from '@/types/ListInterface'
import AtomCardTitle from '@/components/atoms/AtomCardTitle.vue'
import EditListForm from '@/components/molecules/EditListForm.vue'

export default defineComponent({
    name: 'EditListCard',
    emits: ['saveList', 'closeList'],
    props: {
        listId: Number,
      moveToFolderMode: Boolean
    },
    components: {
        AtomCardTitle,
        EditListForm,
    },
    setup(props, { emit }) {
        function saveList(listModel: ListInterface) {
            emit('saveList', listModel)
        }
        function closeList() {
            emit('closeList')
        }
        return { saveList, closeList }
    },
})
</script>

<style scoped></style>

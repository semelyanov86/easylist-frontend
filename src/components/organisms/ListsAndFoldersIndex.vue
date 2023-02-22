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
import { PropType } from 'vue'
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import ListsAndFoldersList from '@/components/molecules/ListsAndFoldersList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'

export default {
    name: 'ListsAndFoldersIndex',
    components: {
        ListsAndFoldersList,
        Toolbar,
    },
    props: {
        folders: Array as PropType<FolderInterface[]>,
        lists: Array as PropType<ListInterface[]>,
    },
}
</script>

<style scoped></style>

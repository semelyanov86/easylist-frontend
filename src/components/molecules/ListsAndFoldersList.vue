<template>
    <v-list lines="two">
        <atom-subheader text="Folders" />

        <v-list-item
            v-for="folder in folders"
            :key="folder.id"
            :title="folder.name"
            :subtitle="folder.created_at.toDateString()"
        >
            <template v-slot:prepend>
                <v-avatar color="grey-lighten-1">
                    <atom-icon color="default" :icon="folder.icon"></atom-icon>
                </v-avatar>
            </template>

            <template v-slot:append>
                <folder-submenu
                    @edit-folder="editFolder(folder.id)"
                ></folder-submenu>
            </template>
        </v-list-item>
        <atom-load-more v-if="nextFolder" @click="loadMoreFolders"
            >Load More</atom-load-more
        >

        <atom-divider inset></atom-divider>

        <atom-subheader text="Lists" />

        <v-list-item
            v-for="list in lists"
            :key="list.id"
            :title="list.name"
            :subtitle="listSubtitle(list)"
        >
            <template v-slot:prepend>
                <v-avatar color="default">
                    <atom-icon color="default" :icon="list.icon"></atom-icon>
                </v-avatar>
            </template>

            <template v-slot:append>
                <list-submenu></list-submenu>
            </template>
        </v-list-item>
        <atom-load-more v-if="nextList" @click="loadMoreLists"
            >Load More</atom-load-more
        >
    </v-list>
</template>

<script lang="ts">
import FolderInterface from '@/types/FolderInterface'
import ListInterface from '@/types/ListInterface'
import { PropType } from 'vue'
import FolderSubmenu from '@/components/molecules/FolderSubmenu.vue'
import AtomIcon from '@/components/atoms/AtomIcon.vue'
import AtomSubheader from '@/components/atoms/AtomSubheader.vue'
import AtomDivider from '@/components/atoms/AtomDivider.vue'
import ListSubmenu from '@/components/molecules/ListSubmenu.vue'
import AtomLoadMore from '@/components/atoms/AtomLoadMore.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['loadMoreFolders', 'loadMoreLists', 'editFolder'],
    name: 'ListsAndFoldersList',
    components: {
        AtomIcon,
        AtomSubheader,
        AtomDivider,
        FolderSubmenu,
        ListSubmenu,
        AtomLoadMore,
    },
    props: {
        folders: Array as PropType<FolderInterface[]>,
        lists: Array as PropType<ListInterface[]>,
        nextFolder: Boolean,
        nextList: Boolean,
    },
    setup(props, { emit }) {
        function listSubtitle(list: ListInterface): string {
            return list.items_count + ' items'
        }
        function loadMoreFolders() {
            emit('loadMoreFolders')
        }
        function loadMoreLists() {
            emit('loadMoreLists')
        }
        function editFolder(id: Number) {
            emit('editFolder', id)
        }
        return {
            listSubtitle,
            loadMoreFolders,
            loadMoreLists,
            editFolder,
        }
    },
})
</script>

<style scoped></style>

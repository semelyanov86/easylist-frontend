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
                <folder-submenu></folder-submenu>
            </template>
        </v-list-item>

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

export default {
    name: 'ListsAndFoldersList',
    components: {
        AtomIcon,
        AtomSubheader,
        AtomDivider,
        FolderSubmenu,
        ListSubmenu,
    },
    props: {
        folders: Array as PropType<FolderInterface[]>,
        lists: Array as PropType<ListInterface[]>,
    },
    setup() {
        function listSubtitle(list: ListInterface): string {
            return list.items_count + ' items'
        }
        return {
            listSubtitle,
        }
    },
}
</script>

<style scoped></style>

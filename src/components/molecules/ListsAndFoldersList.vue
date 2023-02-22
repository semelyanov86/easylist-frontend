<template>
    <v-list lines="two">
        <atom-subheader text="Folders" />

        <v-list-item
            v-for="folder in folders"
            :key="folder.id"
            :title="folder.name"
            :subtitle="folder.created_at"
        >
            <template v-slot:prepend>
                <v-avatar color="grey-lighten-1">
                    <atom-icon color="default" :icon="folder.icon"></atom-icon>
                </v-avatar>
            </template>

            <template v-slot:append>
                <v-btn
                    color="grey-lighten-1"
                    icon="mdi-information"
                    variant="text"
                ></v-btn>
            </template>
        </v-list-item>

        <atom-divider inset></atom-divider>

        <atom-subheader text="Lists" />

        <v-list-item
            v-for="list in lists"
            :key="list.id"
            :title="list.name"
            :subtitle="list.created_at"
        >
            <template v-slot:prepend>
                <v-avatar color="default">
                    <atom-icon color="default" :icon="list.icon"></atom-icon>
                </v-avatar>
            </template>

            <template v-slot:append>
                <v-btn
                    color="grey-lighten-1"
                    icon="mdi-information"
                    variant="text"
                ></v-btn>
            </template>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import FolderInterface from '@/types/FolderInterface'
import ListInterface from '@/types/ListInterface'
import { PropType } from 'vue'
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import AtomIcon from '@/components/atoms/AtomIcon.vue'
import AtomSubheader from '@/components/atoms/AtomSubheader.vue'
import AtomDivider from '@/components/atoms/AtomDivider.vue'

export default {
    name: 'ListsAndFoldersList',
    components: {
        AtomBtn,
        AtomIcon,
        AtomSubheader,
        AtomDivider,
    },
    props: {
        folders: Array as PropType<FolderInterface[]>,
        lists: Array as PropType<ListInterface[]>,
    },
}
</script>

<style scoped></style>

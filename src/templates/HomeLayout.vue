<template>
    <v-container>
        <v-container v-if="storage.error">
            <error-alert
                :text="storage.error"
                @click="storage.removeError()"
                v-model="alert"
            />
        </v-container>
        <atom-loading-indicator></atom-loading-indicator>
        <create-list-or-folder
            :folder-dialog="createFolderMode"
            @close-folder-dialog="onCloseFolderDialog"
            :folder-id="folderId"
        ></create-list-or-folder>
        <v-responsive>
            <v-row>
                <v-col cols="12" lg="4">
                    <lists-and-folders-index
                        @create-folder="onCreateFolder"
                        @create-list="onCreateList"
                        @edit-folder="onEditFolder"
                    ></lists-and-folders-index>
                </v-col>

                <v-col cols="12" md="6" lg="8">
                    <items-index :items="items" />
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import ListsAndFoldersIndex from '@/components/organisms/ListsAndFoldersIndex.vue'
import ItemsIndex from '@/components/organisms/ItemsIndex.vue'
import { useAppStore } from '@/store/app'
import { ref } from 'vue'
import ErrorAlert from '@/components/molecules/ErrorAlert.vue'
import AtomLoadingIndicator from '@/components/atoms/AtomLoadingIndicator.vue'
import CreateListOrFolder from '@/templates/CreateListOrFolder.vue'

export default {
    components: {
        ListsAndFoldersIndex,
        ItemsIndex,
        ErrorAlert,
        AtomLoadingIndicator,
        CreateListOrFolder,
    },
    setup() {
        const storage = useAppStore()
        const createFolderMode = ref(false)
        const createListMode = ref(false)
        const folderId = ref(0)

        const items = ref([
            {
                id: 1,
                name: 'Brunch this weekend?',
                description: `Ali Connors; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
                id: 2,
                name: 'Second Test',
                description: 'Second Description',
            },
            {
                id: 3,
                name: 'Brunch this weekend?',
                description: `Ali Connors; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
                id: 4,
                name: 'Brunch this weekend?',
                description: `Ali Connors; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
                id: 1,
                name: 'Brunch this weekend?',
                description: `Ali Connors; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
        ])

        function onCreateFolder() {
            folderId.value = 0
            createFolderMode.value = true
        }

        function onCreateList() {
            createListMode.value = true
        }

        function onCloseFolderDialog(value: boolean) {
            createFolderMode.value = false
        }

        function onEditFolder(id: number | string) {
            if (typeof id === 'string') {
                folderId.value = parseInt(id)
            } else {
                folderId.value = id
            }
            createFolderMode.value = true
        }

        return {
            storage,
            items,
            onCreateFolder,
            onCreateList,
            onCloseFolderDialog,
            createFolderMode,
            folderId,
            onEditFolder,
        }
    },
}
</script>

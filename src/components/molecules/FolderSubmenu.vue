<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item @click="editFolder">
                    <v-list-item-title>{{
                        $t('lists.edit-folder')
                    }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FolderSubmenu',
    emits: ['editFolder'],
    components: {
        AtomIconBtn,
    },
    setup(props, { emit }) {
        function editFolder() {
            emit('editFolder')
        }
        return { editFolder }
    },
})
</script>

<style scoped></style>

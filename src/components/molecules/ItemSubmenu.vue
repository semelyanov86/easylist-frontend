<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item>
                    <v-list-item-title @click="editItem">{{
                        $t('items.edit-item')
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="moveItem">
                    <v-list-item-title>{{
                        $t('items.change-list')
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('copyItem')">
                    <v-list-item-title>{{
                        $t('items.copy-item')
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('starItem')">
                    <v-list-item-title>{{
                        $t('items.add-favourites')
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('deleteItem')">
                    <v-list-item-title>{{
                        $t('items.delete-item')
                    }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'ItemSubmenu',
    emits: ['editItem', 'moveItem', 'copyItem', 'starItem', 'deleteItem'],
    components: {
        AtomIconBtn,
    },
    setup(props, { emit }) {
        function editItem() {
            emit('editItem')
        }
        function moveItem() {
            emit('moveItem')
        }
        return { editItem, moveItem }
    },
})
</script>

<style scoped></style>

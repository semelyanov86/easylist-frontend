<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item>
                    <v-list-item-title @click="editItem"
                        >Edit Item</v-list-item-title
                    >
                </v-list-item>
                <v-list-item @click="moveItem">
                    <v-list-item-title>Change List</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('copyItem')">
                    <v-list-item-title>Copy Item</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Add To Favourites</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Delete Item</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ItemSubmenu',
    emits: ['editItem', 'moveItem', 'copyItem'],
    components: {
        AtomIconBtn,
    },
    setup(_, { emit }) {
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

<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item @click="editList">
                    <v-list-item-title>{{$t('lists.edit-list')}}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="moveToFolder">
                    <v-list-item-title>{{ $t('lists.move-to-folder') }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListSubmenu',
    emits: ['editList', 'moveToFolder'],
    components: {
        AtomIconBtn,
    },
    setup(props, { emit }) {
        function editList() {
            emit('editList')
        }
        function moveToFolder() {
            emit('moveToFolder')
        }
        return { editList, moveToFolder }
    },
})
</script>

<style scoped></style>

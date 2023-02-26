<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item @click="editList">
                    <v-list-item-title>Edit List</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Move To Folder</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import {defineComponent} from "vue";

export default defineComponent({
    name: 'ListSubmenu',
  emits: ['editList'],
    components: {
        AtomIconBtn,
    },
  setup(props, {emit}) {
      function editList() {
        emit('editList')
      }
      return {editList}
  }
})
</script>

<style scoped></style>

<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item>
                    <v-list-item-title>Edit List</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Move To Folder</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script>
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'

export default {
    name: 'ListSubmenu',
    components: {
        AtomIconBtn,
    },
}
</script>

<style scoped></style>

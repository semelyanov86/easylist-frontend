<template>
    <v-dialog v-model="isOpen" activator="parent" width="auto">
        <v-card>
            <v-card-title>
                <span class="text-h5">Create New Folder</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Icon*" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="isOpen = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="isOpen = false"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CreateListOrFolder',
    emits: ['closeDialog'],
    props: {
        dialog: Boolean,
        folderId: Number,
    },
    setup(props, { emit }) {
        const isOpen = computed({
            get: () => props.dialog,
            set: (value) => emit('closeDialog', value),
        })

        return { isOpen }
    },
})
</script>

<style scoped></style>

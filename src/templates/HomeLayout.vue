<template>
    <v-container>
        <v-responsive>
            <v-row>
                <v-col cols="12" lg="4">
                  <lists-and-folders-index :folders="folders" :lists="files"></lists-and-folders-index>
                </v-col>

                <v-col cols="12" md="6">
                  <items-index :items="items" />
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import ListsAndFoldersIndex from "@/components/organisms/ListsAndFoldersIndex.vue";
import ItemsIndex from "@/components/organisms/ItemsIndex.vue";

export default {
  components: {ListsAndFoldersIndex, ItemsIndex},
    data: () => ({
        files: [
            {
                id: 1,
                icon: 'mdi-clipboard-text',
                created_at: 'Jan 20, 2014',
                name: 'Vacation itinerary',
            },
            {
                id: 2,
                icon: 'mdi-gesture-tap-button',
              created_at: 'Jan 10, 2014',
                name: 'Kitchen remodel',
            },
        ],
        folders: [
            {
              id: 1,
                created_at: 'Jan 9, 2014',
                name: 'Photos',
              icon: 'mdi-folder',
            },
            {
              id: 2,
              created_at: 'Jan 17, 2014',
              name: 'Recipes',
              icon: 'mdi-folder',
            },
            {
              id: 3,
              created_at: 'Jan 28, 2014',
              name: 'Work',
              icon: 'mdi-folder',
            },
        ],
        items: [
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
        ],
    }),
}
</script>

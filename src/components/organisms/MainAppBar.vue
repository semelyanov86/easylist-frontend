<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >

    <atom-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />
    <app-bar-menu></app-bar-menu>

  </v-app-bar>
</template>

<script lang="ts">
import AppBarMenu from "@/components/molecules/AppBarMenu.vue";
import AtomToolbarTitle from "@/components/atoms/AtomToolbarTitle.vue";

export default {
  name: "MainAppBar",
  components: {
    AppBarMenu,
    AtomToolbarTitle
  }
}
</script>

<style scoped>

</style>

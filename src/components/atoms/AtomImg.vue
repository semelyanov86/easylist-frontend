<template>
  <v-img
    v-bind="$attrs"
    cover
  >
    <template #placeholder>
      <v-row
        class="fill-height ma-0 d-flex align-center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey-lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "AtomImg"
}
</script>

<style scoped>

</style>

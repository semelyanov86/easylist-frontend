<template>
<div>
  <atom-btn
    href="https://next.vuetifyjs.com/components/all/"
    min-width="164"
    class="hidden-sm-and-down font-weight-light"
    rel="noopener noreferrer"
    target="_blank"
    variant="text"
  >
    <atom-icon
      icon="mdi-view-dashboard"
      size="large"
      start
    />

    Help
  </atom-btn>


  <atom-btn
    href="https://community.vuetifyjs.com/"
    min-width="164"
    rel="noopener noreferrer"
    target="_blank"
    variant="text"
  >
    <atom-icon
      icon="mdi-account"
      size="large"
      start
    />

    Account
  </atom-btn>
  <atom-icon
    href="https://community.vuetifyjs.com/"
    min-width="164"
    rel="noopener noreferrer"
    target="_blank"
    variant="text"
  >
    <atom-icon
      icon="mdi-lock"
      size="large"
      start
    />

    Sign Out
  </atom-icon>
</div>
</template>

<script lang="ts">
import AtomBtn from "@/components/atoms/AtomBtn.vue";
import AtomIcon from "@/components/atoms/AtomIcon.vue";

export default {
  name: "AppBarMenu",
  components: {
    AtomBtn,
    AtomIcon
  }
}
</script>

<style scoped>

</style>

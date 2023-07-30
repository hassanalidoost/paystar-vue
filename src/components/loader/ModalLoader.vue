<script setup>

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  }
})


</script>

<template>
  <v-overlay
      :model-value="loading"
      class="align-center justify-center"
  >
    <v-progress-circular
        color="primary"
        indeterminate
        size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
<style scoped>

</style>
<script setup>
import { TrashIcon, AlertCircleIcon } from "vue-tabler-icons"

const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['handleDelete'])
const emitDeleteDeal = () => {
  emit('handleDelete')
}
</script>

<template>
  <VDialog
      :model-value="modalOpen"
      width="550"
      @click="modalOpen = false"
  >
    <template #activator>
      <VBtn
          icon
          variant="text"
          color="default"
          size="x-small"
          @click="modalOpen = true"
      >
        <TrashIcon />
      </VBtn>
    </template>
    <div @click.stop="">
      <VCard>
        <div class="modal">
          <VCardTitle>
            <span class="headline">
              <AlertCircleIcon />
            </span>
          </VCardTitle>
          <VCardText>
            <div class="text-center">
              <p class="text-xl-h4">Are you sure?</p>
              <p>This action can not be undone. Do you want to continue?</p>
            </div>
          </VCardText>
          <VCardActions>
            <div class="d-flex gap-3 mb-4">
              <VBtn variant="outlined" color="error" text @click="modalOpen = false">
                No
              </VBtn>
              <VBtn variant="outlined" color="primary" text @click="emitDeleteDeal">
                Yes
              </VBtn>
            </div>
          </VCardActions>
        </div>
      </VCard>
    </div>
  </VDialog>
</template>

<style scoped>

</style>

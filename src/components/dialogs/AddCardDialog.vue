<script setup>
import {ref , defineEmits } from "vue";
import { useToast } from "vue-toastification"
import Form from "@/plugins/form";

const emits = defineEmits(['addTask'])
const toast = useToast()
const modalOpen = ref(false)
const form = ref(new Form({
  card_number: '',
}))

const addCard = (() => {
  form.value.submit('post' , '/cards')
      .then((r) => {
        modalOpen.value = false
        toast.success('Card added successfully!')
        emits('addCard' , r.card)
      })
      .catch((e) => {
        toast.error('Something went wrong!')
      })
})
</script>

<template>
  <VDialog
      v-model="modalOpen"
      width="700"
  >
    <template #activator>
      <VBtn
          @click="modalOpen = true"
          color="primary"
      >
        <VIcon
            start
            icon="plus"
            size="large"
        />
        Add task
      </VBtn>
    </template>

    <VCard>
      <div class="modal">
        <VCardTitle>
            <span class="headline">
              <p>Add Card</p>
            </span>
        </VCardTitle>
        <VCardText class="w-full">
          <VForm @change="form.errors.clear($event.target.name)">
            <VRow>
              <VCol
                  cols="12"
              >
                <VTextField
                    v-model="form.card_number"
                    label="Card Number"
                    type="text"
                    placeholder="Only numbers"
                    name="card_number"
                />
                <span class="text-error" v-if="form.errors.has('card_number')" v-text="form.errors.get('card_number')"></span>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>
          <div class="d-flex gap-3 mb-4">
            <VBtn
                variant="outlined"
                color="error"
                text
                @click="modalOpen = false"
            >
              Cancel
            </VBtn>
            <VBtn
                variant="outlined"
                color="primary"
                text
                :disabled="form.errors.any()"
                @click="addCard"
            >
              Add
            </VBtn>
          </div>
        </VCardActions>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>
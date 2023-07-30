<script setup>
import {ref, watchEffect} from "vue";
import { useToast } from "vue-toastification"
import Form from "@/plugins/form";
import axios from "@/plugins/axios";
import CardsList from "@/components/CardsList.vue";

const toast = useToast()
const cards = ref()
const form = ref(new Form({
  name: '',
  email: '',
}))

watchEffect(() => {
  axios.get('/profile')
    .then((r) => {
      cards.value = r.data.user.cards
      form.value.name = r.data.user.name,
      form.value.email = r.data.user.email
    })
})

const updateProfile = () => {
  form.value.submit('put' , '/profile')
  .then((r) => {
    form.value.name = r.user.name
    form.value.email = r.user.email
    toast.success('User updated successfully!')
  })
  .catch((e) => {
    console.log(e)
  })
}

</script>

<template>
  <div class="flex flex-col w-full items-center">
    <h2 class="text-xl font-semibold mb-4">Profile</h2>
    <div class="flex items-center justify-center w-full gap-16">
      <VForm
          @change="form.errors.clear($event.target.name)"
          class="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg"
      >
        <div class="w-full flex flex-col gap-4">
          <div class="flex flex-col">
            <VTextField
                v-model="form.name"
                label="Name"
                type="name"
                name="name"
            />
            <span class="text-error" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
          </div>

          <div class="flex flex-col">
            <VTextField
                v-model="form.email"
                label="Email"
                name="email"
            />
            <span class="text-error" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
          </div>

          <VBtn
              color="info"
              :disabled="form.errors.any()"
              @click="updateProfile"
          >
            Update
          </VBtn>
        </div>
      </VForm>
      <div class="w-1/3">
        <CardsList :cards="cards" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
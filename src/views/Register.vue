<script setup>
import {userStore} from "@/stores/userStore";
import {ref} from "vue";
import {useRouter} from "vue-router";
import Form from "@/plugins/form";

const user = userStore()
const router = useRouter()
const form = ref(new Form({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}))

const register = () => {
  form.value.submit('post' , '/register')
      .then((r) => {
        console.log(r)
        user.setUserDetails(r)
        router.push('/')
      })
}
</script>

<template>
  <VForm
      @change="form.errors.clear($event.target.name)"
      class="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg"
  >
    <div class="w-full flex flex-col gap-4">
      <div class="flex flex-col">
        <VTextField
            label="Name"
            name="name"
            v-model="form.name"
            type="text"
        />
        <span class="text-error" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
      </div>

      <div class="flex flex-col">
        <VTextField
            label="Email"
            type="email"
            name="email"
            v-model="form.email"
        />
        <span class="text-error" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
      </div>

      <div class="flex flex-col">
        <VTextField
            label="Password"
            type="password"
            name="password"
            v-model="form.password"
        />
        <span class="text-error" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
      </div>

      <div class="flex flex-col">
        <VTextField
            label="Password Confirmation"
            name="password_confirmation"
            type="password"
            v-model="form.password_confirmation"
        />
        <span class="text-error" v-if="form.errors.has('password_confirmation')" v-text="form.errors.get('password_confirmation')"></span>
      </div>

      <VBtn
          color="primary"
          @click="register"
          :disabled="form.errors.any()"
      >
        Register
      </VBtn>
    </div>
  </VForm>
</template>

<style scoped>

</style>
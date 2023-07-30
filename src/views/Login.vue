<script setup>
import {userStore} from "@/stores/userStore";
import {ref} from "vue";
import {useRouter} from "vue-router";
import Form from "@/plugins/form";

const user = userStore()
const router = useRouter()
const form = ref(new Form({
  email: '',
  password: '',
}))

const login = () => {
  form.value.submit('post' , '/login')
    .then((r) => {
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
          v-model="form.email"
          label="Email"
          type="email"
        />
        <span class="text-error" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
      </div>

      <div class="flex flex-col">
        <VTextField
            v-model="form.password"
            label="Password"
            type="password"
        />
        <span class="text-error" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
      </div>

      <VBtn
        color="primary"
        @click="login"
        :disabled="form.errors.any()"
      >
        Login
      </VBtn>
    </div>
  </VForm>
</template>

<style scoped>

</style>
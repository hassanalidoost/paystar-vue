<script setup>
import {userStore} from "@/stores/userStore";
import UserProfile from "@/components/UserProfile.vue";

const user = userStore()

</script>

<template>
  <VLayout class="rounded-md">
    <VAppBar>
      <div class="flex items-center justify-between px-36 w-full">
        <h1 class="text-lg font-semibold text-cyan-600">Paystar</h1>
        <div class="flex items-center justify-center gap-4" >
          <RouterLink class="text-base" :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink class="text-base" :to="{ name: 'products' }">Products</RouterLink>
          <RouterLink class="text-base" :to="{ name: 'checkout' }" v-if="user.name">Checkout</RouterLink>
        </div>
        <div>
          <UserProfile v-if="user.name" />
        </div>

        <div class="flex items-center justify-center gap-4" v-if="!user.name">
          <RouterLink class="text-base" :to="{ name: 'login' }">Login</RouterLink>
          <RouterLink class="text-base" :to="{ name: 'register' }">Register</RouterLink>
        </div>
      </div>
    </VAppBar>

    <VMain class="flex items-center justify-center" style="min-height: 300px;">
      <RouterView></RouterView>
    </VMain>
  </VLayout>
</template>

<style scoped>

</style>

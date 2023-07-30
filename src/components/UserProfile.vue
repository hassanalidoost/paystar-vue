<script setup>
import {userStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import axios from "@/plugins/axios";

const user = userStore()
const router = useRouter()

const logout = () => {
  axios.post('/logout')
    .then(() => {
      user.clearUser()
      localStorage.removeItem('user')
      router.push('/login');
    })
}

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-menu
          min-width="100px"
          rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
              icon
              v-bind="props"
          >
            <v-avatar
                color="brown"
                size="large"
            >
              <span class="text-md">{{ user.name[0] }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                  color="brown"
              >
                <span class="text-md">{{ user.name[0] }}</span>
              </v-avatar>
              <p class="text-sm font-semibold mt-2">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                rounded
                variant="text"
                :to="{ name: 'profile' }"
              >
                Profile
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                  rounded
                  variant="text"
                  color="error"
                  @click="logout"
              >
                Logout
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
<script setup>
import axios from "@/plugins/axios"
import {ref, watchEffect} from "vue";
import {useToast} from "vue-toastification";

const products = ref([])
const toast = useToast()

watchEffect(() =>{
  axios.get('/products')
    .then((r) => {
      products.value = r.data.products
    })
    .catch((e) => {
      console.log(e)
    })
})

const addToCart = (product) => {
  axios.post('/orders' , {
    product: product
  })
  .then(() => {
    toast.success('Product added successfully!')
  })
  .catch((e) => {
    if (e.response.status === 401){
      toast.error('Access Denied: Authentication Required!')
    }else {
      toast.error('Something went wrong!')
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-3 w-full items-center justify-center gap-6 mx-auto">
    <v-card v-for="(product , index) in products" :key="index" class="product-card w-3/4" outlined v-if="products.length">
      <v-img src="https://picsum.photos/seed/picsum/600/300" class="product-image" height="200"></v-img>
      <v-card-title class="product-title">{{ product.name }}</v-card-title>
      <v-card-text class="product-description">{{ product.price }} ريال</v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="addToCart(product)">Add to Cart</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <div v-else-if="products.length === 0">
      <p class="text-xl font-semibold">No Products...</p>
    </div>
  </div>
</template>

<style scoped>

</style>
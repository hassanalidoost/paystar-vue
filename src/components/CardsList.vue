<script setup>

import AddCardDialog from "@/components/dialogs/AddCardDialog.vue";
import DeleteDialog from "@/components/dialogs/DeleteDialog.vue";
import {useToast} from "vue-toastification";
import {ref} from "vue";
import axios from "@/plugins/axios";

const toast = useToast()
const modalOpen = ref(false)
const props = defineProps({
  cards: {
    required: true
  }
})

const addCardToList = (card) => {
  props.cards.push(card)
}

const deleteCard = (id) => {
  axios.delete('/cards/'+ id)
      .then( r => {
        modalOpen.value = false
        const index = props.cards.findIndex(item => item.id === id)
        if (index !== -1){
          props.cards.splice(index , 1)
        }
        toast.success('Deal deleted successfully');
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
}
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Add Card btn  -->
        <AddCardDialog  @add-card="addCardToList" />
      </div>
    </VCardText>

    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">
      <tr>
        <th scope="col">
          #
        </th>

        <th scope="col">
          Card Number
        </th>

        <th scope="col">
          Action
        </th>

      </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
      <tr
          v-for="(card , index) in cards"
          style="height: 3.75rem;"
      >
        <!-- 👉 Id -->
        <td>
          {{ index + 1 }}
        </td>

        <!-- 👉 Card Number -->
        <td>
          {{ card.card_number.replace(/(.{4})(?!$)/g, '$1-') }}
        </td>

        <!-- 👉 Actions -->
        <td style="width: 8rem;">

          <DeleteDialog
              :modal-open="modalOpen"
              @handle-delete="deleteCard(card.id)"
          />
        </td>
      </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="cards && cards.length === 0">
      <tr>
        <td
            colspan="8"
            class="text-center text-body-1"
        >
          No data available
        </td>
      </tr>
      </tfoot>
    </VTable>
  </VCard>
</template>


<style scoped>

</style>
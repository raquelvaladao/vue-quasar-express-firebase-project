<template>
    <q-page>
      <q-page-container style="padding-top: 0%; padding-left: 0%;">
        <div class="q-pa-md">
          <q-list bordered separator>
            <q-item v-for="(card, index) in paginatedCards" :key="index" class="q-mb-md">
              <q-item-section avatar>
                <q-avatar class="img">
                  <img :src="card.image" alt="Card Image">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ card.title }}</q-item-label>
                <q-item-label lines="2">{{ card.calories }} calorias</q-item-label>
                <q-item-label>
                  <q-badge rounded :label="'Proteinas: ' + card.protein" color="primary" />
                  <q-badge rounded :label="'Gorduras: ' + card.fat" color="secondary" />
                  <q-badge rounded :label="'Carboidratos: ' + card.carbs" color="accent" />
                </q-item-label>
                <div class="q-ml-auto" style="display: flex;">
                  <q-btn flat icon="remove_red_eye" @click="viewCard(card)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-pagination v-model="currentPage" :min="1" :max="totalPages" @input="changePage" class="pagination" />
      </q-page-container>
      <CardModal :detailedCard="detailedCard" :selectedCard="selectedCard" v-model="showModal"></CardModal>
    </q-page>
  </template>
<script>
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'
import CardModal from './CardModal.vue'
export default defineComponent({
  name: 'ListCard',
  components: { CardModal },
  props: {
    cards: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      showModal: false,
      selectedCard: {},
      detailedCard: {}
    }
  },
  computed: {
    // Calculate the total number of pages
    totalPages () {
      return Math.ceil(this.cards.length / this.itemsPerPage)
    },
    // Calculate the cards to be displayed on the current page
    paginatedCards () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.cards.slice(start, end)
    }
  },
  methods: {
    // Change the current page when the pagination component emits the 'input' event
    changePage (page) {
      this.currentPage = page
    },
    viewCard (card) {
      // Abrir o modal e preencher os dados mockados
      this.selectedCard = { ...card }
      this.loadDetail(card.id)
    },
    async loadDetail (id) {
      try {
        const response = await ConsultService.getElementById(id)
        this.detailedCard = response.data
        this.showModal = true
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
<style>
  .q-pa-md {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .img {
    width: 115px;
    height: 115px;
  }
  .pagination {
    margin-top: auto;
  }
</style>

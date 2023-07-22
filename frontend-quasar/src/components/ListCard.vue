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

              <!-- Nova div para envolver os botões -->
              <div class="q-ml-auto" style="display: flex;">
                <q-btn flat icon="edit" @click="editCard(card)" />
                <q-btn flat icon="favorite" @click="favoriteCard(card)" :color="card.favorite ? 'red' : ''"/>
                <q-btn flat icon="remove_red_eye" @click="viewCard(card)" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-pagination v-model="currentPage" :min="1" :max="totalPages" @input="changePage" class="pagination" />
    </q-page-container>

    <q-dialog v-model="showModal">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img :src="selectedCard.image">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">{{ selectedCard.title }}</span></q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Calorias: {{ selectedCard.calories }} calorias</q-item-label>
              <q-item-label class="text-weight-bold">Porções: {{ detailedCard.servings }}</q-item-label>
              <!-- <q-item-label>Instruções: {{ detailedCard.instructions }}</q-item-label> -->
              <q-item-label class="text-weight-bold">Tempo de preparação: {{ detailedCard.preparationMinutes === -1 ? 'N/A' : detailedCard.preparationMinutes + ' minutos' }}</q-item-label>
              <q-item-label class="text-weight-bold">Tempo de cozinhamento: {{ detailedCard.cookingMinutes === -1 ? 'N/A' : detailedCard.cookingMinutes + ' minutos' }}</q-item-label>
              <q-item-label>
                <q-chip v-if="detailedCard.vegetarian" color="teal" text-color="white" icon="eco">Vegetariano</q-chip>
                <q-chip v-if="detailedCard.vegan" color="teal" text-color="white" icon="eco">Vegano</q-chip>
                <q-chip v-if="detailedCard.glutenFree" color="teal" text-color="white" icon="restaurant">Sem gluten</q-chip>
                <q-chip v-if="detailedCard.dairyFree" color="teal" text-color="white" icon="restaurant">Sem lactose</q-chip>
                <q-chip v-if="detailedCard.veryHealthy" color="teal" text-color="white" icon="nutrition">Saudável</q-chip>
                <q-chip v-if="detailedCard.cheap" color="teal" text-color="white" icon="monetization_on">Barato</q-chip>
                <q-chip v-if="detailedCard.veryPopular" color="teal" text-color="white" icon="mood">Popular</q-chip>
              </q-item-label>
              <q-item-label >Dietas: {{ detailedCard.diets }}</q-item-label>
              <q-item-label >Sumário: {{ detailedCard.summary }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <!-- Resto do template... -->
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from '../boot/axios'
export default defineComponent({
  name: 'ListCard',
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
      console.log(this.currentPage)
      return this.cards.slice(start, end)
    }
  },
  methods: {
    // Change the current page when the pagination component emits the 'input' event
    changePage (page) {
      this.currentPage = page
    },
    editCard (card) {
      // Add your edit card logic here
      console.log('Edit card', card)
    },
    favoriteCard (card) {
      // Add your favorite card logic here
      card.favorite = !card.favorite
      console.log('Favorite card', card)
    },
    viewCard (card) {
      // Abrir o modal e preencher os dados mockados
      this.selectedCard = { ...card }
      this.loadDetail(card.id)
    },
    async loadDetail (id) {
      try {
        const response = await api.get(`recipes/${id}/information?includeNutrition=false&apiKey=43d5db533cad40b789fb6d8d8b2d1d8a`)
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
/* Add your custom styles for the card here /
.q-page-container {
  padding: 0 !important;
  margin: 0 !important;
}

/ Center the content inside q-page /
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto  ;
  padding-top: 2%;
}
/ Optional: Add some margin at the top and bottom of q-list */
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

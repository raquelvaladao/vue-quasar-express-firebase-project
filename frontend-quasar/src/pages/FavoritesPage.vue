<template>
  <q-page padding>
    <FavoriteCards :cards="cards"></FavoriteCards>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'
import FavoriteCards from '../components/FavoriteCards.vue'

export default defineComponent({
  name: 'FavoritesPage',
  components: { FavoriteCards },
  data () {
    return {
      cards: [],
      itemsPerPage: 0
    }
  },
  async created () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      try {
        const response = await ConsultService.getAllElementsFavorites()
        this.cards = response
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

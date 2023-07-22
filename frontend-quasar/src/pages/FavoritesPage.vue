<template>
  <q-page padding>
    <ListCard :cards="cards"></ListCard>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'
import ListCard from '../components/ListCard.vue'

export default defineComponent({
  name: 'FavoritesPage',
  components: { ListCard },
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
        const response = await ConsultService.getAllElementsHome()
        this.cards = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

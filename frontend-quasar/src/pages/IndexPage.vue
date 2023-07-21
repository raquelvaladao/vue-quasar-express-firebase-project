<template>
  <q-page padding>
    <ListCard :cards="cards"></ListCard>
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from '../components/models'
import { defineComponent } from 'vue'
import ListCard from '../components/ListCard.vue'
import { api } from '../boot/axios'

export default defineComponent({
  name: 'IndexPage',
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
        const response = await api.get('recipes/findByNutrients?apiKey=43d5db533cad40b789fb6d8d8b2d1d8a&minCarbs=0&number=50')
        this.cards = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

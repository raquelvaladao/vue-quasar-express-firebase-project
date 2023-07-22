<template>
  <q-page padding>
    <ListCard :cards="cards"></ListCard>
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from '../components/models'
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'
import ListCard from '../components/ListCard.vue'
<<<<<<< Updated upstream
=======
import { api } from '../boot/axios'
import { Recipe } from 'src/components/Recipe'
>>>>>>> Stashed changes

export default defineComponent({
  name: 'IndexPage',
  components: { ListCard },
  data () {
    return {
      cards: [] as Recipe[],
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
        this.cards = response.data
        this.cards[0].fav = true
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

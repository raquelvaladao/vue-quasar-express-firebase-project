<template>
  <q-page padding>
    <ListCard :cards="cards"></ListCard>
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from '../components/models'
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'
import { Recipe } from '../components/Recipe'
import ListCard from '../components/ListCard.vue'

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
        const response = await ConsultService.getAllElementsHome()
        this.cards = response
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

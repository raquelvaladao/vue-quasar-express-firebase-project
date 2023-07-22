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
        const response = await api.get('items/')
        this.cards = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

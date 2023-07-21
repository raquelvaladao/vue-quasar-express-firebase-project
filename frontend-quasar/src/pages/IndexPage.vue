<template>
  <q-page padding>
    <ListCard></ListCard>
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from '../components/models'
import { defineComponent } from 'vue'
import ListCard from '../components/ListCard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { ListCard }
})
</script>

<template>
  <div>
    <q-select
      v-model="selectedItem1"
      :options="items"
      label="Selecione a receita 1"
      @input="selectedItem1"
    />
    <q-select
      v-model="selectedItem2"
      :options="items.filter(item => item !== selectedItem1)"
      label="Selecione a receita 2"
      @input="selectedItem2"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  data () {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'], // Mock lista de elementos
      selectedItem1: ref(null),
      selectedItem2: ref(null),
      showComparative: false
    }
  },
  watch: {
    selectedItem1 () {
      this.checkSelections()
    },
    selectedItem2 () {
      this.checkSelections()
    }
  },
  methods: {
    checkSelections () {
      if (this.selectedItem1 !== null && this.selectedItem2 !== null) {
        this.showComparative = true
      } else {
        this.showComparative = false
      }
    }
  }
}
</script>

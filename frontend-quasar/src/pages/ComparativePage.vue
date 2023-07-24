<template>
  <div class="container">
    <div class="column">

    </div>
    <div class="column">
      <q-select v-model="selectedItem1" :options="items" label="Selecione a receita 1" @input="selectedItem1" />

    </div>
    <div class="column">
      <q-select v-model="selectedItem2" :options="items.filter(item => item !== selectedItem1)"
        label="Selecione a receita 2" @input="selectedItem2" />
    </div>
  </div>
</template>

<script>
import { ConsultService } from '../services/ConsultServices'
import { ref } from 'vue'
export default {
  data () {
    return {
      items: [],
      itemsComplete: [],
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
  created () {
    this.loadDetail()
  },
  methods: {
    checkSelections () {
      if (this.selectedItem1 !== null && this.selectedItem2 !== null) {
        this.showComparative = true
      } else {
        this.showComparative = false
      }
    },
    async loadDetail () {
      try {
        const response = await ConsultService.getAllElementsHome()
        response.forEach(item => {
          this.items.push(item.title)
        })
        this.itemsComplete = response
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  /* Define o contêiner como um flex container */
}

.column {
  flex: 1;
  /* Faz com que cada coluna ocupe uma proporção igual do espaço disponível */
  padding: 10px;
  /* Adiciona algum espaçamento entre as colunas */
}
</style>

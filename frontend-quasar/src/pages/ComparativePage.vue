<template>
  <div class="container">
    <div class="column">
    </div>
    <div class="column">
      <q-select v-model="selectedItem1" :options="items" label="Selecione a receita 1" option-value="id"
        option-label="title" @input="onSelectedItem1Change" />
      <div class="q-card-conteiner">
        <q-card v-if="selectedItem1" class="card-container">
          <q-card-section>
            <div class="avatar-container">
              <q-avatar>
                <img :src="selectedItem1.image" alt="Imagem do Item">
              </q-avatar>
            </div>
            <p class="item-title">{{ selectedItem1.title }}</p>
            <div class="item-details">
              <div class="item-nutrition">
                <p class="item-nutrient"><b>Calorias:</b> {{ selectedItem1.calories }}</p>
                <p class="item-nutrient"><b>Proteína:</b> {{ selectedItem1.protein }}</p>
                <p class="item-nutrient"><b>Gordura:</b> {{ selectedItem1.fat }}</p>
                <p class="item-nutrient"><b>Carboidratos:</b> {{ selectedItem1.carbs }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
    <div class="column">
      <q-select v-model="selectedItem2" :options="items.filter(item => item !== selectedItem1).map(item => item)"
        label="Selecione a receita 2" option-value="id" option-label="title" @input="selectedItem2" />
      <div class="q-card-conteiner">
        <q-card v-if="selectedItem2" class="card-container">
          <q-card-section>
            <div class="avatar-container">
              <q-avatar>
                <img :src="selectedItem2.image" alt="Imagem do Item">
              </q-avatar>
            </div>
            <p class="item-title">{{ selectedItem2.title }}</p>
            <div class="item-details">
              <div class="item-nutrition">
                <p class="item-nutrient"><b>Calorias:</b> {{ selectedItem2.calories }}</p>
                <p class="item-nutrient"><b>Proteína:</b> {{ selectedItem2.protein }}</p>
                <p class="item-nutrient"><b>Gordura:</b> {{ selectedItem2.fat }}</p>
                <p class="item-nutrient"><b>Carboidratos:</b> {{ selectedItem2.carbs }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
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
        this.items = response
      } catch (error) {
        console.error(error)
      }
    },
    onSelectedItem1Change (selectedItem) {
      console.log(selectedItem)
      this.selectedItem1 = selectedItem
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

.card-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 350px;
  /* Defina o tamanho fixo desejado */
  height: 300px;
  /* Defina o tamanho fixo desejado */
  margin: 0 auto;
  background-color: #f5f5f5;
}

.card-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* Ocupar a altura total do card */
}

.img-container {
  margin-right: 10px;
}

.img {
  max-width: 100px;
}

.item-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.item-nutrition {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-nutrient {
  margin: 2px 0;
}

.item-nutrient:last-child {
  margin-bottom: 5px;
}

.avatar-container, .item-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-card-conteiner {
  padding-top: 150px;
}</style>

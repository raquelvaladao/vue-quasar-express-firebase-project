<template>
  <div class="container">
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
    <div class="column">
      <!-- Título fixo com o mesmo tamanho do q-select -->
      <div class="title select">
        <p v-if="selectedItem1 && selectedItem2">
          {{ selectedItem1.title }} | vs | {{ selectedItem2.title }}
        </p>
        <p v-else>Selecione as receitas</p>
      </div>
      <div class="q-card-conteiner">
        <div class="comparison-container" v-if="selectedItem1 && selectedItem2">
          <div class="item-nutrition-comp">
            <p class="item-nutrient">
              <b>Calorias:</b> <span :class="{ 'highlight': selectedItem1.calories > selectedItem2.calories }">{{
                selectedItem1.calories }}</span> |<span
                :class="{ 'highlight': selectedItem1.calories < selectedItem2.calories }">{{ selectedItem2.calories
                }}</span>
            </p>
            <p class="item-nutrient">
              <b>Proteína:</b>
              <span :class="{ 'highlight': selectedItem1.protein > selectedItem2.protein }">
                {{ selectedItem1.protein }}
              </span>
              |
              <span :class="{ 'highlight': selectedItem1.protein < selectedItem2.protein }">
                {{ selectedItem2.protein }}
              </span>
            </p>

            <p class="item-nutrient">
              <b>Gordura:</b>
              <span :class="{ 'highlight': selectedItem1.fat > selectedItem2.fat }">
                {{ selectedItem1.fat }}
              </span>
              |
              <span :class="{ 'highlight': selectedItem1.fat < selectedItem2.fat }">
                {{ selectedItem2.fat }}
              </span>
            </p>

            <p class="item-nutrient">
              <b>Carboidratos:</b>
              <span :class="{ 'highlight': selectedItem1.carbs > selectedItem2.carbs }">
                {{ selectedItem1.carbs }}
              </span>
              |
              <span :class="{ 'highlight': selectedItem1.carbs < selectedItem2.carbs }">
                {{ selectedItem2.carbs }}
              </span>
            </p>
          </div>
        </div>
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
.highlight {
  background-color: #ffcccb;
  /* Define a cor de fundo para destacar o lado que é maior */
}

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

.avatar-container,
.item-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-card-conteiner {
  padding-top: 150px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.item-nutrition-comp {
  font-family: "Arial", sans-serif;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-nutrient {
  margin-bottom: 10px;
}

b {
  font-weight: bold;
}

.highlight {
  color: #ff5733;
  /* ou qualquer outra cor de destaque que preferir */
}
</style>

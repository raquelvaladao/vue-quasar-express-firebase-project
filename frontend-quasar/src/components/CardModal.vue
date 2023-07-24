<template>
    <q-dialog>
        <q-card class="card-width">
            <q-toolbar>
                <q-avatar>
                    <img :src="selectedCard.image">
                </q-avatar>
                <q-toolbar-title><span class="text-weight-bold">{{ selectedCard.title }}</span></q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>

            <q-card-section>
                <q-item>
                    <q-item-section>
                      <q-item-label>
                        <q-chip v-if="detailedCard.vegetarian" color="teal" text-color="white"
                            icon="eco">Vegetariano</q-chip>
                        <q-chip v-if="detailedCard.vegan" color="teal" text-color="white" icon="eco">Vegano</q-chip>
                        <q-chip v-if="detailedCard.glutenFree" color="teal" text-color="white" icon="restaurant">Sem
                            glúten</q-chip>
                        <q-chip v-if="detailedCard.dairyFree" color="teal" text-color="white" icon="restaurant">Sem
                            lactose</q-chip>
                        <q-chip v-if="detailedCard.veryHealthy" color="teal" text-color="white"
                            icon="nutrition">Saudável</q-chip>
                        <q-chip v-if="detailedCard.cheap" color="teal" text-color="white"
                            icon="monetization_on">Barato</q-chip>
                        <q-chip v-if="detailedCard.veryPopular" color="teal" text-color="white"
                            icon="mood">Popular</q-chip>
                      </q-item-label>
                      <q-item-label><span class="text-weight-bold">Calorias (1 porção): </span>{{ selectedCard.calories }} calorias</q-item-label>
                      <q-item-label v-if="detailedCard.diets.length > 0"><span class="text-weight-bold">Dietas: </span>{{ detailedCard.diets.join(', ') }}</q-item-label>
                      <q-item-label class="text-justify "><span class="text-weight-bold">Ingredientes para {{ detailedCard.servings }} porções: </span>
                        <div>
                          <ul>
                            <li v-for="(ingredient, index) in detailedCard.extendedIngredients" :key="index">
                              {{ ingredient.original }}
                            </li>
                          </ul>
                        </div>
                      </q-item-label>
                      <q-item-label><span class="text-weight-bold">Tempo de preparo: </span>{{ detailedCard.readyInMinutes + ' minutos' }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <div class="text-h4 q-mx-lg">Modo de Preparo</div>
            <CarouselModal :detailedCard="detailedCard"/>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import CarouselModal from './CarouselModal.vue'

export default defineComponent({
  name: 'CardModal',
  components: { CarouselModal },
  props: {
    detailedCard: {
      type: Object,
      required: true
    },
    selectedCard: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
.text-justify {
  text-align: justify;
}
.card-width {
  width: 600px;
}
</style>

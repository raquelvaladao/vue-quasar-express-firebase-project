<template>
    <q-dialog>
        <q-card>
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
                        <q-item-label><span class="text-weight-bold"> Calorias: </span>{{ selectedCard.calories }} calorias</q-item-label>
                        <q-item-label><span class="text-weight-bold"> Porções: </span>{{ detailedCard.servings }}</q-item-label>
                        <!-- <q-item-label>Instruções: {{ detailedCard.instructions }}</q-item-label> -->
                        <q-item-label><span class="text-weight-bold">Tempo de preparação: </span>{{ detailedCard.preparationMinutes ===
                            -1 ? 'N/A' : detailedCard.preparationMinutes + ' minutos' }}</q-item-label>
                        <q-item-label><span class="text-weight-bold">Tempo de cozinhamento: </span>{{ detailedCard.cookingMinutes === -1
                            ? 'N/A' : detailedCard.cookingMinutes + ' minutos' }}</q-item-label>
                        <q-item-label>
                            <q-chip v-if="detailedCard.vegetarian" color="teal" text-color="white"
                                icon="eco">Vegetariano</q-chip>
                            <q-chip v-if="detailedCard.vegan" color="teal" text-color="white" icon="eco">Vegano</q-chip>
                            <q-chip v-if="detailedCard.glutenFree" color="teal" text-color="white" icon="restaurant">Sem
                                gluten</q-chip>
                            <q-chip v-if="detailedCard.dairyFree" color="teal" text-color="white" icon="restaurant">Sem
                                lactose</q-chip>
                            <q-chip v-if="detailedCard.veryHealthy" color="teal" text-color="white"
                                icon="nutrition">Saudável</q-chip>
                            <q-chip v-if="detailedCard.cheap" color="teal" text-color="white"
                                icon="monetization_on">Barato</q-chip>
                            <q-chip v-if="detailedCard.veryPopular" color="teal" text-color="white"
                                icon="mood">Popular</q-chip>
                        </q-item-label>
                        <q-item-label><span class="text-weight-bold">Dietas: </span>{{ detailedCard.diets }}</q-item-label>
                        <q-item-label class="text-justify"><span class="text-weight-bold">Sumário: </span> <span v-html="renderHTML(detailedCard.summary)"></span> </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
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
  },
  methods: {
    renderHTML (html) {
      // Sanitize the HTML to prevent XSS attacks (optional)
      // You can use libraries like DOMPurify for this purpose.

      // If you trust the source of the HTML, you can skip sanitization.
      return html
    }
  }
})
</script>

<style scoped>
.text-justify {
    text-align: justify;
}
</style>

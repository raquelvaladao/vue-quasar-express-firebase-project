<template>
    <div class="q-pa-sm">
        <div class="q-gutter-md">
            <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
                control-color="white" navigation padding arrows height="300px"
                class="bg-primary text-white shadow-10 rounded-borders">
                <q-carousel-slide v-for="(item, index) in detailedCard.extendedIngredients" :key="index" :name="item.name + item.id"
                    class="column no-wrap flex-center">
                    <div class="q-mt-md text-center">
                        {{ item.name }}
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CarouselModal',
  props: {
    detailedCard: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {
      slide: ref('style')
    }
  }
})
</script>

<style scoped></style>

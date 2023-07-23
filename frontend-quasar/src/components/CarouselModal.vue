<template>
    <div class="q-pa-sm">
        <div class="q-gutter-md">
            <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
                control-color="white" navigation padding arrows height="300px"
                class="bg-primary text-white shadow-10 rounded-borders">
                <q-carousel-slide v-for="(item, index) in items" :key="index" :name="item.icon"
                    class="column no-wrap flex-center">
                    <q-icon :name="item.icon" size="56px" />
                    <div class="q-mt-md text-center">
                        {{ item.content }}
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

  },
  setup () {
    return {
      slide: ref('style'),
      props: {

      },
      items: [
        {
          icon: 'style', // Nome do ícone para cada slide
          content: 'Conteúdo do slide 1' // Conteúdo do slide 1
        },
        {
          icon: 'tv', // Nome do ícone para cada slide
          content: 'Conteúdo do slide 2' // Conteúdo do slide 2
        }
        // Adicione mais slides conforme necessário
      ]
    }
  }
})
</script>

<style scoped></style>

<template>
  <div class="q-pa-md" style="justify-content: center; align-items: center; padding: 20px 150px 0 150px">
    <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
      <q-input filled v-for="(item, index) in dataSelected" :key="index.toString()"
        :hint="index.toUpperCase()" lazy-rules :rules="[ val => val && val.length > 0 || 'Digite algo!']" v-model="dataSelected[index]" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'

export default defineComponent({
  name: 'EditCardPage',
  data () {
    return {
      selectedCard: {}, // Change this to an object instead of an array
      dataSelected: {
        title: '',
        calories: -1,
        protein: '',
        fat: '',
        carbs: ''
      },
      formData: {}
    }
  },
  async created () {
    const cardId = this.$route.params.id
    await this.loadDetail(cardId)
  },
  methods: {
    async loadDetail (id) {
      try {
        const response = await ConsultService.getAllElementsHome()
        for (const item of response) {
          if (item.id === Number(id)) {
            this.selectedCard = item
            this.dataSelected.id = item.id
            this.dataSelected.title = item.title
            this.dataSelected.calories = item.calories
            this.dataSelected.protein = item.protein
            this.dataSelected.fat = item.fat
            this.dataSelected.carbs = item.carbs
            break
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    onReset () {
      this.formData.title = null
      this.formData.calories = null
      this.formData.protein = null
      this.formData.fat = null
      this.formData.carbs = null
    },
    onSubmit () {
      this.editCard()
    },
    async editCard (edited) {
      try {
        const response = await ConsultService.editCard(edited, this.dataSelected)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
      this.loadDetail(this.$route.params.id)
    }
  }
})
</script>

<style scoped></style>

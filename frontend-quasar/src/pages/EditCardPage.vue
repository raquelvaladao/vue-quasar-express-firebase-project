<template>
  <div class="q-pa-md" style="justify-content: center; align-items: center; padding: 20px 150px 0 150px">
    <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset" v-if="show">
      <q-input filled v-for="(item, index) in dataSelected" :key="index.toString()"
        :hint="index.toUpperCase()" lazy-rules :rules="[ val => val && val.toString().length > 0 || 'Digite algo!']" v-model="dataSelected[index]" :value="item" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class= "text-h6 flex-center">Nenhuma alteração detectada!</div>
        </q-card-section>
        <q-card-section>
          <div class= "q-pt-none">É necessário alterar pelo menos um campo para concluir a alteração.</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="OK" v-close-popup color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="success">
      <q-card>
        <q-card-section>
          <div class= "text-h6 flex-center">Sucesso!</div>
        </q-card-section>
        <q-card-section>
          <div class= "q-pt-none">A receita foi alterada com sucesso.</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="OK" v-close-popup color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ConsultService } from '../services/ConsultServices'

export default defineComponent({
  name: 'EditCardPage',
  data () {
    return {
      alert: false,
      success: false,
      selectedCard: {}, // Change this to an object instead of an array
      dataSelected: {
        title: '',
        calories: 0,
        protein: '',
        fat: '',
        carbs: ''
      },
      show: true
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
      this.loadDetail(this.$route.params.id)
    },
    onSubmit () {
      if (this.selectedCard.title !== this.dataSelected.title || this.selectedCard.calories !== this.dataSelected.calories || this.selectedCard.protein !== this.dataSelected.protein || this.selectedCard.fat !== this.dataSelected.fat || this.selectedCard.carbs !== this.dataSelected.carbs) {
        this.editCard(this.selectedCard)
        this.success = true
      } else {
        this.alert = true
      }
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

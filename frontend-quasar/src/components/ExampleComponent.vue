<template>
  <q-page>
    <q-page-container style="padding-top: 0%; padding-left: 0%;">
      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item v-for="(card, index) in paginatedCards" :key="index">
            <q-item-section avatar>
              <q-avatar>
                <img :src="card.image" alt="Card Image">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ card.name }}</q-item-label>
              <q-item-label lines="2">{{ card.description }}</q-item-label>
              <q-item-label>
                <q-badge label="Badge 1" color="primary" />
                <q-badge label="Badge 2" color="secondary" />
                <q-badge label="Badge 3" color="accent" />
              </q-item-label>

              <!-- Botão de edição -->
              <q-item-section side>
                <q-btn flat icon="edit" class="q-ml-auto" @click="editCard(card)"/>
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page-container>

    <q-pagination
      v-model="currentPage"
      :min="1"
      :max="totalPages"
      @input="changePage"
      class="pagination"
    />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      cards: [
        {
          image: 'https://cdn.quasar.dev/img/parallax2.jpg',
          name: 'Card 1',
          description: 'Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          image: 'https://cdn.quasar.dev/img/parallax2.jpg',
          name: 'Card 2',
          description: 'Description 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          image: 'https://cdn.quasar.dev/img/parallax2.jpg',
          name: 'Card 2',
          description: 'Description 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          image: 'https://cdn.quasar.dev/img/parallax2.jpg',
          name: 'Card 2',
          description: 'Description 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          image: 'https://cdn.quasar.dev/img/parallax2.jpg',
          name: 'Card 2',
          description: 'Description 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          image: 'https://cdn.quasar.dev/img/parallax2.jpg',
          name: 'Card 2',
          description: 'Description 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
        // Add more cards here
      ],
      itemsPerPage: 4, // Number of cards per page
      currentPage: 1 // Current page number
    }
  },
  computed: {
    // Calculate the total number of pages
    totalPages () {
      return Math.ceil(this.cards.length / this.itemsPerPage)
    },
    // Calculate the cards to be displayed on the current page
    paginatedCards () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.cards.slice(start, end)
    }
  },
  methods: {
    // Change the current page when the pagination component emits the 'input' event
    changePage (page) {
      this.currentPage = page
    },
    editCard (card) {
      // Add your edit card logic here
      console.log('Edit card', card)
    }
  }
}
</script>

<style>
/* Add your custom styles for the card here */
.my-card-list {
  max-height: calc(100vh - 100px); /* 100px for padding, you can adjust as needed */
  overflow-y: auto;
}

.my-container {
  padding-top: 0%;
  padding-left: 0%;
}

.pagination {
  margin-top: auto;
}
</style>

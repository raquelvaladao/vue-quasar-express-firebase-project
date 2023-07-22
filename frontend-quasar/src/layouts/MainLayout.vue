<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="q-px-lg q-pt q-mb-md row items-center">
        <!-- Botão -->
        <div class="col-auto">
          <q-toolbar>
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </q-toolbar>
        </div>

        <!-- Título "Receitas" com margem à direita -->
        <div class="col q-mr-lg">
          <div class="text-h4">Receitas</div>
        </div>

        <!-- Identificador -->
        <div class="col-auto">
          <div class="absolute-bottom-right q-mb-md q-px-sm">SCC0961</div>
        </div>
      </div>

      <!-- Imagem de cabeçalho -->
      <q-img src="src\assets\imgs\food.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menus
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EssentialLink from '../components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    link: { name: 'home' },
    route: '/'
  },
  {
    title: 'Favoritos',
    caption: '',
    icon: 'favorite',
    link: { name: 'favorites' },
    route: '/favorites'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.5;
}
.text-h4 {
  padding-left: 10px;
  font-size: bold;
}
</style>

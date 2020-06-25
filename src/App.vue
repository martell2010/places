<template>
  <v-app relative>
    <v-main>
      <keep-alive :max="5">
        <router-view />
      </keep-alive>
    </v-main>
    <v-btn
      class="main-floating"
      color="primary"
      fab
      dark
      fixed
      right
      bottom
      @click="togglePlaceModal"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-bottom-navigation
      dark
      fixed
      app
      shift
    >
      <v-btn
        v-for="(item, i) in navigation"
        :key="`navigation_${i}`"
        :to="item.link"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <PlaceModal
      :modal-is-show="placeModalIsShow"
      @close="togglePlaceModal"
    />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navigation } from '@/typings/interfaces/navigation';
import PlaceModal from '@/components/PlaceModal.vue';
import { Action } from 'vuex-class';
@Component({
  name: 'App',
  components: {
    PlaceModal
  }
})

export default class App extends Vue {
  private navigation: Navigation[] = [
    {
      link: '/',
      title: 'Map',
      icon: 'mdi-map'
    },
    {
      link: '/places',
      title: 'Places',
      icon: 'mdi-home'
    },
    {
      link: '/about',
      title: 'About',
      icon: 'mdi-information-outline'
    }
  ];
  @Action('bindPlaces', {  })
  bindPlaces: any;

  created () {
    this.bindPlaces();
  }

  private placeModalIsShow: boolean = false;

  togglePlaceModal():void {
    this.placeModalIsShow = !this.placeModalIsShow;
  }

}
</script>
<style lang="scss">
  .v-btn.main-floating{
    bottom: 75px !important;
  }
</style>

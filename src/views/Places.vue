<template>
  <div class="pb-5">
    <v-row v-if="!places.length">
      <v-col
        v-for="(item, i) in 6"
        :key="i"
        cols="12"
        md="4"
      >
        <v-skeleton-loader
          class="mx-auto"
          type="card"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(place, i) in places"
        :key="i"
        cols="12"
        md="4"
      >
        <PlaceCard :card-data="place" />
      </v-col>
    </v-row>
    <!-- <div class="text-center">
      <v-pagination
        :length="6"
      />
    </div> -->
  </div>
</template>
<script lang="ts">
import PlaceCard from '@/components/PlaceCard.vue'
import { Component, Vue }  from 'vue-property-decorator';
import { Place } from '@/typings/interfaces/place';
import { Getter } from 'vuex-class';
@Component({
  components: {
    PlaceCard
  }
})
export default class Places extends Vue {
  private loading:boolean = true;
  @Getter('getPlaces', {})
  private places!: Place[]
}
</script>
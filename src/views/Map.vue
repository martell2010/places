<template>
  <BaseMap
    ref="baseMap"
    :center="center"
    :show-default-maker="false"
  >
    <template #marker="{ icon }">
      <div
        v-for="(place, i) in places"
        :key="i"
      >
        <LMarker
          :lat-lng="Object.values(place.location)"
          :icon="icon"
        >
          <l-popup>
            <PlaceCard :card-data="place" />
          </l-popup>
        </LMarker>
      </div>
    </template>
  </BaseMap>
</template>
<script lang="ts">
import BaseMap from '@/components/common/BaseMap.vue';
import PlaceCard from '@/components/PlaceCard.vue'
import { Place } from '@/typings/interfaces/place';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { LMarker, LPopup } from 'vue2-leaflet';
import { MAP_CENTER_DEFAULT } from '@/utils/constants';
@Component({
  components: {
    BaseMap,
    PlaceCard,
    LMarker,
    LPopup,
  }
})

export default class Map extends Vue {
  $refs!: {
    baseMap: any //TODO: find correct type
  }
  private center: number[] = MAP_CENTER_DEFAULT;
  private firstInit: boolean = true;
  @Getter('getPlaces', {})
  private places!: Place[]

  @Watch('places')
  fitBoundsMap():void{
    if(this.firstInit){
      const map:any = this.$refs.baseMap.mapInstance(); //TODO: find correct type
      map.mapObject.fitBounds(this.places.map((el:any)=> Object.values(el.location))) //TODO: add location type
      this.firstInit = false
    }
  }
}
</script>
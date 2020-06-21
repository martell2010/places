<template>
  <l-map
    ref="myMap"
    :center="center"
    :zoom="zoom"
  >
    <LMarker
      :lat-lng="center"
      :icon="icon"
    />
    <l-tile-layer :url="url" />
  </l-map>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  mounted() {
    this.$nextTick(():void => {
      console.log(this.$refs.myMap);
    });
  },
}) 
export default class Map extends Vue {
  private center: number[] = [50.436338, 30.621992];
  private zoom: number = 15;
  private url: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private icon: object = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/1673/1673188.svg',
    iconSize: [38, 95],
  });
}

</script>
<style lang="scss">
  .vue2leaflet-map{
    z-index: 1;
  }
</style>
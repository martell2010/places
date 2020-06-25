<template>
  <l-map
    ref="map"
    :center="center"
    :zoom="zoom"
    @click="mapClick"
  >
    <slot name="markers">
      <LMarker
        :lat-lng="center"
        :icon="icon"
      />
    </slot>
    <slot name="layer">
      <l-tile-layer :url="layerUrl" />
    </slot>
  </l-map>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit} from 'vue-property-decorator';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { LeafletMouseEvent } from 'leaflet'

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
})
export default class Map extends Vue {
  @Prop({required:true}) readonly center!: number[]
  @Prop({default:15}) readonly zoom!: number
  @Prop({default:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}) readonly layerUrl!: string
  @Prop({default: ()=> L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/1673/1673188.svg',
    iconSize: [38, 95],
  })}) readonly icon!: object

  @Emit()
  mapClick(event:LeafletMouseEvent):LeafletMouseEvent {
    return event;
  }
  mapInstance():object{
    return this.$refs.map;
  }
}

</script>
<style lang="scss">
  .vue2leaflet-map{
    z-index: 1;
  }
</style>
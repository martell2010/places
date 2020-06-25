<template>
  <l-map
    ref="map"
    class="map"
    :center="center"
    :zoom="zoom"
    @click="mapClick"
    @ready="onReady"
    v-on="$attrs"
  >
    <slot
      name="marker"
      :icon="icon"
    >
      <LMarker
        v-if="showDefaultMaker"
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
import { LMap, LTileLayer, LMarker, LLayerGroup } from 'vue2-leaflet';
import { LeafletMouseEvent } from 'leaflet'

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LLayerGroup
  }
})
export default class Map extends Vue {
  @Prop({required:true}) readonly center!: number[]
  @Prop({default:15}) readonly zoom!: number
  @Prop({default:true}) readonly showDefaultMaker!: boolean
  @Prop({default:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}) readonly layerUrl!: string
  @Prop({default: ()=> L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/1673/1673188.svg',
    iconSize: [38, 95],
  })}) readonly icon!: object

  @Emit()
  mapClick(event:LeafletMouseEvent):LeafletMouseEvent {
    return event;
  } 

  @Emit()
  onReady(event:any):any { //TODO: find correct type
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
.map{
  .leaflet-popup-content{
    margin: 0;
  }
  .leaflet-popup-content-wrapper, .leaflet-popup-tip{
    background: #1e1e1e;
    padding: 0;
  }
}
</style>
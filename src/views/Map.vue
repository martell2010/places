<template>
  <BaseMap :center="center" />
</template>
<script lang="ts">
import BaseMap from '@/components/common/BaseMap.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    BaseMap
  }
})
export default class Map extends Vue {
  private center: number[] = [50.436338, 30.621992];
}
</script>
<template>
  <v-card
    :min-width="280" 
    class="mx-auto"
  >
    <v-img
      :src="cardData.image || 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg'"
      height="194"
    />
    <v-card-text>
      {{ cardData.name }}
    </v-card-text>
    <v-rating
      v-model="cardData.rating"
      readonly
      small
      background-color="orange lighten-3"
      color="orange"
    />
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        More
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        To map
      </v-btn>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop }  from 'vue-property-decorator';
import { Place } from '@/typings/interfaces/place';
@Component
export default class PlaceCard extends Vue {
@Prop({required:true}) readonly cardData!: Place[]
}
</script>
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
        v-for="(item, i) in places"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card
          
          class="mx-auto"
        >
          <v-img
            :src="item.image || 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg'"
            height="194"
          />
          <v-card-text>
            {{ item.name }}
          </v-card-text>
          <v-rating
            v-model="item.rating"
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
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        :length="6"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue }  from 'vue-property-decorator';
import { Place } from '@/typings/interfaces/place';
import { db } from '@/db';

@Component({
  firestore: {
    places: db.collection('places'),
  }
})
export default class Places extends Vue {
  private loading:boolean = true;
  private  places: Place[] = [];
}
</script>
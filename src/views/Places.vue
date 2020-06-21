<template>
  <div class="pb-5">
    <v-row>
      <v-col
        v-for="(item, i) in 12"
        :key="i"
        cols="12"
        md="4"
      >
        <v-skeleton-loader
          v-show="loading"
          class="mx-auto"
          type="card"
        />
        <v-card
          v-show="!loading"
          class="mx-auto"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="194"
          />
          <v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Read
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Bookmark
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

@Component
export default class Places extends Vue {
  private loading:boolean = true;

  showLoading():void {
    this.loading = true;
    setTimeout(():void => {
      this.loading = false;
    }, 5000)
  }
  mounted():void {
    this.showLoading();
  }

}
</script>
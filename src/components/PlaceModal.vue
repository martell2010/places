<template>
  <v-dialog
    v-model="modalIsShow"
    width="500"
    @click:outside="close"
  >
    <v-card>
      <ValidationObserver
        ref="formObserver"
        tag="form"
        @submit.prevent="addPlace"
      >
        <v-card-title
          class="headline primary"
          primary-title
        >
          Add new place
        </v-card-title>
        <v-card-text>
          <ValidationProvider
            v-slot="{ errors }"
            rules="image"
            :name="' '"
            vid="image"
          > 
            <v-file-input
              v-model="form.image"
              show-size
              label="Image"
              :error-messages="errors"
              prepend-icon="mdi-camera"
              accept="image/*"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:3"
            :name="' '"
            vid="name"
          > 
            <v-text-field
              v-model="form.name"
              label="Name"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            :name="' '"
            vid="description"
          > 
            <v-text-field
              v-model="form.description"
              label="Description"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="url"
            :name="' '"
            vid="url"
          > 
            <v-text-field
              v-model="form.url"
              label="Website"
              :error-messages="errors"
            />
          </ValidationProvider>
       
          Rating
          <v-rating
            v-model="form.rating"
            background-color="orange lighten-3"
            color="orange"
          />
          <div class="place-modal__map">
            <BaseMap
              ref="baseMap"
              :center="center"
              @map-click="changeMarkerPosition"
            />
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            :loading="loading"
            type="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { Place } from '@/typings/interfaces/place';
import { db, GeoPoint} from '@/db';
import firebase from 'firebase/app';
import { uploadFile } from '@/utils/uploadFile';
import { VeeValidateObserverRef } from '@/typings/interfaces/veeValidate';
import { LeafletMouseEvent } from 'leaflet'
import BaseMap from '@/components/common/BaseMap.vue';
import { MAP_CENTER_DEFAULT } from '@/utils/constants';

@Component({
  components: {
    BaseMap
  }
})
export default class PlaceModal extends Vue {
  @Prop({ default: false }) readonly modalIsShow!: boolean
  private loading:boolean = false;
  $refs!: {
    formObserver: VeeValidateObserverRef,
    baseMap: any
  }
  private center: number[] = MAP_CENTER_DEFAULT;
  private form:Place = {
    image: null,
    name: '',
    description: '',
    url: '',
    rating: 5,
  };
  @Watch('modalIsShow')
  onShowChange(open:boolean):void|boolean {
    if(!open) return false;
    this.$nextTick(():void => {
      const map: any = this.$refs.baseMap.mapInstance();
      map.mapObject._onResize(); 
    })
  }

  @Emit()
  close():void{}

  async addPlace():Promise<boolean|void>{
    const valid = await this.$refs.formObserver.validate();
    if (!valid) return false;
    try {
      this.loading = true;
      const imageUrl = await uploadFile(this.form.image);
      const [lat, lng] = this.center;
      const sendData:Place = {
        ...this.form,
        image: imageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        location: new GeoPoint(lat, lng)
      }
      await db.collection('places').add(sendData);
      this.close();
      this.resetForm();
    } catch (error) {
      console.log('error', { error })
    }finally{
      this.loading = false
    }
  }

  changeMarkerPosition(e:LeafletMouseEvent):void{
    this.center = Object.values(e.latlng);
  }

  resetForm():void {
    this.form = {
      image: null,
      name: '',
      description: '',
      url: '',
      rating: 5,
    },
    this.center = MAP_CENTER_DEFAULT;
    this.$refs.formObserver.reset();
  }
  
}
</script>
<style>
  .place-modal__map{
    height: 250px;
    margin-top: 10px;
  }
</style>
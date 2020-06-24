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
            rules=""
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
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Place } from '@/typings/interfaces/place';
import { db, GeoPoint} from '@/db';
import firebase from 'firebase/app'
import { uploadFile } from '@/utils/uploadFile';
import { ValidationObserver } from 'vee-validate/dist/types';
@Component
export default class PlaceModal extends Vue {
  @Prop({ default: false }) readonly modalIsShow!: boolean
  private loading:boolean = false;
  private observer:any = null;
  private form:Place = {
    image: '',
    name: '',
    description: '',
    url: '',
    rating: 5,
  };

  @Emit()
  close():void{}

  async addPlace():Promise<boolean|void>{
    const valid = await this.observer.validate();
    console.log(valid);
    if (!valid) return false;
    try {
      this.loading = true;
      const imageUrl = await uploadFile(this.form.image);
      const sendData:Place = {
        ...this.form,
        image: imageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        location: new GeoPoint(48.8588377, 2.2770206)
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

  resetForm():void {
    this.form = {
      image: '',
      name: '',
      description: '',
      url: '',
      rating: 5,
    },
    this.observer.reset();
  }
  mounted() {
    this.observer = this.$refs.formObserver as InstanceType<typeof ValidationObserver>;
  }

}
</script>
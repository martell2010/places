import Vue from 'vue';
import Vuex from 'vuex';
import { Place } from '@/typings/interfaces/place';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '@/db';
Vue.use(Vuex);

interface State {
  places: Place[];
}

export default new Vuex.Store({
  state: {
    places: [],
  } as State,
  getters: {
    getPlaces(state: State): Place[] {
      return state.places;
    },
  },
  mutations: vuexfireMutations,
  actions: {
    bindPlaces: firestoreAction((context: any): any => {
      return context.bindFirestoreRef('places', db.collection('places'));
    }),
  },
  modules: {},
});

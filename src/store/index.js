import Vue from 'vue'
import Vuex from 'vuex'
import travel from './modules/travel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    travel
  }
})

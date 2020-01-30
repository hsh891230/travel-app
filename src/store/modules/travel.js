import { getDefaultTravel } from '@/api/travels'
import location from './location'
import _ from 'lodash'

export const SET_EDITABLE = 'SET_EDITABLE'
export const SET_TRAVEL = 'SET_TRAVEL'
export const SET_UID = 'SET_UID'
export const SET_ID = 'SET_ID'
export const SET_LOCATION_DIALOG = 'SET_LOCATION_DIALOG'

export default {
  namespaced: true,
  state: {
    uid: null,
    id: null,
    travel: getDefaultTravel(),
    editable: false
  },
  mutations: {
    [SET_EDITABLE](state, editable) {
      state.editable = editable
    },
    [SET_TRAVEL](state, travel) {
      state.travel = travel
    },
    [SET_UID](state, uid) {
      state.uid = uid
    },
    [SET_ID](state, id) {
      state.id = id
    }
  },
  actions: {},
  modules: {
    location
  }
}

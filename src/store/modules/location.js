import { getField, updateField } from 'vuex-map-fields'
import { getDefaultLocation, updateTravel } from '@/api/travels'
import _ from 'lodash'

export const SET_DIALOG = 'SET_DIALOG'

export default {
  namespaced: true,
  state: {
    dialog: false,
    scheduleIndex: -1,
    locationIndex: -1,
    location: getDefaultLocation()
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    [SET_DIALOG](state, { dialog = false, scheduleIndex = -1, locationIndex = -1, location = getDefaultLocation() }) {
      state.dialog = dialog
      state.scheduleIndex = scheduleIndex
      state.locationIndex = locationIndex
      state.location = _.cloneDeep(location)
    }
  },
  actions: {
    openDialog({ commit }, payload) {
      commit(SET_DIALOG, { ...payload, dialog: true })
    },
    closeDialog({ commit }) {
      commit(SET_DIALOG, { dialog: false })
    },
    // addlocation({ commit }) {
    //   console.log('test')
    // }
    async addlocation({
      commit,
      rootState: {
        travel: { travel, uid, id }
      },
      state
    }) {
      const data = _.cloneDeep(travel)
      data.schedules[state.scheduleIndex].locations.push(state.location)
      await updateTravel(uid, id, data)
      commit(SET_DIALOG, { dialog: false })
    },
    async updatelocation({
      commit,
      rootState: {
        travel: { travel, uid, id }
      },
      state
    }) {
      const data = _.cloneDeep(travel)
      data.schedules[state.scheduleIndex].locations[state.locationIndex] = state.location
      await updateTravel(uid, id, data)
      commit(SET_DIALOG, { dialog: false })
    }
  }
}

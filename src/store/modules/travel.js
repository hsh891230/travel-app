import { getDefaultTravel } from '@/api/travels'

const SET_EDITABLE = 'SET_EDITABLE'
const SET_TRAVEL = 'SET_TRAVEL'

export default {
  namespaced: true,
  state: {
    travel: getDefaultTravel(),
    editable: false
  },
  mutations: {
    [SET_EDITABLE](state, editable) {
      state.editable = editable
    },
    [SET_TRAVEL](state, travel) {
      state.travel = travel
    }
  },
  actions: {
    setEditable({ commit }, editable) {
      commit(SET_EDITABLE, editable)
    },
    setTravel({ commit }, travel) {
      commit(SET_TRAVEL, travel)
    }
  }
}

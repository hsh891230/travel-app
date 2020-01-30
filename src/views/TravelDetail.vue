<template>
  <v-app>
    <v-app-bar app dark shrink-on-scroll prominent>
      <v-btn icon @click="goList">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span class="headline mr-2">{{ travel.title }}</span>
        <span class="caption mr-2">{{ travel.from | moment('YY.M.D(ddd)') }} - {{ travel.to | moment('M.D(ddd)') }}</span>
        <!-- <v-icon small @click="editTravel">mdi-pencil</v-icon> -->
        <travel-dialog v-model="editedTravel" :id="id" @update="updateTravel">
          <template #activator="{ on }">
            <v-icon small v-on="on">mdi-pencil</v-icon>
          </template>
        </travel-dialog>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <template #extension>
        <v-tabs v-model="tabs" align-with-title background-color="transparent" @change="changeTab">
          <v-tab href="#tab-1">일정</v-tab>
          <v-tab href="#tab-2">Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
        <v-speed-dial v-model="fab" absolute bottom right direction="bottom" style="bottom: -20px">
          <template v-slot:activator>
            <v-btn v-if="fab" v-model="fab" color="red" dark small fab @click="cancelOrder">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn v-else v-model="fab" color="pink" dark small fab @click="editOrder">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green" @click="saveOrder">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-speed-dial>
      </template>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-tabs-items v-model="tabs" :touchless="editable">
          <v-tab-item value="tab-1">
            <travel-schedule v-for="(schedule, i) in editedTravel.schedules" :key="i" :schedule-index="i" :schedule="schedule"></travel-schedule>
          </v-tab-item>
          <v-tab-item value="tab-2">
            tab22 22222tab22 22222tab22 22222
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-content>
    <travel-Location-dialog></travel-Location-dialog>
  </v-app>
</template>

<script>
import TravelSchedule from '../components/TravelSchedule'
import TravelDialog from '../components/TravelDialog'
import TravelLocationDialog from '../components/TravelLocationDialog'
import { SET_TRAVEL, SET_EDITABLE, SET_UID, SET_ID } from '../store/modules/travel'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('travel')
import { onTravel, getDefaultTravel, getDefaultLocation, updateTravel, getDefaultSchedule } from '../api/travels'
import _ from 'lodash'

export default {
  name: 'travel-detail',
  components: { TravelSchedule, TravelDialog, TravelLocationDialog },
  props: ['uid', 'id'],
  data: () => ({
    unsubscribe: null,
    fab: false,
    dialog: false,
    editedTravel: {},
    tabs: 'tab-1'
  }),
  computed: {
    ...mapState(['travel', 'editable'])
  },
  methods: {
    ...mapMutations([SET_TRAVEL, SET_EDITABLE, SET_UID, SET_ID]),
    goList() {
      this.$router.push({ name: 'main', params: { uid: this.uid } })
    },
    editOrder() {
      this[SET_EDITABLE](true)
    },
    cancelOrder() {
      this.editedTravel = _.cloneDeep(this.travel)
      this[SET_EDITABLE](false)
    },
    async saveOrder() {
      await updateTravel(this.uid, this.id, this.editedTravel)
      this[SET_EDITABLE](false)
    },
    updateTravel() {},
    changeTab() {}
  },
  created() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    this[SET_UID](this.uid)
    this[SET_ID](this.id)
    this.unsubscribe = onTravel(this.uid, this.id, doc => {
      this[SET_TRAVEL](_.cloneDeep(doc.data))
      this.editedTravel = _.cloneDeep(doc.data)
    })
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}
</script>

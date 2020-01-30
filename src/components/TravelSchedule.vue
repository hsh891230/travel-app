<template>
  <v-card class="elevation-2">
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-subtitle>{{ schedule.date | moment('M.D(ddd)') }}</v-card-subtitle>
    <v-card-text>
      <v-timeline dense>
        <draggable class="list-group" group="schedule" @change="log" v-bind="dragOptions">
          <v-timeline-item small fill-dot right class="list-group-item" v-for="(location, i) in schedule.locations" :key="i">
            <template #icon>
              <span class="white--text">{{ i + 1 }}</span>
            </template>
            <travel-location :key="i" :schedule-index="scheduleIndex" :location-index="i" :location="location" @delete="deleteLocation"></travel-location>
          </v-timeline-item>
        </draggable>
      </v-timeline>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addLocation" outlined block>Add Location</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TravelLocation from './TravelLocation'
import { getDefaultLocation } from '../api/travels'
import draggable from 'vuedraggable'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'travel-schedule',
  props: ['schedule', 'scheduleIndex'],
  components: { TravelLocation, draggable },
  data: () => ({}),
  computed: {
    ...mapState('travel', ['editable']),
    title() {
      return `Day ${this.scheduleIndex + 1}`
    },
    dragOptions() {
      return {
        animation: 200,
        handle: '.handle',
        list: this.schedule.locations,
        disabled: !this.editable
      }
    }
  },
  methods: {
    ...mapActions('travel/location', ['openDialog']),
    addLocation() {
      // this.value.locations.push(getDefaultLocation())
      // this.$emit('update')
      // console.log(this.index)
      this.openDialog({
        scheduleIndex: this.scheduleIndex
      })
    },
    deleteLocation(index) {
      this.schedule.locations.splice(index, 1)
    },
    log(event) {
      console.log(event)
    }
  },
  watch: {
    // value: {
    //   deep: true,
    //   // immediate: true,
    //   handler() {
    //     this.$emit('input', this.value)
    //   }
    // }
  }
}
</script>

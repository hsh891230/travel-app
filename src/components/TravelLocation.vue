<template>
  <v-row class="elevation-2" @click="editLocation" v-ripple>
    <v-col cols="2">
      <strong>{{ location.time }}</strong>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-col cols="12">
          <div class="title">{{ location.name }}</div>
        </v-col>
        <v-col>
          {{ location.memo }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3" v-if="editable">
      <v-icon class="handle">mdi-menu-swap</v-icon>
      <v-icon @click="deleteLocation">delete</v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('travel')

export default {
  name: 'travel-location',
  props: ['location', 'scheduleIndex', 'locationIndex'],
  data: () => ({
    timePicker: false
  }),
  computed: {
    ...mapState(['editable'])
  },
  methods: {
    deleteLocation() {
      this.$emit('delete', this.locationIndex)
    },
    editLocation() {
      console.log(1)
    }
  }
}
</script>

<style scoped>
.handle {
  cursor: move;
}
</style>

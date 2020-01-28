<template>
  <v-app>
    <v-app-bar app dark prominent>
      <v-toolbar-title>App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <template #extension>
        <travel-dialog v-model="editedTravel" @add="addTravel">
          <template #activator="{ on }">
            <v-btn fab bottom right absolute small dark color="primary" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </travel-dialog>
      </template>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-list two-line>
          <template v-for="({ id, data }, index) in travels">
            <v-divider v-if="index !== 0" :key="index"></v-divider>
            <v-list-item :key="id" :to="{ name: 'travel', params: { uid, id } }">
              <v-list-item-content>
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.from | moment('YY.M.D(ddd)') }} ~ {{ data.to | moment('M.D(ddd)') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TravelDialog from '../components/TravelDialog'
import { getTravels, getDefaultTravel } from '../api/travels'

export default {
  name: 'travel-list',
  props: ['uid'],
  components: { TravelDialog },
  data: () => ({
    travels: [],
    editedTravel: getDefaultTravel()
  }),
  methods: {
    addTravel(id) {
      this.$router.push({
        name: 'travel',
        params: {
          uid: this.uid,
          id: id
        }
      })
    }
  },
  async created() {
    this.travels = await getTravels(this.uid)
  }
}
</script>

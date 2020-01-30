<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="update" v-if="isEdited">Update</v-btn>
          <v-btn text @click="add" v-else>Add</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name" v-model="name" required :rules="[v => !!v || 'Name is required']"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Memo" v-model="memo"></v-text-field>
            </v-col>
            <!-- <v-col cols="12">
              <v-date-picker v-model="dates" range scrollable full-width :selected-items-text="selectedItemsText"></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-text-field label="From" v-model="travel.from" readonly required :rules="[v => !!v || 'From date is required']"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="To" v-model="travel.to" readonly required :rules="[v => !!v || 'To date is required']"></v-text-field>
            </v-col> -->
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getDefaultLocation } from '../api/travels'
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

const hash = '#edit-location'

export default {
  name: 'travel-location-dialog',
  computed: {
    ...mapState('travel/location', ['scheduleIndex', 'locationIndex']),
    ...mapFields('travel/location', ['dialog', 'location.name', 'location.memo']),
    isEdited() {
      return this.locationIndex > -1
    }
  },
  watch: {
    $route(to) {
      if (to.hash === hash) {
        this.dialog = true
      } else {
        this.dialog = false
      }
    },
    dialog(val) {
      val ? this.open() : this.close()
    }
  },
  methods: {
    ...mapActions('travel/location', ['closeDialog', 'addlocation', 'updatelocation']),
    async add() {
      if (!this.$refs.form.validate()) return

      this.addlocation()
    },
    async update() {
      if (!this.$refs.form.validate()) return
      this.updatelocation()
    },
    open() {
      this.$router.push(
        {
          ...this.$route,
          hash
        },
        () => {},
        () => {}
      )
      this.$nextTick(() => {
        // this.location = _.cloneDeep(this.value)
        this.$refs.form.resetValidation()
      })
    },
    close() {
      this.closeDialog()
      if (this.$route.hash === hash) {
        this.$router.back()
      }
    },
    created() {
      if (this.$route.hash === hash) {
        this.$router.replace({
          ...this.$route,
          hash: ''
        })
      }
    }
  }
}
</script>

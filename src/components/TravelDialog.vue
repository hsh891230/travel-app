<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <slot name="activator" v-bind="{ on }"></slot>
    </template>
    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
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
              <v-text-field label="Title" v-model="travel.title" required :rules="[v => !!v || 'Title is required']"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-date-picker v-model="dates" range scrollable full-width :selected-items-text="selectedItemsText"></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-text-field label="From" v-model="travel.from" readonly required :rules="[v => !!v || 'From date is required']"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="To" v-model="travel.to" readonly required :rules="[v => !!v || 'To date is required']"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getDefaultTravel, getDefaultSchedule, addTravel, updateTravel } from '../api/travels'
import _ from 'lodash'
import { dateRange } from '../api/util'

const hash = '#travel-edit'

export default {
  name: 'travel-dialog',
  props: {
    value: {
      type: Object,
      default() {
        return getDefaultTravel()
      }
    },
    id: String
  },
  data: () => ({
    dialog: false,
    travel: getDefaultTravel()
  }),
  computed: {
    dates: {
      get() {
        return [this.travel.from, this.travel.to].filter(date => !!date)
      },
      set(dates) {
        this.travel.from = dates[0] || null
        this.travel.to = dates[1] || null
      }
    },
    isEdited() {
      return !!this.id
    },
    title() {
      return this.isEdited ? 'Edit' : 'Add'
    },
    uid() {
      return this.$route.params.uid
    },
    selectedItemsText() {
      return `${this.$moment(this.travel.from).format('YY.M.D(ddd)')} ~ ${this.$moment(this.travel.to).format('M.D(ddd)')}`
    }
  },
  watch: {
    $route(to) {
      // beforeRouteUpdate가 Child 컴포넌트에 있는 경우 동작 안함..
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
    async add() {
      if (!this.$refs.form.validate()) return
      const travel = {
        ...this.travel,
        schedules: dateRange(this.travel.from, this.travel.to).map(date => ({ ...getDefaultSchedule(), date }))
      }

      const id = await addTravel(this.uid, travel)
      this.$emit('add', id)
      this.dialog = false
    },
    async update() {
      if (!this.$refs.form.validate()) return
      const travel = {
        ...this.travel,
        schedules: dateRange(this.travel.from, this.travel.to).map((date, index) => ({ ...(this.value.schedules[index] || getDefaultSchedule()), date }))
      }
      await updateTravel(this.uid, this.id, travel)
      this.$emit('update')
      this.dialog = false
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
        this.travel = _.cloneDeep(this.value)
        this.$refs.form.resetValidation()
      })
    },
    close() {
      if (this.$route.hash === hash) {
        this.$router.back()
      }
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
</script>

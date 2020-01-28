<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="12" sm="8" md="4">
            <div id="firebaseui-auth-container"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

var ui = new firebaseui.auth.AuthUI(firebase.auth())

export default {
  name: 'app-login',
  mounted() {
    ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          this.$router.push({ name: 'main', params: { uid: authResult.user.uid } })
          return false
        }
        // Other config options...
      }
    })
  }
}
</script>

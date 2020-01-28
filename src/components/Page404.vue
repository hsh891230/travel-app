<template>
  <v-app>
    <v-content>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="12" md="6" sm="8">
            <v-card flat color="transparent">
              <v-card-title>
                <span class="display-3 font-weight-bold">Whoops, 404</span>
              </v-card-title>
              <v-card-text>
                Page not found.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" outlined to="/">Get me out of here!</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'page404'
}
</script>

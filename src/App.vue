<template>
  <v-app id="inspire" dark fill-height>
    <main>
      <v-content fill-height>
        <v-toolbar app flat fixed clipped-left>
          <v-icon>change_history</v-icon>
          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon @click="onNav('Sync')" class="nav-sync">
            <v-icon>swap_horiz</v-icon>
          </v-btn>
          <v-btn icon @click="onNav('Logic')">
            <v-icon>code</v-icon>
          </v-btn>
          <v-btn icon  @click="onNav('Labs')">
            <v-icon>equalizer</v-icon>
          </v-btn>
        </v-toolbar>
        <router-view>
          <!-- content goes here -->
        </router-view>
      </v-content>
    </main>
    <v-snackbar
      :timeout="3000"
      :color="snackColor(level)"
      v-model="display"
    >
      {{ message }}
      <v-btn dark flat @click.native="display = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        title: 'Dataprism  Dataroom'
      }
    },
    computed: {
      ...mapState('notifications', {
        level: state => (state.notification ? state.notification.level : null),
        message: state => (state.notification ? state.notification.message : null)
      }),
      display: {
        get () {
          return !!this.$store.state.notifications.notification
        },
        set (v) {
          if (!v) {
            this.$store.commit('notifications/CLEAR')
          }
        }
      }
    },
    methods: {
      close () {
        this.$store.commit('notifications/CLEAR')
      },
      snackColor (level) {
        if (level === 'info') return 'green'
        if (level === 'warning') return 'yellow'
        if (level === 'error') return 'red'

        return 'grey'
      },
      onNav (name) {
        this.$router.push({ name: name })
      }
    }
  }
</script>

<style lang="stylus">
  @require './stylus/main'

  .nav-sync{
    transform: rotate(-45deg)
  }
</style>

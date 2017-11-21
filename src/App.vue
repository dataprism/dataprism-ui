<template>
  <v-app id="inspire" dark>
    <main>
      <v-content>
        <v-toolbar app flat fixed clipped-left>
          <v-icon>change_history</v-icon>
          <v-toolbar-title>{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon @click="onNav('Sync')" class="nav-sync">
            <v-icon>swap_horiz</v-icon>
          </v-btn>
          <v-btn icon @click="onNav('Instances')">
            <v-icon>code</v-icon>
          </v-btn>
          <v-btn icon  @click="onNav('Labs')">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <router-view>
          <!-- content goes here -->
        </router-view>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Dataprism  Dataroom'
    }
  },
  methods: {
    onNav (name) {
      this.title = 'Dataprism ' + name
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

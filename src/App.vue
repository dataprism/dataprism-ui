<template>
  <v-app id="inspire" dark>
    <v-toolbar app></v-toolbar>
    <v-toolbar app fixed clipped-left>
      <v-icon>change_history</v-icon>
      <v-toolbar-title>Data Room</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>sync</v-icon>
      </v-btn>
      <v-btn icon @click="onNav('Instances')">
        <v-icon>code</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-content>
        <router-view>
          <!-- content goes here -->
        </router-view>
      </v-content>
    </main>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    onNav (name) {
      this.drawer = !this.drawer
      this.$router.push({ name: name })
    }
  }
}
</script>

<style lang="stylus">
  @require './stylus/main'
</style>

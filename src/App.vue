<template>
  <div id="app">
    <header id="menu">
      <div>
        <router-link to="/"><v-btn flat color="primary">Editor</v-btn></router-link>
        <router-link to="/instances"><v-btn flat color="primary">Instances</v-btn></router-link>
        <router-link to="/about"><v-btn flat color="primary">About</v-btn></router-link>
      </div>

    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      items: ['een', 'twee']
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration: none;
}
</style>

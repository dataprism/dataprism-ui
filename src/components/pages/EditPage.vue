<template>
  <div class="view">

    <h3>editor</h3>
    <editor></editor>


  </div>
</template>

<script>
  import Editor from '../Editor'

  export default {
    components: {Editor},
    name: 'EditPage',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

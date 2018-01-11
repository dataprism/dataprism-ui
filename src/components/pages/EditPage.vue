<template>
  <div class="view page-edit">
    <editor :logic="logic" fill-height></editor>


  </div>
</template>

<script>
  import Editor from '../Editor'
  import { mapGetters } from 'vuex'

  export default {
    components: {Editor},
    computed: {
      ...mapGetters({
        logics: 'logics/logics',
        logicById: 'logics/logicById'
      }),
      logic () {
        const logicId = this.$route.path.split('/').pop()
        return Object.assign({}, this.logicById(logicId))
      }
    },
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

  .view.page-edit{
    position: fixed;
    width: 100%;
    height: calc(100% - 64px - 48px);
    overflow-x: hidden;
  }
</style>

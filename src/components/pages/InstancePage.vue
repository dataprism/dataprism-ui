<template>
  <div class="view page-instances">

    <div class="center">

      <v-layout column>
        <!-- use object instead? -->
        <logic
          v-for="logic in logics"
          :key="logic.id"
          :name = "logic.name"
          :status = "logic.status"
          :lang = "logic.lang"
          :code = "logic.code"
          :version = "logic.version"
        ></logic>
      </v-layout>

    </div>

  </div>
</template>

<script>
  import Logic from '@/components/Logic'

  export default {
    components: {Logic},
    name: 'InstancePage',
    computed: {
      logics () {
        return this.$store.state.logics
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>

</style>

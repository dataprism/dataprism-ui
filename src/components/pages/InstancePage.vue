<template>
  <v-container fluid fill-height>
    <v-layout column>
      <v-flex xs12 sm6 offset-sm3>
        <!-- use object instead? -->
        <logic
          v-for="logic in logics"
          v-on:edit="onEdit"
          :key="logic.id"
          :name = "logic.name"
          :status = "logic.status"
          :lang = "logic.lang"
          :code = "logic.description"
          :version = "logic.version"
          :id = "logic.id"
        ></logic>
      </v-flex>
    </v-layout>
  </v-container>
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
    },
    methods: {
      onEdit (logicId) {
        console.log('editing logic with id ', logicId)
        this.$router.push({
          name: 'Editor',
          query: { logicId: logicId }
        })
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <v-container fluid fill-height>
    <v-layout column>
      <v-flex xs12 sm10 offset-sm1>
        <!-- use object instead? -->
        <list-item
          v-for="(logic, key) in logics "
          v-on:edit="onEdit"
          type="logic"
          :title = "logic.name"
          :status = "logic.status"
          :description = "logic.description"
          :properties = "logic.properties"
          :id = "key"
        ></list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ListItem from '@/components/ListItem'

  export default {
    components: {ListItem},
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

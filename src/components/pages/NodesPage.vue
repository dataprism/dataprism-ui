<template>
  <v-container fluid fill-height>
    <v-layout v-if="!nodes.length" justify-center align-center>
      <v-flex xs4>
        <v-card color="secondary" class="white--text">
          <v-card-title primary-title>
            <div class="headline">No nodes available</div>
            <div>Could not find any connectors to display, maybe you can try again?</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark @click="search()">Try again</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="nodes.length" column>
      <v-flex xs12 sm10 offset-sm1>
        <list-item
          v-for="node in nodes "
          type="node"
          :title = "node.name"
          :status = "node.status"
          :description = "node.status_description"
          :id = "node.id"
          :key="node.id"
        ></list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ListItem from '@/components/ListItem'

  export default {
    name: 'NodesPage',
    components: {
      ListItem
    },
    computed: {
      ...mapGetters({
        nodes: 'nodes/nodes'
      })
    },
    data () {
      return { }
    },
    methods: {
      ...mapActions({
        search: 'nodes/LIST'
      })
    },
    created () {
      this.$store.dispatch('nodes/LIST')
    }
  }
</script>

<style scoped>

</style>

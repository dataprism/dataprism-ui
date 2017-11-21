<template>
  <v-container fluid fill-height>
    <v-layout v-if="!logics.length" justify-center align-center>
      <v-flex xs4>
        <v-card color="secondary" class="white--text">
          <v-card-title primary-title>
            <div class="headline">No logics available</div>
            <div>Could not find any logics to display, maybe you can try again?</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark @click="onRetry()">Try again</v-btn>
            <v-btn flat dark @click="onCreate()">Create logic</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="logics.length" column>
      <v-flex xs12 sm10 offset-sm1>
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
        this.$store.dispatch('logics/SEARCH')
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
      },
      onRetry () {
        this.$store.dispatch('logics/SEARCH')
      },
      onCreate () {
        
      }
    }
  }
</script>

<style scoped>

</style>

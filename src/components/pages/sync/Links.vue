<template>
  <v-container fluid fill-height>
        <v-layout v-if="!links.length" justify-center align-center>
          <v-flex xs4>
            <v-card color="secondary" class="white--text">
              <v-card-title primary-title>
                <div class="headline">No links available</div>
                <div>Could not find any links to display, maybe you can try again?</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark @click="search()">Try again</v-btn>
                <v-btn flat dark @click="onCreate()">Create link</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout v-if="links.length" column>
          <v-flex xs12 sm10 offset-sm1>
            <list-item
              v-for="(link, key) in links "
              v-on:edit="onEdit"
              type="link"
              :title = "link.name"
              :status = "link.status"
              :description = "link.description"
              :properties = "link.properties"
              :id = "key"
              :key="key"
            ></list-item>
          </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
  import ListItem from '@/components/ListItem'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {ListItem},
    name: 'Links',
    computed: {
      ...mapGetters({
        links: 'links/links'
      })
    },
    data () {
      return { }
    },
    methods: {
      onEdit (logicId) {
        console.log('editing logic with id ', logicId)
        this.$router.push({
          name: 'Editor',
          query: { logicId: logicId }
        })
      },
      onCreate () {

      },
      ...mapActions({
        search: 'links/SEARCH'
      })
    },
    created () {
      this.$store.dispatch('links/SEARCH')
    }
  }
</script>

<style scoped>

</style>

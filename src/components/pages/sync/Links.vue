<template>
  <v-container fluid app class="pa-0" fill-height>
    <v-layout column>
      <v-toolbar flat dense color="sync_base">
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
        </v-toolbar-items>
      </v-toolbar>
      <v-flex class="ma-4" >
        <v-layout v-if="!links.length" justify-center align-center>
          <v-flex xs4>
            <v-card color="secondary" class="white--text">
              <v-card-title primary-title>
                <div class="headline">No links available</div>
                <div>Could not find any links to display, maybe you can try again?</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark @click="search()">Try again</v-btn>
                <v-btn flat dark @click.native.stop="editing = true">Create link</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout v-if="links.length" column>
          <v-flex xs12 sm10 offset-sm1>
            <list-item
              v-for="(link, key) in links "
              v-on:edit="edit(link.id)"
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
      </v-flex>
    </v-layout>


    <v-bottom-sheet v-model="editing" inset max-width="70%">
      <v-btn
        fixed
        bottom
        right
        fab
        color="sync_light"
        slot="activator"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" dense flat color="sync_base">
          <v-toolbar-title>Create Link</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Id"
              v-model="linkId"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="sync_base" @click="create()">create</v-btn>
        </v-card-actions>
      </v-card>

    </v-bottom-sheet>
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
      return {
        linkId: '',
        editing: false
      }
    },
    methods: {
      edit (linkId) {
        this.$router.push({ name: 'Link', params: { id: linkId } })
      },
      create () {
        this.$store.dispatch('links/CREATE', this.linkId)
      },
      ...mapActions({
        search: 'links/LIST_LINKS'
      })
    },
    created () {
      this.$store.dispatch('links/LIST_LINKS')
    }
  }
</script>

<style scoped>

</style>

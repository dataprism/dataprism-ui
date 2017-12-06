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
                <v-btn flat dark @click.native.stop="edit()">Create link</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout v-if="links.length" column>
          <v-flex xs12 sm10 offset-sm1>
            <list-item
              v-for="(link, key) in links "
              v-on:edit="edit(link)"
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

    <v-bottom-sheet v-model="editing" inset max-width="70%">
      <v-btn
        fixed
        bottom
        right
        fab
        color="sync_light"
        @click.native.stop="edit()"
        slot="activator"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" dense flat color="sync_base">
          <v-toolbar-title>{{ mode === 'edit' ? 'Edit' : 'Create'}} Link</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Id"
              v-model="link.id"
              required
              :disabled="mode === 'edit'"
            ></v-text-field>
            <v-text-field
              label="Name"
              v-model="link.name"
              required
            ></v-text-field>
            <v-select
              :items="connectors"
              v-model="link.connector_id"
              label="Connector"
              dark
              item-value="id"
              item-text="name"
            ></v-select>
            <span class="subheader">settings</span>
            <v-text-field
              :label="prop.key"
              v-model="link.settings[prop.key]"
              v-for="prop in connector.properties"
            ></v-text-field>
            <!--<editable-grid :value="link.settings" idField="key" titleField="key" descriptionField="description" ></editable-grid>-->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="mode === 'create'" class="sync_base" @click="create()">
            create
          </v-btn>
          <v-btn v-if="mode === 'edit'" class="sync_base" @click="update()">
            save
          </v-btn>
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
        links: 'links/links',
        connector: 'links/connector',
        connectors: 'connectors/connectors'
      }),
      editing: {
        // eslint-disable-next-line
        get: function () {
          return this.$store.getters['links/editing']
        },
        // eslint-disable-next-line
        set: function (v) {
          if (!v) return this.$store.dispatch('links/STOP_EDITING')

          return this.$store.dispatch('links/START_EDITING')
        }
      }
    },
    data () {
      return {
        mode: '',
        link: {
          settings: {}
        }
      }
    },
    methods: {
      edit (link) {
        this.link = link ? JSON.parse(JSON.stringify(link)) : { properties: [] }
        this.mode = link ? 'edit' : 'create'

        this.$store.dispatch('links/START_EDITING', link)
      },
      create () {
        this.$store.dispatch('links/CREATE', this.link)
      },
      update () {
        this.$store.dispatch('links/UPDATE', this.link)
      },
      ...mapActions({
        search: 'links/SEARCH'
      })
    },
    created () {
      this.$store.dispatch('links/SEARCH')
      this.$store.dispatch('connectors/SEARCH')
    }
  }
</script>

<style scoped>

</style>

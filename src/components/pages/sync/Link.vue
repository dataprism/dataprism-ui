<template>
  <v-container fluid fill-height>
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
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Link',
    computed: {
      ...mapGetters({
        links: 'links/links',
        connector: 'links/connector',
        inputs: 'sync_plugins/inputs',
        outputs: 'sync_plugins/outputs'
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
      save () {
        this.$store.dispatch('links/CREATE', this.link)
      },
      ...mapActions({
        search: 'links/SEARCH'
      })
    },
    created () {
      this.$store.dispatch('sync_plugins/LIST_INPUTS')
      this.$store.dispatch('sync_plugins/LIST_OUTPUTS')
    }
  }
</script>

<style scoped>

</style>

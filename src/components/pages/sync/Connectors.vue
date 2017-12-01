<template>
  <v-container fluid fill-height>
        <v-layout v-if="!connectors.length" justify-center align-center>
          <v-flex xs4>
            <v-card color="secondary" class="white--text">
              <v-card-title primary-title>
                <div class="headline">No connectors available</div>
                <div>Could not find any connectors to display, maybe you can try again?</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark @click="search()">Try again</v-btn>
                <v-btn flat dark @click.native.stop="edit()">Create connector</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout v-if="connectors.length" column>
          <v-flex xs12 sm10 offset-sm1>
            <list-item
              v-for="connector in connectors "
              @edit="edit(connector)"
              type="connector"
              :title = "connector.name"
              :status = "connector.status"
              :description = "connector.description"
              :properties = "connector.properties"
              :id = "connector.id"
              :key="connector.id"
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
          <v-toolbar-title>{{ mode === 'edit' ? 'Edit' : 'Create'}} Connector</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Id"
              v-model="connector.id"
              required
              :disabled="mode === 'edit'"
            ></v-text-field>
            <v-text-field
              label="Name"
              v-model="connector.name"
              required
            ></v-text-field>
            <span class="subheader">properties</span>
            <editable-grid :value="connector.properties" idField="key" titleField="key" descriptionField="description" ></editable-grid>
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
  import EditableGrid from '../../EditableGrid'

  export default {
    components: {
      EditableGrid,
      ListItem},
    name: 'Connectors',
    computed: {
      ...mapGetters({
        connectors: 'connectors/connectors'
      }),
      editing: {
        // eslint-disable-next-line
        get: function () {
          return this.$store.getters['connectors/editing']
        },
        // eslint-disable-next-line
        set: function (v) {
          if (!v) return this.$store.dispatch('connectors/STOP_EDITING')

          return this.$store.dispatch('connectors/START_EDITING')
        }
      }
    },
    data () {
      return {
        mode: '',
        connector: {
          properties: []
        }
      }
    },
    methods: {
      edit (connector) {
        this.connector = connector ? JSON.parse(JSON.stringify(connector)) : { properties: [] }
        this.mode = connector ? 'edit' : 'create'

        this.$store.dispatch('connectors/START_EDITING')
      },
      create () {
        this.$store.dispatch('connectors/CREATE', this.connector)
      },
      update () {
        this.$store.dispatch('connectors/UPDATE', this.connector)
      },
      ...mapActions({
        search: 'connectors/SEARCH'
      })
    },
    created () {
      this.$store.dispatch('connectors/SEARCH')
    }
  }
</script>

<style scoped>

</style>

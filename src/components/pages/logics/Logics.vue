<template>
  <v-container fluid fill-height>

    <v-btn
      fixed
      bottom
      right
      fab
      color="logic_light"
      @click.native.stop="edit()"
      slot="activator"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="editing" inset max-width="70%">
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" dense flat color="logic_base">
          <v-toolbar-title>{{ mode === 'edit' ? 'Edit' : 'Create'}} Logic</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Id"
              v-model="logic.id"
              required
              :disabled="mode === 'edit'"
            ></v-text-field>
            <v-text-field
              label="Name"
              v-model="logic.name"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="mode === 'create'" class="logic_base" @click="create()">
            create
          </v-btn>
          <v-btn v-if="mode === 'edit'" class="logic_base">
            save
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-bottom-sheet>

    <v-layout v-if="!logics" justify-center align-center>
      <v-flex xs4>
        <v-card color="secondary" class="white--text">
          <v-card-title primary-title>
            <div class="headline">No logics available</div>
            <div>Could not find any logics to display, maybe you can try again?</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark @click="onRetry()">Try again</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="logics" column>
      <v-flex xs12 sm10 offset-sm1>
        <list-item
          v-for="(logic, key) in logics "
          v-on:edit="onEdit"
          type="logic"
          :title = "logic.id"
          :status = "logic.status"
          :description = "logic.description"
          :properties = "logic.properties"
          :id = "logic.id"
        ></list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import ListItem from '@/components/ListItem'
  import { mapGetters } from 'vuex'
  import placeholder from '@/utils/placeholder'

  export default {
    components: {ListItem},
    name: 'Logic',
    computed: {
      ...mapGetters({
        logics: 'logics/logics'
      }),
      editing: {
        // eslint-disable-next-line
        get: function () {
          return this.$store.getters['logics/editing']
        },
        // eslint-disable-next-line
        set: function (v) {
          if (!v) return this.$store.dispatch('logics/STOP_EDITING')

          return this.$store.dispatch('logics/START_EDITING')
        }
      }
    },
    data () {
      return {
        mode: '',
        logic: {
          valid: false,
          id: '',
          name: '',
          nameRules: [
            (v) => !!v || 'Name is required',
            (v) => v.length <= 10 || 'Name must be less than 10 characters'
          ]
        }
      }
    },
    methods: {
      onEdit (logicId) {
        console.log('editing logic with id ', logicId)
        this.$router.push({ path: '/logic/' + logicId })
      },
      edit (logic) {
        this.logic = logic ? JSON.parse(JSON.stringify(logic)) : { properties: [] }
        this.mode = logic ? 'edit' : 'create'

        this.$store.dispatch('logics/START_EDITING')
      },
      create () {
        this.$store.dispatch('logics/CREATE', {id: this.logic.id, description: placeholder.snippets.markdown })
          .then(() => this.$store.dispatch('logicVersions/CREATE', {
            logicId: this.logic.id,
            data: { language: 'javascript', code: btoa(placeholder.snippets.javascript) }
          }), console.warn)
          .then(this.created, console.warn)
      },
      onRetry () {
        this.$store.dispatch('logics/SEARCH')
      }
    },
    created () {
      this.$store.dispatch('logics/SEARCH')
    }
  }
</script>

<style scoped>
  /*.shrink {*/
    /*box-sizing: border-box;*/
    /*padding: 0 20%;*/
  /*}*/
</style>

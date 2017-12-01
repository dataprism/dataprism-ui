<template>
  <v-container grid-list-md>
    <v-layout row wrap>

      <v-flex xs12>
        <v-form v-model="valid">
          <v-text-field
            label="Logic name"
            v-model="logic.id"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>

          <!--<v-radio-group v-model="lang" :mandatory="true">-->
          <!--<v-radio v-for="item in items" :label="item.text" :value="item.val" :key="item.val" dark></v-radio>-->
          <!--</v-radio-group>-->
        </v-form>
      </v-flex>

      <v-flex xs6>
        <codemirror
          class="align-left"
          v-model="version.code"
          :options="editorOptionsCode"
          @change="onEditorCodeChange"
        ></codemirror>
      </v-flex>

      <v-flex xs6>
        <codemirror
          class="align-left"
          v-model="logic.description"
          :options="editorOptionsDesc"
        ></codemirror>
      </v-flex>

      <!--<send-btn v-on:send="onEditorSave(logic.id)" :busy="busy"></send-btn>-->
      <!--<v-chip v-bind:color="persisted ? colorSaved : colorUnsaved" text-color="white">{{ persisted ? copySaved : copyUnsaved }}</v-chip>-->
    </v-layout>
  </v-container>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import SendBtn from './SendBtn'
  import { mapGetters } from 'vuex'

  export default {
    components: {codemirror, SendBtn},
    name: 'Editor',
    props: ['logic'],
    computed: {
      ...mapGetters({
        logicVersions: 'logicVersions/logicVersions'
      }),
      busy () {
        return true
      },
      persisted () {
        return true
      }
    },
    data () {
      return {
        valid: false,
        version: {
          version: 0,
          language: '',
          code: 'test'
        },
        name: '',
        copySaved: 'changes have been saved',
        copyUnsaved: 'changes not saved',
        colorSaved: 'primary',
        colorUnsaved: 'secondary',
        items: [
          { text: 'JavaScript', val: 'js' },
          { text: 'Java', val: 'java' },
          { text: 'Assembly', val: 'assembly' }
        ],
        lang: null,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters'
        ],
        editorOptionsDesc: {
          tabSize: 4,
          mode: 'text/x-markdown',
          theme: 'base16-dark',
          lineNumbers: false
        },
        editorOptionsCode: {
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: false,
          line: true,
          extraKeys: { 'Ctrl': 'autocomplete' },
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
        }
      }
    },
    methods: {
      onEditorCodeChange (newCode) {
        // -- do nothing
      },
      onEditorSave (logicId) {
        this.$store.commit('code', {
          id: this.logic.id,
          code: this.logic.code
        })
        this.$store.commit('send', { id: this.logic.id })

        // -- does this belong here?
        console.log('commit logic edit')
      },
      onSaveSuccess (resp) {
        this.$store.commit('receive', { id: this.logic.id })

        const valOnResp = true

        if (valOnResp) {
          console.log('success!')
        } else {
          console.warn('failed to save code')
        }
      },
      onSaveError (err) {
        this.$store.commit('receive')
        console.warn(err)
      }
    },
    created () {
      // -- check if logic exists, and fetch it if it doesn't

      // -- fetch latest logic version and load code into editor
      console.log('fetching logic versions')
      this.$store.dispatch('logicVersions/SEARCH', this.logic.id)
        .then(() => {
          // -- make deep copy to respect state immutability
          this.version = Object.assign({}, this.logicVersions[this.logicVersions.length - 1])
          this.version.code = atob(this.version.code)
        }, console.log)
    }
  }
</script>

<style scoped>
  .align-left {
    text-align: left;
    padding: 25px 50px;
    box-sizing: border-box;
  }
</style>

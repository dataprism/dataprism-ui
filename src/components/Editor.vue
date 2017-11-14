<template>
  <v-container grid-list-md>
    <v-layout row wrap>

      <v-flex xs12>
        <v-form v-model="valid">
          <v-text-field
            label="Snippet name"
            v-model="logic.name"
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
          v-model="logic.code"
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

      <send-btn v-on:send="onEditorSave(logic.id)" :busy="busy"></send-btn>
      <v-chip v-bind:color="persisted ? colorSaved : colorUnsaved" text-color="white">{{ persisted ? copySaved : copyUnsaved }}</v-chip>
    </v-layout>
  </v-container>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import logics from '../services/logics'
  import SendBtn from './SendBtn'

  export default {
    components: {codemirror, SendBtn},
    name: 'Editor',
    props: ['logic'],
    computed: {
      busy () {
        return this.$store.state.request.pending
      },
      persisted () {
        return this.$store.state.logics[this.logic['id']].persisted
      }
    },
    data () {
      return {
        valid: false,
        code: '<!-- code goes here -->',
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
        logics.create(this.$store.state.logics[logicId])
          .then(this.onSaveSuccess, this.onSaveError)
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
    }
  }

//  function encode (string) {
//    return window.btoa(string)
//  }
</script>

<style scoped>
  .align-left {
    text-align: left;
    padding: 25px 50px;
    box-sizing: border-box;
  }
</style>

<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card class="ma-1">
      <v-card-actions class="white">
        <v-icon left v-if="status == 'error'" color="orange">error_outline</v-icon>
        <v-icon left v-if="status == 'ok'" color="green">done</v-icon>

        <div class="headline">{{ name }}</div>
        <v-spacer></v-spacer>

        <v-chip color="primary" text-color="white">{{ lang }}</v-chip>
        <v-chip color="primary" text-color="white">V{{ version }}</v-chip>

        <v-btn icon @click.native="toggleExpand()">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <!--<v-slide-y-transition>-->
        <v-card-text v-show="show">
          <codemirror
            :id="name + '_editor'"
            v-model="code"
            :options="editorOptions"
            @focus="onEditorFocus"
            @ready="onEditorReady"
          ></codemirror>
        </v-card-text>
      <!--</v-slide-y-transition>-->
    </v-card>
  </v-flex>
</template>

<script>
  import { codemirror } from 'vue-codemirror'

  export default {
    components: {codemirror},
    name: 'Logic',
    props: ['name', 'lang', 'status', 'version', 'code'],
    data () {
      return {
//        name: 'logic_name',
//        status: 'ok',
//        lang: 'JavaScript',
//        version: 1,
        show: false,
//        code: '// == code goes here == //',
        editor: null,
        editorOptions: {
          readOnly: true,
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
          extraKeys: { 'Ctrl': 'autocomplete' },
          gutters: ['CodeMirror-linenumbers'],
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
        }
      }
    },
    methods: {
      toggleExpand () {
        this.show = !this.show

        // -- how do i detect when editor is ready?
        window.setTimeout(() => {
          this.editor.refresh()
        }, 100)
      },
      onEditorReady (editor) {
        this.editor = editor
        console.log('the editor is readied!', editor)
      },
      onEditorFocus (editor) {
        console.log('the editor is focus!', editor)
      }
    }
  }
</script>

<style scoped>

</style>

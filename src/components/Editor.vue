<template>
  <section>
    <h1>Editor</h1>

    <section class="editor">
      <codemirror v-model="code" :options="editorOptions"></codemirror>
    </section>

    <h2>Result</h2>
    <p>
      <span v-html="code"></span>
    </p>
  </section>
</template>

<script>
  import { codemirror } from 'vue-codemirror'

  export default {
    components: {codemirror},
    name: 'Editor',
    data () {
      return {
        code: '<!-- code goes here -->',
        editorOptions: {
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
          extraKeys: { 'Ctrl': 'autocomplete' },
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
        }
      }
    }
  }
</script>

<style scoped>
  .editor {
    text-align: left;
    padding: 25px 50px;
    box-sizing: border-box;
  }
</style>

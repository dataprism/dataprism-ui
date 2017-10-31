<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card class="ma-1">
      <v-card-actions class="white">
        <v-icon left v-if="status == 'error'" color="orange">error_outline</v-icon>
        <v-icon left v-if="status == 'ok'" color="green">done</v-icon>

        <div class="headline">{{ name }}</div>
        <v-spacer></v-spacer>

        <v-chip v-show="!show" color="primary" text-color="white">{{ lang }}</v-chip>

        <v-btn v-show="show" flat icon color="primary">
          <v-icon>mode_edit</v-icon>
        </v-btn>

        <v-btn icon @click.native="toggleExpand()">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <vue-markdown class="markdown" :source="code"></vue-markdown>
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      'vue-markdown': VueMarkdown
    },
    name: 'logic',
    props: ['name', 'lang', 'status', 'version', 'code'],
    data () {
      return {
        show: false
      }
    },
    methods: {
      toggleExpand () {
        this.show = !this.show
      }
    }
  }
</script>

<style>
/* fix horrible style scoping */

  .markdown h1 {
    font-size: 56px
  }

.markdown h2 {
    font-size: 28px
  }

.markdown  code {
    width: 100%;
  }
</style>

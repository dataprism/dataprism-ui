<template>
  <v-card class="ma-3">
    <v-card-actions class="secondary">
      <section class="status" v-if="status">
        <v-icon left v-if="status == 'error'" color="orange">error_outline</v-icon>
        <v-icon left v-if="status == 'ok'" color="lime">done</v-icon>
      </section>


      <div class="headline">{{ title }}</div>
      <v-spacer></v-spacer>

      <section class="properties">
        <v-chip outline v-for="prop in properties" :color="prop.color">{{ prop.content }}</v-chip>
      </section>

      <v-btn v-show="expanded" flat icon color="primary" @click.native="onEdit(id)">
        <v-icon>mode_edit</v-icon>
      </v-btn>

      <v-btn icon @click.native="onToggleExpand()">
        <v-icon>{{ expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-slide-y-transition>
      <v-card-text v-show="expanded">
        <vue-markdown class="markdown" :source="description"></vue-markdown>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'ListItem',
    components: {
      'vue-markdown': VueMarkdown
    },
    props: ['status', 'type', 'title', 'properties', 'description', 'id'],
    data () {
      return {
        expanded: false
      }
    },
    methods: {
      onToggleExpand () {
        this.expanded = !this.expanded
      },

      onEdit (logicId) {
        this.$emit('edit', logicId)
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

<template>
  <v-card class="ma-3 list-item" @click.native="onEdit(id)">
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

    </v-card-actions>
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
      }
    },
    methods: {
      onEdit (logicId) {
        this.$emit('edit', logicId)
      }

    }
  }
</script>

<style scoped lang="scss">
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

  .list-item:hover { cursor: pointer }

</style>

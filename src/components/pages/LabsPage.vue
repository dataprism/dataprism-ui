<template>
  <v-container fluid app class="pa-0" fill-height>
    <v-layout column>
      <v-toolbar flat dense color="labs_base">
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <!--<v-btn flat @click="onChildNav('Connectors')">Connectors</v-btn>-->
          <!--<v-btn flat @click="onChildNav('Links')">Links</v-btn>-->
        </v-toolbar-items>
      </v-toolbar>
      <v-flex >
        <router-view>
          <!-- content goes here -->
        </router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'LabsPage',
    computed: {
    },
    data () {
      return { }
    },
    methods: {
      onChildNav (name) {
        this.title = 'Dataprism Labs' + name
        this.$router.push({ name: name })
      }
    },
    created () { }
  }
</script>

<style scoped>

</style>

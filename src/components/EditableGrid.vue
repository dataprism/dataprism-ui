<template>
  <v-list two-line dark>
    <v-list-tile :key="item[idField]" v-for="item in value">
      <v-layout row align-center justify-center>
        <v-flex xs3>
          {{ item[titleField] }}
        </v-flex>
        <v-flex>
          {{ item[descriptionField] }}
        </v-flex>
        <v-flex xs1>
          <v-btn icon @click="remove(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-list-tile>

    <v-list-tile>
      <v-layout row align-center justify-center>
        <v-flex xs3>
          <v-text-field
            label="Name"
            v-model="item[titleField]"
            required
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            label="Description"
            v-model="item[descriptionField]"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn icon @click="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'EditableGrid',
    props: ['value', 'idField', 'titleField', 'descriptionField'],
    computed: { },
    data () {
      return {
        item: {}
      }
    },
    methods: {
      save () {
        this.value.push(this.item)
      },
      remove (item) {
        this.value.splice(this.value.indexOf(item))
      }
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

<template>
  <v-btn v-on:click="onSend" outline color="primary" v-bind:disabled="busy">{{ busy ? copyBusy : copyDefault }}</v-btn>
</template>

<script>
  export default {
    name: 'SendBtn',
    props: ['busy'],
    data () {
      return {
        copyDefault: 'Send',
        copyBusy: 'Busy...'
      }
    },
    methods: {
      onSend () {
        this.$emit('send')
      }
    }
  }
</script>

<style scoped>

</style>

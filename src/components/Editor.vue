<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md8>
        <codemirror
        class="align-left fill"
        v-model="version.code"
        :options="editorOptionsCode"
        @change="onEditorCodeChange"
        ></codemirror>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap>
          <v-flex d-flex md12 class="menu">
            <v-layout row wrap class="fill">
              <v-flex d-flex md4> <v-btn outline color="accent" @click="setSidebarDisplay('description')">Description</v-btn></v-flex>
              <v-flex d-flex md4><v-btn outline color="accent" @click="setSidebarDisplay('options')">Options</v-btn></v-flex>
              <v-flex d-flex md4><v-btn outline color="accent" >Update</v-btn></v-flex>
            </v-layout>
          </v-flex>

          <v-flex d-flex md12 class="description scroll">
            <div class="fill">
              <transition name="fade">
                <v-card-text v-if="sidebar.display == 'description'">
                  <vue-markdown class="markdown" :source="logic.description"></vue-markdown>
                </v-card-text>
              </transition>

              <transition name="fade">
                <v-card-text v-if="sidebar.display == 'options'">

                  <v-list two-line subheader>
                    <v-subheader>
                      General
                    </v-subheader>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Id</v-list-tile-title>
                        <v-list-tile-sub-title>{{ logic.id }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Name</v-list-tile-title>
                        <v-list-tile-sub-title>{{ logic.id }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Version</v-list-tile-title>
                        <v-list-tile-sub-title>v0.1.3</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Author</v-list-tile-title>
                        <v-list-tile-sub-title><a href="#">@matthiasdv</a></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list two-line subheader>
                    <v-subheader>Service</v-subheader>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'Healthcheck'"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-chip color="success" text-color="black">Ok</v-chip>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'Instances'"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <div>
                          <v-btn fab dark small color="secondary" class="btn--options" @click="instancesDecrement()">
                            <v-icon>remove</v-icon>
                          </v-btn>

                          <div class="input-instances">
                            <v-text-field text-xs-center
                              v-model="instances"
                            >0</v-text-field>
                          </div>

                          <v-btn fab dark small color="secondary" class="btn--options" @click="instancesIncrement()">
                            <v-icon>add</v-icon>
                          </v-btn>
                        </div>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile avatar>
                      <v-list-tile-action>
                        <v-checkbox v-model="alerts"></v-checkbox>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Alerts</v-list-tile-title>
                        <v-list-tile-sub-title>Send alert when healthcheck fails</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar>
                      <v-list-tile-action>
                        <v-checkbox v-model="slackbot"></v-checkbox>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Slackbot</v-list-tile-title>
                        <v-list-tile-sub-title>Send Slack message when healthcheck fails</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-divider></v-divider>


                    <v-subheader>Latency</v-subheader>
                    <div class="instance-stats">
                      <bars class="chart" :labels="trend.labels" :dataset="trend.dataset" :title="trend.title" color="#6E7BC4"></bars>
                    </div>

                    <v-divider></v-divider>


                    <v-subheader>Throughput</v-subheader>
                    <div class="instance-stats">
                      <trend class="chart" :labels="troughput.labels" :dataset="troughput.dataset" :title="troughput.title" color="#6E7BC4"></trend>
                    </div>

                  </v-list>
                </v-card-text>
              </transition>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import SendBtn from './SendBtn'
  import { mapGetters } from 'vuex'
  import VueMarkdown from 'vue-markdown'
  import placeholder from '@/utils/placeholder'
  import Bars from '@/components/charts/Bars'
  import Trend from '@/components/charts/Trend'

  export default {
    components: {Trend, Bars, VueMarkdown, codemirror, SendBtn},
    name: 'Editor',
    props: ['logic'],
    computed: {
      codemirror () {
        return this.$refs.myCm.codemirror
      },
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
        instances: 0,
        alerts: true,
        slackbot: false,
        trend: {
          labels: ['50ms', '100ms', '150ms', '200ms', '250ms', '300ms', '350ms', '400ms', '450ms', '500ms'],
          dataset: [10, 20, 80, 70, 68, 30, 20, 8, 3, 1],
          title: 'testing set'
        },
        troughput: {
          labels: ['50ms', '100ms', '150ms', '200ms', '250ms', '300ms', '350ms', '400ms', '450ms', '500ms'],
          dataset: [220, 280, 270, 225, 227, 150, 227, 0, 150, 160],
          title: 'testing set'
        },
        version: {
          version: '0.1.3',
          language: '',
          code: placeholder.snippets.javascript
        },
        sidebar: {
          display: 'description'
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
      },
      setSidebarDisplay (string) {
        this.sidebar.display = string
      },
      instancesIncrement () {
        this.instances++
      },
      instancesDecrement () {
        this.instances--
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
          // this.version.code = atob(this.version.code)
        }, console.log)
    },
    mounted () {
      // console.log('this is current codemirror object', this.codemirror)
      // you can use this.codemirror to do something...
    }
  }
</script>

<style scoped lang="scss">
  .fill { height: 100% !important; }
  .menu { height: 10%; }
  .description { height: 90%;}

  .scroll { overflow: scroll; }
  .outline { border: 1px solid #eee; }

  .btn--floating.btn--small.btn--options {
    height: 20px;
    width: 20px;
  }

  .input-instances {
    width: 40px;
    display: inline-block;
  }

  .instance-stats {
    max-width: 300px;
    margin: 0 auto;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to, .fade-leave-active {
    opacity: 0;
  }
</style>

<style>
  .CodeMirror {
    height: 100% !important;
  }

  .markdown h1 {
    font-size: 56px
  }

  .markdown h2 {
    font-size: 28px
  }

  .markdown  code {
    width: 100%;
  }

  .input-instances input { text-align: center; }
</style>

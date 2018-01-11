<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    mounted () {
      var ctx = document.getElementById('bar-chart').getContext('2d')
      this.renderChart(this.chart, this.options)
      this.$data.chart.datasets[0].backgroundColor = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight)

      this.$data.chart.datasets[0].backgroundColor.addColorStop(0.875, 'rgba(76,203,171,1)') // green
      this.$data.chart.datasets[0].backgroundColor.addColorStop(0.625, 'rgba(62,117,200,1)') // blue
      this.$data.chart.datasets[0].backgroundColor.addColorStop(0.375, 'rgba(228,97,133,1)') // pink
      this.$data.chart.datasets[0].backgroundColor.addColorStop(0.125, 'rgba(255,184,140,1)') // orange

      this.renderChart(this.chart, this.options)
    },
    name: 'Bar',
    props: ['labels', 'dataset', 'title', 'color'],
    data () {
      return {
        chart: {
          labels: this.labels,
          legend: { display: false },
          datasets: [
            {
              label: this.title,
              borderColor: '#000000',
              data: this.dataset,
              fill: true,
              pointRadius: 0,
              borderWidth: 0
            }
          ]
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100,
                fontColor: '#D8D8D8',
                maxTicksLimit: 5
              },
              gridLines: {
                display: true,
                color: '#B6B6B7'
              }
            }],
            xAxes: [{
              barPercentage: 0.9,
              ticks: {
                fontColor: '#D8D8D8'
              }
            }]
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>

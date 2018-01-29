<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    mounted () {
      var ctx = document.getElementById('line-chart').getContext('2d')
      this.$data.chart.datasets[0].borderColor = ctx.createLinearGradient(0, 0, 0, 500)
      this.$data.chart.datasets[0].borderColor.addColorStop(1, 'rgba(107,162,216,1)')
      this.$data.chart.datasets[0].borderColor.addColorStop(0, 'rgba(89,188,141,1)')
      this.renderChart(this.chart, this.options)
    },
    name: 'Radar',
    props: ['labels', 'dataset', 'title', 'color'],
    data () {
      return {
        chart: {
          labels: this.labels,
          legend: { display: false },
          datasets: [
            {
              label: this.title,
              borderColor: null,
              data: this.dataset,
              fill: false,
              showLine: true,
              pointRadius: 0,
              borderWidth: 1,
              lineTension: 0.1
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

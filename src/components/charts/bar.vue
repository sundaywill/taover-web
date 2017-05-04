<template>
    <div style="width: 100%">
      <canvas class="bg-white" ref="chart" width="100" :height="15 + 10 * data.length"></canvas>
    </div>
</template>
<script lang="babel">
import Chart from 'chart.js'
export default {
  props: [
    'title',
    'labels',
    'data'
  ],
  mounted () {
    var self = this
    var ctx = self.$refs.chart
    new Chart(ctx, {
      type: 'horizontalBar',
      responsive: true,
      display: true,
      fontSize: 16,
      options: { scales: { xAxes: [{ barThickness: 25 }], yAxes: [{ barThickness: 25 }] } },
      data: {
        labels: self.labels,
        datasets: [{
          label: self.title,
          data: self.data,
          backgroundColor: ['#eb6548', '#f0c543', '#f39557', '#cee267']
        }]
      },
    })
  }
}

</script>

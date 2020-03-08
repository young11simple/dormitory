<template>
  <div id="myEchart" :style="{width:'90%',height:'500px'}"></div>
</template>
<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  data () {
    return {
      usedElect: [],
      usedElectArr: [],
      dormIdArr: [],
      dateArr: []
    }
  },
  methods: {
    getEchart () {
      // 初始化echarts实例
      const myEChart = echarts.init(document.getElementById('myEchart'))
      // 绘制图表
      myEChart.setOption({
        color: ['#3398DB'],
        title: { text: '近一星期本栋用电最多的前10个宿舍' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: { name: '宿舍号', type: 'category', data: this.dormIdArr, axisTick: { alignWithLabel: true } },
        yAxis: { name: '用电量', type: 'value' },
        series: [{
          name: '用电情况',
          type: 'bar',
          barWidth: '60%',
          data: this.usedElectArr
        }]
      })
    }
  },
  mounted () {
    this.getEchart()
  },
  created () {
    console.log('this.$route.query', this.$route.query.data)
    this.usedElect = this.$route.query.data
    const arr = this.usedElect
    this.usedElectArr = arr.map(arr => arr.usedElect)
    console.log('this.usedElectArr', this.usedElectArr)
    this.dormIdArr = arr.map(arr => arr.dormId)
    console.log('this.dormIdArr', this.dormIdArr)
    this.dateArr = arr.map(arr => arr.date)
    console.log('this.dateArr', this.dateArr)
  }
}
</script>

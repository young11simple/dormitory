<template>
  <div id="myEchart" :style="{width:'100%',height:'300px'}"></div>
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
  props: {
    itemsObj: {
      type: Array,
      default: function () {
        return { message: 'NOTHING' }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    getEchart () {
      const timeArr = this.itemsObj.map(item => item.time)
      console.log('timeArr', timeArr)
      const electArr = this.itemsObj.map(item => item.elect)
      const usedElectArr = this.itemsObj.map(item => item.usedElect)
      // 初始化echarts实例
      const myEChart = echarts.init(document.getElementById('myEchart'))
      const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      }
      // 绘制图表
      myEChart.setOption({
        color: ['#4cabce', '#e5323e'],
        // title: { text: '本宿舍用电情况' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: {
          data: ['剩余电量', '已用电量']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: { name: '时间', type: 'category', data: timeArr, axisTick: { alignWithLabel: true } },
        yAxis: { name: '用电量', type: 'value' },
        series: [{
          name: '剩余电量',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: electArr
        },
        {
          name: '已用电量',
          type: 'bar',
          label: labelOption,
          data: usedElectArr
        }]
      })
    }
  },
  mounted () {
    this.getEchart()
  },
  watch: {
    itemsObj: {
      handler (newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          if (oldValue[i] !== newValue[i]) {}
        }
        console.log('this.itemsObj', this.itemsObj)
        this.getEchart()
      },
      deep: true
    }
  }
}
</script>

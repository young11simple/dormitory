<template>
  <div id="components-form-eleCheck">
    <!-- <a-button type="primary" :style="{marginBottom:'10px'}">
      <router-link :to="{path:path,query:{data:data}}"> 统计用电 </router-link>
    </a-button> -->
    <a-table :dataSource="data" :columns="columns" bordered :pagination="pagination"></a-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from '@/store'
const columns = [
  {
    title: '宿舍号',
    dataIndex: 'roomId'
  },
  {
    title: '日期',
    dataIndex: 'time'
  },
  {
    title: '剩余金额',
    dataIndex: 'elect'
  },
  {
    title: '已用金额',
    dataIndex: 'usedElect'
  }
]
export default {
  data () {
    return {
      columns,
      data: [],
      // usedElectArr,
      path: '/pay/eleTotalAnalyse',
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      }
    }
  },
  methods: {
    ...mapActions(['getDormsApi', 'eleSearchApi'])
  },
  mounted () {
    const jsonData = { area: store.getters.userInfo.area, buildId: store.getters.userInfo.buildId }
    this.getDormsApi(jsonData).then(res => {
      const dorms = res.data.dorms
      console.log('dorms', dorms)
      dorms.forEach(ele => {
        const jsonData2 = { dormId: ele.dormId, days: 1 }
        this.eleSearchApi(jsonData2).then(res => {
          const tmp = res.data.records[0]
          Object.assign(ele, tmp)
          ele.key = this.data.length
          this.data.push(ele)
        })
          .catch(err => { console.log('err', err) })
        console.log('this.data', this.data)
      })
    })
      .catch(err => console.log(err))
  }
}
</script>
<style scoped>
#components-form-eleCheck {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>

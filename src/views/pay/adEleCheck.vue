<template>
  <div id="components-form-eleCheck">
    <a-button type="primary" :style="{marginBottom:'10px'}">
      <router-link :to="{path:path,query:{data:data}}"> 统计用电 </router-link>
    </a-button>
    <a-table :dataSource="data" :columns="columns" bordered :pagination="pagination"></a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '宿舍号',
    dataIndex: 'dormId',
    width: '10%'
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: '15%'
  },
  {
    title: '剩余电量（金钱）',
    dataIndex: 'elect',
    width: '12%'
  },
  {
    title: '已用电量（金钱）',
    dataIndex: 'usedElect',
    width: '10%'
  }
]
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    dormId: i.toString(),
    date: (new Date()).toDateString(),
    elect: 20,
    usedElect: 8 + i
  })
}

export default {
  data () {
    return {
      columns,
      data,
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

<template>
  <div id="components-form-order">
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      rowKey="repairId"
      bordered
    ></a-table>
  </div>
</template>
<script>
import store from '@/store'
const columns = [
  {
    title: '订单号',
    dataIndex: 'repairId'
  },
  {
    title: '报修者',
    dataIndex: 'userName'
  },
  {
    title: '联系电话',
    dataIndex: 'telephone'
  },
  {
    title: '宿舍号',
    dataIndex: 'dormId'
  },
  {
    title: '报修类别',
    dataIndex: 'type'
  },
  {
    title: '详情',
    dataIndex: 'detail'
  },
  {
    title: '申请时间',
    dataIndex: 'time'
  },
  {
    title: '维修时间',
    dataIndex: 'repairTime',
    scopedSlots: { customRender: 'repairTime' }
  },
  {
    title: '维修结果',
    dataIndex: 'result',
    scopedSlots: { customRender: 'result' }
  }
]
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    repairId: `20200306${i}`,
    userName: `nana${i}`,
    telephone: `1580203356${i}`,
    dormId: `9-12${i}`,
    type: '水龙头',
    detail: '漏水',
    time: new Date().toLocaleDateString(),
    repairUserId: store.getters.userInfo.userName,
    repairTime: new Date().toLocaleDateString(),
    result: '成功'
  })
}
export default {
  data () {
    return {
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      columns,
      data
    }
  }
}
</script>
<style scoped>
#components-form-order {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>

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
import { mapActions } from 'vuex'
const columns = [
  {
    title: '订单号',
    dataIndex: 'repairId'
  },
  {
    title: '报修者',
    dataIndex: 'name'
  },
  {
    title: '联系电话',
    dataIndex: 'telephone'
  },
  {
    title: '宿舍号',
    dataIndex: 'address'
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
      data: []
    }
  },
  methods: {
    ...mapActions(['getRepairListApi', 'getDormByIdApi']),
    handleScuccessfully (res) {
    }
  },
  mounted () {
    const jsonData = { repairUserId: store.getters.userInfo.userId, process: 2 }
    this.getRepairListApi(jsonData)
      .then(res => this.handleScuccessfully(res))
      .catch(err => { console.log('err:', err) })
      .finally()
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

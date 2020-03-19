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
    dataIndex: 'roomId'
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
    dataIndex: 'process',
    scopedSlots: { customRender: 'process' }
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
      data: [],
      result: ['', '', '成功', '失败']
    }
  },
  methods: {
    ...mapActions(['getRepairListApi', 'getDormByIdApi']),
    handleScuccessfully (res) {
      res.data.repairInfo.forEach(ele => {
        ele.time = ele.time.replace(/T/, ' ').slice(0, ele.time.indexOf('.'))
        ele.repairTime = ele.repairTime.replace(/T/, ' ').slice(0, ele.repairTime.indexOf('.'))
        if (ele.process === -1) ele.process += 4
        ele.process = this.result[ele.process]
        const jsonData2 = { dormId: ele.dormId }
        this.getDormByIdApi(jsonData2)
          .then(res => {
            ele.roomId = res.roomId
            this.data.push(ele)
          })
          .catch(err => { console.log('err:', err) })
      })
    }
  },
  mounted () {
    const jsonData = { repairUserId: store.getters.userInfo.userId, process: 2 }
    this.getRepairListApi(jsonData)
      .then(res => this.handleScuccessfully(res))
      .catch(err => { console.log('err:', err) })
    const jsonData2 = { repairUserId: store.getters.userInfo.userId, process: -1 }
    this.getRepairListApi(jsonData2)
      .then(res => this.handleScuccessfully(res))
      .catch(err => { console.log('err:', err) })
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

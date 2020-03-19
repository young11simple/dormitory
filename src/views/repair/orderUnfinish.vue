<template>
  <div id="components-form-order">
    <div style="margin-bottom:10px">
      <a-button type="primary" @click="handleGet" style="margin-right:20px">完成订单</a-button>
      <a-button type="primary" @click="handleFail">失败处理</a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      rowKey="repairId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      bordered
    >
    </a-table>
  </div>
</template>
<script>
import store from '@/store'
import { mapActions } from 'vuex'
const columns = [
  {
    title: '报修单号',
    dataIndex: 'repairId'
  },
  {
    title: '报修者',
    dataIndex: 'name'
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
  }
]
export default {
  data () {
    return {
      data: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      columns,
      selectedRowKeys: [],
      selectedData: []
    }
  },
  methods: {
    ...mapActions(['getRepairListApi', 'getDormByIdApi', 'repairDoneApi']),
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleGet () {
      const that = this
      if (!this.hasSelected) {
        this.$confirm({
          title: '提示',
          content: h => <div>确认成功受理全部订单吗</div>,
          onOk () {
            that.selectedData = that.data.map(item => item.repairId)
            console.log('params1', that.selectedData)
            const params = { repairIds: that.selectedData, process: 2 }
            that.selectedData = []
            that.repairDoneApi(params).then(res => {
              that.data = []
              that.$notification.success({
                message: '成功',
                description: '受理成功',
                duration: 2
              })
            })
              .catch(err => console.log(err))
              .finally()
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      } else {
        const s = new Set(this.selectedRowKeys)
        // this.selectedData = this.data.filter(item => s.has(item.repairId))
        const params = { repairIds: that.selectedRowKeys, process: 2 }
        console.log('params2', params)
        that.selectedRowKeys = []
        this.repairDoneApi(params).then(res => {
          this.data = this.data.filter(item => !s.has(item.repairId))
          this.$notification.success({
            message: '成功',
            description: '受理成功',
            duration: 2
          })
        })
          .catch(err => console.log(err))
          .finally()
      }
    },
    handleFail () {
      const that = this
      if (!this.hasSelected) {
        this.$confirm({
          title: '提示',
          content: h => <div>确认失败受理全部订单吗</div>,
          onOk () {
            that.selectedData = that.data.map(item => item.repairId)
            console.log('params1', that.selectedData)
            const params = { repairIds: that.selectedData, process: -1 }
            that.selectedData = []
            that.repairDoneApi(params).then(res => {
              that.data = []
              that.$notification.success({
                message: '成功',
                description: '受理成功',
                duration: 2
              })
            })
              .catch(err => console.log(err))
              .finally()
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      } else {
        const s = new Set(this.selectedRowKeys)
        // this.selectedData = this.data.filter(item => s.has(item.repairId))
        const params = { repairIds: that.selectedRowKeys, process: -1 }
        that.selectedRowKeys = []
        console.log('params2', params)
        this.repairDoneApi(params).then(res => {
          this.data = this.data.filter(item => !s.has(item.repairId))
          this.$notification.success({
            message: '成功',
            description: '受理成功',
            duration: 2
          })
        })
          .catch(err => console.log(err))
          .finally()
      }
    },
    handleScuccessfully (res) {
      const datas = res.data.repairInfo
      datas.forEach(element => {
        element.time = element.time.replace(/T/, ' ').slice(0, element.time.indexOf('.'))
        const jsonData2 = { dormId: element.dormId }
        this.getDormByIdApi(jsonData2)
          .then(res => {
            element.address = res.area + res.buildId + '-' + res.roomId
            this.data.push(element)
          })
          .catch(err => { console.log('err:', err) })
          .finally()
      })
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  mounted () {
    const jsonData = { repairUserId: store.getters.userInfo.userId, process: 1 }
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
.editable-row-operations a {
    margin-right: 8px;
  }
</style>

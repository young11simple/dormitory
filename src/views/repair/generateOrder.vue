<template>
  <div id="components-form-order">
    <div style="margin-bottom:10px">
      <a-button type="primary" style="margin-right:20px">打印订单</a-button>
      <a-button type="primary" @click="handleGet">受理订单</a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      rowKey="repairId"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      bordered>
      <template slot="operation" slot-scope="text,record">
        <a-button type="primary" @click="()=>handlePrintDetails(record)" >查看详情</a-button>
        <a-modal title="打印详情" :footer="null" :maskClosable="false" v-model="visible">
          <a-form>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item style="display:flex" label="订单号码"><a-input v-model="item.repairId" /></a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item style="display:flex" label="报修人员"><a-input v-model="item.userName" /></a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item style="display:flex" label="宿舍号码"><a-input v-model="item.dormId" /></a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item style="display:flex" label="联系方式"><a-input v-model="item.telephone" /></a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item style="display:flex" label="报修类型"><a-input v-model="item.type" /></a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item style="display:flex" label="报修详情"><a-input v-model="item.detail" /></a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item style="display:flex" label="申请时间"><a-input v-model="item.time" /></a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item style="display:flex" label="维修人员"><a-input v-model="name" /></a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item style="display:flex" label="维修时间"></a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item style="display:flex" label="报修人签字"></a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-modal>
      </template>
    </a-table>
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
    title: '查看详情',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
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
    isGet: false
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
      selectedRowKeys: [],
      columns,
      data,
      item: {},
      visible: false,
      name: '',
      selectedData: []
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handlePrintDetails (item) {
      console.log(item)
      this.item = item
      this.visible = true
      this.name = store.getters.userInfo.name
    },
    handleGet () {
      if (!this.hasSelected) {
        this.$confirm({
          title: '提示',
          content: h => <div>确认受理全部订单吗</div>,
          onOk () {
            console.log('OK')
            this.selectedData = this.data
            this.data = []
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      } else {
        const s = new Set(this.selectedRowKeys)
        this.selectedData = this.data.filter(item => s.has(item.repairId))
        this.data = this.data.filter(item => !s.has(item.repairId))
      }
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
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

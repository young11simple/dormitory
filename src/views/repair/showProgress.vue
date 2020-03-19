<template>
  <div id="components-form-order">
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      rowKey="repairId"
      bordered
    >
      <template
        v-for="col in ['repairTime', 'result']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.repairId, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import store from '@/store'
import { mapActions } from 'vuex'
const columns = [
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
  },
  {
    title: '状态',
    dataIndex: 'process',
    scopedSlots: { customRender: 'result' }
  },
  {
    title: '维修时间',
    dataIndex: 'repairTime',
    scopedSlots: { customRender: 'repairTime' }
  },
  {
    title: '结果',
    dataIndex: 'result',
    scopedSlots: { customRender: 'result' }
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
      processArr: ['未受理', '维修中', '完成', '失败']
    }
  },
  methods: {
    ...mapActions(['getRepairListApi', 'getDormByIdApi']),
    handleScuccessfully (res) {
      const datas = res.data.repairInfo
      datas.forEach(element => {
        element.time = element.time.replace(/T/, ' ').slice(0, element.time.indexOf('.'))
        if (element.process !== 2) {
          element.repairTime = '无'
          element.result = '无'
        }
        if (element.process === -1) {
          element.process = '失败'
        } else {
          element.process = this.processArr[element.process]
        }
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
  mounted () {
    const jsonData = { userId: store.getters.userInfo.userId }
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

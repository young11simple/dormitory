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
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.repairId)">保存</a>
            <a-popconfirm title="确定取消?" @confirm="() => cancel(record.repairId)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button @click="() => edit(record.repairId)" style="margin-right:10px">编辑</a-button>
            <a-button :disabled="record.disable" @click="() => done(record)">完成</a-button>
          </span>
        </div>
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
    title: '维修时间',
    dataIndex: 'repairTime',
    scopedSlots: { customRender: 'repairTime' }
  },
  {
    title: '维修结果',
    dataIndex: 'result',
    scopedSlots: { customRender: 'result' }
  },
  {
    title: '操作',
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
    repairUserId: store.getters.userInfo.userName,
    isGet: false,
    disable: true
  })
}
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
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
  },
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.repairId)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.repairId)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.repairId)[0]
      const targetCache = newCacheData.filter(item => key === item.repairId)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      if (target.repairTime && target.result) {
        target.disable = false
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.repairId)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.repairId)[0])
        delete target.editable
        this.data = newData
      }
    },
    done (item) {
      this.data = this.data.filter(items => items.repairId !== item.repairId)
      this.$notification['success']({
        message: '消息提示',
        description:
          '该订单已成功处理'
      })
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
.editable-row-operations a {
    margin-right: 8px;
  }
</style>

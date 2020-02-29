<template>
  <div id="components-form-check">
    <a-form>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="检查序号" class="formItem">
            <a-input v-model="checkInfo.checkID" placeholder="当天时间点20XXXXXXxxxx" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="宿舍号" class="formItem">
            <a-input placeholder="被检查宿舍号" v-model="checkInfo.roomID" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="检查时间" class="formItem">
            <a-input placeholder="检查时间点" v-model="checkInfo.when"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="检查结果" class="formItem">
            <a-input placeholder="检查结果（优秀/不及格）" v-model="checkInfo.result"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="检查人员" class="formItem">
            <a-input placeholder="检查人员" v-model="checkInfo.inspector"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-button-group class="btn">
            <a-button type="primary" @click="handleAdd">添加</a-button>
            <a-button type="primary" @click="handleReset">重置</a-button>
          </a-button-group>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      id="tabTop"
      :columns="columns"
      :dataSource="data"
      rowKey="checkID"
      bordered
      :pagination="pagination"
    >
      <template slot="operation" slot-scope="text,record">
        <a-popconfirm title="确认删除吗" @confirm="()=>handleDelete(record.checkID)">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '检查序号',
    dataIndex: 'checkID',
    width: '10%',
    scopedSlots: { customRender: 'checkID' }
  },
  {
    title: '宿舍号',
    dataIndex: 'roomID',
    width: '10%',
    scopedSlots: { customRender: 'roomID' }
  },
  {
    title: '检查时间',
    dataIndex: 'when',
    width: '15%',
    scopedSlots: { customRender: 'when' }
  },
  {
    title: '检察人员',
    dataIndex: 'inspector',
    width: '10%',
    scopedSlots: { customRender: 'inspector' }
  },
  {
    title: '检查结果',
    dataIndex: 'result',
    width: '10%',
    scopedSlots: { customRender: 'result' }
  }
]
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    checkID: i.toString(),
    roomID: `Edrward ${i}`,
    inspector: `Edrward ${i + 1}`,
    when: '朋友',
    result: '是'
  })
}
console.log(data)
export default {
  data () {
    return {
      columns,
      data,
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      checkInfo: {}
    }
  },
  methods: {
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.checkID !== key)
    },
    handleAdd () {
      console.log('add:', this.checkInfo)
      this.data.unshift(this.checkInfo)
      this.checkInfo = {}
    },
    handleReset () {
      console.log('reset:', this.checkInfo)
      // this.form.resetFields()
      this.checkInfo = {}
      console.log('reseted:', this.checkInfo)
    }
  }
}
</script>

<style scoped>
#components-form-check {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
.formItem {
  display: flex;
}
.btn {
  float: right;
}
</style>

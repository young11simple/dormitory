<template>
  <div id="components-form-disobey">
    <a-form>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="违规序号" class="formItem">
            <a-input v-model="disobeyInfo.disobeyID" placeholder="当天时间点20XXXXXXxxxx" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="违规者们" class="formItem">
            <a-input placeholder="违规者们姓名" v-model="disobeyInfo.who" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="违规宿舍" class="formItem">
            <a-input placeholder="事发地点" v-model="disobeyInfo.roomID"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="违规时间" class="formItem">
            <a-input placeholder="事发时间点" v-model="disobeyInfo.when"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="检察人员" class="formItem">
            <a-input placeholder="检察人员" v-model="disobeyInfo.inspector" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="违规事项" class="formItem">
            <a-input placeholder="违规事项" v-model="disobeyInfo.what" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutters="24">
        <a-col :span="8" />
        <a-col :span="8" />
        <a-col :span="7">
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
      rowKey="disobeyID"
      bordered
      :pagination="pagination"
      class="tabStyle"
    >
      <template slot="operation" slot-scope="text,record">
        <a-popconfirm title="确认删除吗" @confirm="()=>handleDelete(record.disobeyID)">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '违规序号',
    dataIndex: 'disobeyID',
    width: '10%',
    scopedSlots: { customRender: 'disobeyID' }
  },
  {
    title: '宿舍号',
    dataIndex: 'roomID',
    width: '10%',
    scopedSlots: { customRender: 'roomID' }
  },
  {
    title: '违规者',
    dataIndex: 'who',
    width: '20%',
    scopedSlots: { customRender: 'who' }
  },
  {
    title: '违规时间',
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
    title: '违规事项',
    dataIndex: 'what',
    width: '20%',
    scopedSlots: { customRender: 'what' }
  }
]
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    disobeyID: i.toString(),
    roomID: `Edrward ${i}`,
    who: `Edrward ${i + 1}`,
    when: '朋友',
    what: '是',
    inspector: `Edrward ${i}`
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
      disobeyInfo: {}
    }
  },
  methods: {
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.disobeyID !== key)
    },
    handleAdd () {
      console.log('add:', this.disobeyInfo)
      this.data.unshift(this.disobeyInfo)
      this.disobeyInfo = {}
    },
    handleReset () {
      console.log('reset:', this.disobeyInfo)
      // this.form.resetFields()
      this.disobeyInfo = {}
      console.log('reseted:', this.disobeyInfo)
    }
  }
}
</script>

<style scoped>
#components-form-disobey {
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
.tabStyle {
  margin-top: 10px;
}
</style>

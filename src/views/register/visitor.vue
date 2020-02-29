<template>
  <div id="components-form-visitor">
    <a-form>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="序号" class="formItem">
            <a-input v-model="visitorInfo.visiteID" placeholder="当天时间点20XXXXXXxxxx" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="来访者" class="formItem">
            <a-input placeholder="来访者姓名" v-model="visitorInfo.visitor" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="被访者" class="formItem">
            <a-input placeholder="被访者姓名" v-model="visitorInfo.visited"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="关系" class="formItem">
            <a-input placeholder="所属关系" v-model="visitorInfo.relation" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否本校" class="formItem">
            <a-input placeholder="是否为本校人（是/否）" v-model="visitorInfo.isSCAU" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="证件号码" class="formItem">
            <a-input placeholder="来访者证件号码" v-model="visitorInfo.perID" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="访问时间" class="formItem">
            <a-input placeholder="访问时间点XX:XX" v-model="visitorInfo.visiteTime" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="离开时间" class="formItem">
            <a-input placeholder="离开时间点XX:XX" v-model="visitorInfo.leaveTime" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备注" class="formItem">
            <a-input placeholder="其余信息补充（没有则写无）" v-model="visitorInfo.others" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutters="24">
        <a-col :span="8" />
        <a-col :span="8" />
        <a-col :span="8">
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
      rowKey="visiteID"
      bordered
      :pagination="pagination"
    >
      <template slot="operation" slot-scope="text,record">
        <a-popconfirm title="确认删除吗" @confirm="()=>handleDelete(record.visiteID)">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'visiteID',
    width: '6%',
    scopedSlots: { customRender: 'visiteID' }
  },
  {
    title: '来访者',
    dataIndex: 'visitor',
    width: '8%',
    scopedSlots: { customRender: 'visitor' }
  },
  {
    title: '被访者',
    dataIndex: 'visited',
    width: '8%',
    scopedSlots: { customRender: 'visited' }
  },
  {
    title: '关系',
    dataIndex: 'relation',
    width: '8%',
    scopedSlots: { customRender: 'relation' }
  },
  {
    title: '是否本校',
    dataIndex: 'isSCAU',
    width: '9%',
    scopedSlots: { customRender: 'isSCAU' }
  },
  {
    title: '证件号码',
    dataIndex: 'perID',
    width: '12%',
    scopedSlots: { customRender: 'perID' }
  },
  {
    title: '访问时间',
    dataIndex: 'visiteTime',
    width: '12%',
    scopedSlots: { customRender: 'visiteTime' }
  },
  {
    title: '离开时间',
    dataIndex: 'leaveTime',
    width: '12%',
    scopedSlots: { customRender: 'leaveTime' }
  },
  {
    title: '备注',
    dataIndex: 'others',
    width: '15%',
    scopedSlots: { customRender: 'others' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
    scopedSlots: { customRender: 'operation' }
  }
]
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    visiteID: i.toString(),
    visitor: `Edrward ${i}`,
    visited: `Edrward ${i + 1}`,
    relation: '朋友',
    isSCAU: '是',
    perID: i.toString() + 1,
    visiteTime: new Date().toLocaleString(),
    leaveTime: new Date().toLocaleString(),
    others: '无'
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
      visitorInfo: {}
    }
  },
  methods: {
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.visiteID !== key)
    },
    handleAdd () {
      console.log('add:', this.visitorInfo)
      this.data.unshift(this.visitorInfo)
      this.visitorInfo = {}
    },
    handleReset () {
      console.log('reset:', this.visitorInfo)
      // this.form.resetFields()
      this.visitorInfo = {}
      console.log('reseted:', this.visitorInfo)
    }
  }
}
</script>

<style scoped>
#components-form-visitor {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
#tabTop {
  margin-top: 10px;
}
.formItem {
  display: flex;
}
.btn {
  float: right;
}
</style>

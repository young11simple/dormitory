<template>
  <div id="components-form-worker">
    <a-form>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="员工账号" class="formItem">
            <a-input v-model="workerInfo.workerID" placeholder="员工身份证" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="员工姓名" class="formItem">
            <a-input placeholder="员工姓名" v-model="workerInfo.name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="员工性别" class="formItem">
            <a-input placeholder="员工性别" v-model="workerInfo.gender" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="联系方式" class="formItem">
            <a-input placeholder="员工联系方式" v-model="workerInfo.contact"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="员工住址" class="formItem">
            <a-input v-model="workerInfo.address" placeholder="员工住址" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="员工身份" class="formItem">
            <a-input v-model="auth" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="入职时间" class="formItem">
            <a-input v-model="workerInfo.createTime" placeholder="入职时间如年/月/日 时间点" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="离职时间" class="formItem">
            <a-input v-model="workerInfo.leaveTime" placeholder="离职时间如年/月/日 时间点" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="备注信息" class="formItem">
            <a-input placeholder="其他信息" v-model="workerInfo.others" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="9" />
        <a-col :span="10" />
        <a-col :span="5">
          <a-button type="primary" style="marginBottom:10px" @click="handleAdd">添加员工信息</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table :columns="columns" :dataSource="data" bordered>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '员工账号',
    dataIndex: 'workerID',
    width: '10%'
  },
  {
    title: '员工姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '员工性别',
    dataIndex: 'gender',
    width: '10%'
  },
  {
    title: '联系方式',
    dataIndex: 'contact',
    width: '10%'
  },
  {
    title: '员工住址',
    dataIndex: 'address',
    width: '10%'
  },
  {
    title: '入职时间',
    dataIndex: 'createTime',
    width: '10%'
  },
  {
    title: '离职时间',
    dataIndex: 'leaveTime',
    width: '10%'
  },
  {
    title: '备注信息',
    dataIndex: 'others',
    width: '10%'
  }
]
const data = []
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
      workerInfo: {},
      auth: '维修工',
      columns,
      data
    }
  },
  methods: {
    handleAdd () {
      this.workerInfo.key = this.data.length.toString()
      this.data.push(this.workerInfo)
      console.log('this.data', this.data)
      this.workerInfo = {}
    }
  }
}
</script>
<style scoped>
#components-form-worker {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
.formItem {
  display: flex;
}
</style>

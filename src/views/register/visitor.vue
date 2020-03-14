<template>
  <div id="components-form-visitor">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col
          v-for="(value,index) in items"
          :key="index"
          :span="6"
        >
          <a-form-item :label="value.value">
            <a-input
              v-decorator="[
                value.name,
                {
                  rules: [
                    {
                      required: true,
                      message: '请填写信息!',
                    },
                  ],
                },
              ]"
              :placeholder="value.place"
            />
          </a-form-item>
        </a-col>
        <a-col :key="5" :span="6">
          <a-form-item label="是否本校人">
            <a-select
              v-decorator="[
                'isSCAU',
                { rules: [{ required: true, message: '请选择信息' }] },
              ]"
              placeholder="请选择信息">
              <a-select-option key="女">女</a-select-option>
              <a-select-option key="男">男</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :key="6" :span="6">
          <a-form-item label="来访时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['startTime', config]" format="YYYY-MM-DD HH:mm:ss"/>
          </a-form-item>
        </a-col>
        <a-col :key="7" :span="6">
          <a-form-item label="离开时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['endTime', config]" format="YYYY-MM-DD HH:mm:ss"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
            添加
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      id="tabTop"
      :columns="columns"
      :dataSource="data"
      bordered
      :pagination="pagination"
    >
      <template slot="operation" slot-scope="text,record">
        <a-popconfirm title="确认删除吗" @confirm="()=>handleDelete(record.key)">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '来访者',
    dataIndex: 'userName',
    width: '8%',
    scopedSlots: { customRender: 'userName' }
  },
  {
    title: '被访者',
    dataIndex: 'name',
    width: '8%',
    scopedSlots: { customRender: 'name' }
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
    dataIndex: 'idNo',
    width: '12%',
    scopedSlots: { customRender: 'idNo' }
  },
  {
    title: '访问时间',
    dataIndex: 'startTime',
    width: '12%',
    scopedSlots: { customRender: 'startTime' }
  },
  {
    title: '离开时间',
    dataIndex: 'endTime',
    width: '12%',
    scopedSlots: { customRender: 'endTime' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  data () {
    return {
      columns,
      data: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      visitorInfo: {},
      items: [
        { value: '来访者', name: 'name', place: '来访者姓名' },
        { value: '证件号', name: 'idNo', place: '来访者证件号码' },
        { value: '被访者', name: 'userName', place: '被访者姓名' },
        { value: '宿舍号', name: 'address', place: '被访者宿舍地址' },
        { value: '所属关系', name: 'relation', place: '与被访者关系' }
      ],
      config: {
        rules: [{ type: 'object', required: true, message: '请选择选项!' }]
      },
      form: this.$form.createForm(this, { name: 'advanced_apply' })
    }
  },
  methods: {
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.key !== key)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log('提交错误')
        } else {
          const values = {
            ...fieldsValue,
            'startTime': fieldsValue['startTime'].format('YYYY-MM-DD HH:mm:ss'),
            'endTime': fieldsValue['endTime'].format('YYYY-MM-DD HH:mm:ss')
          }
          values.key = this.data.length
          console.log('Received values of form: ', values)
          this.data.push(values)
          // repairApplyApi(values)
          //   .then(res => this.handleSuccessfully(res))
          //   .catch(err => this.handleFail(err))
          //   .finally()
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    handleSuccessfully (res) {
      console.log('apply successfully', res)
      this.$notification['success']({
        message: '成功',
        description: '报修成功',
        duration: 2
      })
    },
    handleFail (err) {
      console.log('apply fail', err)
      this.$notification['error']({
        message: '错误',
        description: '报修失败，请稍后再试',
        duration: 2
      })
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

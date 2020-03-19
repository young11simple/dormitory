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
              <a-select-option key="是">是</a-select-option>
              <a-select-option key="否">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :key="6" :span="6">
          <a-form-item label="来访时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['arriveTime', config]" format="YYYY-MM-DD HH:mm:ss"/>
          </a-form-item>
        </a-col>
        <a-col :key="7" :span="6">
          <a-form-item label="离开时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['leaveTime', config]" format="YYYY-MM-DD HH:mm:ss"/>
          </a-form-item>
        </a-col>
        <a-col :key="8" :span="8">
          <a-form-item label="备注" style="display:flex">
            <a-input
              v-decorator="[
                'other',
                { rules: [{ required: true, message: '请填写备注' }] },
              ]"
              placeholder="有则写，无则写无"/>
          </a-form-item>
        </a-col>
        <a-col :span="16" :style="{ textAlign: 'right' }">
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
import { mapActions } from 'vuex'
import store from '@/store'
const columns = [
  {
    title: '来访者',
    dataIndex: 'vname',
    width: '8%'
  },
  {
    title: '被访者',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '关系',
    dataIndex: 'relation',
    width: '8%'
  },
  {
    title: '是否本校',
    dataIndex: 'isSCAU',
    width: '9%'
  },
  {
    title: '证件号码',
    dataIndex: 'idNo',
    width: '12%',
    scopedSlots: { customRender: 'idNo' }
  },
  {
    title: '访问时间',
    dataIndex: 'arriveTime',
    width: '12%',
    scopedSlots: { customRender: 'arriveTime' }
  },
  {
    title: '离开时间',
    dataIndex: 'leaveTime',
    width: '12%',
    scopedSlots: { customRender: 'endTime' }
  },
  {
    title: '备注',
    dataIndex: 'other',
    width: '10%',
    scopedSlots: { customRender: 'other' }
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
        { value: '来访者', name: 'vname', place: '来访者姓名' },
        { value: '证件号', name: 'idNo', place: '来访者证件号码' },
        { value: '被访者', name: 'name', place: '被访者姓名' },
        { value: '宿舍号', name: 'roomId', place: '被访者宿舍地址' },
        { value: '所属关系', name: 'relation', place: '与被访者关系' }
      ],
      config: {
        rules: [{ type: 'object', required: true, message: '请选择选项!' }]
      },
      form: this.$form.createForm(this, { name: 'advanced_apply' }),
      selfInfo: {}
    }
  },
  methods: {
    ...mapActions(['addVisitApi', 'getVisitRecordsApi']),
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
            'arriveTime': fieldsValue['arriveTime'].format('YYYY-MM-DD HH:mm:ss'),
            'leaveTime': fieldsValue['leaveTime'].format('YYYY-MM-DD HH:mm:ss')
          }
          values.area = this.selfInfo.area
          values.buildId = this.selfInfo.buildId
          console.log('Received values of form: ', values)
          this.addVisitApi(values)
            .then(res => this.handleSuccessfully(res, values))
            .catch(err => this.handleFail(err))
            .finally()
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    handleSuccessfully (res, values) {
      console.log('addVisitor successfully', res)
      values.key = this.data.length
      this.data.push(values)
      this.$notification['success']({
        message: '成功',
        description: '添加成功',
        duration: 2
      })
    },
    handleFail (err) {
      console.log('apply fail', err)
      this.$notification['error']({
        message: '错误',
        description: '添加失败，请稍后再试',
        duration: 2
      })
    }
  },
  mounted () {
    this.selfInfo.buildId = store.getters.userInfo.buildId
    this.selfInfo.area = store.getters.userInfo.area
    const jsonData = { area: this.selfInfo.area, buildId: this.selfInfo.buildId }
    this.getVisitRecordsApi(jsonData).then(res => {
      const arr = res.data.visits
      arr.forEach(ele => {
        ele.arriveTime = ele.arriveTime.replace(/T/, ' ').slice(0, ele.arriveTime.indexOf('.'))
        ele.leaveTime = ele.leaveTime.replace(/T/, ' ').slice(0, ele.leaveTime.indexOf('.'))
        ele.key = this.data.length
        this.data.push(ele)
      })
    })
      .catch(err => console.log(err))
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

<template>
  <div id="components-form-check">
    <a-form style="margin-bottom:10px" :form="form" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col :key="0" :span="5">
          <a-form-item label="宿舍号">
            <a-input
              v-decorator="[
                'roomId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请填写宿舍号!',
                    },
                  ],
                },
              ]"
              placeholder="请填写宿舍号"
            />
          </a-form-item>
        </a-col>
        <a-col :key="1" :span="5">
          <a-form-item label="卫生级别">
            <a-select
              v-decorator="[
                'level',
                { rules: [{ required: true, message: '请选择信息' }] },
              ]"
              placeholder="请选择信息">
              <a-select-option key="优秀">优秀</a-select-option>
              <a-select-option key="良好">良好</a-select-option>
              <a-select-option key="合格">合格</a-select-option>
              <a-select-option key="不合格">不合格</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :key="2" :span="6">
          <a-form-item label="备注">
            <a-input
              v-decorator="[
                'other',
                { rules: [{ required: true, message: '请填写备注' }] },
              ]"
              placeholder="有则写，无则写无"/>
          </a-form-item>
        </a-col>
        <a-col :key="3" :span="6">
          <a-form-item label="检查时间">
            <a-date-picker
              showTime
              placeholder="选择日期"
              v-decorator="[
                'time',
                {rules: [{ type: 'object', required: true, message: '请选择日期!' }]}]"
              format="YYYY-MM-DD"/>
          </a-form-item>
        </a-col>
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
        <a-popconfirm title="确认删除吗" @confirm="()=>handleDelete(record.checkID)">
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
    title: '宿舍号',
    dataIndex: 'roomId'
  },
  {
    title: '卫生级别',
    dataIndex: 'level'
  },
  {
    title: '检查时间',
    dataIndex: 'time'
  },
  {
    title: '备注',
    dataIndex: 'other'
  }
]
const data = []
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
      checkInfo: {},
      form: this.$form.createForm(this, { name: 'advanced_apply' }),
      selfInfo: {}
    }
  },
  methods: {
    ...mapActions(['getHygienesApi', 'addHygieneApi', 'getDormByOtherApi', 'getDormByIdApi']),
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.checkID !== key)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log('提交错误')
        } else {
          const values = {
            ...fieldsValue,
            'time': fieldsValue['time'].format('YYYY-MM-DD')
          }
          this.getDormByOtherApi({ area: this.selfInfo.area, buildId: this.selfInfo.buildId, roomId: values.roomId })
            .then(res => {
              values.dormId = res.data.dormId
              const params = values
              console.log('Received values of form: ', values)
              this.addHygieneApi(params)
                .then(res => this.handleSuccessfully(res, values))
                .catch(err => this.handleFail(err))
                .finally()
            })
            .catch(err => console.log('add err', err))
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    handleSuccessfully (res, values) {
      console.log('addHygiene successfully', res)
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
    const jsonData = { area: this.selfInfo.area, buildId: this.selfInfo.buildId, time: '2020-03' }
    this.getHygienesApi(jsonData).then(res => {
      const arr = res.data.hygienes
      arr.forEach(ele => {
        this.getDormByIdApi({ dormId: ele.dormId }).then(res => {
          ele.roomId = res.roomId
          ele.time = ele.time.replace(/T/, ' ').slice(0, ele.time.indexOf('.'))
          ele.key = this.data.length
          this.data.push(ele)
        })
          .catch(err => console.log('err', err))
      })
    })
      .catch(err => console.log(err))
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

<template>
  <div id="components-form-disobey">
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
        <a-col :key="3" :span="6">
          <a-form-item label="违纪级别">
            <a-select
              v-decorator="[
                'level',
                { rules: [{ required: true, message: '请选择信息' }] },
              ]"
              placeholder="请选择信息">
              <a-select-option key="低" value="1">低</a-select-option>
              <a-select-option key="中" value="2">中</a-select-option>
              <a-select-option key="高" value="3">高</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :key="4" :span="12">
          <a-form-item label="违规事项">
            <a-input
              v-decorator="['reason',{ rules: [{required: true,message: '请填写信息!',},],},]"
              placeholder="具体违规事项"
            />
          </a-form-item>
        </a-col>
        <a-col :key="5" :span="8">
          <a-form-item label="违规时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['time', config]" format="YYYY-MM-DD HH:mm:ss"/>
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
      class="tabStyle"
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
import store from '@/store'
import { mapActions } from 'vuex'
const columns = [
  {
    title: '宿舍',
    dataIndex: 'roomId',
    width: '10%',
    scopedSlots: { customRender: 'roomId' }
  },
  {
    title: '学号',
    dataIndex: 'userId',
    width: '15%',
    scopedSlots: { customRender: 'userId' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '其他信息',
    dataIndex: 'info',
    width: '20%',
    scopedSlots: { customRender: 'info' }
  },
  {
    title: '违规时间',
    dataIndex: 'time',
    width: '15%',
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '违规事项',
    dataIndex: 'reason',
    width: '20%',
    scopedSlots: { customRender: 'reson' }
  },
  {
    title: '级别',
    dataIndex: 'level',
    width: '10%',
    scopedSlots: { customRender: 'level' }
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
      disobeyInfo: {},
      items: [
        { value: '违规宿舍', name: 'roomId', place: '违规宿舍' },
        { value: '违规者学号', name: 'userId', place: '违规者学号' },
        { value: '违规者姓名', name: 'name', place: '违规者姓名' }
      ],
      config: {
        rules: [{ type: 'object', required: true, message: '请选择选项!' }]
      },
      form: this.$form.createForm(this),
      selfInfo: {},
      levelArr: ['', '低', '中', '高']
    }
  },
  methods: {
    ...mapActions(['addDisobeyApi', 'getDisobeyListApi', 'getUserInfoApi']),
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.disobeyID !== key)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log('提交错误')
        } else {
          const values = {
            ...fieldsValue,
            'time': fieldsValue['time'].format('YYYY-MM-DD HH:mm:ss'),
            'level': parseInt(fieldsValue['level'])
          }
          console.log('Received values of form: ', values)
          const params = {
            userId: values.userId,
            level: values.level,
            reason: values.reason,
            time: values.time
          }
          this.addDisobeyApi(params)
            .then(res => this.handleSuccessfully(res, values))
            .catch(err => this.handleFail(err))
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    handleSuccessfully (res, values) {
      console.log('add successfully', res)
      this.getUserInfoApi({ userId: values.userId }).then(res => {
        const tmp = res.data
        values.info = tmp.college + tmp.major + tmp.classId + '班'
        values.key = this.data.length
        values.level = this.levelArr[values.level]
        console.log('values', values)
        this.data.unshift(values)
      })
        .catch(err => console.log(err))
      this.$notification['success']({
        message: '成功',
        description: '添加成功',
        duration: 2
      })
    },
    handleFail (err) {
      console.log('add fail', err)
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
    this.getDisobeyListApi(jsonData).then(res => {
      const items = res.data.disobeyList
      items.forEach(ele => {
        const obj = { key: this.data.length,
          roomId: ele.roomId,
          userId: ele.userId,
          name: ele.name,
          info: ele.college + ele.major + ele.classId + '班',
          time: ele.time.replace(/T/, ' ').slice(0, ele.time.indexOf('.')),
          reason: ele.reason,
          level: this.levelArr[ele.level]
        }
        this.data.push(obj)
      })
    })
      .catch(err => console.log(err))
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

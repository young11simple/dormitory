<template>
  <div id="components-form-demo-apply">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col
          v-for="(value,index) in items"
          :key="index"
          :span="8"
        >
          <a-form-item :label="value.value">
            <a-input
              v-decorator="[
                value.name,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
              :placeholder="value.place"
            />
          </a-form-item>
        </a-col>
        <a-col :key="5" :span="8">
          <a-form-item label="报修类型">
            <a-select
              v-decorator="[
                'type',
                { rules: [{ required: true, message: '请选择报修类型' }] },
              ]"
              placeholder="请选择报修类型">
              <a-select-option
                v-for="repair in repairClass"
                :key="repair"
              >{{ repair }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :key="6" :span="8">
          <a-form-item label="申请时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['time', config]" format="YYYY/MM/DD HH:mm:ss"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import store from '@/store'
import { repairApplyApi } from '@/api/APIs'
export default {
  data () {
    return {
      info: {},
      repairClass: ['爆水管', '水管漏水', '天花灯', '插座', '空调', '花洒', '晾衣架'],
      items: [
        { value: '学号', name: 'userId' },
        { value: '姓名', name: 'name' },
        { value: '地址', name: 'address' },
        { value: '联系方式', name: 'telephone' },
        // { value: '报修类别', name: 'type' },
        { value: '报修详情', name: 'detail', place: '填写报修详情' }
        // { value: '申请时间', name: 'time', place: '格式XXXX/XX/XX' }
      ],
      config: {
        rules: [{ type: 'object', required: true, message: '请选择时间!' }]
      },
      form: this.$form.createForm(this, { name: 'advanced_apply' })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log('提交错误')
        } else {
          const values = {
            ...fieldsValue,
            'time': fieldsValue['time'].format('YYYY/MM/DD HH:mm:ss')
          }
          delete values.address
          delete values.time
          delete values.name
          values.dormId = this.info.dormId
          console.log('Received values of form: ', values)
          repairApplyApi(values)
            .then(res => this.handleSuccessfully(res))
            .catch(err => this.handleFail(err))
            .finally()
        }
      })
    },
    handleReset () {
      this.form.resetFields(['type', 'detail', 'time'])
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
  },
  mounted () {
    this.info = store.getters.userInfo
    this.form.setFieldsValue({
      userId: this.info.userId,
      name: this.info.name,
      telephone: this.info.telephone,
      address: this.info.area + this.info.buildId + '栋' + this.info.roomId
    })
  }
}
</script>

<style scoped>
#components-form-demo-apply {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>

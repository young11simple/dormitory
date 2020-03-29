<template>
  <div id="components-form-check">
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
          <a-form-item label="学院">
            <a-select
              v-decorator="[
                'college',
                { rules: [{ required: true, message: '请选择信息' }] },
              ]"
              placeholder="请选择信息">
              <a-select-option value="数学与信息学院">数学与信息学院</a-select-option>
              <a-select-option value="经济管理学院">经济管理学院</a-select-option>
              <a-select-option value="食品安全学院">食品安全学院</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :key="4" :span="6">
          <a-form-item label="专业班级">
            <a-input
              v-decorator="['majorClass',{ rules: [{required: true,message: '请填写信息!',},],},]"
              placeholder="该生所在专业班级"
            />
          </a-form-item>
        </a-col>
        <a-col :key="5" :span="10">
          <a-form-item label="备注">
            <a-input
              v-decorator="['other',{ rules: [{required: false,message: '请填写信息!',},],},]"
              placeholder="额外信息（可以不填）"
            />
          </a-form-item>
        </a-col>
        <a-col :key="6" :span="6">
          <a-form-item label="检查时间">
            <a-date-picker showTime placeholder="选择时间" v-decorator="['time',{ rules: [{required: true,message: '请选择时间!',},],},]" format="YYYY/MM/DD"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right', marginBottom: '10px' }">
          <a-button type="primary" html-type="submit">
            添加
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
          <a-tooltip>
            <template slot="title">
              <span>自动生成重点检查对象</span>
            </template>
            <a-button type="primary" :style="{ marginLeft: '8px' }" @click="handleGet">
              生成名单
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="data"
      bordered
      :pagination="pagination"
    >
      <template slot="operation" slot-scope="text,record">
        <a-popconfirm title="确认删除吗" @confirm="()=>handleDelete(record.id)">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from '@/store'
import XLSX from 'xlsx'
const columns = [
  {
    title: '宿舍号',
    dataIndex: 'roomId'
  },
  {
    title: '学生',
    dataIndex: 'name'
  },
  {
    title: '学号',
    dataIndex: 'userId'
  },
  {
    title: '学院',
    dataIndex: 'college'
  },
  {
    title: '专业班级',
    dataIndex: 'majorClass'
  },
  {
    title: '备注',
    dataIndex: 'other'
  },
  {
    title: '检查时间',
    dataIndex: 'time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
// eslint-disable-next-line no-extend-native
Array.prototype.getArrayIndex = function (obj) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === obj) {
      return i
    }
  }
  return -1
}
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'advanced_apply' }),
      columns,
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      items: [
        { value: '宿舍', name: 'roomId', place: '该生所在宿舍' },
        { value: '学生', name: 'name', place: '夜不归寝的学生姓名' },
        { value: '学号', name: 'userId', place: '该生学号' }
      ],
      data: [],
      selfInfo: {}
    }
  },
  methods: {
    ...mapActions(['getNightsApi', 'addNightApi', 'delNightApi']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log('提交错误')
        } else {
          const values = {
            ...fieldsValue,
            'time': fieldsValue['time'].format('YYYY/MM/DD')
          }
          console.log('values', values)
          this.addNightApi(values)
            .then(res => {
              this.$message.success('添加成功')
              values.key = this.data.length
              this.data.unshift(values)
            })
            .catch(err => {
              this.$message.error('添加失败')
              console.log('add err', err)
            })
        }
      })
    },
    handleGet () {
      const ids = []
      const exportData = []
      this.data.forEach(item => {
        ids.push({ 宿舍号: item.roomId,
          学号: item.userId,
          姓名: item.name,
          性别: item.gender,
          学院: item.college,
          专业班级: item.majorClass,
          年级: item.level
        })
      })
      ids.forEach(ele => {
        if (new Set(exportData.map(item => item.学号)).has(ele.学号)) {
          for (let j = 0; j < exportData.length; j++) {
            if (exportData[j].学号 === ele.学号) exportData[j].次数++
          }
        } else {
          ele.次数 = 1
          exportData.push(ele)
        }
      })
      const header = ['宿舍号', '学生', '学号', '学院']
      const xlsxName = store.getters.userInfo.area + store.getters.userInfo.buildId + '栋重点检查对象'
      const ws = XLSX.utils.json_to_sheet(exportData, header)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, xlsxName)
      XLSX.writeFile(wb, xlsxName + '.xlsx')
    },
    handleDelete (id) {
      this.delNightApi({ id: id }).then(res => {
        this.data = this.data.filter(item => item.id !== id)
        this.$message.success('删除成功')
      })
        .catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
    },
    handleReset () {
      this.form.resetFields()
    }
  },
  mounted () {
    this.selfInfo.area = store.getters.userInfo.area
    this.selfInfo.buildId = store.getters.userInfo.buildId
    const jsonData = { area: this.selfInfo.area, buildId: this.selfInfo.buildId }
    this.getNightsApi(jsonData).then(res => {
      res.data.nights.forEach(ele => {
        ele.time = ele.time.replace(/-/g, '/').slice(0, ele.time.indexOf('T'))
        ele.key = this.data.length
        ele.majorClass = ele.major + ele.classId + '班'
        if (ele.other === undefined) {
          ele.other = '无'
        }
        this.data.push(ele)
      })
    })
      .catch(err => console.log('err', err))
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
</style>

<template>
  <div id="components-form-dorm">
    <div id="tooltip" style="margin-bottom:10px">
      <import-data @getResult="getResult"></import-data>
      <span>（导入学生数量不得多于{{ count }}个）</span>
      <a-button type="primary" @click="export2Excel">导出学生信息</a-button>
    </div>
    <a-table
      :pagination="pagination"
      :columns="columns"
      :dataSource="data"
      :expandedRowKeys="expandedRowKeys"
      @expand="expand"
      bordered
    >
      <a-table
        slot="expandedRowRender"
        :columns="innerColumns"
        :dataSource="innerDatas"
        :pagination="false"
      ></a-table>
    </a-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from '@/store'
import importData from './importData'
import XLSX from 'xlsx'
const columns = [
  {
    title: '宿舍号',
    dataIndex: 'roomId'
  },
  {
    title: '床位',
    dataIndex: 'bed'
  },
  {
    title: '是否有空铺位',
    dataIndex: 'hasEmpty'
  },
  {
    title: '空铺数',
    dataIndex: 'lastbed'
  }
]
const innerColumns = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '学号',
    dataIndex: 'userId'
  },
  {
    title: '性别',
    dataIndex: 'gender'
  },
  {
    title: '联系方式',
    dataIndex: 'telephone'
  },
  {
    title: '院系',
    dataIndex: 'college'
  },
  {
    title: '专业',
    dataIndex: 'major'
  },
  {
    title: '班级',
    dataIndex: 'classId'
  },
  {
    title: '级别',
    dataIndex: 'level'
  }
]
const data = []
var count = 0
export default {
  components: {
    importData
  },
  data () {
    return {
      count,
      columns,
      innerColumns,
      data,
      expandedRowKeys: [],
      innerData: [],
      innerDatas: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      newUsers: [],
      rooms: [],
      studentsInfo: []
    }
  },
  methods: {
    ...mapActions(['getDormsApi', 'getDormByIdApi', 'getUsersByDormApi', 'addStudentApi']),
    getResult (values) {
      this.studentsInfo = JSON.parse(JSON.stringify(values))
      if (this.studentsInfo.length > this.count) {
        this.$notification.error({
          message: '警告',
          description: '学生数量超过现有空床位'
        })
      } else {
        this.count = this.count - this.studentsInfo.length
        var k = 0
        this.data.forEach(ele => {
          const indexTmp = this.data.indexOf(ele)
          if (ele.lastbed !== 0) {
            var arr = []
            for (let i = 0; i < ele.lastbed && k !== values.length; i++) {
              const arr2 = {
                key: this.innerData[indexTmp].length,
                dormId: ele.dormId,
                name: this.studentsInfo[k].姓名,
                userId: this.studentsInfo[k].学号,
                gender: this.studentsInfo[k].性别,
                telephone: this.studentsInfo[k].联系方式,
                college: this.studentsInfo[k].院系,
                major: this.studentsInfo[k].专业,
                classId: this.studentsInfo[k].班级,
                level: this.studentsInfo[k++].级别
              }
              arr.push(arr2)
              this.innerData[indexTmp].push(arr2)
              this.newUsers.push(arr2)
            }
          }
        })
        for (let j = 0; j < this.innerData.length && this.innerData[j].length !== 0; j++) {
          console.log(j)
          this.data[j].lastbed = this.data[j].bed - this.innerData[j].length
          if (this.innerData[j].length === this.data[j].lastbed) {
            this.data[j].hasEmpty = '否'
          }
        }
      }
      console.log('this.newUsers', this.newUsers)
      this.newUsers.forEach(ele => {
        delete ele.key
        this.addStudentApi(ele).then(res => {
          console.log(res)
          this.$notification.success({
            message: '成功',
            description: '分配宿舍成功'
          })
        })
          .catch(err => console.log(err))
      })
    },
    export2Excel () {
      this.newUsers = []
      this.innerData.forEach(ele2 => {
        ele2.forEach(ele => {
          this.newUsers.push({
            宿舍号: ele.roomId,
            姓名: ele.name,
            学号: ele.userId,
            性别: ele.gender,
            联系方式: ele.telephone,
            学院: ele.college,
            专业: ele.major,
            班级: ele.classId,
            年级: ele.level
          })
        })
      })
      const header = ['宿舍号', '人数', '空铺', '姓名', '学号', '性别', '联系方式', '院系', '专业', '班级', '级别']
      const xlsxName = store.getters.userInfo.area + store.getters.userInfo.buildId + '栋宿舍信息'
      const ws = XLSX.utils.json_to_sheet(this.newUsers, header)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, xlsxName)
      XLSX.writeFile(wb, xlsxName + '.xlsx')
    },
    expand (expanded, record) {
      if (expanded) {
        // 初始化展开值
        this.innerDatas = []
        // 初始化关闭所有展开窗
        this.expandedRowKeys = []
        // 设置展开参数
        this.innerDatas = this.innerData[record.key]
        // 设置展开窗Key
        this.onExpandedRowsChange(record)
      } else {
        this.expandedRowKeys = []
      }
    },
    onExpandedRowsChange (rows) {
      this.expandedRowKeys = [rows.key]
    },
    handleInnerData (element) {
      this.getUsersByDormApi({ dormId: element.dormId }).then(res => {
        const arr = []
        if (res.data.users.length > 0) {
          res.data.users.forEach(ele => {
            ele.key = arr.length
            arr.push(ele)
          })
        }
        element.key = this.data.length
        this.data.push(element)
        this.innerData.push(arr)
      })
        .catch(err => console.log('getInfo err', err))
    }
  },
  mounted () {
    const jsonData = { area: store.getters.userInfo.area, buildId: store.getters.userInfo.buildId }
    this.getDormsApi(jsonData).then(res => {
      res.data.dorms.forEach(element => {
        if (element.lastbed > 0) {
          element.hasEmpty = '是'
        } else {
          element.hasEmpty = '否'
        }
        this.handleInnerData(element)
        this.count += element.lastbed
      })
    })
      .catch(err => console.log('err', err))
  }
}
</script>
<style scoped>
#components-form-dorm {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>

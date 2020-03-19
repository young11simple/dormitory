<template>
  <div id="components-form-allocation">
    <div id="tooltip">
      <import-data @getResult="getResult"></import-data>
      <a-button type="primary" @click="export2Excel">导出学生信息</a-button>
    </div>
    <a-table
      :pagination="pagination"
      :columns="columns"
      :dataSource="data"
      bordered
      id="table"
    >
    </a-table>
  </div>
</template>
<script>
import importData from './importData'
import XLSX from 'xlsx'
import store from '@/store'
import { mapActions } from 'vuex'
const data = []
for (let i = 0; i < 4; i++) {
  data.push({
    key: i,
    roomId: `12${i + 1}`,
    bed: 4,
    lastbed: 4
  })
}
console.log(data)
//     name: `Edrward ${i}`,
//     userId: `20162505020${i}`,
//     gender: '女',
//     telephone: `1580203356${i}`,
//     college: '数学与信息学院',
//     major: '网工',
//     classId: '2班',
//     level: '2016级'
//   })
//   if (data[i].bed > data[i].lastbed) {
//     const tmp = data[i].lastbed
//     console.log('空床位', tmp)
//     for (let j = 1; j < 4; j++) {
//       data.push({
//         key: (++k).toString(),
//         roomId: i.toString(),
//         bed: '4',
//         lastbed: '3'
//       })
//     }
//   }
// }
const renderContent2 = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  return obj
}
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  if (index % 4 === 0) {
    obj.attrs.rowSpan = 4
  } else {
    obj.attrs.rowSpan = 0
  }
  return obj
}
export default {
  components: {
    importData
  },
  data () {
    const columns = [
      {
        title: '宿舍号',
        dataIndex: 'roomId',
        customRender: renderContent
      },
      {
        title: '床位',
        dataIndex: 'bed',
        customRender: renderContent
      },
      {
        title: '空铺',
        dataIndex: 'lastbed',
        customRender: renderContent
      },
      {
        title: '姓名',
        dataIndex: 'name',
        customRender: renderContent2
      },
      {
        title: '学号',
        dataIndex: 'userId',
        customRender: renderContent2
      },
      {
        title: '性别',
        dataIndex: 'gender',
        customRender: renderContent2
      },
      {
        title: '联系方式',
        dataIndex: 'telephone',
        customRender: renderContent2
      },
      {
        title: '院系',
        dataIndex: 'college',
        customRender: renderContent2
      },
      {
        title: '专业',
        dataIndex: 'major',
        customRender: renderContent2
      },
      {
        title: '班级',
        dataIndex: 'classId',
        customRender: renderContent2
      },
      {
        title: '级别',
        dataIndex: 'level',
        customRender: renderContent2
      }
    ]
    return {
      columns,
      data,
      pagination: {
        defaultPageSize: 4,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['4', '8', '12', '16'],
        showQuickJumper: true
      },
      rooms: [],
      isRandom: false,
      setIndex: -1,
      studentsInfo: []
    }
  },
  computed: {
    info () {
      return this.studentsInfo
    }
  },
  watch: {
    info (val) {
      console.log('watch', val)
      let i, j
      for (i = 0, j = 0; i < this.data.length; i++) {
        console.log('this.data[i].name', this.data[i].name)
        if (j === val.length) {
          break
        } else {
          if (this.data[i].name === undefined) {
            console.log('JSON.parse(val[j])', val[j])
            if (i % 4 === 3) {
              this.data[i - 3].lastbed = 0
              this.data[i - 2].lastbed = 0
              this.data[i - 1].lastbed = 0
              this.data[i].lastbed = 0
            } else if (i % 4 === 2) {
              this.data[i - 2].lastbed = 1
              this.data[i - 1].lastbed = 1
              this.data[i].lastbed = 1
              this.data[i + 1].lastbed = 1
            } else if (i % 4 === 1) {
              this.data[i - 1].lastbed = 2
              this.data[i].lastbed = 2
              this.data[i + 1].lastbed = 2
              this.data[i + 2].lastbed = 2
            } else {
              this.data[i].lastbed = 3
              this.data[i + 1].lastbed = 3
              this.data[i + 2].lastbed = 3
              this.data[i + 3].lastbed = 3
            }
            this.data[i].name = this.studentsInfo[j].姓名
            this.data[i].userId = this.studentsInfo[j].学号
            this.data[i].gender = this.studentsInfo[j].性别
            this.data[i].telephone = this.studentsInfo[j].联系方式
            this.data[i].college = this.studentsInfo[j].院系
            this.data[i].major = this.studentsInfo[j].专业
            this.data[i].classId = this.studentsInfo[j].班级
            this.data[i].level = this.studentsInfo[j].级别
            j++
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['getDormsApi']),
    randomAllocate () {
      console.log('randomAllocate')
      this.isRandom = !this.isRandom
    },
    handAllocate () {
      console.log('handAllocate')
      // this.innerData.push({})
      // this.innerData.push({})
    },
    handleChange () {
      this.setIndex += 1
      console.log('setIndex:', this.setIndex)
    },
    getResult (values) {
      this.studentsInfo = values
      console.log('getResult', this.studentsInfo.length)
    },
    export2Excel () {
      const header = ['宿舍号', '人数', '空铺', '姓名', '学号', '性别', '联系方式', '院系', '专业', '班级', '级别']
      const xlsxName = '9栋宿舍信息'
      const ws = XLSX.utils.json_to_sheet(this.data, header)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, xlsxName)
      XLSX.writeFile(wb, xlsxName + '.xlsx')
    }
  },
  mounted () {
    const jsonData = { area: store.getters.userInfo.area, buildId: store.getters.userInfo.buildId }
    this.getDormsApi(jsonData).then(res => {
      res.data.dorms.forEach(element => {
        element.key = this.data.length
        if (element.lastbed > 0) {
          element.hasEmpty = '是'
        } else {
          element.hasEmpty = '否'
        }
        // this.data.push(element)
      })
    })
      .catch(err => console.log('err', err))
  }
}
</script>
<style scoped>
#components-form-allocation {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
#tooltip {
  margin-bottom: 10px;
}
</style>

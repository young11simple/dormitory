<template>
  <div id="components-form-allocation">
    <div id="tooltip">
      <!-- <a-button type="primary" @click="randomAllocate" :style="{marginRight:'30px'}">随机分配</a-button> -->
      <!-- <a-button
        type="primary"
        @click="handAllocate"
        v-if="!isRandom"
        :style="{marginRight:'30px'}"
      >人工分配</a-button> -->
      <!-- <a-button type="primary" v-if="isRandom">导入学生信息</a-button> -->
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
      <!-- <a-table
        slot="expandedRowRender"
        :columns="innerColumns"
        :dataSource="innerDatas[setIndex]"
        :pagination="false"
      ></a-table>-->
    </a-table>
  </div>
</template>
<script>
import importData from './importData'
import XLSX from 'xlsx'
// const columns = [
//   {
//     title: '宿舍号',
//     dataIndex: 'roomID',
//     width: '30%'
//   },
//   {
//     title: '几人间',
//     dataIndex: 'count',
//     width: '30%'
//   },
//   {
//     title: '空铺数',
//     dataIndex: 'countEmpty',
//     width: '30%'
//   }
// ]
// const innerColumns = [
//   {
//     title: '姓名',
//     dataIndex: 'name',
//     width: '10%'
//   },
//   {
//     title: '学号',
//     dataIndex: 'account',
//     width: '10%'
//   },
//   {
//     title: '性别',
//     dataIndex: 'gender',
//     width: '7%'
//   },
//   {
//     title: '联系方式',
//     dataIndex: 'contact',
//     width: '10%'
//   },
//   {
//     title: '院系',
//     dataIndex: 'college',
//     width: '15%'
//   },
//   {
//     title: '专业班级',
//     dataIndex: 'majorClass',
//     width: '10%'
//   },
//   {
//     title: '级别',
//     dataIndex: 'level',
//     width: '10%'
//   }
// ]
const data = []
// let innerData = []
// const innerDatas = []
for (let i = 0; i < 4; i++) {
  var k = i * 4
  data.push({
    key: k.toString(),
    roomID: i.toString(),
    count: '4',
    countEmpty: '3',
    name: `Edrward ${i}`,
    account: `20162505020${i}`,
    gender: '女',
    contact: `1580203356${i}`,
    college: '数学与信息学院',
    majorClass: '网工2班',
    level: '2016级'
  })
  if (data[i].count > data[i].countEmpty) {
    const tmp = data[i].countEmpty
    console.log('空床位', tmp)
    for (let j = 1; j < 4; j++) {
      data.push({
        key: (++k).toString(),
        roomID: i.toString(),
        count: '4',
        countEmpty: '3'
      })
    }
  }
}
console.log('data', data)
// for (let i = 0; i < 10; i++) {
//   innerData.push({
//     name: `Edrward ${i}`,
//     account: `20162505020${i}`,
//     gender: '女',
//     contact: `1580203356${i}`,
//     college: '数学与信息学院',
//     majorClass: '网工2班',
//     level: '2016级'
//   })
// console.log('innerData:', innerData)
//   if (i % 2 === 1) {
//     innerDatas.push(innerData)
//     innerData = []
//     console.log('innerDatas:', innerDatas)
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
        dataIndex: 'roomID',
        width: '10%',
        customRender: renderContent
      },
      {
        title: '人数',
        dataIndex: 'count',
        width: '6%',
        customRender: renderContent
      },
      {
        title: '空铺',
        dataIndex: 'countEmpty',
        width: '6%',
        customRender: renderContent
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
        customRender: renderContent2
      },
      {
        title: '学号',
        dataIndex: 'account',
        width: '10%',
        customRender: renderContent2
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: '7%',
        customRender: renderContent2
      },
      {
        title: '联系方式',
        dataIndex: 'contact',
        width: '10%',
        customRender: renderContent2
      },
      {
        title: '院系',
        dataIndex: 'college',
        width: '15%',
        customRender: renderContent2
      },
      {
        title: '专业班级',
        dataIndex: 'majorClass',
        width: '10%',
        customRender: renderContent2
      },
      {
        title: '级别',
        dataIndex: 'level',
        width: '10%',
        customRender: renderContent2
      }
    ]
    return {
      columns,
      // innerColumns,
      data,
      // innerDatas,
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
              this.data[i - 3].countEmpty = 0
              this.data[i - 2].countEmpty = 0
              this.data[i - 1].countEmpty = 0
              this.data[i].countEmpty = 0
            } else if (i % 4 === 2) {
              this.data[i - 2].countEmpty = 1
              this.data[i - 1].countEmpty = 1
              this.data[i].countEmpty = 1
              this.data[i + 1].countEmpty = 1
            } else if (i % 4 === 1) {
              this.data[i - 1].countEmpty = 2
              this.data[i].countEmpty = 2
              this.data[i + 1].countEmpty = 2
              this.data[i + 2].countEmpty = 2
            } else {
              this.data[i].countEmpty = 3
              this.data[i + 1].countEmpty = 3
              this.data[i + 2].countEmpty = 3
              this.data[i + 3].countEmpty = 3
            }
            this.data[i].name = this.studentsInfo[j].姓名
            this.data[i].account = this.studentsInfo[j].学号
            this.data[i].gender = this.studentsInfo[j].性别
            this.data[i].contact = this.studentsInfo[j].联系方式
            this.data[i].college = this.studentsInfo[j].院系
            this.data[i].majorClass = this.studentsInfo[j].专业班级
            this.data[i].level = this.studentsInfo[j].级别
            j++
          }
        }
      }
    }
  },
  methods: {
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
      // const table = document.getElementById('table')
      // const worksheet = XLSX.utils.table_to_sheet(table)
      // let workbook = XLSX.utils.book_new()
      // XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet')
      // // 以上四行也可以直接一行搞定，如果不需要对表格数据进行修改的话
      // workbook = XLSX.utils.table_to_book(document.getElementById('table'))
      // XLSX.writeFile(workbook, 'text.xlsx')
      const header = ['宿舍号', '人数', '空铺', '姓名', '学号', '性别', '联系方式', '院系', '专业班级', '级别']
      const xlsxName = '9栋宿舍信息'
      const ws = XLSX.utils.json_to_sheet(this.data, header)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, xlsxName)
      XLSX.writeFile(wb, xlsxName + '.xlsx')
    }
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

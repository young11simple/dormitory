<template>
  <div id="components-form-dorm">
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
export default {
  data () {
    return {
      columns,
      innerColumns,
      data: [],
      innerData: [],
      innerDatas: [],
      expandedRowKeys: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      rooms: []
    }
  },
  methods: {
    ...mapActions(['getDormsApi', 'getDormByIdApi', 'getUsersByDormApi']),
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
        console.log('getInfo res', res)
        const arr = []
        res.data.users.forEach(ele => {
          ele.key = arr.length
          arr.push(ele)
        })
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

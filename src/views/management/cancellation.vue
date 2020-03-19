<template>
  <div id="components-form-dorm">
    <a-table
      slot="expandedRowRender"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      bordered
    >
      <template slot="operation" slot-scope="text,record">
        <a-button type="primary" @click="()=>cancel(record.userId)" >注销</a-button>
      </template></a-table>
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
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  data () {
    return {
      columns,
      data: [],
      innerData: [],
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
    ...mapActions(['getDormsApi', 'getDormByIdApi', 'getUsersByDormApi', 'logoffStudentApi']),
    handleInnerData (element) {
      this.getUsersByDormApi({ dormId: element.dormId }).then(res => {
        console.log('getInfo res', res)
        res.data.users.forEach(ele => {
          ele.key = this.data.length
          this.data.push(ele)
        })
      })
        .catch(err => console.log('getInfo err', err))
    },
    cancel (userId) {
      this.logoffStudentApi({ userId: userId }).then(res => {
        console.log(res)
        this.$notification.success({
          message: '成功',
          description: '注销成功'
        })
        this.data = this.data.filter(item => item.userId !== userId)
      })
        .catch(err => {
          console.log(err)
          this.$notification.error({
            message: '失败',
            description: '注销失败'
          })
        })
    }
  },
  mounted () {
    const jsonData = { area: store.getters.userInfo.area, buildId: store.getters.userInfo.buildId }
    this.getDormsApi(jsonData).then(res => {
      res.data.dorms.forEach(element => {
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

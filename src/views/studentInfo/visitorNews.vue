<template>
  <div id="components-form-disobey">
    <div style="text-align:center"><a-icon type="user" />您的访客记录</div>
    <hr style="align:center; width:300;color:#987cb9; SIZE:1">
    <a-table
      id="tabTop"
      :columns="columns"
      :dataSource="data"
      bordered
      :pagination="pagination"
    >
    </a-table>
  </div>
</template>

<script>
import store from '@/store'
import { mapActions } from 'vuex'
const columns = [
  {
    title: '来访者',
    dataIndex: 'userName',
    width: '8%',
    scopedSlots: { customRender: 'userName' }
  },
  {
    title: '被访者',
    dataIndex: 'name',
    width: '8%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '关系',
    dataIndex: 'relation',
    width: '8%',
    scopedSlots: { customRender: 'relation' }
  },
  {
    title: '是否本校',
    dataIndex: 'isSCAU',
    width: '9%',
    scopedSlots: { customRender: 'isSCAU' }
  },
  {
    title: '证件号码',
    dataIndex: 'idNo',
    width: '12%',
    scopedSlots: { customRender: 'idNo' }
  },
  {
    title: '访问时间',
    dataIndex: 'startTime',
    width: '12%',
    scopedSlots: { customRender: 'startTime' }
  },
  {
    title: '离开时间',
    dataIndex: 'endTime',
    width: '12%',
    scopedSlots: { customRender: 'endTime' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
    scopedSlots: { customRender: 'operation' }
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
      selfInfo: {}
    }
  },
  methods: {
    ...mapActions(['getVisitsApi']),
    handleDelete (key) {
      console.log('key', key)
      this.data = this.data.filter(item => item.disobeyID !== key)
    },
    handleAdd () {
      console.log('add:', this.disobeyInfo)
      this.data.unshift(this.disobeyInfo)
      this.disobeyInfo = {}
    },
    handleSuccessfully (res) {
      console.log('add successfully', res)
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
    this.getDisobeyListApi(jsonData).then(res => { console.log(res) })
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

<template>
  <div id="components-form-disobey">
    <div style="text-align:center"><a-icon type="warning" />您的违纪记录</div>
    <hr style="align:center; width:300;color:#987cb9; SIZE:1">
    <a-table
      id="tabTop"
      :columns="columns"
      :dataSource="data"
      bordered
      :pagination="pagination"
      class="tabStyle"
    >
    </a-table>
  </div>
</template>

<script>
import store from '@/store'
import { mapActions } from 'vuex'
const columns = [
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
    title: '宿舍',
    dataIndex: 'address',
    width: '10%',
    scopedSlots: { customRender: 'address' }
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
      selfInfo: {},
      levelArr: ['', '低', '中', '高']
    }
  },
  methods: {
    ...mapActions(['getDisobeyListApi']),
    handleSuccessfully (res) {
      console.log('get successfully', res)
      const arr = res.data.disobeyList
      let key = 0
      arr.forEach(element => {
        element.key = key++
        element.time = element.time.replace(/T/, ' ').slice(0, element.time.indexOf('.'))
        element.level = this.levelArr[element.level]
        element.address = element.area + element.buildId + '-' + element.roomId
      })
      this.data = arr
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
    const jsonData = { userId: store.getters.userInfo.userId }
    this.getDisobeyListApi(jsonData).then(res => this.handleSuccessfully(res))
      .catch(err => this.handleFail(err))
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

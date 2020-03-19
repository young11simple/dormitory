<template>
  <div id="components-form-disobey">
    <div style="text-align:center"><a-icon type="home" />您的宿舍卫生检查结果</div>
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
    title: '宿舍号',
    dataIndex: 'roomId'
  },
  {
    title: '卫生级别',
    dataIndex: 'level'
  },
  {
    title: '检查时间',
    dataIndex: 'time'
  },
  {
    title: '备注',
    dataIndex: 'other'
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
      }
    }
  },
  methods: {
    ...mapActions(['getHygienesApi'])
  },
  mounted () {
    const jsonData = { dormId: store.getters.userInfo.dormId }
    this.getHygienesApi(jsonData).then(res => {
      const arr = res.data.hygienes
      arr.forEach(ele => {
        ele.roomId = store.getters.userInfo.roomId
        ele.time = ele.time.replace(/T/, ' ').slice(0, ele.time.indexOf('.'))
        ele.key = this.data.length
        this.data.push(ele)
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

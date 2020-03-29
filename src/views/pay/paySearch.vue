<template>
  <div id="components-form-eleCheck">
    <a-table
      :dataSource="data"
      :columns="columns"
      bordered
      :pagination="pagination"
      @change="handleTableChange">
    </a-table>
  </div>
</template>

<script>
import 'ant-design-vue/lib/collapse/style'
import payOrder from './payOrder'
import { mapActions } from 'vuex'
export default {
  components: {
    payOrder
  },
  data () {
    return {
      data: [],
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      cacheData: [],
      columns: [
        {
          title: '订单号',
          dataIndex: 'orderId'
        },
        {
          title: '电表',
          dataIndex: 'ammeter'
        },
        {
          title: '充值金额（元）',
          dataIndex: 'fee'
        },
        {
          title: '充值时间',
          dataIndex: 'time',
          sorter: true
        }
      ],
      flag: false,
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      filter: []
    }
  },
  methods: {
    ...mapActions(['getPayRecordApi']),
    handleTableChange (pagination, filters, sorter) {
      console.log(filters, sorter)
      if (filters.ammeter !== undefined) {
        this.data = this.cacheData.filter(item => {
          this.flag = false
          filters.ammeter.forEach(ele => {
            if (item.ammeter === ele) this.flag = true
          })
          return this.flag
        })
      }
      if (sorter.field !== undefined) {
        if (sorter.order === 'ascend') {
          this.data.sort(this.compareByAscend(sorter.field))
        } else {
          this.data.sort(this.compareByDescend(sorter.field))
        }
      }
    },
    compareByAscend (arg) {
      return function name (a, b) {
        return Date.parse(a[arg]) - Date.parse(b[arg])
      }
    },
    compareByDescend (arg) {
      return function name (a, b) {
        return Date.parse(b[arg]) - Date.parse(a[arg])
      }
    }
  },
  mounted () {
    this.getPayRecordApi().then(res => {
      res.data.payRecord.forEach(ele => {
        ele.key = this.data.length
        ele.time = ele.time.replace(/T/, ' ').slice(0, ele.time.indexOf('.'))
        ele.ammeter = ele.area + ele.buildId + '-' + ele.roomId
        this.data.unshift(ele)
        this.filter.unshift(ele.ammeter)
      })
      this.cacheData = [...this.data]
      this.filter = Array.from(new Set(this.filter))
      const arr = [...this.filter]
      arr.forEach(item => {
        this.filter.shift()
        this.filter.push({ text: item, value: item })
      })
      this.columns[1].filters = this.filter
    })
      .catch(err => { console.log('err', err) })
  }
}
</script>

<style lang="less" scoped>
#components-form-eleCheck {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>

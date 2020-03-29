<template>
  <div id="components-form-dorm">
    <a-table
      slot="expandedRowRender"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      bordered
    >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`搜索 ${column.title}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          style="width: 188px; margin-bottom: 8px; display: block;"
        />
        <a-button
          type="primary"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
        >搜索</a-button
        >
        <a-button
          @click="() => handleReset(clearFilters)"
          size="small"
          style="width: 90px"
        >重置</a-button
        >
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="operation" slot-scope="text,record">
        <a-button style="marginRight:5px" @click="()=>cancel(record.userId)" >注销</a-button>
        <a-button @click="()=>reset(record.userId)" >重置密码</a-button>
      </template></a-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from '@/store'
export default {
  data () {
    return {
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: '宿舍号',
          dataIndex: 'roomId'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => this.handleFilter(visible)
        },
        {
          title: '学号',
          dataIndex: 'userId',
          key: 'userId',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.userId.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => this.handleFilter(visible)
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
      ],
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
    ...mapActions(['getDormsApi', 'getDormByIdApi', 'getUsersByDormApi', 'logoffStudentApi', 'resetPwApi']),
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
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
    },
    reset (userId) {
      this.resetPwApi({ userId: userId }).then(res => {
        this.$message.success('重置成功', 1)
        console.log(res)
      })
        .catch(err => {
          this.$message.error('重置失败', 1)
          console.log(err)
        })
    },
    handleFilter (visible) {
      var that = this
      if (visible) {
        setTimeout(() => {
          that.searchInput.focus()
        }, 0)
      }
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
.highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
</style>

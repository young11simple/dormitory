<template>
  <div id="components-form-dorm">
    <a-table
      :pagination="pagination"
      :columns="columns"
      :dataSource="data"
      rowKey="roomID"
      bordered
    >
      <a-table
        slot="expandedRowRender"
        :columns="innerColumns"
        :dataSource="innerData"
        :pagination="false"
      ></a-table>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '宿舍号',
    dataIndex: 'roomID',
    width: '25%'
  },
  {
    title: '几人间',
    dataIndex: 'count',
    width: '25%'
  },
  {
    title: '是否有空铺位',
    dataIndex: 'hasEmpty',
    width: '25%'
  },
  {
    title: '空铺数',
    dataIndex: 'countEmpty',
    width: '15%'
  }
]
const innerColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '学号',
    dataIndex: 'account',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '10%'
  },
  {
    title: '联系方式',
    dataIndex: 'contact',
    width: '10%'
  },
  {
    title: '院系',
    dataIndex: 'college',
    width: '10%'
  },
  {
    title: '专业班级',
    dataIndex: 'majorClass',
    width: '10%'
  },
  {
    title: '级别',
    dataIndex: 'level',
    width: '10%'
  }
]
const data = []
const innerData = []
for (let i = 0; i < 10; i++) {
  data.push({
    roomID: i.toString(),
    count: '4',
    hasEmpty: '是',
    countEmpty: '2'
  })
}
for (let i = 0; i < 2; i++) {
  innerData.push({
    name: `Edrward ${i}`,
    account: `20162505020${i}`,
    gender: '女',
    contact: `1580203356${i}`,
    college: '4',
    majorClass: '网工2班',
    level: '2016级'
  })
}
export default {
  data () {
    return {
      columns,
      innerColumns,
      data,
      innerData,
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true
      },
      rooms: []
    }
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

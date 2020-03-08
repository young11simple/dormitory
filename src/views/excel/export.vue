<template>
  <div>
    <a-button type="primary" @click="export2Excel"></a-button>
  </div>
</template>
<script>
export default {
  name: 'exportData',
  props:['excelData'],
  data () {
    return {}
  },
  methods: {
    export2Excel () {
      let table = document.getElementById('table');
      let worksheet = XLSX.utils.table_to_sheet(table);
      let workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet');
      // 以上四行也可以直接一行搞定，如果不需要对表格数据进行修改的话
      let workbook = XLSX.utils.table_to_book(document.getElementById('table'))
	  XLSX.writeFile(workbook, 'text.xlsx');
    }
  }
}
</script>

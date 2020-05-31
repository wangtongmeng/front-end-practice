<template>
  <div id="app">
    <MyTable :data="tableData" :column="column" :actions="actions"></MyTable>
  </div>
</template>
<script>
import MyTable from '@/components/MyTable'
export default {
  components: {
    MyTable
  },
  data() {
    return {
      // search: [
      //   {  }
      // ],
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
        { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' }
      ],
      column: [
        { prop: 'date', label: '日期', width: '180' },
        { prop: 'name', label: '姓名', width: '180' },
        { prop: 'address', label: '地址', align: 'center', renderText: this.formatAdress},
      ],
      actions: [
        { text: '编辑', click: this.edit },
        { text: '删除', click: this.delete },
      ]
    }
  },
  methods: {
    formatAdress() {
      return 'format adress'
    },
    delete(index, row){
      console.log('delete', index, row)
    },
    edit(index, row){
      console.log('edit', index, row)
    }
  },
}
</script>
<style>
</style>

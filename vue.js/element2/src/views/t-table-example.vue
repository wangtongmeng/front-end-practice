<template>
  <div class="wrapper">
    <t-table
      border
      stripe
      size="mini"
      :tableItems="tableItems"
      :tableData="tableData"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </t-table>
  </div>
</template>

<script>
import tTable from '@/components/t-table.vue'
export default {
  components: {
    't-table': tTable
  },
  props: {},
  data() {
    return {
      tableItems: [
        // {prop: 'selection', type: 'selection', label: '', width: 50},
        {prop: 'index', type: 'index', label: '排序', width: 50},
        {prop: 'username',  label: '用户名'},
        {prop: 'password', label: '密码'},
        {prop: 'age', label: '年龄', formatter: (row, column, cellValue, index) => {
          return cellValue + '岁'
        } },
        // jsx写法
        {prop: 'hobby', label: '爱好', formatter: (row, column, cellValue, index) => {
          return (<el-tag size="medium">{row.hobby }</el-tag>)
        } },
        {prop: 'img', label: '图片', formatter: (row, column, cellValue, index) => {
          return (<img width="50" height="50" src={cellValue} />)
        } },
        {
          type: 'action',
          label: '操作',
          width: 150,
          actions: [
            { type: 'primary', label: '编辑', plain: true, icon: 'el-icon-edit', fn: this.edit },
            { type: 'primary', label: '详情', plain: true, icon: 'el-icon-edit', fn: this.detail }
          ]
        },
      ],
      tableData: [
        {username: '张三', password: 123, age: 18, hobby: '吃', img: require('../assets/liukanshan.jpg')},
        {username: '李四', password: 456, age: 19, hobby: '玩', img: require('../assets/logo.png')},
      ],
      currentPage: 1,
      pageSize: 10,
      total: 200
    };
  },
  watch: {},
  computed: {},
  methods: {
    edit (row, index) {
      console.log('edit', row, index)
    },
    detail (row, index) {
      console.log('edit', row, index)
    },
    handleSizeChange (size) {
      console.log(size)
    },
    handleCurrentChange (page) {
      console.log(page)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper{}
</style>
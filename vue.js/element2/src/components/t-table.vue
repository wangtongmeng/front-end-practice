<template>
  <div class="wrapper">
    <el-table :data="tableData" v-bind="$attrs" style="width: 100%">
      <el-table-column
        v-for="item in cols"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
        :type="item.type"
      >
      </el-table-column>
      <el-table-column
        v-if="action"
        :label="action.label"
        :width="action.width">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in action.actions"
            :key="index"
            @click="btn.fn(scope.$index, scope.row)"
            :type="btn.type" size="mini">
              {{btn.label}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableItems: {
      type: Array,
      default: () => []
    },
    // pagination
    pagination: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    cols () {
      let types = ['action']
      return this.tableItems.filter(item => !types.includes(item.type))
    },
    action () {
      return this.tableItems.find(item => item.type === 'action')
    },
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange (page) {
      this.$emit('current-change', page)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.wrapper {
  .pagination {
    text-align: right;
    margin-right: 20px;
    margin-top: 5px;
  }
}
</style>
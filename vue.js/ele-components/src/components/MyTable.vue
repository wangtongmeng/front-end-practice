<template>
  <div>
    <MyForm></MyForm>
    <el-table :data="data" style="width: 100%">
      <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align" :formatter="item.renderText">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-for="(item, index) in actions" :key="index" size="mini" @click="item.click(scope.$index, scope.row)">{{item.text}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MyForm from './MyForm'
export default {
  components: {
    MyForm
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    column: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
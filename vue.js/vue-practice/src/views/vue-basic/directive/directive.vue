<template>
  <div class="wrapper">
    <el-tabs :tab-position="tabPosition" v-model="activeName">
      <el-tab-pane v-for="item in compData" :label="item.label" :key="item.label" :name="item.label" lazy>
        <component :is="item.compName"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DemoBasic from './components/Basic'
import DynamicDirectiveArguments from './components/DynamicDirectiveArguments'
export default {
  components: {
    DemoBasic,
    DynamicDirectiveArguments
  },
  props: {},
  data() {
    return {
      activeName: '基础使用',
      compData: [
        { label: '基础使用', compName: 'DemoBasic' },
        { label: '动态指令参数', compName: 'DynamicDirectiveArguments' },
      ],
      tabPosition: "left"
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
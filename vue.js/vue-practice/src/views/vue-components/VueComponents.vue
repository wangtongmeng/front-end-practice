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
import SplitPane from './components/SplitPane'
export default {
  components: {
    SplitPane
  },
  props: {},
  data() {
    return {
      activeName: '分割面板',
      compData: [
        { label: '分割面板', compName: 'SplitPane' },
      ],
      tabPosition: "left"
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
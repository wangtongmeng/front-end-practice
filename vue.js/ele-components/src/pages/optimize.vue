<template>
  <div>
    <div>性能优化</div>
    <el-select v-model="value" placeholder="请选择">
      <RecycleScroller
        class="scroller"
        :items="list"
        :item-size="32"
        key-field="id"
        v-slot="{ item }"
      >
        <el-option :label="item.name" :value="item.id"></el-option>
      </RecycleScroller>
    </el-select>
  </div>
</template>

<script>
export default {
  created() {
    let id = 0;
    for (let i = 0; i < 10000; i++) {
      this.list.push({
        id: id++,
        name: `person${id}`
      });
    }
  },
  data() {
    return {
      value: '',
      list: []
    };
  }
};
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>
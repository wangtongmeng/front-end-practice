<template>
  <div style="margin: 10px;">
    <el-form>
      <el-form-item
        v-for="(item, index) in formData"
        :key="index"
        :label="item.label"
        :prop="item.attr"
      >
        <el-input v-if="item.type === 'input'" :value="item.value"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      realData: {
        A1: "1T",
        A2: "2O",
      },
    };
  },
  mounted() {
    this.genComputed();
  },
  computed: {
    test () {
      return this.realData.A1 + 'xxx'
    }
  },
  methods: {
    genComputed() {
      console.log('this', this)
      this.computed.X = () => {
        var str = "${A1}+${A2}";
        // 公式变量=>公式实际值
        var replaceStr = str.replace(/\$\{(.+?)\}/g, (val) => {
          let attr = /\$\{(.+?)\}/g.exec(val)[1];
          return this.realData[attr];
        });
        return replaceStr;
      };
    },
  },
};
</script>

<style>
</style>
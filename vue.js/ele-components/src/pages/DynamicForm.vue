<template>
  <div style="margin: 10px;">
    target: {{target}}
    formData: {{formData}}
    <el-form>
      <el-form-item v-for="(item, index) in formData" :key="index" :label="item.label" :prop="item.attr">
        <el-input v-if="item.type === 'input'" v-model="item.value"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: [],
      // 公式生成的值
      target: {},
    };
  },
  mounted() {
    this.getFormItem();
  },
  methods: {
    apiFormItem() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { type: "input", label: "标题1", attr: "A1", value: "" },
            { type: "input", label: "标题2", attr: "A2", value: "" },
          ]);
        }, 1000);
      });
    },
    async getFormItem() {
      this.formData = await this.apiFormItem();
      this.genComputedValue();
    },
    genComputedValue() {
      var str = "${A1}+${A2}";
      // 公式变量=>公式实际值
      var replaceStr = str.replace(/\$\{(.+?)\}/g, (val) => {
        let attr = /\$\{(.+?)\}/g.exec(val)[1];
        let formItem = this.formData.find(item => item.attr === attr)
        return formItem.value
      });
      // 动态更新X的值
      this.$set(this.target, "X", replaceStr);
    },
  },
  watch: {
    formData: {
      handler: function (val) {
        this.genComputedValue();
      },
      deep: true,
    },
  },
};
</script>
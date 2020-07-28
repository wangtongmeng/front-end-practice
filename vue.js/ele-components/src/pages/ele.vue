<template>
  <div>
    <section>
      <h2>dialog</h2>
      <my-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </my-dialog>
      <button @click="dialogVisible = true">打开dialog</button>
    </section>
    <section>
      <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction">
        <DynamicForm :formData="formData"></DynamicForm>
      </el-drawer>
      <el-button @click="openDrawer">打开划窗</el-button>
      X{{X}}
    </section>
  </div>
</template>

<script>
import MyDialog from "../components/MyDialog";
import DynamicForm from "./DynamicForm";
export default {
  components: {
    MyDialog,
    DynamicForm,
  },
  data() {
    return {
      // dialog
      dialogVisible: false,
      drawer: false,
      direction: "rtl",
      formData: [],
      realData: {
        A1: "1T",
        A2: "2O",
      },
      computed: {},
    };
  },
  mounted() {},
  methods: {
    async openDrawer() {
      this.formData = await this.request();
      this.$options.computed.X = () => {
        var str = "${A1}+${A2}";
        // 公式变量=>公式实际值
        var replaceStr = str.replace(/\$\{(.+?)\}/g, val => {
          let attr = /\$\{(.+?)\}/g.exec(val)[1];
          return this.realData[attr];
        });
        return replaceStr
      }
      this.drawer = true;
    },
    request() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { type: "input", label: "标题1", attr: "A1", value: "" },
            { type: "input", label: "标题2", attr: "A2", value: "" },
          ]);
        }, 100);
      });
    },
  },
};
</script>

<style>
</style>
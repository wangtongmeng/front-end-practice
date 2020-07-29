<template>
  <div>
    <section>
      <h2>dialog</h2>
      <m-dialog title="二次封装dialog" :visible.sync="dialogVisible" center>
        <span>这是一段信息</span>
        <template v-slot:footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </template>
      </m-dialog>
      <button @click="dialogVisible = true">打开dialog</button>
    </section>
    <!-- <section>
      <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction">
        <DynamicForm :formData="formData"></DynamicForm>
      </el-drawer>
      <el-button @click="openDrawer">打开划窗</el-button>
    </section>-->
  </div>
</template>

<script>
import DynamicForm from "./DynamicForm";
export default {
  components: {
    DynamicForm,
  },
  data() {
    return {
      // dialog
      dialogVisible: false,
      drawer: false,
      direction: "rtl",
      formData: [],
      computed: {},
    };
  },
  mounted() {},
  methods: {
    async openDrawer() {
      this.formData = await this.request();
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
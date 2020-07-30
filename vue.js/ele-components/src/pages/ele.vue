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
    <section>
      <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction">
        <DynamicForm></DynamicForm>
      </el-drawer>
      <el-button @click="drawer = true">打开划窗</el-button>
    </section>
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
};
</script>

<style>
</style>
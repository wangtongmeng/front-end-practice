<template>
  <div id="app">
    <MyHeaderBar>
      <template v-slot:searchForm>
        <MyForm
          :size="searchForm.size"
          :inline="searchForm.inline"
          :form="searchForm.form"
          :items="searchForm.items"
          :buttons="searchForm.buttons"
        ></MyForm>
      </template>
      <template v-slot:buttons>
        <el-button size="small" type="primary">新增</el-button>
      </template>
    </MyHeaderBar>
    <MyTable :data="tableData" :column="column" :actions="actions"></MyTable>
  </div>
</template>
<script>
import MyTable from "@/components/MyTable";
import MyHeaderBar from "@/components/MyHeaderBar";
import MyForm from "@/components/MyForm";
export default {
  components: {
    MyTable,
    MyHeaderBar,
    MyForm
  },
  data() {
    return {
      // search: [
      //   {  }
      // ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      column: [
        { prop: "date", label: "日期", width: "180" },
        { prop: "name", label: "姓名", width: "180" },
        {
          prop: "address",
          label: "地址",
          align: "center",
          renderText: this.formatAdress
        }
      ],
      actions: [
        { text: "编辑", click: this.edit },
        { text: "删除", click: this.delete }
      ],
      searchForm: {
        size: "small",
        inline: true,
        form: {
          name1: "x",
          name2: "y",
          name3: "y",
          name4: "y",
          name5: "y",
          name6: "y"
          // name3: 'z'
        },
        items: {
          name1: { type: "input", label: "" },
          name2: {
            type: "select",
            label: "",
            options: [
              { label: "label1", value: "yyy" },
              { label: "label2", value: "value2" },
              { label: "label3", value: "value3" }
            ]
          },
          // name3: { type: 'textarea', label: '' }
          name3: { type: "input", label: "" },
          name4: { type: "input", label: "" },
          name5: { type: "input", label: "" },
          name6: { type: "input", label: "" }
        },
        buttons: [
          {
            buttonType: "primary",
            icon: "el-icon-search",
            text: "查询",
            click: this.search
          },
          {
            buttonType: "primary",
            icon: "",
            text: "新增",
          }
        ],
        rules: []
      }
    };
  },
  methods: {
    search(form){
      console.log('search', form)
    },
    formatAdress() {
      return "format adress";
    },
    delete(index, row) {
      console.log("delete", index, row);
    },
    edit(index, row) {
      console.log("edit", index, row);
    }
  }
};
</script>
<style>
</style>

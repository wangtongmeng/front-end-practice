<template>
  <MyForm
    :style="searchForm.style"
    :size="searchForm.size"
    :labelWidth="searchForm.labelWidth"
    :inline="searchForm.inline"
    :form="searchForm.form"
    :items="searchForm.items"
    :buttons="searchForm.buttons"
  ></MyForm>
</template>

<script>
import MyForm from "@/components/MyForm";

export default {
  components: {
    MyForm
  },
  data() {
    return {
      searchForm: {
        style: 'width: 70%',
        size: "",
        labelWidth: "auto",
        inline: false,
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
          name1: { type: "input", label: "xx", col: 12 },
          name2: {
            type: "select",
            label: "xxxxxxxxxxxxx",
            col: 12,
            options: [
              { label: "label1", value: "yyy" },
              { label: "label2", value: "value2" },
              { label: "label3", value: "value3" }
            ]
          },
          // name3: { type: 'textarea', label: '' }
          name3: { type: "input", label: "xx", col: 12 },
          name4: { type: "input", label: "xx", col: 12 },
          name5: { type: "input", label: "xx", col: 12 },
          name6: { type: "input", label: "xx", col: 12 }
        },
        rules: []
      }
    };
  }
};
</script>

<style>
</style>
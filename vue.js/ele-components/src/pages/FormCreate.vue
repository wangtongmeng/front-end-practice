<template>
  <div>
    <form-create v-model="fApi" :rule="rule" :option="option"></form-create>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //实例对象
      fApi: {},
      //表单生成规则
      rule: [
        formCreate.maker.auto("自动完成", "auto1", "xaboy").props({
          data: ["xaboy", "xian", "github"],
          filterMethod: (value, option) => {
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
          }
        }),
        {
          type: "autoComplete",
          title: "自动完成",
          field: "auto2",
          value: "xaboy",
          props: {
            data: ["xaboy", "xian", "github"],
            filterMethod: (value, option) => {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            }
          }
        }
      ],
      //组件参数配置
      option: {
        //表单提交事件
        onSubmit: function(formData) {
          alert(JSON.stringify(formData));
        }
      }
    };
  }
};
</script>

<style>
</style>
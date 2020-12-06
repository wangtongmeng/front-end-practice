# 基于 element 的二次封装

## 封装 table

实现 table 的增删改查

```vue
<template>
  <tm-table :data="tableData" :column="column"></tm-table>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "张三",
          age: "11",
          sex: "男",
        },
        {
          name: "李四",
          age: "12",
          sex: "男",
        },
        {
          name: "王五",
          age: "13",
          sex: "女",
        },
      ],
    };
  },
};
</script>
```

<template>
  <div>
    <ul>
      <Item class="item" :model="treeData"></Item>
    </ul>
  </div>
</template>

<script>
  import Item from './Item'
  export default {
    components: {
      Item,
    },
    data() {
      return {
        treeData: {
          title: 'tree结构',
          children: [
            { title: '标题1.1' },
            {
              title: '标题1.2',
              children: [
                { title: '标题1.2.1' },
                { title: '标题1.2.2' }
              ]
            },
            { title: '标题1.3' },
            { title: '标题1.4' },
          ],
        },
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
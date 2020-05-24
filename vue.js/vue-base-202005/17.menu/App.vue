<template>
  <div>
    <my-menu :data="data"></my-menu>
  </div>
</template>

<script>
import myMenu from './my-menu'
export default {
  components: {
    'my-menu': myMenu
  },
  data() {
    return {
      data: [
        { title: '根 1', id: 1 },
        {
          title: '根 2',
          id: 2,
          children: [
            {
              title: '根 2-1',
              id: 21,
              children: [
                { title: '根2-1-1', id: 211 },
                { title: '根2-1-2', id: 212 }
              ]
            }
          ]
        },
        { title: '根 3', id: 3 },
        {
          title: '根 4',
          id: 4,
          children: [
            { title: '根 4-1', id: 41 },
            { title: '根 4-2', id: 42 }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
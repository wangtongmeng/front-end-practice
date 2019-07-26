<template>
  <div>
    <li>
      <div @click="toggle">
        {{model.title}}
        <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
      </div>
    </li>
    <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="model in model.children" :model="model" :key="model.title"></item>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'Item',
    props: {
      model: {
        type: Object,
        default: true
      },
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      isFolder() {
        return this.model.children && this.model.children.length
      }
    },
    methods: {
      toggle() {
        if (this.isFolder) {
          this.open = !this.open
        }
      }
    },
    
  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div style="border: 1px solid red;padding:5px;">
    son2 {{parent.mny}}
    <GrandSon @drink="drink"></GrandSon>
  </div>
</template>
<script>
import GrandSon from './grandson'
export default {
  name: 'son2',
  inject: ['parent'],
  components: {
    GrandSon
  },
  methods: {
    drink () {
      console.log('喝水')
    }
  }
}
</script>
<template>
  <div style="border: 1px solid red;padding:5px;">
    son2 {{parent.mny}}
    <GrandSon></GrandSon>
  </div>
</template>
<script>
import GrandSon from './grandson'
export default {
  inject: ['parent'],
  components: {
    GrandSon
  }
}
</script>
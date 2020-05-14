<template>
  <div style="border: 1px solid red;padding:5px;">
    grandson
    {{parent.mny}}
  </div>
</template>
<script>
export default {
  inject: ['parent']
}
</script>
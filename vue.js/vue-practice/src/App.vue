<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>
<script>
import layout from "@c/layout/Layout";
import unescape from "unescape";

export default {
  components: {
    layout
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333;
}
</style>

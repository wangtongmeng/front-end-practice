<template>
  <div class="wrapper">
    <div id="dynamicexample">
      <h3>Scroll down inside this section ↓</h3>
      <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
      <p v-pin="200">I am pinned onto the page at 200px to the top.</p>
      <div style="width: 100px; height: 1000px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      direction: "left"
    };
  },
  directives: {
    pin: {
      bind: function(el, binding, vnode) {
        el.style.position = "fixed";
        var s = binding.arg == "left" ? "left" : "top";
        el.style[s] = binding.value + "px";
      }
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
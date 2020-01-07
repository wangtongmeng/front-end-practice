<template>
  <div class="wrapper">
    <div id="chartmainbar" style="width:600px; height:400px;"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      optionbar: {
        title: {
          text: "ECharts 数据统计"
        },
        tooltip: {},
        legend: {
          data: ["用户来源"]
        },
        xAxis: {
          data: ["Android", "IOS", "PC", "Ohter"]
        },
        yAxis: {},
        series: [
          {
            name: "访问量",
            type: "bar", //设置图表主题
            data: [500, 200, 360, 100]
          }
        ]
      }
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      let chartmainbar = this.$echarts.init(
        document.getElementById("chartmainbar")
      );
      chartmainbar.setOption(this.optionbar);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
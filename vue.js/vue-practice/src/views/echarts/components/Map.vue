<template>
  <div class="wrapper">
    <div id="map" style="height:700px;"></div>
  </div>
</template>
<script>
import "../china"; // 引入中国地图数据
function randomValue() {
  return Math.round(Math.random() * 1000);
}
const data = [
  { name: "南海诸岛", value: 0 },
  { name: "大连", value: 10 },
  { name: "北京", value: randomValue() },
  { name: "天津", value: randomValue() },
  { name: "上海", value: randomValue() },
  { name: "重庆", value: randomValue() },
  { name: "河北", value: randomValue() },
  { name: "河南", value: randomValue() },
  { name: "云南", value: randomValue() },
  { name: "辽宁", value: randomValue() },
  { name: "黑龙江", value: randomValue() },
  { name: "湖南", value: randomValue() },
  { name: "安徽", value: randomValue() },
  { name: "山东", value: randomValue() },
  { name: "新疆", value: randomValue() },
  { name: "江苏", value: randomValue() },
  { name: "浙江", value: randomValue() },
  { name: "江西", value: randomValue() },
  { name: "湖北", value: randomValue() },
  { name: "广西", value: randomValue() },
  { name: "甘肃", value: randomValue() },
  { name: "山西", value: randomValue() },
  { name: "内蒙古", value: randomValue() },
  { name: "陕西", value: randomValue() },
  { name: "吉林", value: randomValue() },
  { name: "福建", value: randomValue() },
  { name: "贵州", value: randomValue() },
  { name: "广东", value: randomValue() },
  { name: "青海", value: randomValue() },
  { name: "西藏", value: randomValue() },
  { name: "四川", value: randomValue() },
  { name: "宁夏", value: randomValue() },
  { name: "海南", value: randomValue() },
  { name: "台湾", value: randomValue() },
  { name: "香港", value: randomValue() },
  { name: "澳门", value: randomValue() }
];
const titledata = data.map(item => item.name);
export default {
  components: {},
  props: {},
  data() {
    return {
      // 配置

      mapOption: {
        title: {
          text: "全国银行问题数汇总",
          left: "center"
        },
        backgroundColor: "#ccc",
        legend: {
          orient: "vertical",
          left: "left",
          data: ["全部"],
          selectedMode: "single"
        },
        grid: {
          // z: 2,
          right: 40,
          top: 100,
          bottom: 40,
          width: "30%"
        },
        xAxis: [
          {
            position: "top",
            type: "value",
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: titledata,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        // 鼠标移到图里面的浮动提示框
        tooltip: {
          formatter: function(params, ticket, callback) {
            return (
              params.seriesName + "<br />" + params.name + "：" + params.value
            );
          }
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          colorLightness: [0.2, 100],
          color: ["#c05050", "#e5cf0d", "#5ab1ef"],
          show: true
        },
        geo: {
          map: "china", // 表示中国地图
          roam: false,
          zoom: 1.23,
          label: {
            normal: {
              show: true, // 是否显示地名
              fontSize: "10",
              color: "rgba(0,0,0,0.7)"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "#F3B329",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            name: "全部",
            type: "bar",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                color: "rgb(254,153,78)"
              }
            },
            data
          },
          {
            name: "全部",
            type: "map",
            right: "35%",
            top: 100,
            bottom: "35%",
            geoIndex: 0,
            data
          },
          {
            name: "全部",
            type: "pie",
            radius: ["17%", "25%"],
            center: ["30%", "82.5%"],
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                color: "rgb(254,153,78)"
              }
            },
            data
          }
        ]
      }
    };
  },
  mounted() {
    this.draw("map");
  },
  methods: {
    draw(id) {
      let map = this.$echarts.init(document.getElementById(id));
      map.setOption(this.mapOption);
      // window.onresize = map.resize;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
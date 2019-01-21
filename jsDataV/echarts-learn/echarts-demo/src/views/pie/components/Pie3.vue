<template>
    <div class="demo">
        <h2>加阴影</h2>
        <div class="chart" id="pie3"></div>
    </div>
</template>
<script>
import Echarts from "echarts";
export default {
    name: "pie3",
    mounted() {
        this.echartsInit();
    },
    methods: {
        echartsInit() {
            // 加阴影
            var myChart2 = Echarts.init(document.getElementById("pie3"));
            myChart2.setOption({
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        roseType: "radius",
                        radius: "55%",
                        itemStyle: {
                            // 阴影的大小
                            shadowBlur: 200,
                            // 阴影水平方向上的偏移
                            shadowOffsetX: 0,
                            // 阴影垂直方向上的偏移
                            shadowOffsetY: 0,
                            // 阴影颜色
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        },
                        data: [
                            { value: 235, name: "视频广告" },
                            { value: 274, name: "联盟广告" },
                            { value: 310, name: "邮件营销" },
                            { value: 335, name: "直接访问" },
                            { value: 400, name: "搜索引擎" }
                        ]
                    }
                ]
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
    .demo 
        width 30%
        .chart
            width 100%
            height 400px
</style>




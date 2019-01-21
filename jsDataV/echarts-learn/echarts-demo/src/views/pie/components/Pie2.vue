<template>
    <div class="demo">
        <h2>南丁格尔图</h2>
        <div class="chart" id="pie2"></div>
    </div>
</template>
<script>
import Echarts from "echarts";
export default {
    name: "pie2",
    mounted() {
        this.echartsInit();
    },
    methods: {
        echartsInit() {
            // 南丁格尔图
            var myChart = Echarts.init(document.getElementById("pie2"));
            myChart.setOption({
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        roseType: "radius",
                        radius: "55%",
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




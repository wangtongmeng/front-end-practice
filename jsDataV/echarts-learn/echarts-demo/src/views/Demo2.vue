<template>
    <div class="demo1">
        <h1>demo2-饼状图</h1>
        <div class="demo">
            <div class="item">
                <h2>饼状图</h2>
                <div class="chart" id="main"></div>
            </div>
            <div class="item">
                <h2>南丁格尔图</h2>
                <div class="chart" id="main1"></div>
            </div>
            <div class="item">
                <h2>加阴影</h2>
                <div class="chart" id="main2"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Echarts from "echarts";
export default {
    name: "demo1",
    mounted() {
        this.echartsInit();
    },
    methods: {
        echartsInit() {
            // 饼状图
            var myChart = Echarts.init(document.getElementById("main"), 'dark');
            myChart.setOption({
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "55%",
                        // color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
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
            // 南丁格尔图
            var myChart1 = Echarts.init(document.getElementById("main1"));
            myChart1.setOption({
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
            // 加阴影
            var myChart2 = Echarts.init(document.getElementById("main2"));
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
    display flex
    flex-wrap wrap
    justify-content space-around
    .item 
        width 30%
        .chart
            width 100%
            height 400px
</style>



<template>
    <div class="demo">
        <h2>柱状图</h2>
        <div class="chart" id="pie1"></div>
    </div>
</template>
<script>
import Echarts from "echarts";
export default {
    name: "pie1",
    mounted() {
        this.echartsInit();
    },
    methods: {
        echartsInit() {
            // 饼状图
            var myChart = Echarts.init(document.getElementById("pie1"), 'dark');
            var option = {
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
            }
            myChart.setOption(option);
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




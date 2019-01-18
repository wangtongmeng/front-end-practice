<template>
    <div class="demo1">
        <h1>demo1-柱形图</h1>
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
import Echarts from "echarts";
export default {
    name: "demo1",
    mounted(){
        this.echartsInit()
    },
    methods: {
        echartsInit() {
            var myChart = Echarts.init(document.getElementById("main"));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "ECharts 入门示例"
                },
                tooltip: {},
                legend: {
                    data: ["销量"]
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
};
</script>
<style lang="stylus" scoped>
</style>



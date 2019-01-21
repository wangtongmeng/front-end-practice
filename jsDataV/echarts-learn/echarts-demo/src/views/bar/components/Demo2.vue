<template>
    <div class="demo">
        <h2>异步加载</h2>
        <div class="chart" id="demo2"></div>
    </div>
</template>
<script>
import Echarts from "echarts";
export default {
    name: "demo2",
    data() {
        return {
            myChart: {}
        };
    },
    mounted() {
        this.echartsInit();
        this.fetchData(data => {
            this.myChart.setOption({
                xAxis: {
                    data: data.categories
                },
                series: [
                    {
                        // 根据名字对应到相应的系列
                        name: "销量",
                        data: data.data
                    }
                ]
            });
        });
    },
    methods: {
        echartsInit() {
            // 异步加载
            var myChart = Echarts.init(document.getElementById("demo2"));
            var option = {
                title: {
                    text: "异步数据加载示例"
                },
                tooltip: {},
                legend: {
                    data: ["销量"]
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: []
                    }
                ]
            };
            myChart.setOption(option);
            this.myChart = myChart;
        },
        fetchData(cb) {
            // 通过 setTimeout 模拟异步加载
            setTimeout(function() {
                cb({
                    categories: [
                        "衬衫",
                        "羊毛衫",
                        "雪纺衫",
                        "裤子",
                        "高跟鞋",
                        "袜子"
                    ],
                    data: [5, 20, 36, 10, 10, 20]
                });
            }, 1000);
        }
    }
};
</script>
<style lang="stylus" scoped>
.demo {
    width: 30%;

    .chart {
        width: 100%;
        height: 400px;
    }
}
</style>




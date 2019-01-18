<template>
    <div class="demo1">
        <h1>demo1-柱形图</h1>
        <div class="demo">
            <div class="item">
                <h2>柱状图</h2>
                <div class="chart" id="main"></div>
            </div>
            <div class="item">
                <h2>异步加载</h2>
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
    data(){
        return {
            option1: {
                title: {
                    text: '异步数据加载示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: []
                }]
            },
            myChart1: {}
        }
    },
    mounted() {
        this.echartsInit();
        this.fetchData( (data)=> {
            this.myChart1.setOption({
                xAxis: {
                    data: data.categories
                },
                series: [{
                    // 根据名字对应到相应的系列
                    name: '销量',
                    data: data.data
                }]
            });
        })
    },
    methods: {
        echartsInit() {
            // 柱状图
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

            // 异步加载
            var myChart1 = Echarts.init(document.getElementById("main1"));
            this.myChart1 = myChart1
            var option1 = this.option1
            myChart1.setOption(option1);
        },
        fetchData(cb) {
            // 通过 setTimeout 模拟异步加载
            setTimeout(function () {
                cb({
                    categories: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
                    data: [5, 20, 36, 10, 10, 20]
                });
            }, 1000);
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



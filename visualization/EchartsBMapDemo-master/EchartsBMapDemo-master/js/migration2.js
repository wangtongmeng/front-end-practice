(function () {
    require.config({
        paths: {
            echarts: 'js/dist'
        },
        packages: [
            {
                name: 'BMap',
                location: 'js',
                main: 'main'
            }
        ]
    });

    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],
    function (echarts, BMapExtension) {

        // 初始化地图
        BMapExt = new BMapExtension($('#main')[0], BMap, require('echarts'), require('zrender'));
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            x: 121.483112,
            y: 31.228153
        };

        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        

        option = {
            title : {
                text: '模拟迁徙',
                subtext:'数据纯属虚构',
                x:'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: function (v) {
                    return v[1].replace(':', ' > ');
                }
            },
            legend: {
            	show : false,
                orient: 'vertical',
                x:'left',
                data:['北京', '上海', '广州'],
                selectedMode: 'single',
                selected:{
                    '上海' : false,
                    '广州' : false
                },
                textStyle : {
                    color: '#fff'
                }
            },
            toolbox: {
                show : false,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataRange: {
                min : 0,
                max : 100,
                range: {
                    start: 0,
                    end: 100
                },
                x: 'right',
                calculable : true,
                color: ['#ff3333', 'orange', 'yellow','lime','blue'],
                textStyle:{
                    color:'#fff'
                }
            },
            series : [
                {
                    name:'',
                    type:'map',
                    mapType: 'none',
                    data:[],
                    geoCoord: {
						"上海西站": [121.410385,31.268287],
						"虹桥机场": [121.352893,31.201099],
						"复旦大学": [121.510995,31.305813],
						"世纪公园": [121.559575,31.221112],
						"上海站": [121.462127,31.254705],
						"上海大学": [121.402336,31.320374],
						"上海南站": [121.437693,31.158093],
						"绍兴公园": [121.468739,31.213948],
						"龙华机场": [121.462415,31.176385],
						"上海浦东国际机场": [121.810813,31.15661]
					},

                    markLine : {
                        smooth:true,
                        effect : {
                            show: true,
                            scaleSize: 1,
                            period: 30,
                            color: '#fff',
                            shadowBlur: 10
                        },
                        itemStyle : {
                            normal: {
                            	label:{show:false},
                                borderWidth:2,
                                lineStyle: {
                                    type: 'solid',
                                    shadowBlur: 1
                                }
                            }
                        },
                        data : [
                            [{name:'上海西站'},{name:'上海浦东国际机场',value:95}],
                            [{name:'上海西站'},{name:'复旦大学',value:90}],
                            [{name:'上海西站'},{name:'绍兴公园',value:80}],
                            [{name:'上海南站'},{name:'上海大学',value:70}],
                            [{name:'上海南站'},{name:'上海浦东国际机场',value:60}],
                            [{name:'上海南站'},{name:'上海大学',value:50}],
                            [{name:'虹桥机场'},{name:'绍兴公园',value:40}],
                            [{name:'虹桥机场'},{name:'龙华机场',value:30}],
                            [{name:'虹桥机场'},{name:'绍兴公园',value:20}],
                            [{name:'上海站'},{name:'龙华机场',value:10}],
                            [{name:'上海站'},{name:'复旦大学',value:5}],
                            [{name:'上海站'},{name:'上海大学',value:15}]
                        ]
                    },
                    markPoint : {
                        symbol : 'circle',
                        symbolSize : 3,
                        effect : {
                            show: false,
                            shadowBlur : 0
                        },
                        itemStyle:{
                            normal:{
                                label:{show:false}
                            }
                        },
                        data : [
                            {name:'上海西站',value:95},
                            {name:'虹桥机场',value:90},
                            {name:'复旦大学',value:80},
                            {name:'世纪公园',value:70},
                            {name:'上海站',value:60},
                            {name:'上海大学',value:50},
                            {name:'上海南站',value:40},
                            {name:'绍兴公园',value:30},
                            {name:'龙华机场',value:20},
                            {name:'上海浦东国际机场',value:10}
                        ]
                    }

                }
            ]
        };
        var myChart = BMapExt.initECharts(container);
        window.onresize = myChart.onresize;
        BMapExt.setOption(option);
    }
);
})();
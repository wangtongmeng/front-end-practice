<template>
    <div class="demo">
        <h2>地图迁徙</h2>
        <div class="chart" id="map1" ref="myEchart"></div>
    </div>
</template>
<script>
  import echarts from "echarts";
  import 'echarts/map/js/china.js' // 引入中国地图数据
  export default {
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.initEchartMap();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initEchartMap() {
        //这里我们用固定的数据，真正使用时，用父组件传递来的数据替换series即可
        let myChart = echarts.init(this.$refs.myEchart);     
        window.onresize = myChart.resize;
        myChart.setOption({ 
          backgroundColor: "#0b1225",
          title: {
                text: '每日货盘运行图',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
          tooltip : {
                trigger: 'item'
            },
          dataRange: {
            show: false,
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },
          visualMap : {
                show : true,
                min : 0,
                max : 255,
                calculable : true,
                inRange : {
                    color : ['aqua', 'lime', 'yellow', 'orange', '#ff3333']
                },
                textStyle : {
                    color : '#12223b'
                }
            }, 
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            layoutCenter : ['50%', '50%'],
			layoutSize : "130%",
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              },
            },
            itemStyle: {
              normal: {
                areaColor: '#37376e',
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
              {
                    "type": "lines", 
                    "zlevel": 2, 
                    "effect": {
                        "show": true, 
                        "period": 4, 
                        "trailLength": 0.02, 
                        "symbol": "arrow", 
                        "symbolSize": 5
                    }, 
                    "lineStyle": {
                        "normal": {
                            "width": 1, 
                            "opacity": 0.6, 
                            "curveness": 0.2
                        }
                    }, 
                    "tooltip": {
                        "trigger": "item"
                    }, 
                    "data": [
                        {
                            "fromName": "南京", 
                            "toName": "江苏", 
                            "value": 19, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "119.68", 
                                    "33.199"
                                ]
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "安徽", 
                            "value": 17, 
                            "coords": [
                                
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "117.229", 
                                    "31.917"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "上海", 
                            "value": 25, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "121.465", 
                                    "31.289"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "湖北", 
                            "value": 31, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                 [
                                    "114.39", 
                                    "30.663"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "福建", 
                            "value": 12, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "119.454", 
                                    "25.922"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "浙江", 
                            "value": 19, 
                            "coords": [  
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "119.531", 
                                    "29.877"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "陕西", 
                            "value": 18, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "109.116", 
                                    "34.2"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "河南", 
                            "value": 15, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "113.467", 
                                    "34.623"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "山东", 
                            "value": 12, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "116.972", 
                                    "36.737"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "广东", 
                            "value": 12, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "113.511", 
                                    "23.22"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "四川", 
                            "value": 10, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "103.953", 
                                    "30.762"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "江西", 
                            "value": 9, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "116.005", 
                                    "28.663"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "重庆", 
                            "value": 8, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "106.438", 
                                    "29.581"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "贵州", 
                            "value": 4, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "106.71", 
                                    "26.564"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "山西", 
                            "value": 4, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "112.593", 
                                    "37.867"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "湖南", 
                            "value": 4, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "113.082", 
                                    "28.257"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "吉林", 
                            "value": 3, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                 [
                                    "125.815", 
                                    "44.258"
                                ], 
                            ]
                        }, 
                        {
                            "fromName": "南京", 
                            "toName": "广西", 
                            "value": 2, 
                            "coords": [
                                [
                                    118.796252, 
                                    32.0739
                                ],
                                [
                                    "107.88", 
                                    "22.863"
                                ], 
                            ]
                        }, 
                    ]
              },
              {     
                    "name": "收货地址",
                    "type": "effectScatter", 
                    "coordinateSystem": "geo", 
                    "zlevel": 2, 
                    "rippleEffect": {
                        "period": 4, 
                        "brushType": "stroke", 
                        "scale": 4
                    }, 
                    "tooltip": {
                        "trigger": "item"
                    }, 
                    "label": {
                        "normal": {
                            "show": true, 
                            "position": "left", 
                            "offset": [
                                -5, 
                                5
                            ], 
                            "formatter": "{b}"
                        }, 
                        "emphasis": {
                            "show": true
                        }
                    }, 
                    "hoverAnimation": true,
                    "symbol": "circle", 
                    "symbolSize": 5, 
                    "itemStyle": {
                        "normal": {
                            "show": false, 
                            "color": "#f00"
                        }
                    }, 
                    "data": [
                        {
                            "name": "江苏", 
                            "value": [
                                "119.68", 
                                "33.199", 
                                19
                            ]
                        }, 
                        {
                            "name": "安徽", 
                            "value": [
                                "117.229", 
                                "31.917", 
                                17
                            ]
                        }, 
                        {
                            "name": "上海", 
                            "value": [
                                "121.465", 
                                "31.289", 
                                25
                            ]
                        }, 
                        {
                            "name": "湖北", 
                            "value": [
                                "114.39", 
                                "30.663", 
                                31
                            ]
                        }, 
                        {
                            "name": "福建", 
                            "value": [
                                "119.454", 
                                "25.922", 
                                22
                            ]
                        }, 
                        {
                            "name": "浙江", 
                            "value": [
                                "119.531", 
                                "29.877", 
                                19
                            ]
                        }, 
                        {
                            "name": "陕西", 
                            "value": [
                                "109.116", 
                                "34.2", 
                                18
                            ]
                        }, 
                        {
                            "name": "河南", 
                            "value": [
                                "113.467", 
                                "34.623", 
                                15
                            ]
                        }, 
                        {
                            "name": "山东", 
                            "value": [
                                "116.972", 
                                "36.737", 
                                12
                            ]
                        }, 
                        {
                            "name": "广东", 
                            "value": [
                                "113.511", 
                                "23.22", 
                                12
                            ]
                        }, 
                        {
                            "name": "四川", 
                            "value": [
                                "103.953", 
                                "30.762", 
                                10
                            ]
                        }, 
                        {
                            "name": "江西", 
                            "value": [
                                "116.005", 
                                "28.663", 
                                9
                            ]
                        }, 
                        {
                            "name": "重庆", 
                            "value": [
                                "106.438", 
                                "29.581", 
                                8
                            ]
                        }, 
                        {
                            "name": "贵州", 
                            "value": [
                                "106.71", 
                                "26.564", 
                                4
                            ]
                        }, 
                        {
                            "name": "山西", 
                            "value": [
                                "112.593", 
                                "37.867", 
                                4
                            ]
                        }, 
                        {
                            "name": "湖南", 
                            "value": [
                                "113.082", 
                                "28.257", 
                                4
                            ]
                        }, 
                        {
                            "name": "吉林", 
                            "value": [
                                "125.815", 
                                "44.258", 
                                3
                            ]
                        }, 
                        {
                            "name": "广西", 
                            "value": [
                                "107.88", 
                                "22.863", 
                                2
                            ]
                        }, 
                    ]
              },
              {
                "name": "发送地址",
                "type": "scatter", 
                "coordinateSystem": "geo", 
                "zlevel": 2, 
                "tooltip": {
                    "trigger": "item"
                }, 
                "label": {
                    "normal": {
                        "show": true, 
                        "position": "right", 
                        "color": "#00ffff", 
                        "formatter": "{b}", 
                        "textStyle": {
                            "color": "#00ffff"
                        }
                    }, 
                    "emphasis": {
                        "show": true
                    }
                }, 
                "symbol": "circle", 
                "symbolSize": 20, 
                "itemStyle": {
                    "normal": {
                        "show": true, 
                        "color": "#EE0000"
                    }
                }, 
                "data": [
                    {
                        "name": "南京", 
                        "value": [
                            118.796252, 
                            32.0739
                        ]
                    }
                ]
            }
          ]
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
.demo {
    width: 49%;
    .chart {
        width: 100%;
        height: 600px;
    }
}
</style>



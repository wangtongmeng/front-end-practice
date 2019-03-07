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

		var effect = {
		    show: true,
		    scaleSize: require('zrender/tool/env').canvasSupported ? 1 : 2,
		    period: 60,             // 运动周期，无单位，值越大越慢
		    color: 'blue',
		    shadowColor: 'rgba(220,220,220,0.4)',
		    shadowBlur : 5 
		};
		option = {
		    title : {
		        text: '上海人口迁徙',
		        x:'center',
		        y:'top',
		        textStyle: {
		            color: 'black'
		        }
		    },
		    legend: {
		        show: false,
		        selected: {},
		        x: 'left',
		        orient: 'vertical',
		        selectedMode: 'single',
		        selected: {
		            '2:00-4:00' : false,
		            '4:00-6:00' : false
		        },
		        data: time
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
		    series : [{
		        name: "",
		        type: 'map',
		        mapType: 'none',
		
		        itemStyle: {
		            normal: {
		                borderColor:'rgba(100,149,237,0.2)',
		                borderWidth:0.5,
		                areaStyle: {
		                    color: '#1b1b1b'
		                }
		            }
		        },
		        data: [],
		        geoCoord : {
					"上海西站": [121.410385,31.268287],
					"虹桥机场": [121.352893,31.201099],
					"复旦大学": [121.510995,31.305813],
					"世纪公园": [121.559575,31.221112],
					"上海站": [121.462127,31.254705],
					"上海大学": [121.402336,31.320374],
					"上海南站": [121.437693,31.158093],
					"绍兴公园": [121.468739,31.213948],
					"龙华机场": [121.462415,31.176385],
					"上海浦东国际机场": [121.810813,31.15661],
					
				},
//		        hoverable: false,
//		        clickable: false,
//		        roam: true,
		        markLine: {
		            effect: effect,
		            bundling: {
		                enable: true
		            },
		            large: true,
		            smooth: true,
		            smoothness: 0.1,
		            symbol: ['none', 'none'],
		            itemStyle: {
		                normal: {
		                    lineStyle: {
		                        color: 'rgba(2, 166, 253, 0.05)',
		                        type: 'solid',
		                        width: 1,
		                        opacity: 0.8
		                    }
		                }
		            },
		            data: []
		        },
		        markPoint: {
		            symbol: 'circle',
		            symbolSize: 1.5,
		            itemStyle: {
		                normal: {
		                    color: 'rgba(255, 0, 0, 0.5)'
		                }   
		            },
		            data: []
		        }
		    }]
		};
		
		var geoCoord = {
					"上海西站": [121.410385,31.268287],
					"虹桥机场": [121.352893,31.201099],
					"复旦大学": [121.510995,31.305813],
					"世纪公园": [121.559575,31.221112],
					"上海站": [121.462127,31.254705],
					"上海大学": [121.402336,31.320374],
					"上海南站": [121.437693,31.158093],
					"绍兴公园": [121.468739,31.213948],
					"龙华机场": [121.462415,31.176385],
					"上海浦东国际机场": [121.810813,31.15661],
					
				};
		function getGeoCoord (name) {
		    var city = name;
		    var coord = geoCoord[city];
		    return city;
		}
		
			createAllLine();
			option.series[0].markLine.data = allLine.sort(function (a, b) {
	            return b.num - a.num
	        }).slice(0, 3000).map(function (line) {
	            return [{
	                name: getGeoCoord(line.start)   
	            }, {
	                name: getGeoCoord(line.end)
	            }]
	        });
	
	        option.series[0].markPoint.data = topCityOut.map(function (point) {
	            return {
	                name: getGeoCoord(point.name)
	            }
	        });
			
				var myChart = BMapExt.initECharts(container);
		        window.onresize = myChart.resize;
		        BMapExt.setOption(option); 
                 

        
        
    }
);
})();
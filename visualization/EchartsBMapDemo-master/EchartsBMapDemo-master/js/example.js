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
        var BMapExt = new BMapExtension($('#main')[0], BMap, require('echarts'), require('zrender'));
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();
        var startPoint = {
            x: 116.4551,
            y: 40.1539
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 11);
        map.enableScrollWheelZoom(true);

        option = {
        	
	            color: ['gold'],
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
	                orient: 'vertical',
	                x:'left',
	                data:['北京'],
	                selectedMode: 'single',
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

	            series : [
	                {
	                    name:'北京',
	                    type:'map',
	                    mapType: 'none',
	                    data:[],
	                    geoCoord: {
			                '海淀区': [116.30317,39.966113],
			                '西城区': [116.380784,39.932041],
	                    },
	
	                    markLine : {
	                        smooth:true,
	                        effect : {
	                            show: true,
	                            scaleSize: 0.5,
	                            period: 30,
	                            color: '#fff',
	                            shadowBlur: 10
	                        },
	                        itemStyle : {
	                            normal: {
	                                borderWidth:3,
	                                lineStyle: {
	                                    type: 'solid',
	                                    shadowBlur: 10,
	                                    color:'#1097DB'
	                                }
	                            }
	                        },
	                        data : [
	                            [{name:'海淀区'},{name:'西城区'}],
	                            
	                        ]
	                    },
	                    markPoint : {
	                        symbol:'emptyCircle',
	                        symbolSize : function (v){
	                            return 10 + v/10
	                        },
	                        effect : {
	                            show: true,
	                            shadowBlur : 0
	                        },
	                        itemStyle:{
	                            normal:{
	                                label:{show:false},
	                                color:'#1097DB'
	                            }
	                        },
	                        data : [
		                        {name:'海淀区'},
		                        {name:'西城区'}
	                        ]
	                    }
	                },
	    	]
	    };

        var myChart = BMapExt.initECharts(container);
        window.onresize = myChart.resize;
        BMapExt.setOption(option);
        
		function changeOption(){
		     BMapExt.setOption({series : [
	                {
	                    name:'北京',
	                    type:'map',
	                    mapType: 'none',
	                    data:[],
	                    geoCoord: {
			                '海淀区': [116.30317,39.966113],
			                '西城区': [116.380784,39.932041],
			                '东城区': [116.450784,39.932041],
	                    },
	
	                    markLine : {
	                        smooth:true,
	                        effect : {
	                            show: true,
	                            scaleSize: 0.5,
	                            period: 30,
	                            color: '#fff',
	                            shadowBlur: 10
	                        },
	                        itemStyle : {
	                            normal: {
	                                borderWidth:3,
	                                lineStyle: {
	                                    type: 'solid',
	                                    shadowBlur: 10,
	                                    color:'#1097DB'
	                                }
	                            }
	                        },
	                        data : [
	                            [{name:'海淀区'},{name:'西城区'}],
	                            [{name:'西城区'},{name:'东城区'}],
	                            
	                        ]
	                    },
	                    markPoint : {
	                        symbol:'emptyCircle',
	                        symbolSize : function (v){
	                            return 10 + v/10
	                        },
	                        effect : {
	                            show: true,
	                            shadowBlur : 0
	                        },
	                        itemStyle:{
	                            normal:{
	                                label:{show:false},
	                                color:'#1097DB'
	                            }
	                        },
	                        data : [
		                        {name:'海淀区'},
		                        {name:'西城区'},
		                        {name:'东城区'}
	                        ]
	                    }
	                },
	    	]});
		   
		}
		
		function changeOption2(){
		     BMapExt.setOption({series : [
	                {
	                    name:'北京',
	                    type:'map',
	                    mapType: 'none',
	                    data:[],
	                    geoCoord: {
			                '海淀区': [116.30317,39.966113],
			                '西城区': [116.380784,39.932041],
			                '东城区': [116.450784,39.932041],
			                '朝阳区': [116.500784,40.032041],
	                    },
	
	                    markLine : {
	                        smooth:true,
	                        effect : {
	                            show: true,
	                            scaleSize: 0.5,
	                            period: 30,
	                            color: '#fff',
	                            shadowBlur: 10
	                        },
	                        itemStyle : {
	                            normal: {
	                                borderWidth:3,
	                                lineStyle: {
	                                    type: 'solid',
	                                    shadowBlur: 10,
	                                    color:'#1097DB'
	                                }
	                            }
	                        },
	                        data : [
	                            [{name:'海淀区'},{name:'西城区'}],
	                            [{name:'西城区'},{name:'东城区'}],
	                            [{name:'东城区'},{name:'朝阳区'}]
	                            
	                        ]
	                    },
	                    markPoint : {
	                        symbol:'emptyCircle',
	                        symbolSize : function (v){
	                            return 10 + v/10
	                        },
	                        effect : {
	                            show: true,
	                            shadowBlur : 0
	                        },
	                        itemStyle:{
	                            normal:{
	                                label:{show:false},
	                                color:'#1097DB'
	                            },
	                            
	                            
	                        },
	                        data : [
		                        {name:'海淀区'},
		                        {name:'西城区'},
		                        {name:'东城区'},
		                        {name:'朝阳区'}
	                        ]
	                    }
	                },
	    	]});
		   
		}
        window.setTimeout(changeOption,2000);  
        window.setTimeout(changeOption2,4000);  
    }
);
})();
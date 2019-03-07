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
            x: 104.114129,
            y: 37.550339
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 5);
        map.enableScrollWheelZoom(true);
		var placeList = [
			    {name:'上海', geoCoord:[121.48, 31.22]},
			    {name:'厦门', geoCoord:[118.1, 24.46]},
			    {name:'太原', geoCoord:[112.53, 37.87]},
			    {name:'深圳', geoCoord:[114.07, 22.62]},
			    {name:'大连', geoCoord:[121.62, 38.92]},
			    {name:'沈阳', geoCoord:[123.38, 41.8]},
			    {name:'苏州', geoCoord:[120.62, 31.32]},
			    {name:'三亚', geoCoord:[109.511909, 18.252847]},
			    {name:'吉林', geoCoord:[126.57, 43.87]},
			    {name:'呼和浩特', geoCoord:[111.65, 40.82]},
			    {name:'成都', geoCoord:[104.06, 30.67]},
			    {name:'镇江', geoCoord:[119.44, 32.2]},
			    {name:'西安', geoCoord:[108.95, 34.27]},
			    {name:'常州', geoCoord:[119.95, 31.79]},
			    {name:'重庆', geoCoord:[106.54, 29.59]},
			    {name:'南京', geoCoord:[118.78, 32.04]},
			    {name:'无锡', geoCoord:[120.29, 31.59]},
			    {name:'北京', geoCoord:[116.46, 39.92]},
			    {name:'徐州', geoCoord:[117.2, 34.26]},
			    {name:'杭州', geoCoord:[120.19, 30.26]},
			    {name:'济南', geoCoord:[117, 36.65]},
			    {name:'天津', geoCoord:[117.2, 39.13]},
			    {name:'郑州', geoCoord:[113.65, 34.76]},
			    {name:'哈尔滨', geoCoord:[126.63, 45.75]},
			    {name:'石家庄', geoCoord:[114.48, 38.03]},
			    {name:'岳阳', geoCoord:[113.09, 29.37]},
			    {name:'长沙', geoCoord:[113, 28.21]},
			    {name:'合肥', geoCoord:[117.27, 31.86]},
			    {name:'武汉', geoCoord:[114.31, 30.52]},
			];
        
option = {
    
    color: ['blue','aqua','lime'],
    title : {
        text: '大规模MarkPoint特效',
        subtext: '纯属虚构',
        x:'center',
        textStyle : {
            color: '#fff'
        }
    },
    legend: {
        orient: 'vertical',
        x:'left',
        data:['强','中','弱'],
        textStyle : {
            color: '#fff'
        }
    },
    toolbox: {
        show : true,
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
            name: '弱',
            type: 'map',
            mapType: 'none',
//          itemStyle:{
//              normal:{
//                  borderColor:'rgba(100,149,237,1)',
//                  borderWidth:1.5,
//                  areaStyle:{
//                      color: '#1b1b1b'
//                  }
//              }
//          },
			geoCoord : {
			    '上海':[121.48, 31.22],
			    '厦门':[118.1, 24.46],
			    '太原':[112.53, 37.87],
			    '深圳':[114.07, 22.62],
			    '大连':[121.62, 38.92],
			    '沈阳':[123.38, 41.8],
			    '苏州':[120.62, 31.32],
			    '三亚':[109.511909, 18.252847],
			    '吉林':[126.57, 43.87],
			    '呼和浩特':[111.65, 40.82],
			    '成都':[104.06, 30.67],
			    '镇江':[119.44, 32.2],
			    '西安':[108.95, 34.27],
			    '常州':[119.95, 31.79],
			    '重庆':[106.54, 29.59],
			    '南京':[118.78, 32.04],
			    '无锡':[120.29, 31.59],
			    '北京':[116.46, 39.92],
			    '徐州':[117.2, 34.26],
			    '杭州':[120.19, 30.26],
			    '济南':[117, 36.65],
			    '天津':[117.2, 39.13],
			    '郑州':[113.65, 34.76],
			    '哈尔滨':[126.63, 45.75],
			    '石家庄':[114.48, 38.03],
			    '岳阳':[113.09, 29.37],
			    '长沙':[113, 28.21],
			    '合肥':[117.27, 31.86],
			    '武汉':[114.31, 30.52]
			},
            data : [],
            markPoint : {
                symbolSize: 4,
                large: true,
                effect : {
                    show: true
                },
                data : (function(){
                    var data = [];
                    var len = placeList.length;
                    while(len--) {
                        data.push({
                            name : placeList[len].name,
                            value : 10,
                            geoCoord : placeList[len].geoCoord
                        })
                    }
                    return data;
                })()
            }
        },
        {
            name: '中',
            type: 'map',
            mapType: 'none',
            data : [],
            markPoint : {
                symbolSize: 6,
                large: true,
                effect : {
                    show: true
                },
                data : (function(){
                    var data = [];
                    var len = placeList.length;
                    while(len--) {
                        data.push({
                            name : placeList[len].name,
                            value : 50,
                            geoCoord : placeList[len].geoCoord
                        })
                    }
                    return data;
                })()
            }
        },
        {
            name: '强',
            type: 'map',
            mapType: 'none',
//          hoverable: false,
//          roam:true,
            data : [],
            markPoint : {
                symbol : 'diamond',
                symbolSize: 8,
                large: true,
                effect : {
                    show: true
                },
                data : (function(){
                    var data = [];
                    var len = placeList.length;
                    while(len--) {
                        data.push({
                            name : placeList[len].name,
                            value : 90,
                            geoCoord : placeList[len].geoCoord
                        })
                    }
                    return data;
                })()
            }
        }
    ]
};
                    

        var myChart = BMapExt.initECharts(container);
        window.onresize = myChart.resize;
        BMapExt.setOption(option);
        
    }
);
})();
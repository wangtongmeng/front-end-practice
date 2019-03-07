var map = new BMap.Map("container");          // 创建地图实例

    var point = new BMap.Point(121.483112, 31.228153);
    map.centerAndZoom(point,13);             // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(); // 允许滚轮缩放
  
//  var points =[
//  {"lng":121.418261,"lat":31.221984,"count":50},
//  {"lng":121.423332,"lat":31.216532,"count":51},
//  {"lng":121.425867,"lat":31.218989,"count":8}];
    //随机生成点，points为二维数组
    var points = [];
    for (j = 0;j<48;j++) {
    	var point = [];
		for (i = 0; i < 100; i++) {
	    	point.push({
	    		lng : 121.36 + 0.24*Math.random(),
	    		lat : 31.16 + 0.15*Math.random(),
	    		count : Math.random()*100
	    	});
	    }
    	points.push(point);
    }

  
   
    if(!isSupportCanvas()){
    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
    }
    
	//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
	//参数说明如下:
	/* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *	{
			.2:'rgb(0, 255, 255)',
			.5:'rgb(0, 110, 255)',
			.8:'rgb(100, 0, 255)'
		}
		其中 key 表示插值的位置, 0~1. 
		    value 为颜色值. 
     */
	heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({data:points[0],max:100});
	//是否显示热力图
    function openHeatmap(){
        heatmapOverlay.show();
    }
	function closeHeatmap(){
        heatmapOverlay.hide();
    }
    function setGradient(){
     	/*格式如下所示:
		{
	  		0:'rgb(102, 255, 0)',
	 	 	.5:'rgb(255, 170, 0)',
		  	1:'rgb(255, 0, 0)'
		}*/
     	var gradient = {};
     	var colors = document.querySelectorAll("input[type='color']");
     	colors = [].slice.call(colors,0);
     	colors.forEach(function(ele){
			gradient[ele.getAttribute("data-key")] = ele.value; 
     	});
        heatmapOverlay.setOptions({"gradient":gradient});
    }
	//判断浏览区是否支持canvas
    function isSupportCanvas(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
    //默认显示热力图
    openHeatmap();
    
    //选择不同时间点后，改变数据，此方法在heatmap.js中绑定触发，itemIndex代表所选择item的索引值
	function changePoints(itemIndex){
		heatmapOverlay.setDataSet({data:points[itemIndex],max:100});
	}

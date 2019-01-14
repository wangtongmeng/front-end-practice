<template>
    <div class="map">
        <h2 class="title">地图demo</h2>
        <div  class="wrapper">
            <!-- 创建地图容器元素 -->
            <div id="container" class="container"></div>
        </div> 
    </div>
</template>
<script>
export default {
    name: 'BMapOne',
    mounted(){},
    methods: {
        makeMap(){
            // 创建地图实例
            var map = new BMap.Map("container"); 
            // 设置中心点坐标
            var point = new BMap.Point(116.404, 39.915); 
            // 地图初始化，同时设置地图展示级别
            map.centerAndZoom(point, 15);  
        }
    }
}
</script>
<style scoped>
.map {
    border: 1px solid red;
    text-align: center;
}
.map > .wrapper {
    border:1px solid red;
    width: 60%;
    margin: 0 auto;
    /* height: 500px; */
    height: 0;
    padding-bottom: 30%;
    position: relative;
}
.map > .wrapper > .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ddd;
}
</style>


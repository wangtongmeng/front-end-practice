<template>
    <div class="bar">
        <h1>地图</h1>
        <div class="content">
            <Map1></Map1>
            <Map1></Map1>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import Map1 from "./components/Map1"
export default {
    name: "map-demo",
    components: {
        Map1
    }
};
</script>
<style lang="stylus" scoped>
.content 
    display flex
    flex-wrap wrap
    justify-content space-around
</style>




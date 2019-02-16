<template>
    <div class="pie">
        <h1>饼状图</h1>
        <div class="content">
            <Pie1></Pie1>
            <Pie2></Pie2>
            <Pie3></Pie3>
        </div>
    </div>
</template>
<script>
import Echarts from "echarts";
import Pie1 from './components/Pie1'
import Pie2 from './components/Pie2'
import Pie3 from './components/Pie3'
export default {
    name: "pie",
    components: {
        Pie1,
        Pie2,
        Pie3
    }
};
</script>
<style lang="stylus" scoped>
.content 
    display flex
    flex-wrap wrap
    justify-content space-around
</style>




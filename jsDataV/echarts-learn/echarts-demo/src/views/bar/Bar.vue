<template>
    <div class="bar">
        <h1>柱状图</h1>
        <div class="content">
            <Demo1></Demo1>
            <Demo2></Demo2>
        </div>
    </div>
</template>
<script>
import Echarts from "echarts";
import Demo1 from './components/Demo1'
import Demo2 from './components/Demo2'
export default {
    name: "bar",
    components: {
        Demo1,
        Demo2
    }
};
</script>
<style lang="stylus" scoped>
.content 
    display flex
    flex-wrap wrap
    justify-content space-around
</style>




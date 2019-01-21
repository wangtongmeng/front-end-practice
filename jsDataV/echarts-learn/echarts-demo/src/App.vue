<template>
    <div id="app">
        <div id="nav">
            <ul class="list">
                <li class="item">
                    <router-link to="/bar">柱状图</router-link>
                </li>
                <li>
                    <router-link to="/pie">饼状图</router-link>
                </li>                
                <li>
                    <router-link to="/map">地图</router-link>
                </li>
            </ul>
        </div>
        <router-view/>
    </div>
</template>
<style lang="stylus">
#app 
    font-family 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing antialiased;
    -moz-osx-font-smoothing grayscale;
    color #2c3e50;
    #nav
        border-bottom 1px solid #ddd 
        .list
            display flex
            li
                min-width 70px
</style>

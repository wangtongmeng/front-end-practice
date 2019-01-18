<template>
    <div id="app">
        <div id="nav">
            <ul>
                <li>
                    <router-link to="/demo1">demo1-柱状图</router-link>
                </li>
                <li>
                    <router-link to="/demo2">demo2-饼状图</router-link>
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
</style>

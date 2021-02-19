<template>
  <div id="nav">
    <!-- router-link 是跳转路由的标签 -->
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <!-- router-view 负责展示当前路由对应的组件内容 -->
  <router-view/>
</template>

<style></style>

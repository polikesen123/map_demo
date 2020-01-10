<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
.clf::after {
  content: "";
  height: 0;
  font-size: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.clf {
  *zoom: 1;
}
.lf{
  float: left;
}
.rf{
  float: right;
}
</style>

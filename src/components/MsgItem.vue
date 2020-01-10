<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{mapData.title}}</span>
    </div>
    <ul class="contentBox clf">
      <li class="lf" v-for="data in mapData.lis" :key="data.label">
        <strong class="value">{{data.value}}</strong>
        <span>{{data.label}}</span>
      </li>
      <!-- <li class="lf">
        <strong class="value">36</strong>
        <span>客单均价(元/人)</span>
      </li>
      <li class="lf">
        <strong class="value">35</strong>
        <span>客户评分均值</span>
      </li>
      <li class="lf">
        <strong class="value">694</strong>
        <span>客户评论总数</span>
      </li> -->
    </ul>
  </el-card>
</template>
<script>
// @ is an alias to /src
export default {
  name: "Brand",
  props:["mapData"],
  data() {
    return {
      itemData: {
        title: "品牌",
        lis: [
          {
            value: 2,
            label: "店铺数量"
          },
          {
            value: 36,
            label: "客单均价(元/人)"
          },
          {
            value: 35,
            label: "客户评分均值"
          },
          {
            value: 694,
            label: "客户评论总数"
          }
        ]
      }
    };
  },
  components: {}
};
</script>
<style lang="less">
.box-card {
  margin-bottom: 10px;
}
.box-card:last-child {
  margin-bottom: 0;
}
.el-card {
  font-size: 12px;
  .el-card__header {
    padding: 15px;
    border-bottom: none;
  }
  .el-card__body {
    padding: 10px;
  }
  .contentBox {
    li {
      display: flex;
      flex-direction: column;
      width: 146px;
      text-align: center;
      line-height: 25px;
      margin-bottom: 10px;
      color: #ccc;
      .value {
        font-size: 22px;
        color: #409eff;
      }
    }
  }
}
</style>
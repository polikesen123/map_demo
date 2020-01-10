<template>
  <div class="msgBox">
    <m-brand v-for="item in itemData" :key="item.title" :mapData="item"></m-brand>
  </div>
</template>
<script>
// @ is an alias to /src
import Brand from "./MsgItem";
export default {
  name: "XXX",
  data() {
    return {
      itemData: [
        {
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
        },
        {
          title: "周边",
          lis: [
            {
              value: 6337,
              label: "居住人口(人)"
            },
            {
              value: 12599,
              label: "工作人口(人)"
            },
            {
              value: 76375,
              label: "二手房均价(元/平米)"
            },
            {
              value: 144.7,
              label: "住宅租金均价(元/平米)"
            }
          ]
        },
        {
          title: "POI",
          lis: [
            {
              value: 40,
              label: "小区数量"
            },
            {
              value: 93,
              label: "办公楼数量"
            },
            {
              value: 35,
              label: "客户评酒店数量分均值"
            },
            {
              value: 1,
              label: "公交站数量"
            },
            {
              value: 10,
              label: "超市数量"
            },
            {
              value: 24,
              label: "休闲娱乐数量"
            },
            {
              value: 2,
              label: "经典数量"
            }
          ]
        },
        {
          title: "城市",
          lis: [
            {
              value: 2154.2,
              label: "常住人口(万人)"
            },
            {
              value: 1359.2,
              label: "户籍人口(万人)"
            },
            {
              value: 140000,
              label: "人均GDP(元)"
            },
            {
              value: 62361,
              label: "人均可支配收入(元)"
            },
            {
              value: 389,
              label: "购物中心数量(店)"
            },
            {
              value: 1.8,
              label: "购物中心(店/10万人)"
            }
          ]
        }
      ]
    };
  },
  components: {
    "m-brand": Brand
  }
};
</script>
<style lang="less" scoped>
.msgBox {
  padding-bottom: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  height: 370px;
}
</style>
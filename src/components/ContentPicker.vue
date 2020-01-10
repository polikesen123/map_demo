<template>
  <div class="PickerBox">
    <el-card class="box-card">
      <div class="citySelBox">
        <span class="text">选择城市</span>
        <el-select v-model="value" placeholder="请选择" clearable>
          <el-option
            v-for="item in citys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="brandSelBox">
        <span class="text item">选择品牌</span>
        <el-select v-model="value1" placeholder="请选择" clearable>
          <el-option
            v-for="item in brands"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="rankComputed">
        <span class="text item">计算范围</span>
        <el-radio v-model="radio" label="1">缓冲区</el-radio>
        <el-radio v-model="radio" label="2">等时圈</el-radio>
      </div>
      <div class="changeTab">
        <div class="bufferDis" v-show="showDisTab">
          <span class="text item">缓冲距离</span>
          <el-input placeholder="请输入统计距离" v-model.number="distance">
            <template slot="append">米</template>
          </el-input>
        </div>
        <div class="isochronusCircle" v-show="showCirTab">
          <div class="tripMode">
            <div class="goOut">
              <span class="text item">出行方式</span>
              <el-radio-group v-model="radio2">
                <el-radio :label="3">步行</el-radio>
                <el-radio :label="6">骑车</el-radio>
                <el-radio :label="9">驾车</el-radio>
              </el-radio-group>
            </div>
            <div class="outTime">
              <span class="text item">出行时间</span>
              <el-input placeholder="请输入统计距离" v-model.number="time">
                <template slot="append">分钟</template>
              </el-input>
            </div>
          </div>
        </div>
        <!-- <div>{{urlData}}</div> -->
      </div>
    </el-card>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {
      citys: [
        {
          value: "beijing",
          label: "北京"
        }
      ],
      brands: [
        {
          value: "starbucks",
          label: "星巴克"
        },
        {
          value: "kfc",
          label: "肯德基"
        },
        {
          value: "pizza-hut",
          label: "必胜客"
        },
        {
          value: "mcdonalds",
          label: "麦当劳"
        }
      ],
      value: "北京",
      value1: "星巴克",
      radio: "1",
      distance: "1000",
      radio2: 1,
      time: 15
    };
  },
  computed: {
    urlData() {
      let dataName = {};
      dataName.city = this.value;
      dataName.brand = this.value1;
      dataName.distance = this.distance;
      return dataName;
    },
    showDisTab() {
      return Number(this.radio) === 1;
    },
    showCirTab() {
      return Number(this.radio) !== 1;
    }
  }
};
</script>
<style lang="less" scoped>
.PickerBox {
  margin-bottom: 10px;
  .el-select {
    display: inline-block;
    position: relative;
    width: 237px;
    height: 45px;
  }
  .el-input {
    font-size: 12px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .el-input-group {
    width: 237px;
  }
  .el-card__body {
    padding: 10px;
  }
}
.text {
  font-size: 12px;
  padding: 18px 0;
  margin-right: 5px;
}
.item {
  padding: 18px 0;
}

.box-card {
  width: 330px;
}
</style>
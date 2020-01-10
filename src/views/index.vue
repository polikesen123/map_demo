<template>
  <div class="mainBox">
    <div class="handelBox">
      <div class="topTitle">
        <h3>极海零售API示例</h3>
      </div>
      <div class="citySelBox">
        <span>选择城市</span>
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
        <span>选择品牌</span>
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
        <span>计算范围</span>
        <el-radio v-model="radio" label="1">缓冲区</el-radio>
        <el-radio v-model="radio" label="2">等时圈</el-radio>
      </div>
      <div class="changeTab">
        <div class="bufferDis" v-show="showDisTab">
          <span>缓冲距离</span>
          <el-input placeholder="请输入统计距离" v-model.number="distance">
            <template slot="append">米</template>
          </el-input>
        </div>
        <div class="isochronusCircle" v-show="showCirTab">
          <div class="tripMode">
            <span>出行方式</span>
            <el-radio-group v-model="radio2">
              <el-radio :label="3">步行</el-radio>
              <el-radio :label="6">骑车</el-radio>
              <el-radio :label="9">驾车</el-radio>
            </el-radio-group>
            <span>出行时间</span>
            <el-input placeholder="请输入统计距离" v-model.number="time">
              <template slot="append">分钟</template>
            </el-input>
          </div>
        </div>
        <div>{{urlData}}</div>
      </div>
    </div>
    <div id="map"></div>

    <pre id="info"></pre>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
// import { NullIslandLayer } from "@/api/mapInit.js";
import http from "@/api/http.js";
export default {
  name: "mapbox_test",
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
  mounted() {
    this.init();
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
  },
  methods: {
    init() {
      this.mbgl.accessToken =
        "pk.eyJ1IjoicG9saWtlc2VuIiwiYSI6ImNrNHptZzFkZzA5OTIzbWs3Mjd3bXM0bTAifQ.b2xG5nueRjrGFAVK7Lmdaw";
      let map = new this.mbgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [116.36493, 39.8679],
        zoom: 9,
        pitch: 40,
        bearing: 1
      });
      map.on("click", function(e) {
        console.log(e.lngLat);
        //获取坐标
        let {lng,lat} = e.lngLat
        let ary = [lng,lat];
        console.log(ary)
        let option = {};
        option.geometry = ary;
        option.limit = 1000
        // option.radius = 1200;
        // option.inSR ="gcj02";
        // option.outSR ="gcj02"
        // 调接口 请求数据
        http.post(`/starbucks/query`, option).then(data => {
          console.log(data);
        });
      });

      // 设置语言
      var language = new MapboxLanguage({ defaultLanguage: "zh" });
      map.addControl(language);

      // 地图导航
      var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");
      // 比例尺
      //   var scale = new mapboxgl.ScaleControl({
      //     maxWidth: 80,
      //     unit: "imperial"
      //   });
      //   map.addControl(scale);
      //   scale.setUnit("metric");
      // 全图
        map.addControl(new mapboxgl.FullscreenControl());
      // 定位
      //   map.addControl(
      //     new mapboxgl.GeolocateControl({
      //       positionOptions: {
      //         enableHighAccuracy: true
      //       },
      //       trackUserLocation: true
      //     })
      //   );
      class NullIslandLayer {
        constructor() {
          this.id = "null-island";
          this.type = "custom";
          this.renderingMode = "2d";
        }

        onAdd(map, gl) {
          const vertexSource = `
        uniform mat4 u_matrix;
        void main() {
            gl_Position = u_matrix * vec4(0.5, 0.5, 0.0, 1.0);
            gl_PointSize = 20.0;
        }`;

          const fragmentSource = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }`;

          const vertexShader = gl.createShader(gl.VERTEX_SHADER);
          gl.shaderSource(vertexShader, vertexSource);
          gl.compileShader(vertexShader);
          const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
          gl.shaderSource(fragmentShader, fragmentSource);
          gl.compileShader(fragmentShader);

          this.program = gl.createProgram();
          gl.attachShader(this.program, vertexShader);
          gl.attachShader(this.program, fragmentShader);
          gl.linkProgram(this.program);
        }

        render(gl, matrix) {
          gl.useProgram(this.program);
          gl.uniformMatrix4fv(
            gl.getUniformLocation(this.program, "u_matrix"),
            false,
            matrix
          );
          gl.drawArrays(gl.POINTS, 0, 1);
        }
      }

      map.on("load", function() {
        map.addLayer(new NullIslandLayer());
      });
    }
  }
};
</script>
<style lang="less" scoped>
/*样式*/
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
#map {
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
  width: 100%;
  height: 100%;
}
.handelBox {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 350px;
  height: 650px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  z-index: 20;
}
</style>
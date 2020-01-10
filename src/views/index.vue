<template>
  <div class="mainBox">
    <div class="handelBox">
      <div class="topTitle">
        <h3>极海零售API示例</h3>
        <p class="clf"><i class="lf"><b class="el-icon-message-solid"></b> 在地图上单击即可进行数据统计</i> <i class="rf">API文档</i></p>
      </div>
      <m-picker></m-picker>
      <m-msg></m-msg>
    </div>
    <div id="map"></div>
    <pre id="info"></pre>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import ContentPicker from '../components/ContentPicker';
import MapMsg from '../components/MapMessage'
import http from "@/api/http.js";
export default {
  name: "mapbox_test",
  data() {
    return {}
  },
  mounted() {
    this.init();
  },
  components:{
    "m-picker":ContentPicker,
    "m-msg":MapMsg
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
  padding: 10px;
  box-sizing: border-box;
  z-index: 20;
  .topTitle{
    padding: 10px;
    box-sizing: border-box;
    h3{
      font-weight: normal;
    }
    p{
      line-height: 20px;
      margin-top: 10px;
      color: #409EFF;
    }
    i{
      font-style: normal;
      font-size: 12px;
    }
  }
}
</style>
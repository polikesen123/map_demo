<template>
  <div class="mainBox">
    <div class="handelBox">
      <div class="topTitle">
        <h3>极海零售API示例</h3>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "mapbox_test",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.mbgl.accessToken =
        "pk.eyJ1IjoicG9saWtlc2VuIiwiYSI6ImNrNHptZzFkZzA5OTIzbWs3Mjd3bXM0bTAifQ.b2xG5nueRjrGFAVK7Lmdaw";
      let map = new this.mbgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [116.36493, 39.8679],
        zoom: 15.99,
        pitch: 40,
        bearing: 1
      });
      map.on("load", function() {
        map.addLayer({
          id: "room-extrusion",
          type: "fill-extrusion",
          source: {
            type: "geojson",
            data:
              "https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson"
          },
          paint: {
            "fill-extrusion-color": ["get", "color"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "base_height"],
            "fill-extrusion-opacity": 0.6
          }
        });
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
.topTitle {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 350px;
  height: 650px;
  background: #ccc;
  padding: 20px;
  box-sizing: border-box;
}
</style>
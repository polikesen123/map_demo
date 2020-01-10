# jh_map

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### 问题
调接口时候,提示参数不对,
    http.post(`/starbucks/query`, option).then(data => {
          console.log(data);
    });
    option里面传的数据不对,我想是 在侧边选好北京,星巴克,缓冲距离1000,然后在点击地图的时候,获取坐标,带着坐标和距离去请求接口,我看api文档也是传这两个参数,但是不会,你们完成的那个demo里面,地理坐标是很长的一串数据,我不知道怎么弄的

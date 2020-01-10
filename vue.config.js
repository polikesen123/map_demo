module.exports={
    publicPath:'./',
    devServer:{
        proxy:'http://geohey.com/api/retail',//proxy代理
    },
    lintOnSave:false,//不让eslint报错
}
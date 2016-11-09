/**
 * Created by Administrator on 2016/11/6.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

//下面两个函数随机模拟生成测试数据
function getDateStr(dat){
    var year = dat.getFullYear();
    var month = dat.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = dat.getDate();
    day = day < 10 ? '0' + day : day;
    return year + "-" + month + "-" + day;
}
function randomBuildDate(seed) {
    var aqiDate = {};
    var dat = new Date("2016-01-01");
    var datStr = "";
    for(var i = 0;i<31;i++) {
        datStr = getDateStr(dat);
        aqiDate[datStr] = Math.ceil(Math.random()*seed);
        dat.setDate(dat.getDate() + 1);
    }
    return aqiDate;
}

//数据************测试通过
var aqiSourceData = {
    北京:randomBuildDate(500),
    上海:randomBuildDate(300),
    杭州:randomBuildDate(200),
    深圳:randomBuildDate(300),
    株洲:randomBuildDate(200)
}


//记录当前页面的表单选项
var pageState = {
    nowSelectCity:-1,
    nowGraTime:"day"
}






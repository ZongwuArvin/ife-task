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

function addHandler(ele,type,handler) {
    if (ele.addEventListener){
        ele.addEventListener(type,handler,false);
    }else if (ele.attachEvent){
        ele.attachEvent('on'+type,handler);
    }else{
        ele['on'+type] = handler;
    }
}

//渲染图表
function renderChart() {
    
}

//日、周、月的radio事件点击的处理函数
function graTimeChange(radio) {
    var value = radio.value;

}

//Select发生变化时处理函数
function citySelectChange(){

}

//初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
function initGraTimeForm() {
    var radio = document.getElementsByName("gra-time");
    for (var i=0;i<radio.length;i++){
        addHandler(radio[i],'click',function () {
            graTimeChange(this);
        })
    }
    /*for (var i=0;i<radio.length;i++){
        (function (m) {
            addHandler(radio[m],'click',function () {
                graTimeChange(radio[m]);
            })
        })(i);
    }*/

}

//初始化城市Select下拉选择框中的选项
function initCitySelector() {
    var city = [];
    for (var i=0;i<aqiSourceData.length;i++){
        city[i] = aqiSourceData[i][0];
    }
}

//初始化图表需要的数据格式
function initAqiChartData() {
    
}

//初始化函数
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();



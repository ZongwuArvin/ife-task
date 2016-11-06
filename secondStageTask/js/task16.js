/**
 * Created by Administrator on 2016/11/3.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var eventUtil = {
    addHandler:function (element,type,handler) {
        if (element.addEventListener){
            element.addEventListener("click",handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    }
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    //正则检测，字符串中间不可输入空白字符，不用消除中间空白符
    var city = document.getElementById("aqi-city-input").value.trim();
    var valueNum = document.getElementById("aqi-value-input").value.trim();
    var reg = /^[A-Za-z\u4e00-\u9fa5]+$/;
    var regNum = /^\d+$/;
    if (!reg.test(city)){
        alert("城市名必须为中英文字符！");
        return;
    }
    if(!regNum.test(valueNum)){
        alert("空气质量指数必须为整数！");
        return;
    }
    aqiData[city] = valueNum;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.innerHTML = "";
    //var topHeader = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        //topHeader += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
        if (aqiTable.children.length === 0) {
            aqiTable.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }
        console.log(aqiTable.children.length);
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = city;
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.innerHTML = aqiData[city];
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.innerHTML = "<button data-city='"+city+"'>删除</button>";
        tr.appendChild(td3);
        aqiTable.appendChild(tr);
    }
    //aqiTable.innerHTML = city ? topHeader : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    delete  aqiData[event.target.dataset.city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    eventUtil.addHandler(addBtn,"click",addBtnHandle);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    var aqiTable = document.getElementById("aqi-table");
    eventUtil.addHandler(aqiTable,"click",function(e){
        if(e.target.nodeName.toLowerCase() === "button")
            delBtnHandle(e);
    })


}

init();
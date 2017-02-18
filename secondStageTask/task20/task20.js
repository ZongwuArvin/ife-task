/**
 * Created by Administrator on 2017/2/18.
 */
//事件处理函数
function addHandler(ele, type, handler) {
    if (ele.addEventListener){
        ele.addEventListener(type, handler, false);
    }else if(ele.attachEvent){
        ele.attachEvent("on" + type, handler);
    }else{
        ele["on" + type] = handler;
    }
}

window.onload = function () {
    var textArea = document.getElementById('text_area');
    var buttonList = document.getElementsByTagName('input');
    var container = document.getElementById('container');

    var arr = [];
    addHandler(buttonList[0],'click',function () {
        var str = textArea.value.trim();
        var arrWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
            if (e != null && e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
        arr = arr.concat(arrWord);
        render();
    });
    
    addHandler(buttonList[2], 'click', function () {
        var str = buttonList[1].value.trim();
        render(str);
    })
    
    function render(str) {
        container.innerHTML = arr.map(function (d) {
            if(str != null && str.length>0){
                d = d.replace(new RegExp(str,'g'),'<span>' + str + "</span>");
            }

            return "<div>" + d + "</div>";
        }).join('');
    }

}
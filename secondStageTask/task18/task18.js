/**
 * Created by Administrator on 2017/2/17.
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

//遍历数组，把每个元素生成对应标签
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++){
        fn(arr[i], i);
    }
}

window.onload = function () {
    var container = document.getElementById("container");
    var buttonList = document.getElementsByTagName("input");

    //定义队列
    var queue = {
        str: [],

        leftPush: function (num) {
            this.str.unshift(num);
            this.paint();
        },

        rightPush: function (num) {
            this.str.push(num);
            this.paint();
        },

        isEmpty: function () {
            return (this.str.length == 0);
        },

        leftPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.shift());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },

        rightPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },

        //每次数组变化，innerHTML代码会随之而变
        paint: function () {
            var innerHTML = "";
            each(this.str, function (item){innerHTML += ("<div>" + parseInt(item) + "</div>")});
            container.innerHTML = innerHTML;
            addDivDel();
        },

        deleteID: function (id) {
            this.str.splice(id, 1);
            this.paint();
        }
    }

    //为container中的div绑定删除函数
    function addDivDel() {
        for (var i = 0; i < container.childNodes.length; i++){
            addHandler(container.childNodes[i], "click", function (i) {
                return function () {return queue.deleteID(i)};
            }(i));
        }
    }

    //添加按钮事件监听
    addHandler(buttonList[1], "click", function () {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)){
            queue.leftPush(input);
        }else{
            alert("Please enter an interger!");
        }
    });
    addHandler(buttonList[2], "click", function () {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)){
            queue.rightPush(input);
        }else{
            alert("Please enter an interger!");
        }
    });
    addHandler(buttonList[3], "click", function () {queue.leftPop()});
    addHandler(buttonList[4], "click", function () {queue.rightPop()});
}


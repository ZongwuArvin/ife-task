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
            if(!this.isFull()){
                this.str.unshift(num);
                this.paint();
            }else{
                alert("Maximum number of intergers that could show simutaneously is 60 !");
            }

        },

        rightPush: function (num) {
            if(!this.isFull()){
                this.str.push(num);
                this.paint();
            }else{
                alert("Maximum number of intergers that could show simutaneously is 60 !");
            }
        },

        isEmpty: function () {
            return (this.str.length == 0);
        },

        isFull: function () {
            return (this.str.length > 60);
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
            each(this.str, function (item){innerHTML += ("<div style='\height:"+parseInt(item)+"px\'></div>")});
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

    function BubbleSort() {
        var Clock;
        var count = 0, i = 0;
        Clock = setInterval(function() {
            if (count >= queue.str.length) {
                clearInterval(Clock);
            }
            if (i == queue.str.length - 1 - count) {
                i = 0;
                count++;
            }
            if (queue.str[i] > queue.str[i + 1]) {
                console.log(i + "  a");
                var temp = queue.str[i];
                queue.str[i] = queue.str[i + 1];
                queue.str[i + 1] = temp;
                queue.paint();
            }
            i++;
        }, 100);
        /*var arr = queue.str;
        var length = arr.length, i, j, temp;
        for(i = length-1;0<i;i--){
            for (j=0;j<i;j++){
                if (arr[j] > arr[j+1]){
                    temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                    queue.paint();
                }
            }
        }*/
    }

    //添加按钮事件监听
    addHandler(buttonList[1], "click", function () {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)){
            if(parseInt(input) < 10 || parseInt(input) > 100){
                alert("The interger you must between 10 and 100");
                return ;
            }else{
                queue.leftPush(input);
            }

        }else{
            alert("Please enter an interger!");
        }
    });
    addHandler(buttonList[2], "click", function () {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)){
            if (parseInt(input) < 10 || parseInt(input) > 100){
                alert("The interger you must between 10 and 100");
                return ;
            }else{
                queue.rightPush(input);
            }
        }else{
            alert("Please enter an interger!");
        }
    });
    addHandler(buttonList[3], "click", function () {queue.leftPop()});
    addHandler(buttonList[4], "click", function () {queue.rightPop()});
    addHandler(buttonList[5], "click", BubbleSort);
}


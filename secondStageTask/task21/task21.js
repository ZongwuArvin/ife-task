/**
 * Created by Administrator on 2017/2/19.
 */
$ = function (ele) {
    return document.querySelector(ele);
};

function addHandler(ele, type, handler) {
    if(ele.addEventListener){
        ele.addEventListener(type,handler,false);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,handler);
    }else{
        ele["on"+type] = handler;
    }
}

function list(input,show) {
    this.input = input;
    this.show = show;
    this.arr = [];
    this.maxLen = 10;
}

list.prototype.pushData = function (d) {
    if(d.length <= 0 || this.arr.indexOf(d) >= 0){
        return ;
    }
    this.arr.push(d);
    if(this.arr.length > this.maxLen){
        this.arr.shift();
    }
    this.render()
};

list.prototype.delData = function (ele) {
    var idx = [].indexOf.call(this.show.children, ele);
    this.arr.splice(idx,1);
    this.render();
};

list.prototype.render = function () {
    this.show.innerHTML = this.arr.map(function (d) {
        return "<b>" + d + "</b>";
    }).join('');
};

function createList(input, show) {
    return new list(input, show);
}

var tagInput = $("#tag");
var tagShow = $("#tag_container");
var hobbyInput = $("#hobby");
var hobbyShow = $("#hobby_container");
var confirm = $("#confirm");

var tagList = createList(tagInput, tagShow),
    hobbyList = createList(hobbyInput, hobbyShow);

addHandler(tagInput, 'keyup', function (e) {
    var str = this.value;
    if(str.match(/[^0-9a-zA-Z\u4e00-\u9fa5]+/) || e.keyCode == 13){
        tagList.pushData(str.trim());
        tagInput.value = '';
    }
});

addHandler(tagShow, 'mouseover', function (e) {
    if(e.target.tagName === 'B'){
        var originHTML = e.target.innerHTML;
        e.target.innerHTML = '删除' + originHTML;
        addHandler(e.target, 'mouseout', function () {
            e.target.innerHTML = originHTML;
        } );
        addHandler(e.target, 'click', function () {
            console.log(e.target);
            tagList.delData(e.target);
        })
    }
});

addHandler(confirm, 'click', function () {
    var strHobby = hobbyInput.value.trim();
    hobbyInput.value = '';
    var arr = strHobby.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
    for(var i = 0; i<arr.length; i++){
        var str = arr[i].trim();
        hobbyList.pushData(str);
    }
});



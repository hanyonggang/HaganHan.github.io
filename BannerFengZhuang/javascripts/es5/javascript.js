"use strict";

//��������������
var oMeta = document.getElementById("meta");
oMeta.fnSetMeta();
var oHtml = document.getElementsByTagName("html")[0];
oHtml.fnSetRem();
window.onload = function () {

    //banner
    var oWrap = document.getElementById("wrap");
    var oUl = oWrap.getElementsByTagName("ul")[0];
    var aLi = oUl.getElementsByTagName("li");
    var oLeft = document.getElementById("left");
    var oRight = document.getElementById("right");
    var aSpan = document.getElementsByTagName("span");
    var oopBanner = new FnBanner(oWrap, oUl, aLi, oLeft, oRight);
    oopBanner.init({ //���ò���
        "auto": true,
        "point": aSpan,
        "color": "#0f0",
        "hoverColor": "#f00"
    });
};
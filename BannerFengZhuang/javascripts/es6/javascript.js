//�������������
const oMeta=document.getElementById("meta");
oMeta.fnSetMeta();
const oHtml=document.getElementsByTagName("html")[0];
oHtml.fnSetRem();
window.onload= function () {

    //banner
    const oWrap=document.getElementById("wrap");
    const oUl=oWrap.getElementsByTagName("ul")[0];
    const aLi=oUl.getElementsByTagName("li");
    const oLeft=document.getElementById("left");
    const oRight=document.getElementById("right");
    const aSpan=document.getElementsByTagName("span");
    const oopBanner=new FnBanner(oWrap,oUl,aLi,oLeft,oRight);
    oopBanner.init({//���ò���
        "auto":true,
        "point":aSpan,
        "color":"#0f0",
        "hoverColor":"#f00"
    });
};
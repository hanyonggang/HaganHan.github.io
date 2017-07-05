var oUl=document.getElementsByTagName('ul')[0];
var oLi=document.getElementsByTagName('li');
var hiDiv=document.getElementById('boxTwo1');
var num1=-1;
var timer;
oUl.style.width=oLi[0].offsetWidth*oLi.length+'px';
hiDiv.style.width=oLi[0].offsetWidth*4+'px';
timer=setInterval(function () {
    oUl.style.left=oUl.offsetLeft+num1+'px';
    if(oUl.offsetLeft>0){
        oUl.style.left=-oUl.offsetWidth/2+'px'
    }else if(oUl.offsetLeft<=-oUl.offsetWidth/2){
        oUl.style.left='0px'
    }
},10);
var a1=document.getElementsByClassName('a1')[0];
var a2=document.getElementsByClassName('a2')[0];
a1.onmouseenter= function () {
    num1=-1
};
a2.onmouseenter= function () {
    num1=1
};
var i;
for(i=0;i<oLi.length;i++){
    oLi[i].onmouseenter= function () {
        clearInterval(timer)
    };
    oLi[i].onmouseleave= function () {
        timer=setInterval(function () {
            oUl.style.left=oUl.offsetLeft+num1+'px';
            if(oUl.offsetLeft>0){
                oUl.style.left=-oUl.offsetWidth/2+'px'
            }else if(oUl.offsetLeft<=-oUl.offsetWidth/2){
                oUl.style.left='0px'
            }
        },10);
    }
}
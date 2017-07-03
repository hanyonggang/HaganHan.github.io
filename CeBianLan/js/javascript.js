window.onload= function () {
    var oDiv1=document.getElementById('div1');
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var clientHeight=document.documentElement.clientHeight;
    oDiv1.style['top']=scrollTop+(clientHeight-oDiv1.offsetHeight)/2+'px';
    window.onscroll= function () {
        scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        clientHeight=document.documentElement.clientHeight;
        startMove(Math.ceil(scrollTop+(clientHeight-oDiv1.offsetHeight)/2))
    }
};
var timer=null;
function startMove(iTarget) {
    var oDiv1=document.getElementById('div1');
    clearInterval(timer);
    timer=setInterval(function () {
        var iSpeed=(iTarget-oDiv1.offsetTop)/16;
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(oDiv1.offsetTop==iTarget){
            clearInterval(timer);
        }else{
            oDiv1.style['top']=iSpeed+oDiv1.offsetTop+'px'
        }
    },10)
}




//var timer;
//function startMove(a) {
//    var oDiv1=document.getElementById('div1');
//    clearInterval(timer);
//    timer=setInterval(function () {
//        iSpeed=(a-oDiv1.offsetTop)/30;
//        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
//        if(oDiv1.offsetTop==iSpeed){
//            clearTimeout(timer);
//        }else{
//            oDiv1.style['top']=oDiv1.offsetTop+iSpeed+'px'
//        }
//    },10)
//}
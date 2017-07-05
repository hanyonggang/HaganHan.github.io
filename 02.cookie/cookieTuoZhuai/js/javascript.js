window.onload= function () {
    var oDiv1 = document.getElementById('div1');
    var left = null;
    var top = null;
    if(getCookie('x')){
        oDiv1.style['left']=getCookie('x')+'px';
        oDiv1.style['top']=getCookie('y')+'px';
    }
    oDiv1.onmousedown = function (ev) {
        var event = ev || event;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        left = scrollLeft + event.clientX - oDiv1.offsetLeft;
        top = scrollTop + event.clientY - oDiv1.offsetTop;
        document.onmousemove = function (ev) {
            var event2=ev||event;
            var oDivLeft=event2.clientX-left;
            var oDivTop=event2.clientY-top;
            if(oDivLeft<0){
                oDivLeft=0
            }
            if(oDivLeft>document.documentElement.clientWidth-oDiv1.offsetWidth){
                oDivLeft=document.documentElement.clientWidth-oDiv1.offsetWidth
            }
            if(oDivTop<0){
                oDivTop=0
            }
            if(oDivTop>document.documentElement.clientHeight-oDiv1.offsetHeight){
                oDivTop=document.documentElement.clientHeight-oDiv1.offsetHeight
            }
            oDiv1.style['left']=oDivLeft+'px';
            oDiv1.style['top']=oDivTop+'px';
        };
    };
    oDiv1.onmouseup= function () {
        document.onmousemove=function(){
            return false
        };
        var oDiv1Left=oDiv1.offsetLeft;
        var oDiv1Top=oDiv1.offsetTop;
        setCookie('x',oDiv1Left,10);
        setCookie('y',oDiv1Top,10);
    };
};
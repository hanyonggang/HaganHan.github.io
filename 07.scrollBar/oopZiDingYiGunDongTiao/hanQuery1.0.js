/*自定义封装函数*/

/*
Ajax获取后台数据方法
fnAjax({ "method":"get","url":"1.txt","data":"abc","yesFn":function( 后台获取到的数据data ){
    alert(data);
},"noFn": function () {
    alert("获取失败");
}});
*/
function fnAjax(json){
    if(!json.method){
        json.method="get";
    }
    if(!json.data){
       json.data="";
    }
    var ajax=null;
    try{
        ajax=new XMLHttpRequest();
    }catch(e){
        ajax=new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open(json.method,json.url,true);
    if(json.method=="get"){
        ajax.send();
    }else{
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(json.data);
    }
    ajax.onreadystatechange= function () {
        if(ajax.readyState==4){
            if(ajax.state==200){
                if(json.yesFn){
                    json.yesFn(ajax.responseText);
                }
            }else{
                json.noFn();
            }
        }
    }
}
//获取非行间样式方法
function fnGetStyle(obj,style) {
    if(obj.currentStyle){//兼容IE
        return obj.currentStyle[style]
    }else{//兼容除了IE以外所有浏览器
        return getComputedStyle(obj,false)[style]
    }
}
//完美运动框架
function startMove(obj, json, endFn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bBtn = true;
        for (var attr in json) {
            var iCur = 0;
            if (attr == 'opacity') {
                if (Math.round(parseFloat(obj.fnGetStyle(attr)) * 100) == 0) {
                    iCur = Math.round(parseFloat(obj.fnGetStyle(attr)) * 100);
                }
                else {
                    iCur = Math.round(parseFloat(obj.fnGetStyle(attr)) * 100) || 100;
                }
            }
            else {
                iCur = parseInt(obj.fnGetStyle(attr)) || 0;
            }
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur != json[attr]) {
                bBtn = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            }
            else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bBtn) {
            clearInterval(obj.timer);

            if (endFn) {
                endFn.call(obj);
            }
        }
    }, 30);
}
//弹性运动框架
function fnAnimationTXYD(obj,attr,iTarget,fn) {
    var iSpeed=0;
    var style=parseFloat(fnGetStyle(obj,attr));//执行之处时的样式数值，用来存续小数
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        iSpeed+=(iTarget-style)/5;//超过目标则减速返回
        iSpeed*=0.7;//使运动速度逐渐减少
        if(Math.abs(iSpeed)<1&&Math.abs(iTarget-style)){
            clearInterval(obj.timer);
            obj.style[attr]=iTarget+'px';
            if(fn){
                fn();
            }
        }else{
            style+=iSpeed;
            obj.style[attr]=style+'px'
        }
    },30)
}
//拖拽运动      fnAnimationTZYD(obj,'bottom')      //如果没有Collision参数则只是普通的拖拽运动
//如果有Collision参数，则以参数方向为重力方向进行碰撞运动
function fnAnimationTZYD(obj,Collision,fn) {
    var disX=null;
    var disY=null;
    var lastX=0;
    var lastY=0;
    function mouseDownFn(ev) {
        var event=ev||event;
        var iSpeedX=0;
        var iSpeedY=0;
        disX=event.clientX-obj.offsetLeft;
        disY=event.clientY-obj.offsetTop;
        clearInterval(obj.timer);
        function mouseMoveFn(ev) {
            var event=ev||event;
            var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var l=scrollLeft+event.clientX-disX;
            var t=scrollTop+event.clientY-disY;
            if(l<0){
                l=0;
            }else if(l>document.documentElement.clientWidth-parseInt(fnGetStyle(obj,'width'))){
                l=document.documentElement.clientWidth-parseInt(fnGetStyle(obj,'width'));
            }
            if(t<0){
                t=0;
            }else if(t>document.documentElement.clientHeight-parseInt(fnGetStyle(obj,'height'))){
                t=document.documentElement.clientHeight-parseInt(fnGetStyle(obj,'height'));
            }
            obj.style['left']=l+'px';
            obj.style['top']=t+'px';
            iSpeedX=(l-lastX)*2;
            iSpeedY=(t-lastY)*2;
            lastX=l;
            lastY=t;
            document.title='X:'+iSpeedX+'Y'+iSpeedY;
        }
        document.addEventListener("mousemove",mouseMoveFn,false);
        function mouseUpFn() {
            document.removeEventListener("mousemove",mouseMoveFn,false);
            document.removeEventListener("mouseup",mouseUpFn,false);
            if(Collision){
                if(fn){
                    if(Collision=='top'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'top',fn);
                    }else if(Collision=='bottom'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'bottom',fn);
                    }else if(Collision=='left'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'left',fn);
                    }else if(Collision=='right'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'right',fn);
                    }
                }else{
                    if(Collision=='top'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'top');
                    }else if(Collision=='bottom'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'bottom');
                    }else if(Collision=='left'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'left');
                    }else if(Collision=='right'){
                        startCollisionMove(obj,iSpeedX,iSpeedY,'right');
                    }
                }
            }else{
                if(fn){
                    startCollisionMove(obj,iSpeedX,iSpeedY,"",fn);
                }else{
                    startCollisionMove(obj,iSpeedX,iSpeedY);
                }
            }
        }
        document.addEventListener("mouseup",mouseUpFn,false);
        return false;
    }
    obj.addEventListener("mousedown",mouseDownFn,false);

}
//碰撞运动      fnAnimationPZYD(obj,10,10,'bottom')
//当有重力方向时obj会以给定速度向重力方向碰撞运动最终停在碰撞方向上;
//如果没有重力方向，obj会以给定速度碰撞运动，终点不确定
function fnAnimationPZYD(obj,ispeedx,ispeedy,direction,fn) {
    var iSpeedX=ispeedx;
    var iSpeedY=ispeedy;
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        if(direction){
            if(direction=='top'){
                iSpeedY-=3;
            }else if(direction=='bottom'){
                iSpeedY+=3;
            }else if(direction=='left'){
                iSpeedX-=3;
            }else if(direction=='right'){
                iSpeedX+=3;
            }
        }else{
            iSpeedX*=0.99;
            iSpeedY*=0.99;
        }
        var l=obj.offsetLeft+iSpeedX;
        var t=obj.offsetTop+iSpeedY;
        if(t>document.documentElement.clientHeight-parseInt(fnGetStyle(obj,'height'))){
            iSpeedY*=-0.8;
            iSpeedX*=0.8;
            t=document.documentElement.clientHeight-parseInt(fnGetStyle(obj,'height'));
        }else if(t<0){
            iSpeedY*=-0.8;
            iSpeedX*=0.8;
            t=0;
        }
        if(l>document.documentElement.clientWidth-parseInt(fnGetStyle(obj,'width'))){
            iSpeedX*=-0.8;
            iSpeedY*=0.8;
            l=document.documentElement.clientWidth-parseInt(fnGetStyle(obj,'width'));
        }else if(l<0){
            iSpeedX*=-0.8;
            iSpeedY*=0.8;
            l=0;
        }
        if(Math.abs(iSpeedX)<1){
            iSpeedX=0;
        }
        if(Math.abs(iSpeedY)<1){
            iSpeedY=0;
        }
        if(direction){
            if(direction=='bottom'){
                if(iSpeedX==0&&iSpeedY==0&&t==document.documentElement.clientHeight-parseInt(fnGetStyle(obj,'height'))){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }else if(direction=='top'){
                if(iSpeedX==0&&iSpeedY==0&&t==0){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }else if(direction=='right'){
                if(iSpeedX==0&&iSpeedY==0&&l==document.documentElement.clientWidth-parseInt(fnGetStyle(obj,'width'))){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }else if(direction=='left'){
                if(iSpeedX==0&&iSpeedY==0&&l==0){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }
        }else{
            if(iSpeedX==0&&iSpeedY==0){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }
        obj.style['left']=l+'px';
        obj.style['top']=t+'px';
    },30)
}
//抖动封装函数
function fnAnimationDD(obj,style,endFn) {
    obj.arr=[];
    obj.num=0;
    for(var i=50;i>0;i-=2){
        obj.arr.push(i,-i);
    }
    obj.arr.push(0);
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        obj.style[style]=obj.arr[obj.num]+parseInt(fnGetStyle(obj,style))+"px";
        obj.num++;
        if(obj.num==obj.arr.length){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },40)
}
//拖拽完执行fn函数
function fnAnimationTZ(obj,fn){
    function mouseDownFn(ev) {
        var ev=ev||event;
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
        var iX=ev.clientX+scrollLeft-obj.offsetLeft;
        var iY=ev.clientY+scrollTop-obj.offsetTop;
        if(obj.setCapture){
            obj.setCapture();
        }
        function mouseMoveFn(ev) {
            var ev=ev||event;
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            var iMouseX=ev.clientX+scrollLeft;
            var iMouseY=ev.clientY+scrollTop;
            obj.style.left=(iMouseX-iX)+"px";
            obj.style.top=(iMouseY-iY)+"px";
        }
        document.addEventListener("mousemove",mouseMoveFn,false);
        function mouseUpFn(ev) {
            if(obj.releaseCapture){
                obj.releaseCapture();
            }
            document.removeEventListener("mousemove",mouseMoveFn,false);
            if(fn){
                fn();
            }
        }
        document.addEventListener("mouseup",mouseUpFn,false);
        return false;
    }
    obj.addEventListener("mousedown",mouseDownFn,false);
}
//拖拽改变obj尺寸
function fnAnimationSize(obj){
    var size=16;
    function cursorFn(ev) {
        var ev=ev||event;
        var mouseX=ev.clientX;
        var mouseY=ev.clientY;
        var disLeft=parseInt(fnGetLeft(obj));
        var disTop=parseInt(fnGetTop(obj));
        var disHeight=obj.offsetHeight;
        var disWidth=obj.offsetWidth;
        if(mouseX<disLeft+size&&mouseX>disLeft||mouseX>disLeft+disWidth-size&&mouseX<disWidth+disLeft){
            obj.style.cursor="w-resize";
        }else if(mouseY<disTop+size&&mouseY>disTop||mouseY>disHeight+disTop-size&&mouseY<disTop+disHeight){
            obj.style.cursor="s-resize";
        }else{
            obj.style.cursor="auto";
        }
    }
    document.addEventListener("mousemove",cursorFn,false);
    function mouseDownFn(ev) {
        var mouseX=ev.clientX;
        var mouseY=ev.clientY;
        var disWidth=obj.offsetWidth;
        var disHeight=obj.offsetHeight;
        var disLeft=parseInt(fnGetLeft(obj));
        var disTop=parseInt(fnGetTop(obj));
        var bB=null;
        var ev=ev||event;
        if(mouseX>disWidth+disLeft-size){
            bB="right";
        }else if(mouseX<disLeft+size){
            bB="left";
        }else if(mouseY>disTop+disHeight-size){
            bB="bottom";
        }else if(mouseY<disTop+size){
            bB="top";
        }
        function mouseMoveFn(ev) {
            var ev=ev||event;
            switch (bB){
                case "right":
                    obj.style.width=disWidth+(ev.clientX-mouseX)+"px";
                    break;
                case "left":
                    obj.style.width=disWidth-(ev.clientX-mouseX)+"px";
                    obj.style.left=disLeft+(ev.clientX-mouseX)+"px";
                    break;
                case "bottom":
                    obj.style.height=disHeight+(ev.clientY-mouseY)+"px";
                    break;
                case "top":
                    obj.style.height=disHeight-(ev.clientY-mouseY)+"px";
                    obj.style.top=disTop+(ev.clientY-mouseY)+"px";
                    break;
            }
        }
        document.addEventListener("mousemove",mouseMoveFn,false);
        function mouseUpFn(ev) {
            document.removeEventListener("mousemove",mouseMoveFn,false);
            document.addEventListener("mousemove",cursorFn,false);
        }
        document.addEventListener("mouseup",mouseUpFn,false);

        return false;
    }
    obj.addEventListener("mousedown",mouseDownFn,false);


}
//五角星路径状态设置
function fnStarPath(cxt,R,r){
    cxt.beginPath();
    for(var i=0;i<5;i++){
        cxt.lineTo(Math.cos((18+i*72)/180*Math.PI)*R,-Math.sin((18+i*72)/180*Math.PI)*R);
        cxt.lineTo(Math.cos((54+i*72)/180*Math.PI)*r,-Math.sin((54+i*72)/180*Math.PI)*r);
    }
    cxt.closePath();
}
//绘制图形 fnDrawShape(oContext,100,100,180,function(o){},function(o){})
//fnDrawShape(上下文绘图环境，x偏移，y偏移，以00点为中心点的旋转角度，beginPath()路径函数closePath(),绘制函数,水平倾斜倍数，垂直倾斜倍数)
function fnDrawShape(cxt,x,y,rot,funPath,funDraw,sx,sy) {
    cxt.save();
    cxt.translate(x,y);
    cxt.rotate(rot/180*Math.PI);
    if(sx&&sy){
	cxt.setTransform(1,0,sx,sy,0,0);
    }
    funPath(cxt);
    funDraw(cxt);
    cxt.restore();
}
//圆角矩形路径函数  fnPathRoundRect(oContext,500,600,50);
//fnPathRoundRect(上下文绘图环境,圆角矩形宽,圆角矩形高,圆角半径)
function fnPathRoundRect(cxt,width,height,r) {
    if(r>width/2){
        r=width/2
    }
    if(r>height/2){
        r=height/2
    }
    cxt.beginPath();
    cxt.arc(r,r,r,Math.PI,1.5*Math.PI,false);
    cxt.lineTo(width-r,0);
    cxt.arc(width-r,r,r,Math.PI*1.5,Math.PI*2,false);
    cxt.lineTo(width,height-r);
    cxt.arc(width-r,height-r,r,Math.PI*2,Math.PI*0.5,false);
    cxt.lineTo(r,height);
    cxt.arc(r,height-r,r,Math.PI*0.5,Math.PI,false);
    cxt.closePath();
}
//返回两点之间距离函数  fnDis(100,100,500,500)
//dis(第一个点x坐标，第一个点y坐标，第二个点x坐标，第二个点y坐标)
function fnDis(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
//月牙路径函数    fnPathMoon(oContext,500,100)
//pathMoon(上下文绘图环境,大圆半径,小圆弧度)
function fnPathMoon(cxt,R,r) {
    if(r<-R){
        r=-R+1;
    }
    cxt.beginPath();
    cxt.arc(R-R,R,R,Math.PI*0.5,Math.PI*1.5,true);
    cxt.moveTo(0,0);
    cxt.arcTo(R+r,R,0,R*2,R*Math.sqrt(R*R+(R+r)*(R+r))/(R+r));
}
//获取时间封装函数
function fnGetYear() {
    return new Date().getFullYear();
}
function fnGetMonth() {
    return new Date().getMonth()+1;
}
function fnGetDate() {
    return new Date().getDate();
}
function fnGetDay() {
    var date=new Date();
    if(date.getDay()==0){
        return "星期日";
    }else if(date.getDay()==1){
        return "星期一";
    }else if(date.getDay()==2){
        return "星期二"
    }else if(date.getDay()==3){
        return "星期三"
    }else if(date.getDay()==4){
        return "星期四"
    }else if(date.getDay()==5){
        return "星期五"
    }else if(date.getDay()==6){
        return "星期六"
    }
}
function fnGetHours() {
    return new Date().getHours();
}
function fnGetMinutes() {
    return new Date().getMinutes();
}
function fnGetSeconds() {
    return new Date().getSeconds();
}
function fnGetTime() {
    return fnGetYear()+"年"+getMonth()+"月"+getDate()+"日 "+getDay()+" "+getHours()+":"+getMinutes()+":"+getSeconds()
}
//倒计时封装函数       填入数组timeIng([年,月,日,时,分,秒])       返回数组[天数,时,分,秒]
function fnTimeIng(arr) {
    var n=arr[0];var y=arr[1];var r=arr[2];var s=arr[3];var f=arr[4];var m=arr[5];
    var time=new Date();
    var timeIng=new Date(n,y-1,r,s,f,m);
    var sec=Math.floor((timeIng-time)/1000);
    if(ms>0){
        return [Math.floor(sec/86400),Math.floor(sec%86400/3600),Math.floor(sec%86400%3600/60),sec%60];
    }else{
        return [0,0,0,0,0,0];
    }
}
//检查是否为纯数字封装函数
function fnCheckNum(str) {
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i)<48||str.charCodeAt(i)>57){
            return alert("非纯数字")
        }
    }
    return str;
}
//返回两数字之间的随机整数封装函数
function fnGetRandom(a,b) {
    var x;
    var y;
    if(a>b){
        x=b;
        y=a;
    }else{
        x=a;
        y=b;
    }
    return Math.round(Math.random()*(y-x)+x)
}
//返回元素到html的top距离
function fnGetTop(obj) {
    var i=0;
    while(obj){
        i+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return i;
}
//返回元素到html的left距离
function fnGetLeft(obj) {
    var i=0;
    while(obj){
        i+=obj.offsetLeft;
        obj=obj.offsetParent;
    }
    return i;
}
//获取元素函数    fnGetObject( ".div2",oDiv1,"div" )
function fnGetObject(a,obj,element) {
    if(typeof a==='string'){
        if(a.charAt(0)=='#'){
            a= a.substring(1, a.length);
            return document.getElementById(a);
        }else if(a.charAt(0)=='.'){
            a= a.substring(1, a.length);
            if(obj){
                if(!element){
                    element="*";
                }
            }else{
                obj=document;
                element="*";
            }
            var all=obj.getElementsByTagName(element);
            var arr=[];
            for(var i=0;i<all.length;i++){
                var aClass=all[i].className.split(" ");
                for(var j=0;j<aClass.length;j++){
                    if(aClass[j]==a){
                        arr.push(all[i]);
                        break;
                    }
                }
            }
            return arr;
        }else{
            if(!obj){
                obj=document;
            }
            return obj.getElementsByTagName(a)
        }
    }
}
//获取class元素封装函数     fnGetClass( "div1","oDiv1","li" )
function fnGetClass(name,obj,element) {
    if(obj){
        if(!element){
            element="*";
        }
    }else{
        obj=document;
        element="*";
    }
    var all=obj.getElementsByTagName(element);
    var arr=[];
    for(var i=0;i<all.length;i++){
        var aClassName=all[i].className.split(" ");
        for(var p=0;p<aClassName.length;p++){
            if(aClassName[p]==name){
                arr.push(all[i]);
                break;
            }
        }
    }
    return arr;
}
//增加class封装函数   fnAddClass( oDiv1,"div2" )    给oDiv1增加class=div2属性
//引用函数fnArrString()
function fnAddClass(obj,cla) {
    if(obj.className==""){
        obj.className=cla;
    }else{
        var arr=obj.className.split(" ");
        if(fnArrString(arr,cla)==false){
            obj.className+=" "+cla;
        }
    }
}
//判断数组中是否存在字符串方法    如果存在则返回其位置，如果不存在则返回false
function fnArrString(arr,str) {
    var arr2=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]==str){
            arr2.push(i);
        }
    }
    if(arr2==[]){
        return false
    }else{
        return arr2;
    }
}
//控制台打印事件对象详细信息
function fnGetEvent(ev){
    var ev=ev||event;
    for(var aEv in ev){
        console.log(aEv+":"+ev[aEv]);
    }
}
//鼠标移动时传入ev，调用此函数时也传入ev，返回鼠标X轴坐标
function fnGetMouseX(ev){
    var ev=ev||event;
    var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
    return ev.clientX+scrollLeft;
}
//鼠标移动时传入ev，调用此函数时也传入ev，返回鼠标Y轴坐标
function fnGetMouseY(ev){
    var ev=ev||event;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    return ev.clientY+scrollTop;
}
//绑定多个事件处理函数（给谁绑定,什么事件,函数,是否捕获）
function fnAddListener(obj,listen,fn,bB){
    if(obj.addEventListener){
        obj.addEventListener(listen,fn,bB);
    }else{
        obj.attachEvent("on"+listen, function () {
            fn.call(obj)
        });
    }
}
//碰撞检测  如果obj1碰到obj2则返回true，否则返回false;
function fnAnimationPZJC(obj1,obj2) {
    var t1 = parseInt(fnGetTop(obj1));
    var b1 = parseInt(fnGetTop(obj1)) + obj1.offsetHeight;
    var l1 = parseInt(fnGetLeft(obj1));
    var r1 = parseInt(fnGetLeft(obj1)) + obj1.offsetWidth;
    var t2 = parseInt(fnGetTop(obj2));
    var b2 = parseInt(fnGetTop(obj2)) + obj2.offsetHeight;
    var l2 = parseInt(fnGetLeft(obj2));
    var r2 = parseInt(fnGetLeft(obj2)) + obj2.offsetWidth;
    if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
    } else {
        return false;
    }
}
//返回son的style样式占了par的style样式的百分数0.00~1.00；
function fnReturnBFB(par,son,style){
    var parHeight=parseInt(fnGetStyle(par,"height"));
    var parWidth=parseInt(fnGetStyle(par,"width"));
    var sonHeight=parseInt(fnGetStyle(son,"height"));
    var sonWidth=parseInt(fnGetStyle(son,"width"));
    var sonTop=parseInt(fnGetStyle(son,"top"));
    var sonLeft=parseInt(fnGetStyle(son,"left"));
    switch (style){
        case "top":
            return parseInt(sonTop/(parHeight-sonHeight)*100)/100;
            break;
        case "left":
            return parseInt(sonLeft/(parWidth-sonWidth)*100/100);
    }
}
//给obj增加鼠标滚轮事件  向上滚执行fnUp函数 向下滚执行fnDown函数
function fnAddScrollSJ(obj,fnUp,fnDown){
    function mouseWheelFn(ev){
        var ev=ev||event;
        var bB=true;
        if(ev.wheelDelta){
            bB= ev.wheelDelta>0?true:false;
        }else{
            bB= ev.detail<0?true:false;
        }
        if(bB){
            fnUp();
        }else{
            fnDown();
        }
    }
    obj.addEventListener("mousewheel",mouseWheelFn,false);
    obj.addEventListener("DOMMouseScroll",mouseWheelFn,false);

    console.log(this)

}
//自定义滚动条(滚动内容,滚动条范围,滚动条)
//obj的父级必须有定位 obj必须有定位 par必须有定位 son必须有定位 所有有定位的元素必须给top和left值
function fnScrollGDT(obj,par,son){

    //设置基本样式;
    var speed=100;
    var objPar=obj.parentNode;
    objPar.viweHeight=objPar.clientHeight;
    son.style.cursor="pointer";
    obj.height=parseInt(fnGetStyle(obj,"height"))||obj.offsetHeight;
    par.height=parseInt(fnGetStyle(par,"height"))||par.offsetHeight;
    son.style.height=parseInt(objPar.viweHeight*par.height/obj.height)+"px";

    //设置鼠标滚轮事件
    son.height=parseInt(fnGetStyle(son,"height"));
    fnAddScrollSJ(objPar, function (ev) {
        obj.top=parseInt(fnGetStyle(obj,"top"));
        son.top=parseInt(fnGetStyle(son,"top"));
        if(obj.top<0&&obj.top>=-(obj.height-objPar.viweHeight)){
            obj.top+=speed;
        }
        if(obj.top>0){
            obj.top=0;
        }else if(obj.top<-(obj.height-objPar.viweHeight)){
            obj.top=-(obj.height-objPar.viweHeight);
        }
        obj.style.top=obj.top+"px";
        son.style.top=obj.top*(par.height-son.height)/-(obj.height-objPar.viweHeight)+"px";
    }, function (ev) {
        obj.top=parseInt(fnGetStyle(obj,"top"));
        son.top=parseInt(fnGetStyle(son,"top"));
        if(obj.top<=0&&obj.top>-(obj.height-objPar.viweHeight)){
            obj.top-=speed;
        }
        if(obj.top>0){
            obj.top=0;
        }else if(obj.top<-(obj.height-objPar.viweHeight)){
            obj.top=-(obj.height-objPar.viweHeight);
        }
        obj.style.top=obj.top+"px";
        son.style.top=obj.top*(par.height-son.height)/-(obj.height-objPar.viweHeight)+"px";
    });

    //设置鼠标按下拖拽事件
    son.addEventListener("mousedown", function (ev) {
        var ev=ev||event;
        var mouseY=ev.clientY;
        obj.top=parseInt(fnGetStyle(obj,"top"));
        son.top=parseInt(fnGetStyle(son,"top"));
        son.height=parseInt(fnGetStyle(son,"height"));

        //解决IE拖拽滚动条时选中文字的bug
        if(son.setCapture){
            son.setCapture();//开启全局捕获
        }

        function fn1(ev) {
            var ev=ev||event;
            var targetTop=son.top+(ev.clientY-mouseY);
            if(targetTop>=0&&targetTop<=par.height-son.height){
                son.style.top=targetTop+"px";
                obj.style.top=-((obj.height-objPar.viweHeight)*fnReturnBFB(par,son,"top"))+"px";
            }else if(targetTop<0){
                son.style.top=0;
                obj.style.top=-((obj.height-objPar.viweHeight)*fnReturnBFB(par,son,"top"))+"px";
            }else if(targetTop>par.height-son.height){
                son.style.top=par.height-son.height+"px";
                obj.style.top=-((obj.height-objPar.viweHeight)*fnReturnBFB(par,son,"top"))+"px";
            }
            return false;
        }
        document.addEventListener("mousemove", fn1,false);
        document.addEventListener("mouseup", function () {

            //解决IE拖拽滚动条时选中文字的bug
            if(son.releaseCapture){
                son.releaseCapture();//关闭全局捕获
            }

            document.removeEventListener("mousemove", fn1,false);
            return false;
        },false);
        return false;
    },false);
}
//fnCookie  fnCookie("get/set/del","user","q303738305","19940919",30);
function fnCookie(judge,key,value,num){
    switch (judge) {
        case "get":
            var arr=document.cookie.split('; ');
            var i=0;
            for(i=0;i<arr.length;i++){
                var arr2=arr[i].split('=');
                if(arr2[0]==key){
                    return decodeURI(arr2[1]);
                }
            }
            break;
        case "set":
            var oDate=new Date();
            oDate.setDate(oDate.getDate()+num);
            oDate.toGMTString();
            document.cookie=key+"="+encodeURI(value)+";expires="+oDate;
            break;
        case "del":
            document.cookie=key+"=1;expires=-1";
            break;
    }
}
//点击btn记录user和pass的信息num的天数到本地当前浏览器cookie;
//当重新打开浏览器时如果曾经存过cookie，那么直接填入表单;
function fnCookieForm(user,pass,btn,num){
    if(fnCookie("get","user")){
        user.value=fnCookie("get","user");
        pass.value=fnCookie("get","pass");
    }
    function clickFn() {
        fnCookie("set","user",user.value,num);
        fnCookie("set","pass",pass.value,num);
    }
    btn.addEventListener("click",clickFn,false);
}
//找出字符串中所有数字    返回数组;
//如果judge存在则返回多位数的数字数组，否则返回一位数的数字数组;
function fnGetNumInString(sString,judge){
    if(judge){
        var aArr=[];
        var sNum="";
        for(var iNum=0;iNum<sString.length;iNum++){
            if(sString.charAt(iNum)<"9"&&sString.charAt(iNum)>"0"){
                sNum+=sString.charAt(iNum);
            }else{
                if(sNum){
                    aArr.push(sNum);
                    sNum="";
                }
            }
        }
        if(sNum){
            aArr.push(sNum);
            sNum="";
        }
        return aArr;
    }else{
        var aArr=[];
        for(var iNum=0;iNum<sString.length;iNum++){
            if(sString.charAt(iNum)<"9"&&sString.charAt(iNum)>"0"){
                aArr.push(sString.charAt(iNum));
            }
        }
        return aArr;
    }
}
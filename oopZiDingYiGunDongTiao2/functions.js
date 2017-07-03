/*自定义封装函数*/

//设置cookie方法        setCookie('name','password',12)     设置cookie名字，密码，过期时间
function setCookie() {
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+arguments[2]);
    document.cookie=(arguments[0]+'='+arguments[1]+';expires=')+oDate;
}
//获取cookie方法        getCookie('name')       输入正确的名字会return其密码
function getCookie() {
    var arr=document.cookie.split('; ');
    var i=0;
    for(i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==arguments[0]){
            return arr2[1]
        }
    }
}
//删除cookie方法        delCookie('name')       删除某个cookie
function delCookie() {
    setCookie(arguments[0],'1',-1)
}
//Ajax获取后台数据方法	ajax({ "method":"get","url":"1.txt","data":"abc":"fn":function( 获取到的数据data ){ alert(data) }})
function ajax(json){
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
function getStyle(obj,style) {
    if(obj.currentStyle){//兼容IE
        return obj.currentStyle[style]
    }else{//兼容除了IE以外所有浏览器
        return getComputedStyle(obj,false)[style]
    }
}
//完美运动框架
function animationWMYD(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var bStop=true;
        for(var attr in json){
            var allTarget=null;
            var ingStyle=null;
            var iSpeed=null;
            if(attr=='opacity'){
                allTarget=json[attr]*100;
                ingStyle=parseInt(getStyle(obj,attr)*100);
            }else{
                allTarget=json[attr];
                ingStyle=parseInt(getStyle(obj,attr));
            }
            if(ingStyle!=json[attr]){
                bStop=false;
            }
            iSpeed=(allTarget-ingStyle)/20;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            if(attr=='opacity'){
                obj.style[attr]=(ingStyle+iSpeed)/100;
            }else{
                obj.style[attr]=ingStyle+iSpeed+'px'
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fn){
                fn()
            }
        }
    },10)
}
//弹性运动框架
function animationTXYD(obj,attr,iTarget,fn) {
    var iSpeed=0;
    var style=parseFloat(getStyle(obj,attr));//执行之处时的样式数值，用来存续小数
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
//拖拽运动      animationTZ(obj,'bottom')      //如果没有Collision参数则只是普通的拖拽运动
//如果有Collision参数，则以参数方向为重力方向进行碰撞运动
function animationTZYD(obj,Collision,fn) {
    var disX=null;
    var disY=null;
    var lastX=0;
    var lastY=0;
    obj.onmousedown= function (ev) {
        var event=ev||event;
        var iSpeedX=0;
        var iSpeedY=0;
        disX=event.clientX-obj.offsetLeft;
        disY=event.clientY-obj.offsetTop;
        clearInterval(obj.timer);
        document.onmousemove= function (ev) {
            var event=ev||event;
            var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var l=scrollLeft+event.clientX-disX;
            var t=scrollTop+event.clientY-disY;
            if(l<0){
                l=0;
            }else if(l>document.documentElement.clientWidth-parseInt(getStyle(obj,'width'))){
                l=document.documentElement.clientWidth-parseInt(getStyle(obj,'width'));
            }
            if(t<0){
                t=0;
            }else if(t>document.documentElement.clientHeight-parseInt(getStyle(obj,'height'))){
                t=document.documentElement.clientHeight-parseInt(getStyle(obj,'height'));
            }
            obj.style['left']=l+'px';
            obj.style['top']=t+'px';
            iSpeedX=(l-lastX)*2;
            iSpeedY=(t-lastY)*2;
            lastX=l;
            lastY=t;
            document.title='X:'+iSpeedX+'Y'+iSpeedY;
        };
        document.onmouseup= function () {
            document.onmousemove=null;
            document.onmouseup=null;
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
        };
        return false;
    };
}
//碰撞运动      animationPZ(obj,10,10,'bottom')
//当有重力方向时obj会以给定速度向重力方向碰撞运动最终停在碰撞方向上     如果没有重力方向，obj会以给定速度碰撞运动，终点不确定
function animationPZYD(obj,ispeedx,ispeedy,direction,fn) {
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
        if(t>document.documentElement.clientHeight-parseInt(getStyle(obj,'height'))){
            iSpeedY*=-0.8;
            iSpeedX*=0.8;
            t=document.documentElement.clientHeight-parseInt(getStyle(obj,'height'));
        }else if(t<0){
            iSpeedY*=-0.8;
            iSpeedX*=0.8;
            t=0;
        }
        if(l>document.documentElement.clientWidth-parseInt(getStyle(obj,'width'))){
            iSpeedX*=-0.8;
            iSpeedY*=0.8;
            l=document.documentElement.clientWidth-parseInt(getStyle(obj,'width'));
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
                if(iSpeedX==0&&iSpeedY==0&&t==document.documentElement.clientHeight-parseInt(getStyle(obj,'height'))){
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
                if(iSpeedX==0&&iSpeedY==0&&l==document.documentElement.clientWidth-parseInt(getStyle(obj,'width'))){
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
function animationDD(obj,style,endFn) {
    obj.arr=[];
    obj.num=0;
    for(var i=50;i>0;i-=2){
        obj.arr.push(i,-i);
    }
    obj.arr.push(0);
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        obj.style[style]=obj.arr[obj.num]+parseInt(getStyle(obj,style))+"px";
        obj.num++;
        if(obj.num==obj.arr.length){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },40)
}
//拖拽完执行fn函数
function animationTZ(obj,fn){
    obj.onmousedown= function (ev) {
        var ev=ev||event;
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
        var iX=ev.clientX+scrollLeft-obj.offsetLeft;
        var iY=ev.clientY+scrollTop-obj.offsetTop;
        if(obj.setCapture){
            obj.setCapture();
        }
        document.onmousemove= function (ev) {
            var ev=ev||event;
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            var iMouseX=ev.clientX+scrollLeft;
            var iMouseY=ev.clientY+scrollTop;
            obj.style.left=(iMouseX-iX)+"px";
            obj.style.top=(iMouseY-iY)+"px";
        };
        document.onmouseup= function (ev) {
            if(obj.releaseCapture){
                obj.releaseCapture();
            }
            document.onmousemove= null;
            if(fn){
                fn();
            }
        };
        return false;
    };
}
//拖拽改变obj尺寸
function animationSize(obj){
    var size=16;
    document.onmousemove= fn1;
    obj.onmousedown= function (ev) {
        var mouseX=ev.clientX;
        var mouseY=ev.clientY;
        var disWidth=obj.offsetWidth;
        var disHeight=obj.offsetHeight;
        var disLeft=parseInt(getLeft(obj));
        var disTop=parseInt(getTop(obj));
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
        document.onmousemove= function (ev) {
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
        };
        document.onmouseup= function (ev) {
            document.onmousemove=fn1;
        };
        return false;
    };

    function fn1(ev) {
        var ev=ev||event;
        var mouseX=ev.clientX;
        var mouseY=ev.clientY;
        var disLeft=parseInt(getLeft(obj));
        var disTop=parseInt(getTop(obj));
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
}
//五角星路径状态设置
function starPath(cxt,R,r){
    cxt.beginPath();
    for(var i=0;i<5;i++){
        cxt.lineTo(Math.cos((18+i*72)/180*Math.PI)*R,-Math.sin((18+i*72)/180*Math.PI)*R);
        cxt.lineTo(Math.cos((54+i*72)/180*Math.PI)*r,-Math.sin((54+i*72)/180*Math.PI)*r);
    }
    cxt.closePath();
}
//绘制图形 drawShape(oContext,100,100,180,function(o){},function(o){})
//drawShape(上下文绘图环境，x偏移，y偏移，以00点为中心点的旋转角度，beginPath()路径函数closePath(),绘制函数,水平倾斜倍数，垂直倾斜倍数)
function drawShape(cxt,x,y,rot,funPath,funDraw,sx,sy) {
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
//圆角矩形路径函数  pathRoundRect(oContext,500,600,50);
//pathRoundRect(上下文绘图环境,圆角矩形宽,圆角矩形高,圆角半径)
function pathRoundRect(cxt,width,height,r) {
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
//返回两点之间距离函数  dis(100,100,500,500)
//dis(第一个点x坐标，第一个点y坐标，第二个点x坐标，第二个点y坐标)
function dis(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
//月牙路径函数    pathMoon(oContext,500,100)
//pathMoon(上下文绘图环境,大圆半径,小圆弧度)
function pathMoon(cxt,R,r) {
    if(r<-R){
        r=-R+1;
    }
    cxt.beginPath();
    cxt.arc(R-R,R,R,Math.PI*0.5,Math.PI*1.5,true);
    cxt.moveTo(0,0);
    cxt.arcTo(R+r,R,0,R*2,R*Math.sqrt(R*R+(R+r)*(R+r))/(R+r));
}
function ajax(url, fnSucc, fnFaild){
	//1.创建Ajax对象
	var oAjax=null;
	
	if(window.XMLHttpRequest) {
		oAjax=new XMLHttpRequest();
	}else{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2.连接服务器
	oAjax.open('GET', url, true);
	
	//3.发送请求
	oAjax.send();
	
	//4.接收服务器的返回
	oAjax.onreadystatechange=function () {
		if(oAjax.readyState==4){//完成
			if(oAjax.status==200){//成功
				fnSucc(oAjax.responseText);
			}else{
				if(fnFaild)
					fnFaild(oAjax.status);
			}
		}
	};
}
//获取时间封装函数
function getYear() {
    return new Date().getFullYear();
}
function getMonth() {
    return new Date().getMonth()+1;
}
function getDate() {
    return new Date().getDate();
}
function getDay() {
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
function getHours() {
    return new Date().getHours();
}
function getMinutes() {
    return new Date().getMinutes();
}
function getSeconds() {
    return new Date().getSeconds();
}
function getTime() {
    return getYear()+"年"+getMonth()+"月"+getDate()+"日 "+getDay()+" "+getHours()+":"+getMinutes()+":"+getSeconds()
}
//倒计时封装函数       填入数组timeIng([年,月,日,时,分,秒])       返回数组[天数,时,分,秒]
function timeIng(arr) {
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
function checkNum(str) {
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i)<48||str.charCodeAt(i)>57){
            return alert("非纯数字")
        }
    }
    return str;
}
//返回两数字之间的随机整数封装函数
function sNum(a,b) {
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
function getTop(obj) {
    var i=0;
    while(obj){
        i+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return i;
}
//返回元素到html的left距离
function getLeft(obj) {
    var i=0;
    while(obj){
        i+=obj.offsetLeft;
        obj=obj.offsetParent;
    }
    return i;
}
//获取元素函数    han( ".div2",oDiv1,"div" )
function $(a,obj,element) {
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
//获取class元素封装函数     getClass( "div1","oDiv1","li" )
function getClass(name,obj,element) {
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
//增加class封装函数   addClass( oDiv1,"div2" )    给oDiv1增加class=div2属性
//引用函数arrString()
function addClass(obj,cla) {
    if(obj.className==""){
        obj.className=cla;
    }else{
        var arr=obj.className.split(" ");
        if(arrString(arr,cla)==false){
            obj.className+=" "+cla;
        }
    }
}
//判断数组中是否存在字符串方法    如果存在则返回其位置，如果不存在则返回false
function arrString(arr,str) {
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
function getEvent(ev){
    var ev=ev||event;
    for(var aEv in ev){
        console.log(aEv+":"+ev[aEv]);
    }
}
//鼠标移动时传入ev，调用此函数时也传入ev，返回鼠标X轴坐标
function getMouseX(ev){
    var ev=ev||event;
    var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
    return ev.clientX+scrollLeft;
}
//鼠标移动时传入ev，调用此函数时也传入ev，返回鼠标Y轴坐标
function getMouseY(ev){
    var ev=ev||event;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    return ev.clientY+scrollTop;
}
//绑定多个事件处理函数（给谁绑定,什么事件,函数,是否捕获）
function addListener(obj,listen,fn,bB){
    if(obj.addEventListener){
        obj.addEventListener(listen,fn,bB);
    }else{
        obj.attachEvent("on"+listen, function () {
            fn.call(obj)
        });
    }
}
//碰撞检测  如果obj1碰到obj2则返回true，否则返回false;
function animationPZJC(obj1,obj2) {
    var t1 = parseInt(getTop(obj1));
    var b1 = parseInt(getTop(obj1)) + obj1.offsetHeight;
    var l1 = parseInt(getLeft(obj1));
    var r1 = parseInt(getLeft(obj1)) + obj1.offsetWidth;
    var t2 = parseInt(getTop(obj2));
    var b2 = parseInt(getTop(obj2)) + obj2.offsetHeight;
    var l2 = parseInt(getLeft(obj2));
    var r2 = parseInt(getLeft(obj2)) + obj2.offsetWidth;
    if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
    } else {
        return false;
    }
}
//返回son的style样式占了par的style样式的百分数0.00~1.00；
function returnBFB(par,son,style){
    var parHeight=parseInt(getStyle(par,"height"));
    var parWidth=parseInt(getStyle(par,"width"));
    var sonHeight=parseInt(getStyle(son,"height"));
    var sonWidth=parseInt(getStyle(son,"width"));
    var sonTop=parseInt(getStyle(son,"top"));
    var sonLeft=parseInt(getStyle(son,"left"));
    switch (style){
        case "top":
            return parseInt(sonTop/(parHeight-sonHeight)*100)/100;
            break;
        case "left":
            return parseInt(sonLeft/(parWidth-sonWidth)*100/100);
    }
}
//给obj增加鼠标滚轮事件  向上滚执行fnUp函数 向下滚执行fnDown函数
function addScrollSJ(obj,fnUp,fnDown){
    obj.onmousewheel= fn1;
    obj.addEventListener("DOMMouseScroll",fn1,false);
    function fn1(ev){
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
}
//自定义滚动条    所有定位属性已经写好    (滚动内容,滚动条范围,滚动条);
function scrollGDT(obj,par,son){
    var speed=100;

    //设置基本样式;
    var objPar=obj.parentNode;
    objPar.style.position="relative";
    objPar.style.overflow="hidden";
    obj.style.position="absolute";
    obj.style.top=0;
    obj.style.left=0;
    par.style.position="fixed";
    son.style.position="absolute";
    son.style.top=0;
    son.style.left=0;
    son.style.cursor="pointer";
    obj.height=parseInt(getStyle(obj,"height"))||obj.offsetHeight;
    par.height=parseInt(getStyle(par,"height"));
    son.style.height=parseInt(window.innerHeight*par.height/obj.height)+"px";

    //设置鼠标滚轮事件
    son.height=parseInt(getStyle(son,"height"));
    addScrollSJ(window, function (ev) {
        obj.top=parseInt(getStyle(obj,"top"));
        son.top=parseInt(getStyle(son,"top"));
        if(obj.top<0&&obj.top>=-(obj.height-window.innerHeight)){
            obj.top+=speed;
        }
        if(obj.top>0){
            obj.top=0;
        }else if(obj.top<-(obj.height-window.innerHeight)){
            obj.top=-(obj.height-window.innerHeight);
        }
        obj.style.top=obj.top+"px";
        son.style.top=obj.top*(par.height-son.height)/-(obj.height-window.innerHeight)+"px";
    }, function (ev) {
        obj.top=parseInt(getStyle(obj,"top"));
        son.top=parseInt(getStyle(son,"top"));
        if(obj.top<=0&&obj.top>-(obj.height-window.innerHeight)){
            obj.top-=speed;
        }
        if(obj.top>0){
            obj.top=0;
        }else if(obj.top<-(obj.height-window.innerHeight)){
            obj.top=-(obj.height-window.innerHeight);
        }
        obj.style.top=obj.top+"px";
        son.style.top=obj.top*(par.height-son.height)/-(obj.height-window.innerHeight)+"px";
    });

    //设置鼠标按下拖拽事件
    son.addEventListener("mousedown", function (ev) {
        var ev=ev||event;
        var mouseY=ev.clientY;
        obj.top=parseInt(getStyle(obj,"top"));
        son.top=parseInt(getStyle(son,"top"));
        son.height=parseInt(getStyle(son,"height"));

        //解决IE拖拽滚动条时选中文字的bug
        if(son.setCapture){
            son.setCapture();//开启全局捕获
        }

        function fn1(ev) {
            var ev=ev||event;
            var targetTop=son.top+(ev.clientY-mouseY);
            if(targetTop>=0&&targetTop<=par.height-son.height){
                son.style.top=targetTop+"px";
                obj.style.top=-((obj.height-window.innerHeight)*returnBFB(par,son,"top"))+"px";
            }else if(targetTop<0){
                son.style.top=0;
                obj.style.top=-((obj.height-window.innerHeight)*returnBFB(par,son,"top"))+"px";
            }else if(targetTop>par.height-son.height){
                son.style.top=par.height-son.height+"px";
                obj.style.top=-((obj.height-window.innerHeight)*returnBFB(par,son,"top"))+"px";
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
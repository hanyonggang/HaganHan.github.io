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
//Ajax获取后台数据方法      ajax('后台服务器链接',function(str){当成功获取数据时执行此函数},function (){失败时执行})     向后台获取url，如果获取成功则触发成功函数，如果获取失败则触发失败函数
function ajax(url,ajaxSucceedFun,ajaxFailSucceed) {
    //1.创建ajax
    var oAjax=new XMLHttpRequest();
    //2.连接服务器
    oAjax.open('get',url,true);
    //3.发送请求
    oAjax.send();
    //4.接收数据
    oAjax.onreadystatechange= function () {
        if(oAjax.readyState==4){
            if(oAjax.status==200){
                ajaxSucceedFun(oAjax.responseText)
            }else{
                if(ajaxFailSucceed){
                    ajaxFailSucceed()
                }else{
                    alert('Ajax方法获取后台数据失败')
                }
            }
        }
    }
}
//object左右运动封装函数       startLeftMove(obj,目的地left值，匀速运动时的速度，缓冲运动时的速度'+为加速-为减速')
// 如果有三个参数，执行时obj会以iSpeed的速度从原始位置匀速向iTarget的方向运动，当位置达到或者超过iTarget时则停止运动
// 如果有四个参数，执行时obj会以iSpeed2的速度从原始位置向iTarget方向运动，当位置达到或者超过iTarget时回到iTarget位置且停止
// 如果第四个参数为正，则加速运动，如果为负数，则减速运动，当有第四个参数时，第三个参数是无用参数，只用来占位
var startLeftMoveSetInterval=null;
function startLeftMove(obj,iTarget,iSpeed,iSpeed2) {
    if(iSpeed2){//缓冲运动
        var sudu=null;
        if(iSpeed2<0){//减速运动
            iSpeed2*=-1;
            clearInterval(startLeftMoveSetInterval);
            if(obj.offsetLeft<iTarget+iSpeed2){
                startLeftMoveSetInterval=setInterval(function () {
                    sudu=Math.ceil((iTarget-obj.offsetLeft)/iSpeed2);
                    if(obj.offsetLeft>=iTarget-iSpeed2){
                        clearInterval(startLeftMoveSetInterval);
                    }else{
                        obj.style['left']=obj.offsetLeft+sudu+'px'
                    }
                },30)
            }else if(obj.offsetLeft>iTarget-iSpeed2){
                startLeftMoveSetInterval=setInterval(function () {
                    sudu=Math.floor((iTarget-obj.offsetLeft)/iSpeed2);
                    if(obj.offsetLeft<=iTarget){
                        clearInterval(startLeftMoveSetInterval);
                    }else{
                        obj.style['left']=obj.offsetLeft+sudu+'px'
                    }
                },30)
            }
        }else{//加速运动        失败之作。。。
            var a=iSpeed2*10;
            clearInterval(startLeftMoveSetInterval);
            if(obj.offsetLeft<iTarget){
                startLeftMoveSetInterval=setInterval(function () {
                    sudu=Math.ceil(a/(iTarget-obj.offsetLeft));
                    if(obj.offsetLeft>=iTarget-sudu){
                        clearInterval(startLeftMoveSetInterval);
                        obj.style['left']=iTarget+'px'
                    }else{
                        obj.style['left']=obj.offsetLeft+sudu+'px'
                    }
                },30)
            }else if(obj.offsetLeft>iTarget){
                startLeftMoveSetInterval=setInterval(function () {
                    sudu=Math.floor(a/(iTarget-obj.offsetLeft));
                    if(obj.offsetLeft<=iTarget-sudu){
                        clearInterval(startLeftMoveSetInterval);
                        obj.style['left']=iTarget+'px'
                    }else{
                        obj.style['left']=obj.offsetLeft+sudu+'px'
                    }
                },30)
            }
        }
    }else{//匀速运动
        if(obj.offsetLeft>iTarget){
            iSpeedjueduizhi=-iSpeed
        }else{
            iSpeedjueduizhi=iSpeed;
        }
        clearInterval(startLeftMoveSetInterval);
        if(obj.offsetLeft<iTarget){
            startLeftMoveSetInterval=setInterval(function () {
                if(obj.offsetLeft>=iTarget-iSpeed){
                    clearInterval(startLeftMoveSetInterval);
                }else{
                    obj.style['left']=obj.offsetLeft+iSpeedjueduizhi+'px'
                }
            },10)
        }else if(obj.offsetLeft>iTarget-iSpeed){
            startLeftMoveSetInterval=setInterval(function () {
                if(obj.offsetLeft<=iTarget){
                    clearInterval(startLeftMoveSetInterval);
                }else{
                    obj.style['left']=obj.offsetLeft+iSpeedjueduizhi+'px'
                }
            },10)
        }
    }
}
//object上下运动封装函数       startTopMove(obj,目的地Top值，速度)
// 执行时obj会以iSpeed的速度从原始位置向iTarget的方向运动，当位置达到或者超过iTarget时则停止运动
var startTopMoveSetInterval=null;
function startTopMove(obj,iTarget,iSpeed,iSpeed2) {
    if(iSpeed2){//缓冲函数
        if(iSpeed2<0){//减速运动
            iSpeed2*=-1;
            var sudu=null;
            clearInterval(startTopMoveSetInterval);
            startTopMoveSetInterval=setInterval(function () {
                if(obj.offsetTop<iTarget){//向下运动，速度为正，用Math.ceil()
                    if(obj.offsetTop>=iTarget){//到达目的地
                        clearInterval(startTopMoveSetInterval);
                        obj.style['top']=iTarget+'px'
                    }else{//正在执行
                        sudu=Math.ceil((iTarget-obj.offsetTop)/iSpeed2);
                        obj.style['top']=obj.offsetTop+sudu+'px'
                    }
                }else{//向上运动，速度为负
                    if(obj.offsetTop<=iTarget){//到达目的地
                        clearInterval(startTopMoveSetInterval);
                        obj.style['top']=iTarget+'px'
                    }else{//正在执行
                        sudu=Math.floor((iTarget-obj.offsetTop)/iSpeed2);
                        obj.style['top']=obj.offsetTop+sudu+'px'
                    }
                }
            },30)
        }else if(iSpeed2>0){
            alert('加速运动不会写-。-')
        }
    }else{
        if(obj.offsetTop>iTarget){
            iSpeedjueduizhi=-iSpeed
        }else{
            iSpeedjueduizhi=iSpeed;
        }
        clearInterval(startTopMoveSetInterval);
        if(obj.offsetTop<iTarget){
            startTopMoveSetInterval=setInterval(function () {
                if(obj.offsetTop>=iTarget-iSpeed){
                    clearInterval(startTopMoveSetInterval);
                }else{
                    obj.style['top']=obj.offsetTop+iSpeedjueduizhi+'px'
                }
            },10)
        }else if(obj.offsetTop>iTarget-iSpeed){
            startTopMoveSetInterval=setInterval(function () {
                if(obj.offsetTop<=iTarget){
                    clearInterval(startTopMoveSetInterval);
                }else{
                    obj.style['top']=obj.offsetTop+iSpeedjueduizhi+'px'
                }
            },10)
        }
    }
}
//obj透明度变化封装函数      startAlphaOpacity(obj,当前的opacity值0~1，目标opacity值0~1，速度)        执行时obj的opacity值会以iSpeed的速度从ingOpacity到达opacity
var alphaOpacitySetInterval=null;
function startAlphaOpacity(obj,ingOpacity,opacity,iSpeed) {
    clearInterval(alphaOpacitySetInterval);
    if(ingOpacity>opacity){
        alphaOpacitySetInterval=setInterval(function () {
            if(ingOpacity<=opacity+iSpeed){
                clearInterval(alphaOpacitySetInterval);
            }else{
                obj.style['opacity']=ingOpacity-iSpeed;
                ingOpacity-=iSpeed;
            }
        },30)
    }else if(ingOpacity<opacity){
        alphaOpacitySetInterval=setInterval(function(){
            if(ingOpacity>=opacity-iSpeed){
                clearInterval(alphaOpacitySetInterval);
            }else{
                obj.style['opacity']=ingOpacity+iSpeed;
                ingOpacity+=iSpeed;
            }
        },30)
    }
}
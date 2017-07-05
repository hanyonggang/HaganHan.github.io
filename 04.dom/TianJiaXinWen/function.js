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
//获取非行间样式方法
function getStyle(obj,style) {
    if(obj.currentStyle){//兼容IE
        return obj.currentStyle[style]
    }else{//兼容除了IE以外所有浏览器
        return getComputedStyle(obj,false)[style]
    }
}
//完美运动框架
function startMove(obj,json,fn) {
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
//获取class函数
function getByClass(className) {
    var all=document.getElementsByTagName('*');
    var i=0;
    var arr=[];
    for(i=0;i<all.length;i++){
        if(all[i].className==className){
            arr.push(all[i])
        }
    }
    return arr;
}
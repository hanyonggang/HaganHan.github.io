//设置cookie//setCookie('name','password',12)//设置cookie名字，密码，过期时间
function setCookie() {
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+arguments[2]);
    document.cookie=(arguments[0]+'='+arguments[1]+';expires=')+oDate;
}
//获取cookie//getCookie('name')//输入正确的名字会return其密码
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
//删除cookie//delCookie('name')//删除某个cookie
function delCookie() {
    setCookie(arguments[0],'1',-1)
}
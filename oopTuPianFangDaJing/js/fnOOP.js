/*自定义面向对象组件库*/

//绑定自定义事件
Object.prototype.fnAddCustomEvent= function (event,fn) {
    this.listeners=this.listeners||[];
    this.listeners[event]=this.listeners[event]||[];
    this.listeners[event].push(fn);
};
//主动触发自定义事件
Object.prototype.fnFireCustomEvent= function (event) {
    if(this.listeners[event]){
        for(var iEv=0;iEv<this.listeners[event].length;iEv++){
            this.listeners[event][iEv]();
        }
    }
};
//给文档元素绑定事件
Object.prototype.fnAddEvent=function(event,fn){
        if(this.addEventListener){
            this.addEventListener(event,fn,false);
        }else{
            this.attachEvent("on"+event,fn);
        }
};
//获取非行间样式
Object.prototype.fnGetStyle= function (style) {
    if(this.currentStyle){//兼容IE
        return this.currentStyle[style]
    }else{//兼容除了IE以外所有浏览器
        return getComputedStyle(this,false)[style]
    }
};
//返回元素到html的top距离
Object.prototype.fnGetTop= function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetTop;
        This=This.offsetParent;
    }
    return i;
};
//返回元素到html的left距离
Object.prototype.fnGetLeft=function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetLeft;
        This=This.offsetParent;
    }
    return i;
};
//图片放大镜效果
//"oSmall":"小图的父级","oExtent":"小图的兄弟节点小黄块","oBig",:"大图的父级","oBigImg":"大图"
function fnMagnifier(oSmall,oExtent,oBig,oBigImg){
    this.oSmall=oSmall;
    this.oExtent=oExtent;
    this.oBig=oBig;
    this.oBigImg=oBigImg;
}
fnMagnifier.prototype.init= function () {
    this.fnMouseEnter();
    this.fnMouseMove();
    this.fnMouseLeave();
};
fnMagnifier.prototype.fnMouseEnter= function () {
    var This=this;
    this.oSmall.fnAddEvent("mouseenter", function () {
        This.oExtent.style.display="block";
        This.oBig.style.display="block";
    });
};
fnMagnifier.prototype.fnMouseMove= function () {
    var This=this;
    this.oSmall.fnAddEvent("mousemove", function (ev) {
        var ev=ev||event;
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
        var oExtentTop=ev.clientY+scrollTop-This.oSmall.fnGetTop()-parseInt(This.oExtent.fnGetStyle("height"))/2;
        var oExtentLeft=ev.clientX+scrollLeft-This.oSmall.fnGetLeft()-parseInt(This.oExtent.fnGetStyle("width"))/2;
        if(oExtentLeft<0){
            oExtentLeft=0;
        }else if(oExtentLeft>parseInt(This.oSmall.fnGetStyle("width"))-parseInt(This.oExtent.fnGetStyle("width"))){
            oExtentLeft=parseInt(This.oSmall.fnGetStyle("width"))-parseInt(This.oExtent.fnGetStyle("width"));
        }
        if(oExtentTop<0){
            oExtentTop=0;
        }else if(oExtentTop>parseInt(This.oSmall.fnGetStyle("height"))-parseInt(This.oExtent.fnGetStyle("height"))){
            oExtentTop=parseInt(This.oSmall.fnGetStyle("height"))-parseInt(This.oExtent.fnGetStyle("height"));
        }
        This.oExtent.style.left=oExtentLeft+"px";
        This.oExtent.style.top=oExtentTop+"px";
        var percentX=parseInt((oExtentLeft/(parseInt(This.oSmall.fnGetStyle("width"))-parseInt(This.oExtent.fnGetStyle("width"))))*100)/100;
        var percentY=parseInt((oExtentTop/(parseInt(This.oSmall.fnGetStyle("height"))-parseInt(This.oExtent.fnGetStyle("height"))))*100)/100;
        This.oBigImg.style.left=-percentX*(parseInt(This.oBigImg.fnGetStyle("width"))-parseInt(This.oBig.fnGetStyle("width")))+"px";
        This.oBigImg.style.top=-percentY*(parseInt(This.oBigImg.fnGetStyle("height"))-parseInt(This.oBig.fnGetStyle("height")))+"px";
    });
};

fnMagnifier.prototype.fnMouseLeave= function () {
    var This=this;
    this.oSmall.fnAddEvent("mouseleave", function () {
        This.oExtent.style.display="none";
        This.oBig.style.display="none";
    })
};
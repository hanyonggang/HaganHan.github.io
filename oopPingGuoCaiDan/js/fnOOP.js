//                                      自定义面向对象组件库

                                            /*原型方法*/
//绑定自定义事件   oAbc.fnAddCustomEvent("fnAlert",fn);
Object.prototype.fnAddCustomEvent= function (event,fn) {
    this.listeners=this.listeners||[];
    this.listeners[event]=this.listeners[event]||[];
    this.listeners[event].push(fn);
};
//主动触发自定义事件 oAbc.fnAddCustomEvent("fnAlert");
Object.prototype.fnFireCustomEvent= function (event) {
    if(this.listeners[event]){
        for(var iEv=0;iEv<this.listeners[event].length;iEv++){
            this.listeners[event][iEv]();
        }
    }
};
//给文档元素绑定事件 obj.fnAddEvent("click",fn);
Object.prototype.fnAddEvent=function(event,fn){
        if(this.addEventListener){
            this.addEventListener(event,fn,false);
        }else{
            this.attachEvent("on"+event,fn);
        }
};
//获取非行间样式   obj.fnGetStyle("width");
Object.prototype.fnGetStyle= function (style) {
    if(this.currentStyle){//兼容IE
        return this.currentStyle[style]
    }else{//兼容除了IE以外所有浏览器
        return getComputedStyle(this,false)[style]
    }
};
//返回元素到html的top距离   obj.fnGetTop();
Object.prototype.fnGetTop= function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetTop;
        This=This.offsetParent;
    }
    return i;
};
//返回元素到html的left距离  obj.fnGetLeft();
Object.prototype.fnGetLeft=function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetLeft;
        This=This.offsetParent;
    }
    return i;
};
//返回两点之间距离函数  fnDis(100,100,500,500)
Object.prototype.fnDis=function (x1,y1,x2,y2) {
    return parseInt(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
};
//返回鼠标位于html顶部的Y轴坐标 obj.fnGetMouseY();
Object.prototype.fnGetMouseY= function () {
    var ev=this||event;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    return ev.clientY+scrollTop;
};
//返回鼠标位于html顶部的X轴坐标 ev.fnGetMouseX();
Object.prototype.fnGetMouseX= function () {
    var ev=this||event;
    var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
    return ev.clientX+scrollLeft;
};

                                            /*构造函数*/
//图片放大镜效果组件
//Options:{"oSmall":"小图的父级","oExtent":"小图的兄弟节点小黄块","oBig",:"大图的父级","oBigImg":"大图"};
//Methods:["init","fnMouseEnter","fnMouseMove","fnMouseLeave"];
//Events:null;
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
//苹果菜单效果组件
//Options:{"smallImgWidth":"小图宽","bigImgWidth":"大图宽","dis":"触发距离"};
//Methods:["init","fnSettings","fnStart"];
//Events:null;
function fnApple(aImg){
    this.aImg=aImg;
    this.settings={//默认参数
        "smallImgWidth":parseInt(this.aImg[0].fnGetStyle("width")),
        "bigImgWidth":parseInt(this.aImg[0].fnGetStyle("width"))*2,
        "dis":200
    }
}
fnApple.prototype.init= function (options) {
    this.fnSettings(options);
    this.fnStart();
};
fnApple.prototype.fnSettings= function (options) {
    for(var aKey in options){
        this.settings[aKey]=options[aKey];
    }
};
fnApple.prototype.fnStart= function () {
    var This=this;
    document.fnAddEvent("mousemove", function (ev) {
        for(var iImg=0;iImg<This.aImg.length;iImg++){
            This.aImg[iImg].centerY=This.aImg[iImg].fnGetTop()+parseInt(This.aImg[iImg].fnGetStyle("height"))/2;
            This.aImg[iImg].centerX=This.aImg[iImg].fnGetLeft()+parseInt(This.aImg[iImg].fnGetStyle("width"))/2;
            This.aImg[iImg].dising=ev.fnDis(This.aImg[iImg].centerX,This.aImg[iImg].centerY,ev.fnGetMouseX(),ev.fnGetMouseY());
            var targetScale=1-This.aImg[iImg].dising/This.settings.dis;
            if(targetScale<This.settings.smallImgWidth/This.settings.bigImgWidth){
                targetScale=This.settings.smallImgWidth/This.settings.bigImgWidth;
            }
            if(targetScale>1){
                targetScale=1;
            }
            This.aImg[iImg].style.width=This.settings.bigImgWidth*targetScale+"px";
        }
    })
};
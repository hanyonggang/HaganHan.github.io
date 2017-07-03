/*�Զ���������������*/

//���Զ����¼�
Object.prototype.fnAddCustomEvent= function (event,fn) {
    this.listeners=this.listeners||[];
    this.listeners[event]=this.listeners[event]||[];
    this.listeners[event].push(fn);
};
//���������Զ����¼�
Object.prototype.fnFireCustomEvent= function (event) {
    if(this.listeners[event]){
        for(var iEv=0;iEv<this.listeners[event].length;iEv++){
            this.listeners[event][iEv]();
        }
    }
};
//���ĵ�Ԫ�ذ��¼�
Object.prototype.fnAddEvent=function(event,fn){
        if(this.addEventListener){
            this.addEventListener(event,fn,false);
        }else{
            this.attachEvent("on"+event,fn);
        }
};
//��ȡ���м���ʽ
Object.prototype.fnGetStyle= function (style) {
    if(this.currentStyle){//����IE
        return this.currentStyle[style]
    }else{//���ݳ���IE�������������
        return getComputedStyle(this,false)[style]
    }
};
//����Ԫ�ص�html��top����
Object.prototype.fnGetTop= function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetTop;
        This=This.offsetParent;
    }
    return i;
};
//����Ԫ�ص�html��left����
Object.prototype.fnGetLeft=function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetLeft;
        This=This.offsetParent;
    }
    return i;
};
//ͼƬ�Ŵ�Ч��
//"oSmall":"Сͼ�ĸ���","oExtent":"Сͼ���ֵܽڵ�С�ƿ�","oBig",:"��ͼ�ĸ���","oBigImg":"��ͼ"
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
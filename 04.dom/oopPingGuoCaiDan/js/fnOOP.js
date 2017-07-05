//                                      �Զ���������������

                                            /*ԭ�ͷ���*/
//���Զ����¼�   oAbc.fnAddCustomEvent("fnAlert",fn);
Object.prototype.fnAddCustomEvent= function (event,fn) {
    this.listeners=this.listeners||[];
    this.listeners[event]=this.listeners[event]||[];
    this.listeners[event].push(fn);
};
//���������Զ����¼� oAbc.fnAddCustomEvent("fnAlert");
Object.prototype.fnFireCustomEvent= function (event) {
    if(this.listeners[event]){
        for(var iEv=0;iEv<this.listeners[event].length;iEv++){
            this.listeners[event][iEv]();
        }
    }
};
//���ĵ�Ԫ�ذ��¼� obj.fnAddEvent("click",fn);
Object.prototype.fnAddEvent=function(event,fn){
        if(this.addEventListener){
            this.addEventListener(event,fn,false);
        }else{
            this.attachEvent("on"+event,fn);
        }
};
//��ȡ���м���ʽ   obj.fnGetStyle("width");
Object.prototype.fnGetStyle= function (style) {
    if(this.currentStyle){//����IE
        return this.currentStyle[style]
    }else{//���ݳ���IE�������������
        return getComputedStyle(this,false)[style]
    }
};
//����Ԫ�ص�html��top����   obj.fnGetTop();
Object.prototype.fnGetTop= function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetTop;
        This=This.offsetParent;
    }
    return i;
};
//����Ԫ�ص�html��left����  obj.fnGetLeft();
Object.prototype.fnGetLeft=function () {
    var This=this;
    var i=0;
    while(This){
        i+=This.offsetLeft;
        This=This.offsetParent;
    }
    return i;
};
//��������֮����뺯��  fnDis(100,100,500,500)
Object.prototype.fnDis=function (x1,y1,x2,y2) {
    return parseInt(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
};
//�������λ��html������Y������ obj.fnGetMouseY();
Object.prototype.fnGetMouseY= function () {
    var ev=this||event;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    return ev.clientY+scrollTop;
};
//�������λ��html������X������ ev.fnGetMouseX();
Object.prototype.fnGetMouseX= function () {
    var ev=this||event;
    var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
    return ev.clientX+scrollLeft;
};

                                            /*���캯��*/
//ͼƬ�Ŵ�Ч�����
//Options:{"oSmall":"Сͼ�ĸ���","oExtent":"Сͼ���ֵܽڵ�С�ƿ�","oBig",:"��ͼ�ĸ���","oBigImg":"��ͼ"};
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
//ƻ���˵�Ч�����
//Options:{"smallImgWidth":"Сͼ��","bigImgWidth":"��ͼ��","dis":"��������"};
//Methods:["init","fnSettings","fnStart"];
//Events:null;
function fnApple(aImg){
    this.aImg=aImg;
    this.settings={//Ĭ�ϲ���
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
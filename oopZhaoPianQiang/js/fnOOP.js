/*面向对象组件*/

//图片放大镜效果组件
//Options:{"oSmall":"小图的父级","oExtent":"小图的兄弟节点小黄块","oBig",:"大图的父级","oBigImg":"大图"};
//Methods:["init","fnMouseEnter","fnMouseMove","fnMouseLeave"];
//Events:null;
function fnMagnifier(oSmall, oExtent, oBig, oBigImg) {
    this.oSmall = oSmall;
    this.oExtent = oExtent;
    this.oBig = oBig;
    this.oBigImg = oBigImg;
}
fnMagnifier.prototype.init = function () {
    this.fnMouseEnter();
    this.fnMouseMove();
    this.fnMouseLeave();
};
fnMagnifier.prototype.fnMouseEnter = function () {
    var This = this;
    this.oSmall.fnAddEvent("mouseenter", function () {
        This.oExtent.style.display = "block";
        This.oBig.style.display = "block";
    });
};
fnMagnifier.prototype.fnMouseMove = function () {
    var This = this;
    this.oSmall.fnAddEvent("mousemove", function (ev) {
        var ev = ev || event;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        var oExtentTop = ev.clientY + scrollTop - This.oSmall.fnGetTop() - parseInt(This.oExtent.fnGetStyle("height")) / 2;
        var oExtentLeft = ev.clientX + scrollLeft - This.oSmall.fnGetLeft() - parseInt(This.oExtent.fnGetStyle("width")) / 2;
        if (oExtentLeft < 0) {
            oExtentLeft = 0;
        } else if (oExtentLeft > parseInt(This.oSmall.fnGetStyle("width")) - parseInt(This.oExtent.fnGetStyle("width"))) {
            oExtentLeft = parseInt(This.oSmall.fnGetStyle("width")) - parseInt(This.oExtent.fnGetStyle("width"));
        }
        if (oExtentTop < 0) {
            oExtentTop = 0;
        } else if (oExtentTop > parseInt(This.oSmall.fnGetStyle("height")) - parseInt(This.oExtent.fnGetStyle("height"))) {
            oExtentTop = parseInt(This.oSmall.fnGetStyle("height")) - parseInt(This.oExtent.fnGetStyle("height"));
        }
        This.oExtent.style.left = oExtentLeft + "px";
        This.oExtent.style.top = oExtentTop + "px";
        var percentX = parseInt((oExtentLeft / (parseInt(This.oSmall.fnGetStyle("width")) - parseInt(This.oExtent.fnGetStyle("width")))) * 100) / 100;
        var percentY = parseInt((oExtentTop / (parseInt(This.oSmall.fnGetStyle("height")) - parseInt(This.oExtent.fnGetStyle("height")))) * 100) / 100;
        This.oBigImg.style.left = -percentX * (parseInt(This.oBigImg.fnGetStyle("width")) - parseInt(This.oBig.fnGetStyle("width"))) + "px";
        This.oBigImg.style.top = -percentY * (parseInt(This.oBigImg.fnGetStyle("height")) - parseInt(This.oBig.fnGetStyle("height"))) + "px";
    });
};

fnMagnifier.prototype.fnMouseLeave = function () {
    var This = this;
    this.oSmall.fnAddEvent("mouseleave", function () {
        This.oExtent.style.display = "none";
        This.oBig.style.display = "none";
    })
};
//苹果菜单效果组件
//Options:{"smallImgWidth":"小图宽","bigImgWidth":"大图宽","dis":"触发距离"};
//Methods:["init","fnSettings","fnStart"];
//Events:null;
function fnApple(aImg) {
    this.aImg = aImg;
    this.settings = {//默认参数
        "smallImgWidth": parseInt(this.aImg[0].fnGetStyle("width")),
        "bigImgWidth": parseInt(this.aImg[0].fnGetStyle("width")) * 2,
        "dis": 200
    }
}
fnApple.prototype.init = function (options) {
    this.fnSettings(options);
    this.fnStart();
};
fnApple.prototype.fnSettings = function (options) {
    for (var aKey in options) {
        this.settings[aKey] = options[aKey];
    }
};
fnApple.prototype.fnStart = function () {
    var This = this;
    document.fnAddEvent("mousemove", function (ev) {
        for (var iImg = 0; iImg < This.aImg.length; iImg++) {
            This.aImg[iImg].centerY = This.aImg[iImg].fnGetTop() + parseInt(This.aImg[iImg].fnGetStyle("height")) / 2;
            This.aImg[iImg].centerX = This.aImg[iImg].fnGetLeft() + parseInt(This.aImg[iImg].fnGetStyle("width")) / 2;
            This.aImg[iImg].dising = ev.fnDis(This.aImg[iImg].centerX, This.aImg[iImg].centerY, ev.fnGetMouseX(), ev.fnGetMouseY());
            var targetScale = 1 - This.aImg[iImg].dising / This.settings.dis;
            if (targetScale < This.settings.smallImgWidth / This.settings.bigImgWidth) {
                targetScale = This.settings.smallImgWidth / This.settings.bigImgWidth;
            }
            if (targetScale > 1) {
                targetScale = 1;
            }
            This.aImg[iImg].style.width = This.settings.bigImgWidth * targetScale + "px";
        }
    })
};
//照片墙效果菜单组件 aObj:为每个照片的父级li,oBtn:点击随机排序
//Options:{};
//Methods:["fnPosition","fnDrag","fnBtn"];
//Events:null;
function fnDragPhoto(aObj,oBtn){
    this.aObj=aObj;
    this.oBtn=oBtn;
    this.iZindex=0;
}
fnDragPhoto.prototype.init= function () {
    this.fnPosition();
    for(var iObj=0;iObj<this.aObj.length;iObj++){
        this.fnDrag(this.aObj[iObj]);
    }
    this.fnBtn();
};
fnDragPhoto.prototype.fnPosition= function () {
    this.aObjArr=[];
    for(var iObj=0;iObj<this.aObj.length;iObj++){
        this.aObjArr.push([this.aObj[iObj].offsetLeft,this.aObj[iObj].offsetTop]);
    }
    for(var iObj2=0;iObj2<this.aObj.length;iObj2++){
        this.aObj[iObj2].index=iObj2;
        this.aObj[iObj2].style.position="absolute";
        this.aObj[iObj2].style.left=this.aObjArr[iObj2][0]+"px";
        this.aObj[iObj2].style.top=this.aObjArr[iObj2][1]+"px";
        this.aObj[iObj2].style.margin=0;
    }
};
fnDragPhoto.prototype.fnDrag= function (oObj) {
    var This=this;
    oObj.onmousedown= function (ev) {
        var disX=ev.fnGetMouseX()-oObj.fnGetLeft();
        var disY=ev.fnGetMouseY()-oObj.fnGetTop();
        var oObjIng=null;
        This.iZindex++;
        oObj.style.zIndex=This.iZindex;
        document.onmousemove=function (ev) {
            oObj.style.top=ev.fnGetMouseY()-disY+"px";
            oObj.style.left=ev.fnGetMouseX()-disX+"px";
            for(var iObj=0;iObj<This.aObj.length;iObj++){
                This.aObj[iObj].style.border="";
            }
            oObjIng=This.fnGetObjIng(oObj);
            if(oObjIng){
                oObjIng.style.border="2px solid #ff0000";
            }
        };
        document.onmouseup=function () {
            document.onmousemove=null;
            document.onmouseup=null;
            if(oObjIng){
                fnMovePerfection(oObj,{"left":This.aObjArr[oObjIng.index][0],"top":This.aObjArr[oObjIng.index][1]});
                fnMovePerfection(oObjIng,{"left":This.aObjArr[oObj.index][0],"top":This.aObjArr[oObj.index][1]});
                oObjIng.style.border="";
                var iNum=oObj.index;
                oObj.index=oObjIng.index;
                oObjIng.index=iNum;
            }else{
                fnMovePerfection(oObj,{"left":This.aObjArr[oObj.index][0],"top":This.aObjArr[oObj.index][1]})
            }
        };
        return false;
    };
};
fnDragPhoto.prototype.fnGetObjIng= function (oObj) {
    var index=-1;
    var value=9999;
    for(var iObj=0;iObj<this.aObj.length;iObj++){
        if(oObj.fnCollideCheck(this.aObj[iObj])&&oObj!=this.aObj[iObj]){
            var c=fnDis(oObj.offsetLeft,oObj.offsetTop,this.aObj[iObj].offsetLeft,this.aObj[iObj].offsetTop);
            if(c<value){
                value=c;
                index=[iObj];
            }
        }
    }
    return this.aObj[index];
};
fnDragPhoto.prototype.fnBtn= function () {
    var This=this;
    This.oBtn.onclick= function () {
        var aNum=[0,1,2,3,4,5,6,7,8];
        aNum.sort(function (n1, n2) {
            return Math.random()-0.5;
        });
        for(var iObj=0;iObj<This.aObj.length;iObj++){
            fnMovePerfection(This.aObj[iObj],{"left":This.aObjArr[aNum[iObj]][0],"top":This.aObjArr[aNum[iObj]][1]})
            This.aObj[iObj].index=aNum[iObj];
        }
    };
};
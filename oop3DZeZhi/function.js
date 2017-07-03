//3D折纸效果  Fn3DPaper(一个obj,折纸精细程度,obj的背景imgUrl,obj的宽度,obj的高度);
//Options:{"objStyle":"obj的样式","childStyle":"所有子集div的样式","closeStyle":"关闭程度"};
//Methods:["init","close(动画执行时间,延迟执行时间)","open(动画执行时间,延迟执行时间)"];
//Events:null;
function Fn3DPaper(oObj,iMince,imgUrl,objWidth,objHeight,objLeft,objTop) {
    this.oObj = oObj;
    this.iMince=iMince;
    this.imgUrl=imgUrl;
    this.objWidth=objWidth;
    this.objHeight=objHeight;
    this.objLeft=objLeft;
    this.objTop=objTop;
    this.settings = {//默认参数
        "objStyle": {
            "width": this.objWidth+"px",
            "height": this.objHeight+"px",
            "background-size": "cover",
            "-webkit-perspective": "800px",
            "-moz-perspective": "800px",
            "-ms-perspective": "800px",
            "-o-perspective": "800px",
            "perspective": "800px",
            "position": "absolute",
            "left":this.objLeft+"px",
            "top":this.objTop+"px",
            "transition":"1s"

        },
        "childStyle":{
            "width":this.objWidth/this.iMince+"px",
            "height":this.objHeight+"px",
            "position":"absolute",
            "left":this.objWidth/this.iMince+"px",
            "top":"0px",
            "background":"url("+this.imgUrl+") no-repeat",
            "background-size":"cover",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "transform-style":"preserve-3d",
            "-webkit-transform-origin":"left",
            "-moz-transform-origin":"left",
            "-ms-transform-origin":"left",
            "-o-transform-origin":"left",
            "transform-origin":"left"
        },
        "closeStyle":{
            "-webkit-transform":"rotateY(-40deg) rotateX(5deg)",
            "-moz-transform":"rotateY(-40deg) rotateX(5deg)",
            "-ms-transform":"rotateY(-40deg) rotateX(5deg)",
            "-o-transform":"rotateY(-40deg) rotateX(5deg)",
            "transform":"rotateY(-40deg) rotateX(5deg)"
        },
        "openStyle":{
            "-webkit-transform":"rotateY(0deg) rotateX(0deg)",
            "-moz-transform":"rotateY(-0deg) rotateX(0deg)",
            "-ms-transform":"rotateY(-0deg) rotateX(0deg)",
            "-o-transform":"rotateY(-0deg) rotateX(0deg)",
            "transform":"rotateY(-0deg) rotateX(0deg)"
        }
    }
}
Fn3DPaper.prototype.init = function (opt) {
    var This=this;
    This.fnSettings(opt);
    This.fnAddDiv();
    This.fnSetStyle();
    This.close= function (transitionTime,setTimeoutTime) {
        setTimeout(function () {
            This.fnClose(transitionTime);
        },setTimeoutTime);
    };
    This.open= function (transitionTime,setTimeoutTime) {
        setTimeout(function () {
            This.fnOpen(transitionTime);
        },setTimeoutTime);
    };
};
Fn3DPaper.prototype.fnSettings = function (opt) {
    for (var aKey1 in opt) {
        for (var aKey2 in opt[aKey1]) {
            this.settings[aKey1][aKey2] = opt[aKey1][aKey2]
        }
    }
};
Fn3DPaper.prototype.fnAddDiv = function () {
    var This=this;
    var oDiv1=This.oObj;
    for(var i=0;i<This.iMince;i++){
        oDiv1.innerHTML="<div></div>";
        oDiv1=oDiv1.children[0];
    }
};
Fn3DPaper.prototype.fnSetStyle = function () {
    var This = this;
    var aDiv= This.oObj.getElementsByTagName("div");
    for (var aKey in This.settings.objStyle) {
        This.oObj.style[aKey] = This.settings.objStyle[aKey];
    }
    for (var aKey in This.settings.childStyle) {
        for(var i=0;i<This.iMince;i++){
            aDiv[i].style[aKey] = This.settings.childStyle[aKey];
        }
    }
    for(var i=0;i<This.iMince;i++){
        aDiv[i].style.backgroundPosition="-"+parseInt(This.settings.objStyle.width)/This.iMince*i+"px 0"
    }
    This.oObj.children[0].style.left="0px";
};
Fn3DPaper.prototype.fnClose= function (transitionTime) {
    var This=this;
    var aDiv=This.oObj.getElementsByTagName("div");
    This.oObj.style.left=This.objWidth/2+This.objLeft+"px";
    for(var i=0;i<aDiv.length;i++){
        aDiv[i].style.transition=transitionTime+"ms";
        for(var aKey in This.settings.closeStyle){
            aDiv[i].style[aKey]=This.settings.closeStyle[aKey];
        }
    }
};
Fn3DPaper.prototype.fnOpen= function (transitionTime) {
    var This=this;
    var aDiv=This.oObj.getElementsByTagName("div");
    This.oObj.style.left=This.objLeft+"px";
    for(var i=0;i<aDiv.length;i++){
        aDiv[i].style.transition=transitionTime+"ms";
        for(var aKey in This.settings.openStyle){
            aDiv[i].style[aKey]=This.settings.openStyle[aKey];
        }
    }
};
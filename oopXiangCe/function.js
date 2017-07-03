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
    this.zIndex=0;
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
            "transition":"2s"

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
    This.oObj.style.left=this.objWidth/2+this.objLeft+"px";
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
//移动端相机相册效果:引用3D折纸效果Fn3DPaper()
function FnMobileAlbum(oUl,oDel,oCheck,aSpan){
    this.oUl=oUl;
    this.oDel=oDel;
    this.oCheck=oCheck;
    this.aSpan=aSpan;
    this.settings={//默认参数

    }
}
FnMobileAlbum.prototype.init= function (opt) {
    var This=this;
    This.fnSettings(opt);
    This.fnImgUrl();
    setTimeout(function () {
        This.fnPosition()
    },800);
    This.fnTouch();
};
FnMobileAlbum.prototype.fnSettings= function (opt) {
    for(var aKey in opt){
        this.settings[aKey]=opt[aKey];
    }
};
FnMobileAlbum.prototype.fnImgUrl= function () {
    var This=this;
    var sLi="";
    for(var i=0;i<This.settings.imgUrl.length;i++){
        sLi+="<li style='background-image: url("+This.settings.imgUrl[i]+")'></li>";
    }
    This.oUl.innerHTML=sLi;
    This.aLi=This.oUl.getElementsByTagName("li");
    This.rem1=window.innerWidth/3;
    setTimeout(function () {
        for(var i=0;i<This.aLi.length;i++){
            This.aLi[i].oop3DPaper=new Fn3DPaper(This.aLi[i],20,This.settings.imgUrl[i],This.rem1,This.rem1,i%3*This.rem1,Math.floor(i/3)*This.rem1);
            This.aLi[i].oop3DPaper.init();
            This.aLi.index=i;
        }
        for(var i=0;i<This.settings.imgUrl.length;i++){
            This.aLi[i].fixedIndex=i;
            This.aLi[i].url=This.settings.imgUrl[i];
            This.aLi[i].style.zIndex=0;
        }
    },1000);
};
FnMobileAlbum.prototype.fnPosition= function () {
    var This=this;
    for(var i=0;i<This.aLi.length;i++){
        This.aLi[i].style.left=i%3+"rem";
        This.aLi[i].style.top=Math.floor(i/3)+"rem";
        This.aLi[i].index=i;
    }
    for(var i=0;i<This.aLi.length;i++){
        This.aLi[i].oop3DPaper=new Fn3DPaper(This.aLi[i],20,This.settings.imgUrl[This.aLi[i].fixedIndex],This.rem1,This.rem1,i%3*This.rem1,Math.floor(i/3)*This.rem1);
        This.aLi[i].oop3DPaper.init();
    }
};
FnMobileAlbum.prototype.fnTouch= function () {
    var This=this;
    var lock=true;
    var aLiNum=[];
    var zIndex=1;
    This.oCheck.fnAddEvent("touchend",fnCheckTouchEnd);
    This.oDel.fnAddEvent("touchend",fnDelTouchEnd);
    function fnCheckTouchEnd(){
        if(lock){
            This.oCheck.innerHTML="取消";
            for(var i=0;i<This.aLi.length;i++){
                This.aLi[i].fnAddEvent("touchend",fnLiTouchEnd);
                This.aLi[i].status="open";
            }
        }else{
            This.oCheck.innerHTML="选择";
            for(var i=0;i<This.aLi.length;i++){
                This.aLi[i].fnRemoveEvent("touchend",fnLiTouchEnd);
                This.aLi[i].style.backgroundImage="";
                This.aLi[i].status="close";
                This.aSpan[0].style.top=This.aSpan[1].style.top="100%";
            }
            This.timer=setTimeout(function () {
                for(var i=0;i<This.aLi.length;i++){
                    This.aLi[i].style.backgroundImage="url("+This.aLi[i].url+")";
                }
            },1000);
            This.oDel.style.display="none";
            for(var i=0;i<aLiNum.length;i++){
                This.aLi[aLiNum[i]].oop3DPaper.open(1000,0);
            }
            aLiNum=[];
        }
        lock=!lock;
    }
    function fnLiTouchEnd(){
        var _this=this;
        //This.aSpan[0].style.top=This.aSpan[1].style.top="calc(100% - 0.35rem)";
        if(_this.status=="open"){
            clearTimeout(This.timer);
            _this.style.backgroundImage="";
            aLiNum.push(_this.index);
            _this.oop3DPaper.close(1000,0);
            This.oDel.style.display="block";
            _this.status="close";
            This.aSpan[0].style.top=This.aSpan[1].style.top="calc(100% - 0.3rem)";
        }else{
            This.timer=setTimeout(function () {
                _this.style.backgroundImage="url("+_this.url+")";
            },1000);
            aLiNum.pop();
            _this.oop3DPaper.open(1000,0);
            if(aLiNum==false){
                This.oDel.style.display="none";
                This.aSpan[0].style.top=This.aSpan[1].style.top="100%";
            }
            _this.status="open";
        }
    }
    function fnDelTouchEnd(){
        aLiNum=aLiNum.sort(function (a, b) {
            return a-b;
        });
        while(aLiNum.length){
            var iNub=aLiNum.pop();
            This.aLi[iNub].style.zIndex=1;
            This.aLi[iNub].style.border="0px solid #000";
            var animateLeft=parseInt(window.innerWidth/2);
            var animateTop=parseInt(window.innerHeight+animateLeft*2);
            This.aSpan[0].style.top=This.aSpan[1].style.top="calc(100% - 0.6rem)";
            //This.oUl.removeChild(This.aLi[iNub]);
            This.aLi[iNub].fnMovePerfection({"left":animateLeft}, function () {
                this.fnMovePerfection({"top":animateTop}, function () {
                    this.remove();
                    This.settings.oopMobileAlbum.fnPosition();
                    This.aSpan[0].style.top=This.aSpan[1].style.top="100%";
                });
            });
        }
    }
};
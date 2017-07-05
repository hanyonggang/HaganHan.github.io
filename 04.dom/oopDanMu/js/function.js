define(function (require, exports, module) {
    var ex=require("./hanQuery2.0.js");

    //FnBarrage()构造函数
    function FnBarrage(oObj){
        this.oObj=oObj;
        this.settings={//默认参数
            "data":["这个好漂亮","who are you","这是什么玩意","哦买噶","好吧好吧好吧好吧","饿死我了!!!","你这么美","匆匆那年我们","究竟说了几遍","再见之后再拖延","可惜谁也没有","忘词了","Html5","css3","ECMAScript6","javascript","seajs","nodejs","mongodb","写这么多应该够了","这个好漂亮","who are you","这是什么玩意","哦买噶","好吧好吧好吧好吧","饿死我了!!!","你这么美","这个好漂亮","who are you","这是什么玩意","哦买噶","好吧好吧好吧好吧","饿死我了!!!","你这么美"]
        };
    }
    exports.FnBarrage=FnBarrage;
    FnBarrage.prototype.init= function (opt) {
        var This=this;
        This.fnSettings(opt);
    };
    FnBarrage.prototype.fnSettings= function (opt) {
        for(var aKey in opt){
            this.settings[aKey]=opt[aKey];
        }
    };
    FnBarrage.prototype.fnTuCao= function () {
        var This=this;
        var aP=[];
        for(var i=0;i<This.settings.data.length;i++){
            var oP=document.createElement("p");
            oP.innerHTML=This.settings.data[i];
            oP.style.position="absolute";
            aP.push(oP);

        }
        var creNum=0;
        var delNum=0;
        This.creTimer=setInterval(function () {

            aP[creNum].style.opacity=0;
            This.oObj.appendChild(aP[creNum]);
            var left=Math.random()*1024;
            var top=Math.random()*400;
            if(left>=1024-aP[creNum].offsetWidth-2){
                left=1024-aP[creNum].offsetWidth-2
            }
            if(top>=400-aP[creNum].offsetHeight-2){
                top=400-aP[creNum].offsetHeight-2
            }
            aP[creNum].style.left=left+"px";
            aP[creNum].style.top=top+"px";

            aP[creNum].fnMovePerfection({"opacity":100});

            creNum++;
            if(creNum>=This.settings.data.length){
                clearInterval(This.creTimer);
            }
            This.delTimer=setTimeout(function () {
                aP[delNum].fnMovePerfection({"opacity":0}, function () {
                    this.remove();
                });
                delNum++;
            },16000);
        },2000);
    };
    FnBarrage.prototype.fnDanMu= function () {
        var This=this;
        var aP=[];
        for(var i=0;i<This.settings.data.length;i++){
            var oP=document.createElement("p");
            oP.innerHTML=This.settings.data[i];
            oP.style.position="absolute";
            aP.push(oP);

        }
        var creNum=0;
        var delNum=0;
        This.aniTimer=setInterval(function () {

            aP[creNum].style.opacity=0;
            This.oObj.appendChild(aP[creNum]);
            var top=Math.random()*400;
            if(top>=400-aP[creNum].offsetHeight-2){
                top=400-aP[creNum].offsetHeight-2
            }
            aP[creNum].style.left=1024+"px";
            aP[creNum].style.top=top+"px";

            aP[creNum].style.opacity=1;
            //运动
            Object.prototype.fnLeft= function () {
                var _this=this;
                _this.nextLeft=1024;
                _this.timer=setInterval(function () {
                    _this.style.left=_this.nextLeft+"px";
                    _this.nextLeft-=2;
                },30);
            };
            aP[creNum].fnLeft();

            creNum++;
        },2000);
    };
FnBarrage.prototype.fnStop= function () {
    clearInterval(this.aniTimer);
    clearInterval(this.creTimer);
    this.oObj.innerHTML="";
}
});
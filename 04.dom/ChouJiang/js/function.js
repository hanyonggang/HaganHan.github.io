/**
 * Created by Administrator on 2016/5/1.
 */
define(function (require, exports, module) {
    require("./jquery-1.11.1.min.js");

    //alert组件
    function FnAlert(oObj){
        this.oObj=oObj;
        this.defaults={//默认参数
            "content":$(this.oObj).html()
        };
    }
    FnAlert.prototype.init= function (options) {
        this.fnSettings(options);
        this.fnAlertContent();
    };
    FnAlert.prototype.fnSettings= function (options) {
        $.extend(this.defaults,options);
    };
    FnAlert.prototype.fnAlertContent= function () {
        alert(this.defaults.content);
    };
    exports.FnAlert=FnAlert;

    //抽奖组件
    function FnRandom(oObj){
        this.oObj=oObj;
        this.default={
            "s":20,
            "start":0,
            "over":parseInt(Math.random()*9+9)
        }
    }
    FnRandom.prototype.init= function (options) {
        this.fnSettings(options);
        this.fnStart();
    };
    FnRandom.prototype.fnSettings= function (opt) {
        $.extend(this.default,opt);
    };
    FnRandom.prototype.fnStart= function () {
        var num=0;
        var This=this;
        this.timer=setInterval(function () {
            if(This.default.start>=This.oObj.length-1){
                This.default.start=0;
                num++
            }else{
                This.default.start++;
                num++
            }
            This.oObj.eq(This.default.start).attr("class","hover").siblings().attr("class","");
            if(num>=This.default.over){
                clearInterval(This.timer);
            }
        },This.default.s)
    };
    exports.FnRandom=FnRandom;
});
/**
 * Created by Administrator on 2016/5/1.
 */
define(function (require, exports, module) {
    require("./jquery-1.11.1.min.js");
    function FnSwap(oBtn){
        this.oBtn=oBtn;
        this.settings={
            "oLi":$("li")
        };
    }
    FnSwap.prototype.init= function (options) {
        this.FnSettings(options);
        this.FnSetClass();
        this.FnStart();
    };
    FnSwap.prototype.FnSettings= function (opt) {
        $.extend(this.settings,opt);
    };
    FnSwap.prototype.FnSetClass= function () {
        this.settings.oLi.on("click", function () {
            $(this).attr("class","active");
        });
    };
    FnSwap.prototype.FnStart= function () {
        var This=this;
        this.oBtn.on("click", function () {
            $($(this).attr("form")).find(".active").appendTo($($(this).attr("to"))).attr("class","")
        });
    };
    exports.FnSwap=FnSwap;
});
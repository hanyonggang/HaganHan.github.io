define(function (require, exports, module) {
    var ex=require("./function.js");
    $(function () {
        var oopLi=new ex.FnSwap($("input"));
        oopLi.init({//���ò���
            "oLi":$("li")
        })
    });
});
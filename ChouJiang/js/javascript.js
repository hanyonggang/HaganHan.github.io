/**
 * Created by Administrator on 2016/5/1.
 */
define(function (require, exports, module) {
    var ex=require("./function.js");
    $(function () {
        var $btn=$("#btn");
        var $li=$("li");
        $btn.on("click", function () {
            var oopLi=new ex.FnRandom($li);
            oopLi.init({"start":0,"over":parseInt(Math.random()*9+9)});
        });
    })
});
define(function (require, exports, module) {
    var ex=require("function.js");
    window.onload= function () {
        var oDiv=document.getElementById("div");
        var oBtn1=document.getElementById("btn1");
        var oBtn2=document.getElementById("btn2");
        var oForm=document.getElementById("form");
        var oBtn3=document.getElementById("btn3");
        var oInput=document.getElementById("input");
        var oBig=document.getElementById("big");
        var oopBarrage=new ex.FnBarrage(oDiv);
        oopBarrage.init({//配置参数

        });
        oopBarrage.fnTuCao();
        oBtn1.lock=true;
        oBtn1.onclick= function () {
            if(this.lock){
                this.innerHTML="吐槽模式";
                oopBarrage.fnStop();
                oopBarrage.fnDanMu();
                this.lock=false;
            }else{
                this.innerHTML="弹幕模式";
                oopBarrage.fnStop();
                oopBarrage.fnTuCao();
                this.lock=true;
            }
        };
        oBtn2.lock=true;
        oBtn2.onclick= function () {
            if(this.lock){
                oBig.style.display="block";
                this.innerHTML="我不说了";
                oForm.style.display="inline-block";
                this.lock=false;
            }else{
                oBig.style.display="none";
                this.innerHTML="我要说话";
                oForm.style.opacity=0;
                oForm.style.display="none";
                this.lock=true;
            }
        };
        oBtn3.onclick= function () {
            oBig.style.opacity=0.6;
            var text=oInput.value;
            if(!text){
                return alert("没有输入内容啊")
            }
            oBig.onclick= function (ev) {
                var ev=ev||event;
                var oP=document.createElement("p");
                oP.style.position="absolute";
                oP.style.left=ev.clientX-10+"px";
                oP.style.top=ev.clientY-10+"px";
                oP.innerHTML=text;
                oBig.style.opacity=0;
                setTimeout(function () {
                    oBig.style.display="none";
                },1000);
                oDiv.appendChild(oP);
                oForm.style.display="none";
                oBtn2.innerHTML="我要说话";
                oForm.style.display="none";
                oBtn2.lock=true;
            };
        };
    };
});

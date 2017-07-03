function getStyle(obj,style) {
    if(obj.currentStyle){
        return obj.currentStyle[style]
    }else{
        return getComputedStyle(obj,false)[style]
    }
}
function startMove(obj,style,iTarget,fn) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var allTarget=null;
        var ingStyle=null;
        var iSpeed=null;
        if(style=='opacity'){
            allTarget=iTarget*100;
            ingStyle=parseInt(getStyle(obj,style)*100);
        }else{
            allTarget=iTarget;
            ingStyle=parseInt(getStyle(obj,style));
        }
        iSpeed=(allTarget-ingStyle)/20;
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(ingStyle==allTarget){
            clearInterval(obj.timer);
            if(fn){
                fn()
            }
        }else{
            if(style=='opacity'){
                obj.style[style]=(ingStyle+iSpeed)/100;
            }else{
                obj.style[style]=ingStyle+iSpeed+'px'
            }
        }
    },10)
}
window.onload= function () {
    var oBtn=document.getElementById('but');
    var oOne=document.getElementById('miaov_bottom');
    var oTwo=document.getElementById('miaov_box');
    var oClose=document.getElementById('btn_close');
    oBtn.onclick= function () {
        startMove(oOne,'right',0, function () {
            oTwo.style['display']='block';
            startMove(oTwo,'bottom',0)
        });
    };
    oClose.onclick= function () {
        startMove(oTwo,'bottom',-315, function () {
            oTwo.style['display']='none';
            startMove(oOne,'right',-165)
        })
    }
};
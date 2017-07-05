//获取class函数
function getByClass(className) {
    var all=document.getElementsByTagName('*');
    var i=0;
    var arr=[];
    for(i=0;i<all.length;i++){
        if(all[i].className==className){
            arr.push(all[i])
        }
    }
    return arr;
}
//获取非行间样式方法
function getStyle(obj,style) {
    if(obj.currentStyle){
        return obj.currentStyle[style]
    }else{
        return getComputedStyle(obj,false)[style]
    }
}
//运动框架函数
function startMove(obj,style,iTarget) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var iSpeed=null;
        var iTargeting=null;
        var styleing=null;
        if(style=='opacity'){
            iTargeting=iTarget*100;
            styleing=parseInt(getStyle(obj,style)*100);
            iSpeed=(iTargeting-styleing)/10;
        }else{
            iTargeting=iTarget;
            styleing=parseInt(getStyle(obj,style));
            iSpeed=(iTargeting-styleing)/10;
        }
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(iTargeting==styleing){
            clearInterval(obj.timer)
        }else{
            if(style=='opacity'){
                obj.style[style]=(styleing+iSpeed)/100
            }else{
                obj.style[style]=styleing+iSpeed+'px'
            }
        }
    },10)
}
window.onload= function () {
    var oDiv=document.getElementById('playimages');
    var oALeft=getByClass('mark_left')[0];
    var oARight=getByClass('mark_right')[0];
    var oBtnLeft=getByClass('prev')[0];
    var oBtnRight=getByClass('next')[0];
    var oSmallUl=getByClass('small_pic')[0].getElementsByTagName('ul')[0];
    var aSmailLi=oSmallUl.getElementsByTagName('li');
    oSmallUl.style['width']=aSmailLi.length*aSmailLi[0].offsetWidth+'px';
    var iNow=0;
    var aBigUl=getByClass('big_pic')[0];
    var aBigLi=aBigUl.getElementsByTagName('li');
    var zin=2;
    var i=0;
    //oBtn的移入显示移出隐藏
    oALeft.onmouseenter=oBtnLeft.onmouseenter= function () {
        startMove(oBtnLeft,'opacity',0.9)
    };
    oALeft.onmouseleave=oBtnLeft.onmouseleave= function () {
        startMove(oBtnLeft,'opacity',0)
    };
    oARight.onmouseenter=oBtnRight.onmouseenter= function () {
        startMove(oBtnRight,'opacity',0.9)
    };
    oARight.onmouseleave=oBtnRight.onmouseleave= function () {
        startMove(oBtnRight,'opacity',0)
    };

    for(i=0;i<aSmailLi.length;i++){
        aSmailLi[i].index=i;
        aSmailLi[i].onmouseenter= function () {//小图移入显示
            startMove(this,'opacity',1)
        };
        aSmailLi[i].onmouseleave= function () {//小图移出半透
            if(this.index==iNow){

            }else{
                startMove(this,'opacity',.6)
            }
        };
        aSmailLi[i].onclick= function () {
            for(a=0;a<aSmailLi.length;a++){//点击时所有小图都半透
                startMove(aSmailLi[a],'opacity',0.6)
            }
            startMove(this,'opacity',1); //当前小图显示
            if(this.index==iNow){//点击当前图时无变化

            }else{//点击不是当前图时
                aBigLi[this.index].style['zIndex']=zin;//大图提高层级
                zin++;
                aBigLi[this.index].style['height']=0;//大图高度为0
                startMove(aBigLi[this.index],'height',aBigUl.offsetHeight);//大图滑入
                if(this.index==0){//点击第一和第二个小图时，ul不动
                    startMove(oSmallUl,'left',0);
                    iNow=0;
                }else if(this.index==aSmailLi.length-1||this.index==aSmailLi-2){//点击最后一个时，ul等于前一个的left值
                    startMove(oSmallUl,'left',-(aSmailLi.length-3)*aSmailLi[0].offsetWidth);
                }else{//点击thin.index时，ul的left值等于-(this.index-1)*aSmailLi[0].offsetWidth);
                    startMove(oSmallUl,'left',-(this.index-1)*aSmailLi[0].offsetWidth);
                }
            }
            iNow=this.index;
        };

    }
    oBtnRight.onclick= function () {
        zin++;
        if(-(oSmallUl.offsetLeft)>=oSmallUl.offsetWidth-aSmailLi[0].offsetWidth*2){
            startMove(oSmallUl,'left',0);
            startMove(aSmailLi[0],'opacity',1);
            aBigLi[0].style['zIndex']=zin;
            aBigLi[0].style['height']=0;
            startMove(aBigLi[0],'height',aBigUl.offsetHeight);
            iNow=0;
        }else{
            if(iNow==0){
                iNow++;
                startMove(oSmallUl,'left',0);
                startMove(aSmailLi[iNow],'opacity',1);
                startMove(aSmailLi[0],'opacity',0.6);
                aBigLi[iNow].style['zIndex']=zin;
                aBigLi[iNow].style['height']=0;
                startMove(aBigLi[1],'height',aBigUl.offsetHeight);
            }else if(iNow==aSmailLi.length-2){
                iNow++;
                for(a=0;a<aSmailLi.length;a++){//点击时所有小图都半透
                    startMove(aSmailLi[a],'opacity',0.6);
                }
                startMove(aSmailLi[iNow],'opacity',1);
                aBigLi[iNow].style['zIndex']=zin;
                aBigLi[iNow].style['height']=0;
                startMove(aBigLi[iNow],'height',aBigUl.offsetHeight);
            }else if(iNow==aSmailLi.length-1) {
                iNow=0;
                for (a = 0; a < aSmailLi.length; a++) {//点击时所有小图都半透
                    startMove(aSmailLi[a], 'opacity', 0.6);
                }
                startMove(aSmailLi[iNow], 'opacity', 1);
                aBigLi[iNow].style['zIndex'] = zin;
                aBigLi[iNow].style['height'] = 0;
                startMove(aBigLi[iNow], 'height', aBigUl.offsetHeight);
                startMove(oSmallUl,'left',0);
            }else{
                iNow++;
                startMove(oSmallUl,'left',-(iNow-1)*(aSmailLi[0].offsetWidth));
                for(a=0;a<aSmailLi.length;a++){//点击时所有小图都半透
                    startMove(aSmailLi[a],'opacity',0.6)
                }
                startMove(aSmailLi[iNow],'opacity',1);
                aBigLi[iNow].style['zIndex']=zin;
                aBigLi[iNow].style['height']=0;
                startMove(aBigLi[iNow],'height',aBigUl.offsetHeight);
            }
        }
    };
};
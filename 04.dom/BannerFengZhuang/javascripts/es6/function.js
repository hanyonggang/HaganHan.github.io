
//Banner功能  FnBanner(oUl父级,oUl,aLi,[oLeftBtn],[oRightBtn]);
//Options:{"auto":"是否自动轮播","point":"点obj组成的数组","color":"点默认背景色","hoverColor":"选中时的背景色"};
//Methods:["init"];
//Events:null;
//如果需要点击按钮则传入后两个参数
//如果需要小点则把点数组传进配置参数
class FnBanner{
    constructor(oWrap,oUl,aLi,oLeft,oRight){
        this.oWrap=oWrap;
        this.oUl=oUl;
        this.aLi=aLi;
        this.oLeft=oLeft;
        this.oRight=oRight;
        this.oLiWidth=Number;//存着每个li的宽度;
        this.oLiHeight=Number;//存着每个li的高度;
        this.aLiLength=Number;//存着aLi的长度
        this.showIndex=Number;//存着当前显示出来的li的序号
        this.timer=null;//存着自动轮播的定时器
        this.oUl.fnUlTransitionEndEvent=Function;//存放着需要给ul绑定的transition动画结束事件
        this.pointLength=Number;//存着point的长度
        this.oWrap.getHtmlLeft=Number;//存着oWrap到html最左边的距离
        this.oUl.fnDown=Function;//按下事件
        this.oUl.fnMove=Function;//移动事件
        this.oUl.fnUp=Function;//抬起事件
        this.oUl.downX=Number;//按下时的x坐标
        this.oUl.moveX=Number;//移动时的x坐标
        this.oUl.downMargin=Number;//按下ul时ul的marginLeft长度
        this.oUl.downDate=Number;//按下ul时的时间戳
        this.aImg=[];//存着wrap内所有img标签
        this.settings={//默认参数
            "auto":false,//是否自动播放
            "point":[],//点数组
            "color":String,//默认颜色
            "hoverColor":String//选中颜色
        }
    }
    init(opt){
        this.fnSettings(opt);
        this.fnSetImg();
        this.fnSetWrapStyle();
        this.fnSetLiStyle();
        this.fnSetUlStyle();
        if(this.oLeft){//如果需要点击按钮
            this.fnBtnClick();
        }
        this.fnUpdate();
        if(this.settings.auto){
            this.fnAutoMove();
        }
        this.fnUlAddTransitionEnd();//给ul绑定动画结束事件
        this.fnUlMouseOver();
        if(this.pointLength){//如果需要小点
            this.fnPoint();
            this.fnPointClick();
        }
        this.fnMouseAndTouchEvent();
    }
    fnSettings(opt){
        const This=this;
        for(let aKey in opt){
            this.settings[aKey]=opt[aKey];
        }
        this.oLiWidth=this.aLi[0].offsetWidth;
        this.oLiHeight=this.aLi[0].offsetHeight;
        this.aLiLength=this.aLi.length;
        this.showIndex=0;
        this.oUl.fnUlTransitionEndEvent=function(){
            This.fnAutoMove();
        };
        this.pointLength=this.settings.point.length;
    }
    fnSetImg(){
        const This=this;
        This.aImg=This.oWrap.getElementsByTagName("img");
        for(let i=0;i<This.aImg.length;i++){
            This.aImg[i].onmousedown=This.aImg[i].onmousemove=This.aImg[i].onmouseup= function () {
                return false;
            }
        }
    }
    fnSetWrapStyle(){
        this.oWrap.style.width=this.oLiWidth+"px";
        this.oWrap.style.height=this.oLiHeight+"px";
        this.oWrap.style.overflow="hidden";
        this.oWrap.getHtmlLeft=this.oWrap.fnGetHtmlLeft();
    }
    fnSetLiStyle(){
        for(let i=0;i<this.aLiLength;i++){
            this.aLi[i].style.float="left";
        }
    }
    fnSetUlStyle(){
        this.oUl.style.width=this.oLiWidth*this.aLiLength+"px";
        this.oUl.style.transition="1s";
    }
    fnUpdate(){

        //更新Ul位置
        this.oUl.style.marginLeft=-this.oLiWidth*this.showIndex+"px";

        //更新point
        if(this.pointLength){
            this.fnPoint();
        }

    }
    fnBtnClick(){
        const This=this;
        This.oLeft.addEventListener("click", function () {

            //清除延迟动画
            clearTimeout(This.timer);

            //更新showLength
            if(This.showIndex==0){
                This.showIndex=This.aLiLength-1;
            }else{
                This.showIndex--;
            }

            //更新
            This.fnUpdate();

        });
        This.oRight.addEventListener("click", function () {

            //清除延迟动画
            clearTimeout(This.timer);
            if(This.showIndex>=This.aLiLength-1){
                This.showIndex=0;
            }else{
                This.showIndex++;
            }
            This.fnUpdate();
        });
    }
    //自动运动一次
    fnAutoMove(){
        const This=this;
        This.timer=setTimeout(function () {
            if(This.showIndex<This.aLiLength-1){
                This.showIndex++;
            }else{
                This.showIndex=0;
            }
            This.fnUpdate();
        },2000);
    }
    //给oUl绑定动画结束事件
    fnUlAddTransitionEnd(){
        const This=this;
        This.oUl.fnAddTransitionEnd(This.oUl.fnUlTransitionEndEvent);
    }
    fnUlMouseOver(){
        const This=this;
        This.oWrap.addEventListener("mouseover", function () {
            This.oUl.fnDelTransitionEnd(This.oUl.fnUlTransitionEndEvent);
            clearTimeout(This.timer);
        });
        This.oWrap.addEventListener("mouseout", function () {
            This.fnUlAddTransitionEnd();
            This.fnAutoMove();
        });
    }
    fnPoint(){
        const This=this;
        for(let i=0;i<This.pointLength;i++){
            This.settings.point[i].style.backgroundColor=This.settings.color;
        }
        This.settings.point[This.showIndex].style.backgroundColor=This.settings.hoverColor;
    }
    fnPointClick(){
        const This=this;
        for(let i=0;i<This.pointLength;i++){
            This.settings.point[i].onclick= function () {

                //清除延迟动画
                clearTimeout(This.timer);

                //更新showLength
                This.showIndex=i;

                //更新
                This.fnUpdate();

            };
        }
    }
    fnMouseAndTouchEvent(){

        const This=this;

        //定义函数
        This.oUl.fnDown= function (ev) {

            This.oUl.fnAddEvent("mousemove",This.oUl.fnMove);
            This.oUl.fnAddEvent("touchmove",This.oUl.fnMove);

            This.oUl.fnAddEvent("mouseup",This.oUl.fnUp);
            This.oUl.fnAddEvent("touchend",This.oUl.fnUp);

            //清除延迟动画
            clearTimeout(This.timer);

            var ev=ev||event;
            This.oUl.downX=ev.clientX||ev.changedTouches[0].clientX;
            This.oUl.downMargin=parseInt(This.oUl.fnGetStyle("marginLeft"));
            This.oUl.style.transition="";
            This.oUl.downDate=Date.now();

        };
        This.oUl.fnMove= function (ev) {
            var ev=ev||event;
            This.oUl.moveX=ev.clientX||ev.changedTouches[0].clientX;
            This.oUl.style.marginLeft=(This.oUl.downMargin+This.oUl.moveX-This.oUl.downX)+"px";
        };
        This.oUl.fnUp= function () {

            This.oUl.fnDelEvent("mousemove",This.oUl.fnMove);
            This.oUl.fnDelEvent("touchmove",This.oUl.fnMove);

            This.oUl.fnDelEvent("mouseup",This.oUl.fnUp);
            This.oUl.fnDelEvent("touchend",This.oUl.fnUp);

            This.oUl.style.transition="1s";

            if(Date.now()-This.oUl.downDate<1000||Math.abs(This.oUl.downX-This.oUl.moveX)>This.oWrap.offsetWidth/2){
                if(This.oUl.downX-This.oUl.moveX>5){
                    if(This.showIndex>=This.aLiLength-1){
                        This.showIndex=This.aLiLength-1;
                    }else{
                        This.showIndex++;
                    }
                }else if(This.oUl.downX-This.oUl.moveX<-5){
                    if(This.showIndex<=0){
                        This.showIndex=0;
                    }else{
                        This.showIndex--;
                    }
                }
            }

            This.fnUpdate();

        };

        //绑定函数
        This.oUl.fnAddEvent("mousedown",This.oUl.fnDown);
        This.oUl.fnAddEvent("touchstart",This.oUl.fnDown);

    }
}
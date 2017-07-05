
//Banner����  FnBanner(oUl����,oUl,aLi,[oLeftBtn],[oRightBtn]);
//Options:{"auto":"�Ƿ��Զ��ֲ�","point":"��obj��ɵ�����","color":"��Ĭ�ϱ���ɫ","hoverColor":"ѡ��ʱ�ı���ɫ"};
//Methods:["init"];
//Events:null;
//�����Ҫ�����ť�������������
//�����ҪС����ѵ����鴫�����ò���
class FnBanner{
    constructor(oWrap,oUl,aLi,oLeft,oRight){
        this.oWrap=oWrap;
        this.oUl=oUl;
        this.aLi=aLi;
        this.oLeft=oLeft;
        this.oRight=oRight;
        this.oLiWidth=Number;//����ÿ��li�Ŀ��;
        this.oLiHeight=Number;//����ÿ��li�ĸ߶�;
        this.aLiLength=Number;//����aLi�ĳ���
        this.showIndex=Number;//���ŵ�ǰ��ʾ������li�����
        this.timer=null;//�����Զ��ֲ��Ķ�ʱ��
        this.oUl.fnUlTransitionEndEvent=Function;//�������Ҫ��ul�󶨵�transition���������¼�
        this.pointLength=Number;//����point�ĳ���
        this.oWrap.getHtmlLeft=Number;//����oWrap��html����ߵľ���
        this.oUl.fnDown=Function;//�����¼�
        this.oUl.fnMove=Function;//�ƶ��¼�
        this.oUl.fnUp=Function;//̧���¼�
        this.oUl.downX=Number;//����ʱ��x����
        this.oUl.moveX=Number;//�ƶ�ʱ��x����
        this.oUl.downMargin=Number;//����ulʱul��marginLeft����
        this.oUl.downDate=Number;//����ulʱ��ʱ���
        this.aImg=[];//����wrap������img��ǩ
        this.settings={//Ĭ�ϲ���
            "auto":false,//�Ƿ��Զ�����
            "point":[],//������
            "color":String,//Ĭ����ɫ
            "hoverColor":String//ѡ����ɫ
        }
    }
    init(opt){
        this.fnSettings(opt);
        this.fnSetImg();
        this.fnSetWrapStyle();
        this.fnSetLiStyle();
        this.fnSetUlStyle();
        if(this.oLeft){//�����Ҫ�����ť
            this.fnBtnClick();
        }
        this.fnUpdate();
        if(this.settings.auto){
            this.fnAutoMove();
        }
        this.fnUlAddTransitionEnd();//��ul�󶨶��������¼�
        this.fnUlMouseOver();
        if(this.pointLength){//�����ҪС��
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

        //����Ulλ��
        this.oUl.style.marginLeft=-this.oLiWidth*this.showIndex+"px";

        //����point
        if(this.pointLength){
            this.fnPoint();
        }

    }
    fnBtnClick(){
        const This=this;
        This.oLeft.addEventListener("click", function () {

            //����ӳٶ���
            clearTimeout(This.timer);

            //����showLength
            if(This.showIndex==0){
                This.showIndex=This.aLiLength-1;
            }else{
                This.showIndex--;
            }

            //����
            This.fnUpdate();

        });
        This.oRight.addEventListener("click", function () {

            //����ӳٶ���
            clearTimeout(This.timer);
            if(This.showIndex>=This.aLiLength-1){
                This.showIndex=0;
            }else{
                This.showIndex++;
            }
            This.fnUpdate();
        });
    }
    //�Զ��˶�һ��
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
    //��oUl�󶨶��������¼�
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

                //����ӳٶ���
                clearTimeout(This.timer);

                //����showLength
                This.showIndex=i;

                //����
                This.fnUpdate();

            };
        }
    }
    fnMouseAndTouchEvent(){

        const This=this;

        //���庯��
        This.oUl.fnDown= function (ev) {

            This.oUl.fnAddEvent("mousemove",This.oUl.fnMove);
            This.oUl.fnAddEvent("touchmove",This.oUl.fnMove);

            This.oUl.fnAddEvent("mouseup",This.oUl.fnUp);
            This.oUl.fnAddEvent("touchend",This.oUl.fnUp);

            //����ӳٶ���
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

        //�󶨺���
        This.oUl.fnAddEvent("mousedown",This.oUl.fnDown);
        This.oUl.fnAddEvent("touchstart",This.oUl.fnDown);

    }
}

class Fn3dPaper{

    constructor(eArticlePaperWrap){

        this.eArticlePaperWrap=eArticlePaperWrap;
        this.eDivPaperS=eArticlePaperWrap.querySelectorAll("div");

        this.settings={//默认参数
            sStatus:"shrink"//当前状态
        }

    }

    init(jOpt){

        this.fnSettings(jOpt);

    }

    fnSettings(jOpt){

        for(let attr in jOpt){
            this.settings[attr]=jOpt[attr];
        }

        for(let i=0;i<this.eDivPaperS.length;i++){

            this.eDivPaperS[i].id=`div-paper${i}`;
        }

    }

    //收缩方法
    fnShrink(fn){//动画结束执行fn

        if(this.settings.sStatus!=="open"){
            return;
        }
        this.settings.sStatus="loading";

        const This=this;

        let i=this.eDivPaperS.length-1;
        $$.fnClearInterval("fnShrinkTimer");
        $$.fnSetInterval(function fnShrinkTimer() {

            This.eDivPaperS[i].style.transition=".5s";
            This.eDivPaperS[i].classList.remove("g-3d_paper_ani_open");
            i--;
            if(i<0){
                $$.fnClearInterval("fnShrinkTimer");
                $$.fnRemoveEvent(This.eDivPaperS[0],"transitionend","fnDivPaperTransitionEnd");
                $$.fnAddEvent(This.eDivPaperS[0],"transitionend",function fnDivPaperTransitionEnd() {
                    $$.fnRemoveEvent(This.eDivPaperS[0],"transitionend","fnDivPaperTransitionEnd");
                    if($$.fnTypeof(fn)==="Function"){
                        fn();
                    }
                    This.settings.sStatus="shrink";
                });
            }

        },100);

    }

    //打开方法
    fnOpen(fn){//动画结束执行fn

        if(this.settings.sStatus!=="shrink"){
            return;
        }
        this.settings.sStatus="loading";

        const This=this;

        let i=0;
        $$.fnClearInterval("fnOpenTimer");
        $$.fnSetInterval(function fnOpenTimer() {

            This.eDivPaperS[i].classList.add("g-3d_paper_ani_open");
            This.eDivPaperS[i].style.transition=".5s";
            i++;
            if(i===This.eDivPaperS.length){
                $$.fnClearInterval("fnOpenTimer");
                $$.fnRemoveEvent(This.eDivPaperS[i-1],"animationend","fnDivPaperAnimationEnd");
                $$.fnAddEvent(This.eDivPaperS[i-1],"animationend",function fnDivPaperAnimationEnd() {
                    $$.fnRemoveEvent(This.eDivPaperS[i-1],"animationend","fnDivPaperAnimationEnd");
                    if($$.fnTypeof(fn)==="Function"){
                        fn();
                    }
                    This.settings.sStatus="open";
                });
            }

        },100);

    }

}

export default Fn3dPaper;
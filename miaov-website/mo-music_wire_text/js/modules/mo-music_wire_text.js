
import musicWireTextStyle from "../../css/modules/mo-music_wire_text.css";

class FnMusicWireText{

    constructor(eTextS){

        this.eTextS=eTextS;
        this.aSpanS=[Element,Element];

        this.settings={
            nRadian:2
        }

    }

    init(jOpt){

        this.fnSettings(jOpt);
        this.fnAddSpan();
        this.fnSetPo_ab();
        this.fnMouse();

    }

    fnSettings(jOpt){
        for (let attr in jOpt){
            this.settings[attr]=jOpt[attr];
        }
    }

    fnAddSpan(){

        const This=this;

        for(let i=0;i<This.eTextS.length;i++){

            This.aSpanS[i]=[];

            This.eTextS[i].classList.add("g-music_wire_text");

            const sText=This.eTextS[i].innerHTML;
            This.eTextS[i].innerHTML="";
            for(let j=0;j<sText.length;j++){

                const eSpan=document.createElement("span");
                eSpan.id=`span-${i}-${j}`;
                eSpan.innerHTML=sText[j];

                This.eTextS[i].appendChild(eSpan);
                This.aSpanS[i].push(eSpan);

                eSpan.style.left=eSpan.offsetLeft+"px";
                eSpan.style.top=eSpan.offsetTop+"px";

            }

        }

    }

    fnSetPo_ab(){

        const This=this;

        for(let i=0;i<This.eTextS.length;i++){
            This.eTextS[i].style.lineHeight=$$.fnGetFinalStyle(This.eTextS[i],"fontSize");
        }

        for(let i=0;i<This.aSpanS.length;i++){

            for(let j=0;j<This.aSpanS[i].length;j++){

                This.aSpanS[i][j].classList.add("u-music_wire_text-po_ab");

            }

        }

    }

    fnMouse(){

        const This=this;

        for(let i=0;i<This.aSpanS.length;i++){

            const nSpanTop=This.aSpanS[i][0].offsetTop;

            for(let j=0;j<This.aSpanS[i].length;j++){
                $$.fnAddEvent(This.aSpanS[i][j],"mouseover",function fnSpanMouseOver(ev) {

                    for(let k=0;k<This.aSpanS[i].length;k++){

                        This.aSpanS[i][k].classList.remove("u-music_wire_text-transition_yes");
                        This.aSpanS[i][k].classList.add("u-music_wire_text-transition_no");

                    }

                    const nMouseOverTop=this.offsetTop;
                    const nMouseOverClientY=ev.clientY;

                    const nMinTop=0;
                    const nMaxTop=This.eTextS[i].offsetHeight-This.aSpanS[i][j].offsetHeight;

                    $$.fnAddEvent(This.aSpanS[i][j],"mousemove",function fnSpanMouseMove(ev) {

                        const nMouseMoveTop=nMouseOverTop+(ev.clientY-nMouseOverClientY);

                        if(nMouseMoveTop<nMinTop||nMouseMoveTop>nMaxTop){
                            $$.fnFireEventFn(This.aSpanS[i][j],"fnSpanMouseOut");
                            return;
                        }

                        let nUpOrDown=nMouseMoveTop-nMouseOverTop>0?1:-1;

                        for(let k=0;k<This.aSpanS[i].length;k++){

                            const nTop=nMouseMoveTop-nUpOrDown*Math.abs(k-j)*This.settings.nRadian;

                            if(Math.abs(k-j)<Math.abs(nMouseMoveTop-nMouseOverTop)/This.settings.nRadian-1){

                                This.aSpanS[i][k].style.top=`${nTop}px`;

                            }

                        }

                    });

                    $$.fnAddEvent(This.aSpanS[i][j],"mouseout",function fnSpanMouseOut() {

                        $$.fnRemoveEvent(This.aSpanS[i][j],"mousemove","fnSpanMouseMove");
                        $$.fnRemoveEvent(This.aSpanS[i][j],"mouseout","fnSpanMouseOut");

                        for(let k=0;k<This.aSpanS[i].length;k++){

                            This.aSpanS[i][k].classList.remove("u-music_wire_text-transition_no");
                            This.aSpanS[i][k].classList.add("u-music_wire_text-transition_yes");

                            This.aSpanS[i][k].style.top=`${nSpanTop}px`;
                        }

                    });

                });
            }

        }

    }

}

export default FnMusicWireText;
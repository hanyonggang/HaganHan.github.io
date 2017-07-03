function FnDrag(eLis,eDiv){
    this.eLis=eLis;
    this.eDiv=eDiv;
    this.eImgs=[];
    this.dragName=String;
    this.bHas=false;
    this.jName={};
}
FnDrag.prototype.init= function () {
    this.fnSetLiName();
    this.fnDrag();
};
FnDrag.prototype.fnSetLiName= function () {

    for(let i=0,length=this.eLis.length;i<length;i++){
        this.eLis[i].name=`水果套餐${i+1}`;
    }

};
FnDrag.prototype.fnDrag= function () {

    const This=this;

    for(let i=0,length=This.eLis.length;i<length;i++){

        This.eLis[i].addEventListener("dragstart", function (ev) {

            ev.dataTransfer.setData("key","value");

            This.dragName=this.name;

        });
        This.eLis[i].addEventListener("drag", function () {



        });
        This.eLis[i].addEventListener("dragend", function () {



        });

    }

    This.eDiv.addEventListener("dragenter", function (ev) {



    });
    This.eDiv.addEventListener("dragover", function (ev) {

        ev.preventDefault();

    });
    This.eDiv.addEventListener("dragleave", function (ev) {



    });
    This.eDiv.addEventListener("drop", function (ev) {

        ev.preventDefault();

        const ePs=This.eDiv.getElementsByTagName("p");

        for(let i=0,length=ePs.length;i<length;i++){

            if(ePs[i].name==This.dragName){
                This.bHas=true;
                break;
            }else{
                This.bHas=false;
            }

        }

        if(!This.bHas){

            const eSpanName=document.createElement("span");
            const eSpanNum=document.createElement("span");
            const eSpanMoney=document.createElement("span");
            const eP=document.createElement("p");

            eSpanName.appendChild(document.createTextNode(This.dragName));
            eP.appendChild(document.createTextNode("产品名:"));
            eP.appendChild(eSpanName);

            eSpanNum.appendChild(document.createTextNode("1"));
            eP.appendChild(document.createTextNode(";数量:"));
            eP.appendChild(eSpanNum);

            eSpanMoney.appendChild(document.createTextNode(`15.5`));
            eP.appendChild(document.createTextNode(";价格:"));
            eP.appendChild(eSpanMoney);

            eP.name=This.dragName;

            eDiv.appendChild(eP)

        }else{
            for(let i=0,length=ePs.length;i<length;i++){

                if(ePs[i].name==This.dragName){

                    const oSpan=ePs[i].getElementsByTagName("span");
                    oSpan[1].innerHTML++;
                    oSpan[2].innerHTML=Number(oSpan[2].innerHTML)+15.5;

                }

            }
        }

    });

};
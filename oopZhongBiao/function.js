function FnClock(oUl){
    this.oUl=oUl;
    this.settings={//Ä¬ÈÏ²ÎÊý
        "borderStyle":"2px solid #000",
        "smallWidth":"2px",
        "smallHeight":"4px",
        "bigWidth":"2px",
        "bigHeight":"8px",
        "hoursWidth":"6px",
        "hoursHeight":"40px",
        "minWidth":"4px",
        "minHeight":"55px",
        "secWidth":"2px",
        "secHeight":"70px",
        "circle":"10px"
    };
}
FnClock.prototype.init= function (opt) {
    this.fnSettings(opt);
    this.fnSetUlStyle();
    this.fnAddLi();
    this.fnStartTime();
};
FnClock.prototype.fnSettings= function (opt) {
    for(var aKey in opt){
        this.settings[aKey]=opt[aKey];
    }
};
FnClock.prototype.fnSetUlStyle= function () {
    this.oUl.style.borderRadius="50%";
    this.oUl.style.border=this.settings.borderStyle;
    this.oUl.style.padding=0;
    this.oUl.style.transformOrigin="100px 100px";
};
FnClock.prototype.fnAddLi= function () {
    var This=this;
    This.oUlWidth=parseInt(This.oUl.fnGetStyle("width"));
    var sLi="";
    for(var i=0;i<60;i++){
        if(i%5==0){
            sLi+="<li style='list-style: none;width: "+This.settings.bigWidth+";height: "+This.settings.bigHeight+";background-color:#000;position: absolute;left: "+This.oUlWidth/2+"px;top: 0;transform: rotate("+i*6+"deg);transform-origin: 0 "+This.oUlWidth/2+"px'></li>";
        }else{
            sLi+="<li style='list-style: none;width: "+This.settings.smallWidth+";height: "+This.settings.smallHeight+";background-color:#000;position: absolute;left: "+This.oUlWidth/2+"px;top: 0;transform: rotate("+i*6+"deg);transform-origin: 0 "+This.oUlWidth/2+"px'></li>";
        }
    }
    This.oUl.innerHTML=sLi;
    This.oUl.innerHTML+="<div id='hours' style='width: "+This.settings.hoursWidth+";height: "+This.settings.hoursHeight+";background-color:#000;position: absolute;left: "+(This.oUlWidth/2-parseInt(This.settings.hoursWidth)/2)+"px;top: "+(This.oUlWidth/2-parseInt(This.settings.hoursHeight))+"px;z-index:3;transform-origin: 0 "+This.settings.hoursHeight+"'></div>";
    This.oUl.innerHTML+="<div id='min' style='width: "+This.settings.minWidth+";height: "+This.settings.minHeight+";background-color:#777;position: absolute;left: "+(This.oUlWidth/2-parseInt(This.settings.minWidth)/2)+"px;top: "+(This.oUlWidth/2-parseInt(This.settings.minHeight))+"px;z-index:2;transform-origin: 0 "+This.settings.minHeight+"'></div>";
    This.oUl.innerHTML+="<div id='sec' style='width: "+This.settings.secWidth+";height: "+This.settings.secHeight+";background-color:#f00;position: absolute;left: "+(This.oUlWidth/2-parseInt(This.settings.secWidth)/2)+"px;top: "+(This.oUlWidth/2-parseInt(This.settings.secHeight))+"px;z-index:1;transform-origin: 0 "+This.settings.secHeight+"'></div>";
    This.oUl.innerHTML+="<div style='width:"+This.settings.circle+";height: "+This.settings.circle+";background-color:#000;border-radius: 50%;position:absolute;left: "+(This.oUlWidth/2-parseInt(This.settings.circle)/2)+"px;top:"+(This.oUlWidth/2-parseInt(This.settings.circle)/2)+"px;z-index: 4'></div>"
};
FnClock.prototype.fnStartTime= function () {
    var oHours=document.getElementById("hours");
    var oMin=document.getElementById("min");
    var oSec=document.getElementById("sec");
    updateDate();
    setInterval(function () {
        updateDate();
    },1000);
    function updateDate(){
        var date=new Date();
        var sec=date.getSeconds();
        var min=date.getMinutes()+sec/60;
        var hours=date.getHours()+min/60;
        oSec.style.transform="rotate("+sec*6+"deg)";
        oMin.style.transform="rotate("+min*6+"deg)";
        oHours.style.transform="rotate("+hours*15+"deg)";
    }
};
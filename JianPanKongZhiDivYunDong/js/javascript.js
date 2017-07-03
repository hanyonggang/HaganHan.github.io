document.onkeydown= function (ev) {
    var oDiv=document.getElementsByTagName('div')[0];
    //↑  38;
    //←  37;
    //→  39;
    //↓  40;
    var oEvent=ev||event;
    if(oEvent.keyCode==39){
        oDiv.style['left']=oDiv.offsetLeft+30+'px'
    }else if(oEvent.keyCode==37){
        oDiv.style['left']=oDiv.offsetLeft-30+'px'
    }else if(oEvent.keyCode==38){
        oDiv.style['top']=oDiv.offsetTop-30+'px'
    }else if(oEvent.keyCode==40){
        oDiv.style['top']=oDiv.offsetTop+30+'px'
    }
};
var aDiv=document.getElementsByTagName('div');
document.onmousemove= function (ev) {
    var oEvent=ev||event;
    var reScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var reScrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
    aDiv[0].style['top']=oEvent.clientY+reScrollTop+'px';
    aDiv[0].style['left']=oEvent.clientX+reScrollLeft+'px'
};
setInterval(function () {
    var i=0;
    for(i=aDiv.length-1;i>0;i--){
        aDiv[i].style['left']=aDiv[i-1].style['left'];
        aDiv[i].style['top']=aDiv[i-1].style['top']
    }
},6);
var aBalls=[];
var co='';
window.onload= function () {
    var bMove=true;
    var oCanvas=document.getElementById('canvas');
    oCanvas.width=1200;
    oCanvas.height=600;
    var oContext=oCanvas.getContext('2d');
    for(var i=0;i<100;i++){
        var R=Math.floor(Math.random()*255);
        var G=Math.floor(Math.random()*255);
        var B=Math.floor(Math.random()*255);
        var r=Math.random()*60+10;
        var oBall={
            x:Math.random()*(oCanvas.width-2*r)+r,
            y:Math.random()*(oCanvas.height-2*r)+r,
            r:r,
            color:'rgb('+R+','+G+','+B+')',
            vx:(Math.random()*5+5)*Math.pow(-1,Math.floor(Math.random()*100)),
            vy:(Math.random()*5+5)*Math.pow(-1,Math.floor(Math.random()*100))
        };
        aBalls[i]=oBall;
    }
    setInterval(function () {
        draw(oContext);
        if(bMove){
            update(oCanvas.width,oCanvas.height)
        }
    },50);
    var oBtn1=document.getElementById('a1');
    var oBtn2=document.getElementById('a2');
    var oBtn3=document.getElementById('a3');
    oBtn1.onclick= function () {
        if(bMove){
            bMove=false;
            this.text='开始运动';
        }else{
            bMove=true;
            this.text='停止运动';
        }
    };
    oBtn2.onclick= function () {
        co=false;
    };
    oBtn3.onclick= function () {
        co=true
    }

};
function draw(cxt) {
    var oCanvas=cxt.canvas;
    cxt.clearRect(0,0,oCanvas.width,oCanvas.height);
    if(co){
        cxt.fillStyle='#000';
        cxt.fillRect(0,0,oCanvas.width,oCanvas.height)
    }
    for(var i=0;i<60;i++){
        cxt.beginPath();
        cxt.arc(aBalls[i].x,aBalls[i].y,aBalls[i].r,0,Math.PI*2);
        cxt.fillStyle=aBalls[i].color;
        cxt.globalCompositeOperation='xor';
        cxt.fill();
        cxt.closePath();
        cxt.elli
    }
}
function update(oCanvasWidth,oCanvasHeight) {
    for(var i=0;i<60;i++){
        aBalls[i].x+=aBalls[i].vx;
        aBalls[i].y+=aBalls[i].vy;
        if(aBalls[i].x<=aBalls[i].r){
            aBalls[i].vx*=-1;
            aBalls[i].x=aBalls[i].r
        }
        if(aBalls[i].x>=oCanvasWidth-aBalls[i].r){
            aBalls[i].vx*=-1;
            aBalls[i].x=oCanvasWidth-aBalls[i].r
        }
        if(aBalls[i].y<=aBalls[i].r){
            aBalls[i].y=aBalls[i].r;
            aBalls[i].vy*=-1;
        }
        if(aBalls[i].y>=oCanvasHeight-aBalls[i].r){
            aBalls[i].y=oCanvasHeight-aBalls[i].r;
            aBalls[i].vy*=-1;
        }
    }
}
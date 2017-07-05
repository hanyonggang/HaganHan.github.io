var windowWidth=1024;
var windowHeight=500;
var r=7;
var timeLeft=70;
var timeTop=100;

//Ŀ��ʱ��
const endTime=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),23,00,00);//ҳ��ûЧ�����޸�����( ��ǰ���,��ǰ�·�-1,��ǰ����,����ʱĿ��Сʱ��,����ʱĿ�������,����ʱĿ������ );

var getSecond=0;
var balls=[];
const colors=['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000'];
window.onload= function () {
    windowHeight=document.documentElement.clientHeight;
    windowWidth=document.documentElement.clientWidth;
    timeLeft=Math.round(windowWidth/6);
    timeTop=Math.round(windowHeight/4);
    r=Math.round(windowWidth*2/3/108)-1;
    var oCanvas=document.getElementById('canvas');
    var oContext=oCanvas.getContext('2d');
    oCanvas.width=windowWidth;
    oCanvas.height=windowHeight;
    getSecond=funGetSecond();
    setInterval(function () {
        upDate();
        ready(oContext);
    },50)
};
function upDate() {
    var nowAllSeconds=funGetSecond();
    var nowHours=parseInt(nowAllSeconds/3600);
    var nowMinutes=parseInt((nowAllSeconds-nowHours*3600)/60);
    var nowSeconds=nowAllSeconds%60;
    var preHours=parseInt(getSecond/3600);
    var preMinutes=parseInt((getSecond-preHours*3600)/60);
    var preSeconds=getSecond%60;
    if(nowSeconds!=preSeconds){
        if(parseInt(nowHours/10)!=parseInt(preHours/10)){
            addBalls(timeLeft+0,timeTop,parseInt(preHours/10))
        }
        if(parseInt(nowHours%10)!=parseInt(preHours%10)){
            addBalls(timeLeft+15*(r+1),parseInt(preHours%10))
        }
        if(parseInt(nowMinutes/10)!=parseInt(preMinutes/10)){
            addBalls(timeLeft+39*(r+1),timeTop,parseInt(preMinutes/10))
        }
        if(parseInt(nowMinutes%10)!=parseInt(preMinutes%10)){
            addBalls(timeLeft+54*(r+1),timeTop,parseInt(preMinutes%10))
        }
        if(parseInt(nowSeconds/10)!=parseInt(preSeconds/10)){
            addBalls(timeLeft+78*(r+1),timeTop,parseInt(preSeconds/10))
        }
        if(parseInt(nowSeconds%10)!=parseInt(preSeconds%10)){
            addBalls(timeLeft+93*(r+1),timeTop,parseInt(preSeconds%10))
        }
        getSecond=nowAllSeconds;
    }
    upDateBalls();
    console.log(balls.length)
}
function upDateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if(balls[i].y>=windowHeight-r){
            balls[i].y=windowHeight-r;
            balls[i].vy*=-0.65;
        }
    }
    var cnt=0;
    for(var p=0;p<balls.length;p++){
        if(balls[p].x+r>0&&balls[p].x-r<windowWidth){
            balls[cnt++]=balls[p];
        }
    }
    while(balls.length>cnt){
        balls.pop()
    }
}
function addBalls(x,y,num) {
    for(var i=0;i<canvasNum[num].length;i++){
        for(var j=0;j<canvasNum[num][i].length;j++){
            if(canvasNum[num][i][j]==1){
                var aBall={
                    x:x+(r+1)+j*2*(r+1),
                    y:y+(r+1)+i*2*(r+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*10))*4,
                    vy:parseInt(Math.random()*10)*-1,
                    color:colors[Math.floor(Math.random()*10)]
                };
                balls.push(aBall)
            }
        }
    }
}
function funGetSecond() {
    var timeIng=new Date();
    var mSecond=endTime.getTime()-timeIng.getTime();
    var second=Math.round(mSecond/1000);
    return second>0?second:0;
}
function ready(ocontext) {
    ocontext.clearRect(0,0,windowWidth,windowHeight);
    var hours=parseInt(getSecond/3600);
    var minutes=parseInt((getSecond-hours*3600)/60);
    var seconds=getSecond%60;
    readyDigit(timeLeft,timeTop,parseInt(hours/10),ocontext);
    readyDigit(timeLeft+15*(r+1),timeTop,parseInt(hours%10),ocontext);
    readyDigit(timeLeft+30*(r+1),timeTop,10,ocontext);
    readyDigit(timeLeft+39*(r+1),timeTop,parseInt(minutes/10),ocontext);
    readyDigit(timeLeft+54*(r+1),timeTop,parseInt(minutes%10),ocontext);
    readyDigit(timeLeft+69*(r+1),timeTop,10,ocontext);
    readyDigit(timeLeft+78*(r+1),timeTop,parseInt(seconds/10),ocontext);
    readyDigit(timeLeft+93*(r+1),timeTop,parseInt(seconds%10),ocontext);

    for(var i=0;i<balls.length;i++){
        ocontext.fillStyle=balls[i].color;
        ocontext.beginPath();
        ocontext.arc(balls[i].x,balls[i].y,r,0,2*Math.PI);
        ocontext.closePath();
        ocontext.fill();
    }
}
function readyDigit(x,y,num,ocontext) {
    ocontext.fillStyle='rgb(0,102,153)';
    for(var i=0;i<canvasNum[num].length;i++){
        for(var j=0;j<canvasNum[num][i].length;j++){
            if(canvasNum[num][i][j]==1){
                ocontext.beginPath();
                ocontext.arc(x+(r+1)+j*2*(r+1),y+(r+1)+i*2*(r+1),r,0,2*Math.PI);
                ocontext.closePath();
                ocontext.fill();
            }
        }
    }
}
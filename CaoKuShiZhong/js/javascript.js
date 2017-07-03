window.onload= function () {
    function getTimeImg() {
        function func(num) {
            if(num<10){
                return '0'+num
            }else{
                return ''+num
            }
        }
        var a=new Date();
        var time= func(a.getHours())+ func(a.getMinutes())+ func(a.getSeconds());
        var timeImg=document.getElementsByClassName('a1')
        var i;
        for(i=0;i<timeImg.length;i++){
            timeImg[i].src='images/'+time.charAt(i)+'.png'
        }
    }
    getTimeImg();
    setInterval(getTimeImg,1000)
};
function aaa() {
    function toChinese(num) {
        switch (num){
            case 0:
                return '星期日';
            case 1:
                return '星期一';
            case 2:
                return '星期二';
            case 3:
                return '星期三';
            case 4:
                return '星期四';
            case 5:
                return '星期五';
            case 6:
                return '星期六';
        }

    }
    var time=new Date();
    alert(time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+toChinese(time.getDay()))
}
aaa();

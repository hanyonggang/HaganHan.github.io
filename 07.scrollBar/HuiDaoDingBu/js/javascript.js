var a=false;
window.onload= function () {
    document.getElementById('btn1').addEventListener('click', function () {
        var reSetInterval=setInterval(function () {
            var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
            var zou=scrolltop-(Math.floor(scrolltop/5));
            a=true;
            document.documentElement.scrollTop=zou;
            document.body.scrollTop=zou;
            if(scrolltop<10){
                clearInterval(reSetInterval)
            }
         },50);
        window.onscroll= function () {
            if(a){

            }else{
                clearInterval(reSetInterval)
            }
            a=false;
        };
        alert(document.documentElement.scrollHeight)
    })

};
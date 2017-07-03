function fun(a) {
    var allUl=document.getElementById('ul'+(a+1));
    var i;
    for(i=1;i<7;i++){
        document.getElementById('ul'+i).style.display='none'
    }
    allUl.style.display='block';
}
document.getElementById('ulFather1').addEventListener('mouseleave', function () {
    for(i=1;i<7;i++){
        document.getElementById('ul'+i).style.display='none'
    }
})
$(document).ready(function() {
    $(window).scroll(function () {
        if ($(window).scrollTop() == 0) {
            $('header li a').removeClass('haing');
            $('header').css('opacity', '1.0');
            $('.li1>a').addClass('haing');
            $('#aside').css('display','none')
        }
        if ($(window).scrollTop() > 0) {
            $('header li a').removeClass('haing');
            $('.li1>a').addClass('haing');
            $('header').css('opacity', '0.8');
            $('#aside').css('display','none')
        }
        if ($(window).scrollTop() > 699) {
            $('header li a').removeClass('haing');
            $('.li2>a').addClass('haing');
            $('#aside').css('display','none')
        }
        if ($(window).scrollTop() > 1899) {
            $('header li a').removeClass('haing');
            $('.li3>a').addClass('haing');
            $('#aside').css('display','block')
        }
        if ($(window).scrollTop() > 3099) {
            $('header li a').removeClass('haing');
            $('.li4>a').addClass('haing');
        }
        if ($(window).scrollTop() > 6340) {
            $('header li a').removeClass('haing');
            $('.li5>a').addClass('haing');
        }
        if ($(window).scrollTop() > 7387) {
            $('header li a').removeClass('haing');
            $('.li6>a').addClass('haing');
        }

    })
});
window.onload= function () {
    var allImg=document.getElementById('box5').getElementsByTagName('img');
    var i=null;
    for(i=2;i<9;i++){
        allImg[i].onmouseenter= function () {
            this.style.opacity='0.7'
        };
        allImg[i].onmouseleave= function () {
            this.style.opacity='1'
        }
    }
};
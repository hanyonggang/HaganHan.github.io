window.onload= function () {
    var txtH2=document.getElementById('txtH2');
    var txtP=document.getElementById('txtP');
    var pnr=[
        '快过年了，大家可以商量着去哪玩吧～',
        '精通JavaScript开发课程 - 结课标准 - 有十条标准可让大家修练成JS高手……',
        '妙味茶馆(bbs.miaov.com)，正式开张，它看起来是论坛，其实是个技术驿站，分成了五个版块：视频教程、妙味生活秀、特效兜儿、技术交流、妙味聊吧',
        '精通各种DOM类应用，熟练掌握面向对象编程思想（OOP）、熟悉JS面向对象开发方式 - 妙味课堂',
        '熟练掌握AJAX技术及相关应用（例如：新浪微博级应用） - 妙味课堂 - www.miaov.com',
        '可以独立写出类似jQuery的小型库（支持各类选择符、事件类、DOM、自定义动画animate、AJAX……） - 妙味课堂',
        '精通JS运动特效技术，能完整实现各类网站所有动画特效，如 妙味课堂 官网 - 妙味课堂',
        '掌握JS调试及优化技术、能兼容所有浏览器 - 妙味课堂',
        '精通JS事件对象及事件的工作机制，并能完成各类跨平台应用模块的开发 - 妙味课堂',
        '能独立开发表现和性能都很优秀的RIA应用 - 妙味课堂',
        '了解后台编程的相关知识，能够和后台工程师配合完成大型交互应用 - 妙味课堂',
        '熟悉正则表达式的编写、应用及高级表单验证技术 - 妙味课堂 - '
    ]
    var allLi=document.getElementsByTagName('ul')[0].getElementsByTagName('li');
    var i;
    for(i=0;i<allLi.length;i++){
        allLi[i].index=i;
        allLi[i].addEventListener('mouseenter', function () {
            var p;
            for(p=0;p<allLi.length;p++){
                allLi[p].className='yichu'
            }
            allLi[this.index].className='yiru';
            txtH2.innerHTML=((this.index)+1)+'月活动'
            txtP.innerHTML=pnr[this.index]
        })
    }
}
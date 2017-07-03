//                                      /*面向对象封装函数*/

//获取元素函数    $( ".div2",oDiv1,"div" )
function $(a, obj, element) {
    if (typeof a === 'string') {
        if (a.charAt(0) == '#') {
            a = a.substring(1, a.length);
            return document.getElementById(a);
        } else if (a.charAt(0) == '.') {
            a = a.substring(1, a.length);
            if (obj) {
                if (!element) {
                    element = "*";
                }
            } else {
                obj = document;
                element = "*";
            }
            const all = obj.getElementsByTagName(element);
            const arr = [];
            for (let i = 0; i < all.length; i++) {
                let aClass = all[i].className.split(" ");
                for (let j = 0; j < aClass.length; j++) {
                    if (aClass[j] == a) {
                        arr.push(all[i]);
                        break;
                    }
                }
            }
            return arr;
        } else {
            if (!obj) {
                obj = document;
            }
            return obj.getElementsByTagName(a)
        }
    }
}
//绑定自定义事件   oAbc.fnAddCustomEvent("fnAlert",fn);
Object.prototype.fnAddCustomEvent = function (event, fn) {
    this.listeners = this.listeners || [];
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
};
//主动触发自定义事件 oAbc.fnFireCustomEvent("fnAlert");
Object.prototype.fnFireCustomEvent = function (event) {
    if (this.listeners[event]) {
        for (let iEv = 0; iEv < this.listeners[event].length; iEv++) {
            this.listeners[event][iEv]();
        }
    }
};
//给文档元素绑定事件 obj.fnAddEvent("click",fn,是否捕获);
Object.prototype.fnAddEvent = function (event, fn, bB) {
    const This = this;
    if (This.addEventListener) {
        bB ? bB = bB : bB = false;
        This.addEventListener(event, fn, bB);
    } else {
        This.attachEvent("on" + event, function () {
            fn.call(This);
        });
    }
};
//给文档元素解除绑定 obj.fnAddEvent("click",fn,是否捕获);
Object.prototype.fnDelEvent = function (event, fn, bB) {
    const This = this;
    if (This.removeEventListener) {
        bB ? bB = bB : bB = false;
        This.removeEventListener(event, fn, bB);
    } else {
        This.detachEvent("on" + event, function () {
            fn.call(This)
        });
    }
};
//绑定transition动画结束事件
Object.prototype.fnAddTransitionEnd = function (fn) {
    this.addEventListener("transitionend", fn, false);
};
//解除绑定transition动画结束事件
Object.prototype.fnDelTransitionEnd = function (fn) {
    this.removeEventListener("transitionend", fn, false);
};
//绑定animation动画结束事件
Object.prototype.fnAddAnimationEnd = function (fn) {
    this.addEventListener("animationend", fn, false);
};
//解除绑定animation动画结束事件
Object.prototype.fnDelAnimationEnd = function (fn) {
    this.removeEventListener("animationend", fn, false);
};
//获取非行间样式   obj.fnGetStyle("width");
Object.prototype.fnGetStyle = function (style) {
    if (this.currentStyle) {//兼容IE
        return this.currentStyle[style]
    } else {//兼容除了IE以外所有浏览器
        return getComputedStyle(this, false)[style]
    }
};
//返回元素到html的top距离   obj.fnGetHtmlTop();
Object.prototype.fnGetHtmlTop = function () {
    let This = this;
    let i = 0;
    while (This) {
        i += This.offsetTop;
        This = This.offsetParent;
    }
    return i;
};
//返回元素到html的left距离  obj.fnGetHtmlLeft();
Object.prototype.fnGetHtmlLeft = function () {
    let This = this;
    let i = 0;
    while (This) {
        i += This.offsetLeft;
        This = This.offsetParent;
    }
    return i;
};
//返回鼠标位于html顶部的Y轴坐标 ev.fnGetMouseY();
Object.prototype.fnGetMouseY = function () {
    var ev = this || event;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return ev.clientY + scrollTop;
};
//返回鼠标位于html顶部的X轴坐标 ev.fnGetMouseX();
Object.prototype.fnGetMouseX = function () {
    var ev = this || event;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return ev.clientX + scrollLeft;
};
//碰撞检测  如果this碰到obj则返回true，否则返回false;  oDiv1.fnCollideCheck(oDiv2);
Object.prototype.fnCollideCheck = function (obj) {
    const t1 = parseInt(this.fnGetTop());
    const b1 = parseInt(this.fnGetTop()) + this.offsetHeight;
    const l1 = parseInt(this.fnGetLeft());
    const r1 = parseInt(this.fnGetLeft()) + this.offsetWidth;
    const t2 = parseInt(obj.fnGetTop());
    const b2 = parseInt(obj.fnGetTop()) + obj.offsetHeight;
    const l2 = parseInt(obj.fnGetLeft());
    const r2 = parseInt(obj.fnGetLeft()) + obj.offsetWidth;
    if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
    } else {
        return false;
    }
};
//返回数组最小值下标与最小值 {"key":2,"value":21};  var fnGetArrMin=[21,43,35,64].fnGetArrMin();
Object.prototype.fnGetArrMin = function () {
    this.value = this[0];
    for (let iArr = 0; iArr < this.length; iArr++) {
        if (this[iArr] < this.value) {
            this.value = this[iArr];
            this.index = iArr;
        }
    }
    return {"key": this.index, "value": this.value};
};
//完美运动框架  oDiv1.fnMovePerfection({"width":200,"height":400});
Object.prototype.fnMovePerfection = function (json, endFn) {
    const This = this;
    clearInterval(This.timer);
    This.timer = setInterval(function () {
        let bBtn = true;
        for (let attr in json) {
            if (typeof json[attr] != typeof fnMovePerfection) {//解决json的原型链链向Object的bug
                let iCur = 0;
                if (attr == 'opacity') {
                    if (Math.round(parseFloat(This.fnGetStyle(attr)) * 100) == 0) {
                        iCur = Math.round(parseFloat(This.fnGetStyle(attr)) * 100);
                    }
                    else {
                        iCur = Math.round(parseFloat(This.fnGetStyle(attr)) * 100) || 100;
                    }
                }
                else {
                    iCur = parseInt(This.fnGetStyle(attr)) || 0;
                }
                let iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    bBtn = false;
                }
                if (attr == 'opacity') {
                    This.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    This.style.opacity = (iCur + iSpeed) / 100;
                }
                else {
                    This.style[attr] = iCur + iSpeed + 'px';
                }
            }
        }
        if (bBtn) {
            clearInterval(This.timer);

            if (endFn) {
                endFn.call(This);
            }
        }
    }, 30);
};
//弹性运动框架  oDiv2.fnMoveElasticity("left",500);
Object.prototype.fnMoveElasticity = function (attr, iTarget, fn) {
    const This = this;
    let iSpeed = 0;
    let style = parseFloat(This.fnGetStyle(attr));//执行之处时的样式数值，用来存续小数
    clearInterval(This.timer);
    This.timer = setInterval(function () {
        iSpeed += (iTarget - style) / 5;//超过目标则减速返回
        iSpeed *= 0.7;//使运动速度逐渐减少
        if (Math.abs(iSpeed) < 1 && Math.abs(iTarget - style)) {
            clearInterval(This.timer);
            This.style[attr] = iTarget + 'px';
            if (fn) {
                fn();
            }
        } else {
            style += iSpeed;
            This.style[attr] = style + 'px'
        }
    }, 30)
};
//返回两点之间距离函数  {"x1":100,"y1":100}.fnDis({"x2":400,"y2":400});
Object.prototype.fnDis = function (json) {
    return parseInt(Math.sqrt((this.x1 - json.x2) * (this.x1 - json.x2) + (this.y1 - json.y2) * (this.y1 - json.y2)));
};
//拖拽运动  oDiv2.fnMoveDrag("bottom",fn);
// 以参数方向为重力方向进行碰撞运动
Object.prototype.fnMoveDrag = function (direction, fn) {

    const This = this;
    let disX = null;
    let disY = null;
    let lastX = 0;
    let lastY = 0;

    function mouseDownFn(ev) {
        var event = ev || event;
        let iSpeedX = 0;
        let iSpeedY = 0;
        disX = event.clientX - This.offsetLeft;
        disY = event.clientY - This.offsetTop;
        clearInterval(This.timer);
        function mouseMoveFn(ev) {
            var event = ev || event;
            const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let l = scrollLeft + event.clientX - disX;
            let t = scrollTop + event.clientY - disY;
            if (l < 0) {
                l = 0;
            } else if (l > document.documentElement.clientWidth - parseInt(This.fnGetStyle('width'))) {
                l = document.documentElement.clientWidth - parseInt(This.fnGetStyle('width'));
            }
            if (t < 0) {
                t = 0;
            } else if (t > document.documentElement.clientHeight - parseInt(This.fnGetStyle('height'))) {
                t = document.documentElement.clientHeight - parseInt(This.fnGetStyle('height'));
            }
            This.style['left'] = l + 'px';
            This.style['top'] = t + 'px';
            iSpeedX = (l - lastX) * 2;
            iSpeedY = (t - lastY) * 2;
            lastX = l;
            lastY = t;
        }

        document.addEventListener("mousemove", mouseMoveFn, false);
        function mouseUpFn() {
            document.removeEventListener("mousemove", mouseMoveFn, false);
            document.removeEventListener("mouseup", mouseUpFn, false);
            if (direction) {
                if (fn) {
                    if (direction == 'top') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'top', fn);
                    } else if (direction == 'bottom') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'bottom', fn);
                    } else if (direction == 'left') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'left', fn);
                    } else if (direction == 'right') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'right', fn);
                    }
                } else {
                    if (direction == 'top') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'top');
                    } else if (direction == 'bottom') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'bottom');
                    } else if (direction == 'left') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'left');
                    } else if (direction == 'right') {
                        This.fnMoveCollide(iSpeedX, iSpeedY, 'right');
                    }
                }
            } else {
                if (fn) {
                    This.fnMoveCollide(iSpeedX, iSpeedY, "", fn);
                } else {
                    This.fnMoveCollide(iSpeedX, iSpeedY);
                }
            }
        }

        document.addEventListener("mouseup", mouseUpFn, false);
        return false;
    }

    This.addEventListener("mousedown", mouseDownFn, false);

};
//碰撞运动  oDiv2.fnMoveCollide(10,10,"bottom");
//当有重力方向时obj会以给定速度向重力方向碰撞运动最终停在碰撞方向上;  如果没有重力方向，obj会以给定速度碰撞运动，终点不确定;
Object.prototype.fnMoveCollide = function (ispeedx, ispeedy, direction, fn) {

    const This = this;
    let iSpeedX = ispeedx;
    let iSpeedY = ispeedy;
    clearInterval(This.timer);
    This.timer = setInterval(function () {
        if (direction) {
            if (direction == 'top') {
                iSpeedY -= 3;
            } else if (direction == 'bottom') {
                iSpeedY += 3;
            } else if (direction == 'left') {
                iSpeedX -= 3;
            } else if (direction == 'right') {
                iSpeedX += 3;
            }
        } else {
            iSpeedX *= 0.99;
            iSpeedY *= 0.99;
        }
        let l = This.offsetLeft + iSpeedX;
        let t = This.offsetTop + iSpeedY;
        if (t > document.documentElement.clientHeight - parseInt(This.fnGetStyle('height'))) {
            iSpeedY *= -0.8;
            iSpeedX *= 0.8;
            t = document.documentElement.clientHeight - parseInt(This.fnGetStyle('height'));
        } else if (t < 0) {
            iSpeedY *= -0.8;
            iSpeedX *= 0.8;
            t = 0;
        }
        if (l > document.documentElement.clientWidth - parseInt(This.fnGetStyle('width'))) {
            iSpeedX *= -0.8;
            iSpeedY *= 0.8;
            l = document.documentElement.clientWidth - parseInt(This.fnGetStyle('width'));
        } else if (l < 0) {
            iSpeedX *= -0.8;
            iSpeedY *= 0.8;
            l = 0;
        }
        if (Math.abs(iSpeedX) < 1) {
            iSpeedX = 0;
        }
        if (Math.abs(iSpeedY) < 1) {
            iSpeedY = 0;
        }
        if (direction) {
            if (direction == 'bottom') {
                if (iSpeedX == 0 && iSpeedY == 0 && t == document.documentElement.clientHeight - parseInt(This.fnGetStyle('height'))) {
                    clearInterval(This.timer);
                    if (fn) {
                        fn();
                    }
                }
            } else if (direction == 'top') {
                if (iSpeedX == 0 && iSpeedY == 0 && t == 0) {
                    clearInterval(This.timer);
                    if (fn) {
                        fn();
                    }
                }
            } else if (direction == 'right') {
                if (iSpeedX == 0 && iSpeedY == 0 && l == document.documentElement.clientWidth - parseInt(This.fnGetStyle('width'))) {
                    clearInterval(This.timer);
                    if (fn) {
                        fn();
                    }
                }
            } else if (direction == 'left') {
                if (iSpeedX == 0 && iSpeedY == 0 && l == 0) {
                    clearInterval(This.timer);
                    if (fn) {
                        fn();
                    }
                }
            }
        } else {
            if (iSpeedX == 0 && iSpeedY == 0) {
                clearInterval(This.timer);
                if (fn) {
                    fn();
                }
            }
        }
        This.style['left'] = l + 'px';
        This.style['top'] = t + 'px';
    }, 30)
};
//抖动封装函数  oDiv1.fnMoveShake("left");
Object.prototype.fnMoveShake = function (style, endFn) {
    const This = this;
    This.arr = [];
    This.num = 0;
    for (let i = 50; i > 0; i -= 2) {
        This.arr.push(i, -i);
    }
    This.arr.push(0);
    clearInterval(This.timer);
    This.timer = setInterval(function () {
        This.style[style] = This.arr[This.num] + parseInt(This.fnGetStyle(style)) + "px";
        This.num++;
        if (This.num == This.arr.length) {
            clearInterval(This.timer);
            endFn && endFn();
        }
    }, 40);
};
//拖拽完执行fn函数  oDiv1.fnDrag(fn);
Object.prototype.fnDrag = function (fn) {
    const This = this;

    function mouseDownFn(ev) {
        var ev = ev || event;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        const iX = ev.clientX + scrollLeft - This.offsetLeft;
        const iY = ev.clientY + scrollTop - This.offsetTop;
        if (This.setCapture) {
            This.setCapture();
        }
        function mouseMoveFn(ev) {
            var ev = ev || event;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            const iMouseX = ev.clientX + scrollLeft;
            const iMouseY = ev.clientY + scrollTop;
            This.style.left = (iMouseX - iX) + "px";
            This.style.top = (iMouseY - iY) + "px";
        }

        document.addEventListener("mousemove", mouseMoveFn, false);
        function mouseUpFn(ev) {
            if (This.releaseCapture) {
                This.releaseCapture();
            }
            if (fn) {
                fn();
            }
            document.removeEventListener("mousemove", mouseMoveFn, false);
            document.removeEventListener("mouseup", mouseUpFn, false);
        }

        document.addEventListener("mouseup", mouseUpFn, false);
        return false;
    }

    This.addEventListener("mousedown", mouseDownFn, false);
};
//拖拽改变obj尺寸  oDiv1.fnDragResize();
Object.prototype.fnDragResize = function () {

    const This = this;

    const size = 16;

    function cursorFn(ev) {
        var ev = ev || event;
        const mouseX = ev.clientX;
        const mouseY = ev.clientY;
        const disLeft = parseInt(This.fnGetLeft());
        const disTop = parseInt(This.fnGetTop());
        const disHeight = This.offsetHeight;
        const disWidth = This.offsetWidth;
        if (mouseX < disLeft + size && mouseX > disLeft || mouseX > disLeft + disWidth - size && mouseX < disWidth + disLeft) {
            This.style.cursor = "w-resize";
        } else if (mouseY < disTop + size && mouseY > disTop || mouseY > disHeight + disTop - size && mouseY < disTop + disHeight) {
            This.style.cursor = "s-resize";
        } else {
            This.style.cursor = "auto";
        }
    }

    document.addEventListener("mousemove", cursorFn, false);
    function mouseDownFn(ev) {
        const mouseX = ev.clientX;
        const mouseY = ev.clientY;
        const disWidth = This.offsetWidth;
        const disHeight = This.offsetHeight;
        const disLeft = parseInt(This.fnGetLeft());
        const disTop = parseInt(This.fnGetTop());
        let bB = null;
        var ev = ev || event;
        if (mouseX > disWidth + disLeft - size) {
            bB = "right";
        } else if (mouseX < disLeft + size) {
            bB = "left";
        } else if (mouseY > disTop + disHeight - size) {
            bB = "bottom";
        } else if (mouseY < disTop + size) {
            bB = "top";
        }
        function mouseMoveFn(ev) {
            var ev = ev || event;
            switch (bB) {
                case "right":
                    This.style.width = disWidth + (ev.clientX - mouseX) + "px";
                    break;
                case "left":
                    This.style.width = disWidth - (ev.clientX - mouseX) + "px";
                    This.style.left = disLeft + (ev.clientX - mouseX) + "px";
                    break;
                case "bottom":
                    This.style.height = disHeight + (ev.clientY - mouseY) + "px";
                    break;
                case "top":
                    This.style.height = disHeight - (ev.clientY - mouseY) + "px";
                    This.style.top = disTop + (ev.clientY - mouseY) + "px";
                    break;
            }
        }

        document.addEventListener("mousemove", mouseMoveFn, false);
        function mouseUpFn(ev) {
            document.removeEventListener("mousemove", mouseMoveFn, false);
            document.addEventListener("mousemove", cursorFn, false);
        }

        document.addEventListener("mouseup", mouseUpFn, false);

        return false;
    }

    This.addEventListener("mousedown", mouseDownFn, false);
};
//获取时间封装函数  var date=new Date().fnGetAllTime();
Object.prototype.fnGetYear = function () {
    return this.getFullYear();
};
Object.prototype.fnGetMonth = function () {
    return this.getMonth() + 1;
};
Object.prototype.fnGetDate = function () {
    return this.getDate();
};
Object.prototype.fnGetDay = function () {
    if (this.getDay() == 0) {
        return "星期日";
    } else if (this.getDay() == 1) {
        return "星期一";
    } else if (this.getDay() == 2) {
        return "星期二"
    } else if (this.getDay() == 3) {
        return "星期三"
    } else if (this.getDay() == 4) {
        return "星期四"
    } else if (this.getDay() == 5) {
        return "星期五"
    } else if (this.getDay() == 6) {
        return "星期六"
    }
};
Object.prototype.fnGetHours = function () {
    return this.getHours();
};
Object.prototype.fnGetMinutes = function () {
    return this.getMinutes();
};
Object.prototype.fnGetSeconds = function () {
    return this.getSeconds();
};
Object.prototype.fnGetTime = function () {
    return this.getTime();
};
Object.prototype.fnGetTime = function () {
    return this.getTime();
};
Object.prototype.fnGetAllTime = function () {
    return this.fnGetYear() + "年" + this.fnGetMonth() + "月" + this.fnGetDate() + "日 " + this.fnGetDay() + " " + this.fnGetHours() + ":" + this.fnGetMinutes() + ":" + this.fnGetSeconds()
};
//倒计时封装函数  var fnCountDown=[2016,6,29,22,30,00].fnCountDown();
//填入数组timeIng([年,月,日,时,分,秒]);  返回数组[天数,时,分,秒];
Object.prototype.fnCountDown = function () {
    const n = this[0];
    const y = this[1];
    const r = this[2];
    const s = this[3];
    const f = this[4];
    const m = this[5];
    const time = new Date();
    const timeIng = new Date(n, y - 1, r, s, f, m);
    const sec = Math.floor((timeIng - time) / 1000);
    const ms = timeIng - time;
    if (ms > 0) {
        return [Math.floor(sec / 86400), Math.floor(sec % 86400 / 3600), Math.floor(sec % 86400 % 3600 / 60), sec % 60];
    } else {
        return [0, 0, 0, 0, 0, 0];
    }
};
//检查是否为纯数字封装函数  var fnCheckNum="43d5d434".fnCheckNum();
//如果为纯数字则返回true;  如果不是纯数字则返回false;
Object.prototype.fnCheckNum = function () {
    for (let i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) < 48 || this.charCodeAt(i) > 57) {
            return false;
        }
    }
    return true;
};
//返回两数字之间的随机整数封装函数  var fnGetRandom=[12,20].fnGetRandom();
Object.prototype.fnGetRandom = function () {
    let x;
    let y;
    if (this[0] > this[1]) {
        x = this[1];
        y = this[0];
    } else {
        x = this[0];
        y = this[1];
    }
    return Math.round(Math.random() * (y - x) + x)
};
//增加class封装函数  obj.fnAddClass( "div2" )
//给obj增加class=div2属性;  引用函数fnArrString();
Object.prototype.fnAddClass = function (cla) {
    const This = this;
    if (This.className == "") {
        This.className = cla;
    } else {
        if (cla != This.className) {
            const arr = This.className.split(" ");
            if (arr.fnArrString(cla) == false) {
                This.className += " " + cla;
            }
        }
    }
};
//判断数组中是否存在字符串方法    如果存在则返回其位置，如果不存在则返回false
Object.prototype.fnArrString = function (str) {
    const arr2 = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] == str) {
            arr2.push(i);
        }
    }
    if (arr2 == []) {
        return false
    } else {
        return arr2;
    }
};
//控制台打印事件对象详细信息  ev.fnGetEvent();
Object.prototype.fnConsoleLogEv = function () {
    var ev = this || event;
    for (let aEv in ev) {
        console.log(aEv + ":" + ev[aEv]);
    }
};
//返回son的top占了par的height样式的百分数0.00~1.00  oPar.fnReturnBFB(oSon,"left");
Object.prototype.fnReturnBFB = function (son, style) {
    const parHeight = parseInt(this.fnGetStyle("height"));
    const parWidth = parseInt(this.fnGetStyle("width"));
    const sonHeight = parseInt(son.fnGetStyle("height"));
    const sonWidth = parseInt(son.fnGetStyle("width"));
    const sonTop = parseInt(son.fnGetStyle("top"));
    const sonLeft = parseInt(son.fnGetStyle("left"));
    switch (style) {
        case "top":
            return parseInt(sonTop / (parHeight - sonHeight) * 100) / 100;
            break;
        case "left":
            return parseInt(sonLeft / (parWidth - sonWidth) * 100) / 100;
    }
};
//给obj增加鼠标滚轮事件  向上滚执行fnUp函数 向下滚执行fnDown函数  document.fnMouseScroll(fnUp,fnDown);
Object.prototype.fnMouseScroll = function (fnUp, fnDown) {
    function mouseWheelFn(ev) {
        var ev = ev || event;
        let bB = true;
        if (ev.wheelDelta) {
            bB = ev.wheelDelta > 0 ? true : false;
        } else {
            bB = ev.detail < 0 ? true : false;
        }
        if (bB) {
            fnUp();
        } else {
            fnDown();
        }
    }

    this.addEventListener("mousewheel", mouseWheelFn, false);
    this.addEventListener("DOMMouseScroll", mouseWheelFn, false);

};
//fnCookie  var fnCookie={"judge":"get/set/del","key":"username","value":"303738305","time":30}.fnCookie();
Object.prototype.fnCookie = function () {
    switch (this.judge) {
        case "get":
            const arr = document.cookie.split('; ');
            for (let i = 0; i < arr.length; i++) {
                const arr2 = arr[i].split('=');
                if (arr2[0] == this.key) {
                    return decodeURI(arr2[1]);
                }
            }
            break;
        case "set":
            const oDate = new Date();
            oDate.setDate(oDate.getDate() + this.time);
            oDate.toGMTString();
            document.cookie = this.key + "=" + encodeURI(this.value) + ";expires=" + oDate;
            break;
        case "del":
            document.cookie = this.key + "=关闭浏览器时清除此cookie;expires=-1";
            break;
    }
};
//点击btn记录user和pass的信息time的天数到本地当前浏览器cookie  oBtn.fnCookieForm(oUsername,oPassword,30);
//当重新打开浏览器时如果曾经存过cookie，那么直接填入表单;
Object.prototype.fnCookieForm = function (user, pass, time) {
    if (fnCookie("get", "user")) {
        user.value = fnCookie("get", "user");
        pass.value = fnCookie("get", "pass");
    }
    function clickFn() {
        fnCookie("set", "user", user.value, time);
        fnCookie("set", "pass", pass.value, time);
    }

    this.addEventListener("click", clickFn, false);
};
//找出字符串中所有数字  返回数组  var a="12abc3d22".fnGetNumInString();
//如果judge存在则返回多位数的数字数组，否则返回一位数的数字数组;
Object.prototype.fnGetNumInString = function (Boolean) {
    if (Boolean) {
        const aArr = [];
        let sNum = "";
        for (let iNum = 0; iNum < this.length; iNum++) {
            if (this.charAt(iNum) < "9" && this.charAt(iNum) > "0") {
                sNum += this.charAt(iNum);
            } else {
                if (sNum) {
                    aArr.push(sNum);
                    sNum = "";
                }
            }
        }
        if (sNum) {
            aArr.push(sNum);
            sNum = "";
        }
        return aArr;
    } else {
        const aArr = [];
        for (let iNum = 0; iNum < this.length; iNum++) {
            if (this.charAt(iNum) < "9" && this.charAt(iNum) > "0") {
                aArr.push(this.charAt(iNum));
            }
        }
        return aArr;
    }
};
//Ajax获取后台数据方法  var fnAjax={"method":"get/post","url":"/login","data":"user=xh&pass=q19","yesFn":function(data){},"noFn":fn}.fnAjax();
Object.prototype.fnAjax = function () {
    const This = this;
    if (!This.method) {
        This.method = "get";
    }
    if (!This.data) {
        This.data = "";
    }
    let ajax = null;
    try {
        ajax = new XMLHttpRequest();
    } catch (e) {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open(This.method, This.url, true);
    if (This.method == "get") {
        ajax.send();
    } else {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(This.data);
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.state == 200) {
                if (This.yesFn) {
                    This.yesFn(ajax.responseText);
                }
            } else {
                This.noFn();
            }
        }
    }
};
//五角星路径状态设置  oContext.fnStarPath(300,100);
Object.prototype.fnStarPath = function (R, r) {
    this.beginPath();
    for (let i = 0; i < 5; i++) {
        this.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R, -Math.sin((18 + i * 72) / 180 * Math.PI) * R);
        this.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r, -Math.sin((54 + i * 72) / 180 * Math.PI) * r);
    }
    this.closePath();
};
//绘制图形  oContext.fnDrawShape(100,100,180,function(o){},function(o){});
//上下文绘图环境.fnDrawShape(x偏移，y偏移，以00点为中心点的旋转角度，beginPath()路径函数closePath(),绘制函数,水平倾斜倍数，垂直倾斜倍数)
Object.prototype.fnDrawShape = function (x, y, rot, funPath, funDraw, sx, sy) {
    this.save();
    this.translate(x, y);
    this.rotate(rot / 180 * Math.PI);
    if (sx && sy) {
        this.setTransform(1, 0, sx, sy, 0, 0);
    }
    funPath(this);
    funDraw(this);
    this.restore();
};
//圆角矩形路径函数  oContext.fnPathRoundRect(500,600,50);
//上下文绘图环境.fnPathRoundRect(圆角矩形宽,圆角矩形高,圆角半径);
Object.prototype.fnPathRoundRect = function (width, height, r) {
    if (r > width / 2) {
        r = width / 2
    }
    if (r > height / 2) {
        r = height / 2
    }
    this.beginPath();
    this.arc(r, r, r, Math.PI, 1.5 * Math.PI, false);
    this.lineTo(width - r, 0);
    this.arc(width - r, r, r, Math.PI * 1.5, Math.PI * 2, false);
    this.lineTo(width, height - r);
    this.arc(width - r, height - r, r, Math.PI * 2, Math.PI * 0.5, false);
    this.lineTo(r, height);
    this.arc(r, height - r, r, Math.PI * 0.5, Math.PI, false);
    this.closePath();
};
//月牙路径函数    oContext.fnPathMoon(500,100);
//上下文绘图环境.fnPathMoon(大圆半径,小圆弧度);
Object.prototype.fnPathMoon = function (R, r) {
    if (r < -R) {
        r = -R + 1;
    }
    this.beginPath();
    this.arc(R - R, R, R, Math.PI * 0.5, Math.PI * 1.5, true);
    this.moveTo(0, 0);
    this.arcTo(R + r, R, 0, R * 2, R * Math.sqrt(R * R + (R + r) * (R + r)) / (R + r));
};
//手指拖拽  oDiv.fnTouchDrag(fn)
Object.prototype.fnTouchDrag = function (fn) {
    const This = this;
    let touchDownX = 0;
    let touchDownY = 0;
    let touchDownUlLeft = 0;
    let touchDownUlTop = 0;
    let nextUlLeft = 0;
    let nextUlTop = 0;
    This.fnAddEvent("touchstart", function fnTouchStart(ev) {
        var ev = ev.changedTouches[0];
        touchDownX = parseInt(ev.pageX);
        touchDownY = parseInt(ev.pageY);
        touchDownUlLeft = parseInt(This.offsetLeft);
        touchDownUlTop = parseInt(This.offsetTop);
        This.fnAddEvent("touchmove", function fnTouchMove(ev) {
            var ev = ev.changedTouches[0];
            nextUlLeft = ev.pageX - touchDownX + touchDownUlLeft;
            nextUlTop = ev.pageY - touchDownY + touchDownUlTop;
            This.style.left = nextUlLeft + "px";
            This.style.top = nextUlTop + "px";
        });
        This.fnAddEvent("touchend", function () {
            This.fnRemoveEvent("touchstart", fnTouchStart);
            This.fnRemoveEvent("touchmove", fnTouchMove);
            if (fn) {
                fn();
            }
        });
    });
};
//判断属性或方法是否在实例中  如果属性或方法不存在则返回0 如果在实例中则返回1 如果在原型中则返回-1；
Object.prototype.fnOopAttr = function (name) {
    const This = this;
    if (name in This) {
        if (This.hasOwnProperty(name)) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
};
//设置移动端viewport所在meta标签样式  oMeta.fnSetMeta();
Object.prototype.fnSetMeta = function () {
    const iScale = 1 / window.devicePixelRatio;
    this.name = "viewport";
    this.content = "initial-scale=" + iScale + ",maximum-scale=" + iScale + ",minimum-scale=" + iScale + ",user-scalable=no,width=device-width,height=device-height";
};
//动态获取1rem的大小
Object.prototype.fnSetRem = function () {
    const This = this;
    const event = "onorientationchange" in window ? "orientationchange" : "resize";

    function updateRem() {
        const windowWidth = document.documentElement.clientWidth;
        This.style.fontSize = windowWidth / 30 + 'px';
    }

    updateRem();

    window.addEventListener(event, function () {
        setTimeout(function () {
            updateRem();
        }, 500);
    });
};
//给Object添加默认的value遍历接口方法1
Object.prototype[Symbol.iterator] = function () {
    const This = this;
    const keys = Object.keys(This);
    let index = 0;
    return {
        "next": function () {
            if (index < keys.length) {
                return {
                    "value": This[keys[index++]],
                    "done": false
                }
            } else {
                return {
                    "value": undefined,
                    "done": true
                }
            }
        }
    }
};
//给Object添加默认的value遍历接口方法2
/*
 Object.prototype[Symbol.iterator]= function* () {
 var This=this;
 var keys=Object.keys(This);
 for(var i=0;i<keys.length;i++){
 yield This[keys[i]];
 }
 };
*/
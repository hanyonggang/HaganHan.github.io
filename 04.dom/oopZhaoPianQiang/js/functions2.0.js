//                                      /*ԭ�ͷ���*/

//���Զ����¼�   oAbc.fnAddCustomEvent("fnAlert",fn);
Object.prototype.fnAddCustomEvent = function (event, fn) {
    this.listeners = this.listeners || [];
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
};
//���������Զ����¼� oAbc.fnFireCustomEvent("fnAlert");
Object.prototype.fnFireCustomEvent = function (event) {
    if (this.listeners[event]) {
        for (var iEv = 0; iEv < this.listeners[event].length; iEv++) {
            this.listeners[event][iEv]();
        }
    }
};
//���ĵ�Ԫ�ذ��¼� obj.fnAddEvent("click",fn);
Object.prototype.fnAddEvent = function (event, fn) {
    if (this.addEventListener) {
        this.addEventListener(event, fn, false);
    } else {
        this.attachEvent("on" + event, fn);
    }
};
//��ȡ���м���ʽ   obj.fnGetStyle("width");
Object.prototype.fnGetStyle = function (style) {
    if (this.currentStyle) {//����IE
        return this.currentStyle[style]
    } else {//���ݳ���IE�������������
        return getComputedStyle(this, false)[style]
    }
};
//����Ԫ�ص�html��top����   obj.fnGetTop();
Object.prototype.fnGetTop = function () {
    var This = this;
    var i = 0;
    while (This) {
        i += This.offsetTop;
        This = This.offsetParent;
    }
    return i;
};
//����Ԫ�ص�html��left����  obj.fnGetLeft();
Object.prototype.fnGetLeft = function () {
    var This = this;
    var i = 0;
    while (This) {
        i += This.offsetLeft;
        This = This.offsetParent;
    }
    return i;
};
//�������λ��html������Y������ obj.fnGetMouseY();
Object.prototype.fnGetMouseY = function () {
    var ev = this || event;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return ev.clientY + scrollTop;
};
//�������λ��html������X������ ev.fnGetMouseX();
Object.prototype.fnGetMouseX = function () {
    var ev = this || event;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return ev.clientX + scrollLeft;
};
//��ײ���  ���this����obj�򷵻�true�����򷵻�false;
Object.prototype.fnCollideCheck = function (obj) {
    var t1 = parseInt(this.fnGetTop());
    var b1 = parseInt(this.fnGetTop()) + this.offsetHeight;
    var l1 = parseInt(this.fnGetLeft());
    var r1 = parseInt(this.fnGetLeft()) + this.offsetWidth;
    var t2 = parseInt(obj.fnGetTop());
    var b2 = parseInt(obj.fnGetTop()) + obj.offsetHeight;
    var l2 = parseInt(obj.fnGetLeft());
    var r2 = parseInt(obj.fnGetLeft()) + obj.offsetWidth;
    if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
    } else {
        return false;
    }
};
//����һ��json:������Сֵ����Сֵ�±� {"key":2,"value":21};
Object.prototype.fnGetArrMin = function () {
    this.value = this[0];
    for (var iArr = 0; iArr < this.length; iArr++) {
        if (this[iArr] < this.value) {
            this.value = this[iArr];
            this.index = iArr;
        }
    }
    return {"key": this.index, "value": this.value};
};

//                                      /*��װ����*/

/*
Ajax��ȡ��̨���ݷ���
fnAjax({ "method":"get","url":"1.txt","data":"abc","yesFn":function( ��̨��ȡ��������data ){
    alert(data);
},"noFn": function () {
    alert("��ȡʧ��");
}});
 */
function fnAjax(json) {
    if (!json.method) {
        json.method = "get";
    }
    if (!json.data) {
        json.data = "";
    }
    var ajax = null;
    try {
        ajax = new XMLHttpRequest();
    } catch (e) {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open(json.method, json.url, true);
    if (json.method == "get") {
        ajax.send();
    } else {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(json.data);
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.state == 200) {
                if (json.yesFn) {
                    json.yesFn(ajax.responseText);
                }
            } else {
                json.noFn();
            }
        }
    }
}
//��������֮����뺯��  fnDis(100,100,500,500)
function fnDis(x1, y1, x2, y2) {
    return parseInt(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
}
//�����˶����
function fnMovePerfection(obj, json, endFn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bBtn = true;
        for (var attr in json) {
            if (typeof json[attr] !=typeof fnMovePerfection) {//���json��ԭ��������Object��bug
                var iCur = 0;
                if (attr == 'opacity') {
                    if (Math.round(parseFloat(obj.fnGetStyle( attr)) * 100) == 0) {
                        iCur = Math.round(parseFloat(obj.fnGetStyle( attr)) * 100);
                    }
                    else {
                        iCur = Math.round(parseFloat(obj.fnGetStyle( attr)) * 100) || 100;
                    }
                }
                else {
                    iCur = parseInt(obj.fnGetStyle(attr)) || 0;
                }
                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    bBtn = false;
                }
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;
                }
                else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
        }
        if (bBtn) {
            clearInterval(obj.timer);

            if (endFn) {
                endFn.call(obj);
            }
        }
    }, 30);
}
//�����˶����
function fnMoveElasticity(obj, attr, iTarget, fn) {
    var iSpeed = 0;
    var style = parseFloat(obj.fnGetStyle(attr));//ִ��֮��ʱ����ʽ��ֵ����������С��
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        iSpeed += (iTarget - style) / 5;//����Ŀ������ٷ���
        iSpeed *= 0.7;//ʹ�˶��ٶ��𽥼���
        if (Math.abs(iSpeed) < 1 && Math.abs(iTarget - style)) {
            clearInterval(obj.timer);
            obj.style[attr] = iTarget + 'px';
            if (fn) {
                fn();
            }
        } else {
            style += iSpeed;
            obj.style[attr] = style + 'px'
        }
    }, 30)
}
//��ק�˶�      fnMoveDrag(obj,'bottom')      //���û��Collision������ֻ����ͨ����ק�˶�
//�����Collision���������Բ�������Ϊ�������������ײ�˶�
function fnMoveDrag(obj, Collision, fn) {
    var disX = null;
    var disY = null;
    var lastX = 0;
    var lastY = 0;

    function mouseDownFn(ev) {
        var event = ev || event;
        var iSpeedX = 0;
        var iSpeedY = 0;
        disX = event.clientX - obj.offsetLeft;
        disY = event.clientY - obj.offsetTop;
        clearInterval(obj.timer);
        function mouseMoveFn(ev) {
            var event = ev || event;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var l = scrollLeft + event.clientX - disX;
            var t = scrollTop + event.clientY - disY;
            if (l < 0) {
                l = 0;
            } else if (l > document.documentElement.clientWidth - parseInt(obj.fnGetStyle('width'))) {
                l = document.documentElement.clientWidth - parseInt(obj.fnGetStyle('width'));
            }
            if (t < 0) {
                t = 0;
            } else if (t > document.documentElement.clientHeight - parseInt(obj.fnGetStyle('height'))) {
                t = document.documentElement.clientHeight - parseInt(obj.fnGetStyle('height'));
            }
            obj.style['left'] = l + 'px';
            obj.style['top'] = t + 'px';
            iSpeedX = (l - lastX) * 2;
            iSpeedY = (t - lastY) * 2;
            lastX = l;
            lastY = t;
            document.title = 'X:' + iSpeedX + 'Y' + iSpeedY;
        }

        document.addEventListener("mousemove", mouseMoveFn, false);
        function mouseUpFn() {
            document.removeEventListener("mousemove", mouseMoveFn, false);
            document.removeEventListener("mouseup", mouseUpFn, false);
            if (Collision) {
                if (fn) {
                    if (Collision == 'top') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'top', fn);
                    } else if (Collision == 'bottom') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'bottom', fn);
                    } else if (Collision == 'left') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'left', fn);
                    } else if (Collision == 'right') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'right', fn);
                    }
                } else {
                    if (Collision == 'top') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'top');
                    } else if (Collision == 'bottom') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'bottom');
                    } else if (Collision == 'left') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'left');
                    } else if (Collision == 'right') {
                        startCollisionMove(obj, iSpeedX, iSpeedY, 'right');
                    }
                }
            } else {
                if (fn) {
                    startCollisionMove(obj, iSpeedX, iSpeedY, "", fn);
                } else {
                    startCollisionMove(obj, iSpeedX, iSpeedY);
                }
            }
        }

        document.addEventListener("mouseup", mouseUpFn, false);
        return false;
    }

    obj.addEventListener("mousedown", mouseDownFn, false);

}
//��ײ�˶�      fnMoveCollide(obj,10,10,'bottom')
//������������ʱobj���Ը����ٶ�������������ײ�˶�����ͣ����ײ������;
//���û����������obj���Ը����ٶ���ײ�˶����յ㲻ȷ��
function fnMoveCollide(obj, ispeedx, ispeedy, direction, fn) {
    var iSpeedX = ispeedx;
    var iSpeedY = ispeedy;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
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
        var l = obj.offsetLeft + iSpeedX;
        var t = obj.offsetTop + iSpeedY;
        if (t > document.documentElement.clientHeight - parseInt(obj.fnGetStyle('height'))) {
            iSpeedY *= -0.8;
            iSpeedX *= 0.8;
            t = document.documentElement.clientHeight - parseInt(obj.fnGetStyle('height'));
        } else if (t < 0) {
            iSpeedY *= -0.8;
            iSpeedX *= 0.8;
            t = 0;
        }
        if (l > document.documentElement.clientWidth - parseInt(obj.fnGetStyle('width'))) {
            iSpeedX *= -0.8;
            iSpeedY *= 0.8;
            l = document.documentElement.clientWidth - parseInt(obj.fnGetStyle('width'));
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
                if (iSpeedX == 0 && iSpeedY == 0 && t == document.documentElement.clientHeight - parseInt(obj.fnGetStyle('height'))) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            } else if (direction == 'top') {
                if (iSpeedX == 0 && iSpeedY == 0 && t == 0) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            } else if (direction == 'right') {
                if (iSpeedX == 0 && iSpeedY == 0 && l == document.documentElement.clientWidth - parseInt(obj.fnGetStyle('width'))) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            } else if (direction == 'left') {
                if (iSpeedX == 0 && iSpeedY == 0 && l == 0) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            }
        } else {
            if (iSpeedX == 0 && iSpeedY == 0) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }
        obj.style['left'] = l + 'px';
        obj.style['top'] = t + 'px';
    }, 30)
}
//������װ����
function fnMoveShake(obj, style, endFn) {
    obj.arr = [];
    obj.num = 0;
    for (var i = 50; i > 0; i -= 2) {
        obj.arr.push(i, -i);
    }
    obj.arr.push(0);
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        obj.style[style] = obj.arr[obj.num] + parseInt(obj.fnGetStyle(style)) + "px";
        obj.num++;
        if (obj.num == obj.arr.length) {
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 40)
}
//��ק��ִ��fn����
function fnDrag(obj, fn) {
    function mouseDownFn(ev) {
        var ev = ev || event;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        var iX = ev.clientX + scrollLeft - obj.offsetLeft;
        var iY = ev.clientY + scrollTop - obj.offsetTop;
        if (obj.setCapture) {
            obj.setCapture();
        }
        function mouseMoveFn(ev) {
            var ev = ev || event;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var iMouseX = ev.clientX + scrollLeft;
            var iMouseY = ev.clientY + scrollTop;
            obj.style.left = (iMouseX - iX) + "px";
            obj.style.top = (iMouseY - iY) + "px";
        }

        document.addEventListener("mousemove", mouseMoveFn, false);
        function mouseUpFn(ev) {
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
            document.removeEventListener("mousemove", mouseMoveFn, false);
            if (fn) {
                fn();
            }
        }

        document.addEventListener("mouseup", mouseUpFn, false);
        return false;
    }

    obj.addEventListener("mousedown", mouseDownFn, false);
}
//��ק�ı�obj�ߴ�
function fnDragResize(obj) {
    var size = 16;

    function cursorFn(ev) {
        var ev = ev || event;
        var mouseX = ev.clientX;
        var mouseY = ev.clientY;
        var disLeft = parseInt(obj.fnGetLeft());
        var disTop = parseInt(obj.fnGetTop());
        var disHeight = obj.offsetHeight;
        var disWidth = obj.offsetWidth;
        if (mouseX < disLeft + size && mouseX > disLeft || mouseX > disLeft + disWidth - size && mouseX < disWidth + disLeft) {
            obj.style.cursor = "w-resize";
        } else if (mouseY < disTop + size && mouseY > disTop || mouseY > disHeight + disTop - size && mouseY < disTop + disHeight) {
            obj.style.cursor = "s-resize";
        } else {
            obj.style.cursor = "auto";
        }
    }

    document.addEventListener("mousemove", cursorFn, false);
    function mouseDownFn(ev) {
        var mouseX = ev.clientX;
        var mouseY = ev.clientY;
        var disWidth = obj.offsetWidth;
        var disHeight = obj.offsetHeight;
        var disLeft = parseInt(obj.fnGetLeft());
        var disTop = parseInt(obj.fnGetTop());
        var bB = null;
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
                    obj.style.width = disWidth + (ev.clientX - mouseX) + "px";
                    break;
                case "left":
                    obj.style.width = disWidth - (ev.clientX - mouseX) + "px";
                    obj.style.left = disLeft + (ev.clientX - mouseX) + "px";
                    break;
                case "bottom":
                    obj.style.height = disHeight + (ev.clientY - mouseY) + "px";
                    break;
                case "top":
                    obj.style.height = disHeight - (ev.clientY - mouseY) + "px";
                    obj.style.top = disTop + (ev.clientY - mouseY) + "px";
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

    obj.addEventListener("mousedown", mouseDownFn, false);


}
//�����·��״̬����
function fnStarPath(cxt, R, r) {
    cxt.beginPath();
    for (var i = 0; i < 5; i++) {
        cxt.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R, -Math.sin((18 + i * 72) / 180 * Math.PI) * R);
        cxt.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r, -Math.sin((54 + i * 72) / 180 * Math.PI) * r);
    }
    cxt.closePath();
}
//����ͼ�� fnDrawShape(oContext,100,100,180,function(o){},function(o){})
//fnDrawShape(�����Ļ�ͼ������xƫ�ƣ�yƫ�ƣ���00��Ϊ���ĵ����ת�Ƕȣ�beginPath()·������closePath(),���ƺ���,ˮƽ��б��������ֱ��б����)
function fnDrawShape(cxt, x, y, rot, funPath, funDraw, sx, sy) {
    cxt.save();
    cxt.translate(x, y);
    cxt.rotate(rot / 180 * Math.PI);
    if (sx && sy) {
        cxt.setTransform(1, 0, sx, sy, 0, 0);
    }
    funPath(cxt);
    funDraw(cxt);
    cxt.restore();
}
//Բ�Ǿ���·������  fnPathRoundRect(oContext,500,600,50);
//fnPathRoundRect(�����Ļ�ͼ����,Բ�Ǿ��ο�,Բ�Ǿ��θ�,Բ�ǰ뾶)
function fnPathRoundRect(cxt, width, height, r) {
    if (r > width / 2) {
        r = width / 2
    }
    if (r > height / 2) {
        r = height / 2
    }
    cxt.beginPath();
    cxt.arc(r, r, r, Math.PI, 1.5 * Math.PI, false);
    cxt.lineTo(width - r, 0);
    cxt.arc(width - r, r, r, Math.PI * 1.5, Math.PI * 2, false);
    cxt.lineTo(width, height - r);
    cxt.arc(width - r, height - r, r, Math.PI * 2, Math.PI * 0.5, false);
    cxt.lineTo(r, height);
    cxt.arc(r, height - r, r, Math.PI * 0.5, Math.PI, false);
    cxt.closePath();
}
//����·������    fnPathMoon(oContext,500,100)
//pathMoon(�����Ļ�ͼ����,��Բ�뾶,СԲ����)
function fnPathMoon(cxt, R, r) {
    if (r < -R) {
        r = -R + 1;
    }
    cxt.beginPath();
    cxt.arc(R - R, R, R, Math.PI * 0.5, Math.PI * 1.5, true);
    cxt.moveTo(0, 0);
    cxt.arcTo(R + r, R, 0, R * 2, R * Math.sqrt(R * R + (R + r) * (R + r)) / (R + r));
}
//��ȡʱ���װ����
function fnGetYear() {
    return new Date().getFullYear();
}
function fnGetMonth() {
    return new Date().getMonth() + 1;
}
function fnGetDate() {
    return new Date().getDate();
}
function fnGetDay() {
    var date = new Date();
    if (date.getDay() == 0) {
        return "������";
    } else if (date.getDay() == 1) {
        return "����һ";
    } else if (date.getDay() == 2) {
        return "���ڶ�"
    } else if (date.getDay() == 3) {
        return "������"
    } else if (date.getDay() == 4) {
        return "������"
    } else if (date.getDay() == 5) {
        return "������"
    } else if (date.getDay() == 6) {
        return "������"
    }
}
function fnGetHours() {
    return new Date().getHours();
}
function fnGetMinutes() {
    return new Date().getMinutes();
}
function fnGetSeconds() {
    return new Date().getSeconds();
}
function fnGetTime() {
    return fnGetYear() + "��" + getMonth() + "��" + getDate() + "�� " + getDay() + " " + getHours() + ":" + getMinutes() + ":" + getSeconds()
}
//����ʱ��װ����       ��������timeIng([��,��,��,ʱ,��,��])       ��������[����,ʱ,��,��]
function fnTimeIng(arr) {
    var n = arr[0];
    var y = arr[1];
    var r = arr[2];
    var s = arr[3];
    var f = arr[4];
    var m = arr[5];
    var time = new Date();
    var timeIng = new Date(n, y - 1, r, s, f, m);
    var sec = Math.floor((timeIng - time) / 1000);
    if (ms > 0) {
        return [Math.floor(sec / 86400), Math.floor(sec % 86400 / 3600), Math.floor(sec % 86400 % 3600 / 60), sec % 60];
    } else {
        return [0, 0, 0, 0, 0, 0];
    }
}
//����Ƿ�Ϊ�����ַ�װ����
function fnCheckNum(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
            return alert("�Ǵ�����")
        }
    }
    return str;
}
//����������֮������������װ����
function fnGetRandom(a, b) {
    var x;
    var y;
    if (a > b) {
        x = b;
        y = a;
    } else {
        x = a;
        y = b;
    }
    return Math.round(Math.random() * (y - x) + x)
}
//��ȡԪ�غ���    fnGetObject( ".div2",oDiv1,"div" )
function fnGetObject(a, obj, element) {
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
            var all = obj.getElementsByTagName(element);
            var arr = [];
            for (var i = 0; i < all.length; i++) {
                var aClass = all[i].className.split(" ");
                for (var j = 0; j < aClass.length; j++) {
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
//��ȡclassԪ�ط�װ����     fnGetClass( "div1","oDiv1","li" )
function fnGetClass(name, obj, element) {
    if (obj) {
        if (!element) {
            element = "*";
        }
    } else {
        obj = document;
        element = "*";
    }
    var all = obj.getElementsByTagName(element);
    var arr = [];
    for (var i = 0; i < all.length; i++) {
        var aClassName = all[i].className.split(" ");
        for (var p = 0; p < aClassName.length; p++) {
            if (aClassName[p] == name) {
                arr.push(all[i]);
                break;
            }
        }
    }
    return arr;
}
//����class��װ����   fnAddClass( oDiv1,"div2" )    ��oDiv1����class=div2����
//���ú���fnArrString()
function fnAddClass(obj, cla) {
    if (obj.className == "") {
        obj.className = cla;
    } else {
        var arr = obj.className.split(" ");
        if (fnArrString(arr, cla) == false) {
            obj.className += " " + cla;
        }
    }
}
//�ж��������Ƿ�����ַ�������    ��������򷵻���λ�ã�����������򷵻�false
function fnArrString(arr, str) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == str) {
            arr2.push(i);
        }
    }
    if (arr2 == []) {
        return false
    } else {
        return arr2;
    }
}
//����̨��ӡ�¼�������ϸ��Ϣ
function fnGetEvent(ev) {
    var ev = ev || event;
    for (var aEv in ev) {
        console.log(aEv + ":" + ev[aEv]);
    }
}
//�󶨶���¼�����������˭��,ʲô�¼�,����,�Ƿ񲶻�
function fnAddListener(obj, listen, fn, bB) {
    if (obj.addEventListener) {
        obj.addEventListener(listen, fn, bB);
    } else {
        obj.attachEvent("on" + listen, function () {
            fn.call(obj)
        });
    }
}
//����son��style��ʽռ��par��style��ʽ�İٷ���0.00~1.00��
function fnReturnBFB(par, son, style) {
    var parHeight = parseInt(par.fnGetStyle("height"));
    var parWidth = parseInt(par.fnGetStyle("width"));
    var sonHeight = parseInt(son.fnGetStyle("height"));
    var sonWidth = parseInt(son.fnGetStyle("width"));
    var sonTop = parseInt(son.fnGetStyle("top"));
    var sonLeft = parseInt(son.fnGetStyle("left"));
    switch (style) {
        case "top":
            return parseInt(sonTop / (parHeight - sonHeight) * 100) / 100;
            break;
        case "left":
            return parseInt(sonLeft / (parWidth - sonWidth) * 100 / 100);
    }
}
//��obj�����������¼�  ���Ϲ�ִ��fnUp���� ���¹�ִ��fnDown����
function fnAddScrollSJ(obj, fnUp, fnDown) {
    function mouseWheelFn(ev) {
        var ev = ev || event;
        var bB = true;
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

    obj.addEventListener("mousewheel", mouseWheelFn, false);
    obj.addEventListener("DOMMouseScroll", mouseWheelFn, false);

}
//�Զ��������(��������,��������Χ,������)
//obj�ĸ��������ж�λ obj�����ж�λ par�����ж�λ son�����ж�λ �����ж�λ��Ԫ�ر����top��leftֵ
function fnScrollGDT(obj, par, son) {

    //���û�����ʽ;
    var speed = 100;
    var objPar = obj.parentNode;
    objPar.viweHeight = objPar.clientHeight;
    son.style.cursor = "pointer";
    obj.height = parseInt(obj.fnGetStyle("height")) || obj.offsetHeight;
    par.height = parseInt(par.fnGetStyle("height")) || par.offsetHeight;
    son.style.height = parseInt(objPar.viweHeight * par.height / obj.height) + "px";

    //�����������¼�
    son.height = parseInt(son.fnGetStyle("height"));
    fnAddScrollSJ(objPar, function (ev) {
        obj.top = parseInt(obj.fnGetStyle("top"));
        son.top = parseInt(son.fnGetStyle("top"));
        if (obj.top < 0 && obj.top >= -(obj.height - objPar.viweHeight)) {
            obj.top += speed;
        }
        if (obj.top > 0) {
            obj.top = 0;
        } else if (obj.top < -(obj.height - objPar.viweHeight)) {
            obj.top = -(obj.height - objPar.viweHeight);
        }
        obj.style.top = obj.top + "px";
        son.style.top = obj.top * (par.height - son.height) / -(obj.height - objPar.viweHeight) + "px";
    }, function (ev) {
        obj.top = parseInt(obj.fnGetStyle("top"));
        son.top = parseInt(son.fnGetStyle("top"));
        if (obj.top <= 0 && obj.top > -(obj.height - objPar.viweHeight)) {
            obj.top -= speed;
        }
        if (obj.top > 0) {
            obj.top = 0;
        } else if (obj.top < -(obj.height - objPar.viweHeight)) {
            obj.top = -(obj.height - objPar.viweHeight);
        }
        obj.style.top = obj.top + "px";
        son.style.top = obj.top * (par.height - son.height) / -(obj.height - objPar.viweHeight) + "px";
    });

    //������갴����ק�¼�
    son.addEventListener("mousedown", function (ev) {
        var ev = ev || event;
        var mouseY = ev.clientY;
        obj.top = parseInt(obj.fnGetStyle("top"));
        son.top = parseInt(son.fnGetStyle("top"));
        son.height = parseInt(son.fnGetStyle("height"));

        //���IE��ק������ʱѡ�����ֵ�bug
        if (son.setCapture) {
            son.setCapture();//����ȫ�ֲ���
        }

        function fn1(ev) {
            var ev = ev || event;
            var targetTop = son.top + (ev.clientY - mouseY);
            if (targetTop >= 0 && targetTop <= par.height - son.height) {
                son.style.top = targetTop + "px";
                obj.style.top = -((obj.height - objPar.viweHeight) * fnReturnBFB(par, son, "top")) + "px";
            } else if (targetTop < 0) {
                son.style.top = 0;
                obj.style.top = -((obj.height - objPar.viweHeight) * fnReturnBFB(par, son, "top")) + "px";
            } else if (targetTop > par.height - son.height) {
                son.style.top = par.height - son.height + "px";
                obj.style.top = -((obj.height - objPar.viweHeight) * fnReturnBFB(par, son, "top")) + "px";
            }
            return false;
        }

        document.addEventListener("mousemove", fn1, false);
        document.addEventListener("mouseup", function () {

            //���IE��ק������ʱѡ�����ֵ�bug
            if (son.releaseCapture) {
                son.releaseCapture();//�ر�ȫ�ֲ���
            }

            document.removeEventListener("mousemove", fn1, false);
            return false;
        }, false);
        return false;
    }, false);
}
//fnCookie  fnCookie("get/set/del","user","q303738305","19940919",30);
function fnCookie(judge, key, value, num) {
    switch (judge) {
        case "get":
            var arr = document.cookie.split('; ');
            var i = 0;
            for (i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == key) {
                    return decodeURI(arr2[1]);
                }
            }
            break;
        case "set":
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + num);
            oDate.toGMTString();
            document.cookie = key + "=" + encodeURI(value) + ";expires=" + oDate;
            break;
        case "del":
            document.cookie = key + "=1;expires=-1";
            break;
    }
}
//���btn��¼user��pass����Ϣnum�����������ص�ǰ�����cookie;
//�����´������ʱ����������cookie����ôֱ�������;
function fnCookieForm(user, pass, btn, num) {
    if (fnCookie("get", "user")) {
        user.value = fnCookie("get", "user");
        pass.value = fnCookie("get", "pass");
    }
    function clickFn() {
        fnCookie("set", "user", user.value, num);
        fnCookie("set", "pass", pass.value, num);
    }

    btn.addEventListener("click", clickFn, false);
}
//�ҳ��ַ�������������    ��������;
//���judge�����򷵻ض�λ�����������飬���򷵻�һλ������������;
function fnGetNumInString(sString, judge) {
    if (judge) {
        var aArr = [];
        var sNum = "";
        for (var iNum = 0; iNum < sString.length; iNum++) {
            if (sString.charAt(iNum) < "9" && sString.charAt(iNum) > "0") {
                sNum += sString.charAt(iNum);
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
        var aArr = [];
        for (var iNum = 0; iNum < sString.length; iNum++) {
            if (sString.charAt(iNum) < "9" && sString.charAt(iNum) > "0") {
                aArr.push(sString.charAt(iNum));
            }
        }
        return aArr;
    }
}
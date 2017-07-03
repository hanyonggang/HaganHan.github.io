const hagan = {//根据设备判断touch或者click

    jInfo: {//所有的依赖信息
        rem: Number,//存着html标签上的字体大小
        jTimer: {},//存着模拟定时器的执行序列
        jEvent: {},//存着所有元素id绑定的事件函数
        jMouseWheel: {},//存着所有绑定的滚轮事件
        jTouchInfo: {},//touch事件封装所需的必要属性
    },

    //绑定对象的事件函数  hagan.fnAddEvent(eBtn,"click",function fnAlert1(){});  !IE10
    fnAddEvent(oElement, sEvent, fn, bCapture = false) {
        const This = this;
        if (oElement === window) {
            oElement.id = "window"
        }
        if (!oElement.id) {
            console.error(`<${oElement.nodeName.toLocaleLowerCase()}>.id cannot is null`);
        }
        sEvent = This.fnJudgeUaGetEventName(sEvent);
        if (!fn.name) {
            console.error("fn.name cannot is null");
        }
        if (!this.jInfo.jEvent[oElement.id]) {
            this.jInfo.jEvent[oElement.id] = {}
        }
        this.jInfo.jEvent[oElement.id][fn.name] = {"sEvent": sEvent, "fnMethod": fn};
        this.jInfo.jEvent[oElement.id].oElement = oElement;
        if (oElement.nodeType === 1 || oElement === window) {
            if (sEvent === "touch") {
                This.fnTouch(oElement, fn, bCapture);
            } else {
                oElement.addEventListener(sEvent, this.jInfo.jEvent[oElement.id][fn.name].fnMethod, bCapture);
            }
        }
    },

    //根据当前设备类型返回对应事件名称
    fnJudgeUaGetEventName(sEvent){

        const This = this;
        let sResult;

        function fnGetMobileDeviceEventName() {

            switch (sEvent) {
                case "mousedown":
                    sResult = "touchstart";
                    break;
                case "mousemove":
                    sResult = "touchmove";
                    break;
                case "mouseup":
                    sResult = "touchend";
                    break;
                case "click":
                    sResult = "touch";

                    break;
                default :
                    sResult = sEvent;
                    break;
            }
            return sResult;
        }

        This.fnJudgeUa({
            fnAndroid(){
                fnGetMobileDeviceEventName();
            },
            fnIos(){
                fnGetMobileDeviceEventName();
            },
            fnPc(){
                switch (sEvent) {
                    case "touchstart":
                        sResult = "mousedown";
                        break;
                    case "touchmove":
                        sResult = "mousemove";
                        break;
                    case "touchend":
                        sResult = "mouseup";
                        break;
                    case "touch":
                        sResult = "click";
                        break;
                    default :
                        sResult = sEvent;
                        break;
                }
                return sResult;
            }
        });

        return sResult;

    },

    //touch事件封装
    fnTouch(oElement, fn, bCapture = false) {

        let bFn;

        const fnTouchMove = function () {
            bFn = false;
        };
        const fnTouchEnd = function () {
            if (bFn) {
                fn.call(oElement);
            }
            oElement.removeEventListener("touchmove", fnTouchMove, bCapture);
            oElement.removeEventListener("touchend", fnTouchEnd, bCapture);
        };
        const fnTouchStart = function () {

            bFn = true;

            oElement.addEventListener("touchmove", fnTouchMove, bCapture);
            oElement.addEventListener("touchend", fnTouchEnd, bCapture);

        };

        oElement.addEventListener("touchstart", fnTouchStart, bCapture);

        if (!this.jInfo.jTouchInfo[oElement.id]) {
            this.jInfo.jTouchInfo[oElement.id] = {}
        }
        this.jInfo.jTouchInfo[oElement.id][fn.name] = {"sEvent": "touch", "fnMethod": fnTouchStart};

    },

    //解除对象的事件函数绑定  hagan.fnRemoveEvent(eBtn,"click","fnAlert1");  !IE10
    fnRemoveEvent(oElement, sEvent, sFnName, bCapture = false) {
        const This = this;
        sEvent = This.fnJudgeUaGetEventName(sEvent);
        try {
            if (oElement.nodeType === 1 || oElement === window) {
                if (sEvent === "touch") {
                    oElement.removeEventListener("touchstart", This.jInfo.jTouchInfo[oElement.id][sFnName].fnMethod, bCapture);
                } else {
                    oElement.removeEventListener(sEvent, this.jInfo.jEvent[oElement.id][sFnName].fnMethod, bCapture);
                }
            }
            this.jInfo.jEvent[oElement.id][sFnName] = null;
        } catch (err) {
        }
    },

    //主动触发对象的事件函数  hagan.fnFireEventFn(eBtn,"fnTest");  !IE10
    fnFireEventFn(oElement, sFnName, oEv) {
        this.jInfo.jEvent[oElement.id][sFnName].fnMethod.call(oElement, oEv);
    },

    //主动触发对象的事件  hagan.fnFireEvent(eBtn,"test");  !IE10
    fnFireEvent(oElement, sEvent, oEv) {
        sEvent = this.fnJudgeUaGetEventName(sEvent);
        for (let attr in this.jInfo.jEvent[oElement.id]) {
            if (this.jInfo.jEvent[oElement.id][attr].sEvent === sEvent && this.jInfo.jEvent[oElement.id][attr].fnMethod instanceof Function) {
                this.jInfo.jEvent[oElement.id][attr].fnMethod.call(oElement, oEv);
            }
        }
    },

    //主动触发元素的鼠标事件  hagan.fnSimulateMouseEvent(eBtn,"click",{"clientX":200,"clientY":400});  F|C|O
    fnFireMouseEvent(eElement, sEvent, jEvent) {
        sEvent = this.fnJudgeUaGetEventName(sEvent);
        const evMouse = new MouseEvent(sEvent, jEvent);
        eElement.dispatchEvent(evMouse);
    },

    //主动触发元素的键盘事件  hagan.fnSimulateKeyboardEvent(eBtn,"click",{"keyCode":13});  F
    fnFireKeyboardEvent(eElement, sEvent, jEvent) {
        jEvent.bAlt ? jEvent.bAlt = jEvent.bAlt : jEvent.bAlt = false;
        jEvent.bCtrl ? jEvent.bCtrl = jEvent.bCtrl : jEvent.bCtrl = false;
        jEvent.bShift ? jEvent.bShift = jEvent.bShift : jEvent.bShift = false;
        const event = document.createEvent("Events");
        event.initEvent(sEvent, true, true);
        event.view = document.defaultView;
        event.altKey = jEvent.bAlt;
        event.ctrlKey = jEvent.bCtrl;
        event.shiftKey = jEvent.bShift;
        event.metaKey = false;
        event.keyCode = jEvent.keyCode;
        event.charCode = jEvent.keyCode;
        eElement.dispatchEvent(event);
    },

    //委托元素的事件函数绑定  hagan.fnAddEntrustEvent(document.body,"click",{"btn1":function(){},"btn2":function(){}};  !IE10
    fnAddEntrustEvent(eElement, sEvent, jIdFn, bCapture = false) {
        if (!eElement.id) {
            console.error(`<${eElement.nodeName.toLocaleLowerCase()}>.id cannot is null`);
        }
        this.fnAddEvent(eElement, sEvent, function fnAddEntrustEvent(ev) {
            let sTargetId = String;
            try {
                sTargetId = ev.srcElement.id
            } catch (err) {
                sTargetId = ev.originalTarget.id
            }
            for (let attr in jIdFn) {
                if (sTargetId === attr) {
                    jIdFn[sTargetId]();
                }
            }
        }, bCapture);

    },

    //委托元素的事件函数绑定解除  hagan.fnRemoveEntrustEvent(document.body,"click");  !IE10
    fnRemoveEntrustEvent(eElement, sEvent, bCapture = false) {
        this.fnRemoveEvent(eElement, sEvent, "fnAddEntrustEvent", bCapture);
    },

    //模拟窗口大小改变事件且优化性能  hagan.fnOnReSize(function(){});  !IE8
    fnOnReSize(fn, bDefault = false) {
        if (bDefault) {
            fn()
        }
        const event = "onorientationchange" in window ? "orientationchange" : "resize";
        let timer = null;
        window.addEventListener(event, function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                const nStatus = window.orientation;
                fn(nStatus);
            }, 500);
        }, false);
    },

    //动态设置html根节点的字体大小 hagan.fnSetHtmlFontSize();  !IE8
    fnSetHtmlFontSize() {

        const This = this;

        const eHtml = document.querySelector("html");

        const nViewportWidth = Math.min(This.fnGetViewportWidth(), This.fnGetViewportHeight());

        This.jInfo.rem = nViewportWidth / 10;

        eHtml.style.fontSize = `${This.jInfo.rem}px`;

    },

    //求出与设计图对应的像素尺寸  hagan.fnSetMobileStyle(eDiv,"width",200,750);  !IE8
    fnSetMobileStyle(eElement, sStyle, nPx, designWidth = 750) {
        eElement.style[sStyle] = (this.jInfo.rem * 30 * nPx / designWidth) + "px";
    },

    //得到rem布局对应rem尺寸
    fnGetRem(nPx, designWidth = 750) {
        return 10 * nPx / designWidth;
    },

    //得到rem布局对应的像素尺寸
    fnGetRemPx(nPx, designWidth = 750) {
        return 10 * nPx / designWidth * this.jInfo.rem;
    },

    //得到百分比布局对应的像素尺寸
    fnGetFlowPx(nPx, designWidth = 750) {
        return document.documentElement.clientWidth * nPx / designWidth
    },

    //得到计算后的样式  hagan.fnGetStyle(eDiv,"width",":after");  !IE8
    fnGetFinalStyle(eElement, sStyle, sPseudoElement = null) {
        return document.defaultView.getComputedStyle(eElement, sPseudoElement)[sStyle];
    },

    //得到浏览器视口宽度  hagan.fnGetBrowserViewportWidth();  !IE8
    fnGetViewportWidth() {
        return document.documentElement.clientWidth;
    },

    //得到浏览器视口高度  hagan.fnGetBrowserViewportHeight();  !IE8
    fnGetViewportHeight() {
        return document.documentElement.clientHeight;
    },

    //得到文档总宽度  hagan.fnGetDocumentWidth();  !IE8
    fnGetDocumentWidth() {
        return Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
    },

    //得到文档总高度  hagan.fnGetDocumentHeight();  !IE8
    fnGetDocumentHeight() {
        return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
    },

    //得到元素至html最左边的距离  hagan.fnGetToHtmlLeft(eDiv);  !IE8
    fnGetToHtmlLeft(eElement) {
        let [nResult,ePositionPar]=[0, eElement];
        while (ePositionPar) {
            nResult += ePositionPar.offsetLeft;
            ePositionPar = ePositionPar.offsetParent;
        }
        return nResult;
    },

    //得到元素至html顶部的距离  hagan.fnGetToHtmlTop(eDiv);  !IE8
    fnGetToHtmlTop(eElement) {
        let [nResult,ePositionPar]=[0, eElement];
        while (ePositionPar) {
            nResult += ePositionPar.offsetTop;
            ePositionPar = ePositionPar.offsetParent;
        }
        return nResult;
    },

    //得到元素位置尺寸信息  hagan.fnGetElementSizeInfo(eDiv1);  !IE8
    fnGetElementSizeInfo(eElement) {
        const jJson = eElement.getBoundingClientRect();
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        return {
            "pageX": jJson.left + scrollLeft,
            "pageY": jJson.top + scrollTop,
            "width": jJson.width,
            "height": jJson.height
        };
    },

    //向url中添加查询字符串
    fnUrlToQueryString(sUrl, sKey, sValue) {
        if (typeof sUrl === "string" && typeof sKey === "string" && typeof sValue === "string") {

            if (sUrl.indexOf("?") === -1) {
                sUrl += "?";
            } else {
                sUrl += "&";
            }

            sUrl += `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}`;

            return sUrl;

        }
    },

    //得到ajax传参所需格式
    fnGetAjaxStr(jData) {
        let sResult = "";
        for (let attr in jData) {
            if (typeof jData[attr] === "object") {
                sResult += `${attr}=${JSON.stringify(jData[attr])}&`;
            } else {
                sResult += `${attr}=${jData[attr]}&`;
            }
        }
        return sResult;
    },

    //ajax封装  hagan.fnAjax({});
    fnAjax(jOpt) {

        const This = this;

        jOpt.sType = jOpt.sType || "get";
        jOpt.sDataType === "file" ? jOpt.sType = "post" : jOpt.sType = jOpt.sType;
        jOpt.sType === "get" ? jOpt.sUrl = `${jOpt.sUrl}?${This.fnGetAjaxStr(jOpt.jData)}` : jOpt.sUrl = jOpt.sUrl;
        jOpt.sType === "get" ? jOpt.jData = null : jOpt.sDataType === "file" ? jOpt.jData = jOpt.jData : jOpt.jData = This.fnGetAjaxStr(jOpt.jData || "");
        jOpt.bAsync = jOpt.bAsync || false;

        const oopAjax = new XMLHttpRequest();

        if (jOpt.fnProgress instanceof Function) {//进度条事件
            oopAjax.onprogress = function (ev) {
                jOpt.fnProgress(ev.total, ev.loaded);
            };
        }

        if (typeof jOpt.nTimeOut === "number") {//设置超时方法
            oopAjax.timeout = jOpt.nTimeOut;
            oopAjax.ontimeout = function () {
                if (jOpt.fnTimeOut instanceof Function) {
                    jOpt.fnTimeOut();
                }
            };
        }

        oopAjax.open(jOpt.sType, jOpt.sUrl, jOpt.bAsync);

        jOpt.sDataType === "file" ? oopAjax.setRequestHeader("contentType", "multipart/form-data") : oopAjax.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        oopAjax.send(jOpt.jData);

        if (jOpt.bAsync === true) {
            oopAjax.onreadystatechange = function () {
                if (oopAjax.readyState === 4) {
                    fnReceiveData();
                }
            };
        } else if (jOpt.bAsync === false) {
            fnReceiveData();
        }

        function fnReceiveData() {
            if ((oopAjax.status >= 200 && oopAjax.status < 300) || oopAjax.status === 304) {
                if (jOpt.fnSuccess instanceof Function) {
                    jOpt.fnSuccess(oopAjax.responseText);
                } else {
                    console.error("hagan.fnAjax:jOpt.fnSuccess can't a Function");
                }
            } else {
                if (jOpt.fnError instanceof Function) {
                    jOpt.fnError(oopAjax.status);
                } else {
                    console.error("hagan.fnAjax:jOpt.fnError can't a Function");
                }
            }
        }

    },

    //根据访问地址决定返回http或https
    fnGetHttpOrHttps(sUrl) {
        return sUrl.replace(/(http.?\:)(.+)/, (sNative, child1, child2)=> {
            return `${location.protocol}${child2}`
        });
    },

    //判断ua并执行对应函数  hagan.fnJudgeUa({"fnIos","fnAndroid","fnPc"});
    fnJudgeUa(jOpt) {
        const sUa = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(sUa)) {
            jOpt["fnIos"]();
            this.fnJudgeUa = function (jOpt) {//惰性载入函数
                jOpt["fnIos"]();
            };
        } else if (/android/.test(sUa)) {
            jOpt["fnAndroid"]();
            this.fnJudgeUa = function (jOpt) {//惰性载入函数
                jOpt["fnAndroid"]();
            };
        } else {
            jOpt["fnPc"]();
            this.fnJudgeUa = function (jOpt) {//惰性载入函数
                jOpt["fnPc"]();
            };
        }
    },

    //设置自定义定时器  hagan.fnSetInterval(function nTimer1(){},1000);  !IE10
    //为了防止后一个调用会在前一个调用结束之前执行, 使用setTimeout模拟setInterval
    fnSetInterval(fn, nMs, bStatus = true) {
        if (!fn.name) {
            console.error("fn.name cannot is null");
        }
        const This = this;
        This.jInfo.jTimer[fn.name] = true;
        if (bStatus) {
            fn()
        }
        if (This.jInfo.jTimer[fn.name]) {
            clearTimeout(This.jInfo.jTimer[fn.name]);
            This.jInfo.jTimer[fn.name] = setTimeout(function () {
                fn();
                if (This.jInfo.jTimer[fn.name]) {
                    This["fnSetInterval"](fn, nMs, false);
                }
            }, nMs);
        }
    },

    //清除自定义定时器  hagan.fnSetInterval("nTimer1");  !IE10
    fnClearInterval(nTimer) {
        clearTimeout(this.jInfo.jTimer[nTimer]);
        this.jInfo.jTimer[nTimer] = false;
    },

    //闭包:返回对应图片的base64  !IE10
    //const jBase64=hagan.fnGetImageBase64("backImage.jpg");
    //jBase64["oImage"].onload=()=>{const sBase64=jBase64["fnOnLoad"]()["str"]};
    fnGetImageBase64(sImageUrl) {//调用该方法返回一个以传入链接创建的一个图片标签和该图片标签的onload事件组成的json

        let sResult = String;

        const oImage = document.createElement("img");
        oImage.crossOrigin = "Anonymous";
        oImage.style["verticalAlign"] = "middle";
        oImage.src = sImageUrl;

        return {
            "oImage": oImage,
            "fnOnLoad": function () {//调用该方法返回base64的原始数据和经过处理的str数据组成的json

                const oCanvas = document.createElement("canvas");
                oCanvas.width = oImage.width;
                oCanvas.height = oImage.height;
                const oContext = oCanvas.getContext("2d");
                oContext.drawImage(oImage, 0, 0, oImage.width, oImage.height);
                const sSuffix = oImage.src.substring(oImage.src.lastIndexOf(".") + 1).toLowerCase();
                sResult = oCanvas.toDataURL(`image/${sSuffix}`);

                return {
                    "base64": sResult,
                    "str": sResult.replace(/(data\:image\/png\;)(base64\,)(.+)/, ($0, $1, $2, $3)=> {
                        return $3
                    })
                };

            }
        }

    },

    //给元素添加滚轮事件  hagan.fnAddMouseWheel(window,function fn(){},function fn(){});  !IE8
    fnAddMouseWheel(eElement, fnUp, fnDown, bCapture = false) {
        this.jInfo.jMouseWheel[fnUp.name || fnDown.name] = function (ev) {
            ev.wheelDelta ? (ev.wheelDelta > 0 ? fnUp(ev) : fnDown(ev)) : (ev.detail < 0 ? fnUp(ev) : fnDown(ev));
        };
        eElement.addEventListener("mousewheel", this.jInfo.jMouseWheel[fnUp.name || fnDown.name], bCapture);
        eElement.addEventListener("DOMMouseScroll", this.jInfo.jMouseWheel[fnUp.name || fnDown.name], bCapture);
    },

    //移除元素滚轮事件  hagan.fnRemoveMouseWheel(window,"fn");  !IE8
    fnRemoveMouseWheel(eElement, sFnName, bCapture = false) {
        eElement.removeEventListener("mousewheel", this.jInfo.jMouseWheel[sFnName], bCapture);
        eElement.removeEventListener("DOMMouseScroll", this.jInfo.jMouseWheel[sFnName], bCapture);
    },

    //得到键盘键码  hagan.fnGetKeyCode(ev);  !IE8
    fnGetKeyCode(ev) {
        let nResult = ev.keyCode;
        if (nResult == 186) {
            nResult = 59;
        }
        return nResult;
    },

    //浏览器关闭事件  hagan.fnOnBeForeUnload("是否关闭？");  !IE10
    fnOnBeForeUnload(sText, fn) {
        const fnBeforeUnload = function (ev) {
            fn();
            ev.returnValue = sText;
            return sText;
        };
        window.removeEventListener("beforeunload", fnBeforeUnload);
        window.addEventListener("beforeunload", fnBeforeUnload);

    },

    //自定义右键菜单  hagan.fnCustomRightMenu(eUl);  !IE8
    fnCustomRightMenu(eUl, fn) {
        window.addEventListener("contextmenu", function (ev) {
            fn();
            ev.preventDefault();
            eUl.style.top = `${ev.pageY}px`;
            eUl.style.left = `${ev.pageX}px`;
            eUl.style.display = "block";
        });
        document.documentElement.addEventListener("click", function () {
            eUl.style.display = "none";
        });
    },

    //得到localStorage的key和value  hagan.fnGetStorage(function(key,value){});  !IE8
    fnGetStorage(fn) {
        const oStorage = window.localStorage;
        for (let i = 0, size = oStorage.length; i < size; i++) {
            fn(oStorage.key(i), oStorage.getItem(oStorage.key(i)));
        }
    },

    //获取哈希值  hagan.fnGetHash()  !IE8
    fnGetHash() {
        return location.hash.replace(/(\#)(.+)/, function ($0, $1, $2) {
            return $2;
        });
    },

    //移除元素的所有事件处理函数[并删除元素]  hagan.fnRemoveElementAllEvent(eBtn1,true);  !IE10
    fnRemoveElementAllEvent(eElement, bDeleteElement = false) {
        if (!eElement.id) {
            console.error(`<${eElement.nodeName.toLocaleLowerCase()}>.id cannot is null`);
        }
        for (let attr in this.jInfo.jEvent[eElement.id]) {
            if (this.jInfo.jEvent[eElement.id][attr].nodeType !== 1 && this.jInfo.jEvent[eElement.id][attr] !== window) {
                this.fnRemoveEvent(eElement, this.jInfo.jEvent[eElement.id][attr].sEvent, attr);
            }
        }
        if (bDeleteElement) {
            this.jInfo.jEvent[eElement.id] = null;
            eElement.remove();
        }
    },

    //移除页面上的所有事件处理函数
    fnRemoveDocumentAllEvent() {
        for (let attr in this.jInfo.jEvent) {
            this.fnRemoveElementAllEvent(this.jInfo.jEvent[attr].eElement);
        }
        this.jInfo.jEvent = null;
    },

    //排除输入  hagan.fnScreeningInput(eInput,"123");  !IE10
    fnScreeningInput(eElement, sExcept) {

        const This = this;

        This.fnAddEvent(eElement, "keypress", function fnScreeningInputKeyPress(ev) {

            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey) {

                if (sExcept.indexOf(String.fromCharCode(ev.charCode)) !== -1) {
                    ev.preventDefault();
                }

            }

        });

    },

    //排除粘贴  hagan.fnScreeningPaste(eInput,["12","10"],function(){});  !IE10
    fnScreeningPaste(eElement, aExcept, fn) {

        const This = this;

        This.fnAddEvent(eElement, "paste", function fnScreeningPaste(ev) {

            for (let i = 0, size = aExcept.length; i < size; i++) {

                if (ev.clipboardData.getData("text/plain").indexOf(aExcept[i]) !== -1) {

                    ev.preventDefault();

                    fn();

                    break

                }

            }

        });

    },

    //检测类型  hagan.fnTypeof(oopFnAjax,FnAjax);  !IE8
    fnTypeof(opt, fn) {

        let result;

        if (fn) {

            if (fn instanceof Function) {
                result = opt instanceof fn
            }

        } else {

            switch (Object.prototype.toString.call(opt)) {

                case "[object Number]" :

                    if (isNaN(opt)) {
                        result = "NaN";
                    } else if (isFinite(opt)) {
                        result = "Number";
                    } else {
                        result = "Infinity";
                    }

                    break;
                case "[object String]":

                    result = "String";

                    break;
                case "[object Null]":

                    result = "Null";

                    break;
                case "[object Undefined]":

                    result = "Undefined";

                    break;
                case "[object Boolean]":

                    result = "Boolean";

                    break;
                case "[object Function]":

                    result = "Function";

                    break;
                case "[object Date]":

                    result = "Date";

                    break;
                case "[object Array]":

                    result = "Array";

                    break;
                case "[object RegExp]":

                    result = "RegExp";

                    break;
                case "[object Object]":

                    result = "Object";

                    break;
                default:

                    console.error("不是原生js类型");
                    result = "Unknown";

                    break;

            }

        }

        return result;

    },

    //异步forEach  hagan.fnAsyncForeach(aOpt,function(item){});  !IE8
    fnAsyncForeach(aOpt, fnProcess, context = null) {

        const This = this;

        if (aOpt instanceof Array && fnProcess instanceof Function) {

            let nIndex = 0;

            function fn() {

                const nStartTime=+new Date();

                do {

                    //取出下一个异步执行的参数
                    const item = aOpt[nIndex];

                    fnProcess.call(context, item);

                    nIndex++;

                }while (nIndex<aOpt.length&&+new Date()-nStartTime<50);

                if (nIndex < aOpt.length) {

                    requestAnimationFrame(fn);

                }

            }

            fn();

        } else {

            console.error("aOpt isn't a Array || fnProcess isn't a Function");

        }

    },

    //异步执行函数序列  hagan.fnAsyncProcess(aFn);  !IE8
    fnAsyncProcess(aFnProcess, aArguments = []) {

        const This = this;

        if (aFnProcess instanceof Array) {

            let nIndex = 0;

            function fn() {

                const nStartTime=+new Date();

                do {

                    const fnProcess = aFnProcess[nIndex];

                    if (fnProcess instanceof Function) {

                        fnProcess(aArguments[nIndex], nIndex, aArguments);

                    } else {

                        console.error("fnProcess["+nIndex+"] isn't a Function");

                    }

                    nIndex++;

                }while (nIndex<aFnProcess.length&&+new Date()-nStartTime<50);

                if (nIndex < aFnProcess.length) {

                    requestAnimationFrame(fn);

                }

            }

            fn();

        } else {

            console.error("aFnProcess isn't a Array");

        }

    },

    //异步遍历数组
    fnAsyncErgodicArray(aItem, fnIng, fnEnd){

        let nKey = 0;

        function fn() {

            const nStartTime = +new Date();

            do {

                fnIng(aItem[nKey], nKey, aItem);

                nKey++;

            } while (nKey < aItem.length && +new Date() - nStartTime < 50);

            if (nKey < aItem.length) {

                requestAnimationFrame(fn);

            } else {

                fnEnd instanceof Function && fnEnd(aItem);

            }

        }

        fn();

    },

    //设置cookie  hagan.setCookie({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
    fnSetCookie(jAllCookie, nDay = 0) {
        let oDate;
        let sDel = false;
        if (nDay > 0) {
            oDate = new Date();
            oDate.setDate(oDate.getDate() + nDay);
            oDate.toUTCString();
        } else if (nDay === 0) {
            oDate = nDay;
        } else {
            oDate = nDay;
            sDel = "关闭浏览器时清除此cookie";
        }
        for (let sAllCookieKey in jAllCookie) {
            let sCookieValue = "";
            if (typeof jAllCookie[sAllCookieKey] === "string") {
                sCookieValue += `${jAllCookie[sAllCookieKey]}&`;
            } else if (jAllCookie[sAllCookieKey] instanceof Object) {
                for (let sCookieKey in jAllCookie[sAllCookieKey]) {
                    sCookieValue += `${sCookieKey}=${jAllCookie[sAllCookieKey][sCookieKey]}&`;
                }
            }
            sCookieValue = sCookieValue.replace(/(.+)\&$/, function ($0, $1) {
                return $1;
            });
            document.cookie = `${encodeURIComponent(sAllCookieKey)}=${sDel || encodeURIComponent(sCookieValue)};expires=${oDate}`;
        }
    },

    //得到cookie  hagan.getCookie(["username"],["password","wx"]);  !IE8
    fnGetCookie(aKey1, aKey2) {
        const sAllCookie = document.cookie;
        const aAllCookie = sAllCookie.split("; ");
        let jAllCookie = {};
        let result;
        for (let i = 0; i < aAllCookie.length; i++) {
            const aCookie = aAllCookie[i].split("=");
            jAllCookie[aCookie[0]] = aCookie[1];
        }
        for (let sCookieKey in jAllCookie) {
            jAllCookie[sCookieKey] = decodeURIComponent(jAllCookie[sCookieKey]);
            if (jAllCookie[sCookieKey].indexOf("=") !== -1) {
                const aCookieValue = jAllCookie[sCookieKey].split("&");
                jAllCookie[sCookieKey] = {};
                for (let i = 0; i < aCookieValue.length; i++) {
                    const aSubCookie = aCookieValue[i].split("=");
                    jAllCookie[sCookieKey][aSubCookie[0]] = aSubCookie[1];
                }
            }
        }
        if (arguments.length === 0) {
            result = jAllCookie;
        } else {
            result = [];
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] instanceof Array) {
                    switch (arguments[i].length) {
                        case 1:
                            if (jAllCookie[arguments[i][0]] === undefined) {
                                console.error(`jAllCookie.${arguments[i][0]} is undefined`);
                            }
                            result.push(jAllCookie[arguments[i][0]]);
                            break;
                        case 2:
                            try {
                                if (jAllCookie[arguments[i][0]][arguments[i][1]] === undefined) {
                                    console.error(`jAllCookie.${arguments[i][0]}.${arguments[i][1]} is undefined`);
                                    result.push(undefined);
                                } else {
                                    result.push(jAllCookie[arguments[i][0]][arguments[i][1]]);
                                }
                            } catch (err) {
                                result.push(undefined);
                                console.error(`jAllCookie.${arguments[i][0]}.${arguments[i][1]} is undefined`);
                            }
                            break;
                    }
                }
            }
        }
        return result;
    },

    //删除cookie(不能删除子cookie)  hagan.delCookie(["username"],["password"]);  !IE8
    fnDelCookie(aKey, aKey2) {
        const This = this;
        const jAllCookie = This.fnGetCookie();
        if (arguments.length === 0) {
            for (let sAllCookieKey in jAllCookie) {
                document.cookie = `${encodeURIComponent(sAllCookieKey)}=关闭浏览器时清除此cookie;expires=-1`;
            }
        } else {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] instanceof Array) {
                    switch (arguments[i].length) {
                        case 1:
                            document.cookie = `${encodeURIComponent(arguments[i][0])}=关闭浏览器时清除此cookie;expires=-1`;
                            break;
                        case 2:
                            document.cookie = `${encodeURIComponent(arguments[i][0])}=关闭浏览器时清除此cookie;expires=-1`;
                            break;
                    }
                }
            }
        }
    },

    //设置存储数据  hagan.fnSetStorage({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
    fnSetStorage(jData, sStorageType = localStorage) {
        for (let sKey in jData) {
            sStorageType[sKey] = JSON.stringify(jData[sKey]);
        }
    },

    //得到存储的数据  hagan.fnGetStorage(["username"],["password","wx"]);  !IE8
    fnGetStorage(sStorageType = localStorage) {
        let result = {};
        for (let i = 0; i < sStorageType.length; i++) {
            const sKey = sStorageType.key(i);
            const sValue = JSON.parse(sStorageType.getItem(sKey));
            result[sKey] = sValue;
        }
        return result
    },

    //删除存储的数据  hagan.fnDelStorage();  !IE8
    fnDelStorage(sStorageType = localStorage) {
        sStorageType.clear();
    },

    //动态获取ip地址  mdj.fnGetIp("admin/custom_mark/doSave");
    fnGetAllIp(sAfterUrl = "") {
        const pathName = document.location.pathname;
        const projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1) + "/";
        return this.fnGetHttpOrHttps(`http://${location.host}${projectName}${sAfterUrl}`);
    },

    //得到整数
    fnGetInteger(nNum) {
        if (this.fnTypeof(nNum) === "Number") {
            return Math[nNum < 0 ? "ceil" : "floor"](nNum);
        } else {
            console.error(`nNum isn't Number`);
        }
    },

    //移除字符串首尾空格
    fnTrim(sString) {
        if (this.fnTypeof(sString) === "String") {
            return sString.replace(/^\s+|\s+$/g, "");
        }
    },

    //截取base64
    fnInterceptBase64(sBase64) {
        return sBase64.replace(/(.+\,)(.+)/, function ($0, $1, $2) {
            return $2;
        });
    },

    // 将以base64的图片url数据转换为Blob @param urlData 用url方式表示的base64图片数据
    fnConvertBase64UrlToBlob(urlData) {

        let bytes;
        try {//去掉url的头，并转换为byte
            bytes = window.atob(urlData);
        } catch (err) {
            bytes = window.atob(this.fnInterceptBase64(urlData));
        }

        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {type: 'image/png'});
    },

    //得到img.onload的尺寸信息  hagan.fnGetImgSizeInfo(ev);
    fnGetImgSizeInfo(evImgLoad) {

        const nWidth = evImgLoad.target.width || evImgLoad.path[0].width;
        const nHeight = evImgLoad.target.height || evImgLoad.path[0].height;
        const nScale = Math.round((nWidth / nHeight) * 100) / 100;

        return {nWidth, nHeight, nScale};
    },

    //统一移动端与pc端获取鼠标和手指位置方法
    fnGetClientX(ev) {

        return ev.clientX || ev.changedTouches[0].clientX;
    },

    fnGetClientY(ev) {
        return ev.clientY || ev.changedTouches[0].clientY;
    },

    fnGetPageX(ev) {
        return ev.pageX || ev.changedTouches[0].pageX;
    },

    fnGetPageY(ev) {
        return ev.pageY || ev.changedTouches[0].pageY;
    },

    //类数组转为数组
    fnToArray(aClassArray) {
        const aResult = [];
        for (let i = 0; i < aClassArray.length; i++) {
            aResult[i] = aClassArray[i];
        }
        return aResult;
    },

    //缓存递归函数前一个计算结果供后续使用
    fnMemoize(fnRecursion, oObj){

        oObj = oObj || {};

        return function (opt) {
            if (!oObj.hasOwnProperty(opt)) {
                oObj[opt] = fnRecursion(opt);
            }
            return oObj[opt];
        }

    },

    //阶乘函数
    fnFactorial(nNum){
        if (nNum === 0) {
            return 1;
        } else {
            return nNum * hagan.fnFactorial(nNum - 1);
        }
    },

};

const hg = hagan;
// export default hg;
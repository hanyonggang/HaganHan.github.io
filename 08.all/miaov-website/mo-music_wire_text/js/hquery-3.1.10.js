class HQuery {//delete fnSetLocalStorage

    //构造函数
    constructor() {
        this.rem = Number;//存着html标签上的字体大小
        this.jTimer = {};//存着模拟定时器的执行序列
        this.jAnimation={};//存着动画执行序列
        this.jEvent = {};//存着所有元素id绑定的事件函数
        this.jMouseWheel = {};//存着所有绑定的滚轮事件
    }

    //绑定对象的事件函数  $$.fnAddEvent(eBtn,"click",function fnAlert1(){});  !IE10
    fnAddEvent(oElement, sEvent, fn, bCapture = false) {
        if (oElement === window) {
            oElement.id = "window"
        }
        if (!oElement.id) {
            console.error(`<${oElement.nodeName.toLocaleLowerCase()}>.id cannot is null`);
        }
        if (!fn.name) {
            console.error("fn.name cannot is null");
        }
        if (!this.jEvent[oElement.id]) {
            this.jEvent[oElement.id] = {}
        }
        this.jEvent[oElement.id][fn.name] = {"sEvent": sEvent, "fnMethod": fn};
        this.jEvent[oElement.id].oElement = oElement;
        if(oElement.nodeType===1||oElement===window){
            if(sEvent==="touch"){
                this.fnTouch(oElement,fn,bCapture)
            }else {
                oElement.addEventListener(sEvent, this.jEvent[oElement.id][fn.name].fnMethod, bCapture);
            }
        }
    }

    fnTouch(oElement,fn,bCapture=false){

        let bFn;

        const fnMove=function () {
            bFn=false;
        };
        const fnEnd=function () {
            if(bFn){
                fn.call(oElement);
            }
            oElement.removeEventListener("touchmove",fnMove,bCapture);
            oElement.removeEventListener("touchend",fnEnd,bCapture);
        };

        oElement.addEventListener("touchstart",function () {

            bFn=true;

            oElement.addEventListener("touchmove",fnMove,bCapture);
            oElement.addEventListener("touchend",fnEnd,bCapture);

        },bCapture);

    }

    //解除对象的事件函数绑定  $$.fnRemoveEvent(eBtn,"click","fnAlert1");  !IE10
    fnRemoveEvent(oElement, sEvent, sFnName, bCapture = false) {
        try {
            if(oElement.nodeType===1){
                oElement.removeEventListener(sEvent, this.jEvent[oElement.id][sFnName].fnMethod, bCapture);
            }
            this.jEvent[oElement.id][sFnName] = null;
        } catch (err) {}
    }

    //主动触发对象的事件函数  $$.fnFireEventFn(eBtn,"fnTest");  !IE10
    fnFireEventFn(oElement, sFnName,oEv) {
        this.jEvent[oElement.id][sFnName].fnMethod.call(oElement,oEv);
    }

    //主动触发对象的事件  $$.fnFireEvent(eBtn,"test");  !IE10
    fnFireEvent(oElement, sEvent,oEv) {
        for (let attr in this.jEvent[oElement.id]) {
            if (this.jEvent[oElement.id][attr].sEvent === sEvent && this.jEvent[oElement.id][attr].fnMethod instanceof Function) {
                this.jEvent[oElement.id][attr].fnMethod.call(oElement,oEv);
            }
        }
    }

    //主动触发元素的鼠标事件  $$.fnSimulateMouseEvent(eBtn,"click",{"clientX":200,"clientY":400});  F|C|O
    fnFireMouseEvent(eElement, sEvent, jEvent) {
        const evMouse = new MouseEvent(sEvent, jEvent);
        eElement.dispatchEvent(evMouse);
    }

    //主动触发元素的键盘事件  $$.fnSimulateKeyboardEvent(eBtn,"click",{"keyCode":13});  F
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
    }

    //委托元素的事件函数绑定  $$.fnAddEntrustEvent(document.body,"click",{"btn1":function(){},"btn2":function(){}};  !IE10
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

    }

    //委托元素的事件函数绑定解除  $$.fnRemoveEntrustEvent(document.body,"click");  !IE10
    fnRemoveEntrustEvent(eElement, sEvent, bCapture = false) {
        this.fnRemoveEvent(eElement, sEvent, "fnAddEntrustEvent", bCapture);
    }

    //模拟窗口大小改变事件且优化性能  $$.fnOnReSize(function(){});  !IE8
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
    }

    //设置移动端viewport所在meta标签样式  $$.fnSetMeta(eMeta);  !IE8
    fnSetMobileViewport(eMeta) {
        const iScale = window.devicePixelRatio ? 1 / window.devicePixelRatio : 1;
        eMeta.name = "viewport";
        eMeta.content = `initial-scale=${iScale},maximum-scale=${iScale},minimum-scale=${iScale},user-scalable=no,width=device-width,height=device-height`
    }

    //动态获取1rem的大小 $$.fnSetRem(oHtml);  !IE8
    fnSetMobileRem(oHtml) {
        const This = this;
        const fnUpdateRem = function () {
            const windowWidth = This.fnGetViewportWidth();
            oHtml.style.fontSize = windowWidth / 30 + "px";
            This.rem = windowWidth / 30;
        };
        fnUpdateRem();
        This.fnOnReSize(function () {
            fnUpdateRem();
        });
    }

    //求出与设计图对应的像素尺寸  $$.fnSetMobileStyle(eDiv,"width",200,750);  !IE8
    fnSetMobileStyle(eElement, sStyle, nPx, designWidth = 750) {
        eElement.style[sStyle] = (this.rem * 30 * nPx / designWidth) + "px";
    }

    //得到计算后的样式  $$.fnGetStyle(eDiv,"width",":after");  !IE8
    fnGetFinalStyle(eElement, sStyle, sPseudoElement = null) {
        return document.defaultView.getComputedStyle(eElement, sPseudoElement)[sStyle];
    }

    //得到浏览器视口宽度  $$.fnGetBrowserViewportWidth();  !IE8
    fnGetViewportWidth() {
        return document.documentElement.clientWidth;
    }

    //得到浏览器视口高度  $$.fnGetBrowserViewportHeight();  !IE8
    fnGetViewportHeight() {
        return document.documentElement.clientHeight;
    }

    //得到文档总宽度  $$.fnGetDocumentWidth();  !IE8
    fnGetDocumentWidth() {
        return Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
    }

    //得到文档总高度  $$.fnGetDocumentHeight();  !IE8
    fnGetDocumentHeight() {
        return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
    }

    //得到元素至html最左边的距离  $$.fnGetToHtmlLeft(eDiv);  !IE8
    fnGetToHtmlLeft(eElement) {
        let [nResult,ePositionPar]=[0, eElement];
        while (ePositionPar) {
            nResult += ePositionPar.offsetLeft;
            ePositionPar = ePositionPar.offsetParent;
        }
        return nResult;
    }

    //得到元素至html顶部的距离  $$.fnGetToHtmlTop(eDiv);  !IE8
    fnGetToHtmlTop(eElement) {
        let [nResult,ePositionPar]=[0, eElement];
        while (ePositionPar) {
            nResult += ePositionPar.offsetTop;
            ePositionPar = ePositionPar.offsetParent;
        }
        return nResult;
    }

    //得到元素位置尺寸信息  $$.fnGetElementSizeInfo(eDiv1);  !IE8
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
    }

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
    }

    //得到ajax传参所需格式
    fnGetAjaxStr(jData) {
        let sResult = "";
        for (let attr in jData) {
            sResult += `${attr}=${jData[attr]}&`;
        }
        return sResult;
    }

    //ajax封装  $$.fnAjax({});
    fnAjax(jOpt) {

        const This = this;

        jOpt.sType = jOpt.sType || "get";
        jOpt.sType === "get" ? jOpt.sUrl = `${jOpt.sUrl}?${This.fnGetAjaxStr(jOpt.jData)}` : jOpt.sUrl = jOpt.sUrl;
        jOpt.sType === "get" ? jOpt.jData = null : jOpt.jData = This.fnGetAjaxStr(jOpt.jData || "");
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

        oopAjax.setRequestHeader("content-type", "application/x-www-form-urlencoded");

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
                    console.error("$$.fnAjax:jOpt.fnSuccess can't a Function");
                }
            } else {
                if (jOpt.fnError instanceof Function) {
                    jOpt.fnError(oopAjax.status);
                } else {
                    console.error("$$.fnAjax:jOpt.fnError can't a Function");
                }
            }
        }

    }

    //根据访问地址决定返回http或https
    fnGetHttpOrHttps(sUrl) {
        return sUrl.replace(/(http.?\:)(.+)/, (sNative, child1, child2)=> {
            return `${location.protocol}${child2}`
        });
    }

    //判断ua并执行对应函数  $$.fnJudgeUa({"fnIos","fnAndroid","fnDefault"});
    fnJudgeUa(jOpt) {
        const sUa = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(sUa)) {
            jOpt["fnIos"]();
            HQuery.prototype.fnJudgeUa = function () {//惰性载入函数
                jOpt["fnIos"]();
            };
        } else if (/android/.test(sUa)) {
            jOpt["fnAndroid"]();
            HQuery.prototype.fnJudgeUa = function () {//惰性载入函数
                jOpt["fnAndroid"]();
            };
        } else {
            jOpt["fnDefault"]();
            HQuery.prototype.fnJudgeUa = function () {//惰性载入函数
                jOpt["fnDefault"]();
            };
        }
    }

    //设置自定义定时器  $$.fnSetInterval(function nTimer1(){},1000);  !IE10
    //为了防止后一个调用会在前一个调用结束之前执行, 使用setTimeout模拟setInterval
    fnSetInterval(fn, nMs, bStatus = true) {
        if (!fn.name) {
            console.error("fn.name cannot is null");
        }
        const This = this;
        This["jTimer"][fn.name] = true;
        if (bStatus) {
            fn()
        }
        if (This["jTimer"][fn.name]) {
            clearTimeout(This["jTimer"][fn.name]);
            This["jTimer"][fn.name] = setTimeout(function () {
                fn();
                if (This["jTimer"][fn.name]) {
                    This["fnSetInterval"](fn, nMs, false);
                }
            }, nMs);
        }
    }

    //清除自定义定时器  $$.fnSetInterval("nTimer1");  !IE10
    fnClearInterval(nTimer) {
        clearTimeout(this["jTimer"][nTimer]);
        this["jTimer"][nTimer] = false;
    }

    //闭包:返回对应图片的base64  !IE10
    //const jBase64=$$.fnGetImageBase64("backImage.jpg");
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

    }

    //给元素添加滚轮事件  $$.fnAddMouseWheel(window,function fn(){},function fn(){});  !IE8
    fnAddMouseWheel(eElement, fnUp, fnDown, bCapture = false) {
        this.jMouseWheel[fnUp.name || fnDown.name] = function (ev) {
            ev.wheelDelta ? (ev.wheelDelta > 0 ? fnUp(ev) : fnDown(ev)) : (ev.detail < 0 ? fnUp(ev) : fnDown(ev));
        };
        eElement.addEventListener("mousewheel", this.jMouseWheel[fnUp.name || fnDown.name], bCapture);
        eElement.addEventListener("DOMMouseScroll", this.jMouseWheel[fnUp.name || fnDown.name], bCapture);
    }

    //移除元素滚轮事件  $$.fnRemoveMouseWheel(window,"fn");  !IE8
    fnRemoveMouseWheel(eElement, sFnName, bCapture = false) {
        eElement.removeEventListener("mousewheel", this.jMouseWheel[sFnName], bCapture);
        eElement.removeEventListener("DOMMouseScroll", this.jMouseWheel[sFnName], bCapture);
    }

    //得到键盘键码  $$.fnGetKeyCode(ev);  !IE8
    fnGetKeyCode(ev) {
        let nResult = ev.keyCode;
        if (nResult == 186) {
            nResult = 59;
        }
        return nResult;
    }

    //浏览器关闭事件  $$.fnOnBeForeUnload("是否关闭？");  !IE10
    fnOnBeForeUnload(sText, fn) {
        const fnBeforeUnload = function (ev) {
            fn();
            ev.returnValue = sText;
            return sText;
        };
        window.removeEventListener("beforeunload", fnBeforeUnload);
        window.addEventListener("beforeunload", fnBeforeUnload);

    }

    //自定义右键菜单  $$.fnCustomRightMenu(eUl);  !IE8
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
    }

    //得到localStorage的key和value  $$.fnGetStorage(function(key,value){});  !IE8
    fnGetStorage(fn) {
        const oStorage = window.localStorage;
        for (let i = 0, size = oStorage.length; i < size; i++) {
            fn(oStorage.key(i), oStorage.getItem(oStorage.key(i)));
        }
    }

    //获取哈希值  $$.fnGetHash()  !IE8
    fnGetHash() {
        return location.hash.replace(/(\#)(.+)/, function ($0, $1, $2) {
            return $2;
        });
    }

    //移除元素的所有事件处理函数[并删除元素]  $$.fnRemoveElementAllEvent(eBtn1,true);  !IE10
    fnRemoveElementAllEvent(eElement, bDeleteElement = false) {
        if (!eElement.id) {
            console.error(`<${eElement.nodeName.toLocaleLowerCase()}>.id cannot is null`);
        }
        for (let attr in this.jEvent[eElement.id]) {
            if (this.jEvent[eElement.id][attr].nodeType !== 1 && this.jEvent[eElement.id][attr] !== window) {
                this.fnRemoveEvent(eElement, this.jEvent[eElement.id][attr].sEvent, attr);
            }
        }
        if (bDeleteElement) {
            this.jEvent[eElement.id] = null;
            eElement.remove();
        }
    }

    //移除页面上的所有事件处理函数
    fnRemoveDocumentAllEvent() {
        for (let attr in this.jEvent) {
            this.fnRemoveElementAllEvent(this.jEvent[attr].eElement);
        }
        this.jEvent = null;
    }

    //排除输入  $$.fnScreeningInput(eInput,"123");  !IE10
    fnScreeningInput(eElement, sExcept) {

        const This = this;

        This.fnAddEvent(eElement, "keypress", function fnScreeningInputKeyPress(ev) {

            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey) {

                if (sExcept.indexOf(String.fromCharCode(ev.charCode)) !== -1) {
                    ev.preventDefault();
                }

            }

        });

    }

    //排除粘贴  $$.fnScreeningPaste(eInput,["12","10"],function(){});  !IE10
    fnScreeningPaste(eElement, aExcept, fn) {

        const This = this;

        $$.fnAddEvent(eElement, "paste", function fnScreeningPaste(ev) {

            for (let i = 0, size = aExcept.length; i < size; i++) {

                if (ev.clipboardData.getData("text/plain").indexOf(aExcept[i]) !== -1) {

                    ev.preventDefault();

                    fn();

                    break

                }

            }

        });

    }

    //检测类型  $$.fnTypeof(oopFnAjax,FnAjax);  !IE8
    fnTypeof(opt, fn) {

        let result;

        if (fn) {

            if (fn instanceof Function) {
                result = opt instanceof fn
            }

        } else {

            switch (Object.prototype.toString.call(opt)) {

                case "[object Number]" :

                    if(isNaN(opt)){
                        result="NaN";
                    }else if(isFinite(opt)){
                        result="Number";
                    }else {
                        result="Infinity";
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

    }

    //异步forEach  $$.fnAsyncForeach(aOpt,function(item){});  !IE8
    fnAsyncForeach(aOpt, fnProcess, context = null) {

        const This = this;

        if (This.fnTypeof(aOpt) === "Array" && This.fnTypeof(fnProcess) === "Function") {

            let nIndex = 0;

            setTimeout(function fn() {

                //取出下一个异步执行的参数
                const item = aOpt[nIndex];

                fnProcess.call(context, item);

                nIndex++;

                if (nIndex < aOpt.length) {

                    setTimeout(fn);

                }

            }, 100);

        } else {

            console.error("aOpt isn't a Array || fnProcess isn't a Function");

        }

    }

    //异步执行函数序列  $$.fnAsyncProcess(aFn);  !IE8
    fnAsyncProcess(aFnProcess) {

        const This = this;

        if (This.fnTypeof(aFnProcess) === "Array") {

            let nIndex = 0;

            setTimeout(function fn() {

                const fnProcess = aFnProcess[nIndex];

                if (This.fnTypeof(fnProcess) === "Function") {

                    fnProcess();

                } else {

                    console.error("fnProcess isn't a Function");

                }

                nIndex++;

                if (nIndex < aFnProcess.length) {

                    setTimeout(fn, 100);

                }

            }, 100);

        } else {

            console.error("aFnProcess isn't a Array");

        }

    }

    //设置cookie  $$.setCookie({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
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
    }

    //得到cookie  $$.getCookie(["username"],["password","wx"]);  !IE8
    fnGetCookie(aKey1,aKey2) {
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
    }

    //删除cookie(不能删除子cookie)  $$.delCookie(["username"],["password"]);  !IE8
    fnDelCookie(aKey, aKey2) {
        const This = this;
        const jAllCookie = This.fnGetCookie();
        if (arguments.length===0) {
            for (let sAllCookieKey in jAllCookie) {
                document.cookie = `${encodeURIComponent(sAllCookieKey)}=关闭浏览器时清除此cookie;expires=-1`;
            }
        } else {
            for(let i=0;i<arguments.length;i++){
                if(arguments[i] instanceof Array){
                    switch (arguments[i].length){
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
    }

    //设置存储数据  $$.fnSetStorage({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
    fnSetStorage(jData,sStorageType=localStorage){
        for(let sKey in jData){
            sStorageType[sKey]=JSON.stringify(jData[sKey]);
        }
    }

    //得到存储的数据  $$.fnGetStorage(["username"],["password","wx"]);  !IE8
    fnGetStorage(sStorageType=localStorage) {
        let result={};
        for (let i = 0; i < sStorageType.length; i++) {
            const sKey = sStorageType.key(i);
            const sValue = JSON.parse(sStorageType.getItem(sKey));
            result[sKey] = sValue;
        }
        return result
    }

    //删除存储的数据  $$.fnDelStorage();  !IE8
    fnDelStorage(sStorageType=localStorage){
        sStorageType.clear();
    }

    //动态获取ip地址  mdj.fnGetIp("admin/custom_mark/doSave");
    fnGetAllIp(sAfterUrl=""){
        const pathName=document.location.pathname;
        const projectName=pathName.substring(0,pathName.substr(1).indexOf("/")+1)+"/";
        return $$.fnGetHttpOrHttps(`http://${location.host}${projectName}${sAfterUrl}`);
    }

    //得到整数
    fnGetInteger(nNum){
        if(this.fnTypeof(nNum)==="Number"){
            return Math[nNum<0?"ceil":"floor"](nNum);
        }else {
            console.error(`nNum isn't Number`);
        }
    }

    //移除字符串首尾空格
    fnTrim(sString){
        if(this.fnTypeof(sString)==="String"){
            return sString.replace(/^\s+|\s+$/g,"");
        }
    }

}
const hQuery = new HQuery();
//Object.freeze(HQuery);//冻结对象
const $$ = hQuery;
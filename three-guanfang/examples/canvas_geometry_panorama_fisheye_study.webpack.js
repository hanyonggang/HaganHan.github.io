/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hagan = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fn3DScene = function () {
	        function Fn3DScene(eDivCanvasPar, eDivStatsPar) {
	                _classCallCheck(this, Fn3DScene);

	                this.eDivCanvasPar = eDivCanvasPar;
	                this.eDivStatsPar = eDivStatsPar;

	                this.oScene = Object;
	                this.oCamera = Object;
	                this.oRenderer = Object;
	                this.oStats = Object;
	                this.oSkyBox = Object;

	                this.jSettings = {

	                        sClearColor: 0xeeeeee,
	                        nCanvasWidth: _hagan.hg.fnGetWindowWidth(),
	                        nCanvasHeight: _hagan.hg.fnGetWindowHeight()

	                };
	        }

	        _createClass(Fn3DScene, [{
	                key: "fnInit",
	                value: function fnInit(jOpt) {

	                        this.fnSetSettings(jOpt);
	                        this.fnSetScene();
	                        this.fnSetCamera();
	                        this.fnSetRenderer();
	                        this.fnSetStats();
	                        this.fnSetSkyBox();
	                        this.fnMouseMove();
	                        this.fnRender();
	                }
	        }, {
	                key: "fnSetSettings",
	                value: function fnSetSettings(jOpt) {

	                        for (var sKey in jOpt) {

	                                this.jSettings[sKey] = jOpt[sKey];
	                        }
	                }
	        }, {
	                key: "fnSetScene",
	                value: function fnSetScene() {

	                        this.oScene = new THREE.Scene();
	                }
	        }, {
	                key: "fnSetCamera",
	                value: function fnSetCamera() {

	                        this.oCamera = new THREE.PerspectiveCamera(75, this.jSettings.nCanvasWidth / this.jSettings.nCanvasHeight, 1, 10000);
	                        this.oCamera.position.x = 0;
	                        this.oCamera.position.y = 0;
	                        this.oCamera.position.z = 100;
	                        this.oCamera.up.x = 0;
	                        this.oCamera.up.y = 1;
	                        this.oCamera.up.z = 0;
	                        this.oCamera.lookAt({
	                                x: 0,
	                                y: 0,
	                                z: 0
	                        });

	                        this.oScene.add(this.oCamera);
	                }
	        }, {
	                key: "fnSetRenderer",
	                value: function fnSetRenderer() {

	                        this.oRenderer = new THREE.CanvasRenderer();
	                        this.oRenderer.setClearColor(this.jSettings.sClearColor);
	                        this.oRenderer.setPixelRatio(window.devicePixelRatio);
	                        this.oRenderer.setSize(this.jSettings.nCanvasWidth, this.jSettings.nCanvasHeight);
	                        this.eDivCanvasPar.appendChild(this.oRenderer.domElement);
	                }
	        }, {
	                key: "fnSetStats",
	                value: function fnSetStats() {

	                        this.oStats = new Stats();
	                        this.eDivStatsPar.appendChild(this.oStats.dom);
	                }
	        }, {
	                key: "fnSetSkyBox",
	                value: function fnSetSkyBox() {

	                        var oCanvas = document.createElement("canvas");
	                        oCanvas.width = 300;
	                        oCanvas.height = 300;
	                        var oContext = oCanvas.getContext("2d");
	                        oContext.fillStyle = "#0f0";
	                        oContext.fillRect(0, 0, 300, 300);

	                        var aImgUrl = [fnLoadTexture("./skyBox/right.png"), fnLoadTexture("./skyBox/left.jpg"), fnLoadTexture("./skyBox/up.png"), fnLoadTexture("./skyBox/bottom.png"), fnLoadTexture("./skyBox/back.png"), fnLoadTexture("./skyBox/front.png")];

	                        function fnLoadTexture(sImgUrl) {

	                                var texture = new THREE.Texture(oCanvas);
	                                var material = new THREE.MeshBasicMaterial({
	                                        map: texture,
	                                        overdraw: 0.5
	                                });

	                                var oImg = new Image();
	                                oImg.onload = function () {

	                                        texture.image = this;
	                                        texture.needsUpdate = true;
	                                };
	                                oImg.src = sImgUrl;
	                                return material;
	                        }

	                        var geometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10);
	                        var material = new THREE.MultiMaterial(aImgUrl);

	                        this.oSkyBox = new THREE.Mesh(geometry, material);
	                        this.oSkyBox.scale.x = -1;

	                        for (var i = 0, l = this.oSkyBox.geometry.vertices.length; i < l; i++) {

	                                var vertex = this.oSkyBox.geometry.vertices[i];

	                                vertex.normalize();
	                                vertex.multiplyScalar(550);
	                        }

	                        this.oScene.add(this.oSkyBox);
	                }
	        }, {
	                key: "fnMouseMove",
	                value: function fnMouseMove() {

	                        var This = this;

	                        _hagan.hg.fnAddEvent(window, "mousedown", function fnWindowMouseDown(evDown) {

	                                var nOldX = evDown.clientX;
	                                var nOldY = evDown.clientY;

	                                _hagan.hg.fnAddEvent(window, "mousemove", function fnWindowMouseMove(evMove) {

	                                        var nIngX = evMove.clientX;
	                                        var nIngY = evMove.clientY;

	                                        This.oSkyBox.rotation.y -= 0.003 * (nIngX - nOldX);
	                                        This.oSkyBox.rotation.x -= 0.003 * (nIngY - nOldY);

	                                        nOldX = evMove.clientX;
	                                        nOldY = evMove.clientY;
	                                });

	                                _hagan.hg.fnAddEvent(window, "mouseup", function fnWindowMouseUp() {

	                                        _hagan.hg.fnRemoveEvent(window, "mousemove", "fnWindowMouseMove");
	                                        _hagan.hg.fnRemoveEvent(window, "mouseup", "fnWindowMouseUp");
	                                });
	                        });
	                }
	        }, {
	                key: "fnRender",
	                value: function fnRender() {

	                        var This = this;

	                        function fnRender() {

	                                This.oStats.begin();

	                                This.oRenderer.render(This.oScene, This.oCamera);
	                                requestAnimationFrame(fnRender);

	                                This.oStats.end();
	                        }

	                        fnRender();
	                }
	        }]);

	        return Fn3DScene;
	}();

	window.oop3DScene = new Fn3DScene(document.querySelector("#div-canvasPar"), document.querySelector("#div-statsPar"));
	oop3DScene.fnInit();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _hagan;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var hagan = (_hagan = { //根据设备判断touch或者click

	    jInfo: { //所有的依赖信息
	        rem: Number, //存着html标签上的字体大小
	        jTimer: {}, //存着模拟定时器的执行序列
	        jEvent: {}, //存着所有元素id绑定的事件函数
	        jMouseWheel: {}, //存着所有绑定的滚轮事件
	        jTouchInfo: {} },

	    //绑定对象的事件函数  hagan.fnAddEvent(eBtn,"click",function fnAlert1(){});  !IE10
	    fnAddEvent: function fnAddEvent(oElement, sEvent, fn) {
	        var bCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        var This = this;
	        if (oElement === window) {
	            oElement.id = "window";
	        }
	        if (!oElement.id) {
	            console.error("<" + oElement.nodeName.toLocaleLowerCase() + ">.id cannot is null");
	        }
	        sEvent = This.fnJudgeUaGetEventName(sEvent);
	        if (!fn.name) {
	            console.error("fn.name cannot is null");
	        }
	        if (!this.jInfo.jEvent[oElement.id]) {
	            this.jInfo.jEvent[oElement.id] = {};
	        }
	        this.jInfo.jEvent[oElement.id][fn.name] = { "sEvent": sEvent, "fnMethod": fn };
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
	    fnJudgeUaGetEventName: function fnJudgeUaGetEventName(sEvent) {

	        var This = this;
	        var sResult = void 0;

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
	                default:
	                    sResult = sEvent;
	                    break;
	            }
	            return sResult;
	        }

	        This.fnJudgeUa({
	            fnAndroid: function fnAndroid() {
	                fnGetMobileDeviceEventName();
	            },
	            fnIos: function fnIos() {
	                fnGetMobileDeviceEventName();
	            },
	            fnPc: function fnPc() {
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
	                    default:
	                        sResult = sEvent;
	                        break;
	                }
	                return sResult;
	            }
	        });

	        return sResult;
	    },


	    //touch事件封装
	    fnTouch: function fnTouch(oElement, fn) {
	        var bCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


	        var bFn = void 0;

	        var fnTouchMove = function fnTouchMove() {
	            bFn = false;
	        };
	        var fnTouchEnd = function fnTouchEnd() {
	            if (bFn) {
	                fn.call(oElement);
	            }
	            oElement.removeEventListener("touchmove", fnTouchMove, bCapture);
	            oElement.removeEventListener("touchend", fnTouchEnd, bCapture);
	        };
	        var fnTouchStart = function fnTouchStart() {

	            bFn = true;

	            oElement.addEventListener("touchmove", fnTouchMove, bCapture);
	            oElement.addEventListener("touchend", fnTouchEnd, bCapture);
	        };

	        oElement.addEventListener("touchstart", fnTouchStart, bCapture);

	        if (!this.jInfo.jTouchInfo[oElement.id]) {
	            this.jInfo.jTouchInfo[oElement.id] = {};
	        }
	        this.jInfo.jTouchInfo[oElement.id][fn.name] = { "sEvent": "touch", "fnMethod": fnTouchStart };
	    },


	    //解除对象的事件函数绑定  hagan.fnRemoveEvent(eBtn,"click","fnAlert1");  !IE10
	    fnRemoveEvent: function fnRemoveEvent(oElement, sEvent, sFnName) {
	        var bCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        var This = this;
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
	        } catch (err) {}
	    },


	    //主动触发对象的事件函数  hagan.fnFireEventFn(eBtn,"fnTest");  !IE10
	    fnFireEventFn: function fnFireEventFn(oElement, sFnName, oEv) {
	        this.jInfo.jEvent[oElement.id][sFnName].fnMethod.call(oElement, oEv);
	    },


	    //主动触发对象的事件  hagan.fnFireEvent(eBtn,"test");  !IE10
	    fnFireEvent: function fnFireEvent(oElement, sEvent, oEv) {
	        sEvent = this.fnJudgeUaGetEventName(sEvent);
	        for (var attr in this.jInfo.jEvent[oElement.id]) {
	            if (this.jInfo.jEvent[oElement.id][attr].sEvent === sEvent && this.jInfo.jEvent[oElement.id][attr].fnMethod instanceof Function) {
	                this.jInfo.jEvent[oElement.id][attr].fnMethod.call(oElement, oEv);
	            }
	        }
	    },


	    //主动触发元素的鼠标事件  hagan.fnSimulateMouseEvent(eBtn,"click",{"clientX":200,"clientY":400});  F|C|O
	    fnFireMouseEvent: function fnFireMouseEvent(eElement, sEvent, jEvent) {
	        sEvent = this.fnJudgeUaGetEventName(sEvent);
	        var evMouse = new MouseEvent(sEvent, jEvent);
	        eElement.dispatchEvent(evMouse);
	    },


	    //主动触发元素的键盘事件  hagan.fnSimulateKeyboardEvent(eBtn,"click",{"keyCode":13});  F
	    fnFireKeyboardEvent: function fnFireKeyboardEvent(eElement, sEvent, jEvent) {
	        jEvent.bAlt ? jEvent.bAlt = jEvent.bAlt : jEvent.bAlt = false;
	        jEvent.bCtrl ? jEvent.bCtrl = jEvent.bCtrl : jEvent.bCtrl = false;
	        jEvent.bShift ? jEvent.bShift = jEvent.bShift : jEvent.bShift = false;
	        var event = document.createEvent("Events");
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
	    fnAddEntrustEvent: function fnAddEntrustEvent(eElement, sEvent, jIdFn) {
	        var bCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        if (!eElement.id) {
	            console.error("<" + eElement.nodeName.toLocaleLowerCase() + ">.id cannot is null");
	        }
	        this.fnAddEvent(eElement, sEvent, function fnAddEntrustEvent(ev) {
	            var sTargetId = String;
	            try {
	                sTargetId = ev.srcElement.id;
	            } catch (err) {
	                sTargetId = ev.originalTarget.id;
	            }
	            for (var attr in jIdFn) {
	                if (sTargetId === attr) {
	                    jIdFn[sTargetId]();
	                }
	            }
	        }, bCapture);
	    },


	    //委托元素的事件函数绑定解除  hagan.fnRemoveEntrustEvent(document.body,"click");  !IE10
	    fnRemoveEntrustEvent: function fnRemoveEntrustEvent(eElement, sEvent) {
	        var bCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        this.fnRemoveEvent(eElement, sEvent, "fnAddEntrustEvent", bCapture);
	    },


	    //模拟窗口大小改变事件且优化性能  hagan.fnOnReSize(function(){});  !IE8
	    fnOnReSize: function fnOnReSize(fn) {
	        var bDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        if (bDefault) {
	            fn();
	        }
	        var event = "onorientationchange" in window ? "orientationchange" : "resize";
	        var timer = null;
	        window.addEventListener(event, function () {
	            clearTimeout(timer);
	            timer = setTimeout(function () {
	                var nStatus = window.orientation;
	                fn(nStatus);
	            }, 500);
	        }, false);
	    },


	    //动态设置html根节点的字体大小 hagan.fnSetHtmlFontSize();  !IE8
	    fnSetHtmlFontSize: function fnSetHtmlFontSize() {

	        var This = this;

	        var eHtml = document.querySelector("html");

	        var nViewportWidth = Math.min(This.fnGetViewportWidth(), This.fnGetViewportHeight());

	        This.jInfo.rem = nViewportWidth / 10;

	        eHtml.style.fontSize = This.jInfo.rem + "px";
	    },


	    //求出与设计图对应的像素尺寸  hagan.fnSetMobileStyle(eDiv,"width",200,750);  !IE8
	    fnSetMobileStyle: function fnSetMobileStyle(eElement, sStyle, nPx) {
	        var designWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 750;

	        eElement.style[sStyle] = this.jInfo.rem * 30 * nPx / designWidth + "px";
	    },


	    //得到rem布局对应rem尺寸
	    fnGetRem: function fnGetRem(nPx) {
	        var designWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 750;

	        return 10 * nPx / designWidth;
	    },


	    //得到rem布局对应的像素尺寸
	    fnGetRemPx: function fnGetRemPx(nPx) {
	        var designWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 750;

	        return 10 * nPx / designWidth * this.jInfo.rem;
	    },


	    //得到百分比布局对应的像素尺寸
	    fnGetFlowPx: function fnGetFlowPx(nPx) {
	        var designWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 750;

	        return document.documentElement.clientWidth * nPx / designWidth;
	    },


	    //得到计算后的样式  hagan.fnGetStyle(eDiv,"width",":after");  !IE8
	    fnGetFinalStyle: function fnGetFinalStyle(eElement, sStyle) {
	        var sPseudoElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	        return document.defaultView.getComputedStyle(eElement, sPseudoElement)[sStyle];
	    },


	    //得到文档宽度  hagan.fnGetWindowWidth();  !IE8
	    fnGetWindowWidth: function fnGetWindowWidth() {

	        var nWindowWidth = document.documentElement.clientWidth;
	        this.fnGetWindowWidth = function () {
	            return nWindowWidth;
	        };
	        return nWindowWidth;
	    },


	    //得到文档高度  hagan.fnGetWindowHeight();  !IE8
	    fnGetWindowHeight: function fnGetWindowHeight() {

	        var nWindowHeight = document.documentElement.clientHeight;
	        this.fnGetWindowHeight = function () {
	            return nWindowHeight;
	        };
	        return nWindowHeight;
	    },


	    //得到文档总宽度  hagan.fnGetDocumentWidth();  !IE8
	    fnGetDocumentWidth: function fnGetDocumentWidth() {
	        return Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
	    },


	    //得到文档总高度  hagan.fnGetDocumentHeight();  !IE8
	    fnGetDocumentHeight: function fnGetDocumentHeight() {
	        return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
	    },


	    //得到元素至html最左边的距离  hagan.fnGetToHtmlLeft(eDiv);  !IE8
	    fnGetToHtmlLeft: function fnGetToHtmlLeft(eElement) {
	        var nResult = 0,
	            ePositionPar = eElement;

	        while (ePositionPar) {
	            nResult += ePositionPar.offsetLeft;
	            ePositionPar = ePositionPar.offsetParent;
	        }
	        return nResult;
	    },


	    //得到元素至html顶部的距离  hagan.fnGetToHtmlTop(eDiv);  !IE8
	    fnGetToHtmlTop: function fnGetToHtmlTop(eElement) {
	        var nResult = 0,
	            ePositionPar = eElement;

	        while (ePositionPar) {
	            nResult += ePositionPar.offsetTop;
	            ePositionPar = ePositionPar.offsetParent;
	        }
	        return nResult;
	    },


	    //得到元素位置尺寸信息  hagan.fnGetElementSizeInfo(eDiv1);  !IE8
	    fnGetElementSizeInfo: function fnGetElementSizeInfo(eElement) {
	        var jJson = eElement.getBoundingClientRect();
	        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	        return {
	            "pageX": jJson.left + scrollLeft,
	            "pageY": jJson.top + scrollTop,
	            "width": jJson.width,
	            "height": jJson.height
	        };
	    },


	    //向url中添加查询字符串
	    fnUrlToQueryString: function fnUrlToQueryString(sUrl, sKey, sValue) {
	        if (typeof sUrl === "string" && typeof sKey === "string" && typeof sValue === "string") {

	            if (sUrl.indexOf("?") === -1) {
	                sUrl += "?";
	            } else {
	                sUrl += "&";
	            }

	            sUrl += encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue);

	            return sUrl;
	        }
	    },


	    //得到ajax传参所需格式
	    fnGetAjaxStr: function fnGetAjaxStr(jData) {
	        var sResult = "";
	        for (var attr in jData) {
	            if (_typeof(jData[attr]) === "object") {
	                sResult += attr + "=" + JSON.stringify(jData[attr]) + "&";
	            } else {
	                sResult += attr + "=" + jData[attr] + "&";
	            }
	        }
	        return sResult;
	    },


	    //ajax封装  hagan.fnAjax({});
	    fnAjax: function fnAjax(jOpt) {

	        var This = this;

	        jOpt.sType = jOpt.sType || "get";
	        jOpt.sDataType === "file" ? jOpt.sType = "post" : jOpt.sType = jOpt.sType;
	        jOpt.sType === "get" ? jOpt.sUrl = jOpt.sUrl + "?" + This.fnGetAjaxStr(jOpt.jData) : jOpt.sUrl = jOpt.sUrl;
	        jOpt.sType === "get" ? jOpt.jData = null : jOpt.sDataType === "file" ? jOpt.jData = jOpt.jData : jOpt.jData = This.fnGetAjaxStr(jOpt.jData || "");
	        jOpt.bAsync = jOpt.bAsync || false;

	        var oopAjax = new XMLHttpRequest();

	        if (jOpt.fnProgress instanceof Function) {
	            //进度条事件
	            oopAjax.onprogress = function (ev) {
	                jOpt.fnProgress(ev.total, ev.loaded);
	            };
	        }

	        if (typeof jOpt.nTimeOut === "number") {
	            //设置超时方法
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
	            if (oopAjax.status >= 200 && oopAjax.status < 300 || oopAjax.status === 304) {
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
	    fnGetHttpOrHttps: function fnGetHttpOrHttps(sUrl) {
	        return sUrl.replace(/(http.?\:)(.+)/, function (sNative, child1, child2) {
	            return "" + location.protocol + child2;
	        });
	    },


	    //判断ua并执行对应函数  hagan.fnJudgeUa({"fnIos","fnAndroid","fnPc"});
	    fnJudgeUa: function fnJudgeUa(jOpt) {
	        var sUa = navigator.userAgent.toLowerCase();
	        if (/iphone|ipad|ipod/.test(sUa)) {
	            jOpt["fnIos"]();
	            this.fnJudgeUa = function (jOpt) {
	                //惰性载入函数
	                jOpt["fnIos"]();
	            };
	        } else if (/android/.test(sUa)) {
	            jOpt["fnAndroid"]();
	            this.fnJudgeUa = function (jOpt) {
	                //惰性载入函数
	                jOpt["fnAndroid"]();
	            };
	        } else {
	            jOpt["fnPc"]();
	            this.fnJudgeUa = function (jOpt) {
	                //惰性载入函数
	                jOpt["fnPc"]();
	            };
	        }
	    },


	    //设置自定义定时器  hagan.fnSetInterval(function nTimer1(){},1000);  !IE10
	    //为了防止后一个调用会在前一个调用结束之前执行, 使用setTimeout模拟setInterval
	    fnSetInterval: function fnSetInterval(fn, nMs) {
	        var bStatus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	        if (!fn.name) {
	            console.error("fn.name cannot is null");
	        }
	        var This = this;
	        This.jInfo.jTimer[fn.name] = true;
	        if (bStatus) {
	            fn();
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
	    fnClearInterval: function fnClearInterval(nTimer) {
	        clearTimeout(this.jInfo.jTimer[nTimer]);
	        this.jInfo.jTimer[nTimer] = false;
	    },


	    //闭包:返回对应图片的base64  !IE10
	    //const jBase64=hagan.fnGetImageBase64("backImage.jpg");
	    //jBase64["oImage"].onload=()=>{const sBase64=jBase64["fnOnLoad"]()["str"]};
	    fnGetImageBase64: function fnGetImageBase64(sImageUrl) {
	        //调用该方法返回一个以传入链接创建的一个图片标签和该图片标签的onload事件组成的json

	        var sResult = String;

	        var oImage = document.createElement("img");
	        oImage.crossOrigin = "Anonymous";
	        oImage.style["verticalAlign"] = "middle";
	        oImage.src = sImageUrl;

	        return {
	            "oImage": oImage,
	            "fnOnLoad": function fnOnLoad() {
	                //调用该方法返回base64的原始数据和经过处理的str数据组成的json

	                var oCanvas = document.createElement("canvas");
	                oCanvas.width = oImage.width;
	                oCanvas.height = oImage.height;
	                var oContext = oCanvas.getContext("2d");
	                oContext.drawImage(oImage, 0, 0, oImage.width, oImage.height);
	                var sSuffix = oImage.src.substring(oImage.src.lastIndexOf(".") + 1).toLowerCase();
	                sResult = oCanvas.toDataURL("image/" + sSuffix);

	                return {
	                    "base64": sResult,
	                    "str": sResult.replace(/(data\:image\/png\;)(base64\,)(.+)/, function ($0, $1, $2, $3) {
	                        return $3;
	                    })
	                };
	            }
	        };
	    },


	    //给元素添加滚轮事件  hagan.fnAddMouseWheel(window,function fn(){},function fn(){});  !IE8
	    fnAddMouseWheel: function fnAddMouseWheel(eElement, fnUp, fnDown) {
	        var bCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        this.jInfo.jMouseWheel[fnUp.name || fnDown.name] = function (ev) {
	            ev.wheelDelta ? ev.wheelDelta > 0 ? fnUp(ev) : fnDown(ev) : ev.detail < 0 ? fnUp(ev) : fnDown(ev);
	        };
	        eElement.addEventListener("mousewheel", this.jInfo.jMouseWheel[fnUp.name || fnDown.name], bCapture);
	        eElement.addEventListener("DOMMouseScroll", this.jInfo.jMouseWheel[fnUp.name || fnDown.name], bCapture);
	    },


	    //移除元素滚轮事件  hagan.fnRemoveMouseWheel(window,"fn");  !IE8
	    fnRemoveMouseWheel: function fnRemoveMouseWheel(eElement, sFnName) {
	        var bCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        eElement.removeEventListener("mousewheel", this.jInfo.jMouseWheel[sFnName], bCapture);
	        eElement.removeEventListener("DOMMouseScroll", this.jInfo.jMouseWheel[sFnName], bCapture);
	    },


	    //得到键盘键码  hagan.fnGetKeyCode(ev);  !IE8
	    fnGetKeyCode: function fnGetKeyCode(ev) {
	        var nResult = ev.keyCode;
	        if (nResult == 186) {
	            nResult = 59;
	        }
	        return nResult;
	    },


	    //浏览器关闭事件  hagan.fnOnBeForeUnload("是否关闭？");  !IE10
	    fnOnBeForeUnload: function fnOnBeForeUnload(sText, fn) {
	        var fnBeforeUnload = function fnBeforeUnload(ev) {
	            fn();
	            ev.returnValue = sText;
	            return sText;
	        };
	        window.removeEventListener("beforeunload", fnBeforeUnload);
	        window.addEventListener("beforeunload", fnBeforeUnload);
	    },


	    //自定义右键菜单  hagan.fnCustomRightMenu(eUl);  !IE8
	    fnCustomRightMenu: function fnCustomRightMenu(eUl, fn) {
	        window.addEventListener("contextmenu", function (ev) {
	            fn();
	            ev.preventDefault();
	            eUl.style.top = ev.pageY + "px";
	            eUl.style.left = ev.pageX + "px";
	            eUl.style.display = "block";
	        });
	        document.documentElement.addEventListener("click", function () {
	            eUl.style.display = "none";
	        });
	    },


	    //得到localStorage的key和value  hagan.fnGetStorage(function(key,value){});  !IE8
	    fnGetStorage: function fnGetStorage(fn) {
	        var oStorage = window.localStorage;
	        for (var i = 0, size = oStorage.length; i < size; i++) {
	            fn(oStorage.key(i), oStorage.getItem(oStorage.key(i)));
	        }
	    },


	    //获取哈希值  hagan.fnGetHash()  !IE8
	    fnGetHash: function fnGetHash() {
	        return location.hash.replace(/(\#)(.+)/, function ($0, $1, $2) {
	            return $2;
	        });
	    },


	    //移除元素的所有事件处理函数[并删除元素]  hagan.fnRemoveElementAllEvent(eBtn1,true);  !IE10
	    fnRemoveElementAllEvent: function fnRemoveElementAllEvent(eElement) {
	        var bDeleteElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        if (!eElement.id) {
	            console.error("<" + eElement.nodeName.toLocaleLowerCase() + ">.id cannot is null");
	        }
	        for (var attr in this.jInfo.jEvent[eElement.id]) {
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
	    fnRemoveDocumentAllEvent: function fnRemoveDocumentAllEvent() {
	        for (var attr in this.jInfo.jEvent) {
	            this.fnRemoveElementAllEvent(this.jInfo.jEvent[attr].eElement);
	        }
	        this.jInfo.jEvent = null;
	    },


	    //排除输入  hagan.fnScreeningInput(eInput,"123");  !IE10
	    fnScreeningInput: function fnScreeningInput(eElement, sExcept) {

	        var This = this;

	        This.fnAddEvent(eElement, "keypress", function fnScreeningInputKeyPress(ev) {

	            if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey) {

	                if (sExcept.indexOf(String.fromCharCode(ev.charCode)) !== -1) {
	                    ev.preventDefault();
	                }
	            }
	        });
	    },


	    //排除粘贴  hagan.fnScreeningPaste(eInput,["12","10"],function(){});  !IE10
	    fnScreeningPaste: function fnScreeningPaste(eElement, aExcept, fn) {

	        var This = this;

	        This.fnAddEvent(eElement, "paste", function fnScreeningPaste(ev) {

	            for (var i = 0, size = aExcept.length; i < size; i++) {

	                if (ev.clipboardData.getData("text/plain").indexOf(aExcept[i]) !== -1) {

	                    ev.preventDefault();

	                    fn();

	                    break;
	                }
	            }
	        });
	    },


	    //检测类型  hagan.fnTypeof(oopFnAjax,FnAjax);  !IE8
	    fnTypeof: function fnTypeof(opt, fn) {

	        var result = void 0;

	        if (fn) {

	            if (fn instanceof Function) {
	                result = opt instanceof fn;
	            }
	        } else {

	            switch (Object.prototype.toString.call(opt)) {

	                case "[object Number]":

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
	    fnAsyncForeach: function fnAsyncForeach(aOpt, fnProcess) {
	        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


	        var This = this;

	        if (aOpt instanceof Array && fnProcess instanceof Function) {
	            var _fn = function _fn() {

	                var nStartTime = +new Date();

	                do {

	                    //取出下一个异步执行的参数
	                    var item = aOpt[nIndex];

	                    fnProcess.call(context, item);

	                    nIndex++;
	                } while (nIndex < aOpt.length && +new Date() - nStartTime < 50);

	                if (nIndex < aOpt.length) {

	                    requestAnimationFrame(_fn);
	                }
	            };

	            var nIndex = 0;

	            _fn();
	        } else {

	            console.error("aOpt isn't a Array || fnProcess isn't a Function");
	        }
	    },


	    //异步执行函数序列  hagan.fnAsyncProcess(aFn);  !IE8
	    fnAsyncProcess: function fnAsyncProcess(aFnProcess) {
	        var aArguments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


	        var This = this;

	        if (aFnProcess instanceof Array) {
	            var _fn2 = function _fn2() {

	                var nStartTime = +new Date();

	                do {

	                    var fnProcess = aFnProcess[nIndex];

	                    if (fnProcess instanceof Function) {

	                        fnProcess(aArguments[nIndex], nIndex, aArguments);
	                    } else {

	                        console.error("fnProcess[" + nIndex + "] isn't a Function");
	                    }

	                    nIndex++;
	                } while (nIndex < aFnProcess.length && +new Date() - nStartTime < 50);

	                if (nIndex < aFnProcess.length) {

	                    requestAnimationFrame(_fn2);
	                }
	            };

	            var nIndex = 0;

	            _fn2();
	        } else {

	            console.error("aFnProcess isn't a Array");
	        }
	    },


	    //异步遍历数组
	    fnAsyncErgodicArray: function fnAsyncErgodicArray(aItem, fnIng, fnEnd) {

	        var nKey = 0;

	        function fn() {

	            var nStartTime = +new Date();

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
	    fnSetCookie: function fnSetCookie(jAllCookie) {
	        var nDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	        var oDate = void 0;
	        var sDel = false;
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
	        for (var sAllCookieKey in jAllCookie) {
	            var sCookieValue = "";
	            if (typeof jAllCookie[sAllCookieKey] === "string") {
	                sCookieValue += jAllCookie[sAllCookieKey] + "&";
	            } else if (jAllCookie[sAllCookieKey] instanceof Object) {
	                for (var sCookieKey in jAllCookie[sAllCookieKey]) {
	                    sCookieValue += sCookieKey + "=" + jAllCookie[sAllCookieKey][sCookieKey] + "&";
	                }
	            }
	            sCookieValue = sCookieValue.replace(/(.+)\&$/, function ($0, $1) {
	                return $1;
	            });
	            document.cookie = encodeURIComponent(sAllCookieKey) + "=" + (sDel || encodeURIComponent(sCookieValue)) + ";expires=" + oDate;
	        }
	    },


	    //得到cookie  hagan.getCookie(["username"],["password","wx"]);  !IE8
	    fnGetCookie: function fnGetCookie(aKey1, aKey2) {
	        var sAllCookie = document.cookie;
	        var aAllCookie = sAllCookie.split("; ");
	        var jAllCookie = {};
	        var result = void 0;
	        for (var i = 0; i < aAllCookie.length; i++) {
	            var aCookie = aAllCookie[i].split("=");
	            jAllCookie[aCookie[0]] = aCookie[1];
	        }
	        for (var sCookieKey in jAllCookie) {
	            jAllCookie[sCookieKey] = decodeURIComponent(jAllCookie[sCookieKey]);
	            if (jAllCookie[sCookieKey].indexOf("=") !== -1) {
	                var aCookieValue = jAllCookie[sCookieKey].split("&");
	                jAllCookie[sCookieKey] = {};
	                for (var _i = 0; _i < aCookieValue.length; _i++) {
	                    var aSubCookie = aCookieValue[_i].split("=");
	                    jAllCookie[sCookieKey][aSubCookie[0]] = aSubCookie[1];
	                }
	            }
	        }
	        if (arguments.length === 0) {
	            result = jAllCookie;
	        } else {
	            result = [];
	            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
	                if (arguments[_i2] instanceof Array) {
	                    switch (arguments[_i2].length) {
	                        case 1:
	                            if (jAllCookie[arguments[_i2][0]] === undefined) {
	                                console.error("jAllCookie." + arguments[_i2][0] + " is undefined");
	                            }
	                            result.push(jAllCookie[arguments[_i2][0]]);
	                            break;
	                        case 2:
	                            try {
	                                if (jAllCookie[arguments[_i2][0]][arguments[_i2][1]] === undefined) {
	                                    console.error("jAllCookie." + arguments[_i2][0] + "." + arguments[_i2][1] + " is undefined");
	                                    result.push(undefined);
	                                } else {
	                                    result.push(jAllCookie[arguments[_i2][0]][arguments[_i2][1]]);
	                                }
	                            } catch (err) {
	                                result.push(undefined);
	                                console.error("jAllCookie." + arguments[_i2][0] + "." + arguments[_i2][1] + " is undefined");
	                            }
	                            break;
	                    }
	                }
	            }
	        }
	        return result;
	    },


	    //删除cookie(不能删除子cookie)  hagan.delCookie(["username"],["password"]);  !IE8
	    fnDelCookie: function fnDelCookie(aKey, aKey2) {
	        var This = this;
	        var jAllCookie = This.fnGetCookie();
	        if (arguments.length === 0) {
	            for (var sAllCookieKey in jAllCookie) {
	                document.cookie = encodeURIComponent(sAllCookieKey) + "=\u5173\u95ED\u6D4F\u89C8\u5668\u65F6\u6E05\u9664\u6B64cookie;expires=-1";
	            }
	        } else {
	            for (var i = 0; i < arguments.length; i++) {
	                if (arguments[i] instanceof Array) {
	                    switch (arguments[i].length) {
	                        case 1:
	                            document.cookie = encodeURIComponent(arguments[i][0]) + "=\u5173\u95ED\u6D4F\u89C8\u5668\u65F6\u6E05\u9664\u6B64cookie;expires=-1";
	                            break;
	                        case 2:
	                            document.cookie = encodeURIComponent(arguments[i][0]) + "=\u5173\u95ED\u6D4F\u89C8\u5668\u65F6\u6E05\u9664\u6B64cookie;expires=-1";
	                            break;
	                    }
	                }
	            }
	        }
	    },


	    //设置存储数据  hagan.fnSetStorage({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
	    fnSetStorage: function fnSetStorage(jData) {
	        var sStorageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage;

	        for (var sKey in jData) {
	            sStorageType[sKey] = JSON.stringify(jData[sKey]);
	        }
	    }
	}, _defineProperty(_hagan, "fnGetStorage", function fnGetStorage() {
	    var sStorageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;

	    var result = {};
	    for (var i = 0; i < sStorageType.length; i++) {
	        var sKey = sStorageType.key(i);
	        var sValue = JSON.parse(sStorageType.getItem(sKey));
	        result[sKey] = sValue;
	    }
	    return result;
	}), _defineProperty(_hagan, "fnDelStorage", function fnDelStorage() {
	    var sStorageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;

	    sStorageType.clear();
	}), _defineProperty(_hagan, "fnGetAllIp", function fnGetAllIp() {
	    var sAfterUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

	    var pathName = document.location.pathname;
	    var projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1) + "/";
	    return this.fnGetHttpOrHttps("http://" + location.host + projectName + sAfterUrl);
	}), _defineProperty(_hagan, "fnGetInteger", function fnGetInteger(nNum) {
	    if (this.fnTypeof(nNum) === "Number") {
	        return Math[nNum < 0 ? "ceil" : "floor"](nNum);
	    } else {
	        console.error("nNum isn't Number");
	    }
	}), _defineProperty(_hagan, "fnTrim", function fnTrim(sString) {
	    if (this.fnTypeof(sString) === "String") {
	        return sString.replace(/^\s+|\s+$/g, "");
	    }
	}), _defineProperty(_hagan, "fnInterceptBase64", function fnInterceptBase64(sBase64) {
	    return sBase64.replace(/(.+\,)(.+)/, function ($0, $1, $2) {
	        return $2;
	    });
	}), _defineProperty(_hagan, "fnConvertBase64UrlToBlob", function fnConvertBase64UrlToBlob(urlData) {

	    var bytes = void 0;
	    try {
	        //去掉url的头，并转换为byte
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

	    return new Blob([ab], { type: 'image/png' });
	}), _defineProperty(_hagan, "fnGetImgSizeInfo", function fnGetImgSizeInfo(evImgLoad) {

	    var nWidth = evImgLoad.target.width || evImgLoad.path[0].width;
	    var nHeight = evImgLoad.target.height || evImgLoad.path[0].height;
	    var nScale = Math.round(nWidth / nHeight * 100) / 100;

	    return { nWidth: nWidth, nHeight: nHeight, nScale: nScale };
	}), _defineProperty(_hagan, "fnGetClientX", function fnGetClientX(ev) {

	    return ev.clientX || ev.changedTouches[0].clientX;
	}), _defineProperty(_hagan, "fnGetClientY", function fnGetClientY(ev) {
	    return ev.clientY || ev.changedTouches[0].clientY;
	}), _defineProperty(_hagan, "fnGetPageX", function fnGetPageX(ev) {
	    return ev.pageX || ev.changedTouches[0].pageX;
	}), _defineProperty(_hagan, "fnGetPageY", function fnGetPageY(ev) {
	    return ev.pageY || ev.changedTouches[0].pageY;
	}), _defineProperty(_hagan, "fnToArray", function fnToArray(aClassArray) {
	    var aResult = [];
	    for (var i = 0; i < aClassArray.length; i++) {
	        aResult[i] = aClassArray[i];
	    }
	    return aResult;
	}), _defineProperty(_hagan, "fnMemoize", function fnMemoize(fnRecursion, oObj) {

	    oObj = oObj || {};

	    return function (opt) {
	        if (!oObj.hasOwnProperty(opt)) {
	            oObj[opt] = fnRecursion(opt);
	        }
	        return oObj[opt];
	    };
	}), _defineProperty(_hagan, "fnFactorial", function fnFactorial(nNum) {
	    if (nNum === 0) {
	        return 1;
	    } else {
	        return nNum * hagan.fnFactorial(nNum - 1);
	    }
	}), _hagan);

	var hg = hagan;
	exports.hg = hg;

/***/ }
/******/ ]);
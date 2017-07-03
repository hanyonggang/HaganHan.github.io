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

	var _moCanvas2D = __webpack_require__(1);

	var _moCanvas2D2 = _interopRequireDefault(_moCanvas2D);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eCanvasDragRubber = document.querySelector("#canvas-drag-rubber");
	eCanvasDragRubber.width = 700;
	eCanvasDragRubber.height = 700;

	var oContext = eCanvasDragRubber.getContext("2d");
	oContext.fillStyle = "#674";
	oContext.fillRect(0, 0, 700, 700);

	_moCanvas2D2.default.fnDragRubber(eCanvasDragRubber, oContext, {
	    fnMoveIng: function fnMoveIng(jData) {
	        document.title = jData.nAbradePercent;
	    },
	    fnUp: function fnUp(jData) {
	        alert(jData.nAbradePercent);
	    }
	});

	document.body.ontouchmove = function (ev) {
	    ev.preventDefault();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	                value: true
	});
	exports.default = {
	                //canvas2D方法封装

	                //橡皮檫
	                fnDragRubber: function fnDragRubber(eCanvas, oContext, jFn) {
	                                var nLineWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;


	                                var jCanvasPositionInfo = { //canvas的定位信息
	                                                nTop: eCanvas.offsetTop + parseInt(hg.fnGetFinalStyle(eCanvas, "borderWidth")),
	                                                nLeft: eCanvas.offsetLeft + parseInt(hg.fnGetFinalStyle(eCanvas, "borderWidth"))
	                                };

	                                var nAbradePercent = void 0,
	                                    //已经擦除的百分比
	                                nAll = void 0,
	                                    //所有的
	                                nAbrade = void 0; //已经擦除的

	                                hg.fnAddEvent(eCanvas, "mousedown", function fnCanvasDragRubberMouseDown(evDown) {

	                                                //绘制线条
	                                                oContext.beginPath();
	                                                oContext.globalCompositeOperation = 'destination-out';
	                                                oContext.lineJoin = 'round';
	                                                oContext.lineCap = 'round';
	                                                oContext.strokeStyle = "0x00000";
	                                                oContext.lineWidth = nLineWidth;

	                                                //在没有移动的情况下绘制单点
	                                                oContext.beginPath();
	                                                oContext.fillStyle = "0x0000";
	                                                oContext.arc(hg.fnGetClientX(evDown) - jCanvasPositionInfo.nLeft, hg.fnGetClientY(evDown) - jCanvasPositionInfo.nTop, nLineWidth / 2, 0, Math.PI * 2, true);
	                                                oContext.closePath();
	                                                oContext.fill();

	                                                oContext.beginPath();
	                                                oContext.moveTo(hg.fnGetClientX(evDown) - jCanvasPositionInfo.nLeft, hg.fnGetClientY(evDown) - jCanvasPositionInfo.nTop);

	                                                hg.fnAddEvent(eCanvas, "mousemove", function fnCanvasDragRubberMouseMove(evMove) {

	                                                                oContext.lineTo(hg.fnGetClientX(evMove) - jCanvasPositionInfo.nLeft, hg.fnGetClientY(evMove) - jCanvasPositionInfo.nTop);
	                                                                oContext.stroke();

	                                                                var oImageRGBAData = oContext.getImageData(0, 0, eCanvas.offsetWidth, eCanvas.offsetHeight).data;

	                                                                nAll = oImageRGBAData.length / 4; //所有的
	                                                                nAbrade = 0;

	                                                                for (var i = 0; i < oImageRGBAData.length; i += 4) {

	                                                                                if (oImageRGBAData[i] === 0) {
	                                                                                                nAbrade++;
	                                                                                }
	                                                                }

	                                                                nAbradePercent = parseInt(nAbrade / nAll * 100);

	                                                                jFn.fnMoveIng({
	                                                                                nAbradePercent: nAbradePercent,
	                                                                                nAll: nAll,
	                                                                                nAbrade: nAbrade
	                                                                });
	                                                });

	                                                hg.fnAddEvent(window, "mouseup", function fnCanvasDragRubberMouseUp() {

	                                                                hg.fnRemoveEvent(eCanvas, "mousemove", "fnCanvasDragRubberMouseMove");
	                                                                hg.fnRemoveEvent(window, "mouseup", "fnCanvasDragRubberMouseUp");

	                                                                oContext.closePath();

	                                                                jFn.fnUp({
	                                                                                nAbradePercent: nAbradePercent,
	                                                                                nAll: nAll,
	                                                                                nAbrade: nAbrade
	                                                                });
	                                                });
	                                });
	                }
	};

/***/ }
/******/ ]);
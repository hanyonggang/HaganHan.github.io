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

	var _moMiaov_move = __webpack_require__(1);

	var _moMiaov_move2 = _interopRequireDefault(_moMiaov_move);

	var _moHash_layout = __webpack_require__(2);

	var _moHash_layout2 = _interopRequireDefault(_moHash_layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eBtnS = document.querySelectorAll("button");
	var eDivS = document.querySelectorAll("section");

	var oopHashLayout = new _moHash_layout2.default(eBtnS, eDivS);
	oopHashLayout.init({
	    vShowAnimation: {
	        index: function index(jBtn, jSection, sHash) {
	            _moMiaov_move2.default.startMove(jSection[sHash], {
	                width: 500,
	                height: 200
	            });
	        },
	        aside: function aside(jBtn, jSection, sHash) {
	            _moMiaov_move2.default.startMove(jSection[sHash], {
	                width: 800,
	                height: 400
	            });
	        },
	        info: function info(jBtn, jSection, sHash) {
	            _moMiaov_move2.default.startMove(jSection[sHash], {
	                width: 1000,
	                height: 100
	            });
	        }
	    },
	    vHideAnimation: {
	        index: function index(jBtn, jSection, sHash) {
	            _moMiaov_move2.default.startMove(jSection[sHash], {
	                width: 150,
	                height: 100
	            });
	        },
	        aside: function aside(jBtn, jSection, sHash) {
	            _moMiaov_move2.default.startMove(jSection[sHash], {
	                width: 150,
	                height: 100
	            });
	        },
	        info: function info(jBtn, jSection, sHash) {
	            _moMiaov_move2.default.startMove(jSection[sHash], {
	                width: 150,
	                height: 100
	            });
	        }
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// JavaScript Document

	var jMiaovMove = {
	    startMove: function startMove(obj, json, endFn) {

	        var This = this;

	        clearInterval(obj.timer);

	        obj.timer = setInterval(function () {

	            var bBtn = true;

	            for (var attr in json) {

	                var iCur = 0;

	                if (attr == 'opacity') {
	                    if (Math.round(parseFloat(This.getStyle(obj, attr)) * 100) == 0) {
	                        iCur = Math.round(parseFloat(This.getStyle(obj, attr)) * 100);
	                    } else {
	                        iCur = Math.round(parseFloat(This.getStyle(obj, attr)) * 100) || 100;
	                    }
	                } else {
	                    iCur = parseInt(This.getStyle(obj, attr)) || 0;
	                }

	                var iSpeed = (json[attr] - iCur) / 8;
	                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	                if (iCur != json[attr]) {
	                    bBtn = false;
	                }

	                if (attr == 'opacity') {
	                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
	                    obj.style.opacity = (iCur + iSpeed) / 100;
	                } else {
	                    obj.style[attr] = iCur + iSpeed + 'px';
	                }
	            }

	            if (bBtn) {
	                clearInterval(obj.timer);

	                if (endFn) {
	                    endFn.call(obj);
	                }
	            }
	        }, 30);
	    },
	    getStyle: function getStyle(obj, attr) {
	        if (obj.currentStyle) {
	            return obj.currentStyle[attr];
	        } else {
	            return getComputedStyle(obj, false)[attr];
	        }
	    },
	    stopMove: function stopMove(obj) {
	        clearInterval(obj.timer);
	    }
	};

	exports.default = jMiaovMove;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moHash_layout = __webpack_require__(3);

	var _moHash_layout2 = _interopRequireDefault(_moHash_layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FnHashLayout = function () {
	    //哈希值页面跳转布局

	    function FnHashLayout(eBtnS, eSectionS) {
	        _classCallCheck(this, FnHashLayout);

	        this.eBtnS = eBtnS;
	        this.eSectionS = eSectionS;

	        this.jBtn = {}; //以hash值为key值的eBtn集合
	        this.jSection = {}; //以hash值为key值的eSection集合
	        this.jControl = {
	            bReload: true, //是否刷新页面
	            bBtnClick: true //按钮是否可以点击
	        };
	        this.jHrefHash = {
	            sHash: String, //地址栏的hash
	            nIndex: Number //地址栏的hash对应的SectionS的索引
	        };

	        this.settings = { //默认参数
	            sIndex: "index", //默认显示的页面
	            vShowAnimation: {}, //可以是json
	            vHideAnimation: function vHideAnimation(jBtn, jSection, sHash) {//也可以是function
	            },
	            fnStartHide: function fnStartHide(jBtn, jSection, sHash) {
	                //出场动画开始前执行
	                for (var attr in jBtn) {
	                    jBtn[attr].disabled = true;
	                }
	            },
	            fnEndShow: function fnEndShow(jBtn, jSection, sHash) {
	                //入场动画结束后执行
	                for (var attr in jBtn) {
	                    jBtn[attr].disabled = false;
	                }
	            },
	            nAnimationTime: 1000 //出场动画执行时间
	        };
	    }

	    _createClass(FnHashLayout, [{
	        key: "init",
	        value: function init(jOpt) {

	            this.fnSettings(jOpt);
	            this.fnLoad();
	            this.fnBtnClick();
	            this.fnHashChange();
	        }
	    }, {
	        key: "fnSettings",
	        value: function fnSettings(jOpt) {

	            for (var attr in jOpt) {
	                this.settings[attr] = jOpt[attr];
	            }

	            for (var i = 0; i < this.eBtnS.length; i++) {
	                this.jBtn[this.eBtnS[i].dataset.hash] = this.eBtnS[i];
	            }

	            for (var _i = 0; _i < this.eSectionS.length; _i++) {

	                this.jSection[this.eSectionS[_i].dataset.hash] = this.eSectionS[_i];

	                this.eSectionS[_i].classList.add("z-hash_none");
	            }
	        }
	    }, {
	        key: "fnLoad",
	        value: function fnLoad() {

	            var This = this;

	            this.jHrefHash.sHash = location.hash.slice(1) || this.settings.sIndex;

	            this.jSection[this.jHrefHash.sHash].classList.remove("z-hash_none");
	            this.jSection[this.jHrefHash.sHash].classList.add("z-hash_block");

	            setTimeout(function () {

	                if ($$.fnTypeof(This.settings.vShowAnimation) === "Function") {

	                    //如果没有，则全部的出场动画都执行第一个方法
	                    This.settings.vShowAnimation.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                }
	                if ($$.fnTypeof(This.settings.vShowAnimation) === "Object") {

	                    try {

	                        //如果出场动画分别有每个section对应的方法则执行对应的方法
	                        This.settings.vShowAnimation[This.jHrefHash.sHash].call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                    } catch (err) {}
	                }
	            });
	        }
	    }, {
	        key: "fnBtnClick",
	        value: function fnBtnClick() {
	            var _this = this;

	            var This = this;

	            var _loop = function _loop(i) {

	                var fnBtnClick = function fnBtnClick() {

	                    if (!This.jControl.bBtnClick) {
	                        return;
	                    }

	                    try {
	                        //执行开始隐藏回调函数
	                        This.settings.fnStartHide.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                    } catch (err) {}

	                    //令按钮不能点击
	                    This.jControl.bBtnClick = false;

	                    //令hash值改变时页面不能刷新
	                    This.jControl.bReload = false;

	                    var sBtnHash = this.dataset.hash;

	                    if ($$.fnTypeof(This.settings.vHideAnimation) === "Function") {

	                        //如果没有，则全部的出场动画都执行第一个方法
	                        This.settings.vHideAnimation.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                    }
	                    if ($$.fnTypeof(This.settings.vHideAnimation) === "Object") {

	                        try {

	                            //如果出场动画分别有每个section对应的方法则执行对应的方法
	                            This.settings.vHideAnimation[This.jHrefHash.sHash].call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                        } catch (err) {}
	                    }

	                    setTimeout(function () {

	                        This.jSection[This.jHrefHash.sHash].classList.remove("z-hash_block");
	                        This.jSection[This.jHrefHash.sHash].classList.add("z-hash_none");

	                        This.jHrefHash.sHash = location.hash = sBtnHash;
	                        This.jHrefHash.nIndex = i;

	                        This.jSection[This.jHrefHash.sHash].classList.remove("z-hash_none");
	                        This.jSection[This.jHrefHash.sHash].classList.add("z-hash_block");

	                        //为了解决display与option的冲突,先让display渲染完成后在异步执行option(如果开发者使用了option的话)
	                        setTimeout(function () {

	                            if ($$.fnTypeof(This.settings.vShowAnimation) === "Function") {

	                                //如果没有，则全部的入场动画都执行第一个方法
	                                This.settings.vShowAnimation.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                            }

	                            if ($$.fnTypeof(This.settings.vShowAnimation) === "Object") {

	                                try {

	                                    //如果入场动画分别有每个section对应的方法则执行对应的方法
	                                    This.settings.vShowAnimation[This.jHrefHash.sHash].call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                                } catch (err) {}
	                            }

	                            //令hash值改变时页面可以刷新
	                            This.jControl.bReload = true;

	                            //当动画全部结束后
	                            setTimeout(function () {

	                                try {
	                                    //执行显示结束回调函数
	                                    This.settings.fnEndShow.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
	                                } catch (err) {}

	                                //令按钮可以点击
	                                This.jControl.bBtnClick = true;
	                            }, This.settings.nAnimationTime);
	                        }, 16);
	                    }, This.settings.nAnimationTime);
	                };

	                $$.fnAddEvent(_this.eBtnS[i], "click", fnBtnClick);
	                $$.fnAddEvent(_this.eBtnS[i], "touch", fnBtnClick);
	            };

	            for (var i = 0; i < this.eBtnS.length; i++) {
	                _loop(i);
	            }
	        }
	    }, {
	        key: "fnHashChange",
	        value: function fnHashChange() {
	            var This = this;
	            $$.fnAddEvent(window, "hashchange", function fnHashChange() {
	                if (This.jControl.bReload) {
	                    location.reload();
	                }
	            });
	        }
	    }]);

	    return FnHashLayout;
	}();

	exports.default = FnHashLayout;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./mo-hash_layout.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./mo-hash_layout.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "\r\n.z-hash_none {\r\n    display: none;\r\n}\r\n\r\n.z-hash_block {\r\n    display: block;\r\n}", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
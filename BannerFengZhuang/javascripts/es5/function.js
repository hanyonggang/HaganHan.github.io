"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Banner����  FnBanner(oUl����,oUl,aLi,[oLeftBtn],[oRightBtn]);
//Options:{"auto":"�Ƿ��Զ��ֲ�","point":"��obj���ɵ�����","color":"��Ĭ�ϱ���ɫ","hoverColor":"ѡ��ʱ�ı���ɫ"};
//Methods:["init"];
//Events:null;
//������Ҫ������ť����������������
//������ҪС�����ѵ����鴫�����ò���
var FnBanner = function () {
    function FnBanner(oWrap, oUl, aLi, oLeft, oRight) {
        _classCallCheck(this, FnBanner);

        this.oWrap = oWrap;
        this.oUl = oUl;
        this.aLi = aLi;
        this.oLeft = oLeft;
        this.oRight = oRight;
        this.oLiWidth = Number; //����ÿ��li�Ŀ���;
        this.oLiHeight = Number; //����ÿ��li�ĸ߶�;
        this.aLiLength = Number; //����aLi�ĳ���
        this.showIndex = Number; //���ŵ�ǰ��ʾ������li������
        this.timer = null; //�����Զ��ֲ��Ķ�ʱ��
        this.oUl.fnUlTransitionEndEvent = Function; //��������Ҫ��ul�󶨵�transition���������¼�
        this.pointLength = Number; //����point�ĳ���
        this.oWrap.getHtmlLeft = Number; //����oWrap��html�����ߵľ���
        this.oUl.fnDown = Function; //�����¼�
        this.oUl.fnMove = Function; //�ƶ��¼�
        this.oUl.fnUp = Function; //̧���¼�
        this.oUl.downX = Number; //����ʱ��x����
        this.oUl.moveX = Number; //�ƶ�ʱ��x����
        this.oUl.downMargin = Number; //����ulʱul��marginLeft����
        this.oUl.downDate = Number; //����ulʱ��ʱ����
        this.aImg = []; //����wrap������img��ǩ
        this.settings = { //Ĭ�ϲ���
            "auto": false, //�Ƿ��Զ�����
            "point": [], //������
            "color": String, //Ĭ����ɫ
            "hoverColor": String //ѡ����ɫ
        };
    }

    _createClass(FnBanner, [{
        key: "init",
        value: function init(opt) {
            this.fnSettings(opt);
            this.fnSetImg();
            this.fnSetWrapStyle();
            this.fnSetLiStyle();
            this.fnSetUlStyle();
            if (this.oLeft) {
                //������Ҫ������ť
                this.fnBtnClick();
            }
            this.fnUpdate();
            if (this.settings.auto) {
                this.fnAutoMove();
            }
            this.fnUlAddTransitionEnd(); //��ul�󶨶��������¼�
            this.fnUlMouseOver();
            if (this.pointLength) {
                //������ҪС��
                this.fnPoint();
                this.fnPointClick();
            }
            this.fnMouseAndTouchEvent();
        }
    }, {
        key: "fnSettings",
        value: function fnSettings(opt) {
            var This = this;
            for (var aKey in opt) {
                this.settings[aKey] = opt[aKey];
            }
            this.oLiWidth = this.aLi[0].offsetWidth;
            this.oLiHeight = this.aLi[0].offsetHeight;
            this.aLiLength = this.aLi.length;
            this.showIndex = 0;
            this.oUl.fnUlTransitionEndEvent = function () {
                This.fnAutoMove();
            };
            this.pointLength = this.settings.point.length;
        }
    }, {
        key: "fnSetImg",
        value: function fnSetImg() {
            var This = this;
            This.aImg = This.oWrap.getElementsByTagName("img");
            for (var i = 0; i < This.aImg.length; i++) {
                This.aImg[i].onmousedown = This.aImg[i].onmousemove = This.aImg[i].onmouseup = function () {
                    return false;
                };
            }
        }
    }, {
        key: "fnSetWrapStyle",
        value: function fnSetWrapStyle() {
            this.oWrap.style.width = this.oLiWidth + "px";
            this.oWrap.style.height = this.oLiHeight + "px";
            this.oWrap.style.overflow = "hidden";
            this.oWrap.getHtmlLeft = this.oWrap.fnGetHtmlLeft();
        }
    }, {
        key: "fnSetLiStyle",
        value: function fnSetLiStyle() {
            for (var i = 0; i < this.aLiLength; i++) {
                this.aLi[i].style.float = "left";
            }
        }
    }, {
        key: "fnSetUlStyle",
        value: function fnSetUlStyle() {
            this.oUl.style.width = this.oLiWidth * this.aLiLength + "px";
            this.oUl.style.transition = "1s";
        }
    }, {
        key: "fnUpdate",
        value: function fnUpdate() {

            //����Ulλ��
            this.oUl.style.marginLeft = -this.oLiWidth * this.showIndex + "px";

            //����point
            if (this.pointLength) {
                this.fnPoint();
            }
        }
    }, {
        key: "fnBtnClick",
        value: function fnBtnClick() {
            var This = this;
            This.oLeft.addEventListener("click", function () {

                //�����ӳٶ���
                clearTimeout(This.timer);

                //����showLength
                if (This.showIndex == 0) {
                    This.showIndex = This.aLiLength - 1;
                } else {
                    This.showIndex--;
                }

                //����
                This.fnUpdate();
            });
            This.oRight.addEventListener("click", function () {

                //�����ӳٶ���
                clearTimeout(This.timer);
                if (This.showIndex >= This.aLiLength - 1) {
                    This.showIndex = 0;
                } else {
                    This.showIndex++;
                }
                This.fnUpdate();
            });
        }
        //�Զ��˶�һ��

    }, {
        key: "fnAutoMove",
        value: function fnAutoMove() {
            var This = this;
            This.timer = setTimeout(function () {
                if (This.showIndex < This.aLiLength - 1) {
                    This.showIndex++;
                } else {
                    This.showIndex = 0;
                }
                This.fnUpdate();
            }, 2000);
        }
        //��oUl�󶨶��������¼�

    }, {
        key: "fnUlAddTransitionEnd",
        value: function fnUlAddTransitionEnd() {
            var This = this;
            This.oUl.fnAddTransitionEnd(This.oUl.fnUlTransitionEndEvent);
        }
    }, {
        key: "fnUlMouseOver",
        value: function fnUlMouseOver() {
            var This = this;
            This.oWrap.addEventListener("mouseover", function () {
                This.oUl.fnDelTransitionEnd(This.oUl.fnUlTransitionEndEvent);
                clearTimeout(This.timer);
            });
            This.oWrap.addEventListener("mouseout", function () {
                This.fnUlAddTransitionEnd();
                This.fnAutoMove();
            });
        }
    }, {
        key: "fnPoint",
        value: function fnPoint() {
            var This = this;
            for (var i = 0; i < This.pointLength; i++) {
                This.settings.point[i].style.backgroundColor = This.settings.color;
            }
            This.settings.point[This.showIndex].style.backgroundColor = This.settings.hoverColor;
        }
    }, {
        key: "fnPointClick",
        value: function fnPointClick() {
            var This = this;

            var _loop = function _loop(i) {
                This.settings.point[i].onclick = function () {

                    //�����ӳٶ���
                    clearTimeout(This.timer);

                    //����showLength
                    This.showIndex = i;

                    //����
                    This.fnUpdate();
                };
            };

            for (var i = 0; i < This.pointLength; i++) {
                _loop(i);
            }
        }
    }, {
        key: "fnMouseAndTouchEvent",
        value: function fnMouseAndTouchEvent() {

            var This = this;

            //���庯��
            This.oUl.fnDown = function (ev) {

                This.oUl.fnAddEvent("mousemove", This.oUl.fnMove);
                This.oUl.fnAddEvent("touchmove", This.oUl.fnMove);

                This.oUl.fnAddEvent("mouseup", This.oUl.fnUp);
                This.oUl.fnAddEvent("touchend", This.oUl.fnUp);

                //�����ӳٶ���
                clearTimeout(This.timer);

                var ev = ev || event;
                This.oUl.downX = ev.clientX || ev.changedTouches[0].clientX;
                This.oUl.downMargin = parseInt(This.oUl.fnGetStyle("marginLeft"));
                This.oUl.style.transition = "";
                This.oUl.downDate = Date.now();
            };
            This.oUl.fnMove = function (ev) {
                var ev = ev || event;
                This.oUl.moveX = ev.clientX || ev.changedTouches[0].clientX;
                This.oUl.style.marginLeft = This.oUl.downMargin + This.oUl.moveX - This.oUl.downX + "px";
            };
            This.oUl.fnUp = function () {

                This.oUl.fnDelEvent("mousemove", This.oUl.fnMove);
                This.oUl.fnDelEvent("touchmove", This.oUl.fnMove);

                This.oUl.fnDelEvent("mouseup", This.oUl.fnUp);
                This.oUl.fnDelEvent("touchend", This.oUl.fnUp);

                This.oUl.style.transition = "1s";

                if (Date.now() - This.oUl.downDate < 1000 || Math.abs(This.oUl.downX - This.oUl.moveX) > This.oWrap.offsetWidth / 2) {
                    if (This.oUl.downX - This.oUl.moveX > 5) {
                        if (This.showIndex >= This.aLiLength - 1) {
                            This.showIndex = This.aLiLength - 1;
                        } else {
                            This.showIndex++;
                        }
                    } else if (This.oUl.downX - This.oUl.moveX < -5) {
                        if (This.showIndex <= 0) {
                            This.showIndex = 0;
                        } else {
                            This.showIndex--;
                        }
                    }
                }

                This.fnUpdate();
            };

            //�󶨺���
            This.oUl.fnAddEvent("mousedown", This.oUl.fnDown);
            This.oUl.fnAddEvent("touchstart", This.oUl.fnDown);
        }
    }]);

    return FnBanner;
}();
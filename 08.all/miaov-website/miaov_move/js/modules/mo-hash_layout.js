import hashLayoutStyle from "../../css/mo-hash_layout.css";

class FnHashLayout {//哈希值页面跳转布局

    constructor(eBtnS, eSectionS) {

        this.eBtnS = eBtnS;
        this.eSectionS = eSectionS;

        this.jBtn = {};//以hash值为key值的eBtn集合
        this.jSection = {};//以hash值为key值的eSection集合
        this.jControl = {
            bReload: true,//是否刷新页面
            bBtnClick: true//按钮是否可以点击
        };
        this.jHrefHash = {
            sHash: String,//地址栏的hash
            nIndex: Number//地址栏的hash对应的SectionS的索引
        };

        this.settings = {//默认参数
            sIndex: "index",//默认显示的页面
            vShowAnimation: {},//可以是json
            vHideAnimation: function (jBtn, jSection, sHash) {//也可以是function
            },
            fnStartHide: function (jBtn, jSection,sHash) {//出场动画开始前执行
                for (let attr in jBtn) {
                    jBtn[attr].disabled = true;
                }
            },
            fnEndShow: function (jBtn, jSection,sHash) {//入场动画结束后执行
                for (let attr in jBtn) {
                    jBtn[attr].disabled = false;
                }
            },
            nAnimationTime: 1000//出场动画执行时间
        }

    }

    init(jOpt) {

        this.fnSettings(jOpt);
        this.fnLoad();
        this.fnBtnClick();
        this.fnHashChange();

    }

    fnSettings(jOpt) {

        for (let attr in jOpt) {
            this.settings[attr] = jOpt[attr];
        }

        for (let i = 0; i < this.eBtnS.length; i++) {
            this.jBtn[this.eBtnS[i].dataset.hash] = this.eBtnS[i];
        }

        for (let i = 0; i < this.eSectionS.length; i++) {

            this.jSection[this.eSectionS[i].dataset.hash] = this.eSectionS[i];

            this.eSectionS[i].classList.add("z-hash_none");

        }

    }

    fnLoad() {

        const This = this;

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

                } catch (err) {
                }

            }

        });

    }

    fnBtnClick() {

        const This = this;

        for (let i = 0; i < this.eBtnS.length; i++) {

            const fnBtnClick = function () {

                if (!This.jControl.bBtnClick) {
                    return;
                }

                try {//执行开始隐藏回调函数
                    This.settings.fnStartHide.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
                } catch (err) {
                }

                //令按钮不能点击
                This.jControl.bBtnClick = false;

                //令hash值改变时页面不能刷新
                This.jControl.bReload = false;

                const sBtnHash = this.dataset.hash;

                if ($$.fnTypeof(This.settings.vHideAnimation) === "Function") {

                    //如果没有，则全部的出场动画都执行第一个方法
                    This.settings.vHideAnimation.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);

                }
                if ($$.fnTypeof(This.settings.vHideAnimation) === "Object") {

                    try {

                        //如果出场动画分别有每个section对应的方法则执行对应的方法
                        This.settings.vHideAnimation[This.jHrefHash.sHash].call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);

                    } catch (err) {
                    }

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

                            } catch (err) {
                            }

                        }

                        //令hash值改变时页面可以刷新
                        This.jControl.bReload = true;

                        //当动画全部结束后
                        setTimeout(function () {

                            try {//执行显示结束回调函数
                                This.settings.fnEndShow.call(This.jSection[This.jHrefHash.sHash], This.jBtn, This.jSection, This.jHrefHash.sHash);
                            } catch (err) {
                            }

                            //令按钮可以点击
                            This.jControl.bBtnClick = true;

                        }, This.settings.nAnimationTime);

                    }, 16);

                }, This.settings.nAnimationTime);

            };

            $$.fnAddEvent(this.eBtnS[i], "click", fnBtnClick);
            $$.fnAddEvent(this.eBtnS[i], "touch", fnBtnClick);

        }
    }

    fnHashChange() {
        const This = this;
        $$.fnAddEvent(window, "hashchange", function fnHashChange() {
            if (This.jControl.bReload) {
                location.reload();
            }
        });

    }

}

export default FnHashLayout;
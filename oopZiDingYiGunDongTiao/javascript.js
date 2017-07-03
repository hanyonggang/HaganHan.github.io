//自定义滚动条效果组件  FnCustomScroll("滚动条父级","滚动条子级","文档父级","文档子集");
//Options:{"scrollParStyle":"滚动条父级样式","scrollSonStyle":"滚动条子级样式","textParStyle":"文档父级样式","textSonStyle":"文档子集样式"};
//Methods:["init"];
//Events:null;
function FnCustomScroll(scrollPar, scrollSon, textPar, textSon) {
    this.oScrollPar = scrollPar;
    this.oScrollSon = scrollSon;
    this.oTextPar = textPar;
    this.oTextSon = textSon;
    this.settings = {//默认参数
        "scrollParStyle": {
            "position": "fixed",
            "width": "30px",
            "height": "600px",
            "backgroundColor": "#dddddd",
            "right": "10px",
            "top": "10px",
            "zIndex":3
        },
        "scrollSonStyle": {
            "position": "absolute",
            "width": "30px",
            "height": "10px",
            "backgroundColor": "#888",
            "left": "0px",
            "top": "0px",
            "cursor":"pointer",
            "zIndex":4
        },
        "textParStyle": {
            "position": "relative",
            "height": window.innerHeight + "px",
            "overflow": "hidden",
            "zIndex":2
        },
        "textSonStyle": {
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "zIndex":1
        }
    }
}
FnCustomScroll.prototype.init = function (opt) {
    this.FnSettings(opt);
    this.FnSetStyle();
    this.FnMouseScroll();
    this.FnMouseDrag();
};
FnCustomScroll.prototype.FnSettings = function (opt) {
    for (var aKey in opt) {
        this.settings[aKey] = opt[aKey];
    }
};
FnCustomScroll.prototype.FnSetStyle = function () {
    for (var aKey in this.settings.scrollParStyle) {
        this.oScrollPar.style[aKey] = this.settings.scrollParStyle[aKey];
    }
    for (var aKey in this.settings.scrollSonStyle) {
        this.oScrollSon.style[aKey] = this.settings.scrollSonStyle[aKey];
    }
    for (var aKey in this.settings.textParStyle) {
        this.oTextPar.style[aKey] = this.settings.textParStyle[aKey];
    }
    for (var aKey in this.settings.textSonStyle) {
        this.oTextSon.style[aKey] = this.settings.textSonStyle[aKey];
    }
    this.oScrollSon.style.height=this.oTextPar.offsetHeight*this.oScrollPar.offsetHeight/this.oTextSon.offsetHeight+"px";
};
FnCustomScroll.prototype.FnMouseScroll = function () {
    var This = this;
    var num=0;
    This.oTextPar.fnMouseScroll(function () {
        if(This.oTextSon.offsetTop<0){
            num+=100;
            if(num>0){
                num=0;
            }
            This.oTextSon.style.top=num+"px";

            var scrollSonTop=-This.oTextSon.offsetTop*(This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight)/(This.oTextSon.offsetHeight-This.oTextPar.offsetHeight);
            if(scrollSonTop<0){
                scrollSonTop=0;
            }
            This.oScrollSon.style.top=scrollSonTop+"px";
        }
    }, function () {
        if(This.oTextSon.offsetTop>-This.oTextSon.offsetHeight+parseInt(This.settings.textParStyle.height)){
            num-=100;
            if(num<-(This.oTextSon.offsetHeight-This.oTextPar.offsetHeight)){
                num=-(This.oTextSon.offsetHeight-This.oTextPar.offsetHeight);
            }
            This.oTextSon.style.top=num+"px";

            var scrollSonTop=-This.oTextSon.offsetTop*(This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight)/(This.oTextSon.offsetHeight-This.oTextPar.offsetHeight);
            if(scrollSonTop>This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight){
                scrollSonTop=This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight;
            }
            This.oScrollSon.style.top=scrollSonTop+"px";
        }
    });
};
FnCustomScroll.prototype.FnMouseDrag= function (ev) {
    var This = this;
    var obj=this.oScrollSon;

    function mouseDownFn(ev) {
        var ev = ev || event;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var iY = ev.clientY + scrollTop - obj.offsetTop;
        if (obj.setCapture) {
            obj.setCapture();
        }
        function mouseMoveFn(ev) {
            var ev = ev || event;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var iMouseY = ev.clientY + scrollTop;
            var nextScrollSonTop=iMouseY - iY;
            if(nextScrollSonTop<0){
                nextScrollSonTop=0;
            }else if(nextScrollSonTop>This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight){
                nextScrollSonTop=This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight;
            }
            obj.style.top = nextScrollSonTop + "px";

            var nextTextSonTop=This.oScrollSon.offsetTop*(This.oTextSon.offsetHeight+This.oTextPar.offsetHeight)/(-This.oScrollPar.offsetHeight-This.oScrollSon.offsetHeight);
            This.oTextSon.style.top=nextTextSonTop+"px";

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
};
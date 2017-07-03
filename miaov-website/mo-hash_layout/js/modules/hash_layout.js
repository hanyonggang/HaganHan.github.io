const eBtnS = document.querySelectorAll("button");
const eDivS = document.querySelectorAll("section");

import FnHashLayout from "./mo-hash_layout";
const oopHashLayout = new FnHashLayout(eBtnS, eDivS);
oopHashLayout.init({
    vShowAnimation: {
        index: function (jBtn, jSection,sHash) {
            alert(`${sHash}的入场`);
            jSection["index"].classList.remove("hide");
            jSection["index"].classList.add("show");
        },
        aside: function (jBtn, jSection,sHash) {
            alert(`${sHash}的入场`);
            jSection["aside"].classList.remove("hide");
            jSection["aside"].classList.add("show");
        },
        info: function (jBtn, jSection,sHash) {
            alert(`${sHash}的入场`);
            jSection["info"].classList.remove("hide");
            jSection["info"].classList.add("show");
        }
    },
    vHideAnimation: function (jBtn, jSection,sHash) {
        jSection[sHash].classList.remove("show");
        jSection[sHash].classList.add("hide");
    },
    fnStartHide: function (jBtn, jSection,sHash) {
        for (let attr in jBtn) {
            jBtn[attr].disabled = true;
        }
    },
    fnEndShow: function (jBtn, jSection,sHash) {
        for (let attr in jBtn) {
            jBtn[attr].disabled = false;
        }
    },
});
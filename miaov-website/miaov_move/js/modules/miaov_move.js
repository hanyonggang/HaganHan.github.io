
import jMiaovMove from "./mo-miaov_move";

const eBtnS = document.querySelectorAll("button");
const eDivS = document.querySelectorAll("section");

import FnHashLayout from "./mo-hash_layout";
const oopHashLayout = new FnHashLayout(eBtnS, eDivS);
oopHashLayout.init({
    vShowAnimation:{
        index:function (jBtn, jSection, sHash) {
            jMiaovMove.startMove(jSection[sHash],{
                width:500,
                height:200
            });
        },
        aside:function (jBtn, jSection, sHash) {
            jMiaovMove.startMove(jSection[sHash],{
                width:800,
                height:400
            });
        },
        info:function (jBtn, jSection, sHash) {
            jMiaovMove.startMove(jSection[sHash],{
                width:1000,
                height:100
            });
        },
    },
    vHideAnimation:{
        index:function (jBtn, jSection, sHash) {
            jMiaovMove.startMove(jSection[sHash],{
                width:150,
                height:100
            });
        },
        aside:function (jBtn, jSection, sHash) {
            jMiaovMove.startMove(jSection[sHash],{
                width:150,
                height:100
            });
        },
        info:function (jBtn, jSection, sHash) {
            jMiaovMove.startMove(jSection[sHash],{
                width:150,
                height:100
            });
        },
    }
});

import paperStyle from "./../../css/modules/mo-3d_paper.css";
import Fn3dPaper from "./mo-3d_paper";

const eArticlePaperWrap=document.querySelector("#article-paper_wrap");
const eButtonOpenBtn=document.querySelector("#button-open_btn");
const eButtonShrinkBtn=document.querySelector("#button-shrink_btn");

const oopFn3dPaper=new Fn3dPaper(eArticlePaperWrap);
oopFn3dPaper.init();
eButtonShrinkBtn.onclick=function () {
    oopFn3dPaper.fnShrink();
};
eButtonOpenBtn.onclick=function () {
    oopFn3dPaper.fnOpen();
};
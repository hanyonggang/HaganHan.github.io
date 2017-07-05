
const eDiv=document.querySelector("div");
const eUl=document.querySelector("ul");

eDiv.addEventListener("dragenter", function (ev) {

});
eDiv.addEventListener("dragover", function (ev) {
    ev.preventDefault();
});
eDiv.addEventListener("dragleave", function (ev) {

});
eDiv.addEventListener("drop", function (ev) {

    ev.preventDefault();

    const aFile=ev.dataTransfer.files;

    for(let i= 0,length=aFile.length;i<length;i++){
        const oopFr=new FileReader();
        oopFr.readAsDataURL(aFile[i]);
        oopFr.addEventListener("load", function () {
            const eLi=document.createElement("li");
            const eImg=document.createElement("img");
            eImg.src=oopFr.result;
            eLi.appendChild(eImg);
            eUl.appendChild(eLi);
        });
    }

    return false;

});

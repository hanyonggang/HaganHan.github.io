
import moCanvas2D from "./mo-canvas2D";

const eCanvasDragRubber=document.querySelector("#canvas-drag-rubber");
eCanvasDragRubber.width=700;
eCanvasDragRubber.height=700;

const oContext=eCanvasDragRubber.getContext("2d");
oContext.fillStyle="#674";
oContext.fillRect(0,0,700,700);

moCanvas2D.fnDragRubber(eCanvasDragRubber,oContext,{
    fnMoveIng(jData){
        document.title=jData.nAbradePercent;
    },
    fnUp(jData){
        alert(jData.nAbradePercent);
    }
});

document.body.ontouchmove=function(ev){ev.preventDefault();};


export default  {//canvas2D方法封装

    //橡皮檫
    fnDragRubber(eCanvas, oContext, jFn, nLineWidth = 100){

        const jCanvasPositionInfo = {//canvas的定位信息
            nTop: eCanvas.offsetTop + parseInt(hg.fnGetFinalStyle(eCanvas, "borderWidth")),
            nLeft: eCanvas.offsetLeft + parseInt(hg.fnGetFinalStyle(eCanvas, "borderWidth"))
        };

        let nAbradePercent,//已经擦除的百分比
            nAll,//所有的
            nAbrade;//已经擦除的

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

                const oImageRGBAData = oContext.getImageData(0, 0, eCanvas.offsetWidth, eCanvas.offsetHeight).data;

                nAll = oImageRGBAData.length / 4;//所有的
                nAbrade = 0;

                for (let i = 0; i < oImageRGBAData.length; i += 4) {

                    if (oImageRGBAData[i] === 0) {
                        nAbrade++;
                    }

                }

                nAbradePercent = parseInt(nAbrade / nAll * 100);

                jFn.fnMoveIng({
                    nAbradePercent,
                    nAll,
                    nAbrade
                });

            });

            hg.fnAddEvent(window, "mouseup", function fnCanvasDragRubberMouseUp() {

                hg.fnRemoveEvent(eCanvas, "mousemove", "fnCanvasDragRubberMouseMove");
                hg.fnRemoveEvent(window, "mouseup", "fnCanvasDragRubberMouseUp");

                oContext.closePath();

                jFn.fnUp({
                    nAbradePercent,
                    nAll,
                    nAbrade
                });

            });

        });

    }

};
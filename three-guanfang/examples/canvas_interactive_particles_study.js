import {hg} from "./js/modules/hagan-1.1.3";
import {moWebGl} from "./js/modules/mo-webgl-1.0";

class Fn3DScene {

    constructor(eDivCanvasPar, eDivStatsPar) {

        this.eDivCanvasPar = eDivCanvasPar;
        this.eDivStatsPar = eDivStatsPar;

        this.oScene = Object;
        this.oCamera = Object;
        this.oRenderer = Object;
        this.oStats = Object;
        this.oGroup=Object;

        this.jSettings = {

            sClearColor: 0xeeeeee,
            nCanvasWidth: hg.fnGetWindowWidth(),
            nCanvasHeight: hg.fnGetWindowHeight()-4

        };

        console.log(document.documentElement.clientWidth)

    }

    fnInit(jOpt) {

        this.fnSetSettings(jOpt);
        this.fnSetScene();
        this.fnSetCamera();
        this.fnSetRenderer();
        this.fnSetStats();
        this.fnSetSprite();
        this.fnSetHover();
        this.fnRender();

    }

    fnSetSettings(jOpt) {

        for (let sKey in jOpt) {

            this.jSettings[sKey] = jOpt[sKey];

        }

    }

    fnSetScene() {

        this.oScene = new THREE.Scene();

    }

    fnSetCamera() {

        this.oCamera = new THREE.PerspectiveCamera(75, this.jSettings.nCanvasWidth / this.jSettings.nCanvasHeight, 1, 10000);
        this.oCamera.position.x = 0;
        this.oCamera.position.y = 0;
        this.oCamera.position.z = 700;
        this.oCamera.up.x = 0;
        this.oCamera.up.y = 1;
        this.oCamera.up.z = 0;
        this.oCamera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });

        this.oScene.add(this.oCamera);

    }

    fnSetRenderer() {

        this.oRenderer = new THREE.CanvasRenderer();
        this.oRenderer.setClearColor(this.jSettings.sClearColor);
        this.oRenderer.setPixelRatio(window.devicePixelRatio);
        this.oRenderer.setSize(this.jSettings.nCanvasWidth, this.jSettings.nCanvasHeight);
        this.eDivCanvasPar.appendChild(this.oRenderer.domElement);

    }

    fnSetStats() {

        this.oStats = new Stats();
        this.eDivStatsPar.appendChild(this.oStats.dom);

    }

    fnSetSprite(){

        this.fnProgramStork=function (oContext) {

            oContext.beginPath();
            oContext.lineWidth = 0.025;
            oContext.arc(0,0,0.5,0,Math.PI*2,true);
            oContext.stroke();

        };

        this.fnProgramFill=function (oContext) {

            oContext.beginPath();
            oContext.arc(0,0,0.5,0,Math.PI*2,true);
            oContext.fill();

        };

        this.oGroup=new THREE.Group();

        for(let i=0;i<100;i++){

            const oSprite=new THREE.Sprite(new THREE.SpriteCanvasMaterial({color:Math.random() * 0x808080 + 0x808080,program:this.fnProgramStork}));
            oSprite.position.x = Math.random() * 800 - 400;
            oSprite.position.y = Math.random() * 800 - 400;
            oSprite.position.z = Math.random() * 800 - 400;
            oSprite.scale.x = oSprite.scale.y = Math.random() * 20 + 20;

            this.oGroup.add(oSprite);
            this.oScene.add(this.oGroup);

        }

    }

    fnSetHover(){

        const This=this;

        const oRaycaster=new THREE.Raycaster(),
            oMouse=new THREE.Vector2();

        let oIntersected=null;

        hg.fnAddEvent(window,"mousemove",function fnWindowMouseMove(evMouseMove) {

            oMouse.x=moWebGl.fnGetNormalizationX(evMouseMove.clientX,hg.fnGetWindowWidth());
            oMouse.y=moWebGl.fnGetNormalizationY(evMouseMove.clientY,hg.fnGetWindowHeight());

            oRaycaster.setFromCamera(oMouse,This.oCamera);
            var oIntersects = oRaycaster.intersectObjects(This.oGroup.children);

            if(oIntersects.length>0){

                if(oIntersected!==oIntersects[0].object){

                    if(oIntersected){

                        oIntersected.material.program = This.fnProgramStork;

                    }

                    oIntersected=oIntersects[0].object;

                    oIntersected.material.program=This.fnProgramFill;

                }

            }else {

                if(oIntersected){

                    oIntersected.material.program = This.fnProgramStork;

                }

                oIntersected=null;

            }

        });

    }

    fnRender() {

        const This = this;

        function fnRender() {

            This.oStats.begin();

            This.oGroup.rotation.x+=0.001;
            This.oGroup.rotation.y+=0.003;
            This.oGroup.rotation.z+=0.002;

            This.oRenderer.render(This.oScene, This.oCamera);
            requestAnimationFrame(fnRender);

            This.oStats.end();
        }

        fnRender();

    }

}

window.oop3DScene = new Fn3DScene(document.querySelector("#div-canvasPar"), document.querySelector("#div-statsPar"));
oop3DScene.fnInit();

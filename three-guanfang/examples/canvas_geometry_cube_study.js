
import {hg} from "./js/modules/hagan-1.1.3";

class Fn3DRotate {

    constructor(eDivCanvasPar,eDivStatsPar){

        this.eDivCanvasPar=eDivCanvasPar;
        this.eDivStatsPar=eDivStatsPar;

        this.oScene=Object;
        this.oCamera=Object;
        this.oRenderer=Object;
        this.oMesh=Object;
        this.oLight=Object;
        this.oPlane=Object;
        this.oStats=Object;
        this.nDifference=0;

        this.jSettings={

            sClearColor:0xeeeeee,
            nCanvasWidth:hg.fnGetWindowWidth(),
            nCanvasHeight:hg.fnGetWindowHeight()

        }

    }

    fnInit(jOpt){

        this.fnSetSettings(jOpt);
        this.fnSetScene();
        this.fnSetCamera();
        this.fnSetRenderer();
        this.fnSetLight();
        this.fnSetMesh();
        this.fnSetPlane();
        this.fnSetStats();
        this.fnSetMouseDown();
        this.fnRender();

    }

    fnSetSettings(jOpt){

        for(let sKey in jOpt) {

            this.jSettings[sKey]=jOpt[sKey];

        }

    }

    fnSetScene(){

        this.oScene=new THREE.Scene();

    }

    fnSetCamera(){

        this.oCamera=new THREE.PerspectiveCamera(45,this.jSettings.nCanvasWidth/this.jSettings.nCanvasHeight,1,1000);
        this.oCamera.position.x=0;
        this.oCamera.position.y=30;
        this.oCamera.position.z=100;
        this.oCamera.up.x=0;
        this.oCamera.up.y=1;
        this.oCamera.up.z=0;
        this.oCamera.lookAt({
            x:0,
            y:30,
            z:0
        });

        this.oScene.add(this.oCamera);

    }

    fnSetRenderer(){

        this.oRenderer=new THREE.CanvasRenderer();
        this.oRenderer.setClearColor(this.jSettings.sClearColor);
        this.oRenderer.setSize(this.jSettings.nCanvasWidth,this.jSettings.nCanvasHeight);
        this.eDivCanvasPar.appendChild(this.oRenderer.domElement);

    }

    fnSetLight(){

        this.oLight=new THREE.DirectionalLight(0xffffff,1);
        this.oLight.position.set(100,100,100);

        this.oScene.add(this.oLight);

    }

    fnSetMesh(){

        const This=this;

        const geometry=new THREE.BoxGeometry(20,20,20);

        for(let i=0;i<geometry.faces.length;i+=2){

            const sHexColor=Math.random()*0xffffff;
            geometry.faces[i].color.setHex(sHexColor);
            geometry.faces[i+1].color.setHex(sHexColor);

        }

        const material=new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});

        this.oMesh=new THREE.Mesh(geometry,material);
        this.oMesh.position.y=30;

        this.oScene.add(this.oMesh);

    }

    fnSetPlane(){

        const geometry=new THREE.PlaneBufferGeometry(20,20);
        geometry.rotateX(-Math.PI / 2);

        const material=new THREE.MeshBasicMaterial({color: 0xaaaaaa, overdraw: 0.5});

        this.oPlane=new THREE.Mesh(geometry,material);
        this.oPlane.position.y=10;

        this.oScene.add(this.oPlane);

    }

    fnSetStats(){

        this.oStats=new Stats();
        this.eDivStatsPar.appendChild(this.oStats.dom);

    }

    fnSetMouseDown(){

        const This=this;

        hg.fnAddEvent(window,"mousedown",function fnWindowMouseDown(evDown) {

            let nDownX=hg.fnGetClientX(evDown);

            hg.fnAddEvent(window,"mousemove",function fnWindowMouseMove(evMove) {

                This.nDifference=hg.fnGetClientX(evMove)-nDownX;

                nDownX=hg.fnGetClientX(evMove);

            });
            hg.fnAddEvent(window,"mouseup",function fnWindowMouseUp() {

                hg.fnRemoveEvent(window,"mousemove","fnWindowMouseMove");
                hg.fnRemoveEvent(window,"mouseup","fnWindowMouseUp");

                function fnAddTo0() {
                    This.nDifference+=1;
                    if(This.nDifference<0){
                        requestAnimationFrame(fnAddTo0);

                        document.title=This.nDifference;
                    }
                }
                function fnReduceTo0() {
                    This.nDifference-=1;

                    document.title=This.nDifference;
                    if(This.nDifference>0){
                        requestAnimationFrame(fnReduceTo0);
                    }
                }
                if(This.nDifference>0){
                    fnReduceTo0();
                }else if(This.nDifference<0){
                    fnAddTo0();
                }

            });

        });

    }

    fnRender(){

        const This=this;

        function fnRender() {

            This.oStats.begin();

            This.oMesh.rotation.y+=This.nDifference/100;
            This.oPlane.rotation.y+=This.nDifference/100;

            This.oRenderer.render(This.oScene,This.oCamera);
            requestAnimationFrame(fnRender);

            This.oStats.end();
        }
        fnRender();

    }

}

window.oop3DRotate=new Fn3DRotate(document.querySelector("#div-canvasPar"),document.querySelector("#div-statsPar"));
oop3DRotate.fnInit();
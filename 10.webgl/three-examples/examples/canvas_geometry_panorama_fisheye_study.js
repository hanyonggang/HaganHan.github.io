class Fn3DScene {

    constructor(eDivCanvasPar, eDivStatsPar) {

        this.eDivCanvasPar = eDivCanvasPar;
        this.eDivStatsPar = eDivStatsPar;

        this.oScene = Object;
        this.oCamera = Object;
        this.oRenderer = Object;
        this.oStats = Object;
        this.oSkyBox = Object;

        this.jSettings = {

            sClearColor: 0xeeeeee,
            nCanvasWidth: hg.fnGetWindowWidth(),
            nCanvasHeight: hg.fnGetWindowHeight()

        }

    }

    fnInit(jOpt) {

        this.fnSetSettings(jOpt);
        this.fnSetScene();
        this.fnSetCamera();
        this.fnSetRenderer();
        this.fnSetStats();
        this.fnSetSkyBox();
        this.fnMouseMove();
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
        this.oCamera.position.z = 1500;
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

    fnSetSkyBox() {

        const oCanvas = document.createElement("canvas");
        oCanvas.width = 300;
        oCanvas.height = 300;
        const oContext = oCanvas.getContext("2d");
        oContext.fillStyle = "#0f0";
        oContext.fillRect(0, 0, 300, 300);

        const aImgUrl = [
            fnLoadTexture("./skyBox/right.png"),
            fnLoadTexture("./skyBox/left.jpg"),
            fnLoadTexture("./skyBox/up.png"),
            fnLoadTexture("./skyBox/bottom.png"),
            fnLoadTexture("./skyBox/back.png"),
            fnLoadTexture("./skyBox/front.png")
        ];

        function fnLoadTexture(sImgUrl) {

            const texture = new THREE.Texture(oCanvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                overdraw: 0.5
            });

            const oImg = new Image();
            oImg.onload = function () {

                texture.image = this;
                texture.needsUpdate = true;

            };
            oImg.src = sImgUrl;
            return material;

        }

        const geometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10);
        const material = new THREE.MultiMaterial(aImgUrl);

        this.oSkyBox = new THREE.Mesh(geometry, material);
        this.oSkyBox.scale.x = -1;

        for (var i = 0, l = this.oSkyBox.geometry.vertices.length; i < l; i++) {

            var vertex = this.oSkyBox.geometry.vertices[i];

            vertex.normalize();
            vertex.multiplyScalar(550);

        }

        this.oScene.add(this.oSkyBox);

    }

    fnMouseMove(){

        const This=this;

        hg.fnAddEvent(window,"mousedown",function fnWindowMouseDown(evDown) {

            let nOldX=evDown.clientX;
            let nOldY=evDown.clientY;

            hg.fnAddEvent(window,"mousemove",function fnWindowMouseMove(evMove) {

                const nIngX=evMove.clientX;
                const nIngY=evMove.clientY;

                This.oSkyBox.rotation.y-=0.003*(nIngX-nOldX);
                This.oSkyBox.rotation.x-=0.003*(nIngY-nOldY);

                nOldX=evMove.clientX;
                nOldY=evMove.clientY;

            });

            hg.fnAddEvent(window,"mouseup",function fnWindowMouseUp() {

                hg.fnRemoveEvent(window,"mousemove","fnWindowMouseMove");
                hg.fnRemoveEvent(window,"mouseup","fnWindowMouseUp");

            });

        });

    }

    fnRender() {

        const This = this;

        function fnRender() {

            This.oStats.begin();

            This.oRenderer.render(This.oScene, This.oCamera);
            requestAnimationFrame(fnRender);

            This.oStats.end();
        }

        fnRender();

    }

}

window.oop3DScene = new Fn3DScene(document.querySelector("#div-canvasPar"), document.querySelector("#div-statsPar"));
oop3DScene.fnInit();
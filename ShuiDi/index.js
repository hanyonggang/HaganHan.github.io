(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 12
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1.8,1,1).p("ABkAAQAAAGgdAEQgdAEgqAAQgpAAgdgEQgdgEAAgGQAAgFAdgFQAdgDApAAQAqAAAdADQAdAFAAAFg");
	this.shape.setTransform(190,425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(255,255,255,0.961)").ss(1.8,1,1).p("AiPAAQAAgIAqgGQAqgGA7AAQA8AAApAGQArAGAAAIQAAAJgrAFQgpAHg8AAQg7AAgqgHQgqgFAAgJg");
	this.shape_1.setTransform(190,425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,255,255,0.922)").ss(1.8,1,1).p("Ai7AAQAAgKA3gJQA3gHBNAAQBOAAA2AHQA4AJAAAKQAAALg4AIQg2AIhOAAQhNAAg3gIQg3gIAAgLg");
	this.shape_2.setTransform(190,425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("rgba(255,255,255,0.878)").ss(1.8,1,1).p("AjnAAQAAgNBDgKQBFgKBfAAQBgAABDAKQBEAKAAANQAAAOhEAJQhDALhgAAQhfAAhFgLQhDgJAAgOg");
	this.shape_3.setTransform(190.1,425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(255,255,255,0.839)").ss(1.8,1,1).p("AkSAAQAAgQBPgMQBSgLBxAAQByAABQALQBRAMAAAQQAAAQhRAMQhQAMhyAAQhxAAhSgMQhPgMAAgQg");
	this.shape_4.setTransform(190.1,425.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(255,255,255,0.8)").ss(1.8,1,1).p("Ak+AAQAAgSBdgOQBegNCDAAQCFAABcANQBeAOAAASQAAATheANQhcAPiFAAQiDAAhegPQhdgNAAgTg");
	this.shape_5.setTransform(190.1,425.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(255,255,255,0.761)").ss(1.8,1,1).p("AlqAAQAAgVBpgQQBrgPCWAAQCXAABpAPQBrAQAAAVQAAAWhrAOQhpARiXAAQiWAAhrgRQhpgOAAgWg");
	this.shape_6.setTransform(190.1,425.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("rgba(255,255,255,0.722)").ss(1.8,1,1).p("AmWAAQAAgXB2gSQB4gRCoAAQCpAAB2ARQB4ASAAAXQAAAZh4AQQh2ASipAAQioAAh4gSQh2gQAAgZg");
	this.shape_7.setTransform(190.1,425.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(255,255,255,0.678)").ss(1.8,1,1).p("AnCAAQAAgaCDgUQCFgSC6AAQC7AACDASQCFAUAAAaQAAAbiFASQiDAUi7AAQi6AAiFgUQiDgSAAgbg");
	this.shape_8.setTransform(190.1,425.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(255,255,255,0.639)").ss(1.8,1,1).p("AntAAQAAgdCPgWQCSgUDMAAQDOAACPAUQCSAWAAAdQAAAeiSAUQiPAWjOAAQjMAAiSgWQiPgUAAgeg");
	this.shape_9.setTransform(190.2,425.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(255,255,255,0.6)").ss(1.8,1,1).p("AoZAAQAAggCcgYQCfgVDeAAQDgAACcAVQCeAYAAAgQAAAgieAWQicAYjgAAQjeAAifgYQicgWAAggg");
	this.shape_10.setTransform(190.2,425.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(255,255,255,0.561)").ss(1.8,1,1).p("ApFAAQAAgiCpgaQCsgYDwAAQDyAACpAYQCrAaAAAiQAAAjirAXQipAajyAAQjwAAisgaQipgXAAgjg");
	this.shape_11.setTransform(190.2,425.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(255,255,255,0.522)").ss(1.8,1,1).p("ApxAAQAAglC2gcQC5gZECAAQEEAAC2AZQC4AcAAAlQAAAli4AaQi2AckEAAQkCAAi5gcQi2gaAAglg");
	this.shape_12.setTransform(190.2,425.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("rgba(255,255,255,0.478)").ss(1.8,1,1).p("AqdAAQAAgnDCgeQDGgbEVAAQEWAADCAbQDGAeAAAnQAAAojGAbQjCAekWAAQkVAAjGgeQjCgbAAgog");
	this.shape_13.setTransform(190.3,425.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(255,255,255,0.439)").ss(1.8,1,1).p("ArJAAQAAgqDPggQDSgcEoAAQEoAADPAcQDTAgAAAqQAAArjTAcQjPAhkoAAQkoAAjSghQjPgcAAgrg");
	this.shape_14.setTransform(190.3,425.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(255,255,255,0.4)").ss(1.8,1,1).p("Ar1AAQAAgsDcgiQDfgfE6AAQE6AADcAfQDgAiAAAsQAAAujgAeQjcAik6AAQk6AAjfgiQjcgeAAgug");
	this.shape_15.setTransform(190.3,425.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("rgba(255,255,255,0.361)").ss(1.8,1,1).p("AshAAQAAgvDpgkQDsggFMAAQFNAADoAgQDsAkAAAvQAAAwjsAgQjoAklNAAQlMAAjsgkQjpggAAgwg");
	this.shape_16.setTransform(190.3,425.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("rgba(255,255,255,0.322)").ss(1.8,1,1).p("AtMAAQAAgyD1gmQD5giFeAAQFfAAD1AiQD5AmAAAyQAAAyj5AiQj1AnlfAAQleAAj5gnQj1giAAgyg");
	this.shape_17.setTransform(190.3,425.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("rgba(255,255,255,0.278)").ss(1.8,1,1).p("At4AAQAAg1ECgoQEGgjFwAAQFxAAECAjQEGAoAAA1QAAA1kGAjQkCAplxAAQlwAAkGgpQkCgjAAg1g");
	this.shape_18.setTransform(190.3,425.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("rgba(255,255,255,0.239)").ss(1.8,1,1).p("AukAAQAAg3EOgqQETglGDAAQGDAAEPAlQETAqAAA3QAAA4kTAlQkPAqmDAAQmDAAkTgqQkOglAAg4g");
	this.shape_19.setTransform(190.4,425.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("rgba(255,255,255,0.2)").ss(1.8,1,1).p("AvQAAQAAg6EbgsQEggnGVAAQGVAAEbAnQEhAsAAA6QAAA6khAnQkbAsmVAAQmVAAkggsQkbgnAAg6g");
	this.shape_20.setTransform(190.4,425.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("rgba(255,255,255,0.161)").ss(1.8,1,1).p("Av8AAQAAg8EpguQEsgpGnAAQGoAAEnApQEuAuAAA8QAAA9kuApQknAumoAAQmnAAksguQkpgpAAg9g");
	this.shape_21.setTransform(190.4,425.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("rgba(255,255,255,0.122)").ss(1.8,1,1).p("AwoAAQAAg/E1gwQE6gqG5AAQG6AAE0AqQE7AwAAA/QAABAk7AqQk0Awm6AAQm5AAk6gwQk1gqAAhAg");
	this.shape_22.setTransform(190.4,425.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("rgba(255,255,255,0.078)").ss(1.8,1,1).p("AxTAAQAAhCFBgxQFHgtHLAAQHMAAFBAtQFHAxAABCQAABClHAtQlBAynMAAQnLAAlHgyQlBgtAAhCg");
	this.shape_23.setTransform(190.4,425.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("rgba(255,255,255,0.039)").ss(1.8,1,1).p("Ax/AAQAAhEFOg0QFUguHdAAQHeAAFOAuQFUA0AABEQAABFlUAuQlOA0neAAQndAAlUg0QlOguAAhFg");
	this.shape_24.setTransform(190.4,425.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("rgba(255,255,255,0)").ss(1.8,1,1).p("ASsAAQAABHlhAwQlaA3nxAAQnvAAlhg3QlbgwAAhHQAAhHFbg2QFhgwHvAAQHxAAFaAwQFhA2AABHg");
	this.shape_25.setTransform(190.5,425.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},39).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).wait(1));

	// 图层 11
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#FFFFFF").ss(1.8,1,1).p("AAAiVIAAEr");
	this.shape_26.setTransform(190,-20);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FFFFFF").ss(1.8,1,1).p("AAACWIAAkr");
	this.shape_27.setTransform(190,-9);
	this.shape_27._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26,p:{y:-20}}]}).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_26,p:{y:410}}]},1).to({state:[]},1).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(1).to({_off:false},0).wait(1).to({y:2.1},0).wait(1).to({y:13.1},0).wait(1).to({y:24.1},0).wait(1).to({y:35.2},0).wait(1).to({y:46.2},0).wait(1).to({y:57.2},0).wait(1).to({y:68.2},0).wait(1).to({y:79.3},0).wait(1).to({y:90.3},0).wait(1).to({y:101.3},0).wait(1).to({y:112.3},0).wait(1).to({y:123.4},0).wait(1).to({y:134.4},0).wait(1).to({y:145.4},0).wait(1).to({y:156.4},0).wait(1).to({y:167.5},0).wait(1).to({y:178.5},0).wait(1).to({y:189.5},0).wait(1).to({y:200.5},0).wait(1).to({y:211.6},0).wait(1).to({y:222.6},0).wait(1).to({y:233.6},0).wait(1).to({y:244.6},0).wait(1).to({y:255.7},0).wait(1).to({y:266.7},0).wait(1).to({y:277.7},0).wait(1).to({y:288.7},0).wait(1).to({y:299.8},0).wait(1).to({y:310.8},0).wait(1).to({y:321.8},0).wait(1).to({y:332.8},0).wait(1).to({y:343.9},0).wait(1).to({y:354.9},0).wait(1).to({y:365.9},0).wait(1).to({y:376.9},0).wait(1).to({y:388},0).wait(1).to({y:399},0).to({_off:true},1).wait(26));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(376.5,265.5,2,32);
// library properties:
lib.properties = {
	id: '2B502A4BFFE06F459356FE2D63819040',
	width: 375,
	height: 603,
	fps: 24,
	color: "#0099FF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2B502A4BFFE06F459356FE2D63819040'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
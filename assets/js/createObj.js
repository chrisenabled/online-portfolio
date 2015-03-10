//Rescaler object
(function(){
    var ReScaler = function(){
        this.children = this.children || {};
        this.children.stage = this.children.stage || null;
        this.children.texts = this.children.texts || []; 
        this.children.containers = this.children.containers || []; 
        this.children.shapes = this.children.shapes || []; 
        this.children.bitmaps = this.children.bitmaps || [];
        var self = this;
        window.onresize = function(e){
            self.updateChildren();
        }
    }

    var r = ReScaler.prototype;

    r.addStage = function(stage,keepAspectRatio){
        this.children.stage = stage;
        var myStage = this.children.stage;
        keepAspectRatioRatio = (typeof keepAspectRatioRatio === "undefined") ? 
            false : true;
        myStage.keepAspectRatio = keepAspectRatio;
        this.updateStage();
    }

    r.updateStage = function(){
        var stage = this.children.stage;
        // browser viewport size
        var w = window.innerWidth;
        var h = window.innerHeight;
        // stage dimensions
        var ow = stage.canvas.width; // your stage width
        var oh = stage.canvas.height; // your stage height
        if (stage.keepAspectRatio)
        {
            // keep aspect ratio
            var scale = Math.min(w / ow, h / oh);
            stage.scaleX = scale;
            stage.scaleY = scale;
           // adjust canvas size
            stage.canvas.width = ow * scale;
            stage.canvas.height = oh * scale;
        }
        else
        {
            // scale to exact fit
            stage.scaleX = w / ow;
            stage.scaleY = h / oh;
            // adjust canvas size
            stage.canvas.width = ow * stage.scaleX;
            stage.canvas.height = oh * stage.scaleY;
        }
    }

    r.addChild = function(child,scaleToRatio){
        type = child.toString();
        scaleToRatio = (typeof scaleToRatio === "undefined") ? 1 : scaleToRatio;
        child.scaleToRatio = scaleToRatio;
        if(type.indexOf('Text') > -1){
            this.children.texts.push(child);
        }
        if(type.indexOf('Container') > -1){
            this.children.containers.push(child);
        }
        if(type.indexOf('Shape') > -1){
            this.children.shapes.push(child);
        }
        if(type.indexOf('Bitmap') > -1){
            this.children.bitmaps.push(child);
        }

        this.updateChild(child);

    }

    r.updateChild = function(child){
        var initialViewportWidth, initialViewportHeight, wToHRatio, hToWRatio,
            ivpWidth, ivpWtoWRatio;
        if(child.toString().indexOf('Text') > -1){
            wToHRatio = child.getBounds().width / child.getBounds().height;
        }

        alert(wToHRatio);
        //child.scaleX = 2;
        //child.scaleY = 2;
    }
    r.updateChildren = function(){
        var children = this.children;
        for(var child in children){
            if(children.hasOwnProperty(child)){
                for(i = 0; i < children[child].length; i++){    
                    this.updateChild(children[child][i]);
                }  
            }
        }
    }

    window.ReScaler = ReScaler;
    
}());
    

//orb objects
var PulsingOrb = (function () {
    var PulsingOrb = function (color,size) {
        this.initialize(color,size);
    }
    var p = PulsingOrb.prototype = new createjs.Shape();
    p.count = 0;
    p.Shape_initialize = p.initialize;
    p.initialize = function (color,size) {
        this.Shape_initialize;
        size = size != undefined ? size : 20;
        color = color != undefined ? color : '#F00';
        p.color = color;
        this.alpha = Math.random();
        //this.graphics.append(new Graphics.Circle(50, 50, 30));
        this.graphics.beginFill(color).drawCircle(0, 0, size);
        this.on('tick', this.pulse);
    }
    p.pulse = function () {
        if(this.count % 60 == 0){
            p.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            this.graphics.append({exec:function(ctx, shape) {
                ctx.fillStyle = p.color;
                ctx.fill();
            }});
        }
        this.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    return PulsingOrb;
}());

//preloader bar object
var Preloader = (function(){
    
        var Preloader = function (fill, stroke) {
            this.fillColor = fill;
            this.strokeColor = stroke;
            this.initialize();
        }
        
        var p =  Preloader.prototype = new createjs.Container();
        p.width = 150;
        p.height = 2;
        p.fillColor;
        p.strokeColor;
        p.bar;
        p.loadingTxt;
        p.count = 0;
        
        p.Container_initialize = p.initialize;
        
        
        p.initialize = function(){
            var outline = new createjs.Shape();
            outline.graphics.beginFill(this.strokeColor);
            outline.graphics.drawRect(0, 0, this.width, this.height);
            this.bar = new createjs.Shape();
            this.bar.graphics.beginFill(this.fillColor);
            this.bar.graphics.drawRect(0, 0, this.width, this.height);
            this.bar.scaleX = 0;
            this.loadingTxt = new createjs.Text('Loading',
            '13px Times', '#540013');
            var b = this.loadingTxt.getBounds();
            //text.x = width - b.width/2; 
            //text.y = height - b.height/2;
            this.loadingTxt.x = (this.width - b.width)/2;
            this.loadingTxt.y = this.y + 5;
            //this.loadingTxt.regX = this.width / 2;
            //this.loadingTxt.regY = this.height / 2;
            this.addChild(outline, this.bar, this.loadingTxt);
            this.on('tick', this.pulse);
            ReScaler.addChild(this.loadingTxt);
            
        }
        
        p.rescale = function(){
        
        }
        
        p.pulse = function(){
           this.count++;
            if(this.count == 60) this.count = 0;
            if(this.count == 10){
                this.loadingTxt.set({
                    text: 'Loading.',
                });
            }
            if(this.count == 29){
                this.loadingTxt.set({
                    text: 'Loading..',
                    //color: '#a90329'
                });
            }
            if(this.count == 59){
                this.loadingTxt.set({
                    text: 'Loading...',
                    //color: '#6d0019'
                });
            }
            this.update(this.count/100 + .4);
        }
        
        p.update = function (perc) {
            perc = perc > 1 ? 1 : perc;
            this.bar.scaleX = perc;
        }
        return Preloader;    
}());









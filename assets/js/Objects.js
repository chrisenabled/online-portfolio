define([],function(){

    //----------PreloadBar Object-------------------
    Preloader = (function(){
        
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
            p.Container_initialize;
            var outline = new createjs.Shape();
            outline.graphics.beginFill(this.strokeColor);
            outline.graphics.drawRect(0, 0, this.width, this.height);
            this.bar = new createjs.Shape();
            this.bar.graphics.beginFill(this.fillColor);
            this.bar.graphics.drawRect(0, 0, this.width, this.height);
            this.bar.scaleX = 0;
            this.loadingTxt = new createjs.Text('Loading...',
            '13px Times', '#540013');
            var b = this.loadingTxt.getBounds();
            this.loadingTxt.x = (this.width - b.width)/2;
            this.loadingTxt.y = this.y + 5;
            this.addChild(outline, this.bar, this.loadingTxt);            
        }
        
        p.update = function (perc) {
            perc = perc > 1 ? 1 : perc;
            this.bar.scaleX += perc;
        }
        
        return Preloader;
    }());
        
    
    
    //------------Button Object----------------------
    StartButton = (function(){
            
        var button = function(button, stage){
            this.stage = stage;
            this.btn;
            this.initialize(button, stage);
            //this.button_initialize;
        }
        
        var p = button.prototype; 
        
        p.initialize = function(button){
            this.btn = new createjs.Bitmap(button);
            var self = this;
            this.btn.name = 'startButton';
            this.btn.cursor = 'pointer';
            this.btn.regY = this.btn.getBounds().height/2;
            this.btn.regX = this.btn.getBounds().width/2;            
            this.adjustButton();
            
            this.stage.addChild(this.btn);
        }
        
        p.pressdown = function(btn){
            btn.shadow = null;
            btn.x = btn.x + 3;
            btn.y = btn.y + 3;
        };
        p.pressup = function(btn, shadow){
            btn.x = btn.x - 3;
            btn.y = btn.y - 3;
            btn.shadow = shadow;
        };
        
        p.removeButton = function(){
            var btn = this.btn;
            this.stage.removeChild(btn);
        }
        
        p.adjustButton = function(){
            this.btn.x = ((this.stage.canvas.width - this.btn.getBounds().width)/2)
                + this.btn.regX;
            this.btn.y = ((this.stage.canvas.height - this.btn.getBounds().height)/2)
                + this.btn.regY;
            if(window.innerWidth < 700 || window.innerHeight < 500){
                this.btn.scaleX = this.btn.scaleY = 0.6;
                this.btn.shadow = new createjs.Shadow('#000', 2, 2, 15);
            }
            else{
                this.btn.scaleX = this.btn.scaleY = 1;
                this.btn.shadow = new createjs.Shadow('#000', 4, 4, 15);
            }
        }
        
        return button;
    }());

    //-------------logo Object---------------------
    
    logo = (function(){
        
        var logoObj = function(image,x,y){
            this.logo, this.width, this.height, this.scale;
            this.updateCounter = 0;
            this.changeNumber;this.vSpeed; this.xSpeed;
            this.reverseNumber = 3; this.willReverse = false;
            this.randomizeReverse = Math.floor(Math.random()* 10) + 1;
            this.initialize(image,x,y);
            this.scaledWidth, this.scaledHeight;
        }
        p = logoObj.prototype;
        p.initialize = function(image,x,y){
            this.changeNumber = Math.floor(Math.random()* 300) + 60;
            if(this.randomizeReverse <= this.reverseNumber)
                this.willReverse = true;
            this.vSpeed = Math.floor(Math.random()* 4) + 1;
            this.vSpeed *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
            this.xSpeed = Math.floor(Math.random()* 7) + 1;
            this.logo = new createjs.Bitmap(image);
            this.logo.x = -(this.logo.getBounds().width); 
            this.logo.y = y; this.logo.alpha = 0.5;
            this.width = this.logo.getBounds().width;
            this.height = this.logo.getBounds().height;
            this.scale = Math.min(1024/this.width, 768/this.height);
            createjs.Tween.get(this.logo,{loop:true})
            .wait(500)
            .to({alpha:0.2}, 3000).to({alpha:0.5}, 3000);
            this.resizeLogo();
        }
        p.resizeLogo = function(){
            var currentWidth = this.width;
            var currentHeight = this.height;
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var newScale = Math.min(windowWidth/currentWidth, windowHeight/currentHeight);
            var scale = newScale/this.scale;
            if(scale > 1) scale = 1;
            this.scaledWidth = this.logo.getBounds().width * scale;
            this.scaledHeight = this.logo.getBounds().height * scale;
            //this.vSpeed = this.vSpeed * scale;
            //this.xSpeed = this.xSpeed * scale;
            this.logo.scaleX = this.logo.scaleY = scale;
        }
        
        return logoObj;
    }());

    //----------------Gallery Object-----------
    
    Gallery = (function(){
        var GalleryObj = function(level, category, images, parent, leftNav, rightNav){
            this.level;
            this.category;
            this.parent = parent;
            this.numOfPics;
            this.currentPosition = 0;
            this.leftNav = new createjs.Bitmap(leftNav);
            this.rightNav = new createjs.Bitmap(rightNav);
            this.initialize(level,category, images);
        }
        
        var p = GalleryObj.prototype = new createjs.Container();
        p.Container_initialize = p.initialize;
       
        p.initialize = function(level,category, images){
            this.Container_initialize;
            this.removeAllChildren();
            this.level = level;
            this.category = category;
            this.setDimension();
            this.createImages(images);
            this.createNav();
            this.parent.addChild(this);
        }
        
        p.setDimension = function(){
            this.width = this.parent.width; 
            this.height = this.parent.height * 0.8;
            this.y = (this.parent.height - this.height)/2;
            if(this.y < 40) this.y = 40;
            var oldBg = this.getChildByName("bg");
            if(typeof oldBg !== "undefined") this.removeChild(oldBg);
            var bg = new createjs.Shape();
            bg.name = "bg";
            bg.graphics.beginFill('#000');
            bg.alpha = 0.7;
            bg.graphics.drawRect(0, 0, this.width, this.height);
            var mask = new createjs.Shape();
            mask.graphics.beginFill("#000").drawRect(this.x,this.y,this.width,this.height);
            this.mask = mask;
            this.addChild(bg);
            this.setChildIndex(bg,0);
            this.alpha = 0; 
            createjs.Tween.get(this).to({alpha:1},400);
            
        }
        
        p.adjustChildren = function(){
            this.leftNav.x = 15; 
            this.leftNav.y = (this.height - this.leftNav.height)/2;
            this.rightNav.x = this.width - this.rightNav.width - 15;
            this.rightNav.y = (this.height - this.rightNav.height)/2;
            for(var i in this.children){
                if(this.children[i].type == "picture") 
                    this.adjustPicture(this.children[i]);
                else{
                }
            }
        }
        
        p.createNav = function(){
            var self = this;
            this.leftNav.width = this.leftNav.getBounds().width;
            this.leftNav.height = this.leftNav.getBounds().height;
            this.rightNav.width = this.rightNav.getBounds().width;
            this.rightNav.height = this.rightNav.getBounds().height;
            this.leftNav.x = 15; 
            this.leftNav.y = (this.height - this.leftNav.height)/2;
            this.rightNav.x = this.width - this.rightNav.width - 15;
            this.rightNav.y = (this.height - this.rightNav.height)/2;
            this.rightNav.cursor = this.leftNav.cursor = 'pointer';
            this.rightNav.on('mouseover',function(e){
                e.target.shadow = new createjs.Shadow('#a90329', 2, 2, 15);
            })
            this.rightNav.on('mouseout',function(e){
                e.target.shadow = null;
            })
            this.leftNav.on('mouseover',function(e){
                e.target.shadow = new createjs.Shadow('#a90329', 2, 2, 15);
            })
            this.leftNav.on('mouseout',function(e){
                e.target.shadow = null;
            })
            this.leftNav.on('click',function(){
                
                var picture = self.getChildByName(self.currentPictureName);
                createjs.Tween.get(picture)
                .to({x:(-picture.width)},400)
                .to({visible:false});
                
                self.currentPosition -= 1;
                if(self.currentPosition < 0)
                    self.currentPosition = self.numOfPics - 1;  
                picture = self.getChildByName(self.currentPosition);
                picture.x = self.width + picture.width;
                picture.visible = true;
                createjs.Tween.get(picture)
                .to({x:picture.middleX},400);
                self.currentPictureName = picture.name;
            });
            this.rightNav.on('click',function(){
                
                var picture = self.getChildByName(self.currentPictureName);
                createjs.Tween.get(picture)
                .to({x:(self.width + picture.width)},400)
                .to({visible:false});
                
                self.currentPosition += 1;
                if(self.currentPosition > (self.numOfPics - 1))
                    self.currentPosition = 0;  
                picture = self.getChildByName(self.currentPosition);
                picture.x = -picture.width;
                picture.visible = true;
                createjs.Tween.get(picture)
                .to({x:picture.middleX},400);
                self.currentPictureName = picture.name;
            });
            
            
            this.addChild(this.rightNav, this.leftNav);
        }
        
        p.adjustPicture = function(image){
            image.width = image.getBounds().width;
            image.height = image.getBounds().height;
            var wtoh = image.width/image.height;
            var dimension = 0;
            if(this.width > this.height) dimension = this.height;
            else dimension = this.width;
            var xRatio = image.width/dimension;
            var yRatio = image.height/dimension;
            var width; var height;
            if(wtoh < 1){
                image.scaleY = (1/yRatio);
                if(image.scaleY > 1) image.scaleY = 1;
                width = (image.height * image.scaleY) * wtoh;
                var widthRatio = image.width/width;
                image.scaleX = 1/widthRatio;
                height = image.height * image.scaleY;
                image.width = width; image.height = height;
            }
            else{
                image.scaleX = (1/xRatio);
                if(image.scaleX > 1) image.scaleX = 1;
                height = (image.width * image.scaleX) / wtoh;
                var heightRatio = image.height/height;
                image.scaleY = 1/heightRatio;
                width = image.width * image.scaleX;
                image.width = width; image.height = height;
            }

            image.x = (this.width - image.width)/2;
            image.middleX = image.x;
            image.y = (this.height - image.height)/2;
                
        }
        
        p.createImages = function(images){
            this.numOfPics = 0;
            for(var i= 0; i < images.length; i++){
                var image = new createjs.Bitmap(images[i]);
                this.adjustPicture(image);
                image.name = i;
                image.type = "picture";
                image.shadow = new createjs.Shadow('#00b7ea', 1, 1, 5);
                this.numOfPics += 1;
                var text = new createjs.Text(images[i].text);
                text.width = text.getBounds().width;
                text.height = text.getBounds().height;
                text.number = i;
                image.text = text;
                text.x = this.width - text.width - 20;
                
                
                var bg = new createjs.Shape();
                bg.graphics.beginFill('#000');
                bg.alpha = 0.6;
                bg.graphics.drawRoundRect(0, 0, text.width * 1.5, text.height * 1.5,20);
                text.bg = bg;
                
                image.visible = text.visible = bg.visible = false;
                if(image.name == 0){
                    image.visible = text.visible = bg.visible = true;
                    this.currentPictureName = 0;
                    this.currentPosition = 0;
                }
                this.addChild(image);
                
            }
        }
        
        return GalleryObj;
    
    }());

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
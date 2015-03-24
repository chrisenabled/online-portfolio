define(['createJs'], function(){
    var objectsLink = '../assets/js/Objects';
    var stage, queue, canvas, logoContainer, PreloaderBar, menuContainer, startButton;
    var tickCount = 0; var logoArray = [];
    
    //function to load assets and initialize the stage
    function preload() {
        queue = new createjs.LoadQueue();
        queue.installPlugin(createjs.Sound);
        queue.loadManifest([
            {id:"startButton", src:"../assets/images/start_button.png"},
            {id:"buttonClick", src:"../assets/sounds/button_click.mp3"},
            {id:1, src:"../assets/images/nodejs.png"},
            {id:2, src:"../assets/images/git.png"},
            {id:3, src:"../assets/images/ruby.png"},
            {id:4, src:"../assets/images/rails.png"},
            {id:5, src:"../assets/images/visual-studio.png"},
            {id:6, src:"../assets/images/postgresql.png"},
            {id:7, src:"../assets/images/python.png"},
            {id:8, src:"../assets/images/cisco.png"},
            {id:9, src:"../assets/images/spring.png"},
            {id:10, src:"../assets/images/php.png"},
            {id:11, src:"../assets/images/android.png"},
            {id:12, src:"../assets/images/hjc.png"},
            {id:13, src:"../assets/images/apache.png"},
            {id:14, src:"../assets/images/jsf.png"},
            {id:15, src:"../assets/images/hadoop.png"},
            {id:16, src:"../assets/images/java.png"},
            {id:17, src:"../assets/images/angular.png"},
            {id:18, src:"../assets/images/mysql.png"},
            {id:19, src:"../assets/images/yii.png"},
            {id:20, src:"../assets/images/gimp.png"},
            {id:21, src:"../assets/images/mongodb.png"},
            {id:22, src:"../assets/images/vagrant.png"},
            {id:23, src:"../assets/images/virtualbox.png"},
            {id:24, src:"../assets/images/laravel.png"},
            {id:25, src:"../assets/images/meteor.png"},
            {id:26, src:"../assets/images/wp.png"},
            {id:27, src:"../assets/images/easeljs.png"},

        ], false);
        init();
    }
    
    function init() {
        onWindowResize();
        setStage();
        setPreloader();
        queue.on("fileprogress", handleFileLoad, this);
        queue.on("complete", function(e){
            stage.removeChild(PreloaderBar);
            PreloaderBar = null;
            startButton = new StartButton();
        });
        queue.load();
    }
    
    function onWindowResize(){
      window.addEventListener("resize", function(e){
            if(stage){
                stage.canvas.width = window.innerWidth;
                stage.canvas.height = window.innerHeight;
            }
            if(PreloaderBar){
                PreloaderBar.x = (stage.canvas.width - PreloaderBar.width)/2; 
                PreloaderBar.y = (stage.canvas.height - PreloaderBar.height)/2;
            }
            if(logoContainer){
                logoContainer.width = stage.canvas.width;
                logoContainer.height = stage.canvas.height;
            }
            if(logoArray.length > 0){
                for(var i = 0; i < logoArray.length; i++){
                    logoArray[i].resizeLogo();
                    console.log(logoArray[i].scale);
                }
            }
            if(menuContainer){
                menuContainer.setDimension();
                menuContainer.adjustLists();
            }
            if(startButton){
                startButton.adjustButton();
            }
        });  
    }
    
    function setStage(){
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        stage = new createjs.Stage(canvas);
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        stage.enableMouseOver(10);
        setTicker();
    }

    
    function setPreloader(){
        require([objectsLink], function(p){
            PreloaderBar = PreloaderBar || new p.Preloader('#4f7e0d','#000');
            PreloaderBar.x = (stage.canvas.width - PreloaderBar.width)/2; 
            PreloaderBar.y = (stage.canvas.height - PreloaderBar.height)/2;
            stage.addChild(PreloaderBar);
        });
        
        stage.update();
    }
    
    function handleFileLoad(e){
        if(PreloaderBar)
            PreloaderBar.update(e.progress);
    }
    
    var StartButton = (function(){
            
        var button = function(){
            this.btn;
            this.initialize();
            //this.button_initialize;
        }
        
        var p = button.prototype; 
        
        p.initialize = function(){
            this.btn = new createjs.Bitmap(queue.getResult('startButton'));
            var self = this;
            this.btn.name = 'startButton';
            this.btn.cursor = 'pointer';
            this.btn.regY = this.btn.getBounds().height/2;
            this.btn.regX = this.btn.getBounds().width/2;            
            this.adjustButton();
            this.btn.on("click", function(e){
                //self.pressdown();
                e.preventDefault();
                var instance = createjs.Sound.play("buttonClick");
                instance.volume = 0.2;
                createjs.Tween.get(self.btn).call(self.pressdown, [self.btn]).wait(200)
                .call(self.pressup, [self.btn, self.btn.shadow])
                .to({rotation: 360, alpha:0, scaleX:0, scaleY:0 }, 1000, createjs.Ease.linear)
                .to({rotation: 0}).call(self.removeButton); 
                begin();
                return false;
            });
            
            stage.addChild(this.btn);
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
            stage.removeChild(btn);
        }
        
        p.adjustButton = function(){
            this.btn.x = ((stage.canvas.width - this.btn.getBounds().width)/2)
                + this.btn.regX;
            this.btn.y = ((stage.canvas.height - this.btn.getBounds().height)/2)
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
    
    
    function loadBackgroundSong(){
        var songQ = new createjs.LoadQueue();
        songQ.installPlugin(createjs.Sound);
        songQ.loadManifest(
            [{id:"echoLake", src:"../assets/sounds/echo_lake.mp3"}]);
        songQ.on("complete", function(e){
            var instance = createjs.Sound.play("echoLake", {loop:6});
                instance.volume = 0.1;
        });
    }
    
    
    function begin(){
        loadBackgroundSong();
        setLogoContainer();
        setMenu();
        createjs.Ticker.addEventListener("tick", onTick);
    }
    
    function setMenu(){
        menuContainer = new MenuContainer();
        stage.addChild(menuContainer);
    }
    
    function createLogo(x,y){
        var logoObj;
        logoObj = new logo(Math.floor((Math.random() * 27) + 1),x,y);
        logoContainer.addChild(logoObj.logo);
        logoArray.push(logoObj);
    }
    
    
    function onTick(e){
        if(tickCount == 30){
            tickCount = 0;
            createLogo(0,((stage.canvas.height/2) - 35));
        }
        tickCount++;
        updateLogoPosition(); 
    }
    
    function updateLogoPosition(){
        var logoArrayTransverse = logoArray;
        for(i = 0; i < logoArrayTransverse.length; i++){
            if(logoReposition(logoArrayTransverse[i]) == -1)
                logoArray.splice(i,1);
        }
    }
    
    function setTicker(){
        createjs.Ticker.addEventListener("tick", function(){
            stage.update();
        });
    }
    
    var logo = (function(){
        
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
            this.logo = new createjs.Bitmap(queue.getResult(image));
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
    
    function logoReposition(logoObj){
        if(logoObj.willReverse){
                if(logoObj.nextX >= logoContainer.width - logoObj.scaledWidth){
                    logoObj.xSpeed = -(logoObj.xSpeed);
                }
                if(logoObj.xSpeed < 0 && logoObj.logo.x < -(logoObj.scaledWidth)){
                    if(logoContainer.removeChild(logoObj.logo))
                    return -1;
                }
            }
        if(logoObj.logo.x > (logoObj.scaledWidth + logoContainer.width)){
            if(logoContainer.removeChild(logoObj.logo))
            return -1;
        }
        else{ 
            if(logoObj.updateCounter == logoObj.changeNumber){
                logoObj.vSpeed = -(logoObj.vSpeed);
                logoObj.updateCounter = 0;
            }
            logoObj.nextX = logoObj.logo.x + logoObj.xSpeed;
            logoObj.nextY = logoObj.logo.y + logoObj.vSpeed;
            if(logoObj.nextY >= (logoContainer.height - logoObj.scaledHeight)
              || logoObj.nextY <= 0)
                logoObj.vSpeed = -(logoObj.vSpeed);
            //var num = Math.floor(Math.random()*99) + 1;
            logoObj.logo.x = logoObj.nextX; logoObj.logo.y = logoObj.nextY;
            //num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
            //this.logo.x = this.nextX;
            //createjs.Tween.get(this.logo).to({x:this.nextX, y:this.nextY}, 2000);
            logoObj.updateCounter++;
            return 1;
        }
        
    }
    
    function setLogoContainer(){
        logoContainer = new createjs.Container();
        logoContainer.width = stage.canvas.width;
        logoContainer.height = stage.canvas.height;
        stage.addChild(logoContainer);
    }
    
    //.....aspect that deals with the menu and its functionalities
    
    var MenuContainer = (function(){
        
        var menu = function(){
            this.initialize(); this.level;
        }
        
        var p = menu.prototype = new createjs.Container();
        p.width = window.innerWidth * 0.6;
        p.height = window.innerHeight - ($("#app-nav-bar").height() + $("#footer").height());

        p.Container_initialize = p.initialize;
        p.initialize = function(){
            this.Container_initialize;
            this.setDimension();
            this.level = 0;
            this.createList("Resume",1500);
            this.createList("Software Experience",1900);
            this.createList("Networking Experience",2300);
            this.createList("Projects",2700);
            
        }
        
        p.setDimension = function(){
            this.width = window.innerWidth * 0.65; 
            var height = window.innerHeight - ($("#app-nav-bar").height() + $("#footer").height());
            //alert("window: " + window.innerWidth + " container: " + this.width );
            if(window.innerWidth < 960) 
                this.width = window.innerWidth * 0.8;
            if(window.innerWidth < 639) 
                this.width = window.innerWidth * 0.95;
    
            this.height = height * 0.95;
            this.x = ((stage.canvas.width - this.width)/2);
            this.y = $("#app-nav-bar").height() + ((height - this.height)/2);
            if(this.bg) this.removeChild(this.bg);
            this.bg = new createjs.Shape();
            //this.bg.graphics.setStrokeStyle(1);
            //this.bg.graphics.beginStroke("red");
            this.bg.graphics.beginFill('#fff');
            this.bg.alpha = 0.6;
            this.bg.graphics.drawRoundRect(0, 0, this.width, this.height,20);
            this.addChild(this.bg);
            this.setChildIndex(this.bg,0);
            for (var i in this.children)
            {
                var child = this.children[i];
                    child.x = (this.width/2) - (child.width/2);
            }
        
        }
        
        p.createList = function(name,tweenLevel){
            var level = this.level;
            listText = new createjs.Text(name, '12px Times', '#fff');
            listText.width = listText.getBounds().width;
            listText.cursor = 'pointer';
            listText.name = name;
            listText.alpha = 0.1;
            //listText.textAlign = 'center';
            var list = new createjs.Shape();
            list.cursor = 'pointer';
            list.name = name;
            var self = this;
            list.width = listText.getBounds().width + 40; list.alpha = 0.3;
            list.height = 20; list.level = level; list.tweenLevel = tweenLevel;
            list.x = 0;//(this.width/2) - (list.width/2);
            list.y = this.nextListY;
            list.graphics.beginFill('#009900');
            list.graphics.drawRect(0, 0, list.width, list.height);
            list.graphics.endFill();
            listText.x = 0;//(this.width/2) - (listText.getBounds().width/2);
            listText.y = list.y + 4; listText.level = level; listText.tweenLevel = tweenLevel;
            this.nextListY = list.y + 20;
            list.listText = listText;
            listText.on("click", self.tweenOut, this,false, {obj:listText});
            list.on("click", self.tweenOut, this,false, {obj:list});
            this.addChild(list,listText);
            this.tweenIn(list); this.tweenIn(listText);
            this.adjustLists();    
        }
        
        p.adjustLists = function(){
            var level = this.level;
            var countList = 0;
            var gap = 20;
            var height = 20;
            var totalSpace = 0;
            var startingY = 0;
            var nextY = 0;
            for(var i in this.children){
                if(typeof this.children[i].level != 'undefined' && this.children[i] instanceof                              createjs.Shape && this.children[i].level == level){
                    totalSpace += gap + height;
                }       
            }
            startingY = (this.height - totalSpace)/2;
            nextY = startingY;
            
            for(var i in this.children){
                if(typeof this.children[i].level != 'undefined' && this.children[i] instanceof                              createjs.Shape && this.children[i].level == level){
                    this.children[i].y = nextY;
                    this.children[i].listText.y = this.children[i].y + 4;
                    nextY += height + gap;
                }       
            }
        }
        
        p.tweenIn = function(child){
            var self = this;
            createjs.Tween.get(child)
                    .to({x: ((this.width/2) - (child.width/2)), alpha:1}, child.tweenLevel,                                                    createjs.Ease.backOut);
        }
        
        p.tweenOut = function(e,data){
            var self = this;
            var shown = false;
            for (var i in this.children)
            {
                var child = this.children[i];
                if (child.level == 0){
                    createjs.Tween.get(child)
                    .to({x: (self.width - child.width), alpha:0 }, child.tweenLevel,                                           createjs.Ease.backIn).call(showNext); 
                }

            }
            function showNext(){
                if(!shown){
                    self.level = 1;
                    if(data.obj.name == "Resume"){
                        self.createList("New",1500);
                        self.createList("New",1900); 
                    }
                    
                    shown = true;
                }
            }
        }
        
        return menu;
    }());

    return {
        init: preload() ,
    }
    
});
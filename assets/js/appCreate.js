define(['createJs','objects'], function(){
    var stage, queue, canvas, logoContainer, PreloaderBar, menuContainer, startButton;
    var tickCount = 0; var logoArray = []; var backgroundSong; var gallery; var galleryQueue;
    
    //function to load assets and initialize the stage
    function preload() {
        queue = new createjs.LoadQueue();
        queue.installPlugin(createjs.Sound);
        queue.loadManifest([
            {id:"startButton", src:"../assets/images/start_button.png"},
            {id:"buttonClick", src:"../assets/sounds/button_click.mp3"},
            {id:"blop", src:"../assets/sounds/blop.mp3"},
            {id:"list", src:"../assets/images/list.png"},
            {id:"back", src:"../assets/images/back.png"},
            {id:"home", src:"../assets/images/home.png"},
            {id:"volumeOn", src:"../assets/images/volume-up.png"},
            {id:"volumeOff", src:"../assets/images/volume-off.png"},
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
        queue.on("fileload", handleFileLoad, this);
        queue.on("complete", function(e){
            stage.removeChild(PreloaderBar);
            PreloaderBar = null;
            loadButton();            
        });
        queue.load();
    }
    
    function loadButton(){
        startButton = new StartButton(queue.getResult('startButton'),stage);
        var self = startButton;
        self.btn.on("click", function(e){
            e.preventDefault();
            var instance = createjs.Sound.play("buttonClick");
            instance.volume = 0.2;
            createjs.Tween.get(self.btn).call(self.pressdown, [self.btn]).wait(200)
            .call(self.pressup, [self.btn, self.btn.shadow])
            .to({rotation: 1080, alpha:0, scaleX:0, scaleY:0 }, 1000, createjs.Ease.linear)
            .to({rotation: 0}).call(self.removeButton).call(begin); 
            //begin();
            return false;
        });
            
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
                }
            }
            if(menuContainer){
                menuContainer.setDimension();
                menuContainer.adjustChildren();
            }
            if(startButton){
                startButton.adjustButton();
            }
            if(gallery){
                gallery.setDimension();
                gallery.adjustChildren();
                
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
            PreloaderBar = new window.Preloader('#4f7e0d','#000');
            PreloaderBar.x = (stage.canvas.width - PreloaderBar.width)/2; 
            PreloaderBar.y = (stage.canvas.height - PreloaderBar.height)/2;
            stage.addChild(PreloaderBar);
    }
    
    function handleFileLoad(e){
        if(PreloaderBar)
            PreloaderBar.update(1/37);
    }
    
    
    
    function loadBackgroundSong(){
        var songQ = new createjs.LoadQueue();
        songQ.installPlugin(createjs.Sound);
        songQ.loadManifest(
            [{id:"echoLake", src:"../assets/sounds/echo_lake.mp3"}]);
        songQ.on("complete", function(e){
            backgroundSong = createjs.Sound.play("echoLake", {loop:6});
                backgroundSong.volume = 0.1;
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
        var imageNum = Math.floor((Math.random() * 27) + 1);
        var image = queue.getResult(imageNum);
        logoObj = new window.logo(image,x,y);
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
            this.initialize(); 
        }
        
        var p = menu.prototype = new createjs.Container();
        p.width = window.innerWidth * 0.6;
        p.height = window.innerHeight - ($("#app-nav-bar").height() + $("#footer").height());

        p.Container_initialize = p.initialize;
        p.initialize = function(){
            this.Container_initialize;
            this.setDimension();
            this.createMenuButtons();
            this.createTopList();
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
            var oldBg = this.getChildByName("bg");
            if(typeof oldBg !== "undefined") this.removeChild(oldBg);
            var bg = new createjs.Shape();
            bg.name = "bg";
            bg.graphics.beginFill('#fff');
            bg.alpha = 0.6;
            bg.graphics.drawRoundRect(0, 0, this.width, this.height,20);
            var mask = new createjs.Shape();
            mask.graphics.beginFill("#000").drawRect(this.x,this.y,this.width,this.height,20);
            this.mask = mask;
            this.addChild(bg);
            this.setChildIndex(bg,0);
            for (var i in this.children)
            {
                var child = this.children[i];
                    child.x = (this.width/2) - (child.width/2);
            }
            this.alpha = 0; 
            createjs.Tween.get(this).to({alpha:1},400);
        
        }
        
        p.createMenuButtons = function(){
            var self = this;
            this.backBtn = new createjs.Bitmap(queue.getResult('back'));
            this.backBtn.x = 55; 
            this.backBtn.y = 5; 
            this.backBtn.alpha = 0;
            this.backBtn.cursor = 'pointer';
            this.backBtn.on('click',function(e){
                this.level -= 1;
                if(this.level < 1)this.level = 1;
                else{ 
                    var instance = createjs.Sound.play("blop");
                    instance.volume = 0.1;
                    createjs.Tween.get(this.backBtn)
                    .to({alpha:0.1, scaleX:1.2, scaleY:1.2})
                    .to({alpha:1, scaleX:1, scaleY:1},400);
                    this.tweenOut();
                    setTimeout(function(){self.navigate();},1000);
                }
            }, this);
            
            this.homeBtn = new createjs.Bitmap(queue.getResult('home'));
            this.homeBtn.x = 15; 
            this.homeBtn.y = 5; 
            this.homeBtn.alpha = 0;
            this.homeBtn.cursor = 'pointer';
            this.homeBtn.on('click',function(e){
                if(self.level > 1){
                    var instance = createjs.Sound.play("blop");
                    instance.volume = 0.1;
                    createjs.Tween.get(e.target)
                    .to({alpha:0.1, scaleX:1.2, scaleY:1.2})
                    .to({alpha:1, scaleX:1, scaleY:1},400);
                    this.tweenOut();
                    setTimeout(function(){self.createTopList();},1000);

                }
            },this);
            
            this.volumeOn = new createjs.Bitmap(queue.getResult('volumeOn'));
            this.volumeOff = new createjs.Bitmap(queue.getResult('volumeOff'));
            this.volumeOn.x = this.volumeOff.x = this.width - 35;
            this.volumeOn.y = this.volumeOff.y = 5;
            this.volumeOn.cursor = this.volumeOff.cursor = 'pointer';
            this.volumeOff.visible = false;
            this.volumeOn.on('click',function(e){
                e.target.visible = false;
                self.volumeOff.visible = true;
                backgroundSong.setMute(true);
            },this);
            this.volumeOff.on('click',function(e){
                e.target.visible = false;
                self.volumeOn.visible = true;
                backgroundSong.setMute(false);
                
            },this);
            this.addChild(this.backBtn, this.homeBtn, this.volumeOff, this.volumeOn);
        }
        
        p.navigate = function(){  
            if(this.level == 1)
                this.createTopList();
            if(this.level == 2)
                this.createSecondList(this.grandParentListName);
        }
        
        p.createTopList = function(){
            this.level = 1;
            this.createList("Resume Summary",1,1000);
            this.createList("Software Experience",1,1200);
            this.createList("Networking Experience",1,1400);
            this.createList("Personal Projects",1,1600);
            this.createList("Gallery",1,1800);
        }
        
        p.createSecondList = function(parentListName){
            var self = this;
            this.level = 2;
            if(parentListName == "Resume Summary"){
                this.createList("Software Summary",2,1000);
                this.createList("Networking Summary",2,1200); 
            }
            if(parentListName == "Software Experience"){
                this.createList("Software Summary",2,1000);
                this.createList("Networking Summary",2,1200); 
            }
            if(parentListName == "Networking Experience"){
                this.createList("Software Summary",2,1000);
                this.createList("Networking Summary",2,1200); 
            }
            if(parentListName == "Personal Projects"){
                this.createList("Software Summary",2,1000);
                this.createList("Networking Summary",2,1200); 
            }
            if(parentListName == "Gallery"){
                if(galleryQueue instanceof createjs.LoadQueue){
                    this.createList("JAVA",2,1000);
                    this.createList("Android",2,1200);
                    this.createList("Ruby",2,1400);
                    this.createList("PHP",2,1600);
                    this.createList("Others",2,1800);
                }
                else{
                    galleryQueue = new createjs.LoadQueue();
                    galleryQueue.loadManifest([
                        {id:"j-01", src:"../assets/images/gallery/mimi.jpg"},
                        {id:"leftNav", src:"../assets/images/gallery/previous.png"},
                        {id:"rightNav", src:"../assets/images/gallery/next.png"}
                    ]);
                    galleryQueue.on('complete',function(e){
                        self.createSecondList(parentListName);
                    });
                }
            }
        
        }
        
        p.createThirdList = function(parentListName){
            this.level = 3;
            this.grandParentListName = "";
            if(parentListName == "Software Summary" || parentListName == "Networking Summary")
                this.grandParentListName = "Resume Summary";
            if(parentListName == "JAVA" || parentListName == "Android" ||
              parentListName == "Ruby" || parentListName == "PHP" ||
              parentListName == "Others")
                this.grandParentListName = "Gallery";
            
            if(parentListName == "Software Summary"){
                this.createDocument("software-summary",3);
            }
            if(parentListName == "Networking Summary"){
                this.createList("Jobs",3,1000);
                this.createList("Internship",3,1200); 
            }
            if(parentListName == "JAVA"){
                var images = [];
                var leftNav = galleryQueue.getResult('leftNav');
                var rightNav = galleryQueue.getResult('rightNav');
                images[0] = galleryQueue.getResult('j-01');
                images[0].text = "Hello";
                images[1] = galleryQueue.getResult('j-01');
                images[1].text = "Hello";
                gallery = new window.Gallery(3,"java",images, this, leftNav, rightNav);
            }
            if(parentListName == "Android"){
                this.createList("Jobs",3,1000);
                this.createList("Internship",3,1200); 
            }
            if(parentListName == "Ruby"){
                this.createList("Jobs",3,1000);
                this.createList("Internship",3,1200); 
            }
            if(parentListName == "PHP"){
                this.createList("Jobs",3,1000);
                this.createList("Internship",3,1200); 
            }
            if(parentListName == "Others"){
                this.createList("Jobs",3,1000);
                this.createList("Internship",3,1200); 
            }
            
        }
        
        p.createDocument = function(id,level){
            var self = this;
            $("#"+id).css({"width":(this.width * 0.9)+"px", "height":(this.height * 0.8)+"px"});
            if(window.width < 480)
                $("#"+id).css({"width":(this.width * 0.5)+"px"});
            
            htmlDoc = document.getElementById(id);
            var content = new createjs.DOMElement(id);
            content.mouseEnabled = true;
            content.level = level;
            content.alpha = 0;
            content.DOMId = id;
            content.x = (this.width - htmlDoc.offsetWidth)/2; content.y = 40;
            createjs.Tween.get(content).to({alpha:1},1200);
            this.addChild(content);
            window.addEventListener('resize', function(e){
                if(self.contains(content)){
                    self.removeChild(content);
                    self.createDocument(id,level);
                }
            });
        }
        
        p.createList = function(name,level,tweenLevel){
            listText = new createjs.Text(name, '12px Verdana', '#fff');
            listText.width = listText.getBounds().width;
            listText.height = listText.getBounds().height;
            listText.cursor = 'pointer';
            listText.name = name;
            listText.alpha = 0.1;
            var list = new createjs.Bitmap(queue.getResult('list'));
            list.cursor = 'pointer';
            list.name = name;
            var self = this;
            list.width = list.getBounds().width; list.alpha = 0.3;
            list.height = list.getBounds().height; list.level = level; list.tweenLevel = tweenLevel;
            list.x = -list.width;
            listText.x = -listText.width;
            listText.y = list.y + (list.height/2); 
            listText.level = level; listText.tweenLevel = tweenLevel;
            list.listText = listText;
            listText.list = list;
            listText.on("click", self.tweenOut, this,false, {obj:listText});
            list.on("click", self.tweenOut, this,false, {obj:list});
            this.addChild(list,listText);
            this.adjustChildren();
            this.tweenIn(list);
            if(level == 1){
                    createjs.Tween.get(this.backBtn).to({alpha:0},1000);
                    createjs.Tween.get(this.homeBtn).to({alpha:0},1000);
                }
            else{
                createjs.Tween.get(this.backBtn).to({alpha:1},1000);
                createjs.Tween.get(this.homeBtn).to({alpha:1},1000);
            }
                
        }
        
        p.adjustChildren = function(){
            var level = this.level;
            var countList = 0;
            var gap = 20;
            var height = 20;
            var totalSpace = 0;
            var startingY = 0;
            var nextY = 0;
            this.backBtn.x = 55;
            this.homeBtn.x = 15;
            this.backBtn.y = this.homeBtn.y = 5;
            this.volumeOn.x = this.volumeOff.x = this.width - 35;
            this.volumeOn.y = this.volumeOff.y = 5;
            for(var i in this.children){
                if(typeof this.children[i].level != 'undefined' && this.children[i] instanceof                              createjs.Bitmap && this.children[i].level == level){
                    totalSpace += gap + height;
                }       
            }
            startingY = (this.height - totalSpace)/2;
            nextY = startingY;
            
            for(var i in this.children){
                if(typeof this.children[i].level != 'undefined' && this.children[i] instanceof                              createjs.Bitmap && this.children[i].level == level){
                    var lt = this.children[i].listText;
                    this.children[i].y = nextY;
                    lt.y = (this.children[i].y + this.children[i].height/2) - (lt.height/2);
                    nextY += height + gap;
                }       
            }
        }
        
        p.tweenIn = function(child){
            var self = this;
            createjs.Tween.get(child)
                    .to({x: ((this.width/2) - (child.width/2)), alpha:1}, child.tweenLevel,                                                    createjs.Ease.backOut);
            createjs.Tween.get(child.listText)
                    .to({x: ((this.width/2) - (child.listText.width/2)), alpha:1}, 
                        child.listText.tweenLevel, createjs.Ease.backOut);                                                         
        }
        
        p.tweenOut = function(e,data){
            var self = this;
            var shown = false;
            if(typeof data !== 'undefined'){
                self.clickedListName = data.obj.name;
                var instance = createjs.Sound.play("blop");
                instance.volume = 0.2;
                if(data.obj instanceof createjs.Text){
                    createjs.Tween.get(data.obj)
                        .to({scaleX:1.1, scaleY:1.1}).to({scaleX:1, scaleY:1},300);
                    createjs.Tween.get(data.obj.list)
                        .to({scaleX:1.1, scaleY:1.1}).to({scaleX:1, scaleY:1},300);
                }
                if(data.obj instanceof createjs.Bitmap){
                    createjs.Tween.get(data.obj)
                        .to({scaleX:1.1, scaleY:1.1}).to({scaleX:1, scaleY:1},300);
                    createjs.Tween.get(data.obj.listText)
                        .to({scaleX:1.1, scaleY:1.1}).to({scaleX:1, scaleY:1},300);
                }
            }
            for (var i in this.children)
            {
                var child = this.children[i];
                if (typeof child.level !== 'undefined'){
                    if(child instanceof createjs.DOMElement){
                        createjs.Tween.get(child).to({alpha:0},500).call(function(){
                            self.removeChild(child);
                            $("#"+child.DOMId).css({"visibility":"hidden"});
                        });
                        
                    }
                    else{
                        if(child instanceof createjs.Bitmap){
                            createjs.Tween.get(child)
                            .to({x: (self.width + child.width), alpha:0 }, child.tweenLevel,                                           createjs.Ease.backIn).call(showNext).call(remove,[child]);
                            createjs.Tween.get(child.listText)
                            .to({x: (self.width + child.width), alpha:0 }, child.tweenLevel,                                           createjs.Ease.backIn).call(remove,[child.listText]);
                        } 
                    }
                    if(child instanceof createjs.Container){
                        createjs.Tween.get(child).to({alpha:0},1000).call(function(){
                            remove(child);
                            delete gallery;
                        });
                        
                    }
                }

            }
            function showNext(){
                if(!shown && typeof data !== 'undefined'){
                    if(this.level == 1)
                        self.createSecondList(self.clickedListName);
                    if(this.level == 2)
                        self.createThirdList(self.clickedListName);
                    shown = true;
                }
            }
            function remove(child){
                self.removeChild(child);
            }
        }
        
        return menu;
    }());

    return {
        init: preload() ,
    }
    
});
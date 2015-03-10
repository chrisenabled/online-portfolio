define(['createJs'], function(){
    var PreloadBarLink = '../assets/js/PreloadBar';
    var stage, queue, canvas, logoContainer, PreloaderBar;
    var tickCount = 0; var logoArray = [];
    
    //PreloadBar.initialize();
    // onload
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
        ], false);
        init();
    }
    
    function handleFileLoad(e){
        PreloaderBar.update(e.progress);
    }
    
    function begin(){
        stage.removeChild(PreloaderBar);
        PreloaderBar = null;
        setLogoContainer();
        createStartButton();
        createLogo(0,120);
    }
    
    function createLogo(x,y){
        var logoObj;
        logoObj = new logo(Math.floor((Math.random() * 25) + 1),x,y);
        logoContainer.addChild(logoObj.logo);
        logoArray.push(logoObj);
    }
    
    
    function onTick(e){
        if(tickCount == 30){
            tickCount = 0;
            createLogo(0,120);
            console.log(logoArray.length);
        }
        tickCount++;
        updateLogoPosition(); 
        stage.update();
    }
    
    function updateLogoPosition(){
        var logoArrayTransverse = logoArray;
        for(i = 0; i < logoArrayTransverse.length; i++){
            if(logoReposition(logoArrayTransverse[i]) == -1)
                logoArray.splice(i,1);
        }
    }
    
    function setTicker(){
        createjs.Ticker.addEventListener("tick", onTick);
    }
    
    var logo = (function(){
        
        var logoObj = function(image,x,y){
            this.logo;
            this.updateCounter = 0;
            this.changeNumber;this.vSpeed; this.xSpeed;
            this.reverseNumber = 3; this.willReverse = false;
            this.randomizeReverse = Math.floor(Math.random()* 10) + 1;
            this.initialize(image,x,y);
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
            createjs.Tween.get(this.logo,{loop:true})
            .wait(500)
            .to({alpha:0.2}, 3000).to({alpha:0.5}, 3000);
        }
        
        return logoObj;
    }());
    
    function logoReposition(logoObj){
        if(logoObj.willReverse){
                if(logoObj.nextX >= logoContainer.width - logoObj.logo.getBounds().width){
                    logoObj.xSpeed = -(logoObj.xSpeed);
                }
                if(logoObj.xSpeed < 0 && logoObj.logo.x < -(logoObj.logo.getBounds().width)){
                    if(logoContainer.removeChild(logoObj.logo))
                    return -1;
                }
            }
        if(logoObj.logo.x > (logoObj.logo.getBounds().width + logoContainer.width)){
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
            if(logoObj.nextY >= (logoContainer.height - logoObj.logo.getBounds().height)
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
    
    function createStartButton(){
        var startButton = new createjs.Bitmap(queue.getResult('startButton'));
        startButton.name = 'startButton';
        startButton.shadow = new createjs.Shadow('#000', 5, 5, 8);
        startButton.regY = startButton.getBounds().height/2;
        startButton.regX = startButton.getBounds().width/2;
        startButton.x = ((stage.canvas.width - startButton.getBounds().width)/2)
        + startButton.regX;
        startButton.y = ((stage.canvas.height - startButton.getBounds().height)/2)
        + startButton.regY;
        window.onresize = function(e){
            startButton.x = ((stage.canvas.width - startButton.getBounds().width)/2)
                + startButton.regX;
            startButton.y = ((stage.canvas.height - startButton.getBounds().height)/2)
                + startButton.regY;
        };
        var pressdown = function(){
            startButton.shadow = null;
            startButton.x = startButton.x + 3;
            startButton.y = startButton.y + 3;
        };
        var pressup = function(){
            startButton.x = startButton.x - 3;
            startButton.y = startButton.y - 3;
            startButton.shadow = new createjs.Shadow('#000', 5, 5, 8);
        };
        
        startButton.on("click", function(e){
            e.preventDefault();
            var instance = createjs.Sound.play("buttonClick");
            instance.volume = 0.1;
            createjs.Tween.get(this).call(pressdown).wait(200).call(pressup)
                .to({rotation: 360, alpha:0, scaleX:0, scaleY:0 }, 1000, createjs.Ease.linear)
                .to({rotation: 0}); 
            return false;
        });
        
        stage.addChild(startButton);
    }
    function setPreloader(){
        require([PreloadBarLink], function(p){
            PreloaderBar = new p.Preloader('#4f7e0d','#000');
            PreloaderBar.x = (stage.canvas.width - PreloaderBar.width)/2; 
            PreloaderBar.y = (stage.canvas.height - PreloaderBar.height)/2;
            stage.addChild(PreloaderBar);
            window.addEventListener("resize", function(e){
                PreloaderBar.x = (stage.canvas.width - PreloaderBar.width)/2; 
                PreloaderBar.y = (stage.canvas.height - PreloaderBar.height)/2;
            });
        });
        
        stage.update();
    }
    
    function setLogoContainer(){
        logoContainer = new createjs.Container();
        logoContainer.width = stage.canvas.width;
        logoContainer.height = stage.canvas.height;
        stage.addChild(logoContainer);
        window.addEventListener("resize", function(e){
            logoContainer.width = stage.canvas.width;
            logoContainer.height = stage.canvas.height;
        });
    }
    
    function setStage(){
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        stage = new createjs.Stage(canvas);
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        setTicker();
        window.addEventListener("resize", function(e){
            stage.canvas.width = window.innerWidth;
            stage.canvas.height = window.innerHeight;
        });
    }
    
    function init() {
        setStage();
        setPreloader();
        queue.on("fileprogress", handleFileLoad, this);
        queue.on("complete", begin, this);
        queue.load();
    }
    
    return {
        init: preload() ,
    }
    
});
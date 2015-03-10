define([],function(){


    
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
        }
        
        p.update = function (perc) {
            perc = perc > 1 ? 1 : perc;
            this.bar.scaleX = perc;
        }
        return {Preloader : Preloader}  

});
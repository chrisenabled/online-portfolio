define(['createJs'], function(){

    var stage;
    
    return {
        init: function(){
            stage = new createjs.Stage("myCanvas");
            var ball = new createjs.Shape();
            ball.graphics.beginFill("#000000").drawCircle(0, 0, 50);
            ball.x = 50;
            ball.y = 50;
            stage.addChild(ball);
            stage.update();
        },
    }
    
});
define(['jquery'], function(){

     resizeFooter();
    window.addEventListener('resize', function(e){
    
        resizeFooter();
    })
    
    
    
    function resizeFooter(){
        if(window.innerHeight <= 500 || window.innerWidth <= 799){
            $('#footer').css({"height":"60px", "line-height":"60px"});
            $('#footer img').css({"height":"36px", "width":"36px","margin": "0px 3px 0px 3px"});
        }
        else{
            $('#footer').css({"height":"100px", "line-height":"100px"});
            $('#footer img').css({"height":"48px", "width":"48px","margin": "0px 7px 0px 7px"});
        }
    
    }

    
    
});
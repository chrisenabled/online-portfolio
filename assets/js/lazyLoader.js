define(
    [
        'createJs','backbone','bootstrapJs','app','jquery'    
    ], 
    function(){
        //Define paths for custom assets
        $(document).ready(function(){
            
            var appCreate = '../assets/js/appCreate';
        
        
            //Load custom assets that are used throughout the application

            //Declare loader assets and loader helpers   
            var AppRouter = Backbone.Router.extend({
                routes: {
                    "index": "index",
                    "*actions": "defaultRoute" // Backbone will try to match the route above first
                }
            });

            //Instantiate loader assets and loader helpers
            var app_router = new AppRouter;

            //implement routing with Backbone
            app_router.on('route:index', function () {

                require([appCreate], function(acjs){
                    acjs.init;
                }); 

            });
            app_router.on('route:defaultRoute', function (actions) {
                alert( actions ); 
            });
            // Start Backbone history a necessary step for bookmarkable URL's
            Backbone.history.start();
        
        });

});
require.config({
    baseUrl: "bower_components", 
    
    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular': 'angular/angular.min',
        'ui-router': 'ui-router/release/angular-ui-router.min',
        'angularAMD': 'angularAMD/angularAMD.min',
        'jquery': ["https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
                   'jquery/dist/jquery'
                  ],
        'createJs': ["https://code.createjs.com/createjs-2014.12.12.min"],
        'backbone': ['backbone/backbone'],
        'underscore':['underscore/underscore-min'],
        'lazyLoader': '../assets/js/lazyLoader',
        'bootstrapJs': ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min"],
        'domReady':['https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min.js',
                   'requirejs-domready/domReady'],
        'app': '../app/app',
        'objects':'../assets/js/Objects'
    },
    shim: { 
            'ui-router': ['angular'],
            'createJs':{exports:'createjs'},
            'backbone':{deps:['jquery','underscore'], exports:'Backbone'},
            'bootstrapJs':{deps:['jquery']}
          },
    
    // alternative way to kick start applications and libs
    deps: ['lazyLoader']
});


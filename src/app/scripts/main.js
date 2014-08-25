/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }, 
        fitText: {
            deps: ['jquery'],
            exports: 'jquery'
        },        
        skrollr: {
            exports: 'skrollr'            
        }, 
        skrollrmenu: {
            deps: ['skrollr'],
            exports: 'skrollr'            
        },
        html5loader: {
            deps: ['jquery']
        }, 
        html5Circular: {
            deps: ['jquery']
        }                     
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap', 
        text: '../bower_components/requirejs-text/text',    
        fitText: '../bower_components/FitText.js/jquery.fittext',             
        skrollr: '../bower_components/skrollr/src/skrollr', 
        skrollrmenu: '../bower_components/skrollr-menu/src/skrollr.menu', 
        html5loader: '../bower_components/jquery.html5loader/src/jquery.html5Loader', 
        html5Circular: '../bower_components/jquery.html5loader/src/animations/jquery.html5Loader.circular'                   
    }
});

require([
    'backbone',
    'controllers/appController'    
], function (Backbone, AppController) {

    window.APP = {
        appController: new AppController()
    };  

    Backbone.history.start();

});

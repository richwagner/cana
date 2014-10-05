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
    'controllers/appController', 
    'controllers/mobileAppController',        
], function (Backbone, AppController, MobileAppController) {

  var isMobile = false;

    // Original but causes Android tablets to be considered mobile 
    // if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     isMobile = true; 
    // }

    var mobileFlag = ( navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i));
    var androidFlag = /android/i.test(navigator.userAgent.toLowerCase());
    var mobileTextFlag = /mobile/i.test(navigator.userAgent.toLowerCase());

    if (mobileFlag) {
        isMobile = true;     
    }
    //http://googlewebmastercentral.blogspot.com/2011/03/mo-better-to-also-detect-mobile-user.html
    else if (androidFlag && mobileTextFlag) {
        isMobile = true;
    }

    //*************************************
    // Mobile 
    //*************************************   
    if (isMobile) {
        window.APP = {
            isMobile: true, 
            mobileAppController: new MobileAppController()
        };    
    }
    //*************************************
    // Desktop  
    //*************************************           
    else {
        window.APP = {
            appController: new AppController()
        };

        APP.appController.parallaxScroller.setScrollTop(0); 

        Backbone.history.start();

    }

});

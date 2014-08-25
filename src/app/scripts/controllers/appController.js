define([
    'underscore',
    'backbone', 
    'fitText', 
    'html5loader',
    'html5Circular',    
    'skrollr',  
    'skrollrmenu',
    'views/mainView'
], function( _, Backbone, fitText, html5loader, html5Circular, skrollr, skrollrmenu, MainView) {

    var AppController = Backbone.Model.extend({

        parallaxScroller: null, 


        initialize: function() {
            var self = this; 

            this.loaderAnimation = $("#html5Loader").LoaderAnimation({
                onComplete:function(){
                }
            });

            $.html5Loader({
                  filesToLoad: "data/preload.json", 
                  onBeforeLoad: function(){},
                  onComplete: function() {},
                  onElementLoaded: function(obj, elm) {},
                  onUpdate: self.loaderAnimation.update
            });

            this.mainView = new MainView(); 

            // Snapto functionality: 
            // See https://github.com/Prinzhorn/skrollr/issues/53
            // See snapping.html example in bower_components 
            this.parallaxScroller = skrollr.init({
                edgeStrategy: 'set',
                beforerender: self.beforeParallaxRender
            });

            // Using a special version of skrollr.js because we need to have 
            // window.skrollr to be defined by the time we get to here. One workaround
            // would be to add an onload event handler for skrollr and only initialize 
            // menu after. 
            skrollr.menu.init(self.parallaxScroller, {
                animate: true, 
                easing: 'sqrt', 
                duration: function(currentTop, targetTop) {
                    return 500;
                },
                handleLink: function(link) {
                    if (link.id == "homeLink") {
                        self.mainView.removeDiscoverContent();
                        return 0;  
                    }
                    else if (link.id == "discoverLink") {
                        setTimeout(function(){
                           self.mainView.addDiscoverContent();
                            self.invalidateLayout(); 
                            self.parallaxScroller.refresh();                         
                        }, 500); 
                        return 1000; 
                    }
                    else if (link.id == "connectLink") {
                        self.mainView.removeDiscoverContent();
                        return 8000;  
                    }
                    else if (link.id == "serveLink") {
                        self.mainView.removeDiscoverContent();
                        return 9000;  
                    }
                    else if (link.id == "listenLink") {
                        self.mainView.removeDiscoverContent();
                        return 10000;  
                    }
                    else if (link.id == "giveLink") {
                        self.mainView.removeDiscoverContent();
                        return 11000;  
                    }
                }                
            }); 

            // Re-renders the entire skrollr contents when the window resizes. 
            // This ensures that the text is rendered at the proper size all 
            // the time    
            $(window).resize(function() {
                self.invalidateLayout(); 
                self.parallaxScroller.refresh(); 
            });          

            // Handler for context-sensitive menus, etc. 
            Backbone.on("beforeRender", function(event){
                var top = event.curTop; 
                console.log("top=" + top); 

                if ((top >= 700 && top < 1002) || (top < 7000 && top > 6000)) {
                    if (!self.mainView.discoverView) {
                        self.mainView.addDiscoverContent(); 
                        self.invalidateLayout(); 
                        self.parallaxScroller.refresh();                            
                    }
                }


            }); 
            this.invalidateLayout();                
            this.parallaxScroller.refresh(); 
        },  

        beforeParallaxRender: function(event){
            Backbone.trigger("beforeRender", event);           
        }, 

        invalidateLayout: function() {
            $(".vertical-title").css("width", $(window).height() + "px"); 
            $(".vertical-title").fitText(0.7); 
            $(".vertical-title").css("left", $(".vertical-title").css("font-size"));  

            var h = $(window).height() - 40 - 36; 
            $(".overlay-inner").css("height",  h+"px"); 

            // if ( $(window).height() < 1200) {
            //   $("#mainTitle").css("font-size", )  
            // }

            //{ minFontSize: '10px', maxFontSize: '80px' }
            $("#mainTitle").fitText(1.6, { minFontSize: '10px', maxFontSize: '80px' }); 


        },

        expandReadMore: function(id) {
            var self = this; 
            var root = id.replace("readMore", ""); 
            var overlaySel = "overlay" + root; 
            var discoverSel = "discover" + root; 

            $("#" + overlaySel).animate({
                left: "50%"
                }, 1000, function(){                                                  
            });  

            $("#" + discoverSel).animate({
                left: "-100%"
                }, 1000, function(){
                    self.disableScrolling();                                                   
            });             

            $("#scrollIndicator").fadeOut(); 
            $(".navbar").fadeOut(); 
        },  

        expandFullPageOverlay: function(id) {
            var self = this; 
            var root = id.replace("readMore", ""); 
            var overlaySel = "overlay" + root; 
            var discoverSel = "discover" + root; 

            $("#discoverMore").animate({
                left: "-100%"
                }, 1000, function(){                                                  
            });   

            $("#" + overlaySel).animate({
                left: "0%"
                }, 1000, function(){  
                    self.disableScrolling();                                                   
                                                
            });  

            $("#discoverVertical").fadeOut();
            $("#scrollIndicator").fadeOut(); 
            $(".navbar").fadeOut(); 
        }, 

        collapseFullPageOverlay: function(id) {

            var self = this; 
            var root = id.replace("readMore", ""); 
            var overlaySel = "overlay" + root; 

           $("#discoverMore").animate({
                left: "0%"
                }, 750, function(){                                                  
            });   

            $("#" + overlaySel).animate({
                left: "100%"
                }, 750, function(){    
                    $("#discoverVertical").fadeIn();
                    $("#scrollIndicator").fadeIn(); 
                    $(".navbar").fadeIn();
                    self.enableScrolling();                                                                 
            });             
        }, 


        collapseReadMore: function(id) {

            var self = this; 

           self.enableScrolling();

            var root = id.replace("readMore", ""); 
            var overlaySel = "overlay" + root; 
            var discoverSel = "discover" + root; 

            $("#" + overlaySel).animate({
                left: "100%"
                }, 750, function(){                                                  
            });  

            $("#" + discoverSel).animate({
                left: "0%"
                }, 750, function(){      
                    $("#scrollIndicator").fadeIn(); 
                    $(".navbar").fadeIn();  
    
           });             
        }, 


        iPadDevice: function() {
            var test = /ipad/i.test(navigator.userAgent.toLowerCase());
            if (test == true) {
                return true; 
            } 
            else if ($(window).width() < 1250 || $(window).height()<780) {
                return true; 
            }
            else {
                return false; 
            }
        }, 

        verticalAlign: function (selector) {
          var $element = $(selector); 
          var p = ($element.parent().height() - $element.height())/2; 
          var pos = Math.max(p,0); 
          $element.css("margin-top", pos+ 'px' )
        }, 

        horizontalAlign: function (selector) {
          var $element = $(selector); 
          $element.css("margin-left",($element.parent().width() - $element.width())/2 + 'px' )
        }, 

        // Dynamically updates font size based on the width of the 
        // element. Useful in cases where a heading needs to increase 
        // depending on size of browser. 
        // 
        // Params: 
        //    - selector: jQuery selector (e.g., ".list_value")
        //    - factor: small number (e.g. 2.5) increases size while larger number (e.g., 10) makes smaller  
        //    - minSize - minimum font size, regardless of width 
        updateTextSize: function(selector, factor, minSize) {
          var size = Math.max(Math.min($(selector).width() / factor, parseFloat(Number.POSITIVE_INFINITY)), minSize); 
          $(selector).css('font-size', size);
        }, 


        disableScrolling: function() {
            $('html').css({
                'overflow': 'hidden',
                'height': '100%'
            });        
        }, 

        enableScrolling: function() {
            $('html').css({
                'overflow': 'auto',
                'height': '100%'
            }); 
        } 





    });

    return AppController;
});

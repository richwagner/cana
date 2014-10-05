
define([
    'underscore',
    'backbone',    
    'views/mobileMainView'
], function( _, Backbone, MobileMainView) {

    var MobileAppController = Backbone.Model.extend({

        initialize: function() {
            var self = this; 

            $(window).on("orientationchange",function(){
                self.checkOrientation(); 
            });

            this.mobileMainView = new MobileMainView(); 
            $("#container").remove(); 

            this.invalidateLayout(); 
            this.checkOrientation(); 
        }, 

        invalidateLayout: function() {
        },

        showView: function(view) {

            // $("#mobileMain").animate({
            //   scrollTop: ypos, 
            //   }, 1000, function() {
            // });  
       
        },

        checkOrientation: function() {

            var ua = navigator.userAgent.toLowerCase();
            var landscape = false; 
            var isAndroid = ua.indexOf("android") > -1; // Detect Android devices

            // Android 
            if (isAndroid) {
                if (window.orientation == 0 || window.orientation == 180) { 
                    landscape = false; 
                }
                else if (window.orientation == 90 || window.orientation == -90) { 
                    landscape = true; 
                }
            }
            // iOS 
            else {
                landscape = (Math.abs(window.orientation) === 90);
            }

            if (landscape) {
               $('#mobileNotify').show();
            }   
            else {
                $('#mobileNotify').hide();
            }

        }, 

        androidDevice: function() {
            var ua = navigator.userAgent.toLowerCase();
            var landscape = false; 
            var isAndroid = ua.indexOf("android") > -1; // Detect Android devices            
            return isAndroid; 
        }                        






    });

    return MobileAppController;
});

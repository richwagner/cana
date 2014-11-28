define([
    'jquery',
    'underscore',
    'backbone', 
    'text!templates/mobileMainView.ejs'
], function( $, _, Backbone, MobileMainTemplate ) {

    var MobileMainView = Backbone.View.extend({

        el: $("#mobileContainer"), 

        template: _.template( MobileMainTemplate ),

        events: {            
        }, 

        initialize: function() {
            var self = this; 
            this.menuExpanded = false; 
            this.render(); 

            $("#mobileNav").on("touchstart", function(event) {
                event.preventDefault(); 
                event.stopPropagation();                    
                self.toggleMenu();
            }); 

            $(".mobile-menu-item").on("touchstart", function(event) {
                self.linkClickHandler(event);
            }); 


               // $('body').animate({
               //      scrollTop: $("#mobileDiscoverPage").offset().top
               //  }, 2000);


        },

        render: function() {
            this.$el.html(this.template());
            return this;           
        },

        hide: function() {       
            this.$el.hide(); 
        }, 

        show: function() {
            this.$el.show(); 
        }, 

        toggleMenu: function() {
            this.menuExpanded = !this.menuExpanded; 
            // Show 
            if (this.menuExpanded) {
                $(".mobile-menu-closed").hide(); 
                $(".mobile-menu-opened").fadeIn(); 
            }
            // Hide 
            else {
                $(".mobile-menu-opened").hide();
                $(".mobile-menu-closed").fadeIn(); 
            }

        }, 

        linkClickHandler: function(event) {
            event.preventDefault();  
            event.stopPropagation();      
            var self = this;       
            var id = event.currentTarget.id; 
            var target = id.replace("Link", "Page"); 
            if (target != "mobileClosePage") {
                $("#"+target).get(0).scrollIntoView();
            }
            setTimeout(function(){
                self.toggleMenu();  
            }, 200); 
        }

    }); 

    return MobileMainView;
});
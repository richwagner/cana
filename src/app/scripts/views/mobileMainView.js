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
            

            setTimeout(function(){
                self.toggleMenu();  
            }, 40); 


        }

    }); 

    return MobileMainView;
});
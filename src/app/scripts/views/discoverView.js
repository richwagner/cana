define([
    'jquery',
    'underscore',
    'backbone', 
    'text!templates/discoverView.ejs'
], function( $, _, Backbone, DiscoverTemplate ) {

    var DiscoverView = Backbone.View.extend({

        /*el: $("#discoverContainer"), */

        template: _.template( DiscoverTemplate ),

        events: {  
            'click .readmore-text' : 'readMoreClickHandler', 
            'click .close-button' : 'closeButtonClickHandler', 
            'click .full-close-button' : 'fullCloseButtonClickHandler', 
            'click #readMoreSOF' : 'statementOfFaithClickHandler', 
            'click #readMoreWhyCana' : 'whyCanaClickHandler', 
            'click #readMoreAboutPastors' : 'aboutPastorsClickHandler'                                    
        }, 


        initialize: function() {

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



        readMoreClickHandler: function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            APP.appController.expandReadMore(id); 
        }, 

        statementOfFaithClickHandler: function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            APP.appController.expandFullPageOverlay(id); 
        }, 

        whyCanaClickHandler: function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            APP.appController.expandFullPageOverlay(id); 
        }, 

        aboutPastorsClickHandler:  function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            APP.appController.expandFullPageOverlay(id); 
        }, 

        closeButtonClickHandler: function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            id = id.replace("close", "readMore"); 
            APP.appController.collapseReadMore(id); 
        },

        fullCloseButtonClickHandler: function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            id = id.replace("close", "readMore"); 
            APP.appController.collapseFullPageOverlay(id); 
        }                      

    }); 

    return DiscoverView;
});
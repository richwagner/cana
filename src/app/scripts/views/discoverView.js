define([
    'jquery',
    'underscore',
    'backbone', 
    'text!templates/discoverView.ejs'
], function( $, _, Backbone, DiscoverTemplate ) {

    var DiscoverView = Backbone.View.extend({

        el: $("#discoverContainer"), 

        template: _.template( DiscoverTemplate ),

        events: {  
            'click .readmore-text' : 'readMoreClickHandler', 
            'click .close-button' : 'closeButtonClickHandler'             
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

        closeButtonClickHandler: function(event) {
            event.preventDefault(); 
            var id = event.currentTarget.id;
            id = id.replace("close", "readMore"); 
            APP.appController.collapseReadMore(id); 
        }           

    }); 

    return DiscoverView;
});
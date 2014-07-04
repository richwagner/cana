define([
    'jquery',
    'underscore',
    'backbone', 
    'views/discoverView',
    'text!templates/mainView.ejs'
], function( $, _, Backbone, DiscoverView, MainTemplate ) {

    var MainView = Backbone.View.extend({

        el: $("#container"), 

        template: _.template( MainTemplate ),

        events: {  
            'click .readmore-text' : 'readMoreClickHandler', 
            'click .close-button' : 'closeButtonClickHandler', 
            'click #footerLocation' : 'locationClickHandler', 
            'click #footerTimes' : 'timesClickHandler',   
            'click #footerPastors' : 'pastorsClickHandler',      
            'click #footerContactUs' : 'contactUsClickHandler',                                
            'click #footerCollapseButton' : 'collapseFooterClickHandler'                                                            
        }, 


        initialize: function() {
            this.discoverView = null; 
            this.footerExpanded = false; 
            this.render(); 
        },

        createSubviews: function() {
            this.discoverView = new DiscoverView(); 
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
        }, 

        locationClickHandler: function(event) {
            event.preventDefault(); 
            if (this.footerExpanded) {
                $("#timesContent").hide(); 
                $("#pastorsContent").hide(); 
                $("#contactUsContent").hide();                  
            }            
            $("#locationContent").show(); 
            this.expandFooter();            
        },           

        timesClickHandler: function(event) {
            event.preventDefault(); 
            if (this.footerExpanded) {
                $("#locationContent").hide(); 
                $("#pastorsContent").hide(); 
                $("#contactUsContent").hide();                  
            }            
            $("#timesContent").show(); 
            this.expandFooter();            
        },   

        pastorsClickHandler: function(event) {
            event.preventDefault(); 
            if (this.footerExpanded) {
                $("#locationContent").hide(); 
                $("#timesContent").hide();
                $("#contactUsContent").hide();                                 
            }            
            $("#pastorsContent").show(); 
            this.expandFooter();            
        },  

        contactUsClickHandler: function(event) {
            event.preventDefault(); 
            if (this.footerExpanded) {
                $("#locationContent").hide(); 
                $("#timesContent").hide();   
                $("#pastorsContent").hide();                               
            }            
            $("#contactUsContent").show(); 
            this.expandFooter();            
        },          

        collapseFooterClickHandler: function(event) {
             event.preventDefault(); 
             this.collapseFooter();            
        },           

        expandFooter: function() {
            if (this.footerExpanded) {
                return; 
            }
            var self = this;             
            $("#footerCollapseButton").fadeIn();                                                 
            $(".footer").animate({
                bottom: "0px"
                }, 700, function(){ 
                 self.footerExpanded = true;                   
            });  

        }, 

        collapseFooter: function() {
            var self = this; 
            $("#footerCollapseButton").fadeOut();   
            $(".footer").animate({
                bottom: "-366px"
                }, 700, function(){   
                 self.footerExpanded = false;
                 $(".content-shelf").hide();                                                                                               
            });  

        }, 


    }); 

    return MainView;
});
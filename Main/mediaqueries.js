$( document ).ready(function() {

    $( ".hamburger-menu" ).hide();
    $( ".hamburger-menu" ).click(function() {
    $( "#wrapper header .topnav" ).slideToggle( "slow", function() {
    $( ".hamburger-menu" ).hide();
    $( ".cross-icon" ).show();
    });
    });
    
    $( ".cross-icon" ).click(function() {
    $( "#wrapper header .topnav" ).slideToggle( "slow", function() {
    $( ".cross-icon" ).hide();
    $( ".hamburger-menu" ).show();
    });
    });
    
    });
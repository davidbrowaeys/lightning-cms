$(function() {
    // Use the environment based on the site it is on
    Harmony.useEnv("https://hosted.mastersoftgroup.com/");
    
    // Init the client with the demo api user name and credential
    // We have created the following user and credential which you can use on iselect--hncdev--c.cs6.visual.force.com
    Harmony.init("iSele61000", "J7oXJDbKRb8EraHKxkAFlgIIa0s9gU7E", Harmony.AUSTRALIA);
    
    // Use the JSONP protocol
    Harmony.useProtocol(Harmony.JSONP);
    
    var opt = {
      // min 3 chars to trigger the lookup
      minLength:3, 
      // skip transaction call when address selected. You need to make your own call depending on your business flow.
      skipTransaction: true,
      // define your own call back function when address selected.  
      onSelect: function(event, ui) {
        // console.log('address selected: ' + ui.item.fullAddress);
      }
    };
   
    // Configure the address lookup. 
    // "#rapidAddress" is referring to the input address element id
    Harmony.UI.addressLookup($("#rapidAddress"), "GNAF", opt);
    Harmony.UI.advancedLocalityLookup($("#locality"), "GNAF", opt);

    /*Harmony.UI.addField(Harmony.POSTCODE, $("#HRA_POSTCODE"));
    Harmony.UI.addField(Harmony.STATE, $("#HRA_STATE"));
    Harmony.UI.addField(Harmony.STREET, $("#HRA_STREET"));
    Harmony.UI.addField(Harmony.STREET_TYPE, $("#HRA_STREET_TYPE"));
    Harmony.UI.addField(Harmony.STREET_NUMBER, $("#HRA_STREET_NUMBER"));*/

  });
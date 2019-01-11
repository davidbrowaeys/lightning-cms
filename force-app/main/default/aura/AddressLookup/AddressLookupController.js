({
    afterScriptsLoaded : function(cmp, evt, helper) {
        var $j = jQuery.noConflict();
        // Use the environment based on the site it is on
        Harmony.useEnv("https://hosted.mastersoftgroup.com");
        
        // Init the client with the demo api user name and credential
        // We have created the following user and credential which you can use on iselect--hncdev--c.cs6.visual.force.com
        Harmony.init("iselecttestuser", "kRgfgAQn327kf0TxKCSjv8RT88b6zNbu", Harmony.AUSTRALIA);
        
        // Use the JSONP protocol
        Harmony.useProtocol(Harmony.JSONP);
        
        var opt = {
          // min 3 chars to trigger the lookup
          minLength:3, 
          // skip transaction call when address selected. You need to make your own call depending on your business flow.
          skipTransaction: true,
          // define your own call back function when address selected.  
          onSelect: function(event, ui) {
              var answers = cmp.get("v.answers");
              answers[elementId] = ui.item.fulladdress;
              answers[elementId+"_suburb"] = ui.item.locality;
              answers[elementId+"_postcode"] = jQuery("#"+elementId+"_POSTCODE").val();
              answers[elementId+"_state"] = jQuery("#"+elementId+"_STATE").val();
              answers[elementId+"_street"] = jQuery("#"+elementId+"_STREET").val();
              answers[elementId+"_street_type"] = jQuery("#"+elementId+"_STREETTYPE").val();
              answers[elementId+"_streetnumber"] = jQuery("#"+elementId+"_STREETNUMBER").val();
              answers[elementId+"_unit"] = jQuery("#"+elementId+"_UNIT").val();
              answers[elementId+"_country"] = jQuery("#"+elementId+"_COUNTRY").val();
              answers[elementId+"_gnafpid"] = ui.item.attributes.GNAFPID;
              cmp.set("v.answers",answers);
          }
        };
       
        // Configure the address lookup. 
        // "#rapidAddress" is referring to the input address element id
        var element = cmp.get("v.element");
        var elementId = cmp.get("v.elementId");
        Harmony.UI.addressLookup(cmp.find("fulladdress").getElement(), "GNAF", opt);
        Harmony.UI.advancedLocalityLookup(cmp.find("locality").getElement(), "GNAF", opt);
        //define sync input fields
        Harmony.UI.addField(Harmony.POSTCODE, cmp.find("postcode").getElement());
        Harmony.UI.addField(Harmony.STATE, cmp.find("state").getElement());
        Harmony.UI.addField(Harmony.STREET_NAME, cmp.find("street").getElement());
        Harmony.UI.addField(Harmony.STREET_TYPE, cmp.find("streettype").getElement());
        Harmony.UI.addField(Harmony.STREET_NUMBER, cmp.find("streetnumber").getElement());
        Harmony.UI.addField(Harmony.SUBDWELLING , cmp.find("unit").getElement());
        Harmony.UI.addField(Harmony.LOCALITY, cmp.find("locality").getElement());
        //init address from existing need to input field
        if (element.value){
          var address = JSON.parse(element.value);
          var fulladdress = "";
          
          if(address.unit){
            cmp.find("unit").getElement().value = address.unit;
            fulladdress += address.unit+" ";
          }
          if(address.streetnumber){
            cmp.find("streetnumber").getElement().value = address.streetnumber;
            fulladdress += address.streetnumber+" ";
          }
          if(address.street){
            cmp.find("street").getElement().value = address.street;
            fulladdress += address.street+" ";
          }
          if(address.street_type){
            cmp.find("streettype").getElement().value = address.street_type;
            fulladdress += address.street_type+", ";
          }
          if(address.suburb){
            cmp.find("locality").getElement().value = address.suburb;
            fulladdress += address.suburb+" ";
          }
          if(address.state){
            cmp.find("state").getElement().value = address.state;
            fulladdress += address.state+" ";
          }
          if(address.postcode){
            cmp.find("postcode").getElement().value = address.postcode;
            fulladdress += address.postcode+" ";
          }
          if(address.country)cmp.find("country").getElement().value = address.country;
          if(address.gnafpid)cmp.find("gnafpid").getElement().value = address.gnafpid;

          cmp.find("fulladdress").getElement().value = fulladdress;
        }
    },
    addressNotFound : function(cmp,evt, helper){
      var addressCmp = cmp.find("overrideAddress");
      $A.util.toggleClass(addressCmp,"slds-hide");
    }, 
    captureAddress : function(cmp,evt, helper){
        var elementId = cmp.get("v.elementId");
        var answers = cmp.get("v.answers");
        answers[elementId] = cmp.find("fulladdress").getElement().value;
        answers[elementId+"_suburb"] = cmp.find("locality").getElement().value;
        answers[elementId+"_postcode"] = cmp.find("postcode").getElement().value;
        answers[elementId+"_state"] = cmp.find("state").getElement().value;
        answers[elementId+"_street"] = cmp.find("street").getElement().value;
        answers[elementId+"_streetnumber"] = cmp.find("streetnumber").getElement().value;
        answers[elementId+"_street_type"] = cmp.find("streettype").getElement().value;
        answers[elementId+"_unit"] = cmp.find("unit").getElement().value;
        answers[elementId+"_country"] = cmp.find("country").getElement().value;
        answers[elementId+"_gnafpid"] = cmp.find("gnafpid").getElement().value;
        cmp.set("v.answers",answers);
    },
    isRequired : function(cmp, evt, helper){
        helper.isRequired(cmp,evt);
    },
    validate : function(cmp, evt, helper){
        var element = cmp.get("v.element");
        var isValid = true;

        if (element.required){
            isValid  =  cmp.find("locality").getElement().value != "" &&
                        cmp.find("postcode").getElement().value != "" &&
                        cmp.find("state").getElement().value != "" &&
                        cmp.find("street").getElement().value != "" &&
                        cmp.find("streettype").getElement().value != "" &&
                        cmp.find("streetnumber").getElement().value != "" &&
                        cmp.find("country").getElement().value != "";
        }
        helper.validate(cmp,evt, isValid);
        return isValid;
    }
})
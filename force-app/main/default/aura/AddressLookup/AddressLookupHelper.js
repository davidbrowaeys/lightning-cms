({
    isRequired : function(cmp,evt) {
        var element = cmp.get("v.element");
        var selected = evt.target.value;
        
        var questionContainer = cmp.find("qst_container");
        var requiredMessage = cmp.find("req_container");
        if (element.required && !selected){
            $A.util.addClass(questionContainer,"is-required slds-has-error lightningInput");
            $A.util.removeClass(requiredMessage, "slds-hide");
        }else{
            $A.util.removeClass(questionContainer,"is-required slds-has-error lightningInput");
            $A.util.addClass(requiredMessage, "slds-hide");
        }
	},
    validate : function(cmp,evt,isvalid){
    	var questionContainer = cmp.find("qst_container");
        var requiredMessage = cmp.find("req_container");
    	if (!isvalid){
            $A.util.addClass(questionContainer,"is-required slds-has-error lightningInput");
            $A.util.removeClass(requiredMessage, "slds-hide");
        }else{
            $A.util.removeClass(questionContainer,"is-required slds-has-error lightningInput");
            $A.util.addClass(requiredMessage, "slds-hide");
        }	
	}
})
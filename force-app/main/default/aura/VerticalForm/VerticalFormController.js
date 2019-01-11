({
	doInit : function(cmp, event, helper) {
		var processName = cmp.get("v.processName");
		if (processName == 'initial'){
			helper.loadInitialSchema(cmp);
		}
	},
    viewRec : function(cmp, event, helper) {
        helper.viewRecommendation(cmp);
    },
    submit : function(cmp, event, helper) {
    	//showWeSelect();
    	helper.submit(cmp);
    },
    closeModal : function(cmp,evt,helper){
    	$A.util.addClass(cmp.find("finalQuoteModal"),"slds-hide");
	},
	displayPaymentFrequencyMode:function(cmp,evt,helper){
		helper.displayPaymentFrequencyMode(cmp,evt,true);
	},
	closeErrorConfirmation : function(cmp,evt,helper){
		$A.util.addClass(cmp.find("errorSectionDiv"),"slds-hide");
	},
	hidePaymentFrequencyMode:function(cmp,evt,helper){
		helper.displayPaymentFrequencyMode(cmp,evt,false);
	}
})
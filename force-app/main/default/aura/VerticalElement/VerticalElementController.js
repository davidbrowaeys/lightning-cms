({
	doInit : function (cmp, evt, helper){
        helper.doInit(cmp, evt);
    },
    fireChange : function(cmp, evt, helper){
    	var process = cmp.get("v.process");
    	helper.fireChange(cmp,evt,process);
    },
    handleElemVisibility : function(cmp, evt, helper){
        helper.handleElemVisibility(cmp,evt);
    },
    displayHelper : function(cmp, evt, helper){
        helper.displayHelper(cmp, evt);
    },
    validate: function(cmp, evt, helper){
        helper.validate(cmp, evt);
	},
    display : function(cmp, evt, helper) {
        helper.toggleHelper(cmp, evt);
    },
    displayOut : function(cmp, evt, helper) {
        helper.toggleHelper(cmp, evt);
    }
})
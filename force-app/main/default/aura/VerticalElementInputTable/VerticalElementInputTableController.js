({
	doInit : function(cmp, evt, helper){
        helper.doInit(cmp,evt);
    },
    addRow : function(cmp, evt, helper){
    	helper.addRow(cmp,evt);
    },
    removeRow : function(cmp,evt, helper){
    	helper.removeRow(cmp,evt);
    },
    validate : function(cmp,evt, helper){
    	return true;
    }
})
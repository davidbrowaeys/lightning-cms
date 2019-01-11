({
    loadInitialSchema : function(cmp) {
        var spinner = cmp.find("mySpinner");
        if (false){
            $A.util.addClass(spinner, "slds-hide");
        }else{
            var action = cmp.get("c.loadVertical");
            var errorContainer = cmp.find("errorSectionDiv");
            action.setParams({ 
                versionId : cmp.get("v.versionId"),
                recordId : cmp.get("v.recordId"),
                opportunityId : cmp.get("v.opptyId"),
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if (state === "SUCCESS" && response.getReturnValue().status === 'SUCCESS') {
                    var schema = response.getReturnValue().schema;
                    var answers = {};
                    for (var i in schema.elements){
                        var section = schema.elements[i];
                        if (section.process.toLowerCase().indexOf('initial') >= 0){
                            this.recurring(answers,section);
                        }
                    }
                    cmp.set("v.answers", answers);
                    cmp.set("v.template", schema);
                    cmp.set("v.init_template", schema);
                    //if edit NA, need to parse json into page 
                } else if (state === "ERROR" || response.getReturnValue().status == 'ERROR') {
                     if (response.getReturnValue().message){ //handle custom errors
                        cmp.set("v.pageError",response.getReturnValue().message);
                     }else{ //handle unexcpeted errors. 
                         var errors = response.getError();
                         if (errors) {
                            if (errors[0] && errors[0].message) {
                                cmp.set("v.pageError",errors[0].message);
                            } else if (errors[0] && errors[0].pageErrors) {
                                cmp.set("v.pageError",errors[0].pageErrors[0].message);
                            }
                        }
                    }
                    $A.util.removeClass(cmp.find("errorSectionDiv"), "slds-hide");
                }
                $A.util.addClass(spinner, "slds-hide");
            });
            $A.enqueueAction(action);
        }
    },
    recurring : function(answers,parent){
        if (parent.value == undefined) parent.value = null;
        answers[parent.elemid] = parent.value;

        if (parent.elements){
            for (var j in parent.elements){
                this.recurring(answers,parent.elements[j]);
            }
        }
    },
    viewRecommendation : function(cmp){
        cmp.set("v.isValidForm", true);
        var errorContainer = cmp.find("errorSectionDiv");
		$A.util.addClass(errorContainer, "slds-hide");
        window.scrollTo(0,0);
        
        var spinner = cmp.find("mySpinner");
		$A.util.removeClass(spinner, "slds-hide");
        //fire event on all question elements and validate each question : required + validation rules
        var event  = $A.get("e.c:QuestionValidationEvt");
        event.fire();
        //is the form valid?, if  so display global error message on top of the page    
        var isValidForm = cmp.get("v.isValidForm");
        if (isValidForm == false){
            cmp.set("v.pageError","Need analysis is invalid! You must review your form and submit again.");
            errorContainer = cmp.find("errorSectionDiv");
			$A.util.removeClass(errorContainer, "slds-hide");
            spinner = cmp.find("mySpinner");
            $A.util.addClass(spinner, "slds-hide");
        }else{
            var opptyId = cmp.get("v.opptyId");
            if (opptyId){
                var schema = cmp.get("v.template");
                var answers = cmp.get("v.answers");

                var params = {
                    opptyId : cmp.get("v.opptyId"), 
                    versionId : schema.sfid, 
                    vertical : schema.elemid, 
                    needId : cmp.get("v.recordId")};

                // call controller to submit need and get recommendations from mulesoft
                var action = cmp.get("c.viewRecommendation");
                action.setParams({params: JSON.stringify(params), answers:JSON.stringify(answers)});
                action.setCallback(this, function(response){
                    var state = response.getState();
                    if (state === "SUCCESS" && response.getReturnValue().status === 'SUCCESS') {
                        var records = response.getReturnValue().schema;
                        var details = records.products;
                        for (var m in details){
                            var o = {}
                            for (var n in details[m].elements){
                                if (!o[details[m].elements[n].name]){
                                    o[details[m].elements[n].name] = details[m].elements[n].value;
                                }
                            }
                            details[m]["details"] = o;
                        }
                        cmp.set("v.productDetails",details);
                        delete records.products;

                        cmp.set("v.recordId", records.needId);
                        cmp.set("v.response",records);
                        //only available in Sales Console
                        setTabTitle("Recommendations");
                        errorContainer = cmp.find("errorSectionDiv");
                        $A.util.addClass(errorContainer, "slds-hide");

                        cmp.set("v.currentProcessStep",2);
                     } else if (state === "ERROR" || response.getReturnValue().status == 'ERROR') {
                         if (response.getReturnValue().message){ //handle custom errors
                            cmp.set("v.pageError",response.getReturnValue().message);
                         }else{ //handle unexcpeted errors. 
                             var errors = response.getError();
                             if (errors) {
                                if (errors[0] && errors[0].message) {
                                    cmp.set("v.pageError",errors[0].message);
                                } else if (errors[0] && errors[0].pageErrors) {
                                    cmp.set("v.pageError",errors[0].pageErrors[0].message);
                                }
                            }
                        }
                        $A.util.removeClass(errorContainer, "slds-hide");
                    }
                    $A.util.addClass(spinner, "slds-hide");
                });
                $A.enqueueAction(action);
            }else{
                cmp.set("v.pageError","Functionality not available in 'Preview' mode.");
                $A.util.removeClass(errorContainer, "slds-hide");
                $A.util.addClass(spinner, "slds-hide");
            }
        }
    },
    submit : function(cmp){
		cmp.set("v.isValidForm", true);
        var errorContainer = cmp.find("errorSectionDiv");
		$A.util.addClass(errorContainer, "slds-hide");
        window.scrollTo(0,0);
        
        var spinner = cmp.find("mySpinner");
		$A.util.removeClass(spinner, "slds-hide");
        
        var event  = $A.get("e.c:QuestionValidationEvt");//fire event on all question elements and validate each question : required + validation rules
        event.fire();

        var isValidForm = cmp.get("v.isValidForm");
        if (isValidForm == false){//is the form valid?, if  so display global error message on top of the page    
            cmp.set("v.pageError","Need analysis is invalid! Please review your form and submit again.");
            errorContainer = cmp.find("errorSectionDiv");
			$A.util.removeClass(errorContainer, "slds-hide");
            spinner = cmp.find("mySpinner");
            $A.util.addClass(spinner, "slds-hide");
        }else{
            var opptyId = cmp.get("v.opptyId");
            if (opptyId){
                //success send answer to controller and create need analysis
            }else{
                cmp.set("v.pageError","Functionality not available in 'Preview' mode.");
                $A.util.removeClass(errorContainer, "slds-hide");
                $A.util.addClass(spinner, "slds-hide");
            }
        }
    }
})
({
	doInit : function(cmp, evt){
        var element = cmp.get("v.element");
		console.log(element);
        var answers = cmp.get("v.answers");
        var visible = element.visible === "true" && (!cmp.get("v.element").channel || cmp.get("v.element").channel.indexOf("BDC") >= 0);
        
		var parentValues = {};		
        var parentelemids = element.parentelemids;
        if (parentelemids){
            var rule = element.visible;
            for (var i in parentelemids){
                parentValues[parentelemids[i]] = answers[parentelemids[i]];
                rule = rule.split("{{"+parentelemids[i]+"}}").join(answers[parentelemids[i]]);
            }
            if (rule !== 'true'){
                var calc = new Function("return "+rule);
                visible = calc();
            }
        }
        //default inputSelect in init method to resolve performance issue.
        if (element.elemtype === 'picklist' || element.elemtype === 'multipicklist' ){
            var opts = [{class: "optionClass", label: "--Select--", value: null}];
            for (var i in element.options){
                var o = element.options[i];
                opts.push({ class: "optionClass", label: o.value, value: o.key, selected:  (element.value == o.key || o.isdefault)});
                if (!element.value && o.isdefault){
                    answers[element.elemid] = o.key;
                    cmp.set("v.answers",answers);
                }
            }
            cmp.set("v.options", opts);
        }else if (element.elemtype === 'address-lookup' && element.value){
            this.setAddress(element,answers);
            cmp.set("v.answers",answers);
        }

        if (visible) cmp.set("v.visible", visible);

	},
	fireChange : function(cmp, evt, process) {
        var element = cmp.get("v.element");
        var selected;

        if (element.elemtype === "checkbox" || element.elemtype === "toggle"){
            selected = evt.target.checked;
        }else if (element.elemtype === "radio" || element.elemtype === "rating"){
            selected = evt.target.checked ? evt.target.value : null;
        }else if (element.value){
            selected = element.value; 
        }
        var answers = cmp.get("v.answers");
        answers[element.elemid] = selected;
        cmp.set("v.answers",answers);
        //check if question is visible, required and not populated
        var requiredMessage = cmp.find("req_container");
        $A.util.addClass(cmp.find("validation"),"slds-hide");

        this.validate(cmp,evt);

        //fire event here
        if (element.dependencies){
            var event  = $A.get("e.c:QuestionChangeEvent");
            event.setParams({"elemid": element.elemid,  "value": selected, "dependencies" : element.dependencies});
            event.fire();
        }
        if (process === "quickfilter"){
            var compEvent = cmp.getEvent("applyFilterEvent");
            compEvent.setParams({
                "elemid": element.elemid, 
                "value": selected,
                "answers" : answers
            });
            compEvent.fire();
        }
	},
	handleElemVisibility : function(cmp, evt){
        var parentDependencies = evt.getParam("dependencies");
        for (var i in parentDependencies){
            if (parentDependencies[i] === cmp.get('v.element').elemid){    //only need to target child that it depends on
                var element = cmp.get('v.element');
                var parentValues = cmp.get("v.parentValues");       //get map of current parent value
                var parentid = evt.getParam("elemid");
                var answers = cmp.get("v.answers");
                
                var rule = element.visible;            //get visibility rule
                var parentelemids = element.parentelemids; //go through each parent
                for (var j in parentelemids){
                    if (rule.indexOf("{{") >= 0){
                        rule = rule.split("{{"+parentelemids[j]+"}}").join(answers[parentelemids[j]]);  
                    } 
                }
                var visible = _eval(rule) && (!cmp.get("v.element").channel || cmp.get("v.element").channel.indexOf("BDC") >= 0);
                if (!visible){
                    answers[cmp.get('v.element').elemid] = null;
                }else{
                    answers[cmp.get('v.element').elemid] = cmp.get('v.element').value;
                }
                cmp.set("v.answers",answers);
                cmp.set("v.visible",visible);

                //fire event here
                if (element.dependencies){
                    var event  = $A.get("e.c:QuestionChangeEvent");
                    event.setParams({"elemid": element.elemid,  "value": answers[cmp.get('v.element').elemid], "dependencies" : element.dependencies});
                    event.fire();
                }
            }
        }
    },
    setAddress : function(element, answers){
        var address = JSON.parse(element.value);
        if (address){
            if (address.unit)answers[element.elemid+"_unit"] = address.unit;
            if (address.streetnumber)answers[element.elemid+"_streetnumber"] = address.streetnumber;
            if (address.street)answers[element.elemid+"_street"] = address.street;
            if (address.street_type)answers[element.elemid+"_street_type"] = address.street_type;
            if (address.suburb)answers[element.elemid+"_suburb"] = address.suburb;
            if (address.state)answers[element.elemid+"_state"] = address.state;
            if (address.postcode)answers[element.elemid+"_postcode"] = address.postcode;
            if (address.country)answers[element.elemid+"_country"] = address.country;
            if (address.gnafpid)answers[element.elemid+"_gnafpid"] = address.gnafpid;
        }else if (element.attr.retrieveFrom !== null){
            var copyFrom = element.attr.retrieveFrom.split('{{').join('').split('}}').join('');
            if (answers[copyFrom+"_unit"])answers[element.elemid+"_unit"] = answers[copyFrom+"_unit"];
            if (answers[copyFrom+"_streetnumber"])answers[element.elemid+"_streetnumber"] = answers[copyFrom+"_streetnumber"];
            if (answers[copyFrom+"_street"])answers[element.elemid+"_street"] = answers[copyFrom+"_street"];
            if (answers[copyFrom+"_street_type"])answers[element.elemid+"_street_type"] = answers[copyFrom+"_street_type"];
            if (answers[copyFrom+"_suburb"])answers[element.elemid+"_suburb"] = answers[copyFrom+"_suburb"];
            if (answers[copyFrom+"_state"])answers[element.elemid+"_state"] = answers[copyFrom+"_state"];
            if (answers[copyFrom+"_postcode"])answers[element.elemid+"_postcode"] = answers[copyFrom+"_postcode"];
            if (answers[copyFrom+"_country"])answers[element.elemid+"_country"] = answers[copyFrom+"_country"];
            if (answers[copyFrom+"_gnafpid"])answers[element.elemid+"_gnafpid"] = answers[copyFrom+"_gnafpid"];
        }
        delete answers[element.elemid];
    },
    isRequired : function(element, selected, visible){
        return (!selected || selected === "--Select--" || selected === undefined) && element.required && element.elemtype !== "checkbox" && visible; 
    },
    isValid : function(cmp, element){
        var validationMessage = "";
        var valid = true;
        var answers = cmp.get("v.answers");
        if (element.validations){
            for (var i in element.validations){
                var validation = element.validations[i];
                var rule = validation.criteria;
                for (var k in answers) {
                    var val = answers[k]; 
                    if (val == undefined) val = null;

                    rule = rule.split("{{"+k+"}}").join(val);
                }
                if (_eval(rule)){
                    validationMessage += '<div class="slds-container_fluid">'+validation.error_msg+'</div>';
                    valid = false;
                }
            }
        }
        cmp.set("v.validations",validationMessage);
        return valid;
    },
    validate : function(cmp,evt){
        var visible = cmp.get("v.visible");
        var element = cmp.get("v.element");
        if (visible && element.elemtype !== "form-page-section"){
            if (element.elemtype === 'address-lookup'){
                var childCmp = cmp.find("address-lookup");
                if (!childCmp.validate()){
                    cmp.set("v.isValidForm",false);
                }
            }else if (element.elemtype === 'input-table'){
                var childCmp = cmp.find("input-table");
                if (!childCmp.validate()){
                    cmp.set("v.isValidForm",false);
                }
            }else{
                var selected;
                var answers = cmp.get("v.answers");
                if (answers[element.elemid]){
                    selected = answers[element.elemid];
                }
                var requiredMessage = cmp.find("req_container");
                if (this.isRequired(element, selected, visible)){ //check if question required, visible and blank
                    console.log('Error(required) with question '+element.elemid+' - value = '+selected);
                    $A.util.removeClass(requiredMessage, "slds-hide");
                    var questionClass = cmp.get("v.size") + " is-required slds-has-error lightningInput";
                    cmp.set("v.size",questionClass);
                    cmp.set("v.isValidForm",false);
                }else{ //we are safe so far
                    $A.util.addClass(requiredMessage, "slds-hide");
                    var questionClass = cmp.get("v.size");
                    cmp.set("v.size",questionClass.split(" is-required slds-has-error lightningInput").join(""));

                    var validation = cmp.find("validation");
                    if (visible && !this.isValid(cmp, element)){//check if answer is valid. If not valid, display error and set global variable to false
                        console.log('Error(invalid) with question '+element.elemid+' - value = '+selected);
                        $A.util.removeClass(validation, "slds-hide");
                        var questionClass = cmp.get("v.size") + " is-required slds-has-error lightningInput";
                        cmp.set("v.size",questionClass);
                        cmp.set("v.isValidForm",false);
                    }else{	//we are safe from here
                        $A.util.addClass(validation, "slds-hide");
                        var questionClass = cmp.get("v.size");
                        cmp.set("v.size",questionClass.split(" is-required slds-has-error lightningInput").join(""));
                    }
                }
            }
        }
    },
    toggleHelper : function(cmp,evt) {
        var toggleText = cmp.find("tooltip");
        $A.util.toggleClass(toggleText, "slds-hide");
    }
})
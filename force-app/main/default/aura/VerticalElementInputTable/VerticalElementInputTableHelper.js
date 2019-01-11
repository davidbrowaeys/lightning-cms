({
	doInit : function(cmp,evt) {
		var tableElements = [];
		var selectedValues = [];
		
		var row = this.defineInputRow(cmp);
		tableElements.push(row);

		cmp.set('v.tableElements',tableElements);
		cmp.set('v.selectedValues',selectedValues);
	},
	addRow : function(cmp,evt){
    	var questionContainer = cmp.find("qst_container");
    	if (this.validateRow(cmp,evt)){
			var tableElements = cmp.get('v.tableElements');
			var selectedValues = cmp.get('v.selectedValues');
			
			selectedValues.push(tableElements.pop());
			tableElements = [];
			var row = this.defineInputRow(cmp);
			tableElements.push(row);

			this.parseFinalResponse(cmp);

			JSON.stringify(selectedValues)

			cmp.set('v.tableElements',tableElements);
			cmp.set('v.selectedValues',selectedValues);
            $A.util.removeClass(questionContainer,"is-required slds-has-error lightningInput");
        }else{
    		$A.util.addClass(questionContainer,"is-required slds-has-error lightningInput");
        }	
	},
	defineInputRow : function(cmp){
		var parentElement = cmp.get("v.element");
		var tableConfig = parentElement.attr.table_config.split(';');
		var cellSizes = parentElement.attr.table_col_size.split(';');
		var cellLabels = parentElement.attr.table_label.split(';');
		var row = [];
		for (var i in tableConfig){
			//type=picklist;description=text;value=currency;portable=checkbox
			var elem = tableConfig[i].split('=');
			row.push({
				"elemid":elem[0],
				"elemtype":elem[1].indexOf('button') >= 0 ? 'button':elem[1],
				"size":cellSizes[i],
				"label":cellLabels[i],
				"value":null,
				"addBtn":elem[1].indexOf('add') >= 0,
				"rmBtn":elem[1].indexOf('remove') >= 0 
			});
		}
		return row;
	},
	removeRow : function(cmp,evt){
		var elem = evt.getSource().get("v.name");
		var selectedValues = cmp.get('v.selectedValues');
		selectedValues.splice(elem,1);
		cmp.set('v.selectedValues',selectedValues);
	},
    validateRow : function(cmp, evt){
        var isValid = true;
        var validationMessage = "";
        var element = cmp.get("v.element");
        var tableElements = cmp.get('v.tableElements');
        var row = tableElements[0];


        for (var i in element.validations){
            var validation = element.validations[i];
            var rule = validation.criteria;
            for (var j in row){
            	var cell = row[j];
	            if (rule.indexOf('{{'+cell.elemid+'}}') >= 0){
	            	rule = rule.split('{{'+cell.elemid+'}}').join(cell.value);
	            }
            }
        	if (_eval(rule)){
                validationMessage = '<div class="slds-container_fluid" style="margin-left:20px;">'+validation.error_msg+'</div>';
                isValid = false;
            }
        }

        cmp.set("v.validations",validationMessage);
        return isValid;
    },
    parseFinalResponse : function(cmp){
    	var element = cmp.get("v.element");
    	var answers = cmp.get("v.answers");
    	var selecteditems = cmp.get("v.selectedValues");
    	var result = '[';
    	for (var i in selecteditems){
    		var item = selecteditems[i];
    		result += '{';
    		for (var j in item){
    			result += '"'+item[j].elemid+'":"'+ item[j].value +'"';
    			if (j < item.length - 1){
    				result += ",";
    			}
    		}
    		result += '}';
			if (i < selecteditems.length - 1){
				result += ',';
			}
    	}
    	result += ']';
    	answers[element.elemid] = result;
    	cmp.set("v.answers",answers);
    }
})
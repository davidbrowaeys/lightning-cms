({
	doInit : function(cmp, evt) {
		var schema = cmp.get("v.template");
		var answers = cmp.get("v.answers");
        var summaryList = [];
        if (schema && schema.elements){
			for (var i in schema.elements){
				this.recurring(cmp,schema.elements[i],summaryList,answers);
			}
			cmp.set("v.summaryList",summaryList);
		}
	},
	recurring : function(cmp, parent, summaryList,answers){
		if (parent.issummary){
	        var visible = parent.visible == "true" && (!parent.channel || parent.channel.indexOf("BDC") >= 0);
	        
			var parentValues = {};		
	        var parentelemids = parent.parentelemids;
	        if (parentelemids){
	            var rule = parent.visible;
	            for (var i in parentelemids){
	            	if (answers && answers.hasOwnProperty(parentelemids[i])){
		                parentValues[parentelemids[i]] = answers[parentelemids[i]];
		                rule = rule.split("{{"+parentelemids[i]+"}}").join(answers[parentelemids[i]]);
		            }
	            }
	            if (rule != 'true') visible = _eval(""+rule);
	        }

	        if (visible){
	        	console.log(parent.value);
	        	if (parent.elemtype == 'address-lookup' && parent.value){
	        		parent.value = this.setAddressValue(parent);
	        	}
            	summaryList.push(parent);
	        }
       }
		if (parent.elements){
			for (var j in parent.elements){
				this.recurring(cmp,parent.elements[j],summaryList,answers);
			}
		}
	},
	setAddressValue : function(element) {
		var fulladdress = "";
		var address;
		try{
			address = JSON.parse(element.value);
			if(address.unit){
				fulladdress += address.unit+" ";
			}
			if(address.streetnumber){
				fulladdress += address.streetnumber+" ";
			}
			if(address.street){
				fulladdress += address.street+" ";
			}
			if(address.street_type){
				fulladdress += address.street_type+",<br/>";
			}
			if(address.suburb){
				fulladdress += address.suburb+" ";
			}
			if(address.state){
				fulladdress += address.state+" ";
			}
			if(address.postcode){
				fulladdress += address.postcode+" ";
			}
		}catch(err){
			console.log(err);
			fulladdress = element.value;
		}
		return fulladdress;
	}
})
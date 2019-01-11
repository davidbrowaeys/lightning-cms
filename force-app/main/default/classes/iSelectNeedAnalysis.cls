public without sharing class iSelectNeedAnalysis {
    public class VerticalException extends Exception{}
    private static Map<String,Object> result;
    private static Map<String,Object> req;
    /**
    * @description load all the vertical configuration records necessary to build the page up. 
    * @param versionid version of the vertical to build up. This is use by the preview button on the vertical version detail layout
    * @param recordid id of an existing need analysis record
    * @param opportunityId id of related opportunity in the event of a new vertical
    */
    @AuraEnabled
    public static Map<String,Object> loadVertical(String versionId, String recordId, String opportunityId){
        result = new Map<String,Object>();
        try{
            if (String.isBlank(versionId) == false){
                Vertical_Version__c[] version = [SELECT Vertical__r.Name FROM Vertical_Version__c WHERE Id =: versionId];
                if (version == null){
                    throw new VerticalException('Specified version was not found.');
                }
                VerticalSchema schema = VerticalSchemaUtils.retrieveVerticalSchema(version[0].Vertical__r.Name, 'initial');
                result.put('schema',schema);
                result.put('status','SUCCESS');
                return result;
            }
            
            Needs_Analysis__c need;
            if (String.isBlank(recordId) == false){
                need = [SELECT Id, Name, CreatedDate, Needs_Captured__c, Recommendation_Captured__c FROM Needs_Analysis__c WHERE Id =: recordId];
                if (need == null){
                    throw new VerticalException('Specified need analysis was not found.');
                }
            }
            
            Opportunity[] oppty = [SELECT Id, Name, AccountId, Account.Name FROM Opportunity WHERE Id =: opportunityId];
            Account account = oppty[0].Account;

            if (oppty == null || oppty.isEmpty() == true){
                throw new VerticalException('Specified opportunity was not found.');
            }

            VerticalSchema schema = VerticalSchemaUtils.retrieveVerticalSchema('General', 'initial');
            if (need != null && need.Needs_Captured__c != null){
                VerticalJSONParser.VerticalNeeds needJson = VerticalJSONParser.parse(need.Needs_Captured__c);
                req = VerticalJSONParser.needMap;
                //populate all questions from need
                for (VerticalElement elem : schema.elements){
                    recurring(elem,account, null);
                }
            }
            result.put('message','');
            result.put('schema',schema);
            result.put('status','SUCCESS');
        }catch(VerticalException ex){
            registerError('Process Exception - '+ex.getMessage());
        }catch(Exception ex ){
            registerError('Unexpected Exception - '+ex.getMessage());
        }
        return result;
    }
    /**
     * @param
     * @param
     * @param
     * @param
     * @return
     */
    @AuraEnabled
    public static Map<String,Object> loadFinalQuote(String versionId, String recordId, String opportunityId, String productCode){
        result = new Map<String,Object>();
        return result;
    }
    /**
     * @param
     * @param
     * @param
     */
    public static void recurring(VerticalElement parent, Account account, Product2 product){
        if (parent.elements != null && parent.elements.isEmpty() == false){
            for (VerticalElement child : parent.elements){
                recurring(child, account, product);
            } 
        }
        if (parent.attributes != null && parent.attributes.isEmpty() == false){
            for (VerticalElement.Attribute attr : parent.attributes){
                if (attr.key == 'retrieveFrom'){
                    if (attr.value.startsWith('Account.') == true && account != null){
                        String targetField = attr.value.split('\\.')[1];
                        parent.value = (String)account.get(targetField);
                    }else if (attr.value.startsWith('Product2.') == true && product != null){
                        String targetField = attr.value.split('\\.')[1];
                        parent.value = (String)product.get(targetField);
                    }else if (attr.value.startsWith('{{') == true && product != null){
                        String targetField = attr.value.replace('{{','').replace('}}','');
                        parent.value = parseAddress(targetField);
                    }
                }
            }
        }
        if (req != null && parent.value == null){
            if (req.get(parent.elemid) != null){
                parent.value = String.valueOf(req.get(parent.elemid));   
            }else if (parent.elemtype == 'address-lookup'){
                parent.value = parseAddress(parent.elemid);
            }
        }
    }
    /**
     * @param elemid id of address-lookup element
     * @return string address parsed to object
     */
    private static String parseAddress(String elemid){
        String address = '{';   //address structure shouldn't change much in the future, so it's ok
        if (req.get(elemid+'_gnafpid') != null) address += '"gnafpid":"'+req.get(elemid+'_gnafpid')+'",';
        if (req.get(elemid+'_suburb') != null) address += '"suburb":"'+req.get(elemid+'_suburb')+'",';
        if (req.get(elemid+'_postcode') != null) address += '"postcode":"'+req.get(elemid+'_postcode')+'",';
        if (req.get(elemid+'_state') != null) address += '"state":"'+req.get(elemid+'_state')+'",';
        if (req.get(elemid+'_street') != null) address += '"street":"'+req.get(elemid+'_street')+'",';
        if (req.get(elemid+'_street_type') != null) address += '"street_type":"'+req.get(elemid+'_street_type')+'",';
        if (req.get(elemid+'_streetnumber') != null) address += '"streetnumber":"'+req.get(elemid+'_streetnumber')+'",';
        if (req.get(elemid+'_unit') != null) address += '"unit":"'+req.get(elemid+'_unit')+'",';
        if (req.get(elemid+'_country') != null) address += '"country":"'+req.get(elemid+'_country')+'"';
        address += '}';
        return address;
    }
    /**
     * @description Create quote after selection of a product. 
     * @param params transaction container that includes parent ids
     * @param answers string container for all needs answers
     * @param sendEmail boolean if set to true will send email to account email
     * @return
     */
    @AuraEnabled 
    public static Map<String,Object> createQuote(String params, String answers, String pricingModel, Boolean sendEmail){
        result = new Map<String,Object>();
        try{

        }catch(Exception ex ){
            registerError('Unexpected Exception - '+ex.getMessage());
        }
        return result;
    }
    /**
    * @description Parse response into defined json format and call mulesoft to get recommendation back. 
    * @param params map of related object info such as vertical, versionId, opptyId
    * @param answers list of all the question id and answer
    * @return recommendations
    */
    @AuraEnabled 
    public static Map<String,Object> viewRecommendation(String params, String answers){
        result = new Map<String,Object>();
        try{

        }catch(Exception ex ){
            registerError('Unexpected Exception - '+ex.getMessage());
        }
        return result;
    }
    private static VerticalJSONParser.VerticalNeeds buildNeedJSON(String answers){
        Map<String,String> response = (Map<String,String>)JSON.deserialize(answers, Map<String,String>.class);
        VerticalJSONParser.VerticalNeeds req = new VerticalJSONParser.VerticalNeeds();
        req.needs = new VerticalJSONParser.Need[0];
        for (String key : response.keySet()){
            String val = response.get(key);
            VerticalJSONParser.Need n = new VerticalJSONParser.Need();
            n.name = key;
            if (val != null && val.startsWith('[{') == true){
                n.value = JSON.deserializeUntyped(val);
            }else{
                n.value = val;
            }
            req.needs.add(n);
        }
        System.debug(req);
        return req;
    }
    private static void registerError(String message){
        System.debug(message);
        result.put('message',message);
        result.put('status','ERROR');
    }
    public virtual class VerticalRequest{
        public String vertical {get; set;}
        public String versionId {get; set;}
        public VerticalNeed[] needs {get; set;}
    }
    public class VerticalNeed{
        String name;
        Object value;
        public VerticalNeed(String q, Object a){
            name = q;
            value = a;
        }
    }
}
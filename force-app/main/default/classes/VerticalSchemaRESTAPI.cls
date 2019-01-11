/***
        Description: This class is written to retrieve the schema of Need Analysis verticals with sections and Q/A
        Author: SMS Management & Technology
        History---------
        Created :     02-Oct-2017
        Modified:   
-------

***/
@RestResource(urlMapping='/verticalschema/*')
global with sharing class VerticalSchemaRESTAPI{
        public class VerticalSchemaException extends Exception{}

        @HttpPost
        global static void doPost(String verticalName, Integer versionNumber, String processName) {
             RestRequest req = RestContext.request;
             RestResponse res = RestContext.response;
             res.addHeader('Content-Type', 'application/json');  
             String errmsg='Vertical Name is invalid or unavailable'; 
             try{
                if (processName == null){
                    processName = 'initial';
                }
                if(String.isBlank(verticalName)==false && versionNumber!=null){
                    res.responseBody = Blob.valueOf(VerticalSchemaUtils.retrieveVerticalSchemaJSON(verticalName,versionNumber,processName));
                }
                else if(String.isBlank(verticalName)==false && versionNumber==null){
                    res.responseBody = Blob.valueOf(VerticalSchemaUtils.retrieveVerticalSchemaJSON(verticalName,processName));
                }else{
                    res.StatusCode = 400; 
                    res.responseBody = Blob.valueOf(errmsg);
                }
            }catch(Exception ex){
                res.StatusCode = 500;  
                res.responseBody = Blob.valueOf(errmsg +' '+ ex);
            }
        }
}
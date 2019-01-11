public class VerticalJSONParser {
    public static void consumeObject(JSONParser parser) {
        Integer depth = 0;
        do {
            JSONToken curr = parser.getCurrentToken();
            if (curr == JSONToken.START_OBJECT || 
                curr == JSONToken.START_ARRAY) {
                depth++;
            } else if (curr == JSONToken.END_OBJECT ||
                curr == JSONToken.END_ARRAY) {
                depth--;
            }
        } while (depth > 0 && parser.nextToken() != null);
    }
    public static Map<String, Object> needMap {get; set;}
    public static void setNeedMap(List<Need> needs){
        needMap = new Map<String, Object>();
        for (Need n : needs){
            needMap.put(String.valueOf(n.name), n.value);
        }
    }

    public class VerticalNeeds {
        public String vertical {get;set;} 
        public String versionId {get;set;} 
        public List<Need> needs {get;set;}

        public VerticalNeeds(){}
 
        public VerticalNeeds(JSONParser parser) {
            while (parser.nextToken() != JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != JSONToken.VALUE_NULL) {
                        if (text == 'vertical') {
                            vertical = parser.getText();
                        } else if (text == 'versionId') {
                            versionId = parser.getText();
                        } else if (text == 'needs') {
                            needs = new List<Need>();
                            while (parser.nextToken() != JSONToken.END_ARRAY) {
                                needs.add(new Need(parser));
                            }
                        } else {
                            System.debug(LoggingLevel.WARN, 'VerticalJSONParser consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
            setNeedMap(needs);
        }
    }
    
    public class Need {
        public Object value {get;set;}
        public String name {get;set;} 
        
        public Need() {}
        
        public Need(JSONParser parser) {
            List<Need> tableValue = new List<Need>();
            while (parser.nextToken() != JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != JSONToken.VALUE_NULL) {
                        if (parser.getCurrentToken() == JSONToken.START_ARRAY){
                            while (parser.nextToken() != JSONToken.END_ARRAY) {
                                Need n = new Need();
                                n.name = parser.getText();
                                parser.nextToken();
                                n.value = parser.getText(); 
                                tableValue.add(n);  
                            }
                            System.debug(tableValue);
                            value = tableValue;
                        }if (text == 'value') {
                            value = parser.getText();
                        } else if (text == 'name') {
                            name = parser.getText();
                        } else {
                            System.debug(LoggingLevel.WARN, 'Needs consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    public static VerticalNeeds parse(String json) {
        return new VerticalNeeds(System.JSON.createParser(json));
    }
}
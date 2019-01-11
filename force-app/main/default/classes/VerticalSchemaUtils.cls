global class VerticalSchemaUtils {
	public class NeedAnalysisException extends Exception {}

	static String verticalName;
	static Map<String,VerticalSchema> schemas;
	webservice static String verticalSchemaCall(String versionId)
    { 
        return generateJSON(versionId);
    }
	/**
	* @description This method find retrieve active vertical configuration by providing vertical name and version number. JSON is coming from an attachment stored on the related Vertical Version Object
	*/
	public static String retrieveVerticalSchemaJSON(String verticalName, Integer versionNumber, String processName){
		Vertical_Version__c[] vertical = [select Id, Vertical__r.Developer_Name__c from Vertical_Version__c 
		                                  WHERE (Vertical__r.Name =: verticalName OR Vertical__r.Developer_Name__c =: verticalName)
		                                  AND Version_Number__c =: versionNumber];
		if (vertical == null || vertical.isEmpty() == true){
            throw new NeedAnalysisException('Vertical template not defined.');
        }
        //check if content is in the cache
        String content;
        /*if ( (content = (String)Cache.Org.get('local.VerticalSchema1.'+vertical[0].Vertical__r.Developer_Name__c+processName)) != null){
        	return content;
        }*/
        //not in the cache, retrieve from json file
		Attachment[] attachments = [SELECT Id, Body FROM Attachment WHERE ParentId = :vertical[0].Id AND Name LIKE: ('%'+processName+'%') ORDER BY CreatedDate DESC LIMIT 1];
		if (attachments == null || attachments.isEmpty() == true){
            throw new NeedAnalysisException('Vertical file not found.');
        }
        //reupload content in cache
        content = attachments[0].Body.toString();
        //Cache.Org.put('local.VerticalSchema1.'+vertical[0].Vertical__r.Developer_Name__c+processName,content);

		return content;
	}
	/**
	* @description This method find retrieve active vertical configuration by providing vertical name. JSON is coming from an attachment stored on the related Vertical Version Object
	*/
	public static String retrieveVerticalSchemaJSON(String verticalName, String processName){
		Vertical_Version__c[] vertical = [select Id, Vertical__r.Developer_Name__c from Vertical_Version__c 
		                                  WHERE (Vertical__r.Name =: verticalName OR Vertical__r.Developer_Name__c =: verticalName)];
		                                  //AND Active__c = TRUE];
		if (vertical == null || vertical.isEmpty() == true){
            throw new NeedAnalysisException('Vertical template not defined.');
        }
        //check if content is in the cache
		String content;
        /*if ( (content = (String)Cache.Org.get('local.VerticalSchema1.'+vertical[0].Vertical__r.Developer_Name__c+processName)) != null){
        	return content;
        }*/
        //not in the cache, retrieve from json file
		Attachment[] attachments = [SELECT Id, Body FROM Attachment WHERE ParentId = :vertical[0].Id AND Name LIKE: ('%'+processName+'%') ORDER BY CreatedDate DESC LIMIT 1];
		if (attachments == null || attachments.isEmpty() == true){
            throw new NeedAnalysisException('Vertical file not found.');
        }
        //reupload content in cache
        content = attachments[0].Body.toString();
        //Cache.Org.put('local.VerticalSchema1.'+vertical[0].Vertical__r.Developer_Name__c+processName,content);

		return content;
	}

	/**
	* @description This method find retrieve active vertical configuration by providing vertical name. JSON is coming from an attachment stored on the related Vertical Version Object
	*/
	public static String retrieveProviderVerticalSchemaJSON(String verticalName, String processName, String parentId){
		Vertical_Version__c[] vertical = [select Id, Vertical__r.Developer_Name__c from Vertical_Version__c 
		                                  WHERE (Vertical__r.Name =: verticalName OR Vertical__r.Developer_Name__c =: verticalName)
		                                  AND Active__c = TRUE];
		if (vertical == null || vertical.isEmpty() == true){
            throw new NeedAnalysisException('Vertical template not defined.');
        }
        //check if content is in the cache
		String content;
        /*if ( (content = (String)Cache.Org.get('local.VerticalSchema1.'+vertical[0].Vertical__r.Developer_Name__c+processName)) != null){
        	return content;
        }*/
        //not in the cache, retrieve from json file
        System.debug('@@@'+vertical[0].Vertical__r.Developer_Name__c+'_'+processName+'@@@'+parentId);
		Attachment[] attachments = [SELECT Id, Body FROM Attachment WHERE ParentId = :parentId AND Name LIKE: (vertical[0].Vertical__r.Developer_Name__c+'_'+processName+'%') ORDER BY CreatedDate DESC LIMIT 1];
		if (attachments == null || attachments.isEmpty() == true){
            throw new NeedAnalysisException('Vertical file not found.');
        }
        //reupload content in cache
        content = attachments[0].Body.toString();
        //Cache.Org.put('local.VerticalSchema1.'+vertical[0].Vertical__r.Developer_Name__c+processName,content);

		return content;
	}
	/**
	* @description This method find retrieve active vertical configuration by providing vertical name. JSON is coming from an attachment stored on the related Vertical Version Object
	*/
	public static VerticalSchema retrieveVerticalSchema(String verticalName, String processName){

		return VerticalSchema.parse(retrieveVerticalSchemaJSON(verticalName, processName));
	}
	/**
	* @description This method find retrieve active vertical configuration by providing vertical name and version number. JSON is coming from an attachment stored on the related Vertical Version Object
	*/
	public static VerticalSchema retrieveVerticalSchema(String verticalName, Integer versionNumber, String processName){

		return VerticalSchema.parse(retrieveVerticalSchemaJSON(verticalName, versionNumber, processName));
	}
	/**
	* @description This method find retrieve active vertical configuration by providing vertical name and version number. JSON is coming from an attachment stored on the related Vertical Version Object
	*/
	public static VerticalSchema retrieveProviderVerticalSchema(String verticalName, String processName, String parentId){

		return VerticalSchema.parse(retrieveProviderVerticalSchemaJSON(verticalName, processName, parentId));
	}
	/**
	* @description Serialise vertical schema into json
	*/
	public static String generateJSON(String versionId){
		Attachment[] files = new Attachment[0];
		loadVerticalObjects(versionId);
		for (String key : schemas.keySet()){
			files.add(insertAttachment(key, key.split('::')[1]));
		}
		insert files;
		return 'success';
	}
	/**
	* @description Insert JSON output as an Attachment against Vertical Version
	*/
	private static Attachment insertAttachment(String processName, String parentId){
		VerticalSchema schema = schemas.get(processName);
		String verticalJson = JSON.serializePretty(schema);

		if (String.isBlank(verticalJson) == true || String.isBlank(schema.sfid) == true){
            throw new NeedAnalysisException('Error in creating vertical json file.');
        }
        //override cach with new version
        //Cache.Org.put('local.VerticalSchema1.'+schema.elemid,verticalJson+processName);
		return new Attachment(Name = schema.elemid+'_'+processName.split('::')[0]+'.json', Body = Blob.valueOf(verticalJson), ParentId = parentId);
	}
	/**
	* @description Load all the vertical configuration so we can build the json file, Section/Question/Answer/Attribute
	*/
	public static void loadVerticalObjects(String versionId){
	    Vertical_Version__c version = [SELECT Id, Name, Vertical__c, Vertical__r.Name, CreatedDate, Vertical__r.HTML_Description__c, Vertical__r.Display_Type__c, Version_Number__c, Vertical__r.Developer_Name__c, Vertical__r.Vertical_Icon__c FROM Vertical_Version__c WHERE Id = :versionId];
	    if (version == null){
	        System.debug('Vertical schema not found.');
			return;
	    }

	    List<Section__c> sectionsList = [SELECT Id, Name, Column_Layout__c, Description__c, Vertical_Version__r.Vertical__c, Visible__c, Vertical_Version__r.Vertical__r.Name, Vertical_Version__r.Vertical__r.HTML_Description__c, Display_Title__c, Background_Color__c, Text_Color__c, Process__c, Channel__c, Order__c,
	                                          (SELECT Id, Name, Column_Layout__c, Background_Color__c, Text_Color__c, Description__c, Display_Title__c, Channel__c, Visible__c, Order__c  FROM Sections__r ORDER BY Order__c) 
	                                      FROM Section__c 
	                                      WHERE Vertical_Version__c =: version.Id
	                                      AND Section__c = NULL 
	                                      ORDER BY Order__c];
	    if (sectionsList == null || sectionsList.isEmpty() == true){
	        System.debug('Vertical sections not defined yet.');
			return;
	    }
	    //load question of that version
	    Map<String, Map<String,Question__c>> tmp = new Map <String, Map<String,Question__c>>();
	    Set<ID> questionIds = new Set<ID>();
	    Set<ID> providers = new Set<ID>();
	    for (Section_Question__c sq :  [SELECT Id, Section__c, Question__c
	    								FROM Section_Question__c 
	    								WHERE (Section__r.Vertical_Version__c = :version.Id OR Section__r.Section__r.Vertical_Version__c = :version.Id) 
	    								AND Active__c = TRUE
	    								AND Question__r.Active__c = true
	                                   	ORDER BY Question__r.Order__c]){
	        
	        questionIds.add(sq.Question__c);
	        
	        if (tmp.get(sq.Section__c) == null){
	        	tmp.put(sq.Section__c, new Map<String,Question__c>());
	        }
	        tmp.get(sq.Section__c).put(sq.Question__c ,null);	
	        
	    }
	    //load questions
	    Map<Id, Question__c> questions = new Map<Id, Question__c>([SELECT   Id, External_Link__c, Question__c, Required__c, JSON_Name__c , Information__c, Digital_Data_Type__c, Data_type__c, Always_Visible__c, Visibility__c, Channel__c, Display_Summary__c, Order__c, Related_Question__c, ToolTip__c,
								                                            (SELECT id, Name, Question__c, Value__c from Question_Attributes__r),
								                                            (SELECT Name, Value__c, Abrreviated_Key__c, Abbreviated_Value__c, Related_Question__c, Icon_Path__c, Default__c FROM Answers__r ORDER BY Order__c),
								                                            (SELECT Name, id, Criteria__c, Error_Message__c, Active__c, Description__c from Question_Validation__r WHERE Active__c = TRUE)
								                                   FROM     Question__c 
								                                   WHERE    Id = :questionIds]);
	    Map<String, String[]> dependencies = build_visiblity_dependencies(questions.values(), sectionsList);
	    for (String sct : tmp.keySet()){
	    	for (String qst : tmp.get(sct).keySet()){
	    		tmp.get(sct).put(qst,questions.get(qst));
	    	}
	    }
	    schemas = new Map<String,VerticalSchema>();
	    createProcessSchema(version, 'initial::'+version.Id);

	    //define process, one schema per process --> one for intiial quote (+recommendation) and one for final quote
	    for (String schemaKey : schemas.keySet()){
		    for (Section__c sec : sectionsList){
		    	if (schemaKey.contains(sec.Process__c == 'Final Quote' ? 'final' : 'initial') == false) continue;

		    	VerticalSchema schema = schemas.get(schemaKey);

		        VerticalElement s = new VerticalElement();
		        s.elemid = sec.Id;
		        s.elemtype = 'form-page';
		        s.digitaltype = 'form-page';
		        s.label = sec.Display_Title__c ? sec.Name : null;
		        if (String.isNotBlank(sec.Visible__c) == true){
		        	s.visible = sec.Visible__c.replace('\r\n',' ');
			        s.parentelemids = new Set<String>();
		            s.parentelemids.addAll(rules_regex(s.visible,'[{]{2}\\w+[}]{2}','[{]{2}','[}]{2}'));
	            }
		        
	            if (dependencies.get(s.elemid) != null) s.dependencies = dependencies.get(s.elemid);
		        s.description = sec.Description__c;
		        s.elements = new VerticalElement[0];
		        s.background_color = sec.Background_Color__c;
		        s.text_color = sec.Text_Color__c;
		        s.channel = sec.Channel__c;
		        s.index = (Integer)sec.Order__c;
		        s.process = (sec.Process__c == 'Final Quote' ? 'final' : (sec.Process__c == 'Initial Quote' ? 'initial' : 'rec'));
		        s.isSummary = false;
		        for (Section__c subSec : sec.Sections__r){
		        	VerticalElement ss = new VerticalElement();
		            ss.elemid = subSec.Id;
		            ss.channel = subSec.Channel__c;
		            ss.index = (Integer)subSec.Order__c;
		            ss.isSummary = false;
		            ss.elemtype = 'form-page-section'; //subSec.Type__c; //need to add form-page-section as a picklist value
		            ss.digitaltype = 'form-page-section';
		            ss.label = subSec.Display_Title__c ? subSec.Name : null;
		            ss.description = subSec.Description__c;
	                if (String.isNotBlank(sec.Visible__c) == true){
	                    ss.visible = sec.Visible__c.replace('\r\n',' ');
	                    ss.parentelemids = new Set<String>();
	            		ss.parentelemids.addAll(rules_regex(ss.visible,'[{]{2}\\w+[}]{2}','[{]{2}','[}]{2}'));
	                }
		            ss.elements = new VerticalElement[0];
		            ss.colSize = String.isBlank(sec.Column_Layout__c) == true ? '1' : sec.Column_Layout__c;
		            ss.background_color = subSec.Background_Color__c;
		        	ss.text_color = subSec.Text_Color__c;
		            if (tmp.get(subSec.Id) != null){
		            	feed_element_sections(ss, tmp.get(subSec.Id).values(), dependencies);
		            }
			        s.elements.add(ss);
			    }
			    schema.elements.add(s);
			    if (tmp.get(sec.Id) != null){
			    	feed_element_sections(s, tmp.get(sec.Id).values(), dependencies);
		        }
		    }
	    }
	}
	private static void createProcessSchema(Vertical_Version__c version, String processName){
		VerticalSchema schema = new VerticalSchema();
	    schema.sfid = version.Id;
	    schema.verticalIcon = version.Vertical__r.Vertical_Icon__c;
	    schema.elemid = version.Vertical__r.Developer_Name__c;
	    schema.name = version.Vertical__r.Name;  
	    schema.description = version.Vertical__r.HTML_Description__c;
	    schema.published = version.CreatedDate;
	    schema.version = version.Version_Number__c;
	    schema.displayType = version.Vertical__r.Display_Type__c;
	    schema.elements = new VerticalElement[0];
	    schemas.put(processName,schema);
	}
	private static void feed_element_sections(VerticalElement parent, Question__c[] questions,  Map<String, String[]> dependencies){
		for (Question__c q : questions){
			
			if (q.Related_Question__c != null && (parent.elemtype == 'form-page' || parent.elemtype == 'form-page-section')) continue;

            VerticalElement qst = new VerticalElement();
            qst.elemid = q.JSON_Name__c;
            qst.elemtype = q.Data_type__c;
            qst.digitaltype = q.Digital_Data_Type__c;
            qst.label = q.Question__c;
            qst.required = q.Required__c;
            qst.index = (Integer)q.Order__c;
            qst.externalLink = q.External_Link__c;
            qst.toolip = q.ToolTip__c;
            qst.description = q.Information__c;
            qst.channel = q.Channel__c;
            qst.isSummary = q.Display_Summary__c;
            qst.attr = new Map<String,String>();
            if (String.isNotBlank(q.Visibility__c) == true){
                qst.visible = q.Visibility__c.replace('\r\n',' ');
                qst.parentelemids = new Set<String>();
                qst.parentelemids.addAll(rules_regex(qst.visible,'[{]{2}\\w+[}]{2}','[{]{2}','[}]{2}'));
            }
            qst.options = new VerticalElement.Option[0];
            if (q.Answers__r.isEmpty() == false){
                for (Answer__c a : q.Answers__r){
                	VerticalElement.Option o = new VerticalElement.Option(a.Name, a.Value__c, a.Icon_Path__c);
                	o.isdefault = a.Default__c;
                    qst.options.add(o);
                }
            }
            qst.attributes = new VerticalElement.Attribute[0];
            if (q.Question_Attributes__r.isEmpty() == false){
                for (Question_Attributes__c qa : q.Question_Attributes__r){
                    qst.attributes.add(new VerticalElement.Attribute(qa.Name, qa.Value__c));
                    qst.attr.put(qa.Name, qa.Value__c);
                }
            }
            qst.validations = new VerticalElement.ValidationRule[0];
            if (q.Question_Validation__r.isEmpty() == false){
                for (Question_Validation__c qv : q.Question_Validation__r){
                	qv.Criteria__c = qv.Criteria__c.replaceAll('\r\n','');
                    qst.validations.add(new VerticalElement.ValidationRule(qv.id, qv.Criteria__c, qv.Error_Message__c));
                }
            }
            if (dependencies.get(qst.elemid) != null) qst.dependencies = dependencies.get(qst.elemid);

            if(relatedQuestions.get(q.Id) != null){
            	qst.elements = new VerticalElement[0];
	            feed_element_sections(qst,relatedQuestions.get(q.Id),dependencies);
        	}

            parent.elements.add(qst);
        }
	}
	private static Map<String, Question__c[]> relatedQuestions = new Map<String, Question__c[]>();
	private static Map<String, String[]> build_visiblity_dependencies(Question__c[] questions, Section__c[] sectionsList){
		Map<String, String[]> tmp = new Map<String, String[]>();
		for (Question__c q : questions){
			if (q.Related_Question__c != null){
				if (relatedQuestions.get(q.Related_Question__c) == null){
					relatedQuestions.put(q.Related_Question__c, new Question__c[0]);
				}
				relatedQuestions.get(q.Related_Question__c).add(q);
			}
			if (String.isNotBlank(q.Visibility__c) == true && q.Visibility__c != 'true'){
				String[] parentIds = new String[0];
				parentIds.addAll(rules_regex(q.Visibility__c,'[{]{2}\\w+[}]{2}','[{]{2}','[}]{2}'));

				for (String parentid : parentIds){
				    if (tmp.get(parentid) == null){
				    	tmp.put(parentid, new String[0]);
				    }
				    tmp.get(parentid).add(q.JSON_Name__c);
				} 
			}
		}
		for (Section__c sec : sectionsList){
			if (String.isNotBlank(sec.Visible__c) == true && sec.Visible__c != 'true'){
				String[] parentIds = new String[0];
				parentIds.addAll(rules_regex(sec.Visible__c,'[{]{2}\\w+[}]{2}','[{]{2}','[}]{2}'));
				for (String parentid : parentIds){
				    if (tmp.get(parentid) == null){
				    	tmp.put(parentid, new String[0]);
				    }
				    tmp.get(parentid).add(sec.Id);
				}
			}
			for (Section__c subSec : sec.Sections__r){
				if (String.isNotBlank(subSec.Visible__c) == true && subSec.Visible__c != 'true'){
					String[] parentIds = new String[0];
					parentIds.addAll(rules_regex(subSec.Visible__c,'[{]{2}\\w+[}]{2}','[{]{2}','[}]{2}'));
					for (String parentid : parentIds){
					    if (tmp.get(parentid) == null){
					    	tmp.put(parentid, new String[0]);
					    }
					    tmp.get(parentid).add(subSec.Id);
					}
				}
			}
		}
		return tmp;
	}
	private static String[] rules_regex(String rule, String regex, String start, String finish){
		String[] parentIds = new String[0];
		String criteria = rule;
		Pattern p = Pattern.compile(regex); 
		Matcher pm = p.matcher(criteria);
		while(pm.find()){
			String parentid = pm.group().replaceAll(start,'').replaceAll(finish,'');
			parentIds.add(parentid);
		}
		return parentIds;
	}
}
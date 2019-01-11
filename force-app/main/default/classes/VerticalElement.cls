public virtual class VerticalElement {
	@AuraEnabled public String elemid {get; set;}	//page_1
	@AuraEnabled public String elemtype {get; set;}	//form-page
	@AuraEnabled public String digitaltype {get; set;}	//radio
	@AuraEnabled public String label {get; set;}	//Your Needs
	@AuraEnabled public String externalLink {get; set;}	//Your Needs
	@AuraEnabled public Integer index {get; set;}
	@AuraEnabled public String channel {get; set;}	//Mobile; Web
	@AuraEnabled public String process {get; set;}	//Mobile; Web
	@AuraEnabled public String background_color {get; set;}
	@AuraEnabled public String text_color {get; set;}
	@AuraEnabled public String description {get; set;}
	@AuraEnabled public String toolip {get; set;}
	@AuraEnabled public String colSize {get; set;}
	@AuraEnabled public Boolean issummary {get; set;}
	@AuraEnabled public boolean required {get; set;}
	@AuraEnabled public VerticalElement[] elements {get; set;}
	@AuraEnabled public Option[] options {get; set;}
	@AuraEnabled public Attribute[] attributes {get; set;}
	@AuraEnabled public Map<String,String> attr {get; set;}
	@AuraEnabled public String[] dependencies {get; set;} 	//all children visibilities that depend on this element
	@AuraEnabled public Set<String> parentelemids {get; set;}  //all parent element ids that define the visibility of that element. 
	@AuraEnabled public String visible {get; set;}			//rule that define visibility of the element. 
	@AuraEnabled public String value {get; set;}			//selected value of the question
	@AuraEnabled public ValidationRule[] validations {get; set;}
	public class Attribute{
		@AuraEnabled public String key {get; set;}
		@AuraEnabled public String value {get; set;}
		public Attribute(String k, String v){
			key = k;
			value = v;
		}
	}
	public class Option{
		@AuraEnabled public String key {get; set;}
		@AuraEnabled public Boolean isdefault {get; set;}
		@AuraEnabled public String value {get; set;}
		@AuraEnabled public String iconName {get; set;}
		public Option(String k, String v, String i){
			isdefault = false;
			key = k;
			value = v;
			iconName = i;
		}
	}
	public class ValidationRule{
		@AuraEnabled public String elemid {get; set;}
		@AuraEnabled public String criteria {get; set;}
		@AuraEnabled public String error_msg {get; set;}
		public ValidationRule(id ruleid, String  cr, String msg){
			elemid=ruleid;
			criteria=cr;
			error_msg=msg;
		}
	}
}
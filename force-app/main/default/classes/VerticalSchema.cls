public virtual class VerticalSchema {
	@AuraEnabled public String sfid {get; set;}	//vertical_test_schema
	@AuraEnabled public String elemid {get; set;}	//vertical_test_schema
	@AuraEnabled public String name {get; set;}	//Compare Home & Contents Insurance
	@AuraEnabled public String description {get; set;}	//Test schema developed for discussion
	@AuraEnabled public Decimal version {get; set;}	//0.0.1
	@AuraEnabled public DateTime published {get; set;}	//2017-09-19 09:00:00
	@AuraEnabled public String displayType {get; set;}	//progressive
	@AuraEnabled public VerticalElement[] elements {get; set;}
	@AuraEnabled public String verticalIcon {get; set;}
	@AuraEnabled public Feature[] features {get; set;}
	@AuraEnabled public Feature[] featureSuperset {get; set;}
	@AuraEnabled public ProductHeader[] headers {get; set;}

	public static VerticalSchema parse(String json){
		return (VerticalSchema) System.JSON.deserialize(json, VerticalSchema.class);
	}

	public class Feature{
		@AuraEnabled public String elemid {get; set;}
		@AuraEnabled public String label {get; set;}
		@AuraEnabled public String description {get; set;}	
		@AuraEnabled public String channel {get; set;}
	}
	public class ProductHeader{
		@AuraEnabled public String elemid {get; set;}
		@AuraEnabled public String label {get; set;}
	}
}
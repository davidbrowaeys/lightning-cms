<aura:application access="global"
                implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId">
    
    <aura:attribute name="recordId" type="String"/>
    <c:NeedAnalysisEngine recordId="{!v.recordId}"/>
</aura:application>
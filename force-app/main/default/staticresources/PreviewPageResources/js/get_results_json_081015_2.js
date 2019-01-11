    /*
  =====================================

   Project: Broadband Root
   Author:  ''          

  =====================================
  */

   var jsonData ='';
   var vertCount='';
   var counter = 1;
   var col2Txt='';
   var isListContainsSponsored = false;
   
  ;(function($, win, doc, undefined){

    "use strict";
    
    win.sf4data = win.sf4data || {};    
    
  sf4data.init = function(pageNo){
    
    if(jsonData ==''){  
  
  //Sponsored Product  
  var sponsoredProduct;
  $.ajaxSetup({ cache: false });    
      var spon_product = $.getJSON('/getSponsoredProductJSON?buster='+new Date().getTime(), function() {
      console.log("SUCCESS - GET Sponsered Product SUCCESS.");
      })
    .done(function(sponJSON){
      console.log("sponJSON "+sponJSON.productList[0]);
      sponsoredProduct = sponJSON.productList[0];
    })
    .fail(function() {
      console.log("ERROR - GET Sponsered Product is FAILED.");
      })
    .always(function() {
      console.log("Sponsered call");

      });
    //json.productList.unshift(sponJSON.productList[0]);
    
  //End Of sponsored product
    

  console.log("In If..");
      $.ajaxSetup({ cache: false });    
      var products = $.getJSON( '/resultsjson?buster='+new Date().getTime(), function() {
      console.log( "success" );
      })
      .done(function(json){   
    
    if(sponsoredProduct != undefined) // For Sponsored    
    {    isListContainsSponsored = true;
      json.productList.unshift(sponsoredProduct);
      console.log('json.productList = '+json.productList);
    }
  if(json.productList.length>0){       
      var items = ''; vertCount=json.originalFacetCount.verticalName;
      $.each(json.productList, function( key, val ) {
        console.log("Tot elements = "+json.productList.length);
        jsonData = json.productList;
   
      if(key<pageNo){          
          var offersText='',cost1MbInPlan='',productContactNumber='';
        if(val.specialOffer !='' && val.specialOffer !='No'){
           offersText='<div class="splOfr">SPECIAL OFFER<div><div>'+val.specialOfferDetails+'<br/><a class="wlnk10" href="/plan/?id='+val.iSelectPlanID+'">click for details</a></div></div></div>';}
        if(val.cost1MbInPlan !=""){
          cost1MbInPlan = '<div class="txt">Cost of 1MB of data (included in plan) = $'+val.cost1MbInPlan+'</div>';}  
        if(val.productContactNumber !=''){
            productContactNumber = '<b class="mrgnT15">'+val.providerCallText+'</b><a class="ccNo" href="tel:'+val.productContactNumber+'"><i></i> '+val.productContactNumber+'</a>';
        }  
    
  var peakOffpeakData ='',monthlyCost1='', minimumTotalCost1='';
    if(val.peakDataLimit !='N/A' && val.offpeakDataLimit !='N/A'){
  if(val.peakDataLimit !='' && val.offpeakDataLimit !='')
    peakOffpeakData = val.peakDataLimit+' + '+val.offpeakDataLimit;
    }   
  if(val.monthlyCost !='' && val.monthlyCost !='N/A' && val.monthlyCost !=0){
    monthlyCost1 = val.monthlyCost.toFixed(2);}

  if(val.minimumTotalCost !='' && val.minimumTotalCost !='N/A' && val.minimumTotalCost !=0){
    minimumTotalCost1 = val.minimumTotalCost.toFixed(2);}
                
	
	
	var myConnType= val.connectionType.toLowerCase().indexOf("adsl")>-1?val.connectionType +' <div class="txt">Requires an active landline service.</div>':val.connectionType ;
	
    var col2 =(val.verticalName=='Bundle') ? '<li class="rate"><b>'+val.phoneFeature1.split('|')[0]+'</b><span>'+val.phoneFeature1.split('|')[1]+'</span><b>'+val.phoneFeature2.split('|')[0]+'</b><span>'+val.phoneFeature2.split('|')[1]+'</span><b>'+val.phoneFeature3.split('|')[0]+'</b><span>'+val.phoneFeature3.split('|')[1]+'</span></li>':'<li class="rate">'+myConnType+'</li>';
	
	
    
  
  (val.tmcValue1 !='' || val.tmcValue1 !='0.0')?val.tmcValue1.toFixed(2):val.tmcValue1 
  
  
    // Minimum Total Cost table
    var tmc1=(val.tmcLabel1=='')?'':'<tr><td>'+val.tmcLabel1+'</td><td>$'+val.tmcValue1.toFixed(2)+'</td></tr>';
    var tmc2=(val.tmcLabel2=='')?'':'<tr><td>'+val.tmcLabel2+'</td><td>$'+val.tmcValue2.toFixed(2)+'</td></tr>';
    var tmc3=(val.tmcLabel3=='')?'':'<tr><td>'+val.tmcLabel3+'</td><td>$'+val.tmcValue3.toFixed(2)+'</td></tr>';
    var tmc4=(val.tmcLabel4=='')?'':'<tr><td>'+val.tmcLabel4+'</td><td>$'+val.tmcValue4.toFixed(2)+'</td></tr>';
    var tmc5=(val.tmcLabel5=='')?'':'<tr><td>'+val.tmcLabel5+'</td><td>$'+val.tmcValue5.toFixed(2)+'</td></tr>';  
    var minCostTble=(val.minimumTotalCost=='0')?'':'<div class="search_ico"><div class="cont"><table cellspacing="0" cellpadding="0" border="0" class="costTip"><tr><th>Cost Component</th><th>Cost Amount</th></tr>'+tmc1+tmc2+tmc3+tmc4+tmc5+'<tr><td><strong>Minimum Total Cost</strong></td><td><strong>$'+minimumTotalCost1+'</strong></td></tr></table></div></div>';     
    
    
        if(key==0 && isListContainsSponsored==true){
        items += '<li><ul class="rsltli spon"><li><div class="sponHelp"><div class="vtip"><span>iSelect may receive an additional referral fee or payment for this product.</span></div></div><a  href="#." class="logoWrp"><span><img src="'+val.providerLogo180x100+'" width="93" height="55" alt="" title=""/></span><b>'+val.productPlan+'</b></a>'+offersText+'</li>'+col2+'<li class="length">'+val.contractLength+' month contract</li><li class="data"><b>'+val.totalData+'</b>'+peakOffpeakData+''+cost1MbInPlan+'</li><li class="price"><b><sup>$</sup>'+monthlyCost1+'</b>per month ' + val.upfrontCost +'<div class="minCost"><b>Min total cost</b> $'+minimumTotalCost1+' '+minCostTble+'</div></li><li><div class="vDtls"><div class="prdFav"><a href="javascript:void(0)" class="fav"></a> <span>Add to Top Picks</span></div>'+productContactNumber+'<a href="/plan/?id='+val.iSelectPlanID+'" class="btn btn-small btn-white">View details</span> </a></div></li></ul></li>';
    }else{
    items += '<li><ul class="rsltli"><li><a  href="#." class="logoWrp"><span><img src="'+val.providerLogo180x100+'" width="93" height="55" alt="" title=""/></span><b>'+val.productPlan+'</b></a>'+offersText+'</li>'+col2+'<li class="length">'+val.contractLength+' month contract</li><li class="data"><b>'+val.totalData+'</b>'+peakOffpeakData+''+cost1MbInPlan+'</li><li class="price"><b><sup>$</sup>'+monthlyCost1+'</b>per month ' + val.upfrontCost +'<div class="minCost"><b>Min total cost</b> $'+minimumTotalCost1+' '+minCostTble+'</div></li><li><div class="vDtls"><div class="prdFav"><a href="javascript:void(0)" class="fav"></a> <span>Add to Top Picks</span></div>'+productContactNumber+'<a href="/plan/?id='+val.iSelectPlanID+'" class="btn btn-small btn-white">View details</span> </a></div></li></ul></li>';  
    }
    
    
      }
      if(key<1){
    col2Txt=(val.verticalName=='Bundle')?'Call Rates':'Connection Type';
    console.log(val.verticalName);
    }
    });          
      
      $("#resultdata").append(items);   
      if(json.productList.length <pageNo){
      //more button hide
      $(".morePlans").hide();    
    }
    }else{
      $('#rsltBx').addClass('noResults');
    }
  
  broadbandSF4.tools.ttip($('.vtip'),'span');
  broadbandSF4.tools.ttip($('.search_ico'),'.cont');
      })
      .fail(function() {
      console.log( "error" );
      })
      .always(function() {
      console.log("complete");

      });
      products.complete(function(json) { 
        
    /*if(jsonData>0){}    
    var bundlecount=(vertCount.bundl==0 || vertCount.bundl==undefined)?'':'('+vertCount.bundl+')';
    var broadcount=(vertCount.broadband==0 || vertCount.broadband==undefined)?'':'('+vertCount.broadband+')';
    var mobcount=(vertCount.mobil==0 || vertCount.mobil==undefined)?'':'('+vertCount.mobil+')';
    $('#vertBx li').eq(0).find('span').text(bundlecount);
    $('#vertBx li').eq(1).find('span').text(broadcount);
    $('#vertBx li').eq(2).find('span').text(mobcount);*/
        
    $('.sort').find('.rate').text(col2Txt);
    
    console.log( "second complete" );
        console.log( vertCount.bundl,vertCount.broadband,vertCount.mobil);
         
   });
   
   
  
    }//json
  else{
      console.log("In else..");
        var items = '';
        $.each(jsonData, function( key, val ) {
          console.log("Tot elements = "+jsonData.length);
          if(key<pageNo){          
            var offersText='',cost1MbInPlan='',productContactNumber='';
          if(val.specialOffer !='' && val.specialOffer !='No'){
             offersText='<div class="splOfr">SPECIAL OFFER<div><div>'+val.specialOfferDetails+'<br/><a class="wlnk10" href="#">click for details</a></div></div></div>';}
          if(val.cost1MbInPlan !=""){
            cost1MbInPlan = '<div class="txt">Cost of 1MB of data (included in plan) = $'+val.cost1MbInPlan+'</div>';}  
          if(val.productContactNumber !=''){
              productContactNumber = '<b class="mrgnT15">'+val.providerCallText+'</b><a class="ccNo" href="tel:'+val.productContactNumber+'"><i></i> '+val.productContactNumber+'</a>';
          }  

  var peakOffpeakData ='',monthlyCost1='', minimumTotalCost1='';
    if(val.peakDataLimit !='N/A' && val.offpeakDataLimit !='N/A'){
  if(val.peakDataLimit !='' && val.offpeakDataLimit !='')
    peakOffpeakData = val.peakDataLimit+' + '+val.offpeakDataLimit;
    }   
  if(val.monthlyCost !='' && val.monthlyCost !='N/A' && val.monthlyCost !=0){
    monthlyCost1 = val.monthlyCost.toFixed(2);}

  if(val.minimumTotalCost !='' && val.minimumTotalCost !='N/A' && val.minimumTotalCost !=0){
    minimumTotalCost1 = val.minimumTotalCost.toFixed(2);}
    
		
	var myConnType= val.connectionType.toLowerCase().indexOf("adsl")>-1?val.connectionType +' <div class="txt">Requires an active landline service.</div>':val.connectionType ;
	
   var col2 =(val.verticalName=='Bundle') ? '<li class="rate"><b>'+val.phoneFeature1.split('|')[0]+'</b><span>'+val.phoneFeature1.split('|')[1]+'</span><b>'+val.phoneFeature2.split('|')[0]+'</b><span>'+val.phoneFeature2.split('|')[1]+'</span><b>'+val.phoneFeature3.split('|')[0]+'</b><span>'+val.phoneFeature3.split('|')[1]+'</span></li>':'<li class="rate">'+myConnType+'</li>';
    
    // Minimum Total Cost table
    var tmc1=(val.tmcLabel1=='')?'':'<tr><td>'+val.tmcLabel1+'</td><td>$'+val.tmcValue1.toFixed(2)+'</td></tr>';
    var tmc2=(val.tmcLabel2=='')?'':'<tr><td>'+val.tmcLabel2+'</td><td>$'+val.tmcValue2.toFixed(2)+'</td></tr>';
    var tmc3=(val.tmcLabel3=='')?'':'<tr><td>'+val.tmcLabel3+'</td><td>$'+val.tmcValue3.toFixed(2)+'</td></tr>';
    var tmc4=(val.tmcLabel4=='')?'':'<tr><td>'+val.tmcLabel4+'</td><td>$'+val.tmcValue4.toFixed(2)+'</td></tr>';
    var tmc5=(val.tmcLabel5=='')?'':'<tr><td>'+val.tmcLabel5+'</td><td>$'+val.tmcValue5.toFixed(2)+'</td></tr>';  
    var minCostTble=(val.minimumTotalCost=='0')?'':'<div class="search_ico"><div class="cont"><table cellspacing="0" cellpadding="0" border="0" class="costTip"><tr><th>Cost Component</th><th>Cost Amount</th></tr>'+tmc1+tmc2+tmc3+tmc4+tmc5+'<tr><td><strong>Minimum Total Cost</strong></td><td><strong>$'+minimumTotalCost1+'</strong></td></tr></table></div></div>';     
    
     if(key==0 && isListContainsSponsored==true){    
        items += '<li><ul class="rsltli spon"><li><div class="sponHelp"><div class="vtip"><span>iSelect may receive an additional referral fee or payment for this product.</span></div></div><a  href="#." class="logoWrp"><span><img src="'+val.providerLogo180x100+'" width="93" height="55" alt="" title=""/></span><b>'+val.productPlan+'</b></a>'+offersText+'</li>'+col2+'<li class="length">'+val.contractLength+' month contract</li><li class="data"><b>'+val.totalData+'</b>'+peakOffpeakData+''+cost1MbInPlan+'</li><li class="price"><b><sup>$</sup>'+monthlyCost1+'</b>per month<div class="minCost"><b>Min total cost</b> $'+minimumTotalCost1+' '+minCostTble+'</div></li><li><div class="vDtls"><div class="prdFav"><a href="javascript:void(0)" class="fav"></a> <span>Add to Top Picks</span></div>'+productContactNumber+'<a href="/plan/?id='+val.iSelectPlanID+'" class="btn btn-small btn-white">View details</span> </a></div></li></ul></li>';
    }else{
    items += '<li><ul class="rsltli"><li><a  href="#." class="logoWrp"><span><img src="'+val.providerLogo180x100+'" width="93" height="55" alt="" title=""/></span><b>'+val.productPlan+'</b></a>'+offersText+'</li>'+col2+'<li class="length">'+val.contractLength+' month contract</li><li class="data"><b>'+val.totalData+'</b>'+peakOffpeakData+''+cost1MbInPlan+'</li><li class="price"><b><sup>$</sup>'+monthlyCost1+'</b>per month<div class="minCost"><b>Min total cost</b> $'+minimumTotalCost1+' '+minCostTble+'</div></li><li><div class="vDtls"><div class="prdFav"><a href="javascript:void(0)" class="fav"></a> <span>Add to Top Picks</span></div>'+productContactNumber+'<a href="/plan/?id='+val.iSelectPlanID+'" class="btn btn-small btn-white">View details</span> </a></div></li></ul></li>';    
    }  
    
        }
        });                
        $("#resultdata").append(items);   
        if(jsonData.length <pageNo){
        //more button hide
        $(".morePlans").hide();    
      }
    
      broadbandSF4.tools.ttip($('.vtip'),'span');
  broadbandSF4.tools.ttip($('.search_ico'),'.cont');
  
    }//else
  
  
  }
  
  $(function(){
    sf4data.init(10);
  });

  })(jQuery, window, document);
  
  
function loadMore(){
    counter +=1;
    pageNo = counter*10;    
    $("#resultdata").find('li').remove();
    console.log("Page No. = "+pageNo);    
    sf4data.init(pageNo);
}

function submitCheckbox(val){   
      console.log("Name = "+val.name+", Value ="+ val.value);
      document.results.fromPage.value='SF4';
    document.results.verticalSwitch.value='No';
    
      document.results.submit();
}

function verticalSwitch(val){   
      console.log(" verticalSwitch Value ="+val);
      document.results.fromPage.value='SF4';
    document.results.verticalSwitch.value='Yes';
    document.results.verticalName.value=val ;
      document.results.submit();
}

function callsortBy(val){   
      console.log("Sort By  = "+val);
      document.results.fromPage.value='SF4';
      document.results.sortBy.value=val;
     document.results.verticalSwitch.value='No';
      document.results.submit();
}
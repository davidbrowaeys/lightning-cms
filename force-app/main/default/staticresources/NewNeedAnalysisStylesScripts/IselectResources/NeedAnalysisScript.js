 $(document).ready(function ()
              {
               
                $('.clsOnlynumeric').keypress(function(e) 
                {
                    var keyCode;
                    if (window.event) // IE
                    {
                        keyCode = e.keyCode;
                    }
                    else if (e.which) // Netscape/Firefox/Opera
                    {
                        keyCode = e.which;
                    }
                    
                    if (keyCode == 46 && $(this).val().indexOf(".") < 1) {
                        return true;
                    }
                
                    return ((!((keyCode < 48) || (keyCode > 57))) || (keyCode == 8));
                });
                
                
                
                 var $j = jQuery.noConflict();
                
                     
                
                 $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:homeCallSec"]').hide();
                 
                    
                 
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec"]').hide();                
                 $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec1"]').hide();               
               $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:costSec"]').hide();
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:playgameSec"]').hide();
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:homeCallSec"]').hide();
                 
                if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:secId:pickval3"]').val()=="no")
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec"]').show();
                if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:secId2:pickval5"]').val()=="yes")
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:costSec"]').show();
                if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:secId:pickval3"]').val()!="no")
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec1"]').show();
                if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Downloadpgbs:streamingpick"]').val()=="yes")
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:playgameSec"]').show();
                if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Callpgb:pickval14"]').val()=="yes")
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:homeCallSec"]').show();
                                
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:secId:pickval3"]').change(function(){                	
                    if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:secId:pickval3"]').val()=="no"){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec"]').show();
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:costSec"]').hide();
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec1"]').hide();    
                    }else if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:secId:pickval3"]').val()!="no"){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec1"]').show();
                         $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:displaynoSec"]').hide();
                    }   
                });
                
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:secId2:pickval5"]').change(function(){
                    if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:secId2:pickval5"]').val()=="yes"){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:costSec"]').show();
                    }else if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:secId2:pickval5"]').val()=="no" || $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:secId2:pickval5"]').val()==""){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:costSec"]').hide();
                    }
                });
                
                
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Callpgb:pickval14"]').change(function(){
                    if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Callpgb:pickval14"]').val()=="yes"){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:homeCallSec"]').show();
                    }else if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Callpgb:pickval14"]').val()=="no" || $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Callpgb:pickval14"]').val()==""){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:homeCallSec"]').hide();
                    }
                });
                
                
                 $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Downloadpgbs:streamingpick"]').change(function(){
                    if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Downloadpgbs:streamingpick"]').val()=="yes"){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:playgameSec"]').show();
                    }else if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Downloadpgbs:streamingpick"]').val()=="no" || $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:Downloadpgbs:streamingpick"]').val()==""){
                        $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:playgameSec"]').hide();
                    }
                });
                
                //pg:mainform:pgBlk:pgSecId:Downloadpgbs:streamingpick
                //pg:mainform:pgBlk:pgSecId:playgamepgb:playgamepgbs:howOftenpick
                var isError;
                
                $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgBlkBut:butt"]').click(function(){ 
                     isError = false;
                     //pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:currpb:currpbs:currentPlan
                     
                     //alert($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:j_id103:j_id104:currentPlan"]').val());
                     if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:currpb:currpbs:currentPlan"]').val() >999){
                         if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:currpb:currpbs:currentPlan"]').next().is('span')!=true){
                                  $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:currpb:currpbs:currentPlan"]').after("<span style='color:red'>Error: Do not enter more than 999</span>");
                                  isError='true';
                              }else{
                                  isError = true;
                              }
                     }else{
                              if($j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:currpb:currpbs:currentPlan"]').next().is('span')){
                                  $j('[id="pageid:newNeedAnalysis:pg:mainform:pgBlk:pgSecId:pgBlkSec:currpb:currpbs:currentPlan"]').next().remove('span');
                                  
                              }
                    } 
                    $j(".mynumfield").each(function(){
                       // alert($j('[id="'+this.id+'"]').val()); numberOfDevices
					   
                         if($j('[id="'+this.id+'"]').val()==''){
                              if($j('[id="'+this.id+'"]').next().is('span')!=true){
                                  $j('[id="'+this.id+'"]').after("<span style='color:red'>Please enter a Value</span>");
                                  isError='true';
                              }else{
                                  isError = true;
                              }
                              
                          }else{
                              if($j('[id="'+this.id+'"]').next().is('span')){
                                  $j('[id="'+this.id+'"]').next().remove('span');
                                  
                              }
                          }
						  
                          if($j('[id="'+this.id+'"]').val().length >2){
                              if($j('[id="'+this.id+'"]').next().is('span')!=true){
                                  $j('[id="'+this.id+'"]').after("<span style='color:red'>Error: Do not enter more than 2 digits</span>");
                                  isError='true';
                              }else{
                                  isError = true;
                              }
                          }   
                           
                     });
                     $j(".numberOfDevices").each(function(){
                          if($j('[id="'+this.id+'"]').val().length >2){
                              if($j('[id="'+this.id+'"]').next().is('span')!=true){
                                  $j('[id="'+this.id+'"]').after("<span style='color:red'>Error: Do not enter more than 2 digits</span>");
                                  isError='true';
                              }else{
                                  isError = true;
                              }
                          }   
                           
                     });
                                          
                      $j(".SelectOption").each(function(){
                        
                          if($j('[id="'+this.id+'"]').val()==''){
                                //alert();
                              if($j('[id="'+this.id+'"]').next().is('span')!=true && $j('[id="'+this.id+'"]').is(":hidden")==false){
                                  $j('[id="'+this.id+'"]').after("<span style='color:red'>Please select value</span>");
                                  isError='true';
                              }else if($j('[id="'+this.id+'"]').is(":hidden")==false){
                                  isError = true;
                              }
                          }else{
                              if($j('[id="'+this.id+'"]').next().is('span')){
                                  $j('[id="'+this.id+'"]').next().remove('span');
                                  
                              }
                          } 
                      });
                     
                      var showErr=true;
                    
                      $j(".checkRequired").children().each(function(){
                         
                          if($j('[id="'+this.id+'"]').is(":checked")==false && showErr==true && $j('[id="'+this.id+'"]').is(":hidden")==false){
                             showErr=true;
                             
                          }else{
                              showErr=false;
                              //alert(isError);
                        } 
                        
                      });
                      if(showErr==true){
                          
                           if($j(".checkRequired").next().is('span')!=true)
                              $j(".checkRequired").after("<span style='color:red'>Value required</span>");
                          isError=true;
                      }else{
                          if($j(".checkRequired").next().is('span')){
                              $j(".checkRequired").next().remove('span');
                          }
                      }
                      var showErr1=true;
                      
                       $j(".checkRequired1").children().each(function(){
                         
                          if($j('[id="'+this.id+'"]').is(":checked")==false && showErr1==true && $j('[id="'+this.id+'"]').is(":hidden")==false){
                             showErr1=true;
                             
                          }else{
                              showErr1=false;
                              //alert(isError);
                        } 
                        
                      });
                      if(showErr1==true){
                          
                           if($j(".checkRequired1").next().is('span')!=true)
                              $j(".checkRequired1").after("<span style='color:red'>Value required</span>");
                          isError=true;
                      }else{
                          if($j(".checkRequired1").next().is('span')){
                              $j(".checkRequired1").next().remove('span');
                          }
                      }
                      
                      
                      
                     // alert(isError );
                      if(isError == false){
                           $j('[id="pageid:frmSearchContact:pbSearchContact"]').hide();
                          goNext();
                      }
                });
                
              });
       
       function Confirmfolio()
      {
            var count= 0;
            var totalFolio = $('.validfolio');
            for(var i = 0;i<totalFolio.length;i++){
                if($(totalFolio[i]).is(':checked')){
                    count++;
                }
            }
            if(count>1){
                alert('Please Select only one contact to attach.');
                return false;
           }
           else if(count == 0){
                alert('Please select at least one.');
                return false;
           }
           else{
             UpdateContactDetails();
             return false;
           }
      }     
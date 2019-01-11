    /*
  =====================================

   Project: Energy Root
   Author:  ''          

  =====================================
  */

  ;(function($, win, doc, undefined){

    "use strict";
    
    win.broadbandSF4 = win.broadbandSF4 || {};    

     broadbandSF4.elements = {
		vertBx : $('#vertBx')
    };
  
    broadbandSF4.tools = {
   
    ttip : function(tObg,cont) {      
      tObg.hover(    
        function() {
		var tipTxt = $.trim($(this).find(cont).html());
        $("div#ttip").stop().remove();  
        var po=$(this).offset();
        
            if(tipTxt != ''){
              
              //this.title = '';
              $( '<div id="ttip"><div class="tiptxt">' + tipTxt + '</div><span></span></div>' ).appendTo('body');    
              $('div#ttip').css({'display':'block','visibility':'hidden','opacity':'0'});
                  
              var aw=$('div#ttip').width();
              var xP=($(window).width()-po.left);
              var yP=(po.top - $(window).scrollTop());
              var aL =  xP < aw ? po.left-(aw+5) : po.left+5;
              var ah=$('div#ttip').outerHeight(false);
              var aT = yP >= ah  ?  po.top-(ah-8) : po.top+20;
              var lp={top:aT,left:aL}
              
              var yAP =  yP >= ah ? 'B' : 'T' ;
              var xAP =  xP < aw ? 'R' : 'L' ;
              
              $('div#ttip').addClass('aro'+yAP+xAP);          
              $('div#ttip').stop().animate({'opacity':1},200);        
              $('div#ttip').css(lp);
              $('div#ttip').css('visibility','visible');        
              
              
            }
            
        },
        function() {
          $('div#ttip').stop().animate({'opacity':0},200,function(){$("div#ttip").remove();});  
           
        }
      )
    }    
      
    }
    
	broadbandSF4.init = function(){
	

		function isTouchDevice() { return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);}
		
		broadbandSF4.tools.ttip($('.vtip'),'span');
		broadbandSF4.tools.ttip($('.search_ico'),'.cont');
		
		broadbandSF4.elements.vertBx.find('a').click(function(){
			broadbandSF4.elements.vertBx.find('li').removeClass('active');
			$(this).parent().addClass('active');
		});
		
		
		$('.verticalTxt').text($('#vertBx li.active').find('a').text());
		
		var actvert=$('#vertBx li.active').index();
		$('#mobSV').find('a').eq(actvert).addClass('active').siblings().removeClass('active');
		
		/* Refine */
		
		$('#sortBy').find('li').click(function(){ 
		$(this).addClass('crnt').siblings().removeClass('crnt');
		});
		
		$('#mobSV').find('a').click(function(){	
		broadbandSF4.elements.vertBx.find('a').eq($(this).index()).trigger('click');
		var actvert=$('#vertBx li.active').index();
		$('#mobSV').find('a').eq(actvert).addClass('active').siblings().removeClass('active');
		});
		
				
		$('.refine').on('click',function(){ 
			var rbxHgt = Math.max($('#refineCnt').height(),$('#rsltBx').height());
			if($('.rfnSho').length>0){
				$('#rsltWrp').removeAttr('style').removeClass('rfnSho');
			}else{
				$('#rsltWrp').css('height',rbxHgt).addClass('rfnSho');
			}
		});
		$('#refine').on('swipeleft',function() { $('#rsltWrp').removeClass('rfnSho');});

		$('.rslt').on('click',function(){
		if($('.rfnSho').length>0){
				$('#rsltWrp').removeAttr('style').removeClass('rfnSho');
			}
		});


  /* Compare Fav */
  
    function tog_comLi(oNem){
        var liInd=oNem.parents('.rsltli').parent().index();
       $('.rslt > li').eq(liInd).toggleClass('compLi');
    }
    
   // function spon(obj){return obj.parents('.planBx').parent().hasClass('sponWrp')}
    function fvI(obj){return obj.parents('.rsltli').parent().index()}
    function fvMsg(obj){return !obj.hasClass('favAct') ? 'Add to your top picks' : 'Remove from top picks'}
    
    function pvdr(obj){return obj.parents('.rsltli').find('.logoWrp img').attr('alt');}
    function pPlan(obj){return obj.parents('.rsltli').find('.logoWrp b').text();}
    
    function favInfo(){
		if($('.rslt .favAct').length>0){
			$('#comBxCnt').removeClass('disAbl');
		}else{
			$('#comBxCnt').addClass('disAbl');
		}
		if($('.rslt .favAct').length>1){
			$('.btn_comp').removeClass('disAbl')
		}else{
			$('.btn_comp').addClass('disAbl');
		}
	}
    
    function fav_addDel(obj){
      if($('#pick'+fvI(obj)).length==0){
        $( '<div class="pick" id="pick'+ fvI(obj) +'"><i></i><b>' + pvdr(obj) + '</b>' + pPlan(obj) + '</div>' ).appendTo('#comBxCnt .div100p');		
      }else{
        $('#pick'+fvI(obj)).remove();
      }
    }
    function favCount(){return $('.count').text($('.rslt .favAct').length)}
    
    $('.rslt .favAct').each(function(){
    
      favCount();

      tog_comLi($(this));  
      fav_addDel($(this));
      
    });
    
    function favFn(obj){
    
	  // $('.crsl').find('li:eq('+fvI(obj)+') .fav').toggleClass('favAct');         
	  $('.rslt > li').eq(fvI(obj)).find('.fav').toggleClass('favAct');
        
	// Modification done till above line	
       
        tog_comLi(obj);
        favInfo();
        fav_addDel(obj);
        
        obj.next().text(fvMsg(obj));
        
        if($('.compPage').length>0 && $('.rslt .favAct').length<1){
        $('#cntWrp').removeClass('compPage');
        $('.rslt_wrp').removeClass('rSpon');
        }
        
    }
    
    favInfo();
    
    var fvNo=4;

	/*
    $(window).on('resize',function(){
      clearTimeout(disCH);
	  disCH = setTimeout(function(){
      },750);     
    });
    */
    
    var action;
    $(document).on('click', '.vDtls .fav', function(){ 
    
   // $('.vDtls .fav').on('click',function(){
      var obj=$(this);
 
      
      if($('.rslt .favAct').length<fvNo){        
		
			if($(this).hasClass('favAct')){
			action='remove';
			}else{
			action='add';
			}

			jQuery.ajax({
			url:'/pages/utilities_topPicks_ajax.dot?id='+this.id+'&action='+action
			}); 
		
		favFn(obj);
		
      }else{
	  
			$('.fav_err').text('Add to your top picks').removeClass('fav_err');
			$(this).next().addClass('fav_err');
			$('.fav_err').text('Only 4 plans can be selected at any one time');
			
			jQuery.ajax({
			url:'/pages/utilities_topPicks_ajax.dot?id='+this.id+'&action=remove'
			});	
			if($(this).hasClass('favAct')){
			favFn(obj);                
			} 

      }
      favCount();       
    });
    
      
    $('.btn_favClear').on('click',function(){
      $('#cntWrp').removeClass('compPage');    
      $('.rslt').find('.fav').removeClass('favAct');
      favCount();
      $('.rslt > li').removeClass('compLi');
      $('.pick').remove();
      favInfo();
      jQuery.ajax({
      url:'/pages/utilities_topPicks_ajax.dot?action=removeAll'
      });
    });
    
    $('.btn_comp,.favBtn').on('click',function(){    
		if($('.rslt .favAct').length > 1){
			$('#cntWrp').addClass('compPage');
		}      
    });

    $('.btn_back').on('click',function(){
      $('#cntWrp').removeClass('compPage');
	});  
		
	/* End of Compare Fav */

	
	/* Details page */

    function tabs(tb){
    tb.find('a').on('click',function(){
    tb.find('a').removeClass('active');
    $(this).addClass('active');
    tb.next().children('.cnt').hide();
    tb.next().children('.cnt').eq($(this).index()).show();
    });
    }  
    tabs($('#dtls_tab'));	
  
	}

  $(function(){
    broadbandSF4.init();
  });

  })(jQuery, window, document);
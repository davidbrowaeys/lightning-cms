/*
=====================================

 Project:  iSelect Global Script
 Author:   Lee McNamara

=====================================
*/

;if(!window.console){
	console = {
		log : function(msg){},
		debug : function(msg){},
		info : function(msg){},
		warn : function(msg){},
		error : function(msg){}
    };
}

;(function ( $, win, doc, undefined ){

  "use strict";

	win.iSelect = win.iSelect || {};

	iSelect.elements = {
		lightbox 				: $(".lightbox"),

		//Default Datepicker
		datepicker				: $(".datepicker"),
		today					: new Date(),

		//AHM Datepickers
		datepicker_ahmStartDate	: $("#datepicker_ahmStartDate"),
		datepicker_ahmMaxDate	: $("#datepicker_ahmMaxDate"),
		datepicker_ahmCC		: $("#datepicker_ahmCC"),
		datepicker_ahmDD		: $("#datepicker_ahmDD"),
		//TUH Datepickers
		datepicker_TUH			: $(".datepicker_TUH"),

		//Call Schedular Datepicker
		datepicker_callSchedular: $("#datepicker_callSchedular"),
		//phone number
		phone_us				: $("#phone-us")
	};

	iSelect.regex = {
		pattern : function(type, flag){
			switch(type){
				case "numbers" : {
					return new RegExp("^[0-9]+$", flag);
					break;
				};
				case "alpha" : {
					return new RegExp("^[a-zA-Z]+$", flag);
					break;
				};
				case "alphaNumeric" : {
					return new RegExp("^[a-zA-Z0-9]+$", flag);
					break;
				};
				case "noSpecialCharaters" : {
					return new RegExp("^[\-\.\&\$\*\^\%\#\@\!\-\_\=\+\(\)\`\~\\\"\;\:\'\>\<\,\}\{\[\]\|\?\/]+$", flag);
					break;
				};
			};
		}
	};

	iSelect.tools = {
		calculateAgeFromDob : function(day, month, year, LHC){
			var startDob = day + "/" + month + "/" + year, today;
			if(LHC){
				var currentDate = new Date(),
				    currentMonth = currentDate.getMonth();
				if (currentMonth>5){
					today = new Date(currentDate.getFullYear(), "6", "1");
					}
				else{
					today = new Date(currentDate.getFullYear()-1, "6", "1");
				}
			}
			else{
				today = new Date();
			}
			var dob = startDob,
				d = dob.split("/"),
				by = Number(d[2]),
				bm = Number(d[1])-1, 
				bd = Number(d[0]),
				bday = new Date(by,bm,bd),
				age = 0,
				dif = bday;
			while(dif <= today){
				dif = new Date(by+age,bm,bd);
				age++;
			}
			age += -2;
			if(LHC){
				if(year === "1934" && month === "7" && day === "1"){
					return age;
				}
				else if(age > 30 && age < 80){
					return age;
				}
				else if(age >= 80){
					return age;
				}
				else{
					return age;
				}
			}
			else{
				return age;
			}
		},
		stripAmpersand : function(str, replaceWith){
			var strippedString = str.replace(/&/g, replaceWith);
			return strippedString;
		}
	};

	iSelect.omniture = {
		customLinkTracking : function(prop40, type, eventNumber, linkName){
			try{
				var s = s_gi(s_account);
				s.linkTrackVars = "events,prop40";
				s.linkTrackEvents = eventNumber;
				s.prop40 = prop40;
				s.events = eventNumber;
				s.tl(this, type, linkName);
			}
			catch(e){}
		},
		
		clickCallTracking : function(){
			var s = s_gi(s_account);
			s.linkTrackVars = "events";
			s.linkTrackEvents = "event14";
			s.events="event14";
			s.tl(this, "o", "click and call");
		}
	};

	iSelect.datepickers = {

		//Defaults
		dob 					: {selectMonths: true, min: -36524, max: -6574, selectYears: 100},
		weekdaysOnly 			: {disable: [1, 7], min: true, selectMonths: true, selectYears: true},
		weekdaysOnlyMax30		: {disable: [1, 7], min: true, max: 30, selectMonths: false, selectYears: false},
		startDate90Days			: {min: true, max: 90, selectMonths: true, selectYears: true},
		startDate45Days			: {min: true, max: 45, selectMonths: true, selectYears: true},
		startDate30Days			: {min: true, max: 30, selectMonths: true, selectYears: true}
		
	};

	iSelect.init = function(){

		// Light-box initialization
		iSelect.elements.lightbox.iSelectMagnific();

		// Date-picker initialization
		iSelect.elements.datepicker.pickadate(
			$.extend({
				format: "dd/mm/yyyy", 
				formatSubmit: "dd/mm/yyyy"
			}, iSelect.datepickers[iSelect.elements.datepicker.data("datepicker")] || {})
		);

		//AHM datepicker logic
		iSelect.elements.datepicker_ahmStartDate.pickadate({format:"dd/mm/yyyy", formatSubmit:"dd/mm/yyyy", min:true, max:90});
		iSelect.elements.datepicker_ahmMaxDate.pickadate({format:"dd/mm/yyyy", formatSubmit:"dd/mm/yyyy", min:true, max:30});
		iSelect.elements.datepicker_ahmCC.pickadate({
			format:"dd/mm/yyyy", 
			formatSubmit:"dd/mm/yyyy", 
			min:true, 
			max:parseInt(iSelect.elements.today.numberOfDaysInMonth() - iSelect.elements.today.getDate()),
			disable: [
				1,7,
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),28],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),29],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),30],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),31],
  			]
  		});
		iSelect.elements.datepicker_ahmDD.pickadate({
			format:"dd/mm/yyyy", 
			formatSubmit:"dd/mm/yyyy", 
			min:3, 
			max:parseInt(iSelect.elements.today.numberOfDaysInMonth() - iSelect.elements.today.getDate()),
			disable:[
				1,7,
				[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),28],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),29],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),30],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),31]
			]
		});

		//Call Schedular datepicker logic
		iSelect.elements.datepicker_callSchedular.pickadate({
			format:"dd/mm/yyyy", 
			formatSubmit:"dd/mm/yyyy", 
			min:true, 
			max:14,
			disable:[
				1, //Sunday
				[iSelect.elements.today.getFullYear(),0,1], 	//January
    			[iSelect.elements.today.getFullYear(),0,26], 	//January
    			[iSelect.elements.today.getFullYear(),2,9], 	//March
    			[iSelect.elements.today.getFullYear(),3,3], 	//April
    			[iSelect.elements.today.getFullYear(),3,4], 	//April
    			[iSelect.elements.today.getFullYear(),3,6], 	//April
    			[iSelect.elements.today.getFullYear(),3,25], 	//April
    			[iSelect.elements.today.getFullYear(),5,8],		//June
    			[iSelect.elements.today.getFullYear(),10,3], 	//November
    			[iSelect.elements.today.getFullYear(),11,25], 	//December
    			[iSelect.elements.today.getFullYear(),11,26], 	//December
    			[iSelect.elements.today.getFullYear(),11,28]	//December
			]
		});

		//Call TUH datepicker logic
		iSelect.elements.datepicker_TUH.pickadate({
			format:"dd/mm/yyyy", 
			formatSubmit:"dd/mm/yyyy", 
			min:1, 
			max:45,
			disable:[
				1, 7,//Satuday Sunday
				[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),28],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),29],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),30],
    			[iSelect.elements.today.getFullYear(),iSelect.elements.today.getMonth(),31]
			]
		});

		// Global components
		iSelect.navigationModule();
		iSelect.secondaryNavigationModule();

		// Form behaviour
		iSelect.enhanceFormInputs();
		iSelect.formBehaviour();

		// Touch and mobile support
		iSelect.touchSupport();
		iSelect.responsiveMenu();

		iSelect.elements.phone_us.bind('touchend', function(){
			iSelect.omniture.clickCallTracking();
		});
	};

	$(function(){

		iSelect.init();

	});

})( jQuery, window, document );

Date.prototype.numberOfDaysInMonth = function(){
	var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
	return d.getDate();
};
var total = 0
var breakdown = [];
var text = "";
var tempbonus = 0;
var delim = " + ";

jQuery(document).ready(function($){
	//CHANGE FUNCTIONS
	$("#art").change(function() {
		$("#artamount").toggle();
		$("#animhold").toggle();
		showBonuses();
		showBonuses2();
	});
	$("#lit").change(function() {
		$("#words").toggle();
		showBonuses();
	});
	$("#activity").change(function() {
		$("#activitytype").toggle();
		activitySetup();
	});
	$("#quest").change(function() {
		$("#questtype").toggle();
		activitySetup();
	});
	$("#anim").change(function() {
		$("#animlevel").toggle();
	});
	$("#recol").change(function() {
		showBonuses();
	});
	$("input:radio[name=activitytype]").change(function() {
		activitySetup();
	});
	$("input:radio[name=questtype]").change(function() {
		activitySetup();
	});

	if (window.performance) {
		if (performance.navigation.type  === 1 ){
			reset();
		}
	}
	//Always calculate
	$("#all input").change(function() {
		calculate();
	});
	setup();
});

function calculate() {
	var thumbcode = $("#thumb").val();
	if (thumbcode == "") {
		thumbcode = ":thumb:";
	}
	
	text = "";
	tempbonus = 0;
	total = 0
	breakdown = [];
	
	if ($("#art").is(":checked")){
	//ART-ONLY
		if ($("#head").is(":checked")) {
		//HEADSHOT
			if ($("#recol").is(":checked")) {
				text = "recolored ";
				tempbonus = 1;
			} else {
				tempbonus = 1;
			}
			text += "headshot";
		} else {
		//FULLBODY
			if ($("#recol").is(":checked")) {
				text = "recolored ";
				tempbonus = 2;
			} else {
				tempbonus = 2;
			}
			text += "fullbody";
		}
		log();
		
		if (!($("#recol").is(":checked"))) {
			if ($("#col").is(":checked")) {
			//COLOR
				if ($("#head").is(":checked")) {
					tempbonus = 2;
				} else {
					tempbonus = 3;
				}
				text = "colored";
				log();
			}
			if ($("#shaded").is(":checked")) {
			//SHADING
				if ($("#head").is(":checked")) {
					tempbonus = 1;
				} else {
					tempbonus = 2;
				}
				text = "shaded";
				log();
			}
			
			//BACKGROUND
			if (($("#head").is(":checked")) || ($("#fullbody").is(":checked"))) {
				
				if ($("#bg").is(":checked")) {
					tempbonus = 2;
					text = "Finished background";
					log();
				}
				if ($("#landbg").is(":checked")) {
					tempbonus = 1;
					text = "Land Bonus";
					log();
				}
				if ($("#excepbg").is(":checked")) {
					tempbonus = 3;
					text = "Exceptional background";
					log();
				}
				if ($("#sketchbg").is(":checked")) {
					tempbonus = 1;
					text = "Sketch background";
					log();
				}
			}
		}
	}
	
	//BONUSES - not if recoloured art
	if (!(($("#art").is(":checked")) && ($("#recol").is(":checked")))) {
		
		//PERSONAL
			if ($("#personal").is(":checked")) {
				tempbonus = 1;
				text = "personal work";
				log();
			}
		
		
		//RIDER
		if ($("#rider").is(":checked")) {
			tempbonus = 2;
			text = "Companion";
			log();
		}
		
		//BONDED
		if ($("#bonded").is(":checked")) {
			tempbonus = 2;
			text = "Bonded Present";
			log();
		}
		
		//EXTRA Reos
		if ($("#extra").is(":checked")) {
			tempbonus = 2;
			text = "Added Reos";
			log();
		}
		
		//OTHER ARPG
		if ($("#arpg").is(":checked")) {
			tempbonus = 1;
			text = "Added ARPG";
			log();
		}
		
		//GUILD Reos
		if ($("#guildm").is(":checked")) {
			tempbonus = 1;
			text = "Guild Reos";
			log();
		}
		
		//INGIN PRESENT
		if ($("#ingin").is(":checked")) {
			tempbonus = 2;
			text = "Ingin Present";
			log();
		}
		
		//MAGIC AWAKENING
		if ($("#ma").is(":checked")) {
			tempbonus = 2;
			text = "Magic Awakening";
			log();
		}
		
		//MAGI PATH
		if ($("#magimagic").is(":checked")) {
			tempbonus = 1;
			text = "Magic Present (Magi)";
			log();
		}
		
		//SPELLMASTER
		if ($("#spellmaster").is(":checked")) {
			tempbonus = 2;
			text = "Magic Present (Spellmaster)";
			log();
		}
		
		//QUESTING
		if ($("#quest").is(":checked")) {
			var questtype = $("input:radio[name=questtype]:checked").attr('id');
			switch (questtype){
				case "icq":
					tempbonus = 2;
					text = "Initial Class Quest";
					break;
				case "mq":
					tempbonus = 1;
					text = "Magic Quest";
					break;
				case "lcq":
					tempbonus = 1;
					text = "Low Class Quest";
					break;
				case "hcq":
					tempbonus = 2;
					text = "High Class Quest";
					break;
				default: break;
			}
			log();
		}
	
		
		//activity
		if ($("#activity").is(":checked")) {
			var activitytype = $("input:radio[name=activitytype]:checked").attr('id');
			switch (activitytype){
				case "hunt":
					tempbonus = 1;
					text = "Hunting";
					break;
				case "bonding":
					tempbonus = 1;
					text = "Bonding Stage";
					break;
				case "train":
					tempbonus = 1;
					text = "Training";
					break;
				case "trial":
					tempbonus = 2;
					text = "Purity Trial";
					break;
				case "rfh":
					tempbonus = 2;
					text = "Red Flag Hunt";
					break;
				case "sq":
					tempbonus = 2;
					text = "Storyline Quest";
					break;
				case "month":
					tempbonus = 1;
					text = "Monthly Prompt";
					break;
				default: break;
			}
			log();
		}
		
		//ANIMATION - art only
		if (($("#art").is(":checked")) && ($("#anim").is(":checked"))) {
			var animlevel = $("input:radio[name=animlevel]:checked").attr('id');
			switch (animlevel) {
				case "simple":
					tempbonus = 1;
					text = "simple";
					break;
				case "average":
					tempbonus = 5;
					text = "average";
					break;
				case "complex":
					tempbonus = 10;
					text = "complex";
					break;
				default: break;
			}
			text += " animation";
			log();
		}
	}
	
	//LIT
	if (($("#lit").is(":checked")) && ($('#wc').val() != "")){
		var wordcount = $('#wc').val();
		wordcount = wordcount.replace(/\s/g,"");
		wordcount = parseInt(wordcount);
		if ($('#wc').val() == "") {
			wordcount = 0;
		} else if (isNaN(wordcount)) {
			wordcount = 0;
		} else {
			tempbonus = Math.floor(wordcount/100);
		}
		text = wordcount + " words";
		log();
	}

	//TOTAL	
	if (($("#chibi").is(":checked")) && (total != 0)){
		total = total/2;
		var extra = Math.abs(total - Math.floor(total) - 0.5);
		if (extra < 0.5) {
			total = total - extra;
		}
		text = "simplified: /2";
		breakdown.push(text);
	}
	
	var breakdowntext = "";
	var spacer = "\n";
	if ($("#oneline").is(":checked")) {
		spacer = " | ";
	}
	for (i=0; i<breakdown.length; i++){
		if (isNaN(breakdown[i].charAt(0))) {
			breakdown[i] = breakdown[i].charAt(0).toUpperCase() + breakdown[i].slice(1);
		}
		breakdowntext += breakdown[i];
		if (i<breakdown.length-1) {
			breakdowntext += spacer;
		}
	}
	
	breakdowntext = thumbcode + "\n" + breakdowntext + "\n<b>Total = " + total + "</b>";
	
	if (($("#art").is(":checked")) || (($("#lit").is(":checked")) && ($("#wc").val() != ""))) {
		$("#points").val(breakdowntext);
	} else {
		$("#points").val("");
	}
}

function log() {
	text = text + delim + tempbonus;
	total += tempbonus;
	breakdown.push(text);
}

function setup() {
	$('#artamount').hide();
	$("#animhold").hide();
	$('#words').hide();
	$('#activitytype').hide();
	$('#questtype').hide();
	$('#animlevel').hide();
	showBonuses();
	showBonuses2();
	activitySetup();
	questSetup();
	calculate();
}

function activitySetup() {	
}
function questSetup() {
}

function showBonuses() {
	if (($("#art").is(":checked")) && ($("#recol").is(":checked"))) {
		$("#bonuses").attr("disabled", true);
		$("#shaded").attr("disabled", true);
		$("#bg").attr("disabled", true);
		$("#landbg").attr("disabled", true);
		$("#excepbg").attr("disabled", true);
		$("#sketchbg").attr("disabled", true);
		$("#lit").attr("disabled", true);
	} else {
		$("#bonuses").attr("disabled", false);
		$("#shaded").attr("disabled", false);
		$("#bg").attr("disabled", false);
		$("#landbg").attr("disabled", false);
		$("#excepbg").attr("disabled", false);
		$("#sketchbg").attr("disabled", false);
		$("#lit").attr("disabled", false);
	}
}
function showBonuses2() {
	if (($("#art").is(":checked")) && ($("#head").is(":checked"))) {
		$("#bonuses").attr("disabled", true);
	} else {
		$("#bonuses").attr("disabled", false);
	}
}

function reset() {
	$("#cpcount")[0].reset();
	$('#points').val("");
	$('#thumb').val("");
	setup();
	$('#thumb').focus();
	return false;
}
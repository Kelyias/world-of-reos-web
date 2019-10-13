var total = 0;
var breakdown = [];
var text = "";
var payout = 0;
var delim = " : ";

jQuery(document).ready(function($){
	//Always calculate
	$("#all input").change(function() {
		calculate();
	});
	setup();
});

function calculate() {
	var genotype = $("#geno").val();
	var link = $("#link").val();
	if (genotype === "") {
		genotype = "";
	}
	
	text = "";
	payout = 0;
	total = 0;
	breakdown = [];
	
	if ($("#releasing").is(":checked")) {
				text = "<b>Releasing Geno</b> ";
		log();
	}
	if ($("#donating").is(":checked")) {
				text = "<b>Donating Geno</b> ";
		log();
	}
	
	if ($("#runner").is(":checked")) {
				text = "Runner ";
				payout = 500;
		log();
	}
	
	if ($("#puller").is(":checked")) {
				text = "Puller ";
				payout = 600;
		log();
	}
	
	if ($("#chaser").is(":checked")) {
				text = "Chaser ";
				payout = 600;
		log();
	}
	if ($("#tyrian").is(":checked")) {
				text = "Tyrian ";
				payout = 1000;
		log();
	}
	if ($("#comeye").is(":checked")) {
				text = "Common Eye ";
				payout = 100;
		log();
	}
	if ($("#uncomeye").is(":checked")) {
				text = "Uncommon Eye ";
				payout = 300;
		log();
	}
	if ($("#rareye").is(":checked")) {
				text = "Rare Eye ";
				payout = 500;
		log();
	}
	if ($("#vrareye").is(":checked")) {
				text = "Very Rare Eye ";
				payout = 800;
		log();
	}
	if ($("#comear").is(":checked")) {
				text = "Common Ear ";
				payout = 100;
		log();
	}
	if ($("#uncomear").is(":checked")) {
				text = "Uncommon Ear ";
				payout = 300;
		log();
	}
	if ($("#rarear").is(":checked")) {
				text = "Rare Ear ";
				payout = 500;
		log();
	}
	if ($("#vrarear").is(":checked")) {
				text = "Very Rare Ear ";
				payout = 800;
		log();
	}
	
	if ($("#comtail").is(":checked")) {
				text = "Common Tail ";
				payout = 100;
		log();
	}
	if ($("#uncomtail").is(":checked")) {
				text = "Uncommon Tail ";
				payout = 300;
		log();
	}
	if ($("#rartail").is(":checked")) {
				text = "Rare Tail ";
				payout = 500;
		log();
	}
	if ($("#vrartail").is(":checked")) {
				text = "Very Rare Tail ";
				payout = 800;
		log();
	}
	
	if ($("#lisse").is(":checked")) {
				text = "Lisse ";
				payout = 0;
		log();
	}
	if ($("#friese").is(":checked")) {
				text = "Friese ";
				payout = 300;
		log();
	}
	if ($("#duveteux").is(":checked")) {
				text = "Duveteux ";
				payout = 500;
		log();
	}
	if ($("#angora").is(":checked")) {
				text = "Angora ";
				payout = 1000;
		log();
	}
	if ($("#magical").is(":checked")) {
				text = "Magical Mutation ";
				payout = 10000;
		log();
	}
	if ($("#mutation").is(":checked")) {
				text = "Non-Magic Mutation ";
				payout = 5000;
		log();
	}
	
	if (($("#commmark").is(":checked")) && ($('#comnum').val() != "")){
		var commarks = $('#comnum').val();
		commarks = commarks.replace(/\s/g,"");
		commarks = parseInt(commarks);
		if ($('#comnum').val() == "") {
			commarks = 0;
		} else if (isNaN(commarks)) {
			commarks = 0;
		} else {
			payout = Math.floor(commarks*100);
		}
		text = "<b>Common Markings</b> x" + $('#comnum').val(); + commarks;
		log();
	}
	
	if (($("#domcomm").is(":checked")) && ($('#domcomnum').val() != "")){
		var domcommarks = $('#domcomnum').val();
		domcommarks = domcommarks.replace(/\s/g,"");
		domcommarks = parseInt(domcommarks);
		if ($('#domcomnum').val() == "") {
			domcommarks = 0;
		} else if (isNaN(domcommarks)) {
			domcommarks = 0;
		} else {
			payout = Math.floor(domcommarks*200);
		}
		text = "<b>Dominant Common Markings</b> x" + $('#domcomnum').val(); + domcommarks;
		log();
	}
	
	if (($("#uncommmark").is(":checked")) && ($('#uncomnum').val() != "")){
		var uncommarks = $('#uncomnum').val();
		uncommarks = uncommarks.replace(/\s/g,"");
		uncommarks = parseInt(uncommarks);
		if ($('#uncomnum').val() == "") {
			uncommarks = 0;
		} else if (isNaN(uncommarks)) {
			uncommarks = 0;
		} else {
			payout = Math.floor(uncommarks*500);
		}
		text = "<b>Uncommon Markings</b> x" + $('#uncomnum').val(); + uncommarks;
		log();
	}
	
	if (($("#domuncommmark").is(":checked")) && ($('#domuncomnum').val() != "")){
		var domuncommarks = $('#domuncomnum').val();
		domuncommarks = domuncommarks.replace(/\s/g,"");
		domuncommarks = parseInt(domuncommarks);
		if ($('#domuncomnum').val() == "") {
			domuncommarks = 0;
		} else if (isNaN(domuncommarks)) {
			domuncommarks = 0;
		} else {
			payout = Math.floor(domuncommarks*500);
		}
		text = "<b>Dominant Uncommon Markings</b> x" + $('#domuncomnum').val(); + domuncommarks;
		log();
	}
	
	if (($("#raremark").is(":checked")) && ($('#rarnum').val() != "")){
		var raremarks = $('#rarnum').val();
		raremarks = raremarks.replace(/\s/g,"");
		raremarks = parseInt(raremarks);
		if ($('#rarnum').val() == "") {
			raremarks = 0;
		} else if (isNaN(raremarks)) {
			raremarks = 0;
		} else {
			payout = Math.floor(raremarks*1000);
		}
		text = "<b>Rare Markings</b> x" + $('#rarnum').val(); + raremarks;
		log();
	}
	
	if (($("#domraremark").is(":checked")) && ($('#domrarnum').val() != "")){
		var domraremarks = $('#domrarnum').val();
		domraremarks = domraremarks.replace(/\s/g,"");
		domraremarks = parseInt(domraremarks);
		if ($('#domrarnum').val() == "") {
			domraremarks = 0;
		} else if (isNaN(domraremarks)) {
			domraremarks = 0;
		} else {
			payout = Math.floor(domraremarks*2000);
		}
		text = "<b>Dominant Rare Markings</b> x" + $('#domrarnum').val(); + domraremarks;
		log();
	}
	
	if (($("#passmod").is(":checked")) && ($('#passnum').val() != "")){
		var passmods = $('#passnum').val();
		passmods = passmods.replace(/\s/g,"");
		passmods = parseInt(passmods);
		if ($('#passnum').val() == "") {
			passmods = 0;
		} else if (isNaN(passmods)) {
			passmods = 0;
		} else {
			payout = Math.floor(passmods*500);
		}
		text = "<b>Passable Modifer</b> x" + $('#passnum').val(); + passmods;
		log();
	}
	
	if (($("#dompassmod").is(":checked")) && ($('#dompassnum').val() != "")){
		var dompassmods = $('#dompassnum').val();
		dompassmods = dompassmods.replace(/\s/g,"");
		dompassmods = parseInt(dompassmods);
		if ($('#dompassnum').val() == "") {
			dompassmods = 0;
		} else if (isNaN(dompassmods)) {
			dompassmods = 0;
		} else {
			payout = Math.floor(dompassmods*1000);
		}
		text = "<b>Dominant Passable Modifer</b> x" + $('#dompassnum').val(); + dompassmods;
		log();
	}
	
	if (($("#nonpassmod").is(":checked")) && ($('#nonpassnum').val() != "")){
		var nonpassmods = $('#nonpassnum').val();
		nonpassmods = nonpassmods.replace(/\s/g,"");
		nonpassmods = parseInt(nonpassmods);
		if ($('#nonpassnum').val() == "") {
			nonpassmods = 0;
		} else if (isNaN(nonpassmods)) {
			nonpassmods = 0;
		} else {
			payout = Math.floor(nonpassmods*500);
		}
		text = "<b>Non-Passable Modifer</b> x" + $('#nonpassnum').val(); + nonpassmods;
		log();
	}
	
	if (($("#comskill").is(":checked")) && ($('#comskillnum').val() != "")){
		var comskills = $('#comskillnum').val();
		comskills = comskills.replace(/\s/g,"");
		comskills = parseInt(comskills);
		if ($('#comskillnum').val() == "") {
			comskills = 0;
		} else if (isNaN(comskills)) {
			comskills = 0;
		} else {
			payout = Math.floor(comskills*100);
		}
		text = "<b>Common Skills</b> x" + $('#comskillnum').val(); + comskills;
		log();
	}
	
	if (($("#uncomskill").is(":checked")) && ($('#uncomskillnum').val() != "")){
		var uncomskills = $('#uncomskillnum').val();
		uncomskills = uncomskills.replace(/\s/g,"");
		uncomskills = parseInt(uncomskills);
		if ($('#uncomskillnum').val() == "") {
			uncomskills = 0;
		} else if (isNaN(uncomskills)) {
			uncomskills = 0;
		} else {
			payout = Math.floor(uncomskills*500);
		}
		text = "<b>Uncommon Skills</b> x" + $('#uncomskillnum').val(); + uncomskills;
		log();
	}
	
	if (($("#rareskill").is(":checked")) && ($('#rareskillnum').val() != "")){
		var rareskills = $('#rareskillnum').val();
		rareskills = rareskills.replace(/\s/g,"");
		rareskills = parseInt(rareskills);
		if ($('#rareskillnum').val() == "") {
			rareskills = 0;
		} else if (isNaN(rareskills)) {
			rareskills = 0;
		} else {
			payout = Math.floor(rareskills*1000);
		}
		text = "<b>Rare Skills</b> x" + $('#rareskillnum').val(); + rareskills;
		log();
	}
	


	//TOTAL	
	
	var breakdowntext = "";
	var spacer = "\n";

	for (i=0; i<breakdown.length; i++){
		if (isNaN(breakdown[i].charAt(0))) {
			breakdown[i] = breakdown[i].charAt(0).toUpperCase() + breakdown[i].slice(1);
		}
		breakdowntext += breakdown[i];
		if (i<breakdown.length-1) {
			breakdowntext += spacer;
		}
	}
	
	breakdowntext = "<b>Geno:</b>" + "\n" + genotype + "\n" + "<b>Link to Geno:</b>" + link + "\n" + breakdowntext + "\n<b>Total = " + total + "</b>";
	
	if (($("#geno").val() != (""))) {
		$("#krones").val(breakdowntext);
	} else {
		$("#krones").val("");
	}

}

function log() {
	text = text + delim + payout;
	total += payout;
	breakdown.push(text);
}

function setup() {
	calculate();
}



function reset() {
	$("#payout")[0].reset();
	$('#geno').val("");
	$('#link').val("");
	setup();
	$('#geno').focus();
	return false;
}
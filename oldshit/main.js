/////////////////////////////////////////////////////////////////////////
//------------------------------GENO ECHO------------------------------//
/////////////////////////////////////////////////////////////////////////
function genoEcho(selectedGeno){

	var genoFaulty = false;

	var affectedParent = selectedGeno.id.slice(0, -4);															//dadgeno/mumgeno --> dad/mum
	var affectedGeno = selectedGeno.id;																							//dadgeno/mumgeno
	var affectedGenoCheck = selectedGeno.id + "check";															//dadgenocheck/mumgenocheck

	document.getElementById(affectedGenoCheck).value = "";

	var genoInput = document.getElementById(affectedGeno).value;										//gets whole string in input

	var genoInputColour = genoInput.substring(0, genoInput.indexOf("+"));
	var genoInputMarkings = genoInput.substring(genoInput.indexOf("+") +1);
	genoInputMarkings = genoInputMarkings.split("/");


	var genoInputColourCheck = false;
	for (i = 0; i < coatColours.length; i++){
		if(genoInputColour == coatColours[i]){
			genoInputColourCheck = true;
		}
	}

	if(genoInputColourCheck == false){
		document.getElementById(affectedGenoCheck).value = "<<" + genoInputColour + ">>/";
		genoFaulty = true;
	}
	else{
		document.getElementById(affectedGenoCheck).value = genoInputColour + "+";
	}

	var genoInputMarkingsCheck = [];
	for (i = 0; i < genoInputMarkings.length; i++){
		genoInputMarkingsCheck[i] = false;
		for (j = 0; j < mar.length; j++){
			if(genoInputMarkings[i] == mar[j].rec){
				genoInputMarkingsCheck[i] = true;
			}
			else if(genoInputMarkings[i] == mar[j].dom){
				genoInputMarkingsCheck[i] = true;
			}
		}

		if(genoInputMarkingsCheck[i] == false){
			document.getElementById(affectedGenoCheck).value += "<<" + genoInputMarkings[i] + ">>/";
			genoFaulty = true;
		}
		else{
			document.getElementById(affectedGenoCheck).value += genoInputMarkings[i] + "/";
		}
	}
	document.getElementById(affectedGenoCheck).value = document.getElementById(affectedGenoCheck).value.slice(0, -1);		//slices off last "/"

	if(genoFaulty == true){
		document.getElementById(affectedGenoCheck).style.color = "red";
		document.getElementById(affectedGenoCheck).style.textDecoration = "underline";				//"underline line-through overline";
	}
	else{
		document.getElementById(affectedGenoCheck).style.color = "green";
		document.getElementById(affectedGenoCheck).style.textDecoration = "";
	}


}

///////////////////////////////////////////////////////////////////////
//------------------------------TYRIANS------------------------------//
///////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
//REPLACE VAYRON HTML

var vayronHtmlType = ['\
	<option value="Runner" id="dadTypeRunner">Runner</option>\
	<option value="Chaser" id="dadTypeChaser">Chaser</option>\
	<option value="Puller" id="dadTypePuller">Puller</option>\
	']

var vayronHtmlEars = ['\
	<optgroup label="Common">\
		<option class="common" value="Long" id="dadEarLong">Long</option>\
		<option class="common" value="Vulpes" id="dadEarVulpes">Vulpes</option>\
		<option class="common" value="Bear" id="dadEarBear">Bear</option>\
	</optgroup>\
	<optgroup label="Uncommon">\
		<option class="uncommon" value="Sonar" id="dadEarSonar">Sonar</option>\
		<option class="uncommon" value="Fluffed" id="dadEarFluffed">Fluffed</option>\
		<option class="uncommon" value="Silken" id="dadEarSilken">Silken</option>\
		<option class="uncommon" value="Loopy" id="dadEarLoopy">Loopy</option>\
		<option class="uncommon" value="Draco" id="dadEarDraco">Draco</option>\
	</optgroup>\
	<optgroup label="Rare">\
		<option class="rare" value="Long Loopy" id="dadEarLongLoopy">Long Loopy</option>\
		<option class="rare" value="Rodent" id="dadEarRodent">Rodent</option>\
		<option class="rare" value="Clipped" id="dadEarClipped">Clipped</option>\
		<option class="rare" value="Large Draco" id="dadEarLargeDraco">Large Draco</option>\
		<option class="rare" value="Dumbo" id="dadEarDumbo">Dumbo</option>\
	</optgroup>\
	']

var vayronHtmlTail = ['\
	<optgroup label="Common">\
		<option class="common" value="Bob" id="dadTailBob">Bob</option>\
		<option class="common" value="Stump" id="dadTailStump">Stump</option>\
		<option class="common" value="Medium" id="dadTailMedium">Medium</option>\
		<option class="common" value="Short" id="dadTailShort">Short tuft</option>\
		<option class="common" value="Fox" id="dadTailFox">Fox</option>\
	</optgroup>\
	<optgroup label="Uncommon">\
		<option class="uncommon" value="Brush" id="dadTailBrush">Brush</option>\
		<option class="uncommon" value="Puff" id="dadTailPuff">Puff</option>\
		<option class="uncommon" value="Feline" id="dadTailFeline">Feline</option>\
		<option class="uncommon" value="No" id="dadTailNone">Tailless</option>\
	</optgroup>\
	<optgroup label="Rare">\
		<option class="rare" value="Large Puff" id="dadTailLargePuff">Large Puff</option>\
		<option class="rare" value="Equine" id="dadTailEquine">Equine</option>\
		<option class="rare" value="Long Tuft" id="dadTailLongTuft">Long Tuft</option>\
		<option class="rare" value="Base Brush" id="dadTailBaseBrush">Base Brush</option>\
		<option class="rare" value="Reptile" id="dadTailReptile">Reptile</option>\
	</optgroup>\
	<optgroup label="Very Rare">\
		<option class="veryrare" value="Papillon" id="dadTailPapillon">Papillon</option>\
		<option class="veryrare" value="Double Tuft" id="dadTailDoubleTuft">Double Tuft</option>\
		<option class="veryrare" value="Kitsune" id="dadTailKitsune">Kitsune</option>\
		<option class="veryrare" value="Spade" id="dadTailSpade">Spade</option>\
		<option class="veryrare" value="Whip" id="dadTailWhip">Whip</option>\
	</optgroup>\
	']

//////////////////////////////////////////////////
//--- REPLACE TYRIAN HTML ---

var tyrianHtmlType = ['\
	<option value="Empyrian" id="dadTypeEmpyrian">Empyrian</option>\
	']

var tyrianHtmlEars = ['\
	<optgroup label="Common">\
		<option class="common" value="Long" id="dadEarLong">Long</option>\
		<option class="common" value="Vulpes" id="dadEarVulpes">Vulpes</option>\
		<option class="common" value="Bear" id="dadEarBear">Bear</option>\
		<option class="common" value="Peep" id="dadEarPeep">Peep</option>\
	</optgroup>\
	<optgroup label="Uncommon">\
		<option class="uncommon" value="Sonar" id="dadEarSonar">Sonar</option>\
		<option class="uncommon" value="Fluffed" id="dadEarFluffed">Fluffed</option>\
		<option class="uncommon" value="Silken" id="dadEarSilken">Silken</option>\
		<option class="uncommon" value="Loopy" id="dadEarLoopy">Loopy</option>\
		<option class="uncommon" value="Draco" id="dadEarDraco">Draco</option>\
		<option class="uncommon" value="Feathered" id="dadEarFeathered">Feathered</option>\
	</optgroup>\
	<optgroup label="Rare">\
		<option class="rare" value="Long Loopy" id="dadEarLongLoopy">Long Loopy</option>\
		<option class="rare" value="Rodent" id="dadEarRodent">Rodent</option>\
		<option class="rare" value="Clipped" id="dadEarClipped">Clipped</option>\
		<option class="rare" value="Large Draco" id="dadEarLargeDraco">Large Draco</option>\
		<option class="rare" value="Dumbo" id="dadEarDumbo">Dumbo</option>\
		<option class="rare" value="Antennae" id="dadEarAntennae">Antennae</option>\
	</optgroup>\
	']

var tyrianHtmlTail = ['\
	<optgroup label="Common">\
		<option class="common" value="Tuft" id="dadTailTuft">Tuft</option>\
		<option class="common" value="Spade" id="dadTailSpear">Spear</option>\
		<option class="common" value="Flap" id="dadTailFlap">Flap</option>\
	</optgroup>\
	<optgroup label="Uncommon">\
		<option class="uncommon" value="Ribbed" id="dadTailRibbed">Ribbed</option>\
		<option class="uncommon" value="Ridged" id="dadTailRidged">Ridged</option>\
		<option class="uncommon" value="Quill" id="dadTailQuill">Quill</option>\
	</optgroup>\
	<optgroup label="Rare">\
		<option class="rare" value="Papillon" id="dadTailPersian">Persian</option>\
		<option class="rare" value="Frilled" id="dadTailFrilled">Frilled</option>\
		<option class="rare" value="Veil" id="dadTailVeil">Veil</option>\
	</optgroup>\
	<optgroup label="Very Rare">\
		<option class="veryrare" value="flat" id="dadTailflat">Flat</option>\
		<option class="veryrare" value="bulb" id="dadTailbulb">Bulb</option>\
		<option class="veryrare" value="cape" id="dadTaicape">Cape</option>\
		<option class="veryrare" value="club" id="dadTailclub">Club</option>\
		<option class="veryrare" value="sprout" id="dadTailsprout">Sprout</option>\
		<option class="veryrare" value="scorpion" id="dadTailscorpion">Scorpion</option>\
	</optgroup>\
	']

//////////////////////////////////////////////////
//REPLACE HTML
var typeToChange;
var earsToChange;
var tailToChange;

function replaceHtml(selectedSpecies){

	var affectedParent = selectedSpecies.id.slice(0, -1);												//dad1/mum1 --> dad/mum

	switch(affectedParent)																				//if dad/mum species changed --> change dad/mum HTML
	{
		case "dad":
			var typeToChange = document.getElementById("dad2");
			var earsToChange = document.getElementById("dad4");
			var tailToChange = document.getElementById("dad5");
			break;
		case "mum":
			var typeToChange = document.getElementById("mum2");
			var earsToChange = document.getElementById("mum4");
			var tailToChange = document.getElementById("mum5");
			break;
		default:
			alert("something went wrong with determining wether Sire or Dam need its HTML switched");
	}

	switch (selectedSpecies.value)																//switch depending on selected "dad1"; depending on that, adds new Options to "dad2"
	{
		case "Vayron" :
			typeToChange.innerHTML = vayronHtmlType
			earsToChange.innerHTML = vayronHtmlEars
			tailToChange.innerHTML = vayronHtmlTail
			break;
		case "Tyrian" :
			typeToChange.innerHTML = tyrianHtmlType
			earsToChange.innerHTML = tyrianHtmlEars
			tailToChange.innerHTML = tyrianHtmlTail
			break;
		default:
			alert("something went wrong with changing the Sire/Dam HTML");
	}
}

//////////////////////////////////////////////////
//Vayron Traits
var kidTraitVayron = ["kid4", "kid5", "kid6"]
	kidTraitVayron["kid4"] = ["common", "uncommon", "rare", "veryrare"];
		kidTraitVayron["kid4"]["common"] = 		["Long", "Vulpes", "Bear"];																								//common ears
		kidTraitVayron["kid4"]["uncommon"] = 	["Sonar", "Fluffed", "Silken", "Loopy", "Draco"];													//uncommon ears
		kidTraitVayron["kid4"]["rare"] = 		["Long Loopy", "Rodent", "Clipped", "Large Draco", "Dumbo"];								//rare ears
		kidTraitVayron["kid4"]["veryrare"] = 	[];																																				//veryrare ears

	kidTraitVayron["kid5"] = ["common", "uncommon", "rare", "veryrare"];
		kidTraitVayron["kid5"]["common"] = 		["Bob Tail", "Stump Tail", "Medium Tail", "Short Tuft Tail", "Fox Tail"];													//common tail
		kidTraitVayron["kid5"]["uncommon"] = 	["Brush Tail", "Puff Tail", "Feline Tail", "Tailless"];																				//uncommon tail
		kidTraitVayron["kid5"]["rare"] = 		["Large Puff Tail", "Equine Tail", "Long Tuft Tail", "Base Brush Tail", "Reptile Tail"];							//rare tail
		kidTraitVayron["kid5"]["veryrare"] = 	["Papillon Tail", "Double Tuft Tail", "Kitsune Tail", "Spade Tail", "Whip Tail"];									//veryrare tail

	kidTraitVayron["kid6"] = ["common", "uncommon", "rare", "veryrare"];
		kidTraitVayron["kid6"]["common"] = 		["Round", "Feline"];																											//common eyes
		kidTraitVayron["kid6"]["uncommon"] = 	["Goat", "Pupilless"];																										//uncommon eyes
		kidTraitVayron["kid6"]["rare"] = 		["Shaped", "Glowing"];																											//rare eyes
		kidTraitVayron["kid6"]["veryrare"] = 	[];																																				//veryrare eyes

//////////////////////////////////////////////////
//Tyrian Traits
var kidTraitTyrian = ["kid4", "kid5", "kid6"]
	kidTraitTyrian["kid4"] = ["common", "uncommon", "rare", "veryrare"];
		kidTraitTyrian["kid4"]["common"] = 		["Long", "Vulpes", "Bear", "Peep"];																				//common ears
		kidTraitTyrian["kid4"]["uncommon"] = 	["Sonar", "Fluffed", "Silken", "Loopy", "Draco", "Feathered"];						//uncommon ears
		kidTraitTyrian["kid4"]["rare"] = 		["Long Loopy", "Rodent", "Clipped", "Large Draco", "Dumbo", "Antennae"];		//rare ears
		kidTraitTyrian["kid4"]["veryrare"] = 	[];																																				//veryrare ears

	kidTraitTyrian["kid5"] = ["common", "uncommon", "rare", "veryrare"];
		kidTraitTyrian["kid5"]["common"] = 		["Tuft Tail", "Spear Tail", "Flap Tail"];																								//common tail
		kidTraitTyrian["kid5"]["uncommon"] = 	["Ribbed Tail", "Ridged Tail", "Quill Tail"];																						//uncommon tail
		kidTraitTyrian["kid5"]["rare"] = 		["Persian Tail", "Frilled Tail", "Veil Tail"];																						//rare tail
		kidTraitTyrian["kid5"]["veryrare"] = 	["Flat Tail", "Bulb Tail", "Cape Tail", "Sprout Tail", "Club Tail", "Scorpion Tail"];																																				//veryrare tail

	kidTraitTyrian["kid6"] = ["common", "uncommon", "rare", "veryrare"];
		kidTraitTyrian["kid6"]["common"] = 		["Round", "Feline"];																											//common eyes
		kidTraitTyrian["kid6"]["uncommon"] = 	["Goat", "Pupilless"];																										//uncommon eyes
		kidTraitTyrian["kid6"]["rare"] = 		["Shaped", "Glowing"];																											//rare eyes
		kidTraitTyrian["kid6"]["veryrare"] = 	[];																																				//veryrare eyes



///////////////////////////////////////////////////////////////////////////////
//------------------------------GENERAL VARIABLES------------------------------
var dadBreed = [];																		//creates empty dadBreed for dad <select> input
var dadRarity = [];

var mumBreed = [];																		//creates empty mumBreed for mum <select> input
var mumRarity = [];

var cubsNumber;
var kidGender = "";
var kidHealth = "";
var kidBreed = [];																		//creates empty kidBreed for passed on rolls (Type, Fur, Ears, Tail & Eyes)
var kidRarity = [];

var kidColourGeno = "";
var kidColourPheno = "";

var kidGeno = [];
var kidPheno = [];
var kidPhenoBefore = [];
var kidPhenoAfter = [];
var kidGenoGlint = [];
var kidPhenoGlint = [];

var kidNonPassable = "";
var kidMutation = "";
var kidMagicalTrait = "";
var skill = "";
//////////////////////////////////////////////////////////////////////
//------------------------------OUTPUT------------------------------//
//////////////////////////////////////////////////////////////////////
function litterMaker(){																	//on click on litterMaker, get all the <select> input and store it in the corresponding array

	inputParents();
	species();
	cubs();

	document.getElementById("litter").value = "";

	for(l = 1; l <= cubsNumber; l++) {

		gender();
		health();
		type();

		fur();
		traits();
		if((kidBreed[5] == 'undefined') || (kidBreed[4] == 'undefined')){
			traits();
		}

		colour();
		markingsDivision();

		nonPassable();
		mutationMagicalTrait();


		document.getElementById("litter").value += l + ") (" + kidGender + " - " + kidBreed[1] + " - " + kidBreed[2];
		document.getElementById("litter").value += " - " + kidHealth + ")" + "\n"
													+ "F: " + kidBreed[3] + " Coat" + "\n"
													+ "T: " + kidBreed[4] + " Ears, " + kidBreed[5] + ", " + kidBreed[6] + " Eyes" + "\n"
													+ "P: ";
													
													

		if(kidPhenoBefore.length > 0){	//if kidPhenoBefore has any elements
			document.getElementById("litter").value += kidPhenoBefore.join(" ") + " " ;
		}

		document.getElementById("litter").value += kidColourPheno;

		if(kidPhenoGlint.length > 0){	//if kidPhenoGlint has an element
			if(kidPhenoAfter.length == 0){	//if kidPhenoAfter has no element
				document.getElementById("litter").value += " with " + kidPhenoGlint.join(" ");
			}
			else if(kidPhenoAfter.length >= 1){	//if kidPhenoAfter has more than one element
				document.getElementById("litter").value += " with " + kidPhenoAfter.join(" ") + " and " + kidPhenoGlint.join(" ");
			}
		}
		else{
			if(kidPhenoAfter.length == 1){	//if kidPhenoAfter has exactly one element
				document.getElementById("litter").value += " with " + kidPhenoAfter.join(" ");
			}
			else if(kidPhenoAfter.length > 1){	//if kidPhenoAfter has more than one element
				document.getElementById("litter").value += " with " + kidPhenoAfter.splice(0, kidPhenoAfter.length - 1).join(" ") + " and " + kidPhenoAfter.splice(-1, 1);
			}
		}

		if(kidGenoGlint.length > 0){	//if kidGenoGlint has an element
			document.getElementById("litter").value += "\n" + "G: " + kidColourGeno + "+" + kidGeno.join("/") + "-" + kidGenoGlint.join("/");
		}
		else{
			document.getElementById("litter").value += "\n" + "G: " + kidColourGeno + "+" + kidGeno.join("/");
		}
		
		if((skill != "")){
			document.getElementById("litter").value += "\n" + skill;
		}
		
		if((kidMutation != "") || (kidMagicalTrait != "") || (kidNonPassable != "")){
			document.getElementById("litter").value += "\n" + kidNonPassable + kidMutation + kidMagicalTrait;
		}

		if(l < cubsNumber){
			document.getElementById("litter").value += "\n\n";
		}

		if(kidNonPassable == "[CHIMERA]"){

			colour();
			markingsDivision();

			var getKidLitter = ""
			oldKidLitter = document.getElementById("litter").value;
			keepKidLitter = oldKidLitter.substring(0, oldKidLitter.indexOf(l));
			getKidLitter = oldKidLitter.substring(oldKidLitter.indexOf(l));
			kidLitter = getKidLitter.split("\n");


			if(kidPhenoBefore.length > 0){
			kidLitter[3] += " // " + kidPhenoBefore.join(" ") + " " ;
			}

			if(kidPhenoBefore.length == 0){
			kidLitter[3] += " // " + kidColourPheno;
			}
			else{
			kidLitter[3] += kidColourPheno;
			}

			if(kidPhenoGlint.length > 0){
				if(kidPhenoAfter.length == 0){
					kidLitter[3] += " with " + kidPhenoGlint.join(" ");
				}
				else if(kidPhenoAfter.length >= 1){
					kidLitter[3] += " with " + kidPhenoAfter.join(" ") + " and " + kidPhenoGlint.join(" ");
				}
			}
			else{
				if(kidPhenoAfter.length == 1){
					kidLitter[3] += " with " + kidPhenoAfter.join(" ");
				}
				else if(kidPhenoAfter.length > 1){
					kidLitter[3] += " with " + kidPhenoAfter.splice(0, kidPhenoAfter.length - 1).join(" ") + " and " + kidPhenoAfter.splice(-1, 1);
				}
			}

			if(kidGenoGlint.length > 0){
				kidLitter[4] += " // " + kidColourGeno + "+" + kidGeno.join("/") + "-" + kidGenoGlint.join("/");
			}
			else{
				kidLitter[4] += " // " + kidColourGeno + "+" + kidGeno.join("/");
			}

			kidLitter = kidLitter.join("\n");
			document.getElementById("litter").value = keepKidLitter + kidLitter;

		}

	}

	success();
	breedingVeto();
	genoCheck();
}


//------------------------------ROLLER FUNCTION------------------------------

function roller(x){
	var roll = Math.floor( Math.random() * x ) + 1;										//generates a number from 1-x
	return roll;
}


//------------------------------INPUT PARENTS------------------------------
var dadLink = [];
var mumLink = [];
function inputParents(){																//stores user input in dadBreed/mumBreed
/*
	dadLink[0] = document.getElementById("dadLink").value;
	dadLink[1] = document.getElementById("dadName").value;
	mumLink[0] = document.getElementById("mumLink").value;
	mumLink[1] = document.getElementById("mumName").value;
*/

	for(i=0; i<7; i++)																	//7 = number of <select>
	{
		dadBreed[i] = document.getElementById("dad" + i).value;
		mumBreed[i] = document.getElementById("mum" + i).value;
	}
}


//------------------------------POLITICAL STATUS------------------------------
function success(){
	var x = roller(100);

	//50% chance of an empty litter (1-50 is a successful breeding)
	if(dadBreed[0] == "Citizen" && mumBreed[0] == "Citizen"){
		if(x > 50){
			document.getElementById("litter").value = "Unfortunately this breeding resulted in an empty litter.";
		}
	}
	//No chance of empty litter if bred to Recognized+ (50% fail with a citizen)
	else if((dadBreed[0] == "Citizen" && mumBreed[0] == "Recognized") || (dadBreed[0] == "Recognized" && mumBreed[0] == "Citizen")){
		if(x > 50){
			document.getElementById("litter").value = "Unfortunately this breeding resulted in an empty litter.";
		}
	}
	//No chance of empty litter if bred to Recognized+ (25% fail with a citizen: 1-75 is a successful breeding)
	else if((dadBreed[0] == "Citizen" && mumBreed[0] == "Exemplar") || (dadBreed[0] == "Exemplar" && mumBreed[0] == "Citizen")){
		if(x > 75){
			document.getElementById("litter").value = "Unfortunately this breeding resulted in an empty litter.";
		}
	}
	//No chance of empty litter if bred to Recognized+ (10% fail with a citizen: 1-90 is a successful breeding)
	else if((dadBreed[0] == "Citizen" && mumBreed[0] == "Noble") || (dadBreed[0] == "Exemplar" && mumBreed[0] == "Noble")){
		if(x > 90){
			document.getElementById("litter").value = "Unfortunately this breeding resulted in an empty litter.";
		}
	}
}


//------------------------------BREEDING VETO------------------------------

function breedingVeto(){
	if(dad1.value == "Vayron" && mum1.value == "Tyrian"){
		if(mum2.value != "Empyrian"){
			document.getElementById("litter").value = "A " + dad1.value + " cannot be bred to a " + mum2.value + " " + mum1.value + "!";
		}
	}
	else if(dad1.value == "Tyrian" && mum1.value == "Vayron"){
		if(dad2.value != "Empyrian"){
			document.getElementById("litter").value = "A " + dad2.value + " " + dad1.value +  " cannot be bred to a " + mum1.value + "!";
		}
	}
}


//------------------------------GENO CHECK------------------------------

function genoCheck(){																				//if geno input is empty, display message


	if(document.getElementById("dadgeno").value == ""){
		document.getElementById("dadgeno").placeholder = "   Cannot do the do without a Genotype!"
	}
	if(document.getElementById("mumgeno").value == ""){
		document.getElementById("mumgeno").placeholder = "   Cannot do the do without a Genotype!"
	}
}


//------------------------------SPECIES------------------------------

function species(){
	var x = roller(100);

	//Vayron x Vayron = 100% Vayron
	if(dadBreed[1] == "Vayron" && mumBreed[1] == "Vayron"){
		kidBreed[1] = "Vayron";
	}
	//Vayron x Tyrian = 80% Vayron, 20% Tyrian
	else if(dadBreed[1] == "Vayron" && mumBreed[1] == "Tyrian" || dadBreed[1] == "Tyrian" && mumBreed[1] == "Vayron"){
		if(x <= 80){
			kidBreed[1] = "Vayron"
		}
		else{
			kidBreed[1] = "Tyrian"
		}
	}
	//Tyrian x Tyrian = 100% Tyrian
	else if(dadBreed[1] == "Tyrian" && mumBreed[1] == "Tyrian"){
		kidBreed[1] = "Tyrian";
	}
	//Default
	else{
		alert("something went wrong with the species!");
	}
}


//------------------------------CUBS------------------------------

function cubs(){
	//Vayron = 4 possible cubs
	if(kidBreed[1] == "Vayron"){
		cubsNumber = roller(4);
	}
	//Tyrian = 2 possible cubs
	else if(kidBreed[1] == "Tyrian"){
		cubsNumber = roller(2);
	}
/*SOON™
	else if(kidBreed[1] == "Slither"){
		cubsNumber = roller(3);
	}
*/
	else{
		kidBreed[1] == "something with the cubs went wrong!"
	}

}


//------------------------------GENDER------------------------------

function gender(){
	var x = roller(100);

	if(x <= 50){
		kidGender = "Male";
	}
	else{
		kidGender = "Female";
	}
}


//------------------------------HEALTH------------------------------

function health(){
	var x = roller(100);
	if(document.getElementById("inbred").checked == true){						//checks if inbred checkbox is checked
		//Healthy - 10%
		if(x <= 10){
			kidHealth = "Healthy";
		}
		//Stillborn - 40%
		else if(x > 10 && x <= 50){
			kidHealth = "Stillborn";
		}
		//Blind - 30%
		else if(x > 50 && x <= 80){
			kidHealth = "Blind";
		}
		//Infertile - 20%
		else{
			kidHealth = "Infertile";
		}
	}
	else{																				//default if no inbreeding present
		kidHealth = "Healthy"
	}
}


//------------------------------TYPE------------------------------

function type(){																		//compares user input for type and rolls the kid's type

	//roll 1-100 and store in x
	var x = roller(100);

	/////////////////////
	// VAYRON x VAYRON //
	/////////////////////
	//Runner x Runner = 100% Runner
	if((dadBreed[2] == "Runner") && (mumBreed[2] == "Runner")){
		kidBreed[2] = "Runner"
	}
	//Runner x Chaser = 70% Runner 30% Chaser
	else if (((dadBreed[2] == "Runner") && (mumBreed[2] == "Chaser")) || ((dadBreed[2] == "Chaser") && (mumBreed[2] == "Runner"))){
		if (x <= 70){
			kidBreed[2] = "Runner"
		} else {
			kidBreed[2] = "Chaser"
		}
	}
	//Runner x Puller = 60% Runner 40% Puller
	else if (((dadBreed[2] == "Runner") && (mumBreed[2] == "Puller")) || ((dadBreed[2] == "Puller") && (mumBreed[2] == "Runner"))){
		if (x <= 60){
			kidBreed[2] = "Runner"
		} else {
			kidBreed[2] = "Puller"
		}
	}
	//Chaser x Puller = 60% Puller 40% Chaser
	else if (((dadBreed[2] == "Chaser") && (mumBreed[2] == "Puller")) || ((dadBreed[2] == "Puller") && (mumBreed[2] == "Chaser"))){
		if (x <= 60){
			kidBreed[2] = "Puller"
		} else {
			kidBreed[2] = "Chaser"
		}
	}
	//Chaser x Chaser = 80% Chaser 20% Runner
	else if ((dadBreed[2] == "Chaser") && (mumBreed[2] == "Chaser")){
		if (x <= 80){
			kidBreed[2] = "Chaser"
		} else {
			kidBreed[2] = "Runner"
		}
	}
	//Puller x Puller = 90% Puller 10% Runner
	else if ((dadBreed[2] == "Puller") && (mumBreed[2] == "Puller")){
		if (x <= 90){
			kidBreed[2] = "Puller"
		} else {
			kidBreed[2] = "Runner"
		}
	}


	/////////////////////
	// TYRIAN x TYRIAN //
	/////////////////////
	//Empyrian x Empyrian = 100% Empyrian
	if((dadBreed[2] == "Empyrian") && (mumBreed[2] == "Empyrian")){
		kidBreed[2] = "Empyrian"
	}
	//Empyrian x Primal = 70% Empyrian 30% Primal
	else if (((dadBreed[2] == "Empyrian") && (mumBreed[2] == "Primal")) || ((dadBreed[2] == "Primal") && (mumBreed[2] == "Empyrian"))){
		if (x <= 70){
			kidBreed[2] = "Empyrian"
		} else {
			kidBreed[2] = "Primal"
		}
	}
	//Empyrian x Brute = 60% Empyrian 40% Brute
	else if (((dadBreed[2] == "Empyrian") && (mumBreed[2] == "Brute")) || ((dadBreed[2] == "Brute") && (mumBreed[2] == "Empyrian"))){
		if (x <= 60){
			kidBreed[2] = "Empyrian"
		} else {
			kidBreed[2] = "Brute"
		}
	}
	//Primal x Brute = 60% Brute 40% Primal
	else if (((dadBreed[2] == "Primal") && (mumBreed[2] == "Brute")) || ((dadBreed[2] == "Brute") && (mumBreed[2] == "Primal"))){
		if (x <= 60){
			kidBreed[2] = "Brute"
		} else {
			kidBreed[2] = "Primal"
		}
	}
	//Primal x Primal = 80% Primal 20% Empyrian
	else if ((dadBreed[2] == "Primal") && (mumBreed[2] == "Primal")){
		if (x <= 80){
			kidBreed[2] = "Primal"
		} else {
			kidBreed[2] = "Empyrian"
		}
	}
	//Brute x Brute = 90% Brute 10% Empyrian
	else if ((dadBreed[2] == "Brute") && (mumBreed[2] == "Brute")){
		if (x <= 90){
			kidBreed[2] = "Brute"
		} else {
			kidBreed[2] = "Empyrian"
		}
	}


	/////////////////////
	// VAYRON x TYRIAN //
	/////////////////////
	//NOTE: Primals and Brute cannot be bred to Vayrons
	//Runner x Empyrian = 100% Runner / 100% Empyrian
	else if (((dadBreed[2] == "Runner") && (mumBreed[2] == "Empyrian")) || ((dadBreed[2] == "Empyrian") && (mumBreed[2] == "Runner"))){
		if(kidBreed[1] == "Vayron"){
			kidBreed[2] = "Runner"
		}
		else{
			kidBreed[2] = "Empyrian"
		}
	}
	//Chaser x Empyrian = ALL CHASER / ALL EMPYRIAN
	else if (((dadBreed[2] == "Chaser") && (mumBreed[2] == "Empyrian")) || ((dadBreed[2] == "Empyrian") && (mumBreed[2] == "Chaser"))){
		if(kidBreed[1] == "Vayron"){
			if (x <= 70){
				kidBreed[2] = "Chaser"
			} else {
				kidBreed[2] = "Chaser"
			}
		}
		else{
			if (x <= 70){
				kidBreed[2] = "Empyrian"
			} else {
				kidBreed[2] = "Empyrian"
			}
		}
	}
	//Puller x Empyrian = ALL PULLER / ALL EMPYRIAN
	else if (((dadBreed[2] == "Puller") && (mumBreed[2] == "Empyrian")) || ((dadBreed[2] == "Empyrian") && (mumBreed[2] == "Puller"))){
		if(kidBreed[1] == "Vayron"){
			if (x <= 60){
				kidBreed[2] = "Puller"
			} else {
				kidBreed[2] = "Puller"
			}
		}
		else{
			if (x <= 60){
				kidBreed[2] = "Empyrian"
			} else {
				kidBreed[2] = "Empyrian"
			}
		}
	}

}


//------------------------------FUR------------------------------

function fur(){																			//compares user input for type and rolls the kid's fur

	//roll 1-100 and store in x
	var x = roller(100);

	//Lisse x Lisse = 100% Lisse
	if((dadBreed[3] == "Lisse") && (mumBreed[3] == "Lisse")){
		kidBreed[3] = "Lisse"
	}
	//Lisse x Friese= 70% Lisse // 30% Friese
	else if (((dadBreed[3] == "Lisse") && (mumBreed[3] == "Friese")) || ((dadBreed[3] == "Friese") && (mumBreed[3] == "Lisse"))){
		if (x <= 70){
			kidBreed[3] = "Lisse"
		} else {
			kidBreed[3] = "Friese"
		}
	}
	//Lisse x Duveteux = 70% Lisse // 20% Friese // 10% Duveteux
	else if (((dadBreed[3] == "Lisse") && (mumBreed[3] == "Duveteux")) || ((dadBreed[3] == "Duveteux") && (mumBreed[3] == "Lisse"))){
		if (x <= 70){
			kidBreed[3] = "Lisse"
		} else if (70 < x && x <= 90 ){
			kidBreed[3] = "Friese"
		} else {
			kidBreed[3] = "Duveteux"
		}
	}
	//Lisse x Angora = 70% Lisse // 20% friese // 9% duveteux // 1% Angora
	else if (((dadBreed[3] == "Lisse") && (mumBreed[3] == "Angora")) || ((dadBreed[3] == "Angora") && (mumBreed[3] == "Lisse"))){
		if (x <= 70){
			kidBreed[3] = "Lisse"
		} else if (70 < x && x <= 90 ){
			kidBreed[3] = "Friese"
		} else if (90 < x && x <= 99){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}
	//Friese x Friese = 65% Lisse // 23% Friese // 11% Duveteux // 1% Angora
	else if ((dadBreed[3] == "Friese") && (mumBreed[3] == "Friese")){
		if (x <= 65){
			kidBreed[3] = "Lisse"
		} else if (65 < x && x <= 88 ){
			kidBreed[3] = "Friese"
		} else if (88 < x && x <= 99){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}
	//Friese x Duveteux = 60% Lisse // 25% Friese // 13% Duveteux // 2% Angora
	else if (((dadBreed[3] == "Friese") && (mumBreed[3] == "Duveteux")) || ((dadBreed[3] == "Duveteux") && (mumBreed[3] == "Friese"))){
		if (x <= 60){
			kidBreed[3] = "Lisse"
		} else if (60 < x && x <= 85 ){
			kidBreed[3] = "Friese"
		} else if (85 < x && x <= 98){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}
	//Friese x Angora = 55% Lisse // 28% Friese // 15% Duveteux // 2% Angora
	else if (((dadBreed[3] == "Friese") && (mumBreed[3] == "Angora")) || ((dadBreed[3] == "Angora") && (mumBreed[3] == "Friese"))){
		if (x <= 55){
			kidBreed[3] = "Lisse"
		} else if (55 < x && x <= 83 ){
			kidBreed[3] = "Friese"
		} else if (83 < x && x <= 98){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}
	//Duveteux x Duveteux = 52% Lisse // 29% Lisse // 17% Duveteux // 2% Angora
	else if ((dadBreed[3] == "Duveteux") && (mumBreed[3] == "Duveteux")){
		if (x <= 52){
			kidBreed[3] = "Lisse"
		} else if (52 < x && x <= 81 ){
			kidBreed[3] = "Friese"
		} else if (81 < x && x <= 98){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}
	//Duveteux x Angora = 50% Lisse // 30% Friese // 18% Duveteux // 2% Angora
	else if (((dadBreed[3] == "Duveteux") && (mumBreed[3] == "Angora")) || ((dadBreed[3] == "Angora") && (mumBreed[3] == "Duveteux"))){
		if (x <= 50){
			kidBreed[3] = "Lisse"
		} else if (50 < x && x <= 80 ){
			kidBreed[3] = "Friese"
		} else if (80 < x && x <= 98){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}
	//Angora x Angora = 40% Lisse // 35% Friese // 22% Duveteux // 3% Angora
	else if ((dadBreed[3] == "Angora") && (mumBreed[3] == "Angora")){
		if (x <= 40){
			kidBreed[3] = "Lisse"
		} else if (40 < x && x <= 75 ){
			kidBreed[3] = "Friese"
		} else if (75 < x && x <= 97){
			kidBreed[3] = "Duveteux"
		} else {
			kidBreed[3] = "Angora"
		}
	}

//	alert(kidBreed + " / " + x)

}


//------------------------------TRAITS------------------------------







var amountCommon = [];																	//array for amount of option tags with class .common
var amountUncommon = [];																//array for amount of option tags with class .uncommon
var amountRare = [];																	//array for amount of option tags with class .rare
var amountVeryrare = [];																//array for amount of option tags with class .veryrare

function traitAmountRarity(){															//finds amount of each rarity (in "dad"+i (= "mum"+i) and stores it in its own array)
	for(i=0; i<7; i++){
		amountCommon[i] = document.getElementById("dad"+i).getElementsByClassName("common").length;					//finds amount of option tags with class .common
		amountUncommon[i] = document.getElementById("dad"+i).getElementsByClassName("uncommon").length;				//finds amount of option tags with class .uncommon
		amountRare[i] = document.getElementById("dad"+i).getElementsByClassName("rare").length;						//finds amount of option tags with class .rare
		amountVeryrare[i] = document.getElementById("dad"+i).getElementsByClassName("veryrare").length;				//finds amount of option tags with class .veryrare
//		alert(amountCommon + "\n" + amountUncommon + "\n" + amountRare + "\n" + amountVeryrare);
	}
}

function traitSelectedRarity(){															//finds rarity of selected traits
	for(i=0; i<7; i++){
		var dadTrait = document.getElementById("dad" + i);
		dadRarity[i] = dadTrait.options[dadTrait.selectedIndex].className;
		var mumTrait = document.getElementById("mum" + i);
		mumRarity[i] = mumTrait.options[mumTrait.selectedIndex].className;
//		alert(dadRarity + "\n" + mumRarity);
	}
}

function traitRollRarity(i){															//compares selected rarities from dad & mum and rolls for kid's rarity for that trait

	var x = roller(100);
	//Common x Common = 100% Common
	if ((dadRarity[i] == "common") && (mumRarity[i] == "common")){
		kidRarity[i] = "common"
	}
	//Common x Uncommon = 70% Common, 30% Uncommon
	else if (((dadRarity[i] == "common") && (mumRarity[i] == "uncommon")) || ((dadRarity[i] == "uncommon") && (mumRarity[i] == "common"))){
		if (x <= 70){
			kidRarity[i] = "common"
		} else {
			kidRarity[i] = "uncommon"
		}
	}
	//Common x Rare = 60% Common, 30% Uncommon, 10% Rare
	else if (((dadRarity[i] == "common") && (mumRarity[i] == "rare")) || ((dadRarity[i] == "rare") && (mumRarity[i] == "common"))){
		if (x <= 60){
			kidRarity[i] = "common"
		} else if (60 < x && x <= 90 ){
			kidRarity[i] = "uncommon"
		} else {
			kidRarity[i] = "rare"
		}
	}
	//Common x Very Rare = 50% Common 30% Uncommon, 18% Rare, 2% Very Rare
	else if (((dadRarity[i] == "common") && (mumRarity[i] == "veryrare")) || ((dadRarity[i] == "veryrare") && (mumRarity[i] == "common"))){
		if (x <= 50){
			kidRarity[i] = "common"
		} else if (50 < x && x <= 80 ){
			kidRarity[i] = "uncommon"
		} else if (80 < x && x <= 98){
			kidRarity[i] = "rare"
		} else {
			kidRarity[i] = "veryrare"
		}
	}
	//Uncommon x Uncommon = 50% Common, 50% Uncommon
	else if ((dadRarity[i] == "uncommon") && (mumRarity[i] == "uncommon")){
		if (x <= 50){
			kidRarity[i] = "common"
		} else {
			kidRarity[i] = "uncommon"
		}
	}
	//Uncommon x Rare = 40% Common, 40% Uncommon, 20% Rare
	else if (((dadRarity[i] == "uncommon") && (mumRarity[i] == "rare")) || ((dadRarity[i] == "rare") && (mumRarity[i] == "uncommon"))){
		if (x <= 40){
			kidRarity[i] = "common"
		} else if (40 < x && x <= 80 ){
			kidRarity[i] = "uncommon"
		} else {
			kidRarity[i] = "rare"
		}
	}
	//Uncommon x Very Rare = 45% Common, 35% Uncommon, 15% Rare, 5% Very Rare
	else if (((dadRarity[i] == "uncommon") && (mumRarity[i] == "veryrare")) || ((dadRarity[i] == "veryrare") && (mumRarity[i] == "uncommon"))){
		if (x <= 45){
			kidRarity[i] = "common"
		} else if (45 < x && x <= 80 ){
			kidRarity[i] = "uncommon"
		} else if (80 < x && x <= 95){
			kidRarity[i] = "rare"
		} else {
			kidRarity[i] = "veryrare"
		}
	}
	//Rare x Rare = 30% Common, 35% Uncommon, 35% Rare
	else if ((dadRarity[i] == "rare") && (mumRarity[i] == "rare")){
		if (x <= 30){
			kidRarity[i] = "common"
		} else if (30 < x && x <= 65 ){
			kidRarity[i] = "uncommon"
		} else{
			kidRarity[i] = "rare"
		}
	}
	//Rare x Very Rare = 30% Common, 30% Uncommon, 30% Rare, 10% Very Rare
	else if (((dadRarity[i] == "rare") && (mumRarity[i] == "veryrare")) || ((dadRarity[i] == "veryrare") && (mumRarity[i] == "rare"))){
		if (x <= 30){
			kidRarity[i] = "common"
		} else if (30 < x && x <= 60 ){
			kidRarity[i] = "uncommon"
		} else if (60 < x && x <= 90){
			kidRarity[i] = "rare"
		} else {
			kidRarity[i] = "veryrare"
		}
	}
	//Very Rare x Very Rare = 25% Common, 30% Uncommon, 30% Rare, 15% Very Rare
	else if ((dadRarity[i] == "veryrare") && (mumRarity[i] == "veryrare")){
		if (x <= 25){
			kidRarity[i] = "common"
		} else if (25 < x && x <= 55 ){
			kidRarity[i] = "uncommon"
		} else if (55 < x && x <= 85){
			kidRarity[i] = "rare"
		} else {
			kidRarity[i] = "veryrare"
		}
	}
	else{
		alert("something with the trait rarity went wrong!");
	}
}

/*? ! ? ! ? INITIAL ? ! ? ! ?
function traitsInitial(){
	traitAmountRarity();
	traitSelectedRarity();
}
*/
function traits(){																		//finds index for rarity and finds corresponding trait to pass into kidBreed[]

	traitAmountRarity();
	traitSelectedRarity();



	for(i=4; i<7; i++){

		traitRollRarity(i);
		if(kidRarity[i] == "common"){
			kidBreed[i] = amountCommon[i];
		} else if(kidRarity[i] == "uncommon") {
			kidBreed[i] = amountUncommon[i];
		} else if(kidRarity[i] == "rare") {
			kidBreed[i] = amountRare[i];
		} else if(kidRarity[i] == "veryrare"){
			kidBreed[i] = amountVeryrare[i];
		}

		kidBreed[i] = roller(kidBreed[i]) - 1;																		// -1 because of index starting at [0]


		if(kidBreed[1] == "Vayron"){
//			alert(kidTrait["kid"+i][kidRarity[i]]);
			kidBreed[i] = kidTraitVayron["kid"+i][kidRarity[i]][kidBreed[i]];
		}
		else if(kidBreed[1] == "Tyrian"){
//			alert(kidTraitT["kid"+i][kidRarity[i]]);
			kidBreed[i] = kidTraitTyrian["kid"+i][kidRarity[i]][kidBreed[i]];
		}
		else{
			"something went wrong with the traits..."
		}
//		kidBreed[i] = kidTrait["kid"+i][kidRarity[i]][kidBreed[i]];													// "kid"+i = trait, kidRarity[i] = rarity, kidBreed[i] = index
		//alert(kidBreed)
	}

}


//------------------------------COLOURS------------------------------

var coatColours =
	["Rus", "Spi", "Ros", "Bls", "Can", "Cri", "Rub", "Gar", "Win", "Ali", "Sca", "Rog", "Cher", "Bal", "Pin", "Bub", "HoP", "Cir", "San", "Plu",
	"Gra", "Mau", "Amo", "Lav", "Ame", "Pur", "Vio", "Fig", "Lil", "Orc", "Roy", "Egg", "Ind", "Arc", "Sky", "Car", "Cob", "Azu", "Aby", "Lap",
	"Blu", "Aeg", "Cer", "Sea", "Cie", "Aq", "Tur", "Tea", "Jad", "SeM", "Lim", "Pea", "Spr", "Gre", "Shm", "Fer", "Mos", "Pic", "Oli", "Avo",
	"Poi", "Chr", "Pis", "Her", "Ver", "Blo", "But", "Dan", "Bum", "Beu", "Van", "Amb", "Tan", "Gin", "Ora", "Mach", "Apr", "SnSt", "Cnlp", "Pch",
	"Sep", "Lat", "SnD", "Cof", "Cin", "Aco", "MoG", "Gol", "Cit", "Cor", "PnP", "SuB", "Crl", "GnB", "Rou", "Mar", "Choc", "Nigh", "Bro", "Pec",
	"PeN", "Faw", "Oat", "Clo", "Coi", "Ash", "Char", "Sha", "Sil", "Ste", "Den", "Sto", "Mid"]

var coatColoursPheno =
	["Rust", "Spice", "Rose", "Blush", "Candy", "Crimson", "Ruby", "Garnet", "Wine", "Alizarin", "Scarlet", "Rouge", "Cherry", "Ballet", "Pink", "Bubblegum", "Hot Pink", "Ciruela", "Sangria", "Plum",
	"Grape", "Mauve", "Amour", "Lavender", "Amethyst", "Purple", "Violet", "Fig", "Lilac", "Orchid", "Royal", "Eggplant", "Indigo", "Arctic", "Sky", "Carribean", "Cobalt", "Azure", "Abyss", "Lapis",
	"Blue", "Aegis", "Cerulen", "Sea", "Ciel", "Aquamarine", "Turquoise", "Teal", "Jade", "Sea Moss", "Lime", "Pear", "Spring", "Green", "Shamrock", "Fern", "Moss", "Pickle", "Olive", "Avocado",
	"Poire", "Chartreuse", "Pistachio", "Herbe", "Vert", "Blonde", "Butter", "Dandelion", "Bumblebee", "Beurre", "Vanilla", "Amber", "Tangerine", "Ginger", "Orange", "Machiatto", "Apricot", "Sandstone", "Cantaloupe", "Peach",
	"Sepia", "Latte", "Sand", "Coffee", "Cinnamon", "Acorn", "Molten Gold", "Gold", "Citrine", "Corn", "Pineapple", "Sunburn", "Coral", "Gingerbread", "Rouille", "Maroon", "Chocolate", "Nightshade", "Brown", "Pecan",
	"Peanut", "Fawn", "Oat", "Cloud", "Coin", "Ash", "Charcoal", "Shadow", "Silver", "Steel", "Denim", "Storm", "Midnight"]


var colourRange = [];
var colourPheno = [];

function colour(){
	colourRange.length = 0;																	//resets colourRange array
	colourPheno.length = 0;																	//resets colourRange array

	var dadInput = document.getElementById("dadgeno").value;								//gets whole string in input
	var mumInput = document.getElementById("mumgeno").value;

	dadInput = dadInput.substring(0, dadInput.indexOf("+"));								//removes anything after the +, including the +
	mumInput = mumInput.substring(0, mumInput.indexOf("+"));

	var dadIndex = coatColours.indexOf(dadInput);
	var mumIndex = coatColours.indexOf(mumInput);

	var minElements = Math.ceil(coatColours.length / 2);									//rounds up the length of coatColours.length/2

	var indexGreater = Math.max(dadIndex, mumIndex);										//stores the greater number of dadIndex and mumIndex in indexGreater
	var indexLess = Math.min(dadIndex, mumIndex);											//stores the smaller number of dadIndex and mumIndex in indexLess
	var range = indexGreater - indexLess + 1;												//subtracts the lesser number and adds 1 (because of index) and stores in range

	if(range <= minElements){																//if range is less or equal to minElements, proceed to calculate via "inner" method
		for(i=indexLess; i<=indexGreater; i++){												//counts up from indexLess to indexGreater and stores corresponding colours in colourRange
			colourRange[i] = coatColours[i];
			colourPheno[i] = coatColoursPheno[i];
		}
	}
	else{																					//else (range is greater than minElements), proceed to calculate via "outer" method
		for(i=0; i<=indexLess; i++){														//counts up from 0 to indexLess and stores corresponding colours in colourRange
			colourRange[i] = coatColours[i];
			colourPheno[i] = coatColoursPheno[i];
		}
		for(i=coatColours.length-1; i>=indexGreater; i--){									//counts down from coatColours.length-1 (because of index) to indexGreater and stores corresponding colours in colourRange
			colourRange[i] = coatColours[i];
			colourPheno[i] = coatColoursPheno[i];
		}
	}

	colourRange = colourRange.filter(Boolean);												//removes empty strings
	colourPheno = colourPheno.filter(Boolean);
//	alert(colourRange + "\n" + colourRange.length + "\n\n" + colourPheno + "\n" + colourPheno.length);

	var x = roller(colourRange.length) - 1;													//rolls number from 1 to colourRange.length-1 (because of index)
//	alert(x);

	kidColourGeno = colourRange[x];																//stores colourRange[i] in kidColour
	kidColourPheno = colourPheno[x];														//stores colourPheno[i] in kidColourPheno
//	alert(kidColourGeno + "\n" + kidColourPheno);
}


//------------------------------MARKINGS & PASSABLE MODS------------------------------

var mar =
[
	{rarity:"common", pheno:"Barred", rec:"nBa", dom:"BaBa"},
	{rarity:"common", pheno:"Blanket", rec:"Bl", dom:"BlBl"},
	{rarity:"common", pheno:"Bleached", rec:"nBe", dom:"BeBe"},
	{rarity:"common", pheno:"Brushed", rec:"nBr", dom:"BrBr"},
	{rarity:"common", pheno:"Collared", rec:"Co", dom:"CoCo"},
	{rarity:"common", pheno:"Dappled", rec:"nDp", dom:"DapDap"},
	{rarity:"common", pheno:"Diamond", rec:"Di", dom:"DD"},
	{rarity:"common", pheno:"Dun", rec:"nDn", dom:"DnDn"},
	{rarity:"common", pheno:"Dusted", rec:"Du", dom:"DuDu"},
	{rarity:"common", pheno:"Fleabitten", rec:"nFle", dom:"FleFle"},
	{rarity:"common", pheno:"Freckled", rec:"Fr", dom:"FrFr"},
	{rarity:"common", pheno:"Inked", rec:"nIn", dom:"InIn"},
	{rarity:"common", pheno:"Masked", rec:"Ma", dom:"MaMa"},
	{rarity:"common", pheno:"Oriental", rec:"Or", dom:"OO"},
	{rarity:"common", pheno:"Pangare", rec:"nPn", dom:"PnPn"},
	{rarity:"common", pheno:"Ray", rec:"nR", dom:"RR"},
	{rarity:"common", pheno:"Rimmed", rec:"nRm", dom:"RmRm"},
	{rarity:"common", pheno:"Ringed", rec:"nRi", dom:"RiRi"},
	{rarity:"common", pheno:"Sable", rec:"nSb", dom:"sBsB"},
	{rarity:"common", pheno:"Socks", rec:"nSo", dom:"SoSo"},
	{rarity:"common", pheno:"Stockings", rec:"nSc", dom:"ScSc"},
	{rarity:"common", pheno:"Striped", rec:"nSt", dom:"StSt"},
	{rarity:"common", pheno:"Tanspots", rec:"nTs", dom:"TsTs"},
	{rarity:"common", pheno:"Underbelly", rec:"hU", dom:"UU"},
	{rarity:"common", pheno:"Cheeky", rec:"nCk", dom:"CkCk"},
	{rarity:"common", pheno:"Hooded", rec:"nHo", dom:"HoHo"},
	{rarity:"common", pheno:"Pointed", rec:"nPo", dom:"PoPo"},
	{rarity:"common", pheno:"Skunk", rec:"nSk", dom:"SkSk"},
	{rarity:"common", pheno:"Snowflake", rec:"nSwf", dom:"SwfSwf"},
	{rarity:"common", pheno:"Vitiligo", rec:"nVit", dom:"VitVit"},

	{rarity:"uncommon", pheno:"Current", rec:"nCr", dom:"CrCr"},
	{rarity:"uncommon", pheno:"Curtain", rec:"nCt", dom:"CtCt"},
	{rarity:"uncommon", pheno:"Leopard", rec:"nLp", dom:"LP"},
	{rarity:"uncommon", pheno:"Marbled", rec:"nMr", dom:"MrMr"},
	{rarity:"uncommon", pheno:"Merle", rec:"nMrl", dom:"MrlMrl"},
	{rarity:"uncommon", pheno:"Mist", rec:"nMi", dom:"MiMi"},
	{rarity:"uncommon", pheno:"Overo", rec:"nOv", dom:"OvOv"},
	{rarity:"uncommon", pheno:"Pebbled", rec:"pB", dom:"PB"},
	{rarity:"uncommon", pheno:"Python", rec:"nPt", dom:"PT"},
	{rarity:"uncommon", pheno:"Roan", rec:"nRa", dom:"RaRa"},
	{rarity:"uncommon", pheno:"Rosettes", rec:"nRo", dom:"RoRo"},
	{rarity:"uncommon", pheno:"Sooty", rec:"nSot", dom:"SotSot"},
	{rarity:"uncommon", pheno:"Splash", rec:"nSpl", dom:"SpSP"},
	{rarity:"uncommon", pheno:"Tabby", rec:"nTab", dom:"TabTab"},
	{rarity:"uncommon", pheno:"Tobiano", rec:"nTb", dom:"TbTb"},
	{rarity:"uncommon", pheno:"Veined", rec:"nVe", dom:"VeVe"},
	{rarity:"uncommon", pheno:"Void", rec:"nVd", dom:"VdVd"},
	{rarity:"uncommon", pheno:"Bloodmark", rec:"nBm", dom:"BmBm"},
	{rarity:"uncommon", pheno:"Calico", rec:"nCal", dom:"CalCal"},
	{rarity:"uncommon", pheno:"Fewspot", rec:"nFes", dom:"FesFes"},
	{rarity:"uncommon", pheno:"Fishscaled", rec:"nFs", dom:"FsFs"},
	{rarity:"uncommon", pheno:"Koi", rec:"nKi", dom:"KiKi"},
	{rarity:"uncommon", pheno:"Panda", rec:"nPd", dom:"PdPd"},
	{rarity:"uncommon", pheno:"Sabino", rec:"nSab", dom:"SabSab"},
	{rarity:"uncommon", pheno:"Silken", rec:"nSlk", dom:"SlkSlk"},
	{rarity:"uncommon", pheno:"Somatic", rec:"nSom", dom:"SomSom"},
	{rarity:"uncommon", pheno:"Wolf", rec:"nWf", dom:"WfWf"},

	{rarity:"rare", pheno:"Akhal", rec:"nAk", dom:"AkAk"},
	{rarity:"rare", pheno:"Filigree", rec:"nFi", dom:"FiFi"},
	{rarity:"rare", pheno:"Glasswork", rec:"nGl", dom:"GlGl"},
	{rarity:"rare", pheno:"Genie", rec:"nGn", dom:"GnGn"},
	{rarity:"rare", pheno:"Opalescent", rec:"nOp", dom:"OpOp"},
	{rarity:"rare", pheno:"Rorschach", rec:"nRs", dom:"RsRs"},
	{rarity:"rare", pheno:"Varnish", rec:"nVa", dom:"VaVa"},
	{rarity:"rare", pheno:"Borealis", rec:"nBor", dom:"BorBor"},
	{rarity:"rare", pheno:"Lacework", rec:"nLcw", dom:"LcwLcw"},


	{rarity:"mod", pheno:"Flaxen", rec:"nFl", dom:"FlFl"},
	{rarity:"mod", pheno:"Glint", rec:"Gl", dom:"GG"},
	{rarity:"mod", pheno:"Grey", rec:"Gr", dom:"GrGr"},
	{rarity:"mod", pheno:"Leucism", rec:"nEl", dom:"LL"},
	{rarity:"mod", pheno:"Melanism", rec:"nMel", dom:"MelMel"},
	{rarity:"mod", pheno:"Mottled", rec:"nMl", dom:"MM"},
	{rarity:"mod", pheno:"Outlined", rec:"nOt", dom:"OtOt"},
	{rarity:"mod", pheno:"Ticked", rec:"nTck", dom:"TckTck"},
	{rarity:"mod", pheno:"Umbra", rec:"nMb", dom:"MB"}
];

//MARKINGS BEFORE COLOR:
phenoBefore = [
	"Barred", "Bleached", "Brushed", "Collared", "Dappled", "Dusted", "Fleabitten", "Freckled", "Inked", "Masked",
	"Oriental", "Rimmed", "Ringed", "Sable", "Striped", "Leopard", "Marbled", "Merle", "Overo", "Pebbled",
	"Python", "Sooty", "Tabby", "Veined", "Akhal", "Opalescent", "Flaxen", "Grey", "Mottled",
	"Cheeky",	"Hooded", "Outlined", "Pointed", "Skunk", "Snowflake", "Ticked", "Calico", "Fewspot", "Fishscaled", "Koi", "Panda", "Sabino", "Silken", "Somatic", "Wolf"];

//MARKINGS AFTER COLOR:
phenoAfter = [
	"Blanket", "Diamond", "Dun", "Pangare", "Ray", "Socks", "Stockings", "Tanspots", "Underbelly", "Current",
	"Curtain", "Mist", "Roan", "Rosettes", "Splash", "Tobiano", "Void", "Filigree", "Glasswork", "Genie",
	"Rorschach", "Varnish", "Leucism", "Melanism", "Umbra",
	"Vitiligo", "Bloodmark", "Borealis", "Lacework"];

//MARKINGS AT THE END:
phenoGlint = "Glint";

function markingsDivision(){
	kidPhenoBefore.length = 0;
	kidPhenoAfter.length = 0;
	kidPhenoGlint.length = 0;
	kidGenoGlint.length = 0;

	markings();



	for(i=0; i<kidPheno.length; i++){

		for(j=0; j<phenoBefore.length; j++){
			if(kidPheno[i] == phenoBefore[j]){
				kidPhenoBefore.push(kidPheno[i]);
			}
		}
		for(j=0; j<phenoAfter.length; j++){
			if(kidPheno[i] == phenoAfter[j]){
				kidPhenoAfter.push(kidPheno[i]);
			}
		}

		if(kidPheno[i] == "Glint"){																							//if kidPheno[i] equals "Glint"

			glintColourRec = roller(coatColours.length);													//...roll a random colour for either recessive or dominant pass
			glintColourDom = roller(coatColours.length);

			indexGl = kidGeno.indexOf("Gl");																			//...find index of "Gl" and "GG"
			indexGG = kidGeno.indexOf("GG");

			kidPhenoGlint.push("Glint");																					//...push "Glint" on kidPhenoGlint

			if (indexGl > -1) {																										//if Glint is passed as recessive...
				kidPhenoGlint.unshift(coatColoursPheno[glintColourRec]);						//add the randomly rolled colour to the front of kidPhenoGlint

				kidGeno.splice(indexGl, 1);																					//remove "Gl" from its position in kidGeno...
				kidGeno.push("Gl");																									//and add it to the end instead
				kidGenoGlint.push(coatColours[glintColourRec]);
			}
			else if (indexGG > -1) {																							//else if Glint is passed as dominant...
				kidPhenoGlint.unshift(coatColoursPheno[glintColourRec] + "/" + coatColoursPheno[glintColourDom]);

				kidGeno.splice(indexGG, 1);
				kidGeno.push("GG");
				kidGenoGlint.push(coatColours[glintColourRec], coatColours[glintColourDom]);
			}
		}
	}
}


function markings(){
	kidPheno.length = 0;
	kidGeno.length = 0;

	markingSeparation();

	//recSing
	for(i=0; i<recSing.length; i++){

		var x = roller(100);

		for(j=0; j<mar.length; j++){
			if(recSing[i] == mar[j].pheno){
				if(mar[j].rarity == "common"){
					if(x <= 30){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
					}
				}
				else if((mar[j].rarity == "uncommon") || (mar[j].rarity == "mod")){
					if(x <= 15){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
					}
				}
				else if(mar[j].rarity == "rare"){
					if(x <= 2){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
					}
				}
			}
		}
	}

	//domSing
	for(i=0; i<domSing.length; i++){

		var x = roller(100);

		for(j=0; j<mar.length; j++){
			if(domSing[i] == mar[j].pheno){
				if((mar[j].rarity == "common") || (mar[j].rarity == "mod")){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
				}
				else if(mar[j].rarity == "uncommon"){
					if(x <= 70){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
					}
				}
				else if(mar[j].rarity == "rare"){
					if(x <= 40){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
					}
				}
			}
		}
	}

	//recDupe
	for(i=0; i<recDupe.length; i++){

		var x = roller(100);
		var y = roller(100);

		for(j=0; j<mar.length; j++){
			if(recDupe[i] == mar[j].pheno){
				if(mar[j].rarity == "common"){
					if(x <= 40){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
						if(y <= 5){
							kidGeno.pop();
							kidGeno.push(mar[j].dom);
						}
					}
				}
				else if((mar[j].rarity == "uncommon") || (mar[j].rarity == "mod")){
					if(x <= 25){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
						if(y <= 2){
							kidGeno.pop();
							kidGeno.push(mar[j].dom);
						}
					}
				}
				else if(mar[j].rarity == "rare"){
					if(x <= 5){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
						if(y <= 2){
							kidGeno.pop();
							kidGeno.push(mar[j].dom);
						}
					}
				}
			}
		}
	}

	//domDupe
	for(i=0; i<domDupe.length; i++){

		var y = roller(100);

		for(j=0; j<mar.length; j++){
			if(domDupe[i] == mar[j].pheno){
				if(mar[j].rarity == "common"){
					kidPheno.push(mar[j].pheno);
					kidGeno.push(mar[j].rec);
					if(y <= 5){
						kidGeno.pop();
						kidGeno.push(mar[j].dom);
					}
				}
				else if((mar[j].rarity == "uncommon") || (mar[j].rarity == "mod")){
					kidPheno.push(mar[j].pheno);
					kidGeno.push(mar[j].rec);
					if(y <= 2){
						kidGeno.pop();
						kidGeno.push(mar[j].dom);
					}
				}
				else if(mar[j].rarity == "rare"){
					kidPheno.push(mar[j].pheno);
					kidGeno.push(mar[j].rec);
					if(y <= 2){
						kidGeno.pop();
						kidGeno.push(mar[j].dom);
					}
				}
			}
		}
	}

	//mixDupe
	for(i=0; i<mixDupe.length; i++){

        var x = roller(100);
		var y = roller(100);

		for(j=0; j<mar.length; j++){
			if(mixDupe[i] == mar[j].pheno){
				if((mar[j].rarity == "common") || (mar[j].rarity == "mod")){
					kidPheno.push(mar[j].pheno);
					kidGeno.push(mar[j].rec);
					if(y <= 5){
						kidGeno.pop();
						kidGeno.push(mar[j].dom);
					}
				}
				else if(mar[j].rarity == "uncommon"){
					if(x <= 70){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
						if(y <= 2){
							kidGeno.pop();
							kidGeno.push(mar[j].dom);
						}
					}
				}
				else if(mar[j].rarity == "rare"){
					if(x <= 40){
						kidPheno.push(mar[j].pheno);
						kidGeno.push(mar[j].rec);
						if(y <= 2){
							kidGeno.pop();
							kidGeno.push(mar[j].dom);
                        }
					}
				}
			}
		}
	}
}

var recSing = [];
var domSing = [];
var recDupe = [];
var domDupe = [];
var mixDupe = [];

function markingSeparation(){
	recSing.length = 0;																																		//reset separation arrays
	domSing.length = 0;
	recDupe.length = 0;
	domDupe.length = 0;
	mixDupe.length = 0;

	var dadInput = document.getElementById("dadgeno").value;															//gets whole string in input
	var mumInput = document.getElementById("mumgeno").value;

	if(dadInput.indexOf("-") == -1){																											//checks if dadInput contains a "-" (to check for Glint-Colours)
		dadInput = dadInput.substring(dadInput.indexOf("+") +1);														//removes anything before "+", including "+"
	}
	else{
		dadInput = dadInput.substring((dadInput.indexOf("+") + 1), dadInput.indexOf("-"));	//removes anything before the "+", including "+" and anything after "-", including "-"
	}
	if(mumInput.indexOf("-") == -1){
		mumInput = mumInput.substring(mumInput.indexOf("+") +1);
	}
	else{
		mumInput = mumInput.substring((mumInput.indexOf("+") + 1), mumInput.indexOf("-"));
	}


	dadInput = dadInput.split("/");													//converts string "Aaa/Bbb/Ccc" into array "Aaa, Bbb, Ccc,"
	mumInput = mumInput.split("/");

	for(i=0; i<dadInput.length; i++){												//iterate through longer geno array

		for(j=0; j<mar.length; j++){													//iterate through all markings in array mar

			if(dadInput[i] == mar[j].rec){											//if dadInput[i] == one of the recessive parts of the array mar...
				recSing.push(mar[j].pheno);												//...then push that marking's pheno to recSing
				for(k=0; k<mumInput.length; k++){									//iterate through array mumInput
					if(dadInput[i] == mumInput[k]){									//if dadInput[i] == mumInput[k]...
						recSing.pop(mar[j].pheno);										//...remove (pop) the marking that was just added to recSing...
						recDupe.push(mar[j].pheno);										//...and push it onto array recDupe instead
					}
				}
			}

			else if(dadInput[i] == mar[j].dom){
				domSing.push(mar[j].pheno);
				for(k=0; k<mumInput.length; k++){
					if(dadInput[i] == mumInput[k]){
						domSing.pop(mar[j].pheno);
						domDupe.push(mar[j].pheno);
					}
				}
			}

			for(k=0; k<dadInput.length; k++){
				if(((dadInput[i] == mar[j].rec) && (mumInput[k] == mar[j].dom)) || ((dadInput[i] == mar[j].dom) && (mumInput[k] == mar[j].rec))){
					mixDupe.push(mar[j].pheno);
					var existsInRecSing = recSing.indexOf(mar[j].pheno);
					var existsInDomSing = domSing.indexOf(mar[j].pheno);
					if(existsInRecSing != -1){
						recSing.splice(existsInRecSing, 1);
					}
					if(existsInDomSing != -1){
						domSing.splice(existsInDomSing, 1);
					}
				}
			}
		}
	}

	//looks at remaining elements in mum's geno
	for(i=0; i<mumInput.length; i++){
		for(j=0; j<mar.length; j++){
			if(mumInput[i] == mar[j].rec){
				if((recDupe.indexOf(mar[j].pheno) == -1) && (mixDupe.indexOf(mar[j].pheno) == -1)){
					recSing.push(mar[j].pheno);
				}
			}
			if(mumInput[i] == mar[j].dom){
				if((domDupe.indexOf(mar[j].pheno) == -1) && (mixDupe.indexOf(mar[j].pheno) == -1)){
					domSing.push(mar[j].pheno);
				}
			}
		}
	}
}


///////////////////////////////////////////////////////////////////////////////
//------------------------------NON-PASSABLE MODS------------------------------

var nonPassableChance = 500;

var nonPassableName = ["[ALBINO]", "[CHIMERA]"];

function nonPassable(){
	kidNonPassable = "";
	var x = roller(nonPassableChance);																	//1:500 chance for a unpassable Modifier to appear
	var y = roller(nonPassableName.length);

	if(x <= 1){
		kidNonPassable = nonPassableName[y - 1];
	}
}

////////////////////////////////////////////////////////////////////////////////////////
//------------------------------MUTATIONS & MAGICAL TRAITS------------------------------

var mutationChance = 800;
var magicalTraitChance = 1000;

var mutationName = ["[ARACHNE]", "[SCALED]", "[MARKED]", "[MANED]", "[HORNED]", "[FINNED]", "[TUSKED]", "[FANGED]"];

var magicalTraitName = ["[CHERUB]", "[BAT WINGS]", "[FEATHERED]", "[LICORNE]", "[PROPHET]", "[MISTWALKER]", "[SERAPH]"];
var magicalTraitNameTyrian = ["[CHERUB]", "[BAT WINGS]", "[FEATHERED]", "[LICORNE]", "[PROPHET]", "[MISTWALKER]", "[SERAPH]", "[WHISKERS]"];

function mutationMagicalTrait(){
	kidMagicalTrait = "";
	kidMutation = "";

	var x = roller(mutationChance);																			//1:800 chance for a Mutation to appear
	var y = roller(magicalTraitChance);																	//1:1000 chance for a Magical Trait to appear

	var w = roller(mutationName.length);
	var z;

	if(kidBreed[1] == "Vayron"){
		z = roller(magicalTraitName.length);
	}
	else{
		z = roller(magicalTraitNameTyrian.length);
	}

	if(x <= 1){
		kidMutation = mutationName[w - 1];
	}
	else if(y <= 1){
		if(kidBreed[1] == "Vayron"){
			kidMagicalTrait = magicalTraitName[z - 1];
		}
		else{
			kidMagicalTrait = magicalTraitNameTyrian[z - 1];
		}
	}
}
////////////////////////////////////////////////////////////////////////////////////////
//------------------------------    SKILLS    ------------------------------

function generateSkill() {
	var damSkill = document.getElementById("damSkill").value;
	var sireSkill = document.getElementById("sireSkill").value;
	var result = 1;
	var roll = randRange(100);
	var bonus = 0;
	if (document.getElementById("nameofbonusattribute").checked) {
		if (!destroyedModifiers.includes("name of item was destroyed.<br>"))
			destroyedModifiers += "name of item was destroyed.<br>";
		bonus = 10;
	}
	if (damSkill == Skills.NONE && sireSkill == Skills.NONE) {
		return "";
	} else if (damSkill == Skills.NONE) {
		if (roll >= 90 - bonus) {
			result = sireSkill;
		}
	} else if (sireSkill == Skills.NONE) {
		if (roll >= 90 - bonus) {
			result = damSkill;
		}
	} else {
		if (roll >= 85 - bonus) {
			result = damSkill;
		} else if (roll >= 70 - bonus/2) {
			result = sireSkill;
		}
	}
	
	if (result == Skills.NONE) {
		return "";
	} else if (result == Skills.EVEN_FOOTING) {
		return "Even Footing";
	} else if (result == Skills.FORAGER) {
		return "Forager";
	} else if (result == Skills.SCAVENGER) {
		return "Scavenger";
	} else if (result == Skills.HAWKS_EYE) {
		return "Hawk's Eye";
	} else if (result == Skills.TENACIOUS) {
		return "Tenacious";
	} else if (result == Skills.SMITHY) {
		return "Smithy";
	} else if (result == Skills.POTION_MASTER) {
		return "Potion Master";
	} else if (result == Skills.CRAFTY) {
		return "Crafty";
	} else if (result == Skills.FINAL_STAND) {
		return "Final Stand";
	} else if (result == Skills.PARTY_ANIMAL) {
		return "Party Animal";
	} else if (result == Skills.HOARDER) {
		return "Hoarder";
	} else {
		return "UNDEFINED"
	}
}

/////////////////////////////////////////////////////////////////////
//------------------------------OTHER------------------------------//
/////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//------------------------------COPY TO CLIPBOARD------------------------------

function copyToClipboard(){
	litter.select();
	document.execCommand('copy');
}

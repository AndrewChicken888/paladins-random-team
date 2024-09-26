//AndrewChicken's Paladins Team Randomizer

//Arrays containing the data for each section
var champions = ["Androxus", "Ash", "Atlas", "Azaan", "Barik", "Betty la Bomba", "Bomb King", "Buck", "Cassie", "Caspian", "Corvus", "Dredge", "Drogoz", "Evie", "Fernando", "Furia", "Grohk", "Grover", "Imani", "Inara", "Io", "Jenos", "Kasumi", "Khan", "Kinessa", "Koga", "Lex", "Lian", "Lillith", "Maeve", "Makoa", "Mal'Damba", "Moji", "Nyx", "Octavia", "Omen", "Pip", "Raum", "Rei", "Ruckus", "Saati", "Seris", "Sha Lin", "Skye", "Strix", "Talus", "Terminus", "Tiberius", "Torvald", "Tyra", "Vatu", "VII", "Viktor", "Vivian", "Vora", "Willo", "Yagorath", "Ying", "Zhin"];
var supports = ["Corvus", "Furia", "Grohk", "Grover", "Io", "Jenos", "Lillith", "Mal'Damba", "Moji", "Pip", "Rei", "Seris", "Ying"];
var tanks = ["Ash", "Atlas", "Azaan", "Barik", "Fernando", "Inara", "Khan", "Makoa", "Nyx", "Raum", "Ruckus", "Terminus", "Torvald", "Yagorath"];
var team1champs = ["none", "none", "none", "none", "none"];
var team2champs = ["none", "none", "none", "none", "none"];
var noMirror = ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none"];

//Variables containing data for the randomizer
var rand = 0;
var oldRand = -1;
var randPlayer = 0;
var champ;
var champID;

var timerClock = -1;
var timerChamp = 0;
var oldTimerChamp = -1;
var toggleCredits = false;
var toggleSettings = false;

var elemTest = null;
var team2 = false;
var borderClock = -1;
var names = document.getElementsByClassName("nameplate");
var images = document.getElementsByTagName("img");
var toggles = document.getElementsByClassName("teamcheck");


//Media Variables
var soundGood = new Audio("Score.wav");
var soundBad = new Audio("Error.wav");

//Animation clock
setInterval(animTimer, 100);

function animTimer() {
	//Reset the border
	if (borderClock > 0) {
		borderClock--;
	} else if (borderClock === 0) {
		borderClock = -1;
		for (var i=0; i<images.length; i++) {
			images[i].style.border = ".3vw solid #0D2533";
		}
	}
}

//Run this on startup
function init() {
	//Test alert
	//alert("here!");
	
	for (var i=0; i<names.length; i++) {
		//Event listeners for enter key
		names[i].addEventListener("keypress", function(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				document.activeElement.blur();
			}
		});
	}
	
	document.getElementById("team2").style.display = "none";
}

//Toggle team 2
//This is deprecated due to a change in the way this setting is toggled
/*
function togglet2() {
	if (team2) {
		team2 = false;
		document.getElementById("team2").style.display = "none";
		
		document.getElementById("togglet2p1").checked = false;
		document.getElementById("togglet2p2").checked = false;
		document.getElementById("togglet2p3").checked = false;
		document.getElementById("togglet2p4").checked = false;
		document.getElementById("togglet2p5").checked = false;
	} else {
		team2 = true;
		document.getElementById("team2").style.display = "inline";
		
		document.getElementById("togglet2p1").checked = true;
		document.getElementById("togglet2p2").checked = true;
		document.getElementById("togglet2p3").checked = true;
		document.getElementById("togglet2p4").checked = true;
		document.getElementById("togglet2p5").checked = true;
	}
}
*/

//Randomize function
function randomize() {
	//Check to make sure at least one box is checked.
	var valid = false;
	for (i=0; i<toggles.length; i++) {
		if (toggles[i].checked) {
			valid = true;
			i = toggles.length;
		}
	}
	
	//If valid, randomize each champion. Otherwise, thrown an error.
	if (valid) {
		document.getElementById("randomError").innerHTML = "";
		//Reset the champions in the team lists that are getting randomized.
		for (i=0; i<toggles.length; i++) {
			if (toggles[i].checked) {
				if (i<5) {
					team1champs[i] = "none";
				} else {
					team2champs[i-5] = "none";
				}
			}
		}
		//Only randomize the toggles that are selected.
		for (i=0; i<toggles.length; i++) {
			if (toggles[i].checked) {
				//Check if mirror matchups are allowed. Check for duplicates accordingly.
				if (toggleMirror.checked) {
					//Properly check each team for duplicates when randomizing
					if (i<5) {
						rand = Math.floor(Math.random()*champions.length);
						champID = rand;
						champ = champions[rand];
						for (x=0; x<team1champs.length; x++) {
							if (champ == team1champs[x]) {
								rand = Math.floor(Math.random()*champions.length);
								champID = rand;
								champ = champions[rand];
								x=0;
							}
						}
						team1champs[i] = champ;
					} else {
						rand = Math.floor(Math.random()*champions.length);
						champID = rand;
						champ = champions[rand];
						for (x=0; x<team2champs.length; x++) {
							if (champ == team2champs[x]) {
								rand = Math.floor(Math.random()*champions.length);
								champID = rand;
								champ = champions[rand];
								x=0;
							}
						}
						team2champs[i-5] = champ;
					}
				} else {
					rand = Math.floor(Math.random()*champions.length);
					champID = rand;
					champ = champions[rand];
					for (x=0; x<noMirror.length; x++) {
						if (champ == noMirror[x]) {
							rand = Math.floor(Math.random()*champions.length);
							champID = rand;
							champ = champions[rand];
							x=0;
						}
					}
					noMirror[i] = champ;
				}
				images[i].src = champ + ".png";
				images[i].style.border = ".3vw solid #FFFF00";
			}
		}
		//If fair teams are on, ensure each team has at least one tank and one support.
		if (toggleFair.checked) {
			//If Team 1 is active, make their team fair.
			var team1active = false;
			var totalt1members = 0;
			for (var y=0; y<team1champs.length; y++) {
				if (toggles[y].checked) {
					team1active = true;
					totalt1members++;
				}
			}
			
			if (team1active) {
				var team1support = false;
				var team1tank = false;
				
				for (var i=0; i<team1champs.length; i++) {
					for (var x=0; x<supports.length; x++) {
						if (team1champs[i] === supports[x]) {
							team1support = true;
							x = supports.length;
						}
					}
					for (var x=0; x<tanks.length; x++) {
						if (team1champs[i] === tanks[x]) {
							team1tank = true;
							x = tanks.length;
						}
					}
				}
				
				//If there is only one person selected but the team lacks a tank & support, prioritize turning them into a healer.
				if (!team1support && !team1tank && totalt1members === 1) {
					var foundPlayer = false;
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer].checked) {
							foundPlayer = true;
						}
					}
					rand = Math.floor(Math.random()*supports.length);
					champID = rand;
					champ = supports[rand];
					team1champs[randPlayer] = champ;
					images[randPlayer].src = champ + ".png";
					team1support = true;
					team1tank = true;
				}
				
				//If there is no support, choose a random player to become a support (if their box is checked).
				if (!team1support) {
					var foundPlayer = false;
					var isTank = false;
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer].checked) {
							//Make sure the player is not already a tank
							if (totalt1members != 1) {
								for (var z=0; z<tanks.length; z++) {
									if (team1champs[randPlayer] === tanks[z]) {
										isTank = true;
										z=tanks.length;
									}
								}
							}
							if (!isTank) {
								foundPlayer = true;
							}
							isTank = false;
						}
					}
					rand = Math.floor(Math.random()*supports.length);
					champID = rand;
					champ = supports[rand];
					team1champs[randPlayer] = champ;
					images[randPlayer].src = champ + ".png";
				}
				
				//If there is no tank, choose a random player to become a tank (if their box is checked).
				if (!team1tank) {
					var foundPlayer = false;
					var isSupport
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer].checked) {
							//Make sure the player is not already a support
							if (totalt1members != 1) {
								for (var z=0; z<supports.length; z++) {
									if (team1champs[randPlayer] === supports[z]) {
										isSupport = true;
										z=supports.length;
									}
								}
							}
							if (!isSupport) {
								foundPlayer = true;
							}
							isSupport = false;
						}
					}
					rand = Math.floor(Math.random()*tanks.length);
					champID = rand;
					champ = tanks[rand];
					team1champs[randPlayer] = champ;
					images[randPlayer].src = champ + ".png";
				}
			}
			
			//If Team 2 is active, do the same for them.
			if (togglet2.checked) {
				//Check how many selected members there are.
				var totalt2members = 0;
				for (var y=0; y<team2champs.length; y++) {
					if (toggles[y+5].checked) {
						totalt2members++;
					}
				}
				var team2support = false;
				var team2tank = false;
				
				for (var i=0; i<team2champs.length; i++) {
					for (var x=0; x<supports.length; x++) {
						if (team2champs[i] === supports[x]) {
							team2support = true;
							x = supports.length;
						}
					}
					for (var x=0; x<tanks.length; x++) {
						if (team2champs[i] === tanks[x]) {
							team2tank = true;
							x = tanks.length;
						}
					}
				}
				
				//If there is only one person selected but the team lacks a tank & support, prioritize turning them into a healer.
				if (!team2support && !team2tank && totalt2members === 1) {
					var foundPlayer = false;
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer].checked) {
							foundPlayer = true;
						}
					}
					rand = Math.floor(Math.random()*supports.length);
					champID = rand;
					champ = supports[rand];
					team2champs[randPlayer] = champ;
					images[randPlayer+5].src = champ + ".png";
					team2support = true;
					team2tank = true;
				}
				
				//If there is no support, choose a random player to become a support (if their box is checked).
				if (!team2support) {
					var foundPlayer = false;
					var isTank = false;
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer+5].checked) {
							//Make sure the player is not already a tank
							if (totalt2members != 1) {
								for (var z=0; z<tanks.length; z++) {
									if (team2champs[randPlayer] === tanks[z]) {
										isTank = true;
										z=tanks.length;
									}
								}
							}
							if (!isTank) {
								foundPlayer = true;
							}
							isTank = false;
						}
					}
					rand = Math.floor(Math.random()*supports.length);
					champID = rand;
					champ = supports[rand];
					team2champs[randPlayer] = champ;
					images[randPlayer+5].src = champ + ".png";
				}
				
				//If there is no tank, choose a random player to become a tank (if their box is checked).
				if (!team2tank) {
					var foundPlayer = false;
					var isSupport
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer+5].checked) {
							//Make sure the player is not already a support
							if (totalt2members != 1) {
								for (var z=0; z<supports.length; z++) {
									if (team2champs[randPlayer] === supports[z]) {
										isSupport = true;
										z=supports.length;
									}
								}
							}
							if (!isSupport) {
								foundPlayer = true;
							}
							isSupport = false;
						}
					}
					rand = Math.floor(Math.random()*tanks.length);
					champID = rand;
					champ = tanks[rand];
					team2champs[randPlayer] = champ;
					images[randPlayer+5].src = champ + ".png";
				}
			}
		}
		soundGood.currentTime = 0;
		soundGood.play();
		borderClock = 1;
	} else {
		document.getElementById("randomError").innerHTML = "Error: no player is selected.";
		soundBad.currentTime = 0;
		soundBad.play();
	}
}

//Toggle credits
function credits() {
	//If credits are on, turn them off and revert to the main menu. Otherwise, show credits.
	if (toggleCredits) {
		toggleCredits = false;
		toggleSettings = false;
		document.getElementById("credits").style.display = "none";
		document.getElementById("settings").style.display = "none";
		document.getElementById("main").style.display = "inline";
	} else {
		toggleCredits = true;
		toggleSettings = false;
		document.getElementById("credits").style.display = "inline";
		document.getElementById("settings").style.display = "none";
		document.getElementById("main").style.display = "none";
	}
}

//Toggle settings
function settings() {
	//If settings are on, turn them off and revert to the main menu. Otherwise, show credits.
	if (toggleSettings) {
		toggleCredits = false;
		toggleSettings = false;
		document.getElementById("credits").style.display = "none";
		document.getElementById("settings").style.display = "none";
		document.getElementById("main").style.display = "inline";
		if (document.getElementById("togglet2").checked) {
			if (!team2) {
				document.getElementById("team2").style.display = "inline";
				
				document.getElementById("togglet2p1").checked = true;
				document.getElementById("togglet2p2").checked = true;
				document.getElementById("togglet2p3").checked = true;
				document.getElementById("togglet2p4").checked = true;
				document.getElementById("togglet2p5").checked = true;
				team2 = true;
			}
		} else {
			document.getElementById("team2").style.display = "none";
		
			document.getElementById("togglet2p1").checked = false;
			document.getElementById("togglet2p2").checked = false;
			document.getElementById("togglet2p3").checked = false;
			document.getElementById("togglet2p4").checked = false;
			document.getElementById("togglet2p5").checked = false;
			
			team2 = false;
		}
	} else {
		toggleCredits = false;
		toggleSettings = true;
		document.getElementById("credits").style.display = "none";
		document.getElementById("settings").style.display = "inline";
		document.getElementById("main").style.display = "none";
	}
}
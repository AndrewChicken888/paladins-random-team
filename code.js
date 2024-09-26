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
		/* Old algorithm
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
							if (champ === team1champs[x]) {
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
							if (champ === team2champs[x]) {
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
						if (champ === noMirror[x]) {
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
		}*/
		
		//Randomize the teams initially.
		for (i=0; i<toggles.length; i++) {
			if (toggles[i].checked) {
				//Properly check each team for duplicates when randomizing
				if (i<5) {
					rand = Math.floor(Math.random()*champions.length);
					champID = rand;
					champ = champions[rand];
					for (x=0; x<team1champs.length; x++) {
						if (champ === team1champs[x]) {
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
						if (champ === team2champs[x]) {
							rand = Math.floor(Math.random()*champions.length);
							champID = rand;
							champ = champions[rand];
							x=0;
						}
					}
					team2champs[i-5] = champ;
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
				if (totalt1members === 1) {
					var foundPlayer = false;
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer].checked) {
							foundPlayer = true;
						}
					}
					//Check if they're a support already.
					var isSupport = false;
					for (var z=0; z<supports.length; z++) {
						if (team1champs[randPlayer] === supports[z]) {
							isSupport = true;
						}
					}
					var numSupports = 0;
					//Check how many supports are in the valid pool.
					for (var j=0; j<team1champs.length; j++) {
						for (var h=0; h<supports.length; h++) {
							if (team1champs[j] === supports[h]) {
								numSupports++;
							}
						}
					}
					//Check if they're a tank already.
					var isTank = false;
					for (var z=0; z<tanks.length; z++) {
						if (team1champs[randPlayer] === tanks[z]) {
							isTank = true;
						}
					}
					var numTanks = 0;
					//Check how many tanks are in the valid pool.
					for (var j=0; j<team1champs.length; j++) {
						for (var h=0; h<tanks.length; h++) {
							if (team1champs[j] === tanks[h]) {
								numTanks++;
							}
						}
					}
					//If the team does not have a support, or the team has 1 support and this player is the support, turn them into a support.
					if ((!team1support || (team1support && isSupport)) && numSupports < 2) {
						rand = Math.floor(Math.random()*supports.length);
						champID = rand;
						champ = supports[rand];
						team1champs[randPlayer] = champ;
						images[randPlayer].src = champ + ".png";
						team1support = true;
						team1tank = true;
					} else if ((!team1tank || (team1tank && isTank)) && numTanks < 2) { //If the team does not have a tank, or the team has 1 tank and this player is the tank, turn them into a tank.
						rand = Math.floor(Math.random()*tanks.length);
						champID = rand;
						champ = tanks[rand];
						team1champs[randPlayer] = champ;
						images[randPlayer].src = champ + ".png";
						team1support = true;
						team1tank = true;
					}
				} else {
					//If there is no support, choose a random player to become a support (if their box is checked).
					if (!team1support) {
						var foundPlayer = false;
						var isTank = false;
						var numTanks = 0;
						//Check how many tanks are in the valid pool.
						for (var j=0; j<team1champs.length; j++) {
							if (toggles[j].checked) {
								for (var h=0; h<tanks.length; h++) {
									if (team1champs[j] === tanks[h]) {
										numTanks++;
									}
								}
							}
						}
						while (!foundPlayer) {
							randPlayer = Math.floor(Math.random()*5);
							if (toggles[randPlayer].checked) {
								//Make sure the player is not already a tank
								if (totalt1members != 1) {
									for (var z=0; z<tanks.length; z++) {
										if (team1champs[randPlayer] === tanks[z]) {
											isTank = true;
										}
									}
									//If all players are tanks, then force the selected player to become a support.
									if (numTanks === totalt1members) {
										foundPlayer = true;
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
						var isSupport = false;
						var numSupports = 0;
						//Check how many supports are in the valid pool.
						for (var j=0; j<team1champs.length; j++) {
							if (toggles[j].checked) {
								for (var h=0; h<supports.length; h++) {
									if (team1champs[j] === supports[h]) {
										numSupports++;
									}
								}
							}
						}
						while (!foundPlayer) {
							randPlayer = Math.floor(Math.random()*5);
							if (toggles[randPlayer].checked) {
								//Make sure the player is not already a support
								if (totalt1members != 1) {
									for (var z=0; z<supports.length; z++) {
										if (team1champs[randPlayer] === supports[z]) {
											isSupport = true;
										}
									}
									//If all players are supports, then force the selected player to become a tank.
									if (numSupports === totalt1members) {
										foundPlayer = true;
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
				if (totalt2members === 1) {
					var foundPlayer = false;
					while (!foundPlayer) {
						randPlayer = Math.floor(Math.random()*5);
						if (toggles[randPlayer+5].checked) {
							foundPlayer = true;
						}
					}
					//Check if they're a support already.
					var isSupport = false;
					for (var z=0; z<supports.length; z++) {
						if (team2champs[randPlayer] === supports[z]) {
							isSupport = true;
						}
					}
					var numSupports = 0;
					//Check how many supports are in the valid pool.
					for (var j=0; j<team1champs.length; j++) {
						for (var h=0; h<supports.length; h++) {
							if (team2champs[j] === supports[h]) {
								numSupports++;
							}
						}
					}
					//Check if they're a tank already.
					var isTank = false;
					for (var z=0; z<tanks.length; z++) {
						if (team2champs[randPlayer] === tanks[z]) {
							isTank = true;
						}
					}
					var numTanks = 0;
					//Check how many tanks are in the valid pool.
					for (var j=0; j<team1champs.length; j++) {
						for (var h=0; h<tanks.length; h++) {
							if (team2champs[j] === tanks[h]) {
								numTanks++;
							}
						}
					}
					//If the team does not have a support, or the team has 1 support and this player is the support, turn them into a support.
					if ((!team2support || (team2support && isSupport)) && numSupports < 2) {
						rand = Math.floor(Math.random()*supports.length);
						champID = rand;
						champ = supports[rand];
						team2champs[randPlayer] = champ;
						images[randPlayer+5].src = champ + ".png";
						team2support = true;
						team2tank = true;
					} else if ((!team2tank || (team2tank && isTank)) && numTanks < 2) { //If the team does not have a tank, or the team has 1 tank and this player is the tank, turn them into a tank.
						rand = Math.floor(Math.random()*tanks.length);
						champID = rand;
						champ = tanks[rand];
						team2champs[randPlayer] = champ;
						images[randPlayer+5].src = champ + ".png";
						team2support = true;
						team2tank = true;
					}
				} else {
					//If there is no support, choose a random player to become a support (if their box is checked).
					if (!team2support) {
						var foundPlayer = false;
						var isTank = false;
						var numTanks = 0;
						//Check how many tanks are in the valid pool.
						for (var j=0; j<team2champs.length; j++) {
							if (toggles[j+5].checked) {
								for (var h=0; h<tanks.length; h++) {
									if (team2champs[j] === tanks[h]) {
										numTanks++;
									}
								}
							}
						}
						while (!foundPlayer) {
							randPlayer = Math.floor(Math.random()*5);
							if (toggles[randPlayer+5].checked) {
								//Make sure the player is not already a tank
								if (totalt2members != 1) {
									for (var z=0; z<tanks.length; z++) {
										if (team2champs[randPlayer] === tanks[z]) {
											isTank = true;
										}
									}
									//If all players are tanks, then force the selected player to become a support.
									if (numTanks === totalt2members) {
										foundPlayer = true;
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
						var isSupport = false;
						var numSupports = 0;
						//Check how many supports are in the valid pool.
						for (var j=0; j<team2champs.length; j++) {
							if (toggles[j+5].checked) {
								for (var h=0; h<supports.length; h++) {
									if (team2champs[j] === supports[h]) {
										numSupports++;
									}
								}
							}
						}
						while (!foundPlayer) {
							randPlayer = Math.floor(Math.random()*5);
							if (toggles[randPlayer+5].checked) {
								//Make sure the player is not already a support
								if (totalt2members != 1) {
									for (var z=0; z<supports.length; z++) {
										if (team2champs[randPlayer] === supports[z]) {
											isSupport = true;
										}
									}
									//If all players are supports, then force the selected player to become a tank.
									if (numSupports === totalt2members) {
										foundPlayer = true;
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
		}
		
		//If mirror matchups are not on, make sure that none of the champions are duplicates across teams.
		if (!toggleMirror.checked) {
			//Set the mirror array to be the composite of both teams' arrays.
			for (y=0; y<noMirror.length; y++) {
				if (y<5) {
					noMirror[y] = team1champs[y];
				} else {
					noMirror[y] = team2champs[y-5];
				}
			}
			//Check how many supports are on each team.
			var numSupportsT1 = 0;
			var numSupportsT2 = 0;
			for (var q=0; q<team1champs.length; q++) {
				for (var z=0; z<supports.length; z++) {
					if (team1champs[q] === supports[z]) {
						numSupportsT1++;
					}
				}
			}
			for (var q=0; q<team2champs.length; q++) {
				for (var z=0; z<supports.length; z++) {
					if (team2champs[q] === supports[z]) {
						numSupportsT2++;
					}
				}
			}
			//Check how many tanks are on each team.
			var numTanksT1 = 0;
			var numTanksT2 = 0;
			for (var q=0; q<team1champs.length; q++) {
				for (var z=0; z<tanks.length; z++) {
					if (team1champs[q] === tanks[z]) {
						numTanksT1++;
					}
				}
			}
			for (var q=0; q<team2champs.length; q++) {
				for (var z=0; z<tanks.length; z++) {
					if (team2champs[q] === tanks[z]) {
						numTanksT2++;
					}
				}
			}
			//alert(""+team1champs+":"+numSupportsT1+":"+numTanksT1);
			//alert(""+team2champs+":"+numSupportsT2+":"+numTanksT2);
			//Loop through each toggle
			for (i=0; i<toggles.length; i++) {
				if (toggles[i].checked) {
					//Check the champion in the mirror array corresponding with the current toggle versus the champ list of the opposing team.
					if (i<5) { //If the number is less than 5, check them against team 2
						for (x=0; x<team2champs.length; x++) {
							//If the champs are the same, randomize a fresh champ.
							if (noMirror[i] === team2champs[x]) {
								//Check if the champion is a support.
								var isSupport = false;
								var isTank = false;
								for (var z=0; z<supports.length; z++) {
									if (noMirror[i] === supports[z]) {
										isSupport = true;
									}
								}
								//If they are not a support, check if they're a tank.
								if (!isSupport) {
									for (var z=0; z<tanks.length; z++) {
										if (noMirror[i] === tanks[z]) {
											isTank = true;
										}
									}
								}
								//If they are a support and there is only one support and fair teams are on, randomize them into a support.
								if (isSupport && numSupportsT1 === 1 && toggleFair.checked) {
									rand = Math.floor(Math.random()*supports.length);
									champID = rand;
									champ = supports[rand];
									while (champ === team2champs[x]) {
										rand = Math.floor(Math.random()*supports.length);
										champID = rand;
										champ = supports[rand];
									}
								} else if (isTank && numTanksT1 === 1 && toggleFair.checked) { //If they are a tank and there is only one tank and fair teams are on, randomize them into a tank.
									rand = Math.floor(Math.random()*tanks.length);
									champID = rand;
									champ = tanks[rand];
									while (champ === team2champs[x]) {
										rand = Math.floor(Math.random()*tanks.length);
										champID = rand;
										champ = tanks[rand];
									}
								} else { //Randomize them into any champion.
									rand = Math.floor(Math.random()*champions.length);
									champID = rand;
									champ = champions[rand];
									while (champ === team2champs[x]) {
										rand = Math.floor(Math.random()*champions.length);
										champID = rand;
										champ = champions[rand];
									}
								}
								images[i].src = champ + ".png";
								images[i].style.border = ".3vw solid #FFFF00";
								noMirror[i] = champ;
								team1champs[i] = champ;
								//Restart the loop to check the new champion against the list again.
								x=0;
							}
						}
					} else {
						//Otherwise, check against team 1's champions.
						for (x=0; x<team1champs.length; x++) {
							//If the champs are the same, randomize a fresh champ.
							if (noMirror[i] === team1champs[x]) {
								//Check if the champion is a support.
								var isSupport = false;
								var isTank = false;
								for (var z=0; z<supports.length; z++) {
									if (noMirror[i] === supports[z]) {
										isSupport = true;
									}
								}
								//If they are not a support, check if they're a tank.
								if (!isSupport) {
									for (var z=0; z<tanks.length; z++) {
										if (noMirror[i] === tanks[z]) {
											isTank = true;
										}
									}
								}
								//If they are a support and there is only one support and fair teams are on, randomize them into a support.
								if (isSupport && numSupportsT1 === 1 && toggleFair.checked) {
									rand = Math.floor(Math.random()*supports.length);
									champID = rand;
									champ = supports[rand];
									while (champ === team1champs[x]) {
										rand = Math.floor(Math.random()*supports.length);
										champID = rand;
										champ = supports[rand];
									}
								} else if (isTank && numTanksT1 === 1 && toggleFair.checked) { //If they are a tank and there is only one tank and fair teams are on, randomize them into a tank.
									rand = Math.floor(Math.random()*tanks.length);
									champID = rand;
									champ = tanks[rand];
									while (champ === team1champs[x]) {
										rand = Math.floor(Math.random()*tanks.length);
										champID = rand;
										champ = tanks[rand];
									}
								} else { //Randomize them into any champion.
									rand = Math.floor(Math.random()*champions.length);
									champID = rand;
									champ = champions[rand];
									while (champ === team1champs[x]) {
										rand = Math.floor(Math.random()*champions.length);
										champID = rand;
										champ = champions[rand];
									}
								}								
								images[i].src = champ + ".png";
								images[i].style.border = ".3vw solid #FFFF00";
								noMirror[i] = champ;
								team2champs[i-5] = champ;
								//Restart the loop to check the new champion against the list again.
								x=0;
							}
						}
					}
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
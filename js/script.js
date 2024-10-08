function main() {
	createCheckboxTemplate();
}

function createCheckboxTemplate() {
	let checkboxRef = document.getElementById("checkboxContent");
	for (let leagueIndex = 0; leagueIndex < league.length; leagueIndex++) {
		const element = league[leagueIndex];
		checkboxRef.innerHTML += checkboxTemplate(element);
	}
}

function randomTeam() {
	let content = document.getElementById("content");
	let error = document.getElementById("errormessage");
	let randomTeam = [
		bundesligaTeams[Math.floor(Math.random() * bundesligaTeams.length)],
		zweiteBundesligaTeams[Math.floor(Math.random() * zweiteBundesligaTeams.length)],
		dritteLigaTeams[Math.floor(Math.random() * dritteLigaTeams.length)],
		premierLeagueTeams[Math.floor(Math.random() * premierLeagueTeams.length)],
		ligue1Teams[Math.floor(Math.random() * ligue1Teams.length)],
		laLigaTeams[Math.floor(Math.random() * laLigaTeams.length)],
		serieATeams[Math.floor(Math.random() * serieATeams.length)],
	];
	let checkboxBundesliga = document.getElementById("Bundesliga");
	let checkboxZweiteBundesliga = document.getElementById("2 Bundesliga");
	let checkboxDritteLiga = document.getElementById("3 Bundesliga");
	let checkboxPremierLeague = document.getElementById("Premier League");
	let checkboxLigue1 = document.getElementById("ligue1");
	let checkboxLaLiga = document.getElementById("laliga");
	let checkboxSerieA = document.getElementById("serie a");
	if (checkboxBundesliga.checked) {
		content.innerHTML = randomTeam[0];
	} else if (checkboxZweiteBundesliga.checked) {
		content.innerHTML = randomTeam[1];
	} else if (checkboxDritteLiga.checked) {
		content.innerHTML = randomTeam[2];
	} else if (checkboxPremierLeague.checked) {
		content.innerHTML = randomTeam[3];
	} else if (checkboxLigue1.checked) {
		content.innerHTML = randomTeam[4];
	} else if (checkboxLaLiga.checked) {
		content.innerHTML = randomTeam[5];
	} else if (checkboxSerieA.checked) {
		content.innerHTML = randomTeam[6];
	} else {
		error.innerHTML = errorTemplate("Keine Option ausgewählt.");
	}
}

function validateCheckbox() {
	let error = document.getElementById("errormessage");
	let checkboxes = league;
	let selectCount = 0;
	let selectOptions = [];

	checkboxes.forEach(function (checkboxId) {
		let checkbox = document.getElementById(checkboxId);
		if (checkbox.checked) {
			selectCount++;
			selectOptions.push(checkbox.value);
		}
	});
	if (selectCount > 1) {
		error.innerHTML = errorTemplate("Es darf nur eine Option ausgewählt werden.");
	} else if (selectCount === 0) {
		error.innerHTML = errorTemplate("Keine Option ausgewählt.");
	} else {
		error.innerHTML = "";
	}
}

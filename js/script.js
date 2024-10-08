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
	let content1 = document.getElementById("content1");
	let error = document.getElementById("errormessage");
	let leagues = [
		{checkbox: "Bundesliga", teams: bundesligaTeams},
		{checkbox: "2 Bundesliga", teams: zweiteBundesligaTeams},
		{checkbox: "3 Bundesliga", teams: dritteLigaTeams},
		{checkbox: "Premier League", teams: premierLeagueTeams},
		{checkbox: "ligue1", teams: ligue1Teams},
		{checkbox: "laliga", teams: laLigaTeams},
		{checkbox: "serie a", teams: serieATeams},
	];
	if (validateCheckbox() === false) {
		content.innerHTML = "";
		content1.innerHTML = "";
	} else {
		error.innerHTML = "";
		for (let league of leagues) {
			let checkbox = document.getElementById(league.checkbox);
			if (checkbox.checked) {
				content.innerHTML = league.teams[Math.floor(Math.random() * league.teams.length)];
				content1.innerHTML = league.teams[Math.floor(Math.random() * league.teams.length)];
				return;
			}
		}
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
		return false;
	} else if (selectCount === 0) {
		error.innerHTML = errorTemplate("Keine Option ausgewählt.");
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

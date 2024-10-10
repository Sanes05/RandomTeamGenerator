function main() {
	createCheckboxTemplate();
	overlay();
}

const names = [];

function getName() {
	let nameInputref = [document.getElementById("name").value, document.getElementById("name1").value];
	let error = document.getElementById("overlay-error");
	if ((nameInputref[0] === "", nameInputref[1] === "")) {
		error.innerHTML = errorTemplate("Bitte gebe zwei Namen ein");
	} else {
		error.innerHTML = "";
		names.push(nameInputref[0]);
		names.push(nameInputref[1]);
		overlay();
	}
}

function noName() {
	overlay();
	names.push("Spieler 1");
	names.push("Spieler 2");
}

function createCheckboxTemplate() {
	let checkboxRef = document.getElementById("checkboxContent");
	for (let leagueIndex = 0; leagueIndex < league.length; leagueIndex++) {
		const element = league[leagueIndex];
		checkboxRef.innerHTML += checkboxTemplate(element);
	}
}

function randomTeam() {
	let content = [document.getElementById("content"), document.getElementById("content1")];
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
		content[0].innerHTML = "";
		content[1].innerHTML = "";
	} else {
		error.innerHTML = "";
		for (let league of leagues) {
			let checkbox = document.getElementById(league.checkbox);
			if (checkbox.checked) {
				let teams = [league.teams[Math.floor(Math.random() * league.teams.length)], league.teams[Math.floor(Math.random() * league.teams.length)]];
				if (teams[0] === teams[1]) {
					teams[1] = league.teams[Math.floor(Math.random() * league.teams.length)];
				} else {
					content[0].innerHTML = mainTemplate(teams[0], names[0] + " :");
					content[1].innerHTML = mainTemplate(teams[1], names[1] + " :");
					return;
				}
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

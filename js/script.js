function main() {
	createCheckboxTemplate();
}

const league = ["Bundesliga", "2 Bundesliga", "3 Bundesliga", "Premier League", "ligue1", "laliga", "serie a"];

function createCheckboxTemplate() {
	let checkboxRef = document.getElementById("checkboxContent");
	for (let leagueIndex = 0; leagueIndex < league.length; leagueIndex++) {
		const element = league[leagueIndex];
		checkboxRef.innerHTML += checkboxTemplate(element);
	}
}

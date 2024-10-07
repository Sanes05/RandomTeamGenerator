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

function checkboxTemplate(element) {
	return `<div class="checkbox-div">
        <input class="checkbox" type="checkbox" id="${element}">
            <label class="checkbox-lable" for="${element}">
                ${element}
            </label>
    </div>`;
}

function mainTemplate(teams, name) {
	return `
    <p class="main-p">
        ${name}
    </p>
	<p class="main-p">
		${teams}
	</p>`;
}

function errorTemplate(message) {
	return `<p class="error-message">
        ${message}
    </p>`;
}

function overlayTemplate() {
	return `
            <div class="overlay-background" onclick="noName()"></div>
			<div class="overlay-content">
				<h1 class="overlay-headline">Bitte gebe ein name ein</h1>
				<div class="overlay-input-div">
					<input class="overlay-input" type="text" id="name" />
					<label for="name">Erster Name</label>
				</div>
				<div class="overlay-input-div">
					<input class="overlay-input" type="text" id="name1" />
					<label for="name1">Zweiter Name</label>
				</div>
				<div class="overlay-btn-div">
					<button class="overlay-btn" onclick="getName()">Name Hinzufügen</button>
					<button class="overlay-btn" onclick="noName()">Ohne Name drehen</button>
				</div>
				<div class="overlay-error" id="overlay-error"></div>
			</div>
    `;
}

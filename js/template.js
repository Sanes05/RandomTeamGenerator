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

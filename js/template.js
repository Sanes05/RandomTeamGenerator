function checkboxTemplate(element) {
	return `<div class="checkbox-div">
        <input class="checkbox" type="checkbox" id="${element}">
            <label class="checkbox-lable" for="${element}">
                ${element}
            </label>
    </div>`;
}

function errorTemplate(message) {
	return `<p class="error-message">
        ${message}
    </p>`;
}

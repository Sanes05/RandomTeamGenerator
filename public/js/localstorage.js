function setNametoLoacalStorage(names) {
	const namesArr = names;
	localStorage.setItem("name", JSON.stringify(namesArr));
}

function getNamesFromLocalStorage() {
	const namesRef = JSON.parse(localStorage.getItem("name"));
	if (namesRef === null) {
		return false;
	} else {
		names.push(namesRef[0]);
		names.push(namesRef[1]);
		overlay();
		return true;
	}
}

function removeItemFromLocalStorage() {
	localStorage.removeItem("name");
	return true;
}

var uploadContainer = getBy('class', 'upload-container')[0],
    selectBtn       = getBy('class', 'select-button')[0],
    dropText        = getBy('class', 'drop-text'),
    submitBtn       = getBy('name', 'submit'),
    draggedOver     = false,
    data;

function getBy(attribute, value) {
	if (attribute === 'tag') {
		return document.getElementsByTagName(value);
	}
	else if (attribute === 'id') {
		return document.getElementById(value);
	}
	else if (attribute === 'name') {
		return document.getElementsByName(value)[0];
	}
	else if (attribute === 'class') {
		return document.getElementsByClassName(value);
	}
	else if (attribute === 'query') {
		return document.querySelector(value);
	}
}

function ajax(data) {
	console.log(data);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'files_infos.php');
	xhr.send(data);
	xhr.onload = response;
}

function response() {
	console.log(this.responseText);

	getBy('id', 'responseContainer').innerHTML = this.responseText;
}

function dropHandler(e) {
	console.log(e.dataTransfer);

	data = new FormData();
	data.append('dragged_files', e.dataTransfer.files[0]);

	dropText[0].innerHTML = e.dataTransfer.files[0].name;
	dropText[1].classList.add('hidden');
	selectBtn.classList.add('hidden');
}

uploadContainer.addEventListener('dragover', (e) => {
	e.preventDefault();

	if (!draggedOver) {
		draggedOver = true;
		console.log('dragging file over...');
	}
});

uploadContainer.addEventListener('drop', (e) => {
	e.preventDefault();

	dropHandler(e);
	draggedOver = false;
});

selectBtn.addEventListener('click', () => {
	var selectFiles = getBy('name', 'select-files');

	selectFiles.click();
	selectFiles.onchange  = (e) => {
		data = new FormData();
		data.append('selected_files', selectFiles.files[0]);

		dropText[0].innerHTML = selectFiles.files[0].name;
		dropText[1].classList.add('hidden');
		selectBtn.classList.add('hidden');
	};
});

submitBtn.addEventListener('click', () => {
	ajax(data);
});

var uploadContainer = getBy('class', 'upload-container')[0],
    selectBtn       = getBy('id', 'selectButton'),
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

function showHideElements(element) {
	element = element.classList;

	if (element.contains('hidden')) {
		element.remove('hidden')
	}
	else {
		element.add('hidden');
	}
}

function appendData(attachmentType, files) {
	data = new FormData();
	data.append(attachmentType + '_files', files);

	submitView(files.name);
}

function submitView(filename) {
	dropText[0].innerHTML = filename;
	showHideElements(dropText[1]);
	showHideElements(selectBtn);
}

function responseView(response) {
	getBy('id', 'responseContainer').innerHTML = response;
	showHideElements(submitBtn);
}

function initView() {
	dropText[0].innerHTML = 'Drop your files here...';
	showHideElements(dropText[1]);
	showHideElements(selectBtn);
	showHideElements(submitBtn);

	getBy('id', 'responseContainer').innerHTML = '';
}

function ajax(data) {
	console.log(data);

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'files_infos.php');
	xhr.send(data);
	xhr.onload = response;
}

function response() {
	console.log(this.responseText);

	responseView(this.responseText);
}

function dropHandler(e) {
	appendData('dragged', e.dataTransfer.files[0]);
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
	let selectFiles = getBy('name', 'select-files');

	selectFiles.click();
	selectFiles.onchange = () => {
		appendData('selected', selectFiles.files[0]);
	};
});

submitBtn.addEventListener('click', () => {
	ajax(data);
});

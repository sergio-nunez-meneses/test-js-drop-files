var click       = getBy('id', 'clickToUpload'),
    drop        = getBy('id', 'dropToUpload'),
    dropText = getBy('class', 'drop-text')[0],
    draggedOver = false;

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

function dropHandler(e) {
	console.log(e.dataTransfer);

	dropText.innerHTML = e.dataTransfer.files[0].name;
}

drop.addEventListener('dragover', (e) => {
	e.preventDefault();

	if (!draggedOver) {
		draggedOver = true;
		console.log('dragging file over...');
	}
});

drop.addEventListener('drop', (e) => {
	e.preventDefault();

	dropHandler(e);
	draggedOver = false;
});

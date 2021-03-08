var click = getBy('id', 'clickToUpload');
var drop = getBy('id', 'dropToUpload');

function getBy(attribute, value) {
    if (attribute === 'tag') {
        return document.getElementsByTagName(value);
    } else if (attribute === 'id') {
        return document.getElementById(value);
    } else if (attribute === 'name') {
        return document.getElementsByName(value)[0];
    } else if (attribute === 'class') {
        return document.getElementsByClassName(value);
    } else if (attribute === 'query') {
        return document.querySelector(value);
    }
}

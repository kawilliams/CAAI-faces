/*
form name='faceUploadForm'
input id='myfile', name='fileToUpload'
input id='uploadImage', name='submit', value='Upload Image'
*/


function submitImage() {
	document.getElementById("faceUploadForm").submit();
}

const fileElem = document.getElementById("myfile");
/// Listen for uploads
fileElem.addEventListener("change", submitImage, false);

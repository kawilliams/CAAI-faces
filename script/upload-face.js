console.log("upload-face.js");
/*
form name='faceUploadForm'
input id='myfile', name='fileToUpload'
input id='uploadImage', name='submit', value='Upload Image'
*/

const svgId = "uploadSVG";
const divId = "uploadFace";
// const formName = "faceUpload";
const fileId = "myfile";
// const submitId = "uploadImage";

const target_dir = 'uploaded-faces/';
var uploadOk = 1;

// const fileInput = document.getElementById("uploadImage");
const fileElem = document.getElementById(fileId);

function submitImage() {
	console.log("Image submitted", this.files);
	var div = document.getElementById('imageContainer');
	//Clear existing elements
	while (div.firstChild) { div.removeChild(div.firstChild); }
	//Only accept the first file
	var file = this.files[0];
	console.log("name", file.name);
	//Check file size
	if (file.size > 5000000) {
		console.log("Sorry, your file is too large.");
		uploadOk = 0;
	}

}


/// Listen for uploads
fileElem.addEventListener("change", submitImage, false);

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
var error = "";

// const fileInput = document.getElementById("uploadImage");
const fileElem = document.getElementById(fileId);

function submitImage() {
	var div = document.getElementById('imageContainer');
	//Clear existing elements
	while (div.firstChild) { div.removeChild(div.firstChild); }
	
	//Only accept the first file
	var file = this.files[0];

	//Check file type
	if (file.type.startsWith('image/')) {
		uploadOk = 1;
	} else {
		error += "File is not an image. ";
		uploadOk = 0;
	}


	//Check if file already exists
	var fullFileName = target_dir + file.name;

	//Check file size
	if (file.size > 5000000) { //5 MB
		error += "File is too large, file size must be under 5 MB. ";
		uploadOk = 0;
	}

	//Allow certain file formats
	if ((file.type.split('/')[1].toLowerCase() == 'jpeg') ||
			(file.type.split('/')[1].toLowerCase() == 'png')){
		uploadOk = 1;
	} else {
		error += "File type not supported. ";
		uploadOk = 0;
	}

	//Check if uploadOk is still 1
	if (uploadOk) {
		const img = document.createElement("img");
		img.classList.add("obj");
		img.src = URL.createObjectURL(file);
		img.onload = function() { URL.revokeObjectURL(this.src);}
		div.appendChild(img);
		document.getElementById("showFileSelected").innerHTML = file.name;

		
	} else {
		//There was an error
		const errorMsg = document.createElement("p");
		errorMsg.innerHTML = error;
		div.appendChild(errorMsg);
		
	}


}


/// Listen for uploads
fileElem.addEventListener("change", submitImage, false);

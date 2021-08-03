/*
form name='faceUploadForm'
input id='myfile', name='fileToUpload'
input id='uploadImage', name='submit', value='Upload Image'
*/

const fileElem = document.getElementById("myfile");

/// Listen for uploads
fileElem.addEventListener("change", submitImage, false);


function submitImage() {
	document.getElementById("faceUploadForm").submit();
	var imageText = document.getElementById("imageLoading");
	const loadMessages = ["Submitted image...", "Checking if CNN can process image...", "Processing image..."];
	
	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function showLoadingMessages() {
	  imageText.innerHTML = loadMessages[0];
	  await sleep(1500);
	  imageText.innerHTML = loadMessages[1];
	  await sleep(1500);
	  imageText.innerHTML = loadMessages[2];
	}
	
	showLoadingMessages();
}

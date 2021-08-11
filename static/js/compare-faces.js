var svgDimensions = { width: 550, height: 350};
var margin = {
	right: 10,
	left: 10,
	top: 10,
	bottom: 10
};

var imageDimensions = {
	height: 200,
	width: 200,
	xleft: 40,
	xright: 310,
	yleft: 10,
	yright: 10
};

var nextDimensions = {
	x: 0.5 * svgDimensions.width - 50,
	y: svgDimensions.height - 80,
	width: 100,
	height: 50
};

var numberOfPairs = 16;
var imageIndex = 1;
var score = 0;
var compScoreAll = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var answerKey = ['L','L','R','R','L','R','L','L','L','L','L','R','L','L','R','L'];

function checkImage() {
	var imageClass = d3.select(this).attr('class');
	
	// The side that was clicked and what pair
	var imageSide = imageClass.split(' ')[0];
	imageSide = (imageSide == 'leftImage') ? 'L' : 'R';
	var pairNumber = +(imageClass.split(' ')[1][0]);

	// The actual winner and loser
	var winner = answerKey[pairNumber];
	var loser = (winner == 'R') ? 'L' : 'R';
	
	var winnerRect = (winner == 'R') ? "#rightRectId" : "#leftRectId";
	var loserImage = (winner == 'R') ? "#leftImageId" : "#rightImageId";

	//Fade the loser's photo
	d3.select(loserImage)
		.style('stroke-width', '10px')
		.style('fill', '#ececec') //match background light grey
		.style('opacity', '30%');

	//Outline the winner's photo in light blue
	d3.select(winnerRect)
		.style('stroke', '#48A9C5')
		.style('stroke-width', '10px');

	//If you correctly guessed the image, have Correct! beneath it
	if (imageSide == answerKey[pairNumber]) {
		d3.select('#imageText').text('Correct!')
			.attr('display', 'inline')
			.attr('x', (winner == 'L') ? 103 : 376);
		score = (score + 1) % numberOfPairs;
	}
	//Otherwise, show who the Actual Winner is
	else {
		d3.select('#imageText').text('Actual Winner')
			.attr('display', 'inline')
			.attr('x', (winner == 'L') ? 85 : 360);

	}
	compScore = compScoreAll[imageIndex];

	d3.select("#yourScore")
		.text("Your score: " + score + "/" + imageIndex);
	d3.select("#computerScore")
		.text("Computer score: " + compScore + "/" + imageIndex);
	
}

function changeImages() {
	//Update the global imageIndex variable

	imageIndex = (imageIndex+1)%numberOfPairs;
	if (imageIndex == 0) imageIndex = 1;
	var filenameLeft = "static/compare-faces/pair" + imageIndex + "-L.jpg";
	var filenameRight = "static/compare-faces/pair" + imageIndex + "-R.jpg";

	//Update the images and make sure they are interactive
	d3.select('#leftImageId')
		.attr('xlink:href', filenameLeft)
		.attr('class', 'leftImage ' + imageIndex + "-pair imageJpg")
		.attr('cursor', 'pointer')
		.on('click', checkImage);
	d3.select('#rightImageId')
		.attr('xlink:href', filenameRight)
		.attr('class', 'rightImage ' + imageIndex + "-pair imageJpg")
		.attr('cursor', 'pointer')
		.on('click', checkImage);

	//Restore outline to normal
	d3.selectAll(".imageRect")
		.style('stroke-width', '0px')
		.style('fill', 'none');

	//Restore image opacity to normal
	d3.selectAll(".imageJpg")
		.style('opacity', '100%');
	//Update the class to the correct image pair
	d3.select('#leftRectId')
		.attr('class', 'leftImage ' + imageIndex + "-pair imageRect");
	d3.select('#rightRectId')
		.attr('class', 'rightImage ' + imageIndex + "-pair imageRect");
	//Hide any "Correct!" or "Actual winner" text
	d3.select("#imageText").attr('display', 'none');
	if (imageIndex == (numberOfPairs-1)) {
		showEndScreen();
	}
	if (imageIndex == 1) {
		reset();
	}
}

function reset() {
	// Sets the game back to the first pair
	d3.selectAll(".visText").remove();
	d3.selectAll(".leftImage").attr('display', 'inline');
	d3.selectAll(".rightImage").attr('display', 'inline');
	score = 0;

}

function showEndScreen() {
	d3.selectAll('.leftImage').attr('display', 'none');
	d3.selectAll('.rightImage').attr('display', 'none');
	d3.select("#compareSVG").append('text')
		.attr('class', 'visText')
		.attr('x', 160)
		.attr('y', 100)
		.text('You scored ' + score + "/" + numberOfPairs + ", while the");
	d3.select("#compareSVG").append('text')
		.attr('class', 'visText')
		.attr('x', 160)
		.attr('y', 140)
		.text("computer averages 100%.");
	d3.select("#compareSVG").append('text')
		.attr('class', 'visText')
		.attr('x', 160)
		.attr('y', 180)
		.text("Click the arrow to try again.");

}

////////// Visualization ////////
var svg = d3.select('#compareSVG')
	.attr('preserveAspectRatio', 'xMidYMid meet')
	.attr('viewBox', '0 0 ' + svgDimensions.width + ' ' +svgDimensions.height);

var svgBackground = svg.append('rect')
	.attr('x', margin.left)
	.attr('y', margin.top)
	.attr('width', svgDimensions.width - 20)
	.attr('height', svgDimensions.height - 20)
	.attr('fill', 'none');

var imagesG = svg.append('g')
	.attr('id', 'imagesG')
	.attr('x', margin.left)
	.attr('y', margin.right);

var nextButton = svg.append('rect')
	.attr('x', nextDimensions.x)
	.attr('y', nextDimensions.y)
	.attr('height', nextDimensions.height)
	.attr('width', nextDimensions.width)
	.style('rx', '10px')
	.attr('fill', '#1B365D')
	.attr('cursor', 'pointer')
	.on('click', changeImages);

svg.append('path')
	.attr('d',"M"+(nextDimensions.x+0.5*nextDimensions.width)+","+ (nextDimensions.y + 0.5*nextDimensions.height)+"l-7.083,-7.081l1.916,-1.916l8.997,8.997l-9.002,9.003l-1.916,-1.916z")
	.attr('id', 'rightArrow')
	.style('stroke', 'white')
	.attr('stroke-width', '5px')
	.attr('cursor', 'pointer')
	.on('click', changeImages);
	
var filenameLeft = "static/compare-faces/pair" + imageIndex + "-L.jpg";
var filenameRight = "static/compare-faces/pair" + imageIndex + "-R.jpg";


var leftImage = imagesG.append('svg:image')
	.attr('x', imageDimensions.xleft)
	.attr('y', imageDimensions.yleft)
	.attr('id', 'leftImageId')
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'leftImage ' + imageIndex + "-pair imageJpg")
	.attr('xlink:href', filenameLeft)
	.attr('cursor', 'pointer')
	.on('click', checkImage);

var leftRect = imagesG.append('rect')
	.attr('x', imageDimensions.xleft - 5)
	.attr('y', imageDimensions.yleft - 5)
	.attr('id', 'leftRectId')
	.attr('width', imageDimensions.width + 10)
	.attr('height', imageDimensions.height + 10)
	.attr('class', 'leftImage ' + imageIndex + "-pair imageRect")
	.style('stroke-width', '0px')
	.style('fill', 'none')
	.on('click', checkImage);
imagesG.append('text')
	.attr('id', 'imageText')
	.attr('x', 0.5 * imageDimensions.width - 2)
	.attr('y', imageDimensions.yleft + imageDimensions.height + 40)
	.text('Actual Winner')
	.attr('display', 'none')
	.style('fill', '#39393a');

var rightImage = imagesG.append('svg:image')
	.attr('x', imageDimensions.xright)
	.attr('y', imageDimensions.yright)
	.attr('id', 'rightImageId')
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'rightImage ' + imageIndex + "-pair imageJpg")
	.attr('xlink:href', filenameRight)
	.attr('cursor', 'pointer')
	.on('click', checkImage);

var rightRect = imagesG.append('rect')
	.attr('x', imageDimensions.xright - 5)
	.attr('y', imageDimensions.yright - 5)
	.attr('id', 'rightRectId')
	.attr('width', imageDimensions.width + 10)
	.attr('height', imageDimensions.height + 10)
	.attr('class', 'rightImage ' + imageIndex + "-pair imageRect")
	.style('stroke-width', '0px')
	.style('fill', 'none')
	.on('click', checkImage);

var yourScore = imagesG.append('text')
	.attr('id', "yourScore")
	.attr('class', 'visText')
	.attr('x', imageDimensions.xleft + 40)
	.attr('y', imageDimensions.yleft + imageDimensions.height + 20)
	.text('Your score: 0/0');

var computerScore = imagesG.append('text')
	.attr('id', "computerScore")
	.attr('class', 'visText')
	.attr('x', imageDimensions.xright + 20)
	.attr('y', imageDimensions.yright + imageDimensions.height + 20)
	.text('Computer score: 0/0');
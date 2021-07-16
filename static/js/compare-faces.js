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

var numberOfPairs = 3;
var i = 0;

var bottomTextWords = [''];
var answerKey = ['leftImage', 'rightImage', 'leftImage', 'rightImage'];

function checkImage() {
	var imageClass = d3.select(this).attr('class');
	var imageId = d3.select(this).attr('id');
	
	var imageSide = imageClass.split(' ')[0];
	var pairNumber = +(imageClass.split(' ')[1][0]);
	var otherImageSide = (imageSide == 'rightImage') ? 'leftImage' : 'rightImage';
	var winner = answerKey[pairNumber];
	var loser = (winner == 'rightImage') ? 'leftImage' : 'rightImage';
	
	var winnerRect = (winner == 'rightImage') ? "#rightRectId" : "#leftRectId";
	var loserImage = (winner == 'rightImage') ? "#leftImageId" : "#rightImageId";

	//Fade the loser's photo
	d3.select(loserImage)
		.style('stroke-width', '10px')
		.style('fill', '#ececec') //match background light grey
		.style('opacity', '30%');

	//Outline the winner's photo in light blue
	d3.select(winnerRect)
		.style('stroke', '#48A9C5')
		.style('stroke-width', '10px');
	
	if (imageSide == answerKey[pairNumber]) {
		d3.select('#imageText').text('Correct!')
			.attr('display', 'inline')
			.attr('x', (winner == 'leftImage') ? 103 : 380);
	}
	else {
		d3.select('#imageText').text('Actual winner')
			.attr('display', 'inline')
			.attr('x', (winner == 'leftImage') ? 85 : 360);

	}
}

function changeImages() {
	i = (i+1)%numberOfPairs;
	var filenameLeft = "static/compare-faces/pair" + i + "-L.jpg";
	var filenameRight = "static/compare-faces/pair" + i + "-R.jpg";

	d3.select('#leftImageId')
		.attr('xlink:href', filenameLeft)
		.attr('class', 'leftImage ' + i + "-pair imageJpg")
		.attr('cursor', 'pointer')
		.on('click', checkImage);
	d3.select('#rightImageId')
		.attr('xlink:href', filenameRight)
		.attr('class', 'rightImage ' + i + "-pair imageJpg")
		.attr('cursor', 'pointer')
		.on('click', checkImage);

	//Restore outline to normal
	d3.selectAll(".imageRect")
		.style('stroke-width', '0px')
		.style('fill', 'none');
	//Restore image opacity to normal
	d3.selectAll(".imageJpg")
		.style('opacity', '100%');
	d3.select('#leftRectId')
		.attr('class', 'leftImage ' + i + "-pair imageRect");
	d3.select('#rightRectId')
		.attr('class', 'rightImage ' + i + "-pair imageRect");

	d3.select("#imageText").attr('display', 'none');
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
	
var filenameLeft = "static/compare-faces/pair" + i + "-L.jpg";
var filenameRight = "static/compare-faces/pair" + i + "-R.jpg";


var leftImage = imagesG.append('svg:image')
	.attr('x', imageDimensions.xleft)
	.attr('y', imageDimensions.yleft)
	.attr('id', 'leftImageId')
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'leftImage ' + i + "-pair imageJpg")
	.attr('xlink:href', filenameLeft)
	.attr('cursor', 'pointer')
	.on('click', checkImage);

var leftRect = imagesG.append('rect')
	.attr('x', imageDimensions.xleft - 5)
	.attr('y', imageDimensions.yleft - 5)
	.attr('id', 'leftRectId')
	.attr('width', imageDimensions.width + 10)
	.attr('height', imageDimensions.height + 10)
	.attr('class', 'leftImage ' + i + "-pair imageRect")
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
	.attr('class', 'rightImage ' + i + "-pair imageJpg")
	.attr('xlink:href', filenameRight)
	.attr('cursor', 'pointer')
	.on('click', checkImage);

var rightRect = imagesG.append('rect')
	.attr('x', imageDimensions.xright - 5)
	.attr('y', imageDimensions.yright - 5)
	.attr('id', 'rightRectId')
	.attr('width', imageDimensions.width + 10)
	.attr('height', imageDimensions.height + 10)
	.attr('class', 'rightImage ' + i + "-pair imageRect")
	.style('stroke-width', '0px')
	.style('fill', 'none')
	.on('click', checkImage);

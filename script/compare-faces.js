console.log("compare-faces.js");
var svgDimensions = { width: 350, height: 450};
var margin = {
	right: 10,
	left: 10,
	top: 10,
	bottom: 10
};

var imageDimensions = {
	xleft: 20,
	xright: 130,
	yleft: 10,
	yright: 10,
	height: 200,
	width: 100
}
var padding = 10;
var numberOfPairs = 1;

var topTextWords = ['These two candidates ran for election. Click on who you think won the election.'];
var bottomTextWords = ['Click above.'];
var answerKey = ['L', 'R', 'L'];

////////// Visualization ////////
var svg = d3.select('#compareSVG')
	.attr('width', svgDimensions.width)
	.attr('height', svgDimensions.height);

var svgBackground = svg.append('rect')
	.attr('x', margin.left)
	.attr('y', margin.top)
	.attr('width', svgDimensions.width - 20)
	.attr('height', svgDimensions.height - 20)
	.attr('fill', 'pink');

var topText = svg.append('text')
	.attr('id', 'topText')
	.attr('x', margin.left + padding)
	.attr('y', margin.top + padding)
	.text(topTextWords[0]);
// svg.selectAll('text.topTspan')
// 	.data(topTextWords[0])
// 	.enter()
// 	.append('tspan')
// 	.attr('class', 'topTspan')
// 	.attr('x', margin.left + padding)
// 	.attr('y', margin.top + padding)
// 	.text(d => {
// 		console.log(d);
// 		return d;
// 	});

var imagesG = svg.append('g')
	.attr('id', 'imagesG')
	.attr('x', margin.left)
	.attr('y', margin.right);

var bottomText = svg.append('text')
	.attr('id', 'bottomText')
	.attr('x', margin.left + padding)
	.attr('y', svgDimensions.height - 50)
	.text(bottomTextWords[0]);

function checkImage(event, i) {
	
	var imageClass = d3.select(this).attr('class');
	var imageSide = imageClass.split(' ')[0].split('Image')[0];
	var pairNumber = +(imageClass.split(' ')[1].split('-')[0]);
	imageSide = (imageSide == 'right') ? 'R' : 'L';

	if (imageSide == answerKey[pairNumber]) {
		console.log("CORRECT");
	}
	else {
		console.log("--Incorect");
	}
	
}

// for (var i=0; i<numberOfPairs; i++) {
	var i = 1;
	var filenameLeft = "./compare-faces/pair" + i + "-L.jpg";
	var filenameRight = "./compare-faces/pair" + i + "-R.jpg";
	
	imagesG.append('svg:image')
		.attr('x', imageDimensions.xleft)
		.attr('y', imageDimensions.yleft)
		.attr('width', imageDimensions.width)
		.attr('height', imageDimensions.height)
		.attr('class', 'leftImage ' + i + "-pair")
		.attr('xlink:href', filenameLeft)
		.attr('cursor', 'pointer')
		.on('click', checkImage);

	imagesG.append('svg:image')
		.attr('x', imageDimensions.xright)
		.attr('y', imageDimensions.yright)
		.attr('width', imageDimensions.width)
		.attr('height', imageDimensions.height)
		.attr('class', 'rightImage ' + i + "-pair")
		.attr('xlink:href', filenameRight)
		.attr('cursor', 'pointer')
		.on('click', checkImage);



//}
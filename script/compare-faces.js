console.log("compare-faces.js");
var svgDimensions = { width: 550, height: 450};
var margin = {
	right: 10,
	left: 10,
	top: 10,
	bottom: 10
};

var imageDimensions = {
	height: 266,
	width: 200,
	xleft: 40,
	xright: 310,
	yleft: 100,
	yright: 100
};

var nextDimensions = {
	x: 0.5 * svgDimensions.width - 50,
	y: svgDimensions.height - 80,
	width: 100,
	height: 50
};

var padding = 10;
var numberOfPairs = 4;
var i = 0;

var topTextWords = ['Can you beat the computer? These two candidates ran for election. Based solely on their faces, click on the candidate who you think won.'];
var bottomTextWords = [''];
var text = {fontsize: 16}
var answerKey = ['leftImage', 'leftImage', 'leftImage', 'leftImage'];

/* Useful function to split text for tspan. 
Gives the effect of text wrapping. */
function wrapText(rectText, w) {
	var wrap = rectText.replace(
		new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
	);
	var wrapList = wrap.split('\n');
	return wrapList;
}

function checkImage() {
	var imageClass = d3.select(this).attr('class');
	var imageId = d3.select(this).attr('id');
	
	var imageSide = imageClass.split(' ')[0];
	var pairNumber = +(imageClass.split(' ')[1][0]);
	var otherImageSide = (imageSide == 'rightImage') ? 'leftImage' : 'rightImage';
	var winner = answerKey[pairNumber];
	var loser = (winner == 'rightImage') ? 'leftImage' : 'rightImage';
	//Outline the winner's photo in green
	d3.select('.imageRect.' + winner)
		.style('stroke', 'green')
		.style('stroke-width', '10px');
	//Fade the loser's photo
	d3.select('.imageRect.' + loser)
		.style('stroke-width', '10px')
		.style('fill', '#ececec') //match background light grey
		.style('opacity', '30%');
	//Add "Winner" text below winner
	d3.select('text.'+ winner).attr('display', 'inline');
	d3.select('text.'+ loser).attr('display', 'none');
	
	if (imageSide == answerKey[pairNumber]) {
		d3.select('#bottomText').text('Correct!');
	}
	else {
		d3.select('#bottomText').text('Incorrect.');
	}
}

function changeImages() {
	i = (i+1)%numberOfPairs;
	var filenameLeft = "./compare-faces/pair" + i + "-L.jpg";
	var filenameRight = "./compare-faces/pair" + i + "-R.jpg";

	d3.select('#leftImageId')
		.attr('xlink:href', filenameLeft)
		.attr('class', 'leftImage ' + i + "-pair")
		.attr('cursor', 'pointer')
		.on('click', checkImage);
	d3.select('#rightImageId')
		.attr('xlink:href', filenameRight)
		.attr('class', 'rightImage ' + i + "-pair")
		.attr('cursor', 'pointer')
		.on('click', checkImage);
	d3.selectAll(".imageRect")
		.style('stroke-width', '0px')
		.style('fill', 'none');
	d3.select('#leftRectId')
		.attr('class', 'leftImage ' + i + "-pair imageRect");
	d3.select('#rightRectId')
		.attr('class', 'rightImage ' + i + "-pair imageRect");

	d3.selectAll(".imageText").attr('display', 'none');
}

////////// Visualization ////////
var svg = d3.select('#compareSVG')
	.attr('preserveAspectRatio', 'xMidYMid meet')
	.attr('viewBox', '0 0 ' + svgDimensions.width + ' ' +svgDimensions.height)
	.attr('style', 'outline: thin solid red;');

var svgBackground = svg.append('rect')
	.attr('x', margin.left)
	.attr('y', margin.top)
	.attr('width', svgDimensions.width - 20)
	.attr('height', svgDimensions.height - 20)
	.attr('fill', 'none');

var topText = svg.append('text')
	.attr('id', 'topText')
	.attr('x', margin.left + padding)
	.attr('y', margin.top + padding)
topText.selectAll('text.topTspan')
	.data(wrapText(topTextWords[0], 74))
	.enter()
	.append('tspan')
	.attr('class', 'topTspan')
	.text(d => { return d;})
	.attr('x', 0.5 * svgDimensions.width)
	// .attr('y', margin.top + padding)
	.attr('dy', text.fontsize)
	.attr('font-size', text.fontsize)
	.style('text-anchor', 'middle');


var imagesG = svg.append('g')
	.attr('id', 'imagesG')
	.attr('x', margin.left)
	.attr('y', margin.right);

var bottomText = svg.append('text')
	.attr('id', 'bottomText')
	.attr('x', svgDimensions.width * 0.5)
	.attr('y', svgDimensions.height - 100)
	.text(bottomTextWords[0])
	.attr('font-size', text.fontsize)
	.attr('fill', '#1B365D')
	.style('text-anchor', 'middle');

var nextButton = svg.append('rect')
	.attr('x', nextDimensions.x)
	.attr('y', nextDimensions.y)
	.attr('height', nextDimensions.height)
	.attr('width', nextDimensions.width)
	.style('rx', '10px')
	.attr('fill', '#1B365D')
	.on('click', changeImages);

svg.append('path')
	.attr('d',"M"+(nextDimensions.x+0.5*nextDimensions.width)+","+ (nextDimensions.y + 0.5*nextDimensions.height)+"l-7.083,-7.081l1.916,-1.916l8.997,8.997l-9.002,9.003l-1.916,-1.916z")
	.attr('id', 'rightArrow')
	.style('stroke', 'white')
	.attr('stroke-width', '5px')
	.attr('cursor', 'pointer')
	.on('click', changeImages);
	
var filenameLeft = "./compare-faces/pair" + i + "-L.jpg";
var filenameRight = "./compare-faces/pair" + i + "-R.jpg";


var leftImage = imagesG.append('svg:image')
	.attr('x', imageDimensions.xleft)
	.attr('y', imageDimensions.yleft)
	.attr('id', 'leftImageId')
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'leftImage ' + i + "-pair")
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
	.attr('class', 'leftImage imageText')
	.attr('x', 0.5 * imageDimensions.width - 2)
	.attr('y', imageDimensions.yleft + imageDimensions.height + 40)
	.text('Winner')
	.attr('display', 'none')
	.attr('font-size', text.fontsize)
	.style('fill', '#39393a');

var rightImage = imagesG.append('svg:image')
	.attr('x', imageDimensions.xright)
	.attr('y', imageDimensions.yright)
	.attr('id', 'rightImageId')
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'rightImage ' + i + "-pair")
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
imagesG.append('text')
	.attr('class', 'rightImage imageText')
	.attr('x', imageDimensions.xright + 60)
	.attr('y', imageDimensions.yleft + imageDimensions.height + 40)
	.text('Winner')
	.attr('display', 'none')
	.attr('font-size', text.fontsize);

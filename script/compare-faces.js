console.log("compare-faces.js");
var svgDimensions = { width: 550, height: 550};
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
}
var padding = 10;
var numberOfPairs = 1;

var topTextWords = ['These two candidates ran for election. Click on who you think won the election.'];
var bottomTextWords = ['Click above.'];
var text = {fontsize: 28}
var answerKey = ['leftImage', 'leftImage', 'leftImage'];

/* Useful function to split text for tspan. 
Gives the effect of text wrapping. */
function wrapText(rectText, w) {
	var wrap = rectText.replace(
		new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
	);
	var wrapList = wrap.split('\n');
	return wrapList;
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
	.data(wrapText(topTextWords[0], 40))
	.enter()
	.append('tspan')
	.attr('class', 'topTspan')
	.text(d => {
		return d;
	})
	.attr('x', margin.left + padding)
	// .attr('y', margin.top + padding)
	.attr('dy', text.fontsize)
	.attr('font-size', text.fontsize);


var imagesG = svg.append('g')
	.attr('id', 'imagesG')
	.attr('x', margin.left)
	.attr('y', margin.right);

var bottomText = svg.append('text')
	.attr('id', 'bottomText')
	.attr('x', margin.left + padding)
	.attr('y', svgDimensions.height - 50)
	.text(bottomTextWords[0])
	.attr('font-size', text.fontsize);

function checkImage(event, i) {
	
	var imageClass = d3.select(this).attr('class');
	var imageSide = imageClass.split(' ')[0];
	
	var pairNumber = +(imageClass.split(' ')[1].split('-')[0]);
	var otherImageSide = (imageSide == 'rightImage') ? 'leftImage' : 'rightImage';
	
	if (imageSide == answerKey[pairNumber]) {
		d3.select('#bottomText').text('Correct!');
		d3.select('.imageRect.' + imageSide)
			.style('stroke', 'green')
			.style('stroke-width', '25px');
		d3.select('.imageRect.' + otherImageSide)
			.style('stroke', 'red')
			.style('stroke-width', '25px');
		//Add "Winner" text below winner
		d3.select('text.'+ imageSide).attr('display', 'inline');
		d3.select('text.'+ otherImageSide).attr('display', 'none');
	}
	else {
		d3.select('#bottomText').text('Incorrect.');
		d3.select('.imageRect.' + imageSide)
			.style('stroke', 'red')
			.style('stroke-width', '25px');
		d3.select('.imageRect.' + otherImageSide)
			.style('stroke', 'green')
			.style('stroke-width', '25px');
		//Add "Winner" text below winner
		d3.select('text.'+ imageSide).attr('display', 'none');
		d3.select('text.'+ otherImageSide).attr('display', 'inline');
	}
}

// for (var i=0; i<numberOfPairs; i++) {
	var i = 1;
	var filenameLeft = "./compare-faces/pair" + i + "-L.jpg";
	var filenameRight = "./compare-faces/pair" + i + "-R.jpg";
	

	var leftRect = imagesG.append('rect')
		.attr('x', imageDimensions.xleft)
		.attr('y', imageDimensions.yleft)
		.attr('width', imageDimensions.width)
		.attr('height', imageDimensions.height)
		.attr('class', 'imageRect leftImage ' + i + "-pair")
		.style('stroke-width', '0px')
		.style('fill', 'none');
	imagesG.append('text')
		.attr('class', 'leftImage')
		.attr('x', 0.5 * imageDimensions.width - 2)
		.attr('y', imageDimensions.yleft + imageDimensions.height + 40)
		.text('Winner')
		.attr('display', 'none')
		.attr('font-size', text.fontsize);


	var leftImage = imagesG.append('svg:image')
		.attr('x', imageDimensions.xleft)
		.attr('y', imageDimensions.yleft)
		.attr('width', imageDimensions.width)
		.attr('height', imageDimensions.height)
		.attr('class', 'leftImage ' + i + "-pair")
		.attr('xlink:href', filenameLeft)
		.attr('cursor', 'pointer')
		.on('click', checkImage);


	var rightRect = imagesG.append('rect')
		.attr('x', imageDimensions.xright)
		.attr('y', imageDimensions.yright)
		.attr('width', imageDimensions.width)
		.attr('height', imageDimensions.height)
		.attr('class', 'imageRect rightImage ' + i + "-pair")
		.style('stroke-width', '0px')
		.style('fill', 'none');
	imagesG.append('text')
		.attr('class', 'rightImage')
		.attr('x', imageDimensions.xright + 60)
		.attr('y', imageDimensions.yleft + imageDimensions.height + 40)
		.text('Winner')
		.attr('display', 'none')
		.attr('font-size', text.fontsize);
	var rightImage = imagesG.append('svg:image')
		.attr('x', imageDimensions.xright)
		.attr('y', imageDimensions.yright)
		.attr('width', imageDimensions.width)
		.attr('height', imageDimensions.height)
		.attr('class', 'rightImage ' + i + "-pair")
		.attr('xlink:href', filenameRight)
		.attr('cursor', 'pointer')
		.on('click', checkImage);



//}
console.log("slider-faces.js");
var svgDimensions = { width: 230, height: 210};
var margin = {
	right: 10,
	left: 10,
	top: 10,
	bottom: 10
};

var imageDimensions = {
	width: 150,
	height: 200,
	x: 5,
	y: 5
}
var predVal = {
	x: 160,
	y: 100
}
var padding = 10;
var initImage = './slider-faces/pair1-L.jpg';


var svg = d3.select('#sliderSVG')
	.attr('preserveAspectRatio', 'xMidYMid meet')
	.attr('viewBox', '0 0 ' + svgDimensions.width + ' ' +svgDimensions.height)
	.attr('style', 'outline: thin solid #48A9C5;');

var imageG = svg.append('g')
	.attr('id', 'imageG')
	.attr('x', margin.left)
	.attr('y', margin.right);

var image = imageG.append('svg:image')
	.attr('x', imageDimensions.x)
	.attr('y', imageDimensions.y)
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'slider')
	.attr('xlink:href', initImage);

var predictedValue = imageG.append('text')
	.attr('id', 'prediction')
	.attr('x', predVal.x)
	.attr('y', predVal.y)
	.text('Value: 0')
	.attr('font-size', '14px');

function transition(thisSlider) {
	d3.select("#prediction").text('Value: ' + thisSlider.value);
}

var sliderA = document.getElementById('sliderA');
sliderA.oninput = function() {
	var thisSlider = this;
	transition(thisSlider); 
}
var sliderB = document.getElementById('sliderB');
sliderB.oninput = function() { 
	var thisSlider = this;
	transition(thisSlider); 
}
var sliderC = document.getElementById('sliderC');
sliderC.oninput = function() { 
	var thisSlider = this;
	transition(thisSlider); 
}
var sliderD = document.getElementById('sliderD');
sliderD.oninput = function() { 
	var thisSlider = this;
	transition(thisSlider);
}




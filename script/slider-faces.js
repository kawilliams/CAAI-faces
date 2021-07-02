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
var prefix = './slider-faces/renamed_images/seed_200_var_';
var initImage = './slider-faces/renamed_images/seed_200_var_bddd.png';

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
	.attr('id', 'electionImage')
	.attr('width', imageDimensions.width)
	.attr('height', imageDimensions.height)
	.attr('class', 'slider')
	.attr('xlink:href', initImage);

var predictedValue = imageG.append('text')
	.attr('id', 'prediction')
	.attr('x', predVal.x)
	.attr('y', predVal.y)
	.text('Value: 0')
	.attr('font-size', '10em');

const valueCode = {
	'-1' : 'a',
	'-0.75' : 'b',
	'-0.5' : 'c',
	'-0.25' : 'd',
	'0' : 'e',
	'0.25' : 'f',
	'0.5' : 'g',
	'0.75' : 'h',
	'1' : 'i'
}

d3.csv("./slider-faces/metadata/meta_combined.csv").then(function(data){

	function transition(thisSlider) {
		d3.select("#prediction").text('Value: ' + thisSlider.value);
		var val1 = document.getElementById("slider_1").value;
		var val2 = document.getElementById("slider_2").value;
		var val3 = document.getElementById("slider_3").value;
		var val4 = document.getElementById("slider_4").value;

		var imageCode = valueCode[val1]+valueCode[val2]+valueCode[val3]+valueCode[val4];
		var nextImage = prefix + imageCode + '.png';
		d3.select('#electionImage')
			.attr('xlink:href', nextImage);
		
	}

	var slider_1 = document.getElementById('slider_1');
	slider_1.oninput = function() {
		var thisSlider = this;
		transition(thisSlider); 
	}
	var slider_2 = document.getElementById('slider_2');
	slider_2.oninput = function() { 
		var thisSlider = this;
		transition(thisSlider); 
	}
	var slider_3 = document.getElementById('slider_3');
	slider_3.oninput = function() { 
		var thisSlider = this;
		transition(thisSlider); 
	}
	var slider_4 = document.getElementById('slider_4');
	slider_4.oninput = function() { 
		var thisSlider = this;
		transition(thisSlider);
	}



}); //end csv








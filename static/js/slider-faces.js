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

var directory124 = "static/slider-faces/renamed_images_124/";
var directory200 = "static/slider-faces/renamed_images_200/";
var topImage = "static/slider-faces/renamed_images_200/seed_200_var_aadd.png";
var seedCode = "200";

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
var upArrow = "m10 10.728-8.327 8.327-2.253-2.252 10.58-10.582 10.588 10.584-2.253 2.253z";
var downArrow = "m10 15.728 l -8.327 -8.327-2.253 2.252 10.58 10.582 10.588 -10.584-2.253 -2.253z";

d3.csv("static/slider-faces/metadata/meta_renamed.csv").then(function(data){
	function changeSeed() {

		if (this.id == "button200") {
			seedCode = "200";
		}
		else if (this.id == "button124") {
			seedCode = "124";
		}
		transition();
	}

	function transition(thisSlider) {
	
		var val1 = document.getElementById("slider_1").value;
		var val2 = document.getElementById("slider_2").value;
		var val3 = document.getElementById("slider_3").value;
		var val4 = document.getElementById("slider_4").value;

		var imageCode = valueCode[val1]+valueCode[val2]+valueCode[val3]+valueCode[val4];
		var nextImage = 'seed_'+ seedCode +'_var_' + imageCode + '.png';
		directory = (seedCode == "200") ? directory200 : directory124;
		var fullImagePath = directory + nextImage;
		document.getElementById('topImage').src = fullImagePath;

		//Retrieve image prediction score
		var oldScore = +(document.getElementById("prediction").innerHTML.split(': ')[1]);
		for (var j=0; j<data.length; j++) {
			if (data[j].renamed_img === (nextImage)) {
				var newScore = (+data[j].pred_release).toFixed(4);
				document.getElementById("prediction").innerHTML = "Value: " + newScore + " ";
				if (newScore > oldScore) {
					d3.select("#downArrow").attr('display', 'none');
					d3.select("#upArrow").attr('display', 'inline');
					d3.select("#upArrow").style('fill', "green");


				} else {
					d3.select("#downArrow").attr('display', 'inline');
					d3.select("#upArrow").attr('display', 'none');
					d3.select("#downArrow").style('fill', "red");
				}
			}
		}
		
	}

	// Slider controls
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

	var svg = d3.select("#sliderArrowSVG").attr('height', 26)
		.attr('width', 20)
		// .attr('style', 'outline: thin solid red;') //development: used to see SVG size
		.append('g')
		.attr('id', 'sliderArrowG');

	svg.append('path')
		.attr('d',downArrow)
		.attr('id', 'downArrow')
		.attr('class', 'bounce')
		.style('fill', 'red')
		.attr('display', 'none');
	svg.append('path')
		.attr('d',upArrow)
		.attr('id', 'upArrow')
		.attr('class', 'bounce')
		.style('fill', 'green')
		.attr('display', 'none');


	var button124 = d3.select("#button124")
		.on('click', changeSeed);
	var button200 = d3.select("#button200")
		.on('click', changeSeed);


}); //end d3.csv








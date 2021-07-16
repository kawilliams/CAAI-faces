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

var directory = 'static/slider-faces/renamed_images/';
var topImage = 'static/slider-faces/renamed_images/seed_200_var_bddd.png';

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

d3.csv("static/slider-faces/metadata/meta_renamed.csv").then(function(data){

	function transition(thisSlider) {
	
		var val1 = document.getElementById("slider_1").value;
		var val2 = document.getElementById("slider_2").value;
		var val3 = document.getElementById("slider_3").value;
		var val4 = document.getElementById("slider_4").value;

		var imageCode = valueCode[val1]+valueCode[val2]+valueCode[val3]+valueCode[val4];
		var nextImage = 'seed_200_var_' + imageCode + '.png';
		var fullImagePath = directory + nextImage;
		var oldImage = document.getElementById('topImage').src;
		document.getElementById('topImage').src = fullImagePath;
		document.getElementById('bottomImage').src = oldImage;
		document.getElementById('bottomImage').style.opacity = '0.5';

		//Retrieve image prediction score
		var oldScore = +(document.getElementById("prediction").innerHTML);
		for (var j=0; j<data.length; j++) {
			if (data[j].renamed_img === (nextImage)) {
				var newScore = (+data[j].pred_release).toFixed(4);
				document.getElementById("prediction").innerHTML = newScore;
				if (newScore > oldScore) console.log("going up!");
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



}); //end d3.csv








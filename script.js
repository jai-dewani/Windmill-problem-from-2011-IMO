var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 3;
const dim = [600,600];
var numberOfCircle = 20;

init();

function init(){
	var random = [];
	for(i=0;i<50;i++){
		x = Math.round(Math.random()*dim[0]);
		y = Math.round(Math.random()*dim[1]);
		random[i] = [x,y];
	}

	makeCircles(random);
	console.log(random);

	// Mark the selected Circle
	var current = random[Math.floor(Math.random()*numberOfCircle)]
	// ctx.beginPath();
	// ctx.arc(current[0],current[1],5,0,2*Math.PI);
	// ctx.stroke();

	// Object of line
	var line = {
		current:current,
		start:[0,0],
		end: [600,600],
		angle: 0
	};


	drawLine(line,dim);
	setInterval(moveLine,2,line,dim,random);
}

// Drawing Circles
function makeCircles(random){
	ctx.fillStyle = "#000000";
	for(i=0;i<numberOfCircle;i++){
		ctx.beginPath();
		ctx.arc(random[i][0],random[i][1],2,0,2*Math.PI);
		ctx.stroke();
		ctx.fill();
	}
}

function findX(Y,slope,c){
	return (Y-c)/slope;
}

function findY(X,slope,c){
	return (X*slope)+c;
}

// Function to draw a line with given slope
function drawLine(line,dim){
	var slope = Math.tan(line.angle);
	const X = line.current[0];
	const Y = line.current[1];
	var c = Y-X*slope;

	// When line is horizontal
	var Y1 = findY(0,slope,c);
	var Y2 = findY(dim[0],slope,c);

	// When the line is vertical
	var X1 = findX(0,slope,c);
	var X2 = findX(dim[1],slope,c);

	if(Y1>0){
		line.start = [0,Y1];
	}else{
		line.start = [X1,0];
	}
	if(Y2<dim[1]){
		line.end = [dim[0],Y2];
	}else{
		line.end = [X2,dim[1]];
	}

	ctx.beginPath();
	ctx.moveTo(line.start[0],line.start[1]);
	ctx.lineTo(line.end[0],line.end[1]);
	ctx.stroke();
	// console.log(line);
}

function moveLine(line,dim,random){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	makeCircles(random);
	line.angle += 0.001;
	// console.log(line);
	drawLine(line,dim);
	updateCenter(random,line);
}

function updateCenter(random,line){
	for(i=0;i<numberOfCircle;i++){
		var X = random[i][0];
		var Y = random[i][1];
		if(X==line.current[0] && Y==line.current[1]){
			continue;
		}
		const round = 20;
		var slope1 = (line.start[1]-Y)/(line.start[0]-X)
		var slope2 = (line.end[1]-Y)/(line.end[0]-X)
		slope1 = (Math.round(slope1*round))/round;
		slope2 = (Math.round(slope2*round))/round;
		if(slope1==slope2){
			console.log("break",line.current,random[i])	;
			line.current = random[i];
			line.angle += 0.02;
			break;
		}
	}
}

const input = document.getElementById("circle");
input.addEventListener('change',function(){
	numberOfCircle = input.value;
});
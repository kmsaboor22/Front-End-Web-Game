
var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
	window.onload = function () {
		console.log("hello World");
		canvas = document.getElementById('gameCanvas');
		canvasContext = canvas.getContext('2d');
		var framesPerSecond = 30;
		setInterval(function(){
			moveEverything();
			drawEverything();
		},1000/framesPerSecond);


	}
	/*
	this is the ball physics method
	*/
	function moveEverything(){
		ballX = ballX + ballSpeedX;
		if(ballX < 0){
			ballSpeedX = -ballSpeedX;
		}
		if(ballX > canvas.width){
			ballSpeedX = -ballSpeedX;
		}
	}
	//this will draw the canvas which is a black box, with a ball and as of now one side panal.
	function drawEverything(){
		canvasContext.fillStyle = 'black';
		canvasContext.fillRect(0,0,canvas.width,canvas.height);
		canvasContext.fillStyle = 'white';
		canvasContext.fillRect(0,210,10,100);
		canvasContext.fillStyle = 'red';
		canvasContext.fillRect(ballX,100,10,10);
	}
	/*

	*/
	function colorRect(leftX,topY,width,height,drawColor){
		canvasContext.fillStyle = drawColor;
		canvasContext.fillRect(leftX,topY,width,height);

	}

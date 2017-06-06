
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

	function drawEverything(){
			//draws a black screen for our game
			colorRect(0,0,canvas.width,canvas.height,'black');
			//left player paddle
			colorRect(0,210,10,100,'white');
			//Pong ball is drawn here
			canvasContext.fillStyle = 'white';
			canvasContext.beginPath();
			canvasContext.arc(ballX, 100, 10, 0,Math.PI*2,true);
			canvasContext.fill();
			/* step 4/5
			video 6/11
			*/
	}
	/*
template for
	*/
	function colorRect(leftX,topY,width,height,drawColor){
			canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX,topY,width,height);

	}

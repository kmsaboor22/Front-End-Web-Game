

var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
//UPPERCASE FOR ME MEANS THAT THIS IS A CONST VAR
const PADDLE_HEIGHT = 100;
const PADDLE_THICKEMS = 10;
/*this function will be called everytime
the mouse moves on the canvas
 evt = event
*/
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}
	window.onload = function () {
		console.log("hello World");
		canvas = document.getElementById('gameCanvas');
		canvasContext = canvas.getContext('2d');

		var framesPerSecond = 30;
		setInterval(function(){
			moveEverything();
			drawEverything();
		},1000/framesPerSecond);
		/*
		another example of an inline function
		this is going to update the paddle y pos to our
		calculateMousePos function
		*/
		canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});

	}

	function ballReset() {
			ballSpeedX = -ballSpeedX;
			ballX = canvas.width/2;
			ballY = canvas.height/2;
	}

	/*
	this is the ball physics method
	*/
	function moveEverything(){
			ballX = ballX + ballSpeedX;
			ballY = ballY + ballSpeedY;
			if(ballX < 0){
				if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
					ballSpeedX = -ballSpeedX;
				}else {

				 ballReset();
			 }
			}
			if(ballX > canvas.width){
			ballSpeedX = -ballSpeedX;
			}
			if(ballY < 0){
			ballSpeedY = -ballSpeedY;
			}
			if(ballY > canvas.height){
			ballSpeedY = -ballSpeedY;
		}
	}

	function drawEverything(){
			//draws a black screen for our game
			colorRect(0,0,canvas.width,canvas.height,'black');
			//left player paddle
			colorRect(0,paddle1Y,PADDLE_THICKEMS,PADDLE_HEIGHT,'white');

			//right player paddle
			colorRect(canvas.width-PADDLE_THICKEMS,paddle2Y,
			PADDLE_THICKEMS,PADDLE_HEIGHT,'white');
			//Pong ball is drawn here
			colorCircle(ballX, ballY, 10, 'white');
	}
//function that helps draws our ball
	function colorCircle(centerX, centerY, radius, drawColor){
		canvasContext.fillStyle = drawColor ;
		canvasContext.beginPath();
		canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
		canvasContext.fill();

	}

//template for coloring the  rectangle
	function colorRect(leftX,topY,width,height,drawColor){
			canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX,topY,width,height);

	}

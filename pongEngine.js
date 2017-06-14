

var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

var match_Screen = false;
//UPPERCASE FOR ME MEANS THAT THIS IS A CONST VAR
const PADDLE_HEIGHT = 100;
const PADDLE_THICKEMS = 10;
const MATCH_POINT = 3;
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

function handleMouseClick(evt) {
		if(match_Screen){
					player1Score = 0;
					player2Score = 0;
					match_Screen = false;
		}
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

		canvas.addEventListener('mousedown', handleMouseClick);

		canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT*2);
		});

	}

	function ballReset() {
		if (player1Score >= MATCH_POINT || player2Score >= MATCH_POINT) {
						match_Screen = true;

		}
			ballSpeedX = -ballSpeedX;
			ballX = canvas.width/2;
			ballY = canvas.height/2;
	}

/*
computer movements
*/
	function CPUmovements() {
		var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
			if (paddle2YCenter < ballY - 35) {
/*this style of writing "paddle2Y += 6;" below
is more compact and looks cleaner compare to
paddle2Y = paddle2Y + 6;
paddle2Y += 6; means add 6 to the value and store it back into it.
*/
				paddle2Y += 6;
			} else if (paddle2YCenter > ballY + 35){
				paddle2Y -= 6;
			}
	}

	/*
	this is the ball physics method
	*/
	function moveEverything(){
			if (match_Screen) {
				return;
			}
			CPUmovements();

			ballX = ballX + ballSpeedX;
			ballY = ballY + ballSpeedY;
			if(ballX < 0){
				if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
					ballSpeedX = -ballSpeedX;

				var deltaY = ballY -(paddle1Y  + PADDLE_HEIGHT/2)
					ballSpeedY = deltaY * 0.35;

				}else {

					//ex way of writing plus one
				 player2Score += 1;//MUST BE BEFORE ballReset();
				 ballReset();


			 }
			}
			if(ballX > canvas.width){
				if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
					ballSpeedX = -ballSpeedX;

					var deltaY = ballY -(paddle2Y  + PADDLE_HEIGHT/2)
						ballSpeedY = deltaY * 0.35;
				}else {

					//another way of writing plus one
 				 player1Score ++;//MUST BE BEFORE ballReset();
				 ballReset();

			 }
			}
			if(ballY < 0){
			ballSpeedY = -ballSpeedY;
			}
			if(ballY > canvas.height){
			ballSpeedY = -ballSpeedY;
		}
	}

	function drawNet() {
		for (var i = 0; i < canvas.height; i+=40) {
			colorRect(canvas.width/2-1,i,2,20,'white');
		}
	}

	function drawEverything(){
			//draws a black screen for our game
			colorRect(0,0,canvas.width,canvas.height,'black');
				canvasContext.fillStyle = 'white';
			if (match_Screen) {
				if (player1Score >= MATCH_POINT)  {
					canvasContext.fillText("YOU WIN", 350, 200);
				} else
				if (player2Score >= MATCH_POINT) {
					canvasContext.fillText("CPU WINS", 350, 200);
				}

				canvasContext.fillText("CLICK TO START", 350, 400);
				return;
			}
			//left player paddle
			colorRect(0,paddle1Y,PADDLE_THICKEMS,PADDLE_HEIGHT,'white');

			//right player paddle
			colorRect(canvas.width-PADDLE_THICKEMS,paddle2Y,
			PADDLE_THICKEMS,PADDLE_HEIGHT,'white');
			//Pong ball is drawn here
			colorCircle(ballX, ballY, 10, 'white');

			drawNet();

			canvasContext.fillText(player1Score, 200, 200);
			canvasContext.fillText(player2Score, canvas.width-200, 200);
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

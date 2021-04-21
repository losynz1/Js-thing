// get the canvas element to use 
 document.addEventListener('DOMContentLoaded', function() {
 	var canvas = document.getElementById("canvasBasics");
 	var ctx = canvas.getContext("2d");

 	// the main function,  everything is controlled
 	// from this function
 	function draw() {
 		ctx.clearRect(0, 0, canvas.width, canvas.height);
 		if (bgReady) {
 			ctx.drawImage(bgImage, 0, 0);
 		}
 		if (monkeyReady) {
 			ctx.drawImage(monkeyImage, mx, my);
 		}
 		if (bananaReady) {
 			ctx.drawImage(bananaImage, bx, by);
 		}
 		if (coconutReady) {
 			ctx.drawImage(coconutImage, cx, cy);
 		}

 		// change the x and y values of the circle by adding dx and dy to them respectively
 		// then each time draw() function is called the circle will be drawn in a different position
 		cx = cx + cdx;
 		cy = cy + cdy;

 		if (cx <= 0 || cx >= (canvas.width - coconutImage.width)) {
 			cdx = -cdx;
 		}
 		if (cy <= 0 || cy >= (canvas.height - coconutImage.height)) {
 			cdy = -cdy;
 		}

 		if (rightPressed == true) {
 			mdx = mspeed;
 		} else if (leftPressed == true) {
 			mdx = -mspeed;
 		} else if (upPressed == true) {
 			mdy = -mspeed;
 		} else if (downPressed == true) {
 			mdy = mspeed
 		}
 		// if no keys are pressed then set mdx and mdy to 0 (stop moving)
 		if (rightPressed == false && leftPressed == false && upPressed == false && downPressed == false) {
 			mdx = 0;
 			mdy = 0;
 		}

 		// change x and y position of monkey
 		mx = mx + mdx;
 		my = my + mdy;

 		displayScore();

 		if (mlives == 0) {
 			alert("Sorry you are out of lives!!!");
 			reset();
 		}

 		//display alert if person wins
 		if (bananasEaten == 10) {
 			alert("Congratulations, you are awesome!!");
 			reset();
 		}
		getCoconut();
		getBanana();
		

 	}
 	// call the draw() function every 10ms
 	setInterval(draw, 10);

	var mlives;
 	var bgReady = false;
 	var bgImage = new Image();
 	bgImage.onload = function() {
 		bgReady = true;
 	};
 	bgImage.src = "images/background.png";

 	// Load the monkey image
 	var monkeyReady = false;
 	var monkeyImage = new Image();
 	monkeyImage.onload = function() {
 		monkeyReady = true;
 	};
 	monkeyImage.src = "images/monkey.png";

 	// Load the banana image
 	var bananaReady = false;
 	var bananaImage = new Image();
 	bananaImage.onload = function() {
 		bananaReady = true;
 	};
 	bananaImage.src = "images/banana.png";

 	// Load the coconut image
 	var coconutReady = false;
 	var coconutImage = new Image();
 	coconutImage.onload = function() {
 		coconutReady = true;
 	};
 	coconutImage.src = "images/coconut.png";

 	//monkey variables
 	var mx = canvas.width / 2; // start the monkey in the centre
 	var my = canvas.height / 2;
 	var mdx = 0; // set initial speed to 0
 	var mdy = 0;
 	var mspeed = 2; // create a variable for speed
 	var mlives = 3; // create a variable for lives

 	//coconut variables
 	//the coconut will move on its own
 	var cx = 400;
 	var cy = 300;
 	var cspeed = 2;
 	var cdx = cspeed - 1;
 	var cdy = cspeed;

 	// banana variables
 	// the banana is stationary so doesn’t need a bdx and bdy
 	var bx = Math.floor(Math.random() * canvas.width);
 	var by = Math.floor(Math.random() * canvas.height);
 	var bananasEaten = 0;

 	//set variables to use for key presses
 	//these are Boolean variables
 	//they can only be true or false
 	var rightPressed = false;
 	var leftPressed = false;
 	var upPressed = false;
 	var downPressed = false;

 	// add something to "listen" for an event
 	//an event is keypress, mouse movement, mouse click etc.
 	document.addEventListener("keydown", keyDownHandler, false);
 	document.addEventListener("keyup", keyUpHandler, false);

 	// function that is called if a keydown event happens
 	//(i.e. a key on the keyboard was pressed down)
 	// the 'e' parameter is the event
 	// the keycode 39 is the code for the right arrow key
 	function keyDownHandler(e) {
 		if (e.keyCode == 39) {
 			rightPressed = true;
 		} else if (e.keyCode == 37) {
 			leftPressed = true;
 		} else if (e.keyCode == 38) {
 			upPressed = true;
 		} else if (e.keyCode == 40) {
 			downPressed = true;
 		}
 	}


 	//function that is called when a keyup event occurs
 	//(i.e. a key on the keyboard was let up)
 	function keyUpHandler(e) {
 		if (e.keyCode == 39) {
 			rightPressed = false;
 		} else if (e.keyCode == 37) {
 			leftPressed = false;
 		} else if (e.keyCode == 38) {
 			upPressed = false;
 		} else if (e.keyCode == 40) {
 			downPressed = false;
 		}
 	}

 	function getBanana() {
 		if (mx <= (bx + bananaImage.width) && bx <= (mx + monkeyImage.width)) {
 			if (my <= (by + bananaImage.height) && by <= (my + monkeyImage.height)) {
 				bananasEaten = bananasEaten + 1;
 				bx = Math.floor(Math.random() * (canvas.width - bananaImage.width));
 				by = Math.floor(Math.random() * (canvas.height - bananaImage.height));
 			}
 		}
 	}

 	function getCoconut() {
 		if (mx <= (cx + coconutImage.width) && cx <= (mx + monkeyImage.width)) {
 			if (my <= (cy + coconutImage.height) && cy <= (my + monkeyImage.height)) {
 				mlives = mlives - 1;
 				cx = Math.floor(Math.random() * (canvas.width - coconutImage.width));
 				cy = Math.floor(Math.random() * (canvas.height - coconutImage.height));
 			}
 		}
 	}
	var bananasEaten = 0;
 	function displayScore() {
 		ctx.font = "36px Comic Sans MS";
 		ctx.fillStyle = 'black';
 		var livesStr = "Lives: " + mlives;
		var bananaEatenStr = "Score: " + bananasEaten;
 		ctx.fillText(livesStr, 10, 50);
		ctx.fillText(bananaEatenStr, 10, 90);
 	}
 	function reset() {
 		rightPressed = false;
 		leftPressed = false;
 		upPressed = false;
 		downPressed = false;
		bananasEaten = 0;
 		mlives = 3;
		cx = Math.floor(Math.random() * (canvas.width - coconutImage.width));
		cy = Math.floor(Math.random() * (canvas.height - coconutImage.height));
		bx = Math.floor(Math.random() * (canvas.width - bananaImage.width));
		by = Math.floor(Math.random() * (canvas.height - bananaImage.height));
		bx = Math.floor(Math.random() * (canvas.width - bananaImage.width));
		by = Math.floor(Math.random() * (canvas.height - bananaImage.height));
 	}
 });

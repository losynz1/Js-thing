	var playerGuess;
 	var computerGuess;
 	var playAgain = true;
	var change;
	var value;
	
	function randNum(low,high){
	var number = Math.floor(Math.random()*high+low);	
	return number;
	}
	
	computerGuess = randNum(1,100);
	
	function guessNumber(){
		console.log(computerGuess);
		playerGuess = document.getElementById("num").value;
		guessG();
	}
	
	function guessG(){
		if(playAgain){
			value = playerGuess - computerGuess;
			if(value > 0){
				high();
			}else if(value < 0){
				low();
			}else{
				win();
			}
		}
	}
	
	function reset(){
		computerGuess = randNum(1,100);
		playAgain = true;
		change = document.getElementById("end");
		change.innerHTML="";
	}
	
	function high(){
		change = document.getElementById("end");
		change.innerHTML="Too High!";
	}
	
	function low(){
		change = document.getElementById("end");
		change.innerHTML="Too Low!";
	}
	
	function win(){
		change = document.getElementById("end");
		change.innerHTML= "Congrats, you are right!";
		playAgain = false;
	}
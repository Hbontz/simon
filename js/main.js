/* eslint-env jquery */

var greenObj = {},
	redObj = {},
	yellowObj = {},
	blueObj = {},
	timer,
	computerArr = [],
	userArr = [],
	tiles = ['green', 'red', 'yellow', 'blue'],
	level = 0,
	timerControl,
	reset,
	randomIndex,
	runSequence,
	compTurn,
	check,
	inPlay = false,
	start = true,
	strict = true;

greenObj = {
	id: '#green',
	sound: 'greenSound',
	color: 'green',
};

redObj = {
	id: '#red',
	sound: 'redSound',
	color: 'red',
};

yellowObj = {
	id: '#yellow',
	sound: 'yellowSound',
	color: 'yellow',
};

blueObj = {
	id: '#blue',
	sound: 'blueSound',
	color: 'blue',
};

timerControl = function() {
	clearTimeout(timer);
	timer = setTimeout(function() {
		alert('Timeout!  Press start to play again.');
		reset();
	}, 5000);
};

reset = function(){
	window.location.reload(false);
};

randomIndex = function() {
	return Math.floor(Math.random() * 4);
};

runSequence = function(i) {
	var color;
	$('.tiles').css('pointer-events', 'none');
	setTimeout(function() {
		timerControl();
		if (computerArr[i] == 'green') {
			color = greenObj;
		}
		if (computerArr[i] == 'red') {
			color = redObj;
		}
		if (computerArr[i] == 'yellow') {
			color = yellowObj;
		}
		if (computerArr[i] == 'blue') {
			color = blueObj;
		}
		$(color.id).css('opacity', .5);
		document.getElementById(color.sound).play();
		setTimeout(function(){$(color.id).css('opacity', 1);}, 400);
		i++;
		if (i < computerArr.length) {
			runSequence(i);
		} else { 
			$('.tiles').css('pointer-events', 'auto');
			userArr = [];
		}
	}, 700);
};

compTurn = function() {
	var play, i;
	level++;
	$('#levelNum').html(level);
	play = tiles[randomIndex()];
	computerArr.push(play);

	if (computerArr.length > 0) {
		i = 0;
		runSequence(i);
	}
	$('.tiles').css('pointer-events', 'auto');
};

check = function() {
	var i;
	timerControl();
	for (i = 0; i < userArr.length; i++) {
		if (userArr[i] != computerArr[i]) {
			if (strict == true) {
				alert('You lose!  Press start to play again.');
				reset();
			} else if (strict == false) {
				userArr.splice(-1, 1);
				alert('Try again!');
				i = 0;
				runSequence(i);
			}
		}
	}
	if (userArr.length == computerArr.length) {
		compTurn();
	}
	if (userArr.length >= 20) {
		alert('You win!  Press start to play again.');
		reset();
	}
};

function playerClicks(e) {
	clearTimeout(timer);
	$(e.data.id).css('opacity', .5);
	document.getElementById(e.data.sound).play();
	setTimeout(function(){$(e.data.id).css('opacity', 1);}, 400);
	userArr.push(e.data.color);
	check();
}

$('#startReset').on('click', function() {
	if (start == true) {
		start = false;
		inPlay = true;
		if (inPlay) {
			timerControl();
		}
		$('.tiles').css('pointer-events', 'auto');
		$('#startReset').html('RESET');
		compTurn();
	} else if (start == false) {
		start = true;
		reset();
	}
});

$('#strict').on('click', function() {
	if (strict == true) {
		strict = false;
		$('#strict').html('Strict:  OFF');
	} else if (strict == false) {
		strict = true;
		$('#strict').html('Strict:  ON');
	}
});

$('#green').on('click', greenObj, playerClicks);

$('#red').on('click', redObj, playerClicks);

$('#blue').on('click', blueObj, playerClicks);

$('#yellow').on('click', yellowObj, playerClicks);

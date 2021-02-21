var buttonColours=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
//Audio Play
function playSound(name){
  var audio=new Audio('sounds/'+name+'.mp3');
  audio.play();
}
//Animate the button when it it is pressed
function animatePress(currentColour){
  $(document).ready(function(){
    $('#'+currentColour).addClass('pressed');
  });
  setTimeout(function(){
    $(document).ready(function(){
      $('#'+currentColour).removeClass('pressed');
    });
  },100);
}
//user interface taking input
$(document).ready(function(){
  $('.btn').click(function(){
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });
});
//Starting new game using keypress
var level=0;
var started=false;
$(document).ready(function(){
  $(document).keypress(function(){
    if (!started){
      $('#level-title').text('Level '+level);
      nextSequence();
      started=true;
    }

  });
});
//Checking answers with the game pattern
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound('wrong');
    $('body').addClass('game-over');

    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}
//startover function
function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}
//gamepattern deciding function
function nextSequence(){
  userClickedPattern=[];
  level++;
  $('#level-title').text('Level '+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(document).ready(function(){
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  });
  playSound(randomChosenColour);

}

// //creating a sequence array which will contain the random generated colors
var sequence = [];

// //creating variable which will show the result ie win lose
var result = true;

// variable count will track the index in the sequence array
var count = 0;

// variable level for storing level status
var level = 0;

// key variable will store boolean value which helps in enabling and dis-enabling the keypress event to start the game again
var key=true;

// start function updates level and calling generateColor method
function start()
{
    level++;
    $("h1").text("Level "+level);
    if(result==true)
    generateColor();
}
function playSound(color)
{
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
        
}
// generateColor method will generate random color and store in sequence array
    function generateColor()
    {  
            //generating random number
            var randomNum = Math.floor(Math.random()*4 + 1);
            // console.log(randomNum);
            
            //pushing the colors into array sequence acc to the generated random number
            switch(randomNum)
            {
                
                case 1: var color = "green";
                        break;
                case 2: var color = "red";
                        break;
                case 3: var color = "yellow"
                        break;
                case 4: var color = "blue";
                        break;
            }
            setTimeout(function () { 
                playSound(color); 
                $("#"+color).fadeOut(100).fadeIn(100);
            }, 1200);
            sequence.push(color);


            console.log(sequence);
    }

//button click event will check the clicked button against the generated color and deciding win or lose- 
$(".btn").on("click", function(event)
{
    var color = event.target.id;
    playSound(color);
    $("#"+color).addClass("pressed");
    setTimeout(function()
    {
        $("#"+color).removeClass("pressed");
    } ,200 );
    //checking if the button clicked match the sequence array elements
    if(event.target.id!=sequence[count])
        result = false;
    // incrementing count to track index
    count++;
    
    // when match fails
    if(result==false)
    {
        console.log("You failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        } ,200 );
        // updating status to lost
        $("#status").text("YOU LOST");

        // telling to restart the game by key press
        $("h1").text("Game Over, Press A Key to Start");
        // empty the variables to initial states
        level = 0;
        count = 0;
        sequence=[];
        key=true;
    }
    // when match is successfull
    else if(result == true && count==sequence.length )
    {
        // since new match will begin so count is 0
        count=0;
        console.log("you win")
        // updating status to win
        $("#status").text("YOU WIN");
        // new level start 
        start();
    }
})


//start when a key is pressed
$(document).on("keydown",function()
{
    // when the match fails, the result becomes false therefore it is initialised with true again so that start() function can work
    result = true;
    // checking if the keypress doesn't restart the game in the middle of the game
    // it will only respond if user lost or page is refreshed
    if(key==true)
    {
        // key is set false so that if it is pressed the game does no restart unless lost
        key=false;
        // level status is removed
        $("#status").text("");
        start();
    }
})
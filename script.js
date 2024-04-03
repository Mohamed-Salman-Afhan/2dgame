/*
should start only when enter is pressed
creating a runStart variable and assigning it to 
0 - false*/

var runStart = 0;

//run sound
var runSound = new Audio("templerun/run.mp3");
runSound.loop = true;

//jump sound
var jumpSound = new Audio("templerun/jump.mp3");

//dead sound
var deadSound = new Audio("templerun/dead.mp3");



//first step - find the keycode
//enter key
function keyCheck(event){
    
    //enter key
    if(event.which == 13){
       
       if(runWorkerId == 0){

        // creating blocks using setting the blockWorkerId

        blockWorkerId = setInterval(createBlocks,100);

        moveBlockWorkerId = setInterval(moveBlock,100);

        //setting runWorkerId
        runWorkerId = setInterval(run,100);

        runSound.play();

        /* After Enter is pressed, runStart variable should be assigned as 
        1 - true*/
        runStart = 1;


        /*setting backgroundWorkerId inside
        the runWorkerId is to make sure the
        background moves when the character starts to move*/

        backgroundWorkerId = setInterval(moveBackground,100);

        scoreWorkerId = setInterval(updateScore,100);

       } 
       
    }

    //space key
    if(event.which == 32){

        if(runStart == 1){
            if(jumpWorkerId == 0){
                //setting jumpWorkerId
                clearInterval(runWorkerId);
                runSound.pause();

                //to fix an invisible bug
                runWorkerId = -1;


                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();


               } 
        } 
        
    }
    

}

//run code

var runImageNumber = 1;
var runWorkerId = 0;
var player = document.getElementById("player");

function run(){

    runImageNumber++;

    if(runImageNumber == 12){
        runImageNumber = 2;
    }

    player.src = "templerun/Run ("+runImageNumber+").png";

}

//jump code

var jumpImageNumber = 2;
var jumpWorkerId = 0;
var playerMarginTop = 490;


function jump(){

    jumpImageNumber++;

    if(jumpImageNumber<=7){
        playerMarginTop = playerMarginTop - 35;
        player.style.marginTop = playerMarginTop+"px";
    }


    if(jumpImageNumber>=8){
        playerMarginTop = playerMarginTop + 35;
        player.style.marginTop = playerMarginTop+"px";
    }

    if(jumpImageNumber == 12){
        jumpImageNumber = 2;
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();
        jumpWorkerId = 0;
    }

    player.src = "templerun/Jump ("+jumpImageNumber+").png";

}

//moving the background

//selecting the background and assigning it to a variable
var background = document.getElementById("background");

// since background should move horizontally we use backgroundX
var backgroundX = 0;

//Inorder to automate we create a worker

var backgroundWorkerId = 0;

//moveBackground function
function moveBackground(){

    /* we are subtracting 20 because we want the background
    to move in opposite direction of the character*/
    backgroundX = backgroundX - 20;

    /*Providing the value as css using Js*/
    background.style.backgroundPositionX = backgroundX+"px";


}


//scorecard

//selecting the score
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){

    newScore++;
    score.innerHTML= "Score "+newScore;
}

//creating blocks

var blockWorkerId = 0;
var blockMarginLeft = 700;

//creating a block Id to assign a unique Id
var blockId = 1

function createBlocks(){

   
    
    //creating block using Js
    var block = document.createElement("div"); 

    //using className to provide css properties
    block.className = "block";

    //Assigning Block Id
    block.id = "block"+blockId;
    
    //incrementing by 1;
    blockId++;

    //creating random blocks
    var gap = Math.random()*(1200-500)+(500);
    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft+"px";

    background.appendChild(block);
}

var moveBlockWorkerId = 0;

function moveBlock(){

    //creating for loop

    for( var i = 1; i<=blockId; i++){
       //selecting the blocks
      var currentBlock = document.getElementById("block"+i);

      //assigning the current block margin to a variable
        var currentMarginLeft = currentBlock.style.marginLeft;

        // Since we get a string value for currentMarginLeft
        // we convert it into int and subtract it by 20
        // and assign it to newmarginLeft
        var newMarginLeft = parseInt(currentMarginLeft) - 20;

        //concatening "px" to the newMarginLeft and assigning it to 
        //currentBlock.style.marginLeft
        currentBlock.style.marginLeft = newMarginLeft+"px";

        //put an alert to check the margin left of the flame

       // alert(newMarginLeft);

     if(newMarginLeft < 85 & newMarginLeft > -13){
           if(playerMarginTop > 400) {
            //alert("dead");
          //alert(playerMarginTop);
                clearInterval(runWorkerId);
                runSound.pause();
                clearInterval(jumpWorkerId);
                /* Inorder to avoid the bug which jumps when the player is dead when
                the space key is pressed we assign jumpWorkerId = -1; because jumpWorkerId
                is assigned with 0 somewhere */
                jumpWorkerId = -1;
                clearInterval(backgroundWorkerId);
                clearInterval(blockWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(moveBlockWorkerId);

                deadWorkerId = setInterval(dead,100);
                deadSound.play();
            
           }
       }
    }
    
}

var deadWorkerId=0;
var deadImageNumber = 1;


//Dead Function

function dead(){

    deadImageNumber++;

    if(deadImageNumber == 11){
        deadImageNumber = 10;
        //clearInterval(deadWorkerId);
        player.style.marginTop = "490px";
       document.getElementById("endscreen").style.visibility = "visible";
       document.getElementById("text2").innerHTML = newScore;
    }
    player.src = "templerun/Dead ("+deadImageNumber+").png";
}

function reload(){
    location.reload();
}

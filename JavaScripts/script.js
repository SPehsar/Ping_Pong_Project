
// *********************************************************************************
// decalaring and defining the variables
let player1 = sessionStorage.getItem("leftPlayer");  // Fetch back user's input from 
// the session storage from previous page
let player2  = sessionStorage.getItem("rightPlayer");  // Fetch back user's input from  
// the session storage from previous page
 let activated = true;
 let hits = 0;

 // Start to declare canvas and its context *****************************************
 const canvas = document.getElementById('container');
 const ctx = canvas.getContext("2d"); // The CanvasRenderingContext2D interface, 
 // part of the Canvas API, provides the 2D rendering context for the drawing surface 
 // of a <canvas> element. It is used for drawing shapes, text, images, and other objects.
 sessionStorage.setItem("result", "None"); // Set the value of the specified 
 // local/session storage item.
// End  to declare canvas and its context *****************************************
 

// Wowrk in progress
 class Player {
    constructor(hight, width, positionX ){
        this.height = hight;
        this.width = width,
        this.positionX = positionX,
        this.positionY = canvas.height / 2 - 100 / 2,
        this.color = '#39ff14',  // pick color // neon color
        this.name = 'leftSide',
        this.speed = 2 // 1,2,3, low, medium, high
// need work on class

    }
 }

// Start to define needed objects ***************************************************
 const ball = {
     radius: 9,  // large diameter for beginNers
     color: '#00FF00',  // neon color // Hourbour color
     positionX: canvas.width / 2 + 9,
     positionY: canvas.height / 2 + 9,
     speed_X: 3,  // 1,2,3, low, medium, high
     speed_Y: 3  // 1,2,3, low, medium, high
 }
 
 const leftPlayer = {
     name: player1,
     height: 100,
     width: 10,
     positionX: 10,
     color: '#39ff14',  // pick color // neon color
     positionY: canvas.height / 2 - 100 / 2,
     speed: 10 // 1,2,3, low, medium, high
 }
 
 const rightPlayer = {
     name: player2,
     height: 100,
     width: 10,
     color: '#39ff14', // pick color
     positionX: canvas.width - 20,
     positionY: canvas.height / 2 - 100 / 2,
     speed: 10 // 1,2,3, low, medium, high
 }
 // End to define needed objects ********************************************************
 


// Start to set initial setting for the element of the games *****************************

 const game = {
     rightScore: 0,   // intial  score
     leftScore: 0,  // intial  score
     turn: 0,
     maximumScore: 3,  // what top score you want to be
     speedIncreaseHit: 3, // number of ticks we want increase the speed
 }
 
 const keyPressed = {  // default user controlers set to false
    Up: false,
    Down: false,
    W: false,
    S: false

 }

 // End to set initial setting for the element of the games *******************************
 
 
 
// Start Update and Draw objects on the screen *********************************************
function drawRightPlayer() {
    ctx.beginPath();
    ctx.fillStyle = rightPlayer.color;
    ctx.rect(rightPlayer.positionX, rightPlayer.positionY, rightPlayer.width, rightPlayer.height);
    ctx.fill();
    ctx.closePath();
}

function drawLeftPlayer() {
    ctx.beginPath();
    ctx.fillStyle = leftPlayer.color;
    ctx.rect(leftPlayer.positionX, leftPlayer.positionY, leftPlayer.width, leftPlayer.height);
    ctx.fill();
    ctx.closePath();
 }
 
 function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);  // This for a circular ball, which is 
     // a fancy choice and I prefer it. The CanvasRenderingContext2D.arc() method of the Canvas 2D API adds a circular 
     // arc to the current sub-path.
     /*
        arc(x, y, radius, startAngle, endAngle)
        arc(x, y, radius, startAngle, endAngle, counterclockwise)
        The arc() method creates a circular arc centered at (x, y) with a radius of radius. The path starts at 
        startAngle, ends at endAngle, and travels in the direction given by counterclockwise (defaulting to clockwise).

        The arc is given an ball.positionX, a y-coordinate of ball.positionY, and a radius of ball.radius. 
        To make a full circle, the arc begins at an angle of 0 radians (0°), and ends at an angle of 2π radians (360°).
     */

      // ******************************************* Chosing Rectangular Ball Instead ***************************************  

     // ctx.fillRect(ball.positionX, ball.positionY, 12, 12); // This for a rectangullar ball.  Some adjustment needs 
     // to be made if using this; but it works FileSystemEntry. 
     /*
        The CanvasRenderingContext2D.fillRect() method of the Canvas 2D API draws a rectangle that is filled according to 
        the current fillStyle.This method draws directly to the canvas without modifying the current path, so any subsequent
        fill() or stroke() calls will have no effect on it.

        fillRect(x, y, width, height)

        The fillRect() method draws a filled rectangle whose starting point is at (x, y) and whose size is specified by width and 
        height. The fill style is determined by the current fillStyle attribute.

        x: The x-axis coordinate of the rectangle's starting point.
        y: The y-axis coordinate of the rectangle's starting point.
        width: The rectangle's width. Positive values are to the right, and negative to the left.
        height: The rectangle's height. Positive values are down, and negative are up.
     */

        ctx.fill();
        ctx.closePath();
 }
 
 
 function drawAllObjects() {  // canvas and palyers/ball draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawLeftPlayer()
     drawRightPlayer()
     drawBall()
 }
 // End  Update and Draw objects on the screen **********************************************



 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< fuctions that we use  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//  function getPlayer() {
//     player1 = localStorage["player1"];
//     player2 = localStorage["player2"];
//     console.log(player1, player2);
//   }
  // Start of resetStatsToZero function <><><><><><><><><><><><><><><><><><><><><><><><><><><>
  function resetStatsToZero(){ //  rsestGame to reset to start clean for next round
    game.leftScore = 0
    game.rightScore = 0
    ball.positionX = 0
    ball.positionY = 0
    updateingTheDefault()
}
// End of resetStatsToZero function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>


 // Start of resetBall function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
 function resetBall() {  // to rset ball and timeout
     ball.positionX = canvas.width / 2 + 9
     ball.positionY = canvas.height / 2 + 9
 
     let speed_X = ball.speed_X
     let speed_Y = ball.speed_Y
 
     ball.speed_X = 0
     ball.speed_Y = 0
 
     setTimeout(() => {
         ball.speed_X = -speed_X
         ball.speed_Y = -speed_Y
     }, 1000)
 }
 // End of resetBall function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>


 // Start of impactDelay function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
 function impactDelay() {
     activated = false
     setTimeout(() => {
         activated = true
     }, 1000)
 }
 
 
 function setDaScore() { // set how the lose case evaluated
     if (ball.positionX > canvas.width - (rightPlayer.width)) {
         game.leftScore++
         resetBall()
     } else if (ball.positionX < rightPlayer.width) {
         game.rightScore++
         resetBall()
     }
 
     document.getElementsByClassName('leftSide')[0].textContent = leftPlayer.name + " = " + game.leftScore  // leftscore data 
     // pass to class name leftSide in Game
     document.getElementsByClassName('rightSide')[0].textContent = rightPlayer.name + " = " + game.rightScore // rightscore data 
     // pass to class name rightSide in HTML Game
 }
 // End of impactDelay function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

 
 // Start of gameIsOver function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
 function gameIsOver(){   //   resultPage feed
     if(game.leftScore === game.maximumScore){
         sessionStorage.setItem("result", leftPlayer.name);  // **** appears on the resultPage
         window.location.href = "resultPage.html";
         resetStatsToZero()
     }else if(game.rightScore === game.maximumScore){
         sessionStorage.setItem("result", rightPlayer.name);   // **** appears on the resultPage
         window.location.href = "resultPage.html";
         resetStatsToZero()
     }
 }
 // End of gameIsOver function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>


 // Start of keyStatus function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
 function keyStatus() {
    if (keyPressed['Up']) {
        if (rightPlayer.positionY > 0) {
            rightPlayer.positionY -= rightPlayer.speed;
        }
    }
    if (keyPressed['Down']) {
        if (rightPlayer.positionY < canvas.height - rightPlayer.height) {
            rightPlayer.positionY += rightPlayer.speed;
        }
    } 
    
    if (keyPressed['Q']) {
         if (leftPlayer.positionY > 0) {
             leftPlayer.positionY -= leftPlayer.speed;
         }
     }
     if (keyPressed['A']) {
         if (leftPlayer.positionY < canvas.height - leftPlayer.height) {
             leftPlayer.positionY += leftPlayer.speed;
         }
     }

 }
 // End of keyStatus function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>


 // Start of ballMovmentUpdate function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
 function ballMovmentUpdate() {
     if ((ball.positionY + ball.radius) >= canvas.height || (ball.positionY - ball.radius) <= 0) {
         ball.speed_Y = -ball.speed_Y;
     }   // order is important
 
     if (
         (ball.positionX + ball.radius >= canvas.width - (rightPlayer.width + 10) &&
             (ball.positionY >= rightPlayer.positionY && ball.positionY <= rightPlayer.positionY + rightPlayer.height)) ||
 
         (ball.positionX - ball.radius <= (leftPlayer.width + 10) &&
             (ball.positionY >= leftPlayer.positionY && ball.positionY <= leftPlayer.positionY + leftPlayer.height))
     ) // order is important
     
            {
                if (activated) {
                    let audio = new Audio('media/Pong_sound.mp4');
                    audio.play();
                    hits++;
                    ball.speed_X = -ball.speed_X
                    impactDelay()
                }
            }
 
     setDaScore()
     gameIsOver()
 
     ball.positionX += ball.speed_X;
     ball.positionY += ball.speed_Y;
 }
 // End of ballMovmentUpdate function <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
 
 
 // Start loop through game function ********************************************************************************
 function loopingThroughGame() {
    // getPlayer()
    keyStatus()
     ballMovmentUpdate()
     drawAllObjects()
     requestAnimationFrame(loopingThroughGame);// This tells the browser that you wish to perform an animation 
     // and requests that the browser calls a specified function to update an animation before the next repaint.
     // This is a window method.

 }
// nd loop through game function **************************************************************************************
 
 
// Start updateingTheDefault function to set the canvas, ball and players' locations and render ************************
 function updateingTheDefault() {
     canvas.width = Math.min(window.innerWidth * 0.5, 700)
     canvas.height = Math.min(window.innerHeight * 0.7, 500)
 
     leftPlayer.positionY = canvas.height / 2 - leftPlayer.height / 2
 
     rightPlayer.positionX = canvas.width - (rightPlayer.width + 10)
     rightPlayer.positionY = canvas.height / 2 - rightPlayer.height / 2

     ball.positionX = canvas.width / 2 + ball.radius
     ball.positionY = canvas.height / 2 + ball.radius
 }
 // End updateingTheDefault function to set the canvas, ball and players' locations and render **************************


 // ++++++++++++++++++++++++++++++++++++++++++++++++ Event handlers / listners +++++++++++++++++++++++++++++++++++++++++++
  

 document.addEventListener('keyup', (event) => {
    // let name = event.key;
    let code = event.code;

    if (code === 'KeyA') {
        keyPressed['A'] = false;
    }
    if (code === 'KeyQ') {
        keyPressed['Q'] = false;
    }
    if (code === 'ArrowUp') {
        keyPressed['Up'] = false;
    }
    if (code === 'ArrowDown') {
        keyPressed['Down'] = false;
    }

}, false); 


  document.addEventListener('keydown', (event) => {
    let code = event.code;

    if (code === 'ArrowUp') {
        keyPressed['Up'] = true;
    }
    if (code === 'ArrowDown') {
        keyPressed['Down'] = true;
    }
    if (code === 'KeyA') {
        keyPressed['A'] = true;
    }
    if (code === 'KeyQ') {
        keyPressed['Q'] = true;
    }


}, false);


// +++++++++++++++++++++++++++++++++++++++++++ End of Event handlers / listners ++++++++++++++++++++++++++++++++++++++++++


//  ************** Following calls the whole game starts:
 requestAnimationFrame(loopingThroughGame); // This window method tells the browser that you wish to perform an
 // animation and requests that the browser calls a specified function to update an animation before the next repaint.
 updateingTheDefault();   //  call to updateingTheDefault function

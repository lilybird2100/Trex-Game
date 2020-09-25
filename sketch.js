var trex, ground, trexRun, trexCollide, ground1, ground2, ob1, ob2, ob3, ob4, ob5, ob6, cactusGroup, cloudsGroup, gameState,cloud1, gameOver1, gameOver, restart, restart1, count, highScore, jump, dieSound, checkPoint;
 
function preload(){
  trexRun = loadAnimation( "trex1.png", "trex3.png", "trex4.png" ); 
  
  ground1 = loadImage("ground2.png"); 
  ob1 = loadImage("obstacle1.png"); 
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  trexCollide = loadAnimation("trex_collided.png");
  cloud1 = loadImage("cloud.png"); 
  gameOver1 = loadImage("gameOver.png"); 
  restart1 = loadImage("restart.png"); 
  jump = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3"); 
  
  
}

function setup() {
  createCanvas(600, 200 );
  trex = createSprite(100, 75, 30, 30); 
  trex.addAnimation("running", trexRun); 
  trex.addAnimation("collided",trexCollide); 
  trex.scale = 0.5; 
  trex.depth = 2; 
  ground = createSprite(200, 180, 700, 30);  
  ground.addImage("movingGround", ground1); 
  ground.velocityX = -5; 
  ground2 = createSprite(300, 195, 600, 20);
  ground2.visible = false; 
  gameOver = createSprite(300,100, 30,30); 
  gameOver.addImage("gameOverText", gameOver1); 
  gameOver.visible = false; 
  gameOver.scale = 0.5;
  restart = createSprite(300,150,30,30); 
  restart.addImage("restartButton",restart1);
  restart.visible = false; 
  restart.scale = 0.5;
  cactusGroup = createGroup();
  cloudsGroup = createGroup();
  gameState = "play"; 
  count = 0; 
  highScore = 0; 
  
}

function draw() {
  background(245,245,245); 
  if(ground.x < 0) {
    ground.x = 400
  }
  trex.collide(ground2); 
  trex.velocityY = trex.velocityY +0.5; 
  
  
  fill(0,0,0);
  textSize(15); 
  text("Survival Time:" + count, 465, 25); 
  text("High Score:" + highScore, 475, 45); 
  
  if(frameCount % 8 === 0 && gameState === "play" ){
   count = count +1;  
  }
  
  if(count % 100 === 0){
    checkPoint.play(); 
  }

  if(gameState === "play") {
  
    if(keyWentDown("space") && trex.y >= 161){
      trex.velocityY = -10; 
      jump.play(); 
    }
    ground.velocityX = -5;
  }
  
  
  if(cactusGroup.isTouching(trex)){
    /*dieSound.play();*/   
    gameState = "end"; 
     }
  
  if(gameState === "end"){
    ground.velocityX = 0; 
    trex.velocityY = 0; 
    trex.y = 161; 
    trex.changeAnimation("collided", trexCollide); 
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0); 
    cloudsGroup.setLifetimeEach(-1) ; 
    cactusGroup.setLifetimeEach(-1); 
    gameOver.visible = true;
    restart.visible = true; 
    if(count > highScore) {
     highScore = count;  
    }
    
  } 
  
  if(mousePressedOver(restart) && gameState === "end"){
   gameOver.visible = false; 
   restart.visible = false; 
   gameState = "play"
   cactusGroup.destroyEach(); 
   cloudsGroup.destroyEach(); 
   trex.changeAnimation("running", trexRun); 
   count = 0; 
  }
  
  cactus();
  clouds(); 
  drawSprites(); 
  
  
   fill(0,0,0);
  textSize(15); 
  text("Survival Time:" + count, 465, 25); 
  text("High Score:" + highScore, 475, 45); 
}




function cactus(){
 if(frameCount % 80 === 0){
   var abc = Math.round(random(1,6));
  var cactus = createSprite(650, 170, 30,30) 
   cactus.velocityX = -5; 
   switch(abc){
     case 1:
         cactus.addImage("randomCactus",ob1);
       break;
     case 2: 
         cactus.addImage("randomCactus",ob2);
       break;
     case 3: 
         cactus.addImage("randomCactus",ob3);
       break;
     case 4: 
         cactus.addImage("randomCactus",ob4);
       break;  
     case 5: 
         cactus.addImage("randomCactus",ob5);
       break;  
     case 6: 
         cactus.addImage("randomCactus",ob6);
       break;  
   }
    cactus.scale = 0.5;
    cactus.lifetime = 200; 
    cactusGroup.add(cactus);
 }
}


function clouds(){
  if(frameCount % 60 === 0){
    var abc = Math.round(random(10,150));
    var cloud = createSprite(700, abc, 30, 30); 
    cloud.addImage("cloud", cloud1); 
    cloud.velocityX = -3; 
    cloud.scale = 0.5; 
    cloud.lifetime = 250;
    cloud.depth = 1; 
    cloudsGroup.add(cloud); 
  }
  
  
  
  
}




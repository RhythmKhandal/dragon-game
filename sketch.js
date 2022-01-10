var sky,skyImg;
var dragonImg,dragon,endDragonImg;
var enemyImg,enemy;
var heartImg,heart;
var fireBallImg,fireBall;
var gameoverImg,gameOver;
var obstacle1Img,obstacle2Img,obstacle3Img;
var upObstacleGroup,midObstacleGroup,downObstacleGroup;
var upObstacle,midObstacle,downObstacle;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
 skyImg = loadImage("assests/combinedsky.png");
 dragonImg = loadAnimation("assests/Dragon1.png","assests/Dragon2.png","assests/Dragon3.png");
 enemyImg = loadAnimation("assests/enemy1.png","assests/enemy2.png");
 heartImg = loadImage("assests/points.png");
 fireBallImg = loadImage("assests/fire.png");
 gameoverImg =  loadImage("assests/gameover.png");
 obstacle1Img = loadImage("assests/obstacle1.png");
 obstacle2Img = loadImage("assests/obstacle2.png");
 obstacle3Img = loadImage("assests/obstacle3.png");
 endDragonImg = loadImage("assests/dragon4.png")
}

function setup() {
  createCanvas(800,400);

  sky = createSprite(400, 200, 50, 50);
  sky.addImage(skyImg);
  sky.scale = 0.7;


  dragon = createSprite(70, 200, 50, 50);
  dragon.addAnimation("flyingDragon",dragonImg);

  upObstacleGroup = new Group();
  midObstacleGroup = new Group();
  downObstacleGroup = new Group();
  heartGroup = new Group();

  gameOver = createSprite(400,200,60,20);
  gameOver.addImage(gameoverImg);
  gameOver.visible = false;
}

function draw() {
  background("black"); 

  if(gameState===PLAY){

    if(keyDown("UP_ARROW")){
      dragon.y -= 5;
    }
  
    if(keyDown("DOWN_ARROW")){
      dragon.y += 5;
    }
  
    if(sky.x <= 250){
      sky.x = width/2;
    }
  
    sky.velocityX = -3;
  
    if(heartGroup.isTouching(dragon)){
      heartGroup.destroyEach();
      score = score+1;
    }

    spawnHearts(); 
    spawnUpObstacle();

    if(upObstacleGroup.isTouching(dragon)){
      gameState = END;
    }

    if(midObstacleGroup.isTouching(dragon)){
      gameState = END;
    }

    if(downObstacleGroup.isTouching(dragon)){
      gameState = END;
    }
  }

  



  // if(dragon.y >height/2){
  //   dragon.velocityY += 0.1; 
  // }else{
  //   dragon.velocitY -= 0.1;
  // }

 

  


  
  
  drawSprites();

  stroke("black");
  fill("white");
  textSize(20);
  text("Score:"+score,350,35);

  if(gameState===END){

    sky.velocityX = 0;
    dragon.velocityX = 0;
    dragon.velocityY = 0; 

    upObstacleGroup.setVelocityXEach(0);
    midObstacleGroup.setVelocityXEach(0);
    downObstacleGroup.setVelocityXEach(0);
    heartGroup.setVelocityXEach(0);

    gameOver.visible = true;

    // stroke("black");
    // fill("red");
    // text("(Press R to restart the game)",270,300);

    if(keyDown("R")){
      reset();
    }
  }

}
  function spawnHearts(){
    if(frameCount % 250===0){
      heart = createSprite(850,random(80,275));
      heart.addImage(heartImg);
      heart.velocityX = -3;
      heartGroup.add(heart);
    }
  }

  function spawnUpObstacle(){

    if(frameCount % 200===0){
      var rand = Math.round(random(1,3));

      if(rand === 1){
        upObstacle = createSprite(850,80,70,100);
        upObstacle.velocityX = -3;
        upObstacle.addImage(obstacle1Img);
        upObstacle.scale = 1.65;
        upObstacleGroup.add(upObstacle);
      } else if(rand === 2){
        midObstacle = createSprite(850,random(70,300),70,100);
        midObstacle.velocityX = -3;
        midObstacle.addImage(obstacle3Img);
        midObstacle.scale = 1.65;
        midObstacleGroup.add(midObstacle);
      } else{
        downObstacle = createSprite(850,275,70,100);
        downObstacle.velocityX = -3;
        downObstacle.addImage(obstacle2Img);
        downObstacle.scale = 1.65;
        downObstacleGroup.add(downObstacle);
      }
    }
  }
  function reset(){
    gameState = PLAY;
    score = 0;
    upObstacleGroup.destroyEach();
    downObstacle.destroyEach();
    midObstacleGroup.destroyEach();
    heartGroup.destroyEach();

  }
  
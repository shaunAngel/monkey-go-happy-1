var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
ground=createSprite(200,390,800,20);
  ground.velocityX=-5
  ground.x=ground.width/2;
  
  
  monkey = createSprite(50,390,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.175
  
  FoodGroup=new Group();
  obstaclesGroup=new Group();

}


function draw() {
background(13,139,47)
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  monkey.collide(ground);
  
  if(keyDown("space")){
    monkey.velocityY=-5
  }
  monkey.velocityY=monkey.velocityY+0.5
   
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach(); 
  score=score+1;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

  }
  
  spawnfood();
  spawnObstacles();
  
  drawSprites();
   
  textSize(20);
  fill("white");
  text("score:"+score,200,50);
  
}

function spawnfood() {
  //write code here to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(20,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    monkey.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600,320,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -3;
    
    obstaclesGroup.add(obstacle);
  }
}




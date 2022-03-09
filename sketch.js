var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacleGroup, cloudGroup;
var checkpoint_Sound, die_Sound, jump_Sound;
var restartImg, gameOverImg;
var restart, gameOver;
var score = 0;
var gamestate = "start";
function preload() {
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    checkpoint_Sound = loadSound("checkpoint.mp3"); 
    die_Sound = loadSound("die.mp3");
    jump_Sound = loadSound("jump.mp3");
    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");


    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
}
function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;

    obstacleGroup = createGroup();
    cloudGroup = createGroup();


    restart = createSprite(300,100);
    gameOver = createSprite(300,75);
    restart.addImage(restartImg);
    gameOver.addImage(gameOverImg);
    restart.scale = 0.5;
    gameOver.scale = 0.5;
    restart.visible = false;
    gameOver.visible = false;

    
    


    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    
    //create an invisible ground
    invisibleGround = createSprite(200,195,400,20);
    invisibleGround.visible = false;

   
}
function draw() {
    background(150);

    text("Score: " + score, 545, 25  );



    trex.debug = false;
    trex.setCollider("circle", 0, 0, 40);
    if(gamestate == "start"){


        
    if(frameCount % 100 == 0){
        score +=1;
    }

        if (keyDown("space") && trex.y >= 135) {
            trex.velocityY = -12;
            jump_Sound.play();
        
        }
    
        trex.velocityY = trex.velocityY + 0.8
    
       
    
        spawn_Cloud();
        spawn_Obstacle();
        if(trex.isTouching(obstacleGroup)){
            gamestate = "end";
            console.log("The game has ended");
        }





    }


    if(gamestate == "end"){
        restart.visible = true;
        gameOver.visible = true;
        ground.velocityX = 0;
        trex.velocityY = 0; 
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        trex.changeAnimation("collided",trex_collided);
        if(mousePressedOver(restart))
     {
            restartGame();
    
        }



    }
    
























    //jump when the space button is pressed
    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);
    drawSprites();
}
function spawn_Cloud() {
    
    if(frameCount % 60 == 0) {
     var ran = Math.round(random(100, 50))


     cloud = createSprite(600, 100, 40,10);
     cloud.y = ran;
     cloud.addImage(cloudImage);
     cloud.scale = 0.1;
     cloud.velocityX = -3;
     cloud.lifetime = 200;


     
      cloud.depth = trex.depth;
      trex.depth+=1;
      cloudGroup.add(cloud);



    }




}

function spawn_Obstacle(){
    if(frameCount % 60 ==0){
    
    
        obstacle = createSprite(400,165,10,40);
        obstacle.velocityX = -5;
        obstacle.lifetime = 200;
        var obstacle_ran = Math.round(random(1, 6));
        switch(obstacle_ran){
            case 1:
                obstacle.addImage(obstacle1);
                obstacle.scale = 0.1;

                break;

            case 2:
                obstacle.addImage(obstacle2);
                obstacle.scale = 0.1;




                break;

            case 3:
                obstacle.addImage(obstacle3);
                obstacle.scale = 0.15;





                break;

            case 4:
                obstacle.addImage(obstacle4);
                obstacle.scale = 0.05;

                



                break;

            case 5:
                obstacle.addImage(obstacle5);
                obstacle.scale = 0.05;

                



                break;

            case 6:
                obstacle.addImage(obstacle6);
                obstacle.scale = 0.1;

                



                break;

            default:
                break;

        




               
        }
        obstacleGroup.add(obstacle);

    }
}

function restartGame(){
    gameState = "start";
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    restart.visible = false;
    gameOver.visible = false;
    trex.changeAnimation("running", trex_running);
    score = 0;




}
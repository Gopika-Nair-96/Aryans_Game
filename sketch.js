var gameState = "serve";
var description = "With the increase and rise of pollution \n around the world this game focusses\n on encountering pollution in a fun \n and interactive way";
var button;
var bg ,bgImg,serveTree,serveTreeImg,serveInvisibleGround;
var player,ground,topGround,topGroundGroup,seedGroup,topGroundImg;
var half, seedCount = 0, pollution, pollutionGroup, playerBar, earthBar, pBar, seedImg, smokeImg;
var meteor, meteorImg1, meteorImg2, meteorGroup,  fireImg, cutTreeImg;
var pollutionMonster, pMonsterImg,monsterGroup;
var fightSprite, fireball, fireballGroup, waterBalloonGroup, waterBalloon, waterBalloonImg, fireballImg, monsterImg; 
var fightBg, groundImg;
var plant, plantCount = 0;
var rules = "Collect the seeds from the moving ground and \n plant them whenever you see anything \n causing pollution";
var end = "You can only plant seeds when you have them so keep a look at the seed count\n See your health bar...Whenever you touch an agent of pollution it reduces\n Once Your health Bar is 0 you lose\n And if you plant enough seeds the red bar reduces to 0 and \n you win";
var fightRules = "You can either dodge the fireballs or destroy all of them with one of your water spears\n If even one water spear touches the monster you win and go back to the normal game ";


var playerhealth = 200;
var MAX_HEALTH = 200;
var rectWidth = 400;

var pollutionhealth = 200;
var MAX_PHEALTH = 200;
var rectWidth_pollution =400;

function preload() {
  serveTreeImg = loadImage("tree.png");
  playBg = loadImage("op.png");
  topGroundImg = loadImage("float.png");
  seedImg = loadImage("seed.png");
  smokeImg = loadImage("smoke.png");
  meteorImg1 = loadImage("meteor1.png");
  meteorImg2 = loadImage("meteor2.png");
  groundImg = loadImage("gg.png");
  fireImg = loadImage("fire.png");
  cutTreeImg = loadImage("cutTree.png");
  fireballImg = loadImage("fireball.png");
  monsterImg = loadImage("mon.png");
  waterBalloonImg = loadImage("blue.gif");
  fightBg = loadImage("fightBg.jpg");
  getBackground();
  
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  half = displayWidth / 2;

  console.log(frameRate);
  serveTree = createSprite(displayWidth-displayWidth+200, displayHeight-50);
  serveTree.addImage(serveTreeImg);
  serveTree.scale = 0.09;

  //to be changed
  serveTree.velocityX = 10;
  serveInvisibleGround = createSprite(displayWidth-20, displayHeight +100, 20, displayHeight);
  serveInvisibleGround.visible = false;
  
  ground = createSprite(displayWidth/2, displayHeight, displayWidth+displayWidth/2+displayWidth/2+2*(displayWidth/2), 20);
  // ground.addImage(groundImg);
  
  // ground.scale = 0.5;
  ground.x = ground.width / 2;
  player = createSprite(40, displayHeight - 70, 40, 60);
   ground.visible = false;
  player.visible = false;
  playerBar = createSprite(displayWidth - displayWidth + 250, displayHeight / 2 - 300, 300, 20);
  playerBar.shapeColor = "green"; 
  playerBar.visible = false;
  pBar = createSprite(displayWidth - displayWidth + 250, displayHeight / 2 - 250, 300, 20);
  pBar.shapeColor = "red";
  pBar.visible = false;
  fightSprite = createSprite(displayWidth - 200, ground.y - 100, 40, 80);
  fightSprite.addImage(monsterImg);
 
  
  fightSprite.scale = 0.3;
  fightSprite.visible = false;
  topGroundGroup = new Group();
  seedGroup = new Group();
  pollutionGroup = new Group();
  meteorGroup = new Group();
  monsterGroup = new Group();
  fireballGroup = new Group();
  waterBalloonGroup = new Group();
  // description.velocityX = -3;
  //  bg = createSprite(200,200, 500, 500);
  //  bg.addImage("hello",bgImg);
   
}

function draw() {
   //  if (gameState == "serve") {
   //    bg.addImage(bgImg);
   //  }
   // else {
   //    bg = null;
   //  }
     if (keyDown("up")&&player.y>=displayHeight/2+70) {
      player.velocityY=-12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);
    
    if (player.x >= displayWidth) {
      player.x = 40;
    }
  if (player.isTouching(seedGroup)) {
    //  console.log("hAppy bday");
         seedGroup.destroyEach();
         seedCount = seedCount + 1;
  }
  player.depth = ground.depth;
  player.depth = player.depth + 1;
 player.collide(topGroundGroup);
  // if (gameState=="serve" && keyDown==32) {
  //   gameState = "play";
  // }
  if (gameState == "serve") {
    background(bg);
   
    if (serveTree.isTouching(serveInvisibleGround)) {
      serveTree.velocityY = 0;
      gameState = "play";
    }
  }
  if (gameState == "play") {
     background(playBg);
    ground.visible = true;
    player.visible = true;
// -----------------------------------------PLAYER HEALTH IN PLAY STATE--------------------------------------------------------------------------------
    if (playerhealth < 125)
  {
    fill("red");
  }  
  else if (playerhealth < 150)
  {
    fill("yellow");
  }
  else
  {
    fill("green");
  }
  
  // Draw bar
  noStroke();
  // Get fraction 0->1 and multiply it by width of bar
  var drawWidth = (playerhealth / MAX_HEALTH) * rectWidth;
  rect(100, 100, drawWidth, 50);
  
  // Outline
  stroke(0);
  noFill();
  rect(100, 100, rectWidth, 50);
//-------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------POLLUTION HEALTH IN PLAY STATE---------------------------------------------------------

if (pollutionhealth < 125)
  {
    fill("green");
  }  
  else if (pollutionhealth < 150)
  {
    fill("yellow");
  }
  else
  {
    fill("red");
  }
  
  // Draw bar
  noStroke();
  // Get fraction 0->1 and multiply it by width of bar
  var drawWidth_pollution = (pollutionhealth / MAX_PHEALTH) * rectWidth_pollution;
  rect(100, 200, drawWidth_pollution, 50);
  
  // Outline
  stroke(0);
  noFill();
  rect(100, 200, rectWidth_pollution, 50);

//-------------------------------------------------------------------------------------------------------------------------------



    //playerBar.visible = true;
    //pBar.visible = true; 
    if (keyWentDown("right")) {
      ground.velocityX = -3;
      player.velocityX = 3;
    }
    if (keyWentUp("right")) {
      ground.velocityX = 0;
      player.velocityX = 0;
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
    
     serveTree.destroy();
     
     if(player.x===400)
     {
     spawnTopGround();
     }
     
    if (World.frameCount % 470 == 0) {
      spawnPollution();
    }
    if (World.frameCount % 500==0|| World.frameCount%1200==0){
      spawnMeteor();
    }
    
    if (player.isTouching(pollutionGroup)&&seedCount>0&&keyDown("space")) {
      pollutionGroup.destroyEach();
      seedCount = seedCount - 1;
       plant = createSprite(player.x, player.y-50, 40, 50);
      plant.addImage(serveTreeImg);
      plant.scale = 0.3;
      plant.velocityX = -3;
      polllutionhealth=pollutionhealth-2;

      
    }
   
    if (player.isTouching(pollutionGroup) && playerhealth>0 ) {
      pollutionGroup.destroyEach();
      playerhealth=playerhealth-10;
    }
    if (meteorGroup.isTouching(ground)||meteorGroup.isTouching(player)||meteorGroup.isTouching(topGroundGroup) && playerhealth>0) {
      meteorGroup.destroyEach();
      playerhealth=playerhealth-10;
    }
    
    // console.log(seedCount);
    // console.log(gunCount);
      if (World.frameCount % 1000 == 0) {
      spawnMonster();
      }
    if (player.isTouching(monsterGroup)) {
      seedGroup.destroyEach();
      pollutionGroup.destroyEach();
      meteorGroup.destroyEach();
      monsterGroup.destroyEach();
      topGroundGroup.destroyEach();
      player.x = displayWidth - displayWidth + 200;
      gameState = "fight";
    }

    
  }
  if (gameState == "fight") {
    background(fightBg);
// -----------------------------------------PLAYER HEALTH IN FIGHT STATE--------------------------------------------------------------------------------
if (playerhealth < 125)
{
  fill("red");
}  
else if (playerhealth < 150)
{
  fill("yellow");
}
else
{
  fill("green");
}

// Draw bar
noStroke();
// Get fraction 0->1 and multiply it by width of bar
var drawWidth = (playerhealth / MAX_HEALTH) * rectWidth;
rect(100, 100, drawWidth, 50);

// Outline
stroke(0);
noFill();
rect(100, 100, rectWidth, 50);
//-------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------POLLUTION HEALTH IN FIGHT STATE---------------------------------------------------------

if (pollutionhealth < 125)
{
  fill("green");
}  
else if (pollutionhealth < 150)
{
  fill("yellow");
}
else
{
  fill("red");
}

// Draw bar
noStroke();
// Get fraction 0->1 and multiply it by width of bar
var drawWidth_pollution = (pollutionhealth / MAX_PHEALTH) * rectWidth_pollution;
rect(100, 200, drawWidth_pollution, 50);

// Outline
stroke(0);
noFill();
rect(100, 200, rectWidth_pollution, 50);

//-------------------------------------------------------------------------------------------------------------------------------



    var inGround = createSprite(displayWidth / 2 + 200, displayHeight / 2 - 200, displayWidth, 20);
    inGround.visible = false;
    fightSprite.visible = true;
    // plant.visible = false;
    fightSprite.collide(ground);
  
    
    if (fightSprite.y > displayWidth / 2) {
      fightSprite.velocityY = -6;
    }
    if (fightSprite.isTouching(inGround)) {
      fightSprite.velocityY = 6;
    }
    // if (fightSprite.y>displayHeight/2) {
    //    fightSprite.velocityY = 6;
    //  }
    // if (fightSprite.isTouching(ground)) {
    //   fightSprite.velocityY = -6;
    // }
    // if (fightSprite.x == displayWidth / 2) {
    //   fightSprite.velocityX = 6;
    // }
    //       fightSprite.velocityY = fightSprite.velocityY + 0.8;
    // fightSprite.bounceOff(ground);
  
    ground.velocityX = 0;
        if (keyWentDown("right")) {
      // ground.velocityX = -3;
      player.x=player.x+10;
        }
            if (keyWentUp("right")) {
      // ground.velocityX = -3;
      player.x=player.x;
    }
    monsterGroup.setVelocityXEach(0);
    if (frameCount % 50 == 0) {
      spawnFireball();
    }
    if (keyWentDown("space")) {
      spawnWaterBalloon();
    }
    if (fireballGroup.isTouching(waterBalloonGroup)) {
      fireballGroup.destroyEach();
      waterBalloonGroup.destroyEach();
    }
    if (fireballGroup.isTouching(player)) {
      player.shapeColor = "red";
    }
    if (waterBalloonGroup.isTouching(fightSprite)) {
      fightSprite.shapeColor = "green";
    }
     if (fightSprite.shapeColor == "green") {
       gameState = "play";
       fightSprite.destroy();
       waterBalloonGroup.destroyEach();
       fireballGroup.destroyEach();
       
     }
  }

  drawSprites();
  if (gameState == "serve") {
    fill(128 + sin(frameCount * 0.1) * 128);
        textSize(40);
  
    textStyle(BOLDITALIC);
  if (mouseIsPressed) {
    stroke(255);
  }
  else {
    noStroke();
  }
  textSize(12 + (mouseX / width)*72);
  text(description, 50, 200);
}
  if (gameState == "play") {
    textSize(15);
    fill(250);
    textStyle(BOLD);
 
    text("Seeds: " + seedCount, displayWidth / 2 + 600, displayHeight / 2 - 300);
    textSize(40);
       if (World.frameCount>0&&World.frameCount<600) {
         text("CONTROLS AND RULES", displayWidth / 2 - 50, displayHeight / 2 - 100);
         textSize(20);
         text("~ right arrow to move right", displayWidth / 2 - 50, displayHeight / 2 - 60);
         text("~ up arrow to move up", displayWidth / 2 - 50, displayHeight / 2 - 20);
         text("~ space to plant seeds", displayWidth / 2 - 50, displayHeight / 2 + 20);
         text(rules, displayWidth / 2 - 50, displayHeight / 2 + 60);
         text(end, displayWidth / 2 - 150, displayHeight / 2 + 150);
    }
  }
  // if (gameState == "fight") {
  //     textSize(40);
  //   fill(250);
  //   textStyle(BOLD);
  //   if (World.frameCount > 0 && World.frameCount < 300) {
  //     text("WELCOME TO THE BATTLEGROUND", displayWidth / 2 - 250, displayHeight / 2 - 100);
  //     textSize(20);
  //     text("~ Press Space to launch Water Spears", displayWidth / 2 - 125, displayHeight / 2 - 60);
  //     text("~ Press Up arrow to move Up", displayWidth / 2 - 125, displayHeight / 2 - 20);
  //     text("~ Press Right arrow to move right", displayWidth / 2 - 125, displayHeight / 2 + 20);
  //     text(fightRules, displayWidth / 2 - 250, displayHeight / 2 + 60);
  //   }

  // }
    
    // textSize(20);
    // fill(0);
    // text("Objective: Collect and plant seeds,\n fight the pollution monster\n and make the dry earth green", 600, 570);
    // text("Loading...", 50, displayHeight-50);
  }



function getBackground() {
  if (gameState == "serve") {
    bgImg = "wow.jpg";
  }
  // else  {
  //   bgImg = "li.jpg";
  // }
  bg = loadImage(bgImg);
}
function changeState() {
  gameState = "play";
}

function keyPressed(){
  if (gameState == "serve" && keyCode === ENTER) {
    gameState == "play";
  }
}

 function spawnTopGround() {
  
    
   
   topGround = createSprite(displayWidth + 110, displayHeight / 2 + 190);
   topGround.addImage(topGroundImg);
   topGround.scale = 0.25;
   
    seed = createSprite(topGround.x, topGround.y - 60, 10, 50);
   seed.addImage(seedImg);
   seed.scale = 0.2;
   seed.velocityX = -3;

    topGround.velocityX = -3;
    topGroundGroup.add(topGround);
   seedGroup.add(seed);
   
 }

function spawnPollution() {
  var rand = Math.round(random(1, 3));
 
  //if (keyWentDown("right")) {
 // }
  // if (keyWentUp("right")) {
  //   pollution.velocityX = 0;
  // }
  if (rand == 1) {
     pollution = createSprite(displayWidth + 110, ground.y - 100, 30, 60);
    pollution.addImage(smokeImg);
    pollution.scale = 0.3;
  }
  if (rand == 2) {
     pollution = createSprite(displayWidth + 110, ground.y - 70, 30, 60);
    pollution.addImage(fireImg);
    pollution.scale = 0.2;
  }
  if (rand == 3) {
     pollution = createSprite(displayWidth + 110, ground.y - 100, 30, 60);
    pollution.addImage(cutTreeImg);
    pollution.scale = 0.7;
  }
  
    pollution.velocityX = -3;
 
  pollutionGroup.add(pollution);
  
}
   
function spawnMeteor() {
  rand = Math.round(random(1, 2));
  if (rand == 1) {
    meteor = createSprite(displayWidth - displayWidth - 50, displayHeight / 2 - displayHeight / 2 - 70);
    meteor.velocityX = Math.round(random(4, 7));
    meteor.velocityY = Math.round(random(4, 7));
    
    meteor.addImage(meteorImg1);
    meteor.scale = 0.3;
  }
  else if (rand == 2) {
    meteor = createSprite(displayWidth + 50, displayHeight / 2 - displayHeight / 2 - 70);
    meteor.velocityX = Math.round(random(-4, -7));
    meteor.velocityY = Math.round(random(4, 7));
    meteor.addImage(meteorImg2);
    meteor.scale = 0.3;
  }
  meteorGroup.add(meteor);
}

function spawnMonster() {
  pollutionMonster = createSprite(displayWidth + 50, ground.y - 100, 40, 80);
  pollutionMonster.addImage(monsterImg);
  pollutionMonster.scale = 0.2;
  pollutionMonster.velocityX = -4;
  monsterGroup.add(pollutionMonster);
}
 function spawnFireball() {
   fireball = createSprite(fightSprite.x, fightSprite.y, fightSprite.width, fightSprite.height - 20);
   fireball.addImage(fireballImg);
   fireball.scale = 0.1;
   fireball.velocityX = -5;
  //  if (gameState == "play") {
  //    fireball.velocityX = 0;
  //  }
   fireballGroup.add(fireball);

 }
     
function spawnWaterBalloon() {
  waterBalloon = createSprite(player.x, player.y, player.width, player.height - 20);
  //waterBalloon.shapeColor = "red";
  waterBalloon.addImage(waterBalloonImg);
  waterBalloon.scale = 0.3;
  waterBalloon.velocityX = 5;
  // if (gameState == "play") {
  //    waterBalloon.velocityX = 0;
  //  }
  waterBalloonGroup.add(waterBalloon);
 }
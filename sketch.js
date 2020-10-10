var helicopterIMG, helicopterSprite,x=true,play, packageSprite,packageIMG, packOptions;
var packageBody,ground;
var BWall,LWall,RWall;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
function preload(){
	helicopterIMG=loadImage("helicopter.gif")
	packageIMG=loadImage("package.png")
 pSound=loadSound("p.mp3");
 playI=loadImage("play.png");
 hit=loadSound("hit.mp3");
}

function setup() {
 createCanvas(800, 700);
	rectMode(CENTER);
 packOptions={
 restitution:0, 
 isStatic:true,
 friction:0
 }
 
	packageSprite=createSprite(width/2, 200, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.15

	helicopterSprite=createSprite((width/2)-40, 170, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=1

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(packageSprite.x , packageSprite.y, 5,packOptions);
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 World.add(world, ground);


	Engine.run(engine);
 
 LWall = new wall(250,600,50,100);
 RWall = new wall(550,600,50,100);
 BWall = new wall(400,635,300,30);
 
 BSprite=createSprite(400,635,300,30);
 BSprite.visible=false;
 
 play=createSprite(400,350,0,0);
 play.addImage("p",playI);
}


function draw() {
 rectMode(CENTER);
 background(0);
 if(mousePressedOver(play)&&x==true){
 play.destroy();
	pSound.loop(); 
 x=false
 }
 if(packageSprite.isTouching(BSprite)&&x==false){
 hit.play();
 x=true;
 }
 Engine.update(engine);
 packageSprite.x= packageBody.position.x 
 packageSprite.y= packageBody.position.y 
 BWall.display();
 LWall.display();
 RWall.display();
 drawSprites();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
 Matter.Body.setStatic(packageBody, false); 
 }
}

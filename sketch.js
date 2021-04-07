//Create variables here
var dogIMG;

var happyDog,database,foodS,foodStock;
var dog;
var feed;
var lastFed;

var changeState;
var readState;

var currentTime;
var gameState;

var bedroomIMG, washroomIMG, gardenIMG;
var bedrooom,washroom,garden;

function preload(){

  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

  bedroomIMG = loadImage("images/Bed Room.png");
  washroomIMG = loadImage("images/Wash Room.png")
  gardenIMG = loadImage("images/Garden.png");



}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogIMG);
  dog.scale = .3;

  feed = createButton("Feed The Dog!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the food here");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

  //read gameState from firebase
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });



 


  
  
}


function draw() {  

  background(46, 130, 87);

 foodObj.display();

 
 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();




 });



 currentTime=hour();

 if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime==(lastFed+3)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry");
  foodObj.display();
}

 fill(255,255,254);
 textSize(15);

 if (lastFed >= 12){
   text("last feed : "+ lastFed%12 +"PM", 350,30);

 } else if(lastFed == 0){
   text("Last Fed : "+ lastFed + "AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + "AM", 350,30);
 }


 
 if(gameState!="Hungry"){
  feed.hide();
  addFood.hide()
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(dogIMG);
}


  drawSprites();

 

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var fs = foodObj.getFoodStock();

  if(fs <= 0){
    foodObj.updateFoodStock(fs * 0);
  }else{
    foodObj.updateFoodStock(fs - 1);
  }
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()


  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  });
}




function update(state){

  database.ref('/').update({
      gameState:state
  });

}
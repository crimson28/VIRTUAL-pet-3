class Food{



    constructor(){

        this.foodStock = 0;
        this.lastFeed;
        this.image = loadImage("images/Milk.png");
        
        

    }

    getFedTime(lastFed){
        this.lastFeed = lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }


    }

    bedroom(){

        background(bedroomIMG,550,500);

    }

    garden(){
        background(gardenIMG,550,500);

    }

    washroom(){

        background(washroomIMG,550,500);

    }



    display(){
        var x = 80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock != 0){

            for(var i = 1; i < this.foodStock; i++){
                
                if(i%10 == 0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);

                x = x + 30;
            }
        }
            

        

      



    }
}
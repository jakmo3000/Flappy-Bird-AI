class Agent 
{
constructor(obstacles)
{

    this.brain = new NeuralNetwork(4,5,1);
  this.weights = this.brain.getWeights();
    this.obstacles = obstacles;
    this.player = new Player(obstacles);
    
}


play()
{  const inputs = [];
    
  inputs[0] = this.player.y /canvas.height;
  inputs[1] = this.obstacles.obs[0].x/canvas.width;
  inputs[2] = this.obstacles.obs[0].y/canvas.height;
  inputs[3] = (this.obstacles.obs[0].y + this.obstacles.obs[0].height)/canvas.height;
    const outputs = this.brain.feedforward(inputs);
 
    
   if(outputs[0] > 0.5)
     this.player.jump();
      
}

mutate(rate)
{
   
  let newWeights = [];
  for(let i = 0; i < this.weights.length; i++)
  {
      newWeights.push(Matrix.mutate(this.weights[i],rate));
  }

  
  let child = new Agent(this.obstacles);
  child.weights = newWeights.slice();
  child.brain.setWeights(newWeights);
  
 
  
  return child;
}

crossover(parent2)
{
  let newWeights = [];
  newWeights[0] = this.weights[0];
  newWeights[1] = this.weights[1];
  newWeights[2] = parent2.weights[2];
  newWeights[3] = parent2.weights[3];

  let child = new Agent(this.obstacles);
  child.weights = newWeights.slice();
  child.brain.setWeights(newWeights);
  return child
}

}





   class Player {
    constructor(ob)
    {
    this.x = 30;
    this.y = 200;
    this.height = 40;
    this.width = 20;
      this.velocity = 0;
      this.score = 0;
      this.obstacles = ob.obs;
      this.gameOver = false;

      this.training_score = 0;
      this.fitness = 0;
      
    }
    
    scoreChange(add)
    {  
        if(this.gameOver === false)
         this.score += add;
     score.innerText = 'SCORE: ' + this.score;
    }
    draw()
        {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x,this.y,20,40);
            this.collision();
            this.fall();
            if(this.gameOver === false){
              this.training_score+= 1;
              

            }
            
        }
    
        fall()
        {
         this.gravity = 0.5;
         this.velocity += this.gravity;
         this.y += this.velocity;
        }
        jump()
        { if(this.gameOver === false)
           this.velocity = -10;
          
          
        }
    
        collision(){
           
           if(this.y < 0)
           {
            this.y = 0;
            this.velocity = 0;
           }
           
           if(this.y + this.height > canvas.height)
           {
            this.velocity = 0;
            this.y = canvas.height-this.height;
            this.gameOver = true;
           }
            this.obstacles.forEach(ob =>{
            if(ob.x + ob.width < this.x && ob.alreadyPassed === false)
            {
               this.scoreChange(1);
             ob.alreadyPassed = true;
            }
         if(this.x + this.width/2 > ob.x  && this.x + this.width/2< ob.x + ob.width)
        {


         if(this.y  < ob.y && this.y + this.height > ob.y + ob.height )
         console.log('safe');
        else{
            this.velocity = 10;
            this.gameOver = true;
        }
        
            }
            
           });
           
        }
    }
    










    
















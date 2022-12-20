
class Player {
    constructor(obstacles) {
      this.x = 30;
      this.y = 200;
      this.height = 40;
      this.width = 20;
      this.velocity = 0;
      this.score = 0;
      this.obstacles = obstacles;
      this.gameOver = false;
  
      this.trainingScore = 0;
      this.fitness = 0;
    }
  
    scoreChange(add) {
      if (!this.gameOver) {
        this.score += add;
        score.innerText = 'SCORE: ' + this.score;
      }
    }
  
    draw() {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.collision();
      this.applyGravity();

      if (!this.gameOver) {
        this.trainingScore += 1;
      }
 
    }

   
  
    applyGravity() {
      this.gravity = 0.5;
      this.velocity += this.gravity;
      this.y += this.velocity;
    }
  
    jump() {
      if (!this.gameOver) {
        this.velocity = -10;
      }
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
           this.obstacles.obs.forEach(ob =>{
           if(ob.x + ob.width < this.x && ob.alreadyPassed === false)
           {
              this.scoreChange(1);
            ob.alreadyPassed = true;
           }
        if(this.x + this.width/2 > ob.x  && this.x + this.width/2< ob.x + ob.width)
       {


        if(this.y  < ob.y || this.y + this.height > ob.y + ob.height )  
      {
           this.velocity = 10;
           this.gameOver = true;
       }
       
           }
           
          });
          
       }
      }

  class Bird
{

constructor(obstacles,bird = "player")
{
    this.brain = new NeuralNetwork(4,5,1);
    this.weights = this.brain.getWeights();
    if(bird === "player")
    this.player = new Player(obstacles);
    else
    this.player = new ME(obstacles);
    this.obstacles = obstacles;
    this.active = true;

}

draw()
{
this.player.draw();
this.play();
this.calculateFitness();
if(this.player.gameOver === true)
this.active =false;

}
calculateFitness()
   {

    this.fitness = this.player.trainingScore;
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

crossover(mate)
{
  let midPoint = Math.floor(Math.random()* this.weights.length);
let weights = [];
for(let i = 0; i < this.weights.length; i++)
{
  if(i < midPoint)
  weights.push(this.weights[i]);
  else
  weights.push(mate.weights[i]);
}

let child = new Bird(this.obstacles);
child.brain.setWeights(weights);
child.weights = weights;
//console.log(child.weights);

return child;

}
 
mutate(rate)
{ 

let child = new Bird(this.obstacles);
child.brain.setWeights(this.weights);
child.brain.mutateWeights(rate);
child.weights = child.brain.getWeights();

//console.log(child.weights);
return child;
}


}


class ME {
  constructor(obstacles) {
    this.x = 30;
    this.y = 200;
    this.height = 40;
    this.width = 20;
    this.velocity = 0;
    this.score = 0;
    this.obstacles = obstacles;
    this.gameOver = false;

    this.trainingScore = 0;
    this.fitness = 0;
  }

  scoreChange(add) {
    if (!this.gameOver) {
      this.score += add;
      score.innerText = 'SCORE: ' + this.score;
    }
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.collision();
    this.applyGravity();

    if (!this.gameOver) {
      this.trainingScore += 1;
    }

  }

 

  applyGravity() {
    this.gravity = 0.5;
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  jump() {
    if (!this.gameOver) {
      this.velocity = -10;
    }
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
         this.obstacles.obs.forEach(ob =>{
         if(ob.x + ob.width < this.x && ob.alreadyPassed === false)
         {
            this.scoreChange(1);
          ob.alreadyPassed = true;
         }
      if(this.x + this.width/2 > ob.x  && this.x + this.width/2< ob.x + ob.width)
     {


      if(this.y  > ob.y && this.y + this.height < ob.y + ob.height )
      console.log('safe');
     else{
         this.velocity = 10;
         this.gameOver = true;
     }
     
         }
         
        });
        
     }

}



/*
'[{"rows":5,"columns":4,"data":[[-0.7238704458960541,-0.14043283998009537,0.42508124859642926,0.5692761099822152],[-0.2831608900220184,-0.07884838528329086,-0.15016478027121094,-0.7867109753344756],[0.11916612907416901,0.15288806670389254,-0.41687456662897526,-0.87660960203673],[-0.7648607832899899,0.40826574486093703,-0.12149599738217942,-0.506093029831717],[0.982650207871679,-0.6984436769047293,-0.7491779371462575,0.5131146378633527]]},{"rows":1,"columns":5,"data":[[-0.6507974820144362,-0.7837608023894433,0.99200958935084,-0.0633009498046424,0.013568409380954272]]},{"rows":5,"columns":1,"data":[[0.6136801370871958],[-0.6231989224938688],[-0.9178471675056392],[0.7145197110276622],[0.22569925811428204]]},{"rows":1,"columns":1,"data":[[0.4573075471335617]]}]'*/
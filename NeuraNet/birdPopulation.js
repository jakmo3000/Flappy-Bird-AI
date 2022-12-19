
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
      this.checkCollision();
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
  
   
    checkCollision() {
      
        if (this.y < 0) {
          this.y = 0;
          this.velocity = 0;
        }
      
        if (this.y + this.height > canvas.height) {
          this.velocity = 0;
          this.y = canvas.height - this.height;
          this.gameOver = true;
        }
      
        this.obstacles.obs.forEach(obstacle => {
          if (obstacle.x + obstacle.width < this.x && !obstacle.alreadyPassed) {
            this.scoreChange(1);
            obstacle.alreadyPassed = true;
          }
          if (this.x + this.width / 2 > obstacle.x && this.x + this.width / 2 < obstacle.x + obstacle.width) {
            if (this.y < obstacle.y && this.y + this.height > obstacle.y + obstacle.height) {
              console.log('safe');
            } else {
              this.velocity = 10;
              this.gameOver = true
            } }});
        




        }

  }


  class Bird
{

constructor(obstacles)
{
    this.brain = new NeuralNetwork(4,5,1);
    this.weights = this.brain.getWeights();
    this.player = new Player(obstacles);
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







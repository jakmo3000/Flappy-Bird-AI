const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');


function obstacles()
{ 
 this.obs = [];
 this.reset = function(){
 let obs = [];
    for(let i = 0; i < 6; i ++)
 {
    obs.push(new obstacle(500 + (i*300),this.player));
 }
 this.obs = obs;
}
this.reset();

 this.posCheck = function()
 { 
    for(let i = 0; i < this.obs.length; i++)
    {
        if(this.obs[i].x <  -120)
        {
           this.obs = this.obs.slice(1,this.obs.length);
           
           this.obs.push(new obstacle(this.obs[this.obs.length-2].x + 500));
           // this.obs.shift();
        } else
        this.obs[i].move();

     
    }
   
 }
 
}

function obstacle(x)
{   this.height = 200;
    this.width = 100;
    this.y = randomInt(100,canvas.height-200);
    this.x = x;
    this.safeZoneMin = this.y -this.height/2;
    this.safeZoneMax = this.y + this.height/2;
    this.xMin =this.x - this.width;
    this.xMax = this.x + this.width;
    this.alreadyPassed = false;
  
   this.move = function()
   {
        this.x--;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,0,100,canvas.height);
        ctx.fillStyle = "rgb(0, 204, 255)";
        ctx.fillRect(this.x,this.y,this.width,this.height);
      

        
   }
   
}



let ob = new obstacles();

const population = new Population(1000,0.1);


function update()
{  ctx.fillStyle = "rgb(0, 204, 255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  
    
    ob.posCheck();
    population.update();

    requestAnimationFrame(update);
}


update();


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        agent.player.jump();
    }
    
});


function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
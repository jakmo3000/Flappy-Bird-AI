const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
let trainedWeights = [{"rows":5,"columns":4,"data":[[-0.7238704458960541,-0.14043283998009537,0.42508124859642926,0.5692761099822152],[-0.2831608900220184,-0.07884838528329086,-0.15016478027121094,-0.7867109753344756],[0.11916612907416901,0.15288806670389254,-0.41687456662897526,-0.87660960203673],[-0.7648607832899899,0.40826574486093703,-0.12149599738217942,-0.506093029831717],[0.982650207871679,-0.6984436769047293,-0.7491779371462575,0.5131146378633527]]},{"rows":1,"columns":5,"data":[[-0.6507974820144362,-0.7837608023894433,0.99200958935084,-0.0633009498046424,0.013568409380954272]]},{"rows":5,"columns":1,"data":[[0.6136801370871958],[-0.6231989224938688],[-0.9178471675056392],[0.7145197110276622],[0.22569925811428204]]},{"rows":1,"columns":1,"data":[[0.4573075471335617]]}];

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
let agent = new Bird(ob);
agent.brain.setWeights(trainedWeights);



function update()
{  ctx.fillStyle = "rgb(0, 204, 255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  
    
    ob.posCheck();
 
    agent.player.draw();
    agent.play();
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
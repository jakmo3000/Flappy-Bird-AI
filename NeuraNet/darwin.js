class Population
{

constructor(populationSize,mutationRate = 0.1)
{
this.population = [];
this.populationSize = populationSize;
this.bestElements = [];
this.mutationRate = mutationRate;

for(let i = 0; i < this.populationSize; i++)
{
    this.population.push(new Bird(ob));

}
}

update()
{

    this.population.forEach(element => {
        element.draw();
        
    });

  this.checkAlive();


}

checkAlive()
{  let allDead = true;
   for(let i = 0; i < this.population.length; i++)
   {
    if(this.population[i].active === true)
    {
      allDead = false;
    }
   }
  

   if(allDead === true)
   {
    this.nextGeneration();
   }
}



nextGeneration()
{ ob.reset();
  
  let bestIndex = 0; 
    let bestScore = -Infinity;
    for(let i = 0; i < this.population.length; i++)
    { let element = this.population[i];
        if(element.fitness > bestScore)
        {
            bestScore = element.fitness;
            bestIndex = i;
        }
    }
    this.bestElements.push(this.population[bestIndex]);


    let newGen = [];
    for(let i = 0; i < this.population.length; i++)
    {
        //let parent1 = this.roulette_selection();
       let child = this.roulette_selection();
      //  let parent2 = this.roulette_selection();
       // let child = parent1.crossover(parent2);
        child = child.mutate(this.mutationRate);
        newGen.push(child);
    }
    this.population = newGen;

}


roulette_selection() {
    // Calculate the total fitness of the population
    let totalFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      let element = this.population[i];
      totalFitness += element.fitness;
    }
  
    // Generate a random number between 0 and the total fitness
    let rand = Math.random() * totalFitness;
  
    // Select an element from the population using roulette selection
    let cumalativeFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      cumalativeFitness += this.population[i].fitness;
      if (cumalativeFitness >= rand) {
    
        return this.population[i];
      }
    }
  }
 
  
  



tournament_selection(tournamentSize)
{
let bestIndex = 0; 
let bestScore = -Infinity;
const subset = shuffle(this.population).slice(0,tournamentSize);
for(let i = 0; i < subset.length; i++)
{ let element = subset[i];
    if(element.fitness > bestScore)
    {
        bestScore = element.fitness;
        bestIndex = i;
    }
}

return subset[bestIndex];
}






}


function shuffle(array) {
    const shuffled = [...array]; // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  function scale(num, inMin, inMax, outMin, outMax)  {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
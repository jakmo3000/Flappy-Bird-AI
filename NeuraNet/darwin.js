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

normalizeFitness()
{
  this.population.forEach(element =>{
    element.fitness = Math.pow(element.fitness,2);
  });

 let sum = 0; 
 this.population.forEach(element =>{
  sum += element.fitness;
 });

 this.population.forEach(element =>{
  element.fitness /=sum;
 })
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

   if(agent.player.gameOver === false)
   allDead = false;

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
   improvement();

    let newGen = [];
    this.normalizeFitness();
    for(let i = 0; i < this.population.length; i++)
    {
       let parent1 = this.monteCarlo_selection();
      // let child = this.roulette_selection();
     let parent2 = this.tournament_selection(100);
       let child = parent1.crossover(parent2);
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
    let shuffledPopulation = this.population;
    // Select an element from the population using roulette selection
    let cumalativeFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      cumalativeFitness += shuffledPopulation[i].fitness;
      if (cumalativeFitness >= rand) {
    
        return shuffledPopulation[i];
      }
    }
  }

monteCarlo_selection()
{
  
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

    let randomElement = this.population[Math.floor(Math.random()*this.population.length)];
    let val = scale(randomElement.fitness,0,bestScore,0,1);
   
    if(Math.random() < val)
    {
      return randomElement;
    } 
    return this.monteCarlo_selection();
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

  function siftPop(arr)
  {
    arr.forEach(element =>
    {
      console.log(Math.sqrt(element.fitness));
    });
  }

  function improvement()
  {
    console.clear();
    let best = -Infinity;
    let bestIndex = 0;

    for(let i = 0; i < population.bestElements.length; i++){
      if(population.bestElements[i].player.trainingScore > best)
      {
        best = population.bestElements[i].player.trainingScore;
        bestIndex = i;
      }
    }

    console.log(`Best Score is ${best} and it occured at population.bestElements[${bestIndex}]  the fitness after being normalized is ${population.bestElements[bestIndex].fitness}`);
  console.log(population.bestElements[bestIndex]);
  bestRun(population.bestElements[bestIndex]);
  }


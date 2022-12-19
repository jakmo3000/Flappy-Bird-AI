class NeuralNetwork{

constructor(input_nodes,hidden_nodes,output_nodes)
{
this.input_nodes = input_nodes;
this.hidden_nodes = hidden_nodes;
this.output_nodes = output_nodes;

this.weights_ih = Matrix.create(hidden_nodes,input_nodes);
this.weights_ho = Matrix.create(output_nodes,hidden_nodes);

this.bias_o = Matrix.create(output_nodes,1);
this.bias_h = Matrix.create(hidden_nodes,1);


}

feedforward(input_array)
{
  let inputs = Matrix.createFromArray(input_array);
  let hidden = Matrix.multiply(this.weights_ih,inputs);
  hidden = Matrix.addMatrix(hidden,this.bias_h);
  hidden = Matrix.map(hidden,sigmoid);
 

  let output = Matrix.multiply(this.weights_ho,hidden);
  output = Matrix.addMatrix(output,this.bias_o);
  output = Matrix.map(output,sigmoid);

  return Matrix.arrayFromMatrix(output);

}

getWeights()
{

  return [this.weights_ih,this.weights_ho,this.bias_h,this.bias_o];
}

setWeights(weights)
{
this.weights_ih = weights[0];
this.weights_ho = weights[1];
this.bias_h = weights[2];
this.bias_o = weights[3];


}




mutateWeights(rate)
{
  this.weights_ho = Matrix.mutate(this.weights_ho,rate);
  this.weights_ih = Matrix.mutate(this.weights_ih,rate);
  this.bias_h = Matrix.mutate(this.bias_h,rate);
  this.bias_o = Matrix.mutate(this.bias_o,rate);
}

}






function sigmoid(x)
{
    return 1/(1+Math.exp(-x));
}


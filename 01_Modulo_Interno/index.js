const meuModulo = require('./meu_modulo');
const soma = meuModulo.soma;
const divisao = meuModulo.divisao;
const subtracao = meuModulo.subtracao;
const multiplicacao = meuModulo.multiplicacao;

let numero1, numero2;

numero1 = 10;
numero2 = 5

console.log(soma(numero1,numero2));

console.log(divisao(numero1,numero2));

console.log(subtracao(numero1,numero2));

console.log(multiplicacao(numero1,numero2));

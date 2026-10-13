// Com o document.getElementById("id") vamos buscar os id`s do que queremos mexer previamente escolhidos
// no html.
//onclick, onchange etc é dizer quando o utilizador faz algo

// Passa o rato com over e out para trocar a frase e voltar à inicial //

//Guardamos os elementos nas variáveis para não repetir o getElementById
var linha1 = document.getElementById("linha1");
var texto1 = document.getElementById("texto1");

linha1.onmouseover = function () {
    texto1.innerHTML = "Obrigado por passares aqui o rato!!"; //muda o texto
    texto1.style.color = "green";                         //muda a cor
};

linha1.onmouseout = function () {
    texto1.innerHTML = "1.Passa por aqui!!";
    texto1.style.color = "";    // tira a cor que a function tinha posto
};

// Ponto 2 de Pintar //

var texto2 = document.getElementById("texto2");

document.getElementById("btn-red").onclick = function () {
    texto2.style.color = "red";
};
document.getElementById("btn-green").onclick = function () {
    texto2.style.color = "green";
};
document.getElementById("btn-blue").onclick = function () {
    texto2.style.color = "blue";
};

// Mudar a cor da caixa //

var caixaTexto = document.getElementById("caixa-aleatoria");

// oninput significa a cada letra escrita
caixaTexto.oninput = function () {
    var r = Math.floor(Math.random() * 256);  // Math.random dá um numero entre 0 e 1;
    var g = Math.floor(Math.random() * 256);  // * 256 e Math.floor transforma-no num número inteiro
    var b = Math.floor(Math.random() * 256);  // entre 0 e 255
    caixaTexto.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
};

// Escolher a cor da lista //

var listaCores = document.getElementById("lista-cores");

listaCores.onchange = function () {      // onchange é quando o user escolhe outra opção
    document.body.style.backgroundColor = listaCores.value; //.value é o valor da opção escolhida
};


// Botão para contar //

var contagem = 0;

document.getElementById("conta").onclick = function () {
    contagem = contagem + 1;
    document.getElementById("numero").innerHTML = contagem;
};

// Direção das bolas //

var direcao = document.getElementById("direcao"); // lista (select)
var caixa = document.getElementById("caixa"); // caixa cinzenta

direcao.onchange = function () {
    caixa.style.flexDirection = direcao.value; // direcao.value é o texto da opção escolhida
};


// Nome + Idade //

document.getElementById("enviar").onclick = function () {
    var nome = document.getElementById("nome").value;
    var idade = document.getElementById("idade").value;
    document.getElementById("resultado").innerHTML =
        "Olá " + nome + ", tens " + idade + " anos."; // junta os textos
};


// Contador com -,+ e RESET //

var valor = 0;
var textoValor = document.getElementById("valor");

document.getElementById("mais").onclick = function () {
    valor = valor + 1;
    textoValor.innerHTML = valor;
};
document.getElementById("menos").onclick = function () {
    valor = valor - 1;
    textoValor.innerHTML = valor;
};
document.getElementById("reset").onclick = function () {
    valor = 0;
    textoValor.innerHTML = valor;
};


// Contador automático //

var segundos = 0;

setInterval(function () { // repete a função de x em x milissegundos
    segundos = segundos + 1;
    document.getElementById("auto").innerHTML = segundos;
}, 1000);

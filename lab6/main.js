// DECLARAÇÃO DE VARIÁVEIS
const form = document.querySelector("form");
const nodeInputNumero = document.querySelector("form input[type=number]");
const nodeInputSubmit = document.querySelector("#colecao input[type=submit]");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotal = document.querySelector("#total");
const colecao = [];

// EVENT HANDLERS

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);
  colecao.push(numero);
  colecao.sort((a, b) => a - b);
  atualizaLista(colecao, nodeUlColecao);
}

function atualizaLista(colecao, nodeUlColecao) {
  nodeUlColecao.innerHTML = "";
  colecao.forEach((numero) => {
    const li = document.createElement("li");
    li.textContent = numero;
    nodeUlColecao.appendChild(li);
  });
  nodeTotal.textContent = colecao.length;
}

// EVENT LISTENERS

form.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

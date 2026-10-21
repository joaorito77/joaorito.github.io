
// DECLARAÇÃO DE VARIÁVEIS

const form = document.querySelector("form");
const nodeInputNumero = document.querySelector("form input[type=number]");

const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotal = document.querySelector("#total");

const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#totalRepetidos");

// Recuperar dados do localStorage
const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];


// EVENT HANDLERS

function guardaCarta() {
  if (nodeInputNumero.value === "" || !nodeInputNumero.checkValidity()) {
    return;
  }

  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    atualizaLista(repetidos, nodeUlRepetidos);
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
    atualizaLista(colecao, nodeUlColecao);
  }

  guardaDados();
  nodeInputNumero.value = "";
}


// ATUALIZAR LISTAS

function atualizaLista(lista, nodeUl) {
  nodeUl.innerHTML = "";

  lista.forEach((numero, indice) => {
    const li = document.createElement("li");

    if (lista === repetidos) {
      li.innerHTML = `${numero} <button>Eliminar</button>`;

      li.querySelector("button").addEventListener("click", () => {
        repetidos.splice(indice, 1);
        atualizaLista(repetidos, nodeUlRepetidos);
        guardaDados();
      });
    } else {
      li.textContent = numero;
    }

    nodeUl.appendChild(li);
  });

  nodeTotal.textContent = colecao.length;
  nodeTotalRepetidos.textContent = repetidos.length;
}


// GUARDAR DADOS

function guardaDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}


// EVENT LISTENERS

form.addEventListener("submit", (event) => {
  event.preventDefault();
  guardaCarta();
});


// INICIALIZAR LISTAS AO ABRIR A PÁGINA

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);

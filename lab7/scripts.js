// A. Estado e variáveis com referência de elementos do DOM
const produtosSection = document.querySelector("#produtos");
const cestoSection = document.querySelector("#cesto");
const totalElemento = document.querySelector("#total");

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

// B. Funções utilitárias
function obterCesto() {
  return JSON.parse(localStorage.getItem("produtos-selecionados"));
}

function gravarCesto(lista) {
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista));
}

function adicionarProduto(produto) {
  const lista = obterCesto();
  lista.push(produto);
  gravarCesto(lista);
  atualizarCesto();
}

function removerProduto(produto) {
  const lista = obterCesto();
  const indice = lista.findIndex(function (item) {
    return item.id === produto.id;
  });
  if (indice !== -1) {
    lista.splice(indice, 1);
  }
  gravarCesto(lista);
  atualizarCesto();
}

function montarCartaoProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;

  const preco = document.createElement("p");
  preco.textContent = produto.price.toFixed(2) + " €";

  const rating = document.createElement("p");
  rating.textContent =
    "Rating: " + produto.rating.rate + " (" + produto.rating.count + ")";

  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao cesto";
  botao.addEventListener("click", function () {
    adicionarProduto(produto);
  });

  article.append(titulo, imagem, descricao, preco, rating, botao);
  return article;
}

function montarCartaoCesto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent = produto.price.toFixed(2) + " €";

  const botao = document.createElement("button");
  botao.textContent = "- Remover do cesto";
  botao.addEventListener("click", function () {
    removerProduto(produto);
  });

  article.append(titulo, imagem, preco, botao);
  return article;
}

// C. Renderização
function mostrarProdutos(produtos) {
  produtos.forEach(function (produto) {
    produtosSection.append(montarCartaoProduto(produto));
  });
}

function atualizarCesto() {
  const lista = obterCesto();

  cestoSection.replaceChildren();
  lista.forEach(function (produto) {
    cestoSection.append(montarCartaoCesto(produto));
  });

  const total = lista.reduce(function (soma, produto) {
    return soma + produto.price;
  }, 0);
  totalElemento.textContent = "Total: " + total.toFixed(2) + " €";
}

// E. Inicialização
mostrarProdutos(produtos);
atualizarCesto();

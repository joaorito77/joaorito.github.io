// A. Estado e variáveis com referência de elementos do DOM
const API = "https://deisishop.pw.deisi.ulusofona.pt";

const produtosSection = document.querySelector("#produtos");
const cestoSection = document.querySelector("#cesto");
const totalElemento = document.querySelector("#total");

const filtroCategoria = document.querySelector("#filtro_categoria");
const ordenarPreco = document.querySelector("#ordenar_preco");
const pesquisa = document.querySelector("#pesquisa");

const estudanteCheckbox = document.querySelector("#estudante");
const cupaoInput = document.querySelector("#cupao");
const comprarBotao = document.querySelector("#comprar");
const resultadoCompra = document.querySelector("#resultado_compra");

let todosProdutos = [];

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
  imagem.src = API + produto.image;
  imagem.alt = produto.title;

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;

  const preco = document.createElement("p");
  preco.textContent = Number(produto.price).toFixed(2) + " €";

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

  const imagem = document.createElement("img");
  imagem.src = API + produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent = "Custo total: " + Number(produto.price).toFixed(2) + " €";

  const botao = document.createElement("button");
  botao.textContent = "- Remover do Cesto";
  botao.addEventListener("click", function () {
    removerProduto(produto);
  });

  article.append(imagem, preco, botao);
  return article;
}

// C. Renderização
function mostrarProdutos(produtos) {
  produtosSection.replaceChildren();
  if (produtos.length === 0) {
    produtosSection.textContent = "Nenhum produto encontrado.";
    return;
  }
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
    return soma + Number(produto.price);
  }, 0);
  totalElemento.textContent = "Custo total: " + total.toFixed(2) + " €";
}

// D. Filtros, ordenação e pesquisa
function aplicarFiltros() {
  const categoria = filtroCategoria.value;
  const ordem = ordenarPreco.value;
  const texto = pesquisa.value.trim().toLowerCase();

  let resultado = todosProdutos.filter(function (produto) {
    const categoriaOk = categoria === "" || produto.category === categoria;
    const textoOk = produto.title.toLowerCase().includes(texto);
    return categoriaOk && textoOk;
  });

  if (ordem === "asc") {
    resultado.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (ordem === "desc") {
    resultado.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  mostrarProdutos(resultado);
}

filtroCategoria.addEventListener("change", aplicarFiltros);
ordenarPreco.addEventListener("change", aplicarFiltros);
pesquisa.addEventListener("input", aplicarFiltros);

// E. Pedidos à API (AJAX)
function carregarProdutos() {
  fetch(API + "/products")
    .then(function (resposta) {
      if (!resposta.ok) throw new Error("Erro " + resposta.status);
      return resposta.json();
    })
    .then(function (dados) {
      todosProdutos = dados;
      aplicarFiltros();
    })
    .catch(function (erro) {
      produtosSection.textContent =
        "Erro ao carregar produtos: " + erro.message;
    });
}

function carregarCategorias() {
  fetch(API + "/categories")
    .then(function (resposta) {
      if (!resposta.ok) throw new Error("Erro " + resposta.status);
      return resposta.json();
    })
    .then(function (categorias) {
      categorias.forEach(function (categoria) {
        const opcao = document.createElement("option");
        // CONFIRMAR: se for lista de strings, isto funciona;
        // se forem objetos, usa categoria.name
        opcao.value = categoria;
        opcao.textContent = categoria;
        filtroCategoria.append(opcao);
      });
    })
    .catch(function (erro) {
      console.error("Erro ao carregar categorias:", erro);
    });
}

function comprar() {
  const lista = obterCesto();

  if (lista.length === 0) {
    resultadoCompra.textContent = "O cesto está vazio.";
    return;
  }

  const dados = {
    products: lista.map(function (produto) {
      return produto.id;
    }),
    student: estudanteCheckbox.checked,
    coupon: cupaoInput.value.trim(),
  };

  fetch(API + "/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then(function (resposta) {
      return resposta.json().then(function (corpo) {
        if (!resposta.ok) {
          // CONFIRMAR o nome do campo de erro (error / message)
          throw new Error(
            corpo.error || corpo.message || "Erro " + resposta.status,
          );
        }
        return corpo;
      });
    })
    .then(function (resposta) {
      // CONFIRMAR nomes: totalCost e reference
      resultadoCompra.textContent =
        "Total a pagar: " +
        Number(resposta.totalCost).toFixed(2) +
        " € | " +
        "Referência de pagamento: " +
        resposta.reference;
    })
    .catch(function (erro) {
      resultadoCompra.textContent = "Não foi possível comprar: " + erro.message;
    });
}

comprarBotao.addEventListener("click", comprar);

// F. Inicialização
carregarCategorias();
carregarProdutos();
atualizarCesto();

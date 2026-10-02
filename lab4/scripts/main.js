window.onload = function() {
  console.log("O JS carregou com sucesso a partir da pasta scripts/! 🎉");

  const itemLinha1 = document.querySelector('ul li:nth-of-type(1)');
  const textoLinha1 = itemLinha1.querySelector('.texto');
  const textoOriginal = "1.Passa por aqui!!";

  if (itemLinha1 && textoLinha1) {
    itemLinha1.addEventListener('mouseover', function() {
      textoLinha1.textContent = "Uau! O rato passou por aqui! 🎉";
      textoLinha1.style.color = "#e67e22";
      textoLinha1.style.fontWeight = "bold";
    });

    itemLinha1.addEventListener('mouseout', function() {
      textoLinha1.textContent = textoOriginal;
      textoLinha1.style.color = "";
      textoLinha1.style.fontWeight = "";
    });
  }

  const textoPintame = document.querySelector('ul li:nth-of-type(2) .texto-item');
  const btnRed = document.querySelector('.red');
  const btnGreen = document.querySelector('.green');
  const btnBlue = document.querySelector('.blue');

  if (textoPintame && btnRed && btnGreen && btnBlue) {
    btnRed.addEventListener('click', function() {
      textoPintame.style.color = 'red';
      textoPintame.textContent = "2.Pinta-me! (Vermelho)";
    });

    btnGreen.addEventListener('click', function() {
      textoPintame.style.color = 'green';
      textoPintame.textContent = "2.Pinta-me! (Verde)";
    });

    btnBlue.addEventListener('click', function() {
      textoPintame.style.color = 'blue';
      textoPintame.textContent = "2.Pinta-me! (Azul)";
    });
  }

  const botaoConta = document.getElementById('conta');
  const elementoNumero = document.getElementById('numero');
  let contagem = 0;

  if (botaoConta && elementoNumero) {
    botaoConta.addEventListener('click', function() {
      contagem++;
      elementoNumero.textContent = contagem;

      if (contagem % 2 === 0) {
        elementoNumero.style.color = '#2ecc71';
      } else {
        elementoNumero.style.color = '#9b59b6';
      }
    });
  }

  const botaoSubmeter = document.getElementById('submeter');
  const caixaSubmeter = document.getElementById('caixa-submeter');
  const oHeader = document.getElementById('cabecalho-site');
  const oFooter = document.querySelector('footer');

  if (botaoSubmeter && caixaSubmeter) {
    botaoSubmeter.addEventListener('click', function() {
      const corInserida = caixaSubmeter.value.trim();
      if (corInserida !== "") {
        document.body.style.backgroundColor = corInserida;

        // Remove as cores fixas para o fundo do body se ver em todo o lado
        if (oHeader) oHeader.style.backgroundColor = "transparent";
        if (oFooter) oFooter.style.backgroundColor = "transparent";
      }
    });
  }

  const cabecalho = document.getElementById('cabecalho-site');

  if (cabecalho) {
    cabecalho.addEventListener('mousemove', function(evento) {
      const x = evento.offsetX;
      const tomCor = x % 255;
      cabecalho.style.backgroundColor = `rgb(${tomCor}, 235, 235)`;
      cabecalho.textContent = `Página Artilhada (Rato em X: ${x}px)`;
    });
  }

  const caixaAleatoria = document.getElementById('caixa-aleatoria');

  if (caixaAleatoria) {
    caixaAleatoria.addEventListener('input', function() {
      const caracteresHex = '0123456789ABCDEF';
      let corGerada = '#';
      for (let i = 0; i < 6; i++) {
        corGerada += caracteresHex[Math.floor(Math.random() * 16)];
      }
      this.style.backgroundColor = corGerada;
    });
  }
};

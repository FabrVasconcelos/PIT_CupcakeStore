let carrinho = [];
const precos = {
  chocolate: 10.00,
  limao: 8.00,
  especial: 12.00
};

function adicionarAoCarrinho(item) {
  carrinho.push(item);
  exibirCarrinho();
}

function adicionarQuantidade(index) {
    carrinho.push(carrinho[index]);
    exibirCarrinho();
  }
  
  function diminuirQuantidade(item) {
    const index = carrinho.indexOf(item);
    carrinho.splice(index, 1);
    exibirCarrinho();
  }
  
function exibirCarrinho() {
    const listaCarrinho = document.getElementById('carrinho-lista');
    const totalValor = document.getElementById('total-valor');
  
    const carrinhoUnico = [...new Set(carrinho)];
    listaCarrinho.innerHTML = '';
    let total = 0;
  
    carrinhoUnico.forEach(item => {
      const quantidade = carrinho.filter(c => c === item).length;
      const li = document.createElement('li');
  
      li.textContent = `Cupcake de ${item} (Quantidade: ${quantidade}) - R$ ${(quantidade * precos[item]).toFixed(2)}`;
  
      const botaoAdicionar = document.createElement('button');
      botaoAdicionar.textContent = '+';
      botaoAdicionar.onclick = function() {
        adicionarAoCarrinho(item);
      };
  
      const botaoDiminuir = document.createElement('button');
      botaoDiminuir.textContent = '-';
      botaoDiminuir.onclick = function() {
        diminuirQuantidade(item);
      };
  
      li.appendChild(botaoAdicionar);
      li.appendChild(botaoDiminuir);
      listaCarrinho.appendChild(li);
      total += quantidade * precos[item];
    });
  
    totalValor.textContent = total.toFixed(2);
  }
  
    listaCarrinho.innerHTML = '';
    let total = 0;
  
    carrinho.forEach((item, index) => {
      const li = document.createElement('li');
      const quantidade = carrinho.filter(c => c === item).length;
  
      li.textContent = `Cupcake de ${item} (Quantidade: ${quantidade}) - R$ ${precos[item].toFixed(2)}`;
  
      const botaoAdicionar = document.createElement('button');
      botaoAdicionar.textContent = '+';
      botaoAdicionar.onclick = function() {
        adicionarQuantidade(index);
      };
  
      const botaoDiminuir = document.createElement('button');
      botaoDiminuir.textContent = '-';
      botaoDiminuir.onclick = function() {
        diminuirQuantidade(index);
      };
  
      li.appendChild(botaoAdicionar);
      li.appendChild(botaoDiminuir);
      listaCarrinho.appendChild(li);
      total += precos[item];
    });
  
    totalValor.textContent = total.toFixed(2);

function limparCarrinho() {
    carrinho = [];
    exibirCarrinho();
  }

  function finalizarPedido() {
    const totalValor = document.getElementById('total-valor');
    const valorTotal = parseFloat(totalValor.textContent);
  
    if (carrinho.length === 0) {
        alert('A cesta está vazia. Adicione itens antes de finalizar o pedido.');
        return; 
      }

    const listaCarrinho = carrinho.reduce((acc, item) => {
    if (!acc[item]) {
        acc[item] = 1;
      } else {
        acc[item]++;
      }
      return acc;
    }, {});
  
    let resumo = 'Resumo da Compra:\n';
  
    for (const item in listaCarrinho) {
      resumo += `- ${listaCarrinho[item]}x ${item} - R$ ${(listaCarrinho[item] * precos[item]).toFixed(2)}\n`;
    }
  
    resumo += `\nValor Total: R$ ${valorTotal.toFixed(2)}\n\nPedido finalizado! Obrigado pela compra!`;
  
    alert(resumo);
  
    carrinho = [];
    exibirCarrinho();
  }
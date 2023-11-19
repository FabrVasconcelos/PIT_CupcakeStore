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

    const botaoAdicionar = criarBotao('+', () => adicionarAoCarrinho(item));
    const botaoDiminuir = criarBotao('-', () => diminuirQuantidade(item));

    li.appendChild(botaoAdicionar);
    li.appendChild(botaoDiminuir);
    listaCarrinho.appendChild(li);
    total += quantidade * precos[item];
  });

  totalValor.textContent = total.toFixed(2);
}

function criarBotao(texto, onClick) {
  const botao = document.createElement('button');
  botao.textContent = texto;
  botao.onclick = onClick;
  return botao;
}

function limparCarrinho() {
  carrinho = [];
  exibirCarrinho();
}

function finalizarPedido() {
  const nomeCliente = document.getElementById('nomeCliente').value;
  const telefoneCliente = document.getElementById('telefoneCliente').value;
  const observacao = document.getElementById('observacao').value;
  const opcaoEntrega = document.querySelector('input[name="opcaoEntrega"]:checked').value;

  if (nomeCliente.trim() === '' || telefoneCliente.trim() === '') {
    alert('Por favor, preencha o nome e o telefone antes de finalizar o pedido.');
    return;
  }

  if (carrinho.length === 0) {
    alert('A cesta está vazia. Adicione itens antes de finalizar o pedido.');
    return;
  }

  let resumo = `Resumo da Compra:\nCliente: ${nomeCliente}\nTelefone: ${telefoneCliente}\nObservação: ${observacao}\n`;

  if (opcaoEntrega === 'loja') {
    resumo += 'Entrega: Retirada em Loja\n';
  } else {
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;
    const complemento = document.getElementById('complemento').value;

    if (endereco.trim() === '' || numero.trim() === '' || cep.trim() === '' || cidade.trim() === '' || uf.trim() === '') {
      alert('Por favor, preencha os dados de entrega antes de finalizar o pedido.');
      return;
    }


    resumo += `Entrega:\nEndereço: ${endereco}, ${numero}\nCEP: ${cep}\nCidade: ${cidade}\nUF: ${uf}\nComplemento: ${complemento}\n`;
  }

  const totalValor = document.getElementById('total-valor');
  const valorTotal = parseFloat(totalValor.textContent);

  const listaCarrinho = carrinho.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  for (const item in listaCarrinho) {
    resumo += `- ${listaCarrinho[item]}x ${item} - R$ ${(listaCarrinho[item] * precos[item]).toFixed(2)}\n`;
  }

  resumo += `\nValor Total: R$ ${valorTotal.toFixed(2)}\n\nPedido finalizado! Obrigado pela compra!`;

  alert(resumo);

  window.location.href = 'obrigado';

  carrinho = [];
  exibirCarrinho();
}

function verificarEntrega() {
  const opcaoEntrega = document.querySelector('input[name="opcaoEntrega"]:checked').value;
  const dadosEntrega = document.getElementById('dadosEntrega');

  dadosEntrega.style.display = opcaoEntrega === 'loja' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  verificarEntrega();
  document.querySelectorAll('input[name="opcaoEntrega"]').forEach(function(el) {
    el.addEventListener('change', verificarEntrega);
  });
});

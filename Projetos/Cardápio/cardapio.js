import { entradas } from './Produtos/entradas.js';
import { saladas } from './Produtos/saladas.js';
import { bebidas } from './Produtos/bebidas.js';
import { principais } from './Produtos/principais.js';
import { veganos } from './Produtos/veganos.js';
import { combos } from './Produtos/combos.js';
import { sobremesas } from './Produtos/sobremesas.js';

// Função que transforma "R$ 25,00" → 25.00
function formatarPreco(precoString) {
  return parseFloat(precoString.replace("R$", "").replace(",", ".").trim());
}

// Função para exibir os produtos de uma categoria
function exibirProdutos(categoria) {
  let produtos = [];

  // A lógica de atribuição das categorias foi corrigida
  if (categoria === 'entradas') {
    produtos = entradas;
  } else if (categoria === 'saladas') {
    produtos = saladas;
  } else if (categoria === 'bebidas') {
    produtos = bebidas;
  } else if (categoria === 'principais') {
    produtos = principais;
  } else if (categoria === 'veganos') {
    produtos = veganos;
  } else if (categoria === 'combos') {
    produtos = combos;
  } else if (categoria === 'sobremesas') {
    produtos = sobremesas;
  }

  // Agora, a variável "produtos" contém apenas os produtos da categoria selecionada
  const container = document.getElementById("produtos");
  container.innerHTML = ''; // Limpa os produtos anteriores

  if (produtos.length === 0) {
    container.innerHTML = '<p>Nenhum produto encontrado para esta categoria.</p>';
  }

  produtos.forEach(produto => {
    const divProduto = document.createElement("div");
    divProduto.classList.add("produto");

    divProduto.innerHTML = `
      <img src="${produto.imagemCardapio}" alt="${produto.nome}";" />
      <h3>${produto.nome}</h3>

      <p>
        <a href="Detalhes/detalhes.html?codigo=${produto.codigo}">
          Aperte para mais informações sobre o produto
        </a>
      </p>

      <p><strong>Preço:</strong> ${produto.preco}</p>

      <div class="linha-carrinho">
        <button onclick="adicionarAoCarrinho('${produto.codigo}', document.getElementById('quantidade-${produto.codigo}').value)">
          Adicionar ao Carrinho
        </button>
        <input type="number" id="quantidade-${produto.codigo}" name="quantidade" value="1" min="1" />
      </div>
    `;

    container.appendChild(divProduto);

    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });

  });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(codigo, quantidade) {
  const todosProdutos = [...entradas, ...saladas, ...bebidas, ...principais, ...veganos, ...combos, ...sobremesas];
  const produto = todosProdutos.find(p => p.codigo === codigo);

  if (produto) {
    const precoUnitario = formatarPreco(produto.preco);
    const total = precoUnitario * parseInt(quantidade);

    console.log(`Produto: ${produto.nome}`);
    console.log(`Preço unitário: R$ ${precoUnitario.toFixed(2)}`);
    console.log(`Quantidade: ${quantidade}`);
    console.log(`Total: R$ ${total.toFixed(2)}`);

    // Adicionar ao carrinho no localStorage
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemCarrinho = { codigo: produto.codigo, nome: produto.nome, quantidade, precoUnitario, total };
    carrinho.push(itemCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  } else {
    console.log("Produto não encontrado.");
  }
}

// Carrega a categoria 'principais' por padrão ao iniciar
window.onload = () => exibirProdutos('principais');

window.exibirProdutos = exibirProdutos;

window.adicionarAoCarrinho = adicionarAoCarrinho;


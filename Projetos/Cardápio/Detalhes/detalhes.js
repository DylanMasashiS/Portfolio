import { entradas } from '../Produtos/entradas.js';
import { saladas } from '../Produtos/saladas.js';
import { bebidas } from '../Produtos/bebidas.js';
import { principais } from '../Produtos/principais.js';
import { veganos } from '../Produtos/veganos.js';
import { combos } from '../Produtos/combos.js';
import { sobremesas } from '../Produtos/sobremesas.js';

const todosProdutos = [
  ...entradas,
  ...saladas,
  ...bebidas,
  ...principais,
  ...veganos,
  ...combos,
  ...sobremesas,
];

// Função para obter o código do produto da URL
function obterCodigoDaUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("codigo");
}

// Função para exibir os detalhes do produto
function exibirDetalhesProduto() {
  const codigo = obterCodigoDaUrl();
  const produto = todosProdutos.find(p => p.codigo === codigo);

  console.log(produto); // Debug

  const container = document.getElementById("detalhes-produto");

  if (!produto) {
    container.innerHTML = `<p>Produto não encontrado.</p>`;
    return;
  }

  // Formata o preço corretamente
  const preco = parseFloat(produto.preco.replace("R$", "").trim());
  const precoFormatado = preco ? preco.toFixed(2).replace(".", ",") : "0,00";

  // Exibe os detalhes com estrutura HTML e classes CSS
  container.innerHTML = `
    <img id="imagem-produto" src="${produto.imagemDetalhes}" alt="${produto.nome}" />
    <h2>${produto.nome}</h2>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
    <p><strong>Preço:</strong> R$ ${precoFormatado}</p>
    <p><strong>Ingredientes:</strong> ${produto.ingredientes}</p>
    <p><strong>Alergias:</strong> ${produto.alergias}</p>
    <p><strong>Calorias:</strong> ${produto.calorias}</p>
    <p><strong>Vegano:</strong> ${produto.vegano ? "Sim" : "Não"}</p>
    <div class="buttons">
      <button onclick="window.history.back()">Voltar</button>
      <button onclick="alert('Adicionado ao carrinho!')">Comprar</button>
    </div>
  `;

  // Muda o background com base na cor da imagem
  const imagem = document.getElementById("imagem-produto");
  imagem.crossOrigin = "Anonymous"; // Precisa disso se a imagem vier de outro domínio

  imagem.onload = () => {
    const colorThief = new ColorThief();
    const cor = colorThief.getColor(imagem); // Retorna [r, g, b]
    
    // Aplica cor de fundo com suavidade
    document.body.style.backgroundColor = `rgb(${cor[0]}, ${cor[1]}, ${cor[2]})`;
  };
}

// Executa ao carregar a página
window.onload = exibirDetalhesProduto;

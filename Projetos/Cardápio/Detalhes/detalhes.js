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

  // Verifica o produto no console para debug
  console.log(produto); // Coloquei isso para ajudar a depurar

  const container = document.getElementById("detalhes-produto");

  if (!produto) {
    container.innerHTML = `<p>Produto não encontrado.</p>`;
    return;
  }

// Lógica para garantir que o preço seja exibido corretamente com vírgula
const preco = parseFloat(produto.preco.replace("R$", "").trim()); // Remover "R$" e espaço
const precoFormatado = preco ? preco.toFixed(2).replace(".", ",") : "0,00"; // Troca o ponto por vírgula

  // Exibe as informações do produto
  container.innerHTML = `
    <img src="${produto.imagemDetalhes}" alt="${produto.nome}" />
    <h2>${produto.nome}</h2>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
    <p><strong>Preço:</strong> R$ ${precoFormatado}</p> <!-- Preço formatado -->
    <p><strong>Ingredientes:</strong> ${produto.ingredientes}</p>
    <p><strong>Alergias:</strong> ${produto.alergias}</p>
    <p><strong>Calorias:</strong> ${produto.calorias}</p>
    <p><strong>Vegano:</strong> ${produto.vegano ? "Sim" : "Não"}</p>
    <button onclick="window.history.back()">Voltar</button>
  `;
}

// Chama a função ao carregar a página
window.onload = exibirDetalhesProduto;

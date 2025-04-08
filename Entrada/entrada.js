// Lista de mensagens
const messages = [
    "Bem Vindo Visitante.",
    "Meu nome é Dylan e sou desenvolvedor Full Stack.",
    "Atualmente desenvolvo em Java, Javascript, NodeJS, NextJS, MySQL, Delphi e C.",
    "Sinta-se à vontade! Agora mostrarei meu portfólio a você."
];

// Variáveis
let currentIndex = 0;
const messageElement = document.getElementById("message");
const playButton = document.getElementById("play-button");
const backButton = document.getElementById("back-button");

let isTyping = false;
let typingIndex = 0;
let typingMessage = '';
let typingSpeed = 50; // Velocidade padrão: 50ms entre letras
let typingFast = false; // Quando clicado de novo, ativa modo rápido

// Função para digitar a mensagem
function typeMessage(message, callback) {
    typingMessage = message;
    typingIndex = 0;
    messageElement.innerHTML = '';
    isTyping = true;
    typingFast = false;

    function type() {
        if (typingIndex < typingMessage.length) {
            messageElement.innerHTML += typingMessage[typingIndex];
            typingIndex++;

            // Se o usuário clicou de novo: mostra rápido
            const delay = typingFast ? 0 : typingSpeed;
            setTimeout(type, delay);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }

    type(); // Inicia a digitação
}

// Função para mostrar ou esconder o botão de voltar
function atualizarBotaoVoltar() {
    if (currentIndex === 0) {
        backButton.style.display = "none";
    } else {
        backButton.style.display = "inline-block";
    }
}

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    typeMessage(messages[currentIndex]);
    atualizarBotaoVoltar();
});

// Botão de avançar
playButton.addEventListener("click", () => {
    if (isTyping) {
        typingFast = true; // Ao clicar durante digitação, acelera
        return;
    }

    currentIndex++;
    if (currentIndex >= messages.length) {
        currentIndex = 0;
        window.location.href = "../Principal/principal.html";
        return;
    }

    typeMessage(messages[currentIndex], () => {
        isTyping = false;
    });

    atualizarBotaoVoltar();
});

// Botão de voltar
backButton.addEventListener("click", () => {
    if (isTyping) {
        typingFast = true;
        return;
    }

    currentIndex--;
    if (currentIndex < 0) currentIndex = 0;

    typeMessage(messages[currentIndex], () => {
        isTyping = false;
    });

    atualizarBotaoVoltar();
});

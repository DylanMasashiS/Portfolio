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
let isTyping = false; // Para controlar se a mensagem está sendo digitada
let typingIndex = 0; // Controle do índice da letra para digitação
let typingMessage = ''; // Mensagem atual que está sendo digitada

// Função para digitar a mensagem com requestAnimationFrame
function typeMessage(message, callback) {
    typingMessage = message; // Mensagem a ser digitada
    typingIndex = 0; // Reseta o índice
    messageElement.innerHTML = ''; // Limpa a mensagem exibida

    function type() {
        if (typingIndex < typingMessage.length) {
            messageElement.innerHTML += typingMessage[typingIndex];
            typingIndex++;
            requestAnimationFrame(type); // Chama novamente no próximo quadro
        } else {
            if (callback) callback(); // Executa a função de callback, se houver
        }
    }

    requestAnimationFrame(type); // Inicia a digitação
}

// Exibe a primeira mensagem ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    typeMessage(messages[currentIndex]);
});

// Evento de clique no botão
playButton.addEventListener("click", () => {
    if (isTyping) {
        // Se a mensagem ainda estiver sendo digitada, exibe toda a mensagem imediatamente
        messageElement.innerHTML = messages[currentIndex];
        isTyping = false;
    } else {
        // Caso a digitação tenha terminado, avança para a próxima mensagem
        currentIndex++;
        if (currentIndex >= messages.length) {
            currentIndex = 0; // Se passar do final, volta para o início
            window.location.href = "../Principal/principal.html"; // Redireciona para a página principal
            return;
        }

        // Inicia a digitação da nova mensagem
        isTyping = true;
        typeMessage(messages[currentIndex], () => {
            isTyping = false; // Marca que a digitação terminou
        });
    }
});

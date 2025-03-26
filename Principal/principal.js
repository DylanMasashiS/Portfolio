document.addEventListener("DOMContentLoaded", () => {

    // Ao clicar no botão, rolar suavemente para o topo
    scrollTopButton.addEventListener("click", (event) => {
        event.preventDefault();  // Impede o comportamento padrão de navegação do link
        window.scrollTo({ top: 0, behavior: "smooth" });  // Rola suavemente para o topo
    });
});


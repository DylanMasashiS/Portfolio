// script.js
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopButton = document.createElement("button");
    scrollTopButton.textContent = "⬆️ Topo";
    scrollTopButton.style.position = "fixed";
    scrollTopButton.style.bottom = "20px";
    scrollTopButton.style.right = "20px";
    scrollTopButton.style.display = "none";

    document.body.appendChild(scrollTopButton);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    });

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

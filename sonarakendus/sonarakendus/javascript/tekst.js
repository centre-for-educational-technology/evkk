let pealkiri = document.querySelector("#pealkiri");
let sisu = document.querySelector("#sisu");

pealkiri.innerHTML = localStorage.getItem("tekstipealkiri");
sisu.innerHTML = localStorage.getItem("kuvatavtekst").replace(/\\n/g, '<br>');

function sulge() {
    window.close();
}
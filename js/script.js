document.addEventListener('DOMContentLoaded', () => {
    // Lógica da Surpresa
    const botaoSurpresa = document.getElementById('botao-surpresa');
    const divSurpresa = document.getElementById('surpresa');
    if (botaoSurpresa && divSurpresa) {
        botaoSurpresa.addEventListener('click', () => {
            divSurpresa.classList.remove('hidden');
            botaoSurpresa.style.display = 'none';
        });
    }

    // Lógica da Contagem de Tempo
    const dataInicio = new Date('2014-12-27T16:00:00');
    const tempoJuntosElement = document.getElementById('tempo-juntos');
    function atualizarContagem() {
        if (!tempoJuntosElement) return;
        const agora = new Date();
        const diferenca = agora.getTime() - dataInicio.getTime();
        const segundos = Math.floor(diferenca / 1000) % 60;
        const minutos = Math.floor(diferenca / (1000 * 60)) % 60;
        const horas = Math.floor(diferenca / (1000 * 60 * 60)) % 24;
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24)) % 365;
        const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
        tempoJuntosElement.textContent = `${anos} anos, ${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
    }
    if (tempoJuntosElement) {
        setInterval(atualizarContagem, 1000);
    }

    // Lógica do Carrossel
    const carousel = document.querySelector('.carousel');
    if(carousel) {
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const images = document.querySelectorAll('.carousel img');
        if (images.length > 0) { // Garante que só executa se houver imagens
            let currentIndex = 0;
            function updateCarousel() { carousel.style.transform = `translateX(-${currentIndex * 100}%)`; }
            
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            });
        }
    }
});
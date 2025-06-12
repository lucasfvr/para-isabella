/* ======================================================= */
/* === JOGO-SCRIPT.JS - VERSÃO FINAL, LIMPA E CORRIGIDA === */
/* ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // Lembre-se de confirmar que os nomes destes 8 arquivos correspondem
    // exatamente aos arquivos na sua pasta 'imagem'.
    const nomesDasImagens = [
        '../imagem/IMG_20141230_195438673.jpg',
        '../imagem/IMG_20150112_181054556_HDR.jpg',
        '../imagem/IMG_20151120_172228726.jpg',
        '../imagem/IMG_20210612_211413.jpg',
        '../imagem/IMG_20220717_112414.jpg',
        '../imagem/IMG_20220723_173617.jpg',
        '../imagem/IMG_20230109_175012.jpg',
        '../imagem/SAM_2403.JPG'
    ];

    const tabuleiro = document.getElementById('tabuleiro');
    const contadorJogadasEl = document.getElementById('contador-jogadas');
    const contadorAcertosEl = document.getElementById('contador-acertos');
    const botaoReiniciar = document.getElementById('botao-reiniciar');
    const popupVitoria = document.getElementById('popup-vitoria');
    const botaoJogarNovamente = document.getElementById('botao-jogar-novamente');

    let cartoes = [...nomesDasImagens, ...nomesDasImagens];
    let primeiroCartao, segundoCartao;
    let tabuleiroBloqueado = false;
    let jogadas = 0;
    let acertos = 0;

    function criarTabuleiro() {
        jogadas = 0;
        acertos = 0;
        contadorJogadasEl.textContent = jogadas;
        contadorAcertosEl.textContent = acertos;
        if (popupVitoria) popupVitoria.style.display = 'none';
        
        tabuleiro.innerHTML = '';
        cartoes.sort(() => 0.5 - Math.random());

        cartoes.forEach(nomeImagem => {
            const cartao = document.createElement('div');
            cartao.classList.add('cartao');
            cartao.dataset.imagem = nomeImagem;
            cartao.innerHTML = `
                <div class="cartao-face cartao-frente"><img src="${nomeImagem}" alt="Foto do casal"></div>
                <div class="cartao-face cartao-costas">❤️</div>
            `;
            cartao.addEventListener('click', virarCartao);
            tabuleiro.appendChild(cartao);
        });
    }

    function virarCartao() {
        if (tabuleiroBloqueado || this.classList.contains('virado')) return;
        this.classList.add('virado');
        if (!primeiroCartao) {
            primeiroCartao = this;
            return;
        }
        segundoCartao = this;
        tabuleiroBloqueado = true;
        jogadas++;
        contadorJogadasEl.textContent = jogadas;
        verificarPar();
    }

    function verificarPar() {
        const ehPar = primeiroCartao.dataset.imagem === segundoCartao.dataset.imagem;
        ehPar ? desativarCartoes() : desvirarCartoes();
    }

    function desativarCartoes() {
        primeiroCartao.removeEventListener('click', virarCartao);
        segundoCartao.removeEventListener('click', virarCartao);
        acertos++;
        contadorAcertosEl.textContent = acertos;
        resetarJogada();
        if (acertos === 8) {
            setTimeout(() => {
                if(popupVitoria) popupVitoria.style.display = 'flex';
            }, 700);
        }
    }

    function desvirarCartoes() {
        setTimeout(() => {
            primeiroCartao.classList.remove('virado');
            segundoCartao.classList.remove('virado');
            resetarJogada();
        }, 1200);
    }

    function resetarJogada() {
        [primeiroCartao, segundoCartao] = [null, null];
        tabuleiroBloqueado = false;
    }

    if(botaoReiniciar) botaoReiniciar.addEventListener('click', criarTabuleiro);
    if(botaoJogarNovamente) botaoJogarNovamente.addEventListener('click', criarTabuleiro);

    if(tabuleiro) {
        criarTabuleiro();
    }
});
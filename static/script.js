const tabuleiro = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function renderizarTabuleiro() {
    const tabuleiroDiv = document.getElementById('tabuleiro');
    tabuleiroDiv.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const celulaDiv = document.createElement('div');
            celulaDiv.className = 'celula';
            celulaDiv.textContent = tabuleiro[i][j];
            celulaDiv.addEventListener('click', () => fazerJogada(i, j));
            tabuleiroDiv.appendChild(celulaDiv);
        }
    }
}

function fazerJogada(i, j) {
    if (tabuleiro[i][j] === ' ') {
        tabuleiro[i][j] = 'x';
        atualizarJogo();
    }
}

function atualizarJogo() {
    fetch('https://arvore-de-jogos.vercel.app/melhor-jogada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tabuleiro: tabuleiro })
    })
    .then(response => response.json())
    .then(data => {
        alert(`A melhor jogada tem a qualidade: ${data.melhor_jogada}`);
        renderizarTabuleiro();
    })
    .catch(error => console.error('Erro:', error));
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tabuleiro[i][j] = ' ';
        }
    }
    renderizarTabuleiro();
}

renderizarTabuleiro();

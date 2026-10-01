if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW ativo:', reg))
      .catch(err => console.log('Erro SW:', err));
  });
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const btnInstalar = document.getElementById('btnInstalar');
const instrucoesIos = document.getElementById('instrucoesIos');

let promptInstalacao = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptInstalacao = e;
});

if (isIOS) {
  if (btnInstalar) btnInstalar.style.display = 'none';
  if (instrucoesIos) instrucoesIos.style.display = 'block';
} else {
  if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
      if (promptInstalacao) {
        promptInstalacao.prompt();
        const { outcome } = await promptInstalacao.userChoice;
        console.log(`Resultado: ${outcome}`);
        promptInstalacao = null;
      } else {
        alert('Para instalar o aplicativo:\n\n1. Toque nos 3 pontos (⋮) do seu navegador.\n2. Escolha "Adicionar à tela inicial" ou "Instalar aplicativo".');
      }
    });
  }
}

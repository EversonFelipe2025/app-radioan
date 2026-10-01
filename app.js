if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Erro no Service Worker:', err));
  });
}

let promptInstalacao;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptInstalacao = e;
});

if (btnInstalar) {
  btnInstalar.addEventListener('click', async () => {
    if (promptInstalacao) {
      promptInstalacao.prompt();
      const { outcome } = await promptInstalacao.userChoice;
      console.log(`Resultado do clique: ${outcome}`);
      promptInstalacao = null;
    } else {
      alert('Para instalar:\n1. Toque nos 3 pontinhos do seu navegador (⋮).\n2. Selecione "Adicionar à tela inicial" ou "Instalar aplicativo".');
    }
  });
}

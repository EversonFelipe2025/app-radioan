// Registra o Service Worker apontando para o caminho correto do repositório
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/app-radioan/sw.js')
      .then(registration => {
        console.log('Service Worker registrado:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar Service Worker:', error);
      });
  });
}

// Captura a instalação automática do PWA
let deferredPrompt;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (btnInstalar) {
    btnInstalar.style.display = 'block';
  }
});

if (btnInstalar) {
  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Resultado: ${outcome}`);
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });
}

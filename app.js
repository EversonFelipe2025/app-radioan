// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/app-radioan/sw.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}

// Lógica do Botão de Instalação PWA
let deferredPrompt;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
  // Impede o prompt automático padrão do navegador
  e.preventDefault();
  // Guarda o evento para ser ativado no clique do botão
  deferredPrompt = e;
  // Exibe o botão de instalar na tela
  if (btnInstalar) {
    btnInstalar.style.display = 'inline-block';
  }
});

if (btnInstalar) {
  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    // Mostra o prompt de instalação nativo
    deferredPrompt.prompt();
    // Aguarda a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Escolha do usuário: ${outcome}`);
    // Limpa o evento e esconde o botão
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });
}

window.addEventListener('appinstalled', () => {
  console.log('Aplicativo instalado com sucesso!');
  if (btnInstalar) {
    btnInstalar.style.display = 'none';
  }
});

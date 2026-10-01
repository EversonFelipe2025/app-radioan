// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Erro no SW:', err));
  });
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const btnInstalar = document.getElementById('btnInstalar');
const instrucoesIos = document.getElementById('instrucoesIos');

let promptInstalacao = null;

// Escuta o evento nativo de instalação do Chrome/Android/Brave
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptInstalacao = e;
});

if (isIOS) {
  // Se for Safari/iPhone, esconde o botão e mostra as instruções da Apple
  if (btnInstalar) btnInstalar.style.display = 'none';
  if (instrucoesIos) instrucoesIos.style.display = 'block';
} else {
  // Para Android/PC, o botão fica sempre visível
  if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
      if (promptInstalacao) {
        promptInstalacao.prompt();
        const { outcome } = await promptInstalacao.userChoice;
        console.log(`Resultado do clique: ${outcome}`);
        promptInstalacao = null;
      } else {
        // Se o evento automático ainda não tiver disparado, orienta o usuário
        alert('Para instalar o App:\n\n1. Toque nos 3 pontos (⋮) no canto do navegador.\n2. Escolha "Adicionar à tela inicial" ou "Instalar aplicativo".');
      }
    });
  }
}

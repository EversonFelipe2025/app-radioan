// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Erro no SW:', err));
  });
}

// Identifica se o usuário está acessando pelo iPhone/iPad (Safari)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const btnInstalar = document.getElementById('btnInstalar');
const instrucoesIos = document.getElementById('instrucoesIos');

if (isIOS) {
  // Se for Safari/iOS, esconde o botão padrão e mostra o passo a passo do Safari
  if (btnInstalar) btnInstalar.style.display = 'none';
  if (instrucoesIos) instrucoesIos.style.display = 'block';
} else {
  // Se for Android / Chrome / PC, ativa o botão normal de instalação
  let promptInstalacao;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    promptInstalacao = e;
    if (btnInstalar) btnInstalar.style.display = 'block';
  });

  if (btnInstalar) {
    btnInstalar.style.display = 'block'; // Fica visível para o usuário clicar
    btnInstalar.addEventListener('click', async () => {
      if (promptInstalacao) {
        promptInstalacao.prompt();
        const { outcome } = await promptInstalacao.userChoice;
        console.log(`Resultado: ${outcome}`);
        promptInstalacao = null;
      } else {
        alert('Para instalar:\nToque nos 3 pontos (⋮) do seu navegador e escolha "Adicionar à tela inicial".');
      }
    });
  }
}

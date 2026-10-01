self.addEventListener('install', (event) => {
  console.log('Service Worker instalado.');
});

self.addEventListener('fetch', (event) => {
  // Aqui você adicionaria lógica de cache para funcionar offline.
  // Por enquanto, apenas deixamos o navegador lidar com os pedidos.
});
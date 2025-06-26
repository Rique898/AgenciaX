window.onload = function () {
  // Controle do banner de cookies
  const banner = document.getElementById('cookieBanner');
  if (!localStorage.getItem('cookieAccepted')) {
    banner.style.display = 'flex';
  }

  // Controle das linhas animadas em sequência
  const lines = document.querySelectorAll('.line');
  let current = 0;

  function animateLine(index) {
    if (index >= lines.length) {
      // Reinicia a sequência após pausa
      current = 0;
      setTimeout(() => animateLine(current), 500);
      return;
    }
    
    const line = lines[index];
    line.style.opacity = '1';              // garante visibilidade
    line.style.animationPlayState = 'running';

    line.addEventListener('animationend', () => {
      line.style.animationPlayState = 'paused';
      line.style.opacity = '0';
      line.style.animation = 'none';       // reseta animação
      void line.offsetWidth;                // força reflow
      line.style.animation = null;         // reaplica animação (reset)

      current++;
      animateLine(current);
    }, { once: true });
  }

  animateLine(current);
};

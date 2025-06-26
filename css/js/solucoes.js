// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particles');
  
  // Verifica se o canvas existe
  if (!canvas) {
    console.error('Canvas não encontrado!');
    return;
  }
  
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);

  let particles = [];

  // Cria as partículas (estrelas)
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random(),
      blinkSpeed: Math.random() * 0.02 + 0.01
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // Atualiza a opacidade para criar o efeito de piscar
      p.alpha += p.blinkSpeed;
      if (p.alpha > 1 || p.alpha < 0.1) {
        p.blinkSpeed *= -1;
      }

      // Desenha a estrela
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(p.alpha)})`;
      ctx.fill();

      // Move a partícula
      p.x += p.dx;
      p.y += p.dy;

      // Rebate nas bordas
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animateParticles);
  }

  // Inicia a animação
  animateParticles();
});


'use strict';

(function() {
  const btn = document.getElementById('btn-menu');
  const menu = document.getElementById('menu');
  if (!btn || !menu) return;

  const mq = window.matchMedia('(max-width: 768px)');
  const raiz = document.documentElement;

  raiz.classList.add('js-menu');
  btn.hidden = false;

  function definir(aberto) {
    menu.classList.toggle('aberto', aberto);
    btn.classList.toggle('ativo', aberto);
    btn.setAttribute('aria-expanded', String(aberto));
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  }

  btn.addEventListener('click', function() {
    definir(!menu.classList.contains('aberto'));
  });

  menu.addEventListener('click', function(e) {
    if (e.target.closest('a')) definir(false);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) {
      definir(false);
      btn.focus();
    }
  });

  mq.addEventListener('change', function() { definir(false); });
})();
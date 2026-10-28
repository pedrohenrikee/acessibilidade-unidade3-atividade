 (function() {
    const btnTema = document.getElementById('btn-tema');
    const raizHtml = document.documentElement;
    const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');

    function obterTema() {
      const temaSalvo = localStorage.getItem('tema-ideal');
      if (temaSalvo === 'dark' || temaSalvo === 'light') return temaSalvo;
      return mediaDark.matches ? 'dark' : 'light';
    }

    function atualizarBotao(tema) {
      btnTema.textContent = tema === 'dark' ? 'Modo claro' : 'Modo escuro';
    }

    function aplicarTema(tema, salvar = false) {
      if (salvar) {
        raizHtml.setAttribute('data-theme', tema);
        localStorage.setItem('tema-ideal', tema);
      } else {
        const temaSalvo = localStorage.getItem('tema-ideal');
        if (temaSalvo) {
          raizHtml.setAttribute('data-theme', temaSalvo);
        } else {
          raizHtml.removeAttribute('data-theme');
        }
      }
      atualizarBotao(obterTema());
    }

    const temaInicial = obterTema();
    const temaSalvo = localStorage.getItem('tema-ideal');
    if (temaSalvo) {
      raizHtml.setAttribute('data-theme', temaSalvo);
    }
    atualizarBotao(temaInicial);

    btnTema.addEventListener('click', function() {
      const temaAtual = obterTema();
      const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
      aplicarTema(novoTema, true);
    });

    mediaDark.addEventListener('change', function(e) {
      if (!localStorage.getItem('tema-ideal')) {
        atualizarBotao(e.matches ? 'dark' : 'light');
      }
    });
  })();
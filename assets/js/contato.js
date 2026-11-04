(function () {
  'use strict';

  var form = document.getElementById('form-cadastro');
  if (!form) return;

  var resumo = document.getElementById('resumo-erros');
  var sucesso = document.getElementById('mensagem-sucesso');

  var CAMPOS = ['nome', 'email', 'cpf', 'nascimento', 'telefone', 'senha', 'confirma', 'termos'];

  var ROTULOS = {
    nome: 'Nome completo',
    email: 'E-mail',
    cpf: 'CPF',
    nascimento: 'Data de nascimento',
    telefone: 'Telefone',
    senha: 'Senha',
    confirma: 'Confirmação de senha',
    termos: 'Termos de uso'
  };

  function soDigitos(v) { return v.replace(/\D/g, ''); }

  function cpfValido(valor) {
    var d = soDigitos(valor);
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
    for (var t = 9; t < 11; t++) {
      var soma = 0;
      for (var i = 0; i < t; i++) soma += parseInt(d.charAt(i), 10) * (t + 1 - i);
      var dv = ((soma * 10) % 11) % 10;
      if (dv !== parseInt(d.charAt(t), 10)) return false;
    }
    return true;
  }

  var REGRAS = {
    nome: function (el) {
      var v = el.value.trim();
      if (!v) return 'O nome completo é obrigatório.';
      if (v.split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
      return '';
    },
    email: function (el) {
      var v = el.value.trim();
      if (!v) return 'O e-mail é obrigatório.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Informe um e-mail válido, no formato nome@dominio.com.';
      return '';
    },
    cpf: function (el) {
      var v = el.value.trim();
      if (!v) return 'O CPF é obrigatório.';
      if (!cpfValido(v)) return 'CPF inválido. Use o formato 000.000.000-00.';
      return '';
    },
    nascimento: function (el) {
      if (!el.value) {
        return el.validity && el.validity.badInput
          ? 'Data inválida. Use o formato dd/mm/aaaa.'
          : 'A data de nascimento é obrigatória.';
      }
      var partes = el.value.split('-');
      var data = new Date(+partes[0], +partes[1] - 1, +partes[2]);
      var hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      if (isNaN(data.getTime()) || +partes[0] < 1900) return 'Data inválida. Use o formato dd/mm/aaaa.';
      if (data > hoje) return 'A data de nascimento não pode estar no futuro.';
      return '';
    },
    telefone: function (el) {
      var v = el.value.trim();
      if (!v) return ''; // opcional
      var n = soDigitos(v).length;
      if (n !== 10 && n !== 11) return 'Telefone inválido. Use (00) 00000-0000 ou (00) 0000-0000, com DDD.';
      return '';
    },
    senha: function (el) {
      var v = el.value;
      if (!v) return 'A senha é obrigatória.';
      if (v.length < 8 || !/[A-Za-z]/.test(v) || !/\d/.test(v)) {
        return 'A senha deve ter no mínimo 8 caracteres, incluindo uma letra e um número.';
      }
      return '';
    },
    confirma: function (el) {
      var v = el.value;
      if (!v) return 'A confirmação de senha é obrigatória.';
      if (v !== document.getElementById('senha').value) return 'As senhas não são iguais.';
      return '';
    },
    termos: function (el) {
      return el.checked ? '' : 'Você precisa aceitar os termos de uso para continuar.';
    }
  };

  function marcarErro(el, msg) {
    var erro = document.getElementById(el.id + '-erro');
    el.setAttribute('aria-invalid', 'true');
    erro.textContent = 'Erro: ' + msg;
    erro.setAttribute('data-msg', msg);
  }

  function limparErro(el) {
    var erro = document.getElementById(el.id + '-erro');
    el.removeAttribute('aria-invalid');
    erro.textContent = '';
    erro.removeAttribute('data-msg');
  }

  function validarCampo(id) {
    var el = document.getElementById(id);
    var msg = REGRAS[id](el);
    if (msg) marcarErro(el, msg); else limparErro(el);
    atualizarResumoSeVisivel();
    return !msg;
  }

  function listaErros() {
    var lista = [];
    CAMPOS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el.getAttribute('aria-invalid') === 'true') {
        lista.push({ id: id, msg: document.getElementById(id + '-erro').getAttribute('data-msg') });
      }
    });
    return lista;
  }

  function montarResumo(erros) {
    resumo.innerHTML = '';
    if (!erros.length) return;

    var titulo = document.createElement('h2');
    titulo.className = 'resumo-titulo';
    titulo.textContent = erros.length === 1
      ? 'Há 1 erro no formulário. Corrija-o para continuar:'
      : 'Há ' + erros.length + ' erros no formulário. Corrija-os para continuar:';
    resumo.appendChild(titulo);

    var ul = document.createElement('ul');
    erros.forEach(function (e) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + e.id;
      a.textContent = ROTULOS[e.id] + ': ' + e.msg;
      li.appendChild(a);
      ul.appendChild(li);
    });
    resumo.appendChild(ul);
  }

  function atualizarResumoSeVisivel() {
    if (resumo.getAttribute('data-ativo') !== 'sim') return;
    var erros = listaErros();
    montarResumo(erros);
    if (!erros.length) resumo.removeAttribute('data-ativo');
  }

  resumo.addEventListener('click', function (ev) {
    var a = ev.target.closest('a');
    if (!a) return;
    ev.preventDefault();
    var campo = document.getElementById(a.getAttribute('href').slice(1));
    if (campo) {
      campo.focus();
      campo.scrollIntoView({ block: 'center' });
    }
  });

  function mascaraCpf(v) {
    var d = soDigitos(v).slice(0, 11);
    return d
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  }

  function mascaraTelefone(v) {
    var d = soDigitos(v).slice(0, 11);
    if (d.length > 10) return d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    if (d.length > 6) return d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    if (d.length > 2) return d.replace(/^(\d{2})(\d*)/, '($1) $2');
    return d ? '(' + d : '';
  }

  document.getElementById('cpf').addEventListener('input', function () {
    this.value = mascaraCpf(this.value);
  });
  document.getElementById('telefone').addEventListener('input', function () {
    this.value = mascaraTelefone(this.value);
  });

  CAMPOS.forEach(function (id) {
    var el = document.getElementById(id);

    el.addEventListener('blur', function () { validarCampo(id); });

    var evento = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evento, function () {
      if (el.getAttribute('aria-invalid') === 'true') validarCampo(id);

    
      if (id === 'senha') {
        var conf = document.getElementById('confirma');
        if (conf.value || conf.getAttribute('aria-invalid') === 'true') validarCampo('confirma');
      }
    });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    sucesso.textContent = '';
    sucesso.classList.remove('visivel');

    if (document.getElementById('website').value !== '') {
      return; 
    }

    CAMPOS.forEach(function (id) {
      var el = document.getElementById(id);
      var msg = REGRAS[id](el);
      if (msg) marcarErro(el, msg); else limparErro(el);
    });

    var erros = listaErros();
    if (erros.length) {
      resumo.setAttribute('data-ativo', 'sim');
      montarResumo(erros);
      resumo.focus(); 
      resumo.scrollIntoView({ block: 'start' });
      return;
    }

    resumo.removeAttribute('data-ativo');
    resumo.innerHTML = '';

    sucesso.textContent = 'Cadastro enviado com sucesso! Em breve um de nossos vendedores entrará em contato.';
    sucesso.classList.add('visivel');
    sucesso.focus();
    form.reset();
  });
})();
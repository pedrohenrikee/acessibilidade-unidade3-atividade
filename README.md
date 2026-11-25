<div align="center">

# 🎸 Harmonia Instrumentos Musicais

**Loja fictícia de instrumentos musicais, reconstruída com foco em acessibilidade, semântica e responsividade.**

![HTML5](https://img.shields.io/badge/HTML5-semântico-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-variáveis%20e%20media%20queries-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-puro-F7DF1E?logo=javascript&logoColor=black)
![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-2e7d32)

</div>

---

## 📖 Sobre o projeto

Este repositório é a resolução da **Atividade da Unidade 3 — HTML Semântico: a Base da Acessibilidade**.

O ponto de partida era uma página que *parecia* correta para quem enxerga, mas tinha **34 problemas de semântica e acessibilidade** que impediam o uso por leitores de tela e navegação por teclado. A tarefa original era corrigi-los **mantendo o layout**.

Depois da correção, o projeto evoluiu: ganhou tema claro/escuro, carrossel, banner, cartões de produto, formulário de cadastro com validação acessível, respeito às preferências do usuário (`prefers-reduced-motion` e `prefers-color-scheme`) e, por fim, **layout responsivo com menu hambúrguer**.

## ✨ Funcionalidades implementadas

### 1. Correções de semântica e acessibilidade (HTML)

| Área | O que foi feito |
| --- | --- |
| **Marcação de ênfase** | `<b>` → `<strong>`, `<i>` → `<em>`, `<u>` → `<strong>` (significado, não só aparência) |
| **Hierarquia de cabeçalhos** | Estrutura lógica de `h1` → `h2` → `h3`, sem saltos de nível |
| **Landmarks** | `<div>` trocadas por `<header>`, `<nav>`, `<main>`, `<aside>` e `<footer>` |
| **Navegação** | Menu com `<nav aria-label="Principal">` + `<ul>`/`<li>`; trilha de navegação (breadcrumb) com `aria-label` próprio |
| **Idioma** | `lang="pt-BR"` no `<html>` |
| **Tabelas** | `<caption>` descritivo, `<th scope="col">` e `<th scope="row">` no lugar de `<td>` estilizados |
| **Links e botões** | Textos de link que fazem sentido isolados, aviso "(abre em nova aba)" e `rel="noopener noreferrer"`; `<div>` clicáveis trocadas por `<button type="button">` |
| **Listas** | Listas simuladas com `<br>` convertidas em `<ul>`/`<li>` |
| **Imagens** | Textos alternativos descritivos; imagens decorativas com `alt=""` |
| **Formulário** | Veja a seção própria abaixo |

### 2. ⏭️ Skip link

Link "Pular para o conteúdo principal" que fica oculto e aparece ao receber foco via teclado (`Tab`), levando direto ao `<main>`.

### 3. 🌗 Tema claro/escuro (`prefers-color-scheme`)

- Todas as cores centralizadas em **variáveis CSS** (`--bg-*`, `--text-*`, `--border-*`).
- O site **respeita a preferência do sistema operacional** automaticamente.
- Botão no cabeçalho para **alternar manualmente** entre claro e escuro, com a escolha salva no `localStorage`.
- O texto do botão muda conforme o tema ativo ("Modo escuro" / "Modo claro").

### 4. 🎞️ Carrossel de destaques

- Três slides (guitarras, baterias e pianos) com troca pelo botão **"Próximo destaque"**.
- Slides inativos escondidos com `aria-hidden`, para que leitores de tela leiam apenas o slide visível.
- Animação de entrada suave com `@keyframes`.

### 5. 🎨 Banner e cartões de produto

- Banner "Semana da Música" com gradiente, sombra e animação de entrada.
- Lista de produtos em **flexbox** com cartões que quebram de linha conforme o espaço, com efeito de *hover*.

### 6. ♿ `prefers-reduced-motion`

Para usuários que pedem menos movimento no sistema, animações e transições são praticamente desativadas (inclusive a animação do carrossel e o *zoom* dos cartões e imagens).

### 7. 📝 Página de contato com formulário acessível (`contato.html`)

- Campos agrupados com `<fieldset>` e `<legend>`.
- Todos os campos com `<label for>` associado; obrigatoriedade indicada visualmente (`*`) **e** para leitores de tela (texto "obrigatório" com `.sr-only`).
- `required`, `aria-required`, `autocomplete` apropriados e `inputmode` para teclados móveis.
- Textos de ajuda ligados aos campos com `aria-describedby`.
- **Validação em JavaScript** (`contato.js`):
  - nome completo, e-mail, **CPF com cálculo dos dígitos verificadores**, data de nascimento, telefone, senha (mín. 8 caracteres, letra e número), confirmação de senha e aceite dos termos;
  - **máscaras** automáticas de CPF e telefone;
  - mensagens de erro específicas ("Erro: ...") vinculadas ao campo, com `aria-invalid`;
  - **resumo de erros** no topo (`role="alert"`) com links que levam direto a cada campo com problema;
  - mensagem de sucesso com `role="status"`;
  - campo *honeypot* escondido contra envios automatizados.

### 8. 📱 Responsividade e menu hambúrguer

Layout adaptado para tablets e celulares **sem alterar o visual do desktop**:

- **Até 900px:** a barra lateral "Conteúdo relacionado" passa para baixo do conteúdo.
- **Até 768px:**
  - menu principal vira **hambúrguer** (botão com ícone animado que se transforma em "X");
  - cabeçalho reorganizado, títulos e espaçamentos reduzidos;
  - cartões de produto em coluna, com botões em largura total;
  - banner, carrossel, tabela e formulário ajustados à largura da tela, **sem rolagem horizontal**.
- **Até 400px:** ajustes finos de fonte e espaçamento para telas bem pequenas.

**Acessibilidade do menu hambúrguer** (`assets/js/menu.js`):

- `aria-expanded`, `aria-controls` e `aria-label` dinâmico ("Abrir menu" / "Fechar menu");
- fecha com a tecla **Esc** (devolvendo o foco ao botão), ao clicar em um link ou ao voltar para a tela larga;
- foco visível com o mesmo contorno amarelo do restante do site;
- **melhoria progressiva:** sem JavaScript, o menu permanece visível e utilizável.

### 9. 🤖 Verificação automática de acessibilidade (CI)

Workflow do GitHub Actions (`.github/workflows/acessibilidade.yml`) que roda a cada Pull Request:

- validação de HTML com **html-validate**;
- varredura **WCAG 2.1 AA** com **axe-core** (via Playwright/Chromium);
- relatório publicado no resumo do job, na aba *Checks*.

## 🗂️ Estrutura do projeto

```text
.
├── index.html                 # Página inicial (loja)
├── contato.html               # Cadastro e contato
├── assets/
│   ├── css/
│   │   └── style.css          # Estilos, temas, animações e responsividade
│   ├── js/
│   │   ├── carrossel.js       # Carrossel de destaques
│   │   ├── tema.js            # Alternância de tema claro/escuro
│   │   ├── menu.js            # Menu hambúrguer (mobile)
│   │   └── contato.js         # Validação e máscaras do formulário
│   └── img/                   # Imagens dos instrumentos
├── .github/
│   ├── workflows/acessibilidade.yml
│   ├── scripts/verificar-acessibilidade.mjs
│   └── PULL_REQUEST_TEMPLATE.md
├── .htmlvalidate.json         # Regras do validador de HTML
├── CHECKLIST.md               # Checklist da atividade
└── GUIA-GIT-E-PAGES.md        # Guia de Git e GitHub Pages
```

## 🚀 Como executar

Não há dependências nem etapa de build. Basta clonar e abrir no navegador:

```bash
git clone https://github.com/pedrohenrikee/acessibilidade-unidade3-atividade.git
cd acessibilidade-unidade3-atividade
```

Abra o `index.html` diretamente no navegador ou, se preferir um servidor local:

```bash
npx serve .
```

Para testar a responsividade, abra as ferramentas de desenvolvedor (`F12`) e ative o **modo dispositivo** (`Ctrl + Shift + M`). O botão do menu hambúrguer aparece em larguras de **768px ou menos**.

## 🧪 Como testar a acessibilidade

1. **Teclado:** percorra a página só com `Tab`, `Shift + Tab`, `Enter` e `Esc`. Todos os controles devem ser alcançáveis e ter foco visível.
2. **Leitor de tela:** NVDA (Windows) ou VoiceOver (macOS). Confira a lista de cabeçalhos, links e landmarks.
3. **Preferências do sistema:** alterne o tema do sistema operacional e a opção de reduzir movimento.
4. **Validador W3C:** <https://validator.w3.org/nu/>
5. **Responsividade:** teste em 320px, 375px, 768px e desktop, sem rolagem horizontal.

## 🕒 Histórico de evolução

| Data | Etapa |
| --- | --- |
| 26/08/2026 | Página original com problemas de acessibilidade (repositório do professor) |
| 05/09/2026 | Troca de `<b>`, `<i>` e `<u>` por `<strong>` e `<em>` |
| 07/09/2026 | Hierarquia de cabeçalhos e `<header>` |
| 09/09/2026 | Landmarks (`nav`, `main`, `aside`, `footer`), `lang`, tabelas, links, botões, listas e formulário |
| 16/09/2026 | Skip link |
| 23/09/2026 | Botão de tema dark e `prefers-color-scheme` |
| 28/10/2026 | CSS separado em `assets/`, carrossel, imagens e `prefers-reduced-motion` |
| 04/11/2026 | Página de contato com formulário e validação |
| 25/11/2026 | Responsividade e menu hambúrguer |

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3**: variáveis customizadas, Flexbox, media queries, `prefers-color-scheme` e `prefers-reduced-motion`
- **JavaScript** puro (sem frameworks ou bibliotecas)
- **GitHub Actions**, **axe-core**, **html-validate** e **Playwright** para verificação automática

## 👤 Autor

**Pedro** — [@pedrohenrikee](https://github.com/pedrohenrikee)

Projeto desenvolvido como atividade acadêmica. Base e enunciado: Prof. Sandro Amâncio de Sá.

---

<div align="center">

*A loja é fictícia; os dados (CNPJ, preços e páginas de destino) são apenas ilustrativos.*

</div>
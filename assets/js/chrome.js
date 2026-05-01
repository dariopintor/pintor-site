// Header + footer compartilhados (inseridos antes do app.js)
(function () {
  const depth = location.pathname.split('/').filter(Boolean).length > 1 ? '../' : '';
  const header = `
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <header class="site-header">
      <nav class="navbar" aria-label="Principal">
        <button class="nav__toggle" aria-expanded="false" aria-controls="primary-nav">Menu</button>
        <div class="nav-links" id="primary-nav">
          <a href="${depth}index.html" class="nav-link">Início</a>
          <a href="${depth}blog.html" class="nav-link">Blog</a>
          <a href="${depth}disciplinas.html" class="nav-link">Disciplinas</a>
          <a href="${depth}materiais.html" class="nav-link">Materiais</a>
          <a href="${depth}sobre.html" class="nav-link">Sobre</a>
          <a href="${depth}contato.html" class="nav-link">Contato</a>
        </div>
        <a href="${depth}index.html" class="nav-profile" aria-label="Página inicial">
          <div class="nav-profile-info">
            <div class="nav-name">Dario Pintor</div>
            <div class="nav-domain">dariopintor.com</div>
          </div>
          <div class="nav-avatar">
            <img src="${depth}assets/img/dariopintor.jpeg" alt="Dario Pintor">
          </div>
        </a>
      </nav>
    </header>
  `;
  const footer = `
    <footer class="site-footer">
      <div class="wrap site-footer__inner">
        <div>
          <div>José Dario Pintor da Silva</div>
          <div class="site-footer__mono">DOCENTE · PROGRAMAÇÃO</div>
        </div>
        <div>
          <a href="mailto:jose.pintor@ifb.edu.br">jose.pintor@ifb.edu.br</a><br>
          <a href="https://github.com/dariopintor" rel="noopener">github.com/dariopintor</a><br>
          <a href="https://www.youtube.com/@dariopintor" rel="noopener" target="_blank">youtube.com/@dariopintor</a><br>
          <a href="http://lattes.cnpq.br/0370524014203647" rel="noopener" target="_blank">Currículo Lattes</a>
        </div>
        <div class="site-footer__mono">
          © <span data-year></span> · DARIOPINTOR.COM
        </div>
      </div>
    </footer>
  `;
  const mount = document.getElementById('site-header-mount');
  if (mount) mount.outerHTML = header;
  const mountF = document.getElementById('site-footer-mount');
  if (mountF) mountF.outerHTML = footer;
})();

// Header + footer compartilhados (inseridos antes do app.js)
(function () {
  const header = `
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <header class="site-header">
      <div class="site-header__inner">
     
        <button class="nav__toggle" aria-expanded="false" aria-controls="primary-nav">Menu</button>
        <nav class="nav" id="primary-nav" aria-label="Principal">
          <a href="index.html">Início</a>
          <a href="blog.html">Blog</a>
          <a href="disciplinas.html">Disciplinas</a>
            <a href="materiais.html">Materiais</a>
          <a href="sobre.html">Sobre</a>
         
       <a href="contato.html">Contato</a>
          
          <a href="index.html" class="brand">
          Dario Pintor<span class="brand__mono">  ·  DARIOPINTOR.COM</span>
        </a>
          
        </nav>
      </div>
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
          <a href="https://github.com/dariopintor" rel="noopener">github.com/dariopintor</a>
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

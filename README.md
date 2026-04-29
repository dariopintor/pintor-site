# Site pessoal — José Dario Pintor

Site estático, responsivo e acessível. HTML / CSS / JS vanilla.

## Estrutura

```
.
├── index.html          ← Home
├── sobre.html          ← Bio curta + sidebar
├── disciplinas.html    ← Lista de matérias
├── curriculo.html      ← Formação + experiência + download PDF
├── materiais.html      ← Downloads com busca (atalho: /)
├── contato.html
└── assets/
    ├── css/style.css
    └── js/
        ├── chrome.js   ← header/footer injetados em todas as páginas
        └── app.js      ← nav mobile, busca, ano dinâmico, tweaks
```

## Como editar

- **Conteúdo de texto**: direto no HTML — é tudo marcação explícita.
- **Header/footer**: edite uma vez em `assets/js/chrome.js`.
- **Cores e fontes**: variáveis CSS no topo de `assets/css/style.css` (`:root`).
- **Materiais**: cada item é um `<li class="mat-item">` com `data-search="palavras-chave"` — essas palavras alimentam a busca além do texto visível.
- **Substituir a foto**: troque o `<svg>` dentro de `.portrait` por `<img src="...">`.
- **PDFs**: os `href="#"` dos botões de download são placeholders — troque pelo caminho real (ex. `curriculo.pdf`).

## Tweaks (painel no canto inferior)

Na barra de ferramentas desta plataforma, ative **Tweaks** para trocar acento de cor, tema (claro/escuro) e serifa em tempo real. As escolhas persistem em `localStorage` e sobrevivem entre páginas.

## Acessibilidade

- Contraste AA em claro e escuro.
- Skip-link, `aria-current` no link da página ativa, menu mobile controlado por teclado.
- Busca focável com a tecla `/`.
- `prefers-reduced-motion` respeitado (sem animações agressivas).

## Para publicar

Qualquer servidor estático funciona: GitHub Pages, Netlify, Vercel, Cloudflare Pages, ou simplesmente `python -m http.server` localmente.

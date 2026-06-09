# OCA Arquitetos — Site Institucional

Site institucional premium para a **OCA Arquitetos**, com galeria de projetos, quiz inteligente, modo claro/escuro, chat IA flutuante, animações e CTA para WhatsApp.

> Projetos que inspiram e cuidam do bem-estar.

## Como abrir o site
- Abra `index.html` diretamente no navegador (duplo clique), ou
- Sirva localmente: `python3 -m http.server` na pasta do projeto.

## Estrutura de pastas
```
oca-arquitetos-site/
├── index.html
├── style.css
├── script.js
├── README.md
├── docs/
│   └── instructions.md
└── assets/
    ├── images/   (logo + projetos da OCA)
    └── videos/   (apresentacao.mp4)
```

## Como editar
- **Textos**: abra `index.html` no VS Code, use Ctrl+F para localizar e edite.
- **Imagens**: substitua arquivos em `assets/images/` mantendo o mesmo nome — ou troque o caminho no HTML/JS.
- **Logo**: substitua `assets/images/logo.jpg`.
- **WhatsApp**: localizar e substituir `5511983819509` por outro número (sem espaços, com DDI).
- **Instagram**: localizar e substituir `oca_arquitetos`.
- **Projetos da galeria**: edite o array `projects` em `script.js`.
- **Quiz**: edite `questions` e `results` em `script.js`.

## Hospedagem
- **GitHub Pages**: suba o repositório e ative Pages em Settings → Pages.
- **Vercel**: rode `vercel` na pasta.
- **Netlify**: arraste a pasta em https://app.netlify.com/drop.

## Contato OCA Arquitetos
- WhatsApp: +55 11 98381-9509 — https://wa.me/5511983819509
- Instagram: https://www.instagram.com/oca_arquitetos/

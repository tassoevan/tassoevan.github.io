# CLAUDE.md

Site estático (Vite + React + TypeScript + Tailwind v4) publicado no GitHub Pages a cada push
em `main` (`.github/workflows/deploy.yml`). Ele tem duas páginas independentes:

| URL     | HTML              | Código     | Idioma | Finalidade                                                  |
| ------- | ----------------- | ---------- | ------ | ----------------------------------------------------------- |
| `/`     | `index.html`      | `src/*`    | inglês | Página pessoal do Tasso. **Não mexer.**                     |
| `/edu/` | `edu/index.html`  | `src/edu/` | pt-BR  | Materiais de Ciências da Natureza (EF e EM) segundo a BNCC. |

As duas entradas estão declaradas em `build.rollupOptions.input` no `vite.config.ts`.

## Comandos

- `yarn dev`: servidor local (`/` e `/edu/`)
- `yarn build`: checagem de tipos + build em `dist/`
- `yarn lint` / `yarn format` / `yarn format:check`: Oxlint e Oxfmt

Rode `yarn build`, `yarn lint` e `yarn format:check` antes de concluir qualquer alteração.

## Restrições

### 1. A página raiz fica como está

- Não altere `index.html`, `src/main.tsx`, `src/App.tsx` nem `src/index.css`.
- `src/components/` é compartilhado: `/edu` pode reutilizar os componentes, mas não os modifique
  de um jeito que mude a aparência ou o comportamento da raiz. Se precisar de outra variação,
  crie o componente em `src/edu/components/`.
- Não remova nem renomeie arquivos de `public/` (`CNAME`, `icon.svg`, `ecn6.html`). Os
  redirecionamentos `.html` são links já compartilhados com estudantes, e quebrá-los quebra aulas.
- Redirecionamentos novos para materiais da área educacional vão em `public/edu/<nome>.html`.
  Nunca crie `public/edu/index.html`, porque ele colidiria com a página gerada por `edu/index.html`.
- `/edu` (sem barra) redireciona para `/edu/` por meio do `public/edu.html`. Não o remova. Uma
  nova página em diretório precisa de um redirecionamento equivalente em `public/<nome>.html`.
  O `yarn dev` não usa esse redirecionamento: lá, acesse `/edu/` com a barra.

### 2. Fidelidade à BNCC

- A referência é a BNCC oficial: <https://basenacionalcomum.mec.gov.br/>. **Nunca invente**
  códigos de habilidade, textos de habilidades ou competências, nem associações entre conteúdo e
  habilidade. Se não conseguir confirmar algo na fonte oficial, pergunte em vez de supor.
- Escopo: componente **Ciências** no Ensino Fundamental (códigos `EFxxCIxx`) e área de
  **Ciências da Natureza e suas Tecnologias** no Ensino Médio (códigos `EM13CNTxxx`). Habilidades
  de outros componentes ou áreas ficam fora do catálogo.
- `src/edu/bncc.ts` guarda só a *estrutura* (etapas, anos, unidades temáticas, competências
  específicas e formato dos códigos), e os tipos já rejeitam códigos mal formados. O texto das
  habilidades não é transcrito ali. Se algum dia for exibido, deve ser cópia literal da fonte
  oficial.
- No Fundamental, todo conteúdo declara uma unidade temática (`thematicUnit`: Matéria e Energia,
  Vida e Evolução ou Terra e Universo), e suas habilidades (`skills`) devem ser todas do mesmo ano.
- Mudanças normativas (por exemplo, alterações no Ensino Médio ou nos itinerários formativos) só
  entram no site depois de confirmadas com o professor.

### 3. Conteúdo

- Os conteúdos ficam em `CONTENTS`, no arquivo `src/edu/contents.ts`. Para adicionar um
  conteúdo, inclua um objeto nesse array. Não crie outra fonte de dados.
- O professor é o autor. Não escreva nem publique material didático (resumos, exercícios,
  gabaritos, explicações) sem pedido explícito, e apresente o texto para revisão antes do commit.
- O público inclui crianças e adolescentes (do 1º ano do EF à 3ª série do EM). Use português
  brasileiro claro e adequado à faixa etária, com rigor científico: nada de pseudociência,
  simplificações que viram erros conceituais ou referências inventadas.
- Experimentos devem trazer orientações de segurança, materiais de baixo risco e a indicação de
  supervisão de um adulto quando for o caso.
- Publique apenas materiais próprios ou com licença que permita a redistribuição, e dê o crédito.
  Para conteúdo de terceiros sem licença clara, use um link, não uma cópia.

### 4. Privacidade e segurança dos estudantes (LGPD e ECA)

- Nenhum dado pessoal de estudantes: nomes, fotos, vídeos, notas, turmas identificáveis, e-mails
  ou trabalhos sem anonimização.
- Sem analytics, rastreadores, cookies, pixels, anúncios ou embeds que rastreiem visitantes.
  Prefira links a iframes de terceiros.
- Sem formulários ou coleta de dados. O site é estático (GitHub Pages) e não tem backend.

### 5. Acessibilidade e alcance

- Muitos estudantes acessam pelo celular, em conexões lentas ou com franquia de dados. Mantenha
  `/edu` leve: não adicione dependências sem pedir, nem imagens pesadas ou fontes externas.
- Siga a WCAG 2.1 AA: contraste suficiente nos temas claro e escuro, texto alternativo em
  imagens, HTML semântico (títulos em ordem, listas, `<time>`), navegação por teclado e layout
  responsivo.

## Convenções de código em `src/edu/`

- **Código TypeScript sempre em inglês**: identificadores, nomes de arquivos, chaves e valores
  de tipos e comentários (`Content`, `skills`, `thematicUnit`, `'matter-and-energy'`). Não use
  português no código.
- O português fica restrito ao que o público lê: rótulos e textos da interface (por exemplo,
  `STAGE_LABELS` e `THEMATIC_UNIT_LABELS`), dados dos conteúdos (`title`, `summary`) e o HTML.
  Siglas e códigos oficiais da BNCC (`EF`, `EM`, `EF06CI01`) são mantidos como estão.
- Estilo do Oxfmt (aspas simples, inclusive em JSX). Classes Tailwind usando as cores do tema
  definidas em `src/edu/index.css` (paleta "educampo"), sem cores soltas.
- Links externos com `ExternalLink` (`src/components/ExternalLink.tsx`).

## Git e publicação

- Todo push em `main` publica o site. Não faça push, nem commit direto em `main`, sem pedido
  explícito.

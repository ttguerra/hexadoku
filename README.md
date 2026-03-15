# Hexadoku — Sudoku 16×16

Jogo de Sudoku 16×16 (Hexadoku) em formato de Progressive Web App (PWA).
Funciona offline e pode ser instalado no ecrã inicial do telemóvel.

## Como publicar no GitHub Pages (passo a passo)

### 1. Criar o repositório
1. Vai a **github.com** e faz login
2. Clica no botão verde **"New"** (canto superior esquerdo)
3. Em *Repository name* escreve: `hexadoku`
4. Deixa em **Public**
5. Clica **"Create repository"**

### 2. Fazer upload dos ficheiros
1. No repositório recém-criado, clica em **"uploading an existing file"**
2. Arrasta **todos estes ficheiros** para a área de upload:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.png`
   - `icon512.png`
3. Clica **"Commit changes"**

### 3. Ativar o GitHub Pages
1. Vai a **Settings** (no teu repositório)
2. No menu lateral clica em **"Pages"**
3. Em *Source* seleciona **"Deploy from a branch"**
4. Em *Branch* seleciona **"main"** e pasta **"/ (root)"**
5. Clica **"Save"**

### 4. O teu link
Após ~1 minuto o jogo estará disponível em:
```
https://SEU-USERNAME.github.io/hexadoku/
```
Substitui `SEU-USERNAME` pelo teu nome de utilizador do GitHub.

### 5. Partilhar
- Partilha esse link pelo WhatsApp, email, etc.
- No iPhone: abre o link no Safari → botão de partilha → **"Adicionar ao ecrã inicial"**
- No Android: abre no Chrome → aparece banner automático para instalar

## Funcionalidades
- Sudoku 16×16 com símbolos 1–9 e A–G
- Sistema de 5 vidas (erros e dicas consomem vidas)
- Dicas (custam 1 vida)
- Modo lápis para anotações
- Pausa sem perder progresso
- Tamanho de letra ajustável (A− / A+)
- Modo alto contraste
- Funciona offline após a primeira visita

# JF Locações e Transportes — site institucional

Site estático (HTML, CSS e JavaScript) da JF Locações e Transportes, Aguaí - SP.
O formulário de orçamento monta a mensagem e abre o WhatsApp (não há backend).

## Estrutura

```
index.html                         página inicial
locacao-de-caminhoes/              página geral de locação
aluguel-de-caminhao-toco/          uma página por veículo
aluguel-de-caminhao-pipa/
aluguel-de-caminhao-bau/
aluguel-de-caminhao-sider/
aluguel-de-caminhao-bitruck/
transporte-de-cargas/
privacidade/  termos-de-uso/  lgpd/
404.html  robots.txt  sitemap.xml  .htaccess  favicon.ico
assets/  css/  js/  docs/
```

As URLs são "limpas" (ex.: `/aluguel-de-caminhao-pipa/`). Todo o site deve ficar na **raiz** do domínio.
Para testar localmente use um servidor (não abra o arquivo direto): `python3 -m http.server 8000`.

## Visual

- Fonte: Archivo (Google Fonts, eixo de largura): expandida nos títulos, condensada nos números.
- Cores (em `css/style.css`, `:root`): asfalto `#26292C`, concreto `#E6E7E3`, amarelo `#FFC400`, azul da logo `#1A318E`.
- Não há mais Font Awesome nem imagens geradas por IA. A home usa só fotos reais da frota.
- Números da home (`data-count` em `index.html`): "20 anos" é calculado a partir de 2006; confirme "5 tipos" e "7 veículos".

## Imagens

Todas as imagens estão em WebP. Para trocar uma foto da frota:
1. Gere o WebP com largura máxima de 1400 px e qualidade ~78 (arquivo principal).
2. Gere a miniatura 300x164 px, com o nome `nome-thumb.webp`.
3. Escreva um `alt` descritivo e informe `width`/`height` reais no HTML.

## SEO

- Cada página tem `title`, `description`, canonical, Open Graph e dados estruturados (JSON-LD).
- `sitemap.xml` e `robots.txt` na raiz. Ao criar uma página nova, inclua a URL no sitemap.
- Passos que dependem do cliente (Google Meu Negócio, Search Console): `docs/PROXIMOS-PASSOS-SEO.md`.

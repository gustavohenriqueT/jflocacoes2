# Próximos passos de SEO (fora do código)

O código já está pronto. O que falta depende de contas do cliente e é o que mais pesa em busca local.

## 1. Google Meu Negócio (o mais importante)
Já existe uma ficha em Aguaí ("JF Locações Basculante e Pipa"), sem avaliações e como "Escritório da empresa".
- Reivindicar e verificar a ficha (o Google envia um código ou faz videochamada).
- Categoria principal: a que melhor descreve o serviço (aluguel de caminhões ou transportadora); acrescentar categorias secundárias.
- Preencher horário de funcionamento, telefone, site `https://jflocacoes.com.br/` e área de atendimento.
- Enviar fotos reais da frota e da sede.
- Manter nome, endereço e telefone **idênticos** aos do site:
  R. Beatriz Coimbra Alonso, 195 - Jd. Bela Vista, Aguaí - SP; (19) 3652-5075; (11) 99364-8272.
- Pedir avaliações a clientes reais e responder todas.
- Usar o nome real da empresa. Não acrescentar palavras-chave ao nome da ficha.

## 2. Google Search Console
1. Cadastrar a propriedade (domínio ou prefixo `https://jflocacoes.com.br/`).
2. Enviar `https://jflocacoes.com.br/sitemap.xml` em "Sitemaps".
3. Em "Inspeção de URL", solicitar indexação da home e das páginas novas.
4. Depois de 2 a 4 semanas, olhar "Desempenho" para ver as buscas que já trazem impressões.

## 3. Ajustes que o cliente precisa confirmar
- **Cidades atendidas:** as páginas dizem "Aguaí e região". Se a lista de cidades for definida, vale criar uma página por cidade principal.
- **Horário de funcionamento e coordenadas:** acrescentar ao JSON-LD (`openingHoursSpecification` e `geo`) no `index.html`.
- **Perfis oficiais** (Instagram, Facebook): acrescentar em `sameAs` no JSON-LD quando existirem. O Instagram que aparece na busca (@jflocoficial) é de outra empresa, de Juiz de Fora.
- **Fotos e textos reais:** quanto mais específico (modelos, capacidades, obras atendidas), melhor. As páginas hoje usam descrições gerais de cada tipo de veículo e dizem que capacidade e carroceria são confirmadas na proposta.
- **E-mail e domínio:** o e-mail de contato é `@uol.com.br`. Um e-mail no domínio próprio (`contato@jflocacoes.com.br`) reforça a confiança.

## 4. Backlinks e presença local
- Cadastrar a empresa em diretórios locais e do setor (associações, guias de Aguaí e região).
- Pedir link a parceiros e clientes que tenham site.

## 5. Publicação
- Enviar a pasta inteira para a raiz da hospedagem.
- Confirmar que `https://jflocacoes.com.br/robots.txt` e `/sitemap.xml` abrem.
- No `.htaccess`, descomentar o bloco de redirecionamento para https/sem www depois de confirmar que o SSL está ativo (só vale para hospedagem Apache).
- Testar em https://pagespeed.web.dev/ e em https://search.google.com/test/rich-results.

Expectativa: de 2 a 4 meses para ver ganho consistente em buscas como "aluguel de caminhão em Aguaí".

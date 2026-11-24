# Arquitetura e etapas

## Etapa 1 — protótipo seguro
- Manifest V3 e content script limitado ao domínio do Emissor.
- Robô flutuante em Shadow DOM para evitar conflito visual com a aplicação.
- Contexto textual de tela obtido sob ação do usuário.
- Requisição à Edge Function existente `ai-assistant` do Supabase Academy.

## Etapa 2 — conhecimento do Manual
Mapear no projeto `nota-navigator-academy` como o Manual recupera aulas, prints e conhecimento aprovado. Reutilizar as mesmas fontes e permissões; não criar outra tabela ou outra IA. O contexto deve incluir apenas a aula/tópico pertinente à rota e ao problema.

## Etapa 3 — aprendizado coletivo com validação
A função compartilhada já registra interações e conhecimento em `assistant_interactions` e `assistant_knowledge`, além de ocorrências de erro. Conhecimento novo deve ser tratado como sugestão até revisão; respostas geradas automaticamente não devem ser promovidas como orientação fiscal oficial sem validação.

## Etapa 4 — visão assistida
Adicionar captura de aba somente após ação explícita do usuário e permissão do Chrome. Redigir informações pessoais antes de qualquer envio. Sem captura contínua.

## Etapa 5 — ações assistidas
Permitir preenchimento ou clique somente após autorização clara por ação. Nunca clicar em Emitir/Transmitir/Autorizar nem concluir a emissão automaticamente. Exibir revisão e pedir confirmação humana.

## Dados proibidos
Não coletar nem armazenar credenciais, PINs, chaves privadas, CPF/CNPJ completos, conteúdo integral de notas ou dados pessoais desnecessários.

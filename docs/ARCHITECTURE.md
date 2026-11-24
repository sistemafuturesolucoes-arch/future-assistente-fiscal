# Arquitetura e etapas

## Etapa 1 — protótipo implementado
- Manifest V3 e content script limitado ao domínio do Emissor.
- Robô flutuante em Shadow DOM.
- Contexto textual da tela obtido quando o usuário envia uma mensagem.
- Leitura das aulas publicadas e montagem de conhecimento equivalente a `buildKnowledge()` do Manual Academy.
- Cache local de conhecimento por 30 minutos.
- Chamada à Edge Function existente `ai-assistant` no projeto Supabase Academy.

## Etapa 2 — contexto da tela
A primeira versão envia rota, título, cabeçalhos, rótulos e alertas. Não lê valores dos campos nem captura a tela. O mascaramento de CPF, CNPJ e e-mail é uma proteção adicional, não uma garantia de anonimização.

## Etapa 3 — aprendizado coletivo com validação
A função compartilhada registra interações em `assistant_interactions` e grava conhecimento em `assistant_knowledge`, além de registrar ocorrências de erro. Foi verificado no schema que `assistant_knowledge.status` tem default `approved`; a função insere respostas sem definir status. Assim, o comportamento atual pode promover respostas geradas automaticamente para o conjunto consultável. Antes de distribuição, alterar o fluxo para `pending`/revisão administrativa e somente aprovar soluções verificadas. Essa alteração afeta também o assistente do Manual e exige cuidado.

## Etapa 4 — visão assistida
Adicionar captura de aba somente após ação explícita do usuário e permissão do Chrome. Redigir informações pessoais antes de qualquer envio. Sem captura contínua.

## Etapa 5 — ações assistidas
Permitir preenchimento ou clique somente após autorização clara por ação. Nunca clicar em Emitir/Transmitir/Autorizar nem concluir a emissão automaticamente. Exibir revisão e pedir confirmação humana.

## Segurança antes da distribuição
A Edge Function `ai-assistant` existente está atualmente com `verify_jwt=false`. Antes de distribuir a extensão para clientes, implementar autenticação apropriada, limites por identidade e proteção contra abuso, sem expor service_role ou segredos do provedor.

## Dados proibidos
Não coletar nem armazenar credenciais, PINs, chaves privadas, CPF/CNPJ completos, conteúdo integral de notas ou dados pessoais desnecessários.

# Publicação e atualização automática no Chrome

## Como funciona
O Chrome atualiza extensões instaladas pela Chrome Web Store automaticamente, conforme o ciclo de atualização do navegador. A extensão precisa manter o mesmo ID entre as versões. O código desta extensão grava um aviso local de versão quando recebe `chrome.runtime.onInstalled` com motivo `update`; o aviso aparece no chat depois que a atualização já foi instalada.

Instalações por **Carregar sem compactação** são para desenvolvimento e não participam do mecanismo normal de atualização da Chrome Web Store.

## Preparar o pacote
1. Faça merge/publicação das alterações na branch `main`.
2. Aguarde o workflow **Package Chrome Extension** concluir com sucesso.
3. Em Actions, abra a execução mais recente e baixe o artifact `future-assistente-fiscal-chrome`.
4. Use o ZIP baixado no painel do desenvolvedor da Chrome Web Store para enviar uma nova versão do mesmo item já publicado.
5. Complete as informações exigidas pela loja e envie a versão para revisão/publicação.

## Primeira publicação
1. Crie/acesse a conta de desenvolvedor Chrome Web Store.
2. Cadastre a extensão como um novo item e envie o pacote.
3. Configure nome, descrição, ícones, capturas de tela, categoria, política de privacidade e declarações de permissões.
4. Publique e anote o ID do item.
5. Distribua aos usuários o link oficial da loja, não o ZIP do repositório.

A conta de desenvolvedor pode exigir cadastro e taxa conforme as regras vigentes da Chrome Web Store. Confirme os requisitos no painel oficial antes de iniciar.

## Segurança e limites
- Nunca mude o ID da extensão depois da publicação.
- A notificação do chat informa a versão instalada; ela não baixa nem instala código por conta própria.
- Não use atualizador externo que execute código remoto dentro da extensão.
- Teste cada pacote em um perfil Chrome de homologação antes de publicar para todos os usuários.

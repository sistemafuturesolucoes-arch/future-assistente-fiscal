# Future Assistente Fiscal

Extensão Chrome (Manifest V3) para Windows e macOS que adiciona um assistente flutuante ao Emissor Fiscal Online.

## O que está implementado
- Robô flutuante e painel de conversa em Shadow DOM, restritos ao domínio do Emissor.
- Atalhos para orientar a conferência, conversar com a IA, identificar erros e abrir o Manual.
- Leitura de rota, títulos, rótulos, botões, mensagens de alerta e metadados dos campos visíveis. Não lê os valores digitados.
- Recuperação das 26 aulas publicadas do mesmo Supabase usado pelo Manual.
- Priorização de aulas conforme a rota atual. Na emissão de serviço, a aula de NFSe e seus pontos explicativos visuais são enviados antes do conteúdo geral.
- Contexto textual compacto: não envia URLs de imagens nem metadados visuais irrelevantes de todas as aulas. Preserva os textos e os hotspots da aula relacionada à tela, respeitando o limite de 58.000 caracteres da função compartilhada.
- Cache local por rota durante até cinco minutos.
- Após a resposta da IA, identifica nomes de campos e botões citados que também existem na tela e oferece **Mostrar pontos na tela**. O guia cria uma moldura brilhante, descrição, contador de etapas e controles Anterior/Próximo/Encerrar.
- A orientação visual apenas destaca e rola até os elementos; não clica, não preenche e não altera dados.

## Verificações automáticas
O GitHub Actions valida o JSON do Manifest e a sintaxe dos dois scripts JavaScript em cada push ou pull request para `main`.

## Instalação de desenvolvimento
1. Baixe o repositório como ZIP ou clone-o.
2. Abra `chrome://extensions`.
3. Ative **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação** e selecione a pasta do projeto.

## Integração compartilhada
- Manual: [https://crm.futuresolucoes.com.br/manual/](https://crm.futuresolucoes.com.br/manual/)
- Emissor: [https://sistema.emissorfiscalonline.com.br/app/notas/servico](https://sistema.emissorfiscalonline.com.br/app/notas/servico)
- Supabase Academy: `itbppoailqkuxajesgys`
- Edge Function compartilhada: `ai-assistant`

A extensão não cria uma segunda IA nem um segundo banco de conhecimento. Ela consulta as mesmas aulas publicadas do Manual e utiliza a função compartilhada.

## Limites e segurança
- O guia visual depende de o texto da resposta citar o rótulo que aparece na tela. Se o sistema não expuser o nome do elemento no DOM, ele poderá não ser localizado.
- Não captura imagens da tela nem executa cliques ou preenchimento.
- Não emite, transmite, salva ou altera documentos fiscais.
- A Edge Function existente está configurada com `verify_jwt=false`; autenticação, rate limit por identidade e proteção contra abuso precisam ser revisados antes de ampla distribuição.
- A tabela `assistant_knowledge` tem padrão `approved` no banco atual. O aprendizado automático não deve ser considerado validado; respostas fiscais precisam de revisão humana antes de serem tratadas como soluções oficiais.

## Privacidade
- Não lê valores de CPF/CNPJ, valores monetários, dados preenchidos da nota, senhas ou PINs.
- O contexto textual de alertas passa por mascaramento de CPF, CNPJ e e-mail, mas isso não garante anonimização completa. Não envie dados pessoais ou segredos na conversa.
- A chave incluída no cliente é a chave **publishable** já utilizada pelo Manual; nunca inclua service_role, chaves Gemini, senhas ou certificados no repositório público.

# Future Assistente Fiscal

Extensão Chrome (Manifest V3) para Windows e macOS que adiciona um assistente flutuante ao Emissor Fiscal Online.

## O que está implementado
- Robô flutuante e painel de conversa em Shadow DOM, restritos ao domínio do Emissor.
- Robô flutuante arrastável por mouse ou toque, com posição salva no armazenamento local da extensão e ajuste automático ao redimensionar a janela.
- Interface simplificada: conversa como ponto central e acesso discreto ao Manual, sem os quatro botões de ação que poluíam o painel.
- Leitura de rota, títulos, rótulos, botões, mensagens de alerta e metadados dos campos visíveis. Não lê os valores digitados.
- Recuperação das 26 aulas publicadas do mesmo Supabase usado pelo Manual.
- Priorização de aulas conforme a rota atual. Na emissão de serviço, a aula de NFSe e seus pontos explicativos visuais são enviados antes do conteúdo geral.
- Contexto textual compacto: não envia URLs de imagens nem metadados visuais irrelevantes de todas as aulas. Preserva os textos e os hotspots da aula relacionada à tela, respeitando o limite de 58.000 caracteres da função compartilhada.
- Cache local por rota durante até cinco minutos.
- Quando a resposta contém instruções acionáveis e cita elementos existentes na tela, a extensão inicia automaticamente a orientação visual, sem botão intermediário. O guia cria uma moldura brilhante, descrição, contador de etapas e controles Anterior/Próximo/Encerrar.
- A orientação visual reconhece rótulos associados por HTML/ARIA, atributos de dados, placeholders, títulos, grupos de formulário e componentes personalizados. Correspondências ambíguas não são escolhidas automaticamente.
- A orientação visual apenas destaca e rola até os elementos; não clica, não preenche e não altera dados.
- O monitor de erros observa alertas semânticos, mensagens de validação e alterações de texto no DOM. Filtra mensagens de sucesso e exige indícios de erro para não tratar qualquer texto vermelho como falha.
- Mensagens repetidas são deduplicadas por conteúdo; a análise automática aguarda uma conversa em andamento terminar, evitando requisições simultâneas. O diagnóstico usa o Manual compartilhado e apenas metadados seguros da tela.
- Alertas detectados podem abrir o chat, destacar temporariamente a mensagem e emitir cinco bipes quando o som está habilitado. O destaque da extensão desaparece ao começar a editar um campo ou após o tempo limite.

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
- O guia visual depende de o texto da resposta citar um rótulo reconhecível no DOM. Se o sistema não expuser nome, rótulo ou metadado acessível, ou se houver correspondências ambíguas, o elemento poderá não ser localizado.
- Não captura imagens da tela automaticamente nem executa cliques ou preenchimento. Prints e áudios só são enviados quando o usuário os anexa ou grava explicitamente.
- Quando a IA tiver base suficiente para sugerir um valor, pode apresentar uma proposta estruturada para um campo identificado pelo rótulo exato. O usuário precisa clicar em **Confirmar e preencher** antes de qualquer alteração. Campos sensíveis (CPF, CNPJ, e-mail, telefone, senha, PIN, token e certificado), campos ambíguos e componentes não suportados ficam bloqueados. A extensão não executa ações fiscais irreversíveis.
- Não emite, transmite, salva ou altera documentos fiscais.
- A Edge Function existente está configurada com `verify_jwt=false`; autenticação, rate limit por identidade e proteção contra abuso precisam ser revisados antes de ampla distribuição.
- A tabela `assistant_knowledge` tem padrão `approved` no banco atual. O aprendizado automático não deve ser considerado validado; respostas fiscais precisam de revisão humana antes de serem tratadas como soluções oficiais.

## Privacidade
- Não lê valores de CPF/CNPJ, valores monetários, dados preenchidos da nota, senhas ou PINs.
- O contexto textual de alertas passa por mascaramento de CPF, CNPJ e e-mail, mas isso não garante anonimização completa. Não envie dados pessoais ou segredos na conversa.
- A chave incluída no cliente é a chave **publishable** já utilizada pelo Manual; nunca inclua service_role, chaves Gemini, senhas ou certificados no repositório público.

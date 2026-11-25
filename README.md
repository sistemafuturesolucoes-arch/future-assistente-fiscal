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
- Cache local das aulas publicadas por rota durante até cinco minutos; a relevância é recalculada para cada pergunta.
- Quando a resposta contém instruções acionáveis e cita elementos existentes na tela, a extensão inicia automaticamente a orientação visual, sem botão intermediário. O guia cria uma moldura brilhante, descrição, contador de etapas e controles Anterior/Próximo/Encerrar.
- A orientação visual reconhece rótulos associados por HTML/ARIA, atributos de dados, placeholders, títulos, grupos de formulário e componentes personalizados. Correspondências ambíguas não são escolhidas automaticamente. As etapas são separadas por quebras de linha reais.
- A orientação visual apenas destaca e rola até os elementos; não clica, não preenche e não altera dados.
- A análise de mensagens de erro e validação só acontece quando o usuário clica em **Revisar documento**. A extensão não monitora erros automaticamente, não abre diagnósticos sozinha e não emite bipes por mensagens do Emissor.

## Verificações automáticas
O GitHub Actions valida o JSON do Manifest, a sintaxe dos scripts e executa testes automatizados do cache e da priorização contextual do Manual em cada push ou pull request para `main`.

## Carregamento da extensão\n- O Manifest carrega `src/knowledge.js` e `src/content.js` nas páginas do Emissor e usa `src/background.js` como service worker. O ícone da extensão abre o painel flutuante.\n\n## Instalação de desenvolvimento
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
- Quando a IA tiver base suficiente para sugerir um valor, pode apresentar uma proposta estruturada para um campo identificado pelo rótulo exato. O usuário precisa clicar em **Confirmar e preencher** antes de qualquer alteração. A sugestão é invalidada ao navegar para outra rota, opções de seleção exigem correspondência única e datas são validadas no calendário. Campos sensíveis (CPF, CNPJ, e-mail, telefone, senha, PIN, token e certificado), campos ambíguos e componentes não suportados ficam bloqueados. A extensão não executa ações fiscais irreversíveis.
- Não emite, transmite, salva ou altera documentos fiscais.
- A Edge Function pública continua com `verify_jwt=false` para permitir o uso pela extensão sem login. O limite de uso usa o IP de origem confiável `cf-connecting-ip`, falha de forma segura se a proteção não puder ser verificada e limita o corpo das mensagens. Isso é proteção por IP, não autenticação individual de usuário.
- As respostas novas de aprendizado entram como `pending`; as 65 respostas anteriores também foram reclassificadas como pendentes. Somente registros aprovados manualmente podem ser reutilizados como respostas compartilhadas.
- O aprendizado compartilhado não transforma uma resposta recém-gerada em solução oficial. Respostas pendentes aguardam revisão antes de serem disponibilizadas a outros usuários.

## Privacidade
- Não lê valores de CPF/CNPJ, valores monetários, dados preenchidos da nota, senhas ou PINs.
- O contexto textual de alertas passa por mascaramento de CPF, CNPJ e e-mail, mas isso não garante anonimização completa. Não envie dados pessoais ou segredos na conversa.
- A chave incluída no cliente é a chave **publishable** já utilizada pelo Manual; nunca inclua service_role, chaves Gemini, senhas ou certificados no repositório público.


## Navegação assistida e atualizações
- A navegação assistida consulta a IA uma vez para interpretar a intenção e montar, com base nos caminhos publicados no Manual, um roteiro de menus e submenus. Depois disso, o JavaScript local encontra e destaca cada próximo item, acompanha alterações do DOM e rotas SPA e avança após o clique do usuário, sem uma chamada de IA por etapa. A IA só é chamada novamente quando o próximo alvo não é encontrado com segurança ou a tela diverge do roteiro. O progresso é preservado durante navegações da mesma aba por até 20 minutos.
- A extensão não clica nem executa ações fiscais pelo usuário. Ações irreversíveis como emitir, transmitir, autorizar e encerrar continuam sob controle humano.
- A notificação interna de versão aparece depois que o Chrome instala uma atualização oficial. Para distribuição com atualização automática, publique a extensão na Chrome Web Store e mantenha o mesmo ID de extensão. A instalação de desenvolvimento por “Carregar sem compactação” não recebe atualizações automáticas da Web Store.
- O Chrome gerencia a verificação e instalação das atualizações da Web Store; o aviso dentro do chat apenas informa a versão que já foi instalada, não substitui o mecanismo oficial de atualização.

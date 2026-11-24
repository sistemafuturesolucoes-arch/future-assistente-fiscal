# Future Assistente Fiscal

Extensão Chrome (Manifest V3) para Windows e macOS que adiciona um assistente flutuante ao Emissor Fiscal Online.

## O que já está implementado
- Robô flutuante e painel de conversa em Shadow DOM.
- Injeção restrita a `https://sistema.emissorfiscalonline.com.br/*`.
- Atalhos: **Revisar minha nota**, **Conversar com a IA**, **Identificar erro** e **Abrir manual**.
- Leitura de rota, títulos, rótulos e mensagens de alerta; não coleta valores digitados nos campos.
- Recuperação das aulas e prints publicados no Supabase Academy usando a mesma chave publishable e as mesmas tabelas públicas do Manual.
- Montagem do contexto no mesmo formato usado pelo Manual, limitado a 60.000 caracteres e armazenado localmente por 30 minutos.
- Conversa com a Edge Function compartilhada `ai-assistant`; nenhuma IA ou banco paralelo foi criado.

## Instalação de desenvolvimento
1. Baixe o repositório como ZIP ou clone-o.
2. Abra `chrome://extensions`.
3. Ative **Modo do desenvolvedor**.
4. Clique **Carregar sem compactação** e selecione a pasta do projeto.

## Integração compartilhada
- Manual: [https://crm.futuresolucoes.com.br/manual/](https://crm.futuresolucoes.com.br/manual/)
- Emissor: [https://sistema.emissorfiscalonline.com.br/app/notas/servico](https://sistema.emissorfiscalonline.com.br/app/notas/servico)
- Supabase Academy: `itbppoailqkuxajesgys`
- Edge Function: `ai-assistant`

A função compartilhada registra interações e conhecimento conforme a implementação existente no Academy. Atenção: no estado atual, a coluna `assistant_knowledge.status` tem padrão `approved`, e a função insere respostas sem definir outro status. Portanto, novas respostas podem entrar automaticamente no conjunto reutilizado. Isso precisa ser alterado para uma fila de revisão antes da distribuição a clientes.

## Limites desta versão
- Ainda não captura imagens da tela nem executa cliques ou preenchimento.
- O botão **Revisar minha nota** inicia uma orientação conversacional; não faz auditoria dos valores preenchidos.
- Não emite, transmite, salva ou altera documentos fiscais.
- A integração usa a Edge Function já existente, que está configurada atualmente com `verify_jwt=false`. Antes de distribuir amplamente, é necessário revisar autenticação, rate limit por usuário e controles contra abuso.

## Privacidade
- Não lê valores dos campos de CPF/CNPJ, valores monetários, dados da nota, senhas ou PINs.
- Contexto textual de alertas passa por mascaramento de CPF, CNPJ e e-mail antes do envio; mesmo assim, não envie dados pessoais ou segredos na conversa.
- Captura de imagem deverá ser opcional, iniciada pelo usuário e com aviso de privacidade.
- A chave incluída no cliente é a chave **publishable** já utilizada pelo Manual; nunca inclua service_role, chaves Gemini, senhas ou certificados no repositório público.

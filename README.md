# Future Assistente Fiscal

Extensão Chrome (Manifest V3) para Windows e macOS que adiciona um assistente flutuante ao Emissor Fiscal Online.

## Escopo inicial
- Funciona somente em `https://sistema.emissorfiscalonline.com.br/*`.
- Robô flutuante com painel de conversa.
- Lê contexto textual básico da tela (título, rota, rótulos e mensagens de erro), sem capturar a tela continuamente.
- Envia a pergunta e o contexto para a Edge Function compartilhada `ai-assistant` do projeto Academy existente.
- Não contém chaves privadas, service-role ou chaves Gemini.
- Não emite, transmite, salva ou altera documentos fiscais.

## Instalação de desenvolvimento
1. Baixe/clonar este repositório.
2. Abra `chrome://extensions`.
3. Ative **Modo do desenvolvedor**.
4. Clique **Carregar sem compactação** e selecione a pasta do projeto.

## Privacidade e segurança
- A extensão injeta código apenas no domínio do Emissor autorizado.
- A leitura do DOM é limitada a metadados textuais úteis para suporte.
- Não lê valores de campos de CPF/CNPJ, valores monetários, dados de notas, senhas ou PINs.
- Captura de imagem e automação de cliques ainda não estão habilitadas.
- A IA pode orientar, mas não substitui a contabilidade nem valida/autorizada documentos fiscais.

## Integração compartilhada
Projeto Supabase Academy: `itbppoailqkuxajesgys`
Edge Function compartilhada: `ai-assistant`
Endpoint: `https://itbppoailqkuxajesgys.supabase.co/functions/v1/ai-assistant`

A extensão reutiliza a função existente, que já registra interações e conhecimento compartilhado no banco Academy. A recuperação de aulas e conhecimento aprovado do manual será conectada após mapear o mecanismo público já usado pelo Manual, sem duplicar banco ou IA.

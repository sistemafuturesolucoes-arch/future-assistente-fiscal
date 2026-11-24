# Arquitetura e etapas

## Implementado
- Manifest V3 e content script limitado ao domínio do Emissor Fiscal Online.
- Robô flutuante em Shadow DOM.
- Contexto textual da tela obtido quando o usuário envia uma mensagem, sem ler valores dos campos.
- Recuperação das 26 aulas publicadas do Supabase Academy compartilhado com o Manual.
- Ordenação contextual por rota e pergunta. A rota de emissão de serviço prioriza a aula de NFSe.
- Textos-base das aulas são mantidos no contexto; hotspots e descrições visuais detalhados são incluídos prioritariamente para as aulas relevantes, sem desperdiçar o limite com URLs de imagens.
- Cache por rota com validade de cinco minutos.
- Guia visual no DOM: identifica campos/botões citados na resposta, destaca o elemento com contorno luminoso e apresenta descrição e navegação Anterior/Próximo/Encerrar.

## Limites do guia visual
A localização usa os rótulos, labels, placeholders, nomes acessíveis e textos dos controles presentes no DOM. Se o Emissor renderizar um controle sem rótulo acessível, será necessário mapear esse componente especificamente. O guia pode rolar a página para centralizar o elemento, mas não clica nem altera seu conteúdo.

## Privacidade e segurança
A primeira versão envia apenas rota, títulos, rótulos, alertas e metadados de campos. Não lê valores preenchidos nem captura a tela. O mascaramento de CPF, CNPJ e e-mail é uma proteção adicional, não uma garantia de anonimização.

A função compartilhada `ai-assistant` registra interações e conhecimento no projeto Academy. O schema atual tem `assistant_knowledge.status` com default `approved`, e a função pode inserir respostas sem outro status. Portanto, o conhecimento automático não deve ser tratado como solução fiscal validada. A revisão/moderação precisa ser corrigida com cuidado porque a função é compartilhada com o Manual.

A Edge Function está atualmente com `verify_jwt=false`. Antes de distribuir amplamente, revisar autenticação, limites por identidade e controles contra abuso sem expor service_role ou segredos do provedor.

## Próximas etapas
1. Testar no Chrome as rotas de NFSe, cadastro de serviço e outras telas.
2. Mapear controles que não tenham labels acessíveis para melhorar a localização visual.
3. Implementar captura de tela somente mediante ação explícita e permissão do Chrome, com redação de informações pessoais.
4. Evoluir para ações assistidas somente após autorização por ação. Nunca clicar em Emitir/Transmitir/Autorizar nem concluir a emissão automaticamente.

## Dados proibidos
Não coletar nem armazenar credenciais, PINs, chaves privadas, CPF/CNPJ completos, conteúdo integral de notas ou dados pessoais desnecessários.

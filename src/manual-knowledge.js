/* Base local do Manual Future. Gerada a partir do conteúdo publicado; não contém dados de clientes. */
window.FutureManualBundle = {
  "version": "2026-11-26.1",
  "source": "Manual Future — conteúdo publicado exportado para uso local na extensão",
  "modules": [
    {
      "id": "primeiros-passos",
      "title": "Primeiros passos",
      "description": "Entrar no sistema e entender o painel principal.",
      "position": 0
    },
    {
      "id": "cadastros",
      "title": "Cadastros",
      "description": "Produtos, serviços e clientes: a base de todas as notas.",
      "position": 1
    },
    {
      "id": "documentos",
      "title": "Emitindo documentos",
      "description": "NF-e, NFC-e, NFS-e, CT-e e MDF-e passo a passo.",
      "position": 2
    },
    {
      "id": "relatorios",
      "title": "Relatórios",
      "description": "Conferência das emissões e envio para a contabilidade.",
      "position": 3
    },
    {
      "id": "configuracoes",
      "title": "Configurações",
      "description": "Certificado digital, dados da empresa e numeração das notas.",
      "position": 4
    }
  ],
  "lessons": [
    {
      "id": "login",
      "module_id": "primeiros-passos",
      "title": "Entrando no sistema",
      "summary": "Como acessar o Emissor Future com seu CPF ou e-mail e recuperar a senha.",
      "path": "Tela inicial",
      "content": "Para entrar no Emissor Future você precisa do **CPF ou e-mail** cadastrado e da sua **senha**.\n\n1. Digite seu CPF (só números) ou e-mail.\n2. Digite sua senha.\n3. Clique em **Entrar**.\n\nEsqueceu a senha? Clique em **Esqueci minha senha** e siga as instruções que chegam no seu e-mail.",
      "hotspots": [
        {
          "h": 5.6,
          "w": 25.6,
          "x": 37.2,
          "y": 48,
          "id": "login-usuario",
          "tip": "Se o navegador já preencheu automaticamente, confira se é o usuário certo.",
          "title": "CPF ou E-mail",
          "description": "Campo onde você informa o seu usuário de acesso. Pode ser o seu CPF (somente números) ou o e-mail que foi cadastrado para você."
        },
        {
          "h": 5.6,
          "w": 25.6,
          "x": 37.2,
          "y": 55.6,
          "id": "login-senha",
          "tip": "Atenção a letras maiúsculas e minúsculas.",
          "title": "Senha",
          "description": "Digite a sua senha pessoal. Os caracteres aparecem como pontinhos por segurança."
        },
        {
          "h": 3.4,
          "w": 7.6,
          "x": 37.2,
          "y": 64,
          "id": "login-esqueci",
          "title": "Esqueci minha senha",
          "description": "Abre a recuperação de senha. Você informa o e-mail cadastrado e recebe um link para criar uma nova senha."
        },
        {
          "h": 5.6,
          "w": 6.8,
          "x": 56.1,
          "y": 63.3,
          "id": "login-entrar",
          "title": "Entrar",
          "description": "Confirma o acesso. Se os dados estiverem corretos, você é levado ao Painel (Dashboard) da empresa."
        }
      ],
      "screenshots": [
        {
          "id": "screen-login",
          "caption": "",
          "hotspots": [
            {
              "h": 5.6,
              "w": 25.6,
              "x": 37.2,
              "y": 48,
              "id": "login-usuario",
              "tip": "Se o navegador já preencheu automaticamente, confira se é o usuário certo.",
              "title": "CPF ou E-mail",
              "description": "Campo onde você informa o seu usuário de acesso. Pode ser o seu CPF (somente números) ou o e-mail que foi cadastrado para você."
            },
            {
              "h": 5.6,
              "w": 25.6,
              "x": 37.2,
              "y": 55.6,
              "id": "login-senha",
              "tip": "Atenção a letras maiúsculas e minúsculas.",
              "title": "Senha",
              "description": "Digite a sua senha pessoal. Os caracteres aparecem como pontinhos por segurança."
            },
            {
              "h": 3.4,
              "w": 7.6,
              "x": 37.2,
              "y": 64,
              "id": "login-esqueci",
              "title": "Esqueci minha senha",
              "description": "Abre a recuperação de senha. Você informa o e-mail cadastrado e recebe um link para criar uma nova senha."
            },
            {
              "h": 5.6,
              "w": 6.8,
              "x": 56.1,
              "y": 63.3,
              "id": "login-entrar",
              "title": "Entrar",
              "description": "Confirma o acesso. Se os dados estiverem corretos, você é levado ao Painel (Dashboard) da empresa."
            }
          ]
        }
      ],
      "position": 0
    },
    {
      "id": "dashboard",
      "module_id": "primeiros-passos",
      "title": "Conhecendo o Painel (Dashboard)",
      "summary": "A tela inicial: atalhos para emitir cada tipo de nota, gráfico de emissões e últimos documentos.",
      "path": "Menu lateral > Dashboard",
      "content": "O **Dashboard** é a primeira tela depois do login. Ele mostra um resumo da empresa selecionada:\n\n- **Cartões de documentos**: quantas notas de cada tipo já foram emitidas, com um botão para emitir uma nova.\n- **Emissões mensais**: gráfico com a quantidade de documentos por mês.\n- **Últimos documentos**: as notas mais recentes, com data, tipo, cliente e valor.\n\nPelo **menu lateral roxo** você acessa todas as áreas: Dashboard, Cadastros, Documentos, Relatórios e Configurações.",
      "hotspots": [
        {
          "h": 5,
          "w": 14.2,
          "x": 4.9,
          "y": 1.4,
          "id": "dash-empresa",
          "tip": "Antes de emitir uma nota, sempre confira se a empresa certa está selecionada.",
          "title": "Seletor de Empresa",
          "description": "Mostra a empresa em que você está trabalhando (CNPJ e nome). Clique para trocar de empresa caso você tenha acesso a mais de uma. Tudo que você emitir ou cadastrar vale para a empresa selecionada."
        },
        {
          "h": 22,
          "w": 9.6,
          "x": 88.8,
          "y": 2,
          "id": "dash-usuario",
          "title": "Menu do usuário",
          "description": "Clique no seu nome para abrir: **Meus dados** (seu perfil e senha), **Minhas Empresas** (empresas que você acessa) e **Sair** (encerra a sessão com segurança)."
        },
        {
          "h": 17,
          "w": 5,
          "x": 0,
          "y": 7.6,
          "id": "dash-menu-dashboard",
          "title": "Menu: Dashboard",
          "description": "Volta para esta tela inicial a qualquer momento."
        },
        {
          "h": 13.6,
          "w": 5,
          "x": 0,
          "y": 27,
          "id": "dash-menu-cadastros",
          "title": "Menu: Cadastros",
          "description": "Abre os cadastros básicos: Produtos, Serviços, Clientes, Veículos, Condutores, Natureza de Operação e Grupo Tributário."
        },
        {
          "h": 12.2,
          "w": 5,
          "x": 0,
          "y": 45.4,
          "id": "dash-menu-documentos",
          "title": "Menu: Documentos",
          "description": "Área para emitir, consultar, cancelar e baixar as notas fiscais (NF-e, NFC-e, NFS-e, CT-e, CT-e OS e MDF-e)."
        },
        {
          "h": 12.2,
          "w": 5,
          "x": 0,
          "y": 62.4,
          "id": "dash-menu-relatorios",
          "title": "Menu: Relatórios",
          "description": "Relatórios das emissões, vendas e documentos para conferência e envio à contabilidade."
        },
        {
          "h": 12.2,
          "w": 5,
          "x": 0,
          "y": 79.2,
          "id": "dash-menu-config",
          "title": "Menu: Configurações",
          "description": "Dados da empresa, certificado digital, séries e numeração das notas e demais ajustes do emissor."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 6.4,
          "y": 16.4,
          "id": "dash-nfe",
          "title": "Notas Eletrônicas (NF-e)",
          "description": "Total de NF-e (modelo 55) emitidas. É a nota usada principalmente na venda de mercadorias para empresas ou para outros estados. O botão **Emitir NFe** abre uma nova nota."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 29.6,
          "y": 16.4,
          "id": "dash-nfce",
          "title": "Notas Consumidor (NFC-e)",
          "description": "Total de NFC-e (modelo 65) emitidas. É a nota do varejo, emitida na venda direta ao consumidor final, como um cupom. O botão **Emitir NFCe** abre uma nova venda."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 52.8,
          "y": 16.4,
          "id": "dash-nfse",
          "title": "Notas Serviço (NFS-e)",
          "description": "Total de notas de serviço emitidas. Use quando a empresa presta serviços (e não vende mercadorias). Botão **Emitir NFSe** abre uma nova nota de serviço."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 76,
          "y": 16.4,
          "id": "dash-cte",
          "title": "Conhecimento de Transporte (CT-e)",
          "description": "Documento de quem faz transporte de cargas. Registra o frete de uma mercadoria de um lugar para outro. Botão **Emitir CTe**."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 6.4,
          "y": 28.8,
          "id": "dash-cteos",
          "title": "CT-e Outros Serviços (CT-e OS)",
          "description": "Usado no transporte de pessoas, valores ou bagagens (por exemplo, fretamento e turismo). Botão **Emitir CTeOS**."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 29.6,
          "y": 28.8,
          "id": "dash-mdfe",
          "title": "Manifesto de Documentos (MDF-e)",
          "description": "Agrupa as notas e conhecimentos que vão juntos em uma mesma viagem, informando veículo, condutor e percurso. Botão **Emitir MDFe**."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 52.8,
          "y": 28.8,
          "id": "dash-clientes",
          "title": "Clientes",
          "description": "Quantidade de clientes cadastrados. O botão **Novo Cliente** abre o cadastro direto daqui."
        },
        {
          "h": 10.8,
          "w": 22.5,
          "x": 76,
          "y": 28.8,
          "id": "dash-produtos",
          "title": "Produtos",
          "description": "Quantidade de produtos cadastrados. O botão **Novo Produto** abre o cadastro direto daqui."
        },
        {
          "h": 46.6,
          "w": 45.3,
          "x": 6.4,
          "y": 41,
          "id": "dash-grafico",
          "title": "Emissões mensais",
          "description": "Gráfico com a quantidade de documentos emitidos em cada mês. Ajuda a acompanhar o movimento da empresa ao longo do ano."
        },
        {
          "h": 46.6,
          "w": 45.3,
          "x": 52.8,
          "y": 41,
          "id": "dash-ultimos",
          "tip": "Role a lista para ver mais documentos.",
          "title": "Últimos Documentos",
          "description": "Lista das notas mais recentes com data, tipo, cliente e valor. O ícone de link ao final da linha abre o documento para consulta."
        }
      ],
      "screenshots": [
        {
          "id": "screen-dashboard",
          "caption": "",
          "hotspots": [
            {
              "h": 5,
              "w": 14.2,
              "x": 4.9,
              "y": 1.4,
              "id": "dash-empresa",
              "tip": "Antes de emitir uma nota, sempre confira se a empresa certa está selecionada.",
              "title": "Seletor de Empresa",
              "description": "Mostra a empresa em que você está trabalhando (CNPJ e nome). Clique para trocar de empresa caso você tenha acesso a mais de uma. Tudo que você emitir ou cadastrar vale para a empresa selecionada."
            },
            {
              "h": 22,
              "w": 9.6,
              "x": 88.8,
              "y": 2,
              "id": "dash-usuario",
              "title": "Menu do usuário",
              "description": "Clique no seu nome para abrir: **Meus dados** (seu perfil e senha), **Minhas Empresas** (empresas que você acessa) e **Sair** (encerra a sessão com segurança)."
            },
            {
              "h": 17,
              "w": 5,
              "x": 0,
              "y": 7.6,
              "id": "dash-menu-dashboard",
              "title": "Menu: Dashboard",
              "description": "Volta para esta tela inicial a qualquer momento."
            },
            {
              "h": 13.6,
              "w": 5,
              "x": 0,
              "y": 27,
              "id": "dash-menu-cadastros",
              "title": "Menu: Cadastros",
              "description": "Abre os cadastros básicos: Produtos, Serviços, Clientes, Veículos, Condutores, Natureza de Operação e Grupo Tributário."
            },
            {
              "h": 12.2,
              "w": 5,
              "x": 0,
              "y": 45.4,
              "id": "dash-menu-documentos",
              "title": "Menu: Documentos",
              "description": "Área para emitir, consultar, cancelar e baixar as notas fiscais (NF-e, NFC-e, NFS-e, CT-e, CT-e OS e MDF-e)."
            },
            {
              "h": 12.2,
              "w": 5,
              "x": 0,
              "y": 62.4,
              "id": "dash-menu-relatorios",
              "title": "Menu: Relatórios",
              "description": "Relatórios das emissões, vendas e documentos para conferência e envio à contabilidade."
            },
            {
              "h": 12.2,
              "w": 5,
              "x": 0,
              "y": 79.2,
              "id": "dash-menu-config",
              "title": "Menu: Configurações",
              "description": "Dados da empresa, certificado digital, séries e numeração das notas e demais ajustes do emissor."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 6.4,
              "y": 16.4,
              "id": "dash-nfe",
              "title": "Notas Eletrônicas (NF-e)",
              "description": "Total de NF-e (modelo 55) emitidas. É a nota usada principalmente na venda de mercadorias para empresas ou para outros estados. O botão **Emitir NFe** abre uma nova nota."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 29.6,
              "y": 16.4,
              "id": "dash-nfce",
              "title": "Notas Consumidor (NFC-e)",
              "description": "Total de NFC-e (modelo 65) emitidas. É a nota do varejo, emitida na venda direta ao consumidor final, como um cupom. O botão **Emitir NFCe** abre uma nova venda."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 52.8,
              "y": 16.4,
              "id": "dash-nfse",
              "title": "Notas Serviço (NFS-e)",
              "description": "Total de notas de serviço emitidas. Use quando a empresa presta serviços (e não vende mercadorias). Botão **Emitir NFSe** abre uma nova nota de serviço."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 76,
              "y": 16.4,
              "id": "dash-cte",
              "title": "Conhecimento de Transporte (CT-e)",
              "description": "Documento de quem faz transporte de cargas. Registra o frete de uma mercadoria de um lugar para outro. Botão **Emitir CTe**."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 6.4,
              "y": 28.8,
              "id": "dash-cteos",
              "title": "CT-e Outros Serviços (CT-e OS)",
              "description": "Usado no transporte de pessoas, valores ou bagagens (por exemplo, fretamento e turismo). Botão **Emitir CTeOS**."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 29.6,
              "y": 28.8,
              "id": "dash-mdfe",
              "title": "Manifesto de Documentos (MDF-e)",
              "description": "Agrupa as notas e conhecimentos que vão juntos em uma mesma viagem, informando veículo, condutor e percurso. Botão **Emitir MDFe**."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 52.8,
              "y": 28.8,
              "id": "dash-clientes",
              "title": "Clientes",
              "description": "Quantidade de clientes cadastrados. O botão **Novo Cliente** abre o cadastro direto daqui."
            },
            {
              "h": 10.8,
              "w": 22.5,
              "x": 76,
              "y": 28.8,
              "id": "dash-produtos",
              "title": "Produtos",
              "description": "Quantidade de produtos cadastrados. O botão **Novo Produto** abre o cadastro direto daqui."
            },
            {
              "h": 46.6,
              "w": 45.3,
              "x": 6.4,
              "y": 41,
              "id": "dash-grafico",
              "title": "Emissões mensais",
              "description": "Gráfico com a quantidade de documentos emitidos em cada mês. Ajuda a acompanhar o movimento da empresa ao longo do ano."
            },
            {
              "h": 46.6,
              "w": 45.3,
              "x": 52.8,
              "y": 41,
              "id": "dash-ultimos",
              "tip": "Role a lista para ver mais documentos.",
              "title": "Últimos Documentos",
              "description": "Lista das notas mais recentes com data, tipo, cliente e valor. O ícone de link ao final da linha abre o documento para consulta."
            }
          ]
        }
      ],
      "position": 1
    },
    {
      "id": "menu-cadastros",
      "module_id": "cadastros",
      "title": "O menu Cadastros",
      "summary": "Onde ficam todos os cadastros que alimentam as suas notas.",
      "path": "Menu lateral > Cadastros",
      "content": "Ao clicar em **Cadastros** no menu lateral, abre uma lista com todos os cadastros do sistema. Eles são a base das notas: quanto melhor preenchidos, mais rápida e sem erros fica a emissão.\n\n> Dica: cadastre primeiro os **Grupos Tributários** e a **Natureza de Operação**, depois Produtos e Clientes.",
      "hotspots": [
        {
          "h": 17,
          "w": 5,
          "x": 0,
          "y": 24,
          "id": "menu-cad-botao",
          "title": "Botão Cadastros",
          "description": "Clique aqui para abrir ou fechar a lista de cadastros."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 10.5,
          "id": "menu-produtos",
          "title": "Produtos",
          "description": "Mercadorias que você vende, com preço, unidade, NCM e tributação."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 16,
          "id": "menu-servicos",
          "title": "Serviços",
          "description": "Serviços que você presta, usados na nota de serviço (NFS-e)."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 21.6,
          "id": "menu-clientes",
          "title": "Clientes",
          "description": "Pessoas e empresas para quem você emite notas. Também é onde se cadastram fornecedores e transportadoras."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 27,
          "id": "menu-veiculos",
          "title": "Veículos",
          "description": "Veículos usados no transporte (placa, RENAVAM, tipo). Necessários para CT-e e MDF-e."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 32.6,
          "id": "menu-condutores",
          "title": "Condutores",
          "description": "Motoristas que conduzem os veículos, com nome e CPF. Usados no MDF-e."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 38.2,
          "id": "menu-natureza",
          "title": "Natureza de Operação",
          "description": "Descreve o tipo da operação da nota: venda, devolução, remessa, bonificação etc. Define o CFOP utilizado."
        },
        {
          "h": 4.6,
          "w": 11,
          "x": 5.2,
          "y": 43.8,
          "id": "menu-grupo",
          "title": "Grupo Tributário",
          "description": "Conjunto de regras de impostos (CST/CSOSN, alíquotas) que você aplica aos produtos. Evita configurar imposto produto por produto."
        }
      ],
      "screenshots": [
        {
          "id": "screen-menu-cadastros",
          "caption": "",
          "hotspots": [
            {
              "h": 17,
              "w": 5,
              "x": 0,
              "y": 24,
              "id": "menu-cad-botao",
              "title": "Botão Cadastros",
              "description": "Clique aqui para abrir ou fechar a lista de cadastros."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 10.5,
              "id": "menu-produtos",
              "title": "Produtos",
              "description": "Mercadorias que você vende, com preço, unidade, NCM e tributação."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 16,
              "id": "menu-servicos",
              "title": "Serviços",
              "description": "Serviços que você presta, usados na nota de serviço (NFS-e)."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 21.6,
              "id": "menu-clientes",
              "title": "Clientes",
              "description": "Pessoas e empresas para quem você emite notas. Também é onde se cadastram fornecedores e transportadoras."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 27,
              "id": "menu-veiculos",
              "title": "Veículos",
              "description": "Veículos usados no transporte (placa, RENAVAM, tipo). Necessários para CT-e e MDF-e."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 32.6,
              "id": "menu-condutores",
              "title": "Condutores",
              "description": "Motoristas que conduzem os veículos, com nome e CPF. Usados no MDF-e."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 38.2,
              "id": "menu-natureza",
              "title": "Natureza de Operação",
              "description": "Descreve o tipo da operação da nota: venda, devolução, remessa, bonificação etc. Define o CFOP utilizado."
            },
            {
              "h": 4.6,
              "w": 11,
              "x": 5.2,
              "y": 43.8,
              "id": "menu-grupo",
              "title": "Grupo Tributário",
              "description": "Conjunto de regras de impostos (CST/CSOSN, alíquotas) que você aplica aos produtos. Evita configurar imposto produto por produto."
            }
          ]
        }
      ],
      "position": 2
    },
    {
      "id": "produtos-lista",
      "module_id": "cadastros",
      "title": "Lista de Produtos",
      "summary": "Pesquisar, filtrar, editar e criar produtos.",
      "path": "Cadastros > Produtos",
      "content": "Aqui aparecem todos os produtos da empresa. Cada linha mostra **Código**, **Descrição**, **Preço**, **Unidade de medida** e a situação (**Ativo**).\n\nPara cadastrar um produto novo, clique em **Novo Produto** no canto superior direito.",
      "hotspots": [
        {
          "h": 3.8,
          "w": 10.6,
          "x": 6,
          "y": 14.6,
          "id": "prod-ordenar",
          "title": "Ordenar por",
          "description": "Escolhe a ordem da lista: por data de cadastro, código, descrição ou preço."
        },
        {
          "h": 3.8,
          "w": 9,
          "x": 16.6,
          "y": 14.6,
          "id": "prod-procurar",
          "title": "Procurar",
          "description": "Digite parte do nome ou código para encontrar um produto rapidamente."
        },
        {
          "h": 3.8,
          "w": 7.5,
          "x": 25.7,
          "y": 14.6,
          "id": "prod-busca",
          "title": "Busca Avançada",
          "description": "Abre filtros extras, como situação (ativo/inativo), categoria e faixa de preço."
        },
        {
          "h": 5.2,
          "w": 7.7,
          "x": 80.6,
          "y": 14,
          "id": "prod-opcoes",
          "title": "Opções (geral)",
          "description": "Ações para a lista toda, como exportar ou importar produtos."
        },
        {
          "h": 5.2,
          "w": 9.4,
          "x": 88.2,
          "y": 14,
          "id": "prod-novo",
          "title": "Novo Produto",
          "description": "Abre o formulário para cadastrar um novo produto."
        },
        {
          "h": 7.4,
          "w": 74.8,
          "x": 6,
          "y": 24.4,
          "id": "prod-linha",
          "title": "Linha do produto",
          "description": "Mostra Código, Descrição, Preço e Unidade de medida. Clique na linha para abrir e editar o produto."
        },
        {
          "h": 3.4,
          "w": 3.6,
          "x": 82,
          "y": 26.2,
          "id": "prod-ativo",
          "title": "Situação: Ativo",
          "description": "Indica que o produto pode ser usado nas notas. Produtos inativos não aparecem na emissão, mas continuam no histórico."
        },
        {
          "h": 4.8,
          "w": 5,
          "x": 91.4,
          "y": 25.6,
          "id": "prod-linha-opcoes",
          "title": "Opções do produto",
          "description": "Menu de ações do produto: editar, duplicar, inativar ou excluir."
        }
      ],
      "screenshots": [
        {
          "id": "screen-produtos-lista",
          "caption": "",
          "hotspots": [
            {
              "h": 3.8,
              "w": 10.6,
              "x": 6,
              "y": 14.6,
              "id": "prod-ordenar",
              "title": "Ordenar por",
              "description": "Escolhe a ordem da lista: por data de cadastro, código, descrição ou preço."
            },
            {
              "h": 3.8,
              "w": 9,
              "x": 16.6,
              "y": 14.6,
              "id": "prod-procurar",
              "title": "Procurar",
              "description": "Digite parte do nome ou código para encontrar um produto rapidamente."
            },
            {
              "h": 3.8,
              "w": 7.5,
              "x": 25.7,
              "y": 14.6,
              "id": "prod-busca",
              "title": "Busca Avançada",
              "description": "Abre filtros extras, como situação (ativo/inativo), categoria e faixa de preço."
            },
            {
              "h": 5.2,
              "w": 7.7,
              "x": 80.6,
              "y": 14,
              "id": "prod-opcoes",
              "title": "Opções (geral)",
              "description": "Ações para a lista toda, como exportar ou importar produtos."
            },
            {
              "h": 5.2,
              "w": 9.4,
              "x": 88.2,
              "y": 14,
              "id": "prod-novo",
              "title": "Novo Produto",
              "description": "Abre o formulário para cadastrar um novo produto."
            },
            {
              "h": 7.4,
              "w": 74.8,
              "x": 6,
              "y": 24.4,
              "id": "prod-linha",
              "title": "Linha do produto",
              "description": "Mostra Código, Descrição, Preço e Unidade de medida. Clique na linha para abrir e editar o produto."
            },
            {
              "h": 3.4,
              "w": 3.6,
              "x": 82,
              "y": 26.2,
              "id": "prod-ativo",
              "title": "Situação: Ativo",
              "description": "Indica que o produto pode ser usado nas notas. Produtos inativos não aparecem na emissão, mas continuam no histórico."
            },
            {
              "h": 4.8,
              "w": 5,
              "x": 91.4,
              "y": 25.6,
              "id": "prod-linha-opcoes",
              "title": "Opções do produto",
              "description": "Menu de ações do produto: editar, duplicar, inativar ou excluir."
            }
          ]
        }
      ],
      "position": 3
    },
    {
      "id": "produto-dados",
      "module_id": "cadastros",
      "title": "Cadastrar produto: Dados do Produto",
      "summary": "Cada campo da primeira aba do cadastro de produto, explicado.",
      "path": "Cadastros > Produtos > Novo Produto",
      "content": "O cadastro de produto tem 3 abas: **Dados do Produto**, **Tributação** e **Outras informações**.\n\n**Passo a passo para cadastrar um produto:**\n1. Vá em **Cadastros > Produtos** e clique em **Novo Produto**.\n2. Preencha **Descrição**, **Un. Medida** e **Preço Unitário**.\n3. Informe o **NCM** (use a lupa para pesquisar).\n4. Se tiver, informe o **Código de Barras (EAN)** e o **CEST**.\n5. Vá na aba **Tributação** e escolha o **Grupo Tributário** e a **Origem**.\n6. Clique em **Salvar**.",
      "hotspots": [
        {
          "h": 5,
          "w": 9.2,
          "x": 6.2,
          "y": 16.8,
          "id": "pd-aba-dados",
          "title": "Aba Dados do Produto",
          "description": "Informações gerais do produto: nome, preço, códigos e categoria."
        },
        {
          "h": 5,
          "w": 6.6,
          "x": 15.3,
          "y": 16.8,
          "id": "pd-aba-trib",
          "title": "Aba Tributação",
          "description": "Define como os impostos são calculados para este produto (Grupo Tributário e Origem)."
        },
        {
          "h": 5,
          "w": 9.2,
          "x": 22,
          "y": 16.8,
          "id": "pd-aba-outras",
          "title": "Aba Outras informações",
          "description": "Dados complementares do produto, como observações e informações adicionais para a nota."
        },
        {
          "h": 23.6,
          "w": 10.4,
          "x": 9.4,
          "y": 32.6,
          "id": "pd-imagem",
          "title": "Imagem do Produto",
          "description": "Clique ou arraste uma foto do produto. Ajuda a identificar o item, mas não é obrigatória."
        },
        {
          "h": 7.6,
          "w": 3.8,
          "x": 23.3,
          "y": 32.4,
          "id": "pd-ativo",
          "title": "Ativo",
          "description": "Ligado (roxo) = o produto pode ser usado nas notas. Desligue para esconder o produto sem perder o histórico."
        },
        {
          "h": 5.4,
          "w": 11.8,
          "x": 28.9,
          "y": 35.4,
          "id": "pd-codigo",
          "title": "Código",
          "description": "Código interno do produto. O sistema sugere o próximo número automaticamente, mas você pode alterar."
        },
        {
          "h": 5.4,
          "w": 31,
          "x": 41.7,
          "y": 35.4,
          "id": "pd-descricao",
          "tip": "Campo obrigatório.",
          "title": "Descrição",
          "description": "Nome do produto como vai aparecer na nota fiscal. Seja claro, por exemplo: \"Brigadeiro gourmet 25g\"."
        },
        {
          "h": 5.4,
          "w": 11.8,
          "x": 73.6,
          "y": 35.4,
          "id": "pd-un",
          "title": "Un. Medida",
          "description": "Unidade de venda: UN (unidade), KG, LT, CX, PC etc."
        },
        {
          "h": 5.4,
          "w": 11.8,
          "x": 86.4,
          "y": 35.4,
          "id": "pd-preco",
          "title": "Preço Unitário",
          "description": "Valor de venda de uma unidade. Esse preço é sugerido automaticamente na emissão da nota."
        },
        {
          "h": 5.6,
          "w": 18.2,
          "x": 22.5,
          "y": 45.2,
          "id": "pd-ean",
          "title": "Código de Barras (EAN)",
          "description": "Código GTIN/EAN impresso na embalagem. Se o produto não tiver código de barras, deixe em branco."
        },
        {
          "h": 5.6,
          "w": 11.8,
          "x": 41.7,
          "y": 45.2,
          "id": "pd-ncm",
          "tip": "Na dúvida sobre o NCM correto, confirme com sua contabilidade.",
          "title": "NCM",
          "description": "Código de 8 dígitos que classifica a mercadoria (Nomenclatura Comum do Mercosul). É obrigatório na nota. Clique na lupa para pesquisar pelo nome."
        },
        {
          "h": 5.6,
          "w": 11.8,
          "x": 54.5,
          "y": 45.2,
          "id": "pd-cest",
          "title": "CEST",
          "description": "Código de 7 dígitos exigido para produtos sujeitos à Substituição Tributária. Se não se aplica ao seu produto, deixe em branco."
        },
        {
          "h": 5.6,
          "w": 31,
          "x": 67.2,
          "y": 45.2,
          "id": "pd-categoria",
          "title": "Categoria",
          "description": "Agrupa produtos para organizar a lista e os relatórios (ex.: Doces, Bebidas)."
        },
        {
          "h": 3.2,
          "w": 7.8,
          "x": 22.5,
          "y": 52.2,
          "id": "pd-fabricacao",
          "title": "Fabricação própria",
          "description": "Marque se o produto é fabricado pela sua empresa (e não comprado para revenda)."
        },
        {
          "h": 6,
          "w": 4.6,
          "x": 94.6,
          "y": 64.2,
          "id": "pd-salvar",
          "title": "Salvar",
          "description": "Grava o produto. Ele passa a aparecer na lista de produtos e na emissão das notas."
        }
      ],
      "screenshots": [
        {
          "id": "screen-produto-dados",
          "caption": "",
          "hotspots": [
            {
              "h": 5,
              "w": 9.2,
              "x": 6.2,
              "y": 16.8,
              "id": "pd-aba-dados",
              "title": "Aba Dados do Produto",
              "description": "Informações gerais do produto: nome, preço, códigos e categoria."
            },
            {
              "h": 5,
              "w": 6.6,
              "x": 15.3,
              "y": 16.8,
              "id": "pd-aba-trib",
              "title": "Aba Tributação",
              "description": "Define como os impostos são calculados para este produto (Grupo Tributário e Origem)."
            },
            {
              "h": 5,
              "w": 9.2,
              "x": 22,
              "y": 16.8,
              "id": "pd-aba-outras",
              "title": "Aba Outras informações",
              "description": "Dados complementares do produto, como observações e informações adicionais para a nota."
            },
            {
              "h": 23.6,
              "w": 10.4,
              "x": 9.4,
              "y": 32.6,
              "id": "pd-imagem",
              "title": "Imagem do Produto",
              "description": "Clique ou arraste uma foto do produto. Ajuda a identificar o item, mas não é obrigatória."
            },
            {
              "h": 7.6,
              "w": 3.8,
              "x": 23.3,
              "y": 32.4,
              "id": "pd-ativo",
              "title": "Ativo",
              "description": "Ligado (roxo) = o produto pode ser usado nas notas. Desligue para esconder o produto sem perder o histórico."
            },
            {
              "h": 5.4,
              "w": 11.8,
              "x": 28.9,
              "y": 35.4,
              "id": "pd-codigo",
              "title": "Código",
              "description": "Código interno do produto. O sistema sugere o próximo número automaticamente, mas você pode alterar."
            },
            {
              "h": 5.4,
              "w": 31,
              "x": 41.7,
              "y": 35.4,
              "id": "pd-descricao",
              "tip": "Campo obrigatório.",
              "title": "Descrição",
              "description": "Nome do produto como vai aparecer na nota fiscal. Seja claro, por exemplo: \"Brigadeiro gourmet 25g\"."
            },
            {
              "h": 5.4,
              "w": 11.8,
              "x": 73.6,
              "y": 35.4,
              "id": "pd-un",
              "title": "Un. Medida",
              "description": "Unidade de venda: UN (unidade), KG, LT, CX, PC etc."
            },
            {
              "h": 5.4,
              "w": 11.8,
              "x": 86.4,
              "y": 35.4,
              "id": "pd-preco",
              "title": "Preço Unitário",
              "description": "Valor de venda de uma unidade. Esse preço é sugerido automaticamente na emissão da nota."
            },
            {
              "h": 5.6,
              "w": 18.2,
              "x": 22.5,
              "y": 45.2,
              "id": "pd-ean",
              "title": "Código de Barras (EAN)",
              "description": "Código GTIN/EAN impresso na embalagem. Se o produto não tiver código de barras, deixe em branco."
            },
            {
              "h": 5.6,
              "w": 11.8,
              "x": 41.7,
              "y": 45.2,
              "id": "pd-ncm",
              "tip": "Na dúvida sobre o NCM correto, confirme com sua contabilidade.",
              "title": "NCM",
              "description": "Código de 8 dígitos que classifica a mercadoria (Nomenclatura Comum do Mercosul). É obrigatório na nota. Clique na lupa para pesquisar pelo nome."
            },
            {
              "h": 5.6,
              "w": 11.8,
              "x": 54.5,
              "y": 45.2,
              "id": "pd-cest",
              "title": "CEST",
              "description": "Código de 7 dígitos exigido para produtos sujeitos à Substituição Tributária. Se não se aplica ao seu produto, deixe em branco."
            },
            {
              "h": 5.6,
              "w": 31,
              "x": 67.2,
              "y": 45.2,
              "id": "pd-categoria",
              "title": "Categoria",
              "description": "Agrupa produtos para organizar a lista e os relatórios (ex.: Doces, Bebidas)."
            },
            {
              "h": 3.2,
              "w": 7.8,
              "x": 22.5,
              "y": 52.2,
              "id": "pd-fabricacao",
              "title": "Fabricação própria",
              "description": "Marque se o produto é fabricado pela sua empresa (e não comprado para revenda)."
            },
            {
              "h": 6,
              "w": 4.6,
              "x": 94.6,
              "y": 64.2,
              "id": "pd-salvar",
              "title": "Salvar",
              "description": "Grava o produto. Ele passa a aparecer na lista de produtos e na emissão das notas."
            }
          ]
        }
      ],
      "position": 4
    },
    {
      "id": "produto-tributacao",
      "module_id": "cadastros",
      "title": "Cadastrar produto: Tributação",
      "summary": "Como revisar o grupo selecionado no produto e configurar corretamente as regras fiscais de ICMS, CST/CSOSN, PIS, COFINS e IPI.",
      "path": "Cadastros > Produtos > Novo Produto > aba Tributação",
      "content": "\n# Como corrigir a tributação de um produto usando o Grupo Tributário\n\nEsta aula explica a diferença entre **selecionar um Grupo Tributário no cadastro do produto** e **configurar as regras fiscais dentro do próprio Grupo Tributário**.\n\n## Entenda onde cada configuração é feita\n\n- **Cadastro do Produto:** na aba **Tributação**, o usuário escolhe qual Grupo Tributário será aplicado ao produto e informa a Origem. Este cadastro não é o local para editar os detalhes das regras fiscais.\n- **Cadastro de Grupo Tributário:** é onde ficam as regras tributárias detalhadas da operação, incluindo Natureza de Operação, CFOP, tipo de destinatário, UF de destino e os códigos fiscais de ICMS (CST/CSOSN), PIS, COFINS e IPI.\n\nPortanto, quando aparecer um aviso como **“Produto com CST em empresa do Simples Nacional”**, não oriente o usuário a procurar um campo CST dentro do cadastro do produto. O primeiro local para investigar é o Grupo Tributário e suas Regras Tributárias.\n\n## Passo a passo: revisar a regra fiscal\n\n1. Confirme com a contabilidade ou nos dados fiscais da empresa qual é o regime tributário vigente. Não presuma o código correto apenas pelo texto do erro.\n2. No menu lateral, acesse **Cadastros → Grupo Tributário**.\n3. Na listagem, use o campo **Procurar** para localizar o grupo que o produto utiliza. Exemplos de nomes que podem existir: **Padrão - Simples Nacional**, **Fabricação - Simples Nacional** ou outros grupos personalizados.\n4. Clique nas opções do grupo desejado e escolha **Editar**.\n5. Na tela do grupo, localize a seção **Regras Tributárias**. Confira as regras existentes antes de criar uma nova.\n6. Identifique a regra aplicável à operação da nota. Confira especialmente **Natureza de Operação**, **CFOP**, **Tipo Destinatário** e **UFs Destino**. Uma regra pode existir, mas não ser aplicada se esses critérios não corresponderem à operação.\n7. Clique em **Editar Regra** para revisar a regra existente ou em **Adicionar Regra** somente se não houver uma regra aplicável.\n8. Na configuração da regra, confira a seção **ICMS** e o campo **CST / CSOSN**. Para empresas do Simples Nacional, a regra deve usar o enquadramento compatível com o regime e com a operação. Não escolha automaticamente CSOSN 102: o código depende da situação fiscal concreta e deve ser confirmado com a contabilidade.\n9. Confira também PIS, COFINS, IPI e os demais campos aplicáveis. Não altere alíquotas, CFOP, benefícios fiscais ou códigos sem validar a orientação fiscal.\n10. Salve a regra e, se houver alterações no grupo, salve também o cadastro do Grupo Tributário.\n\n## Depois, confira o produto\n\n1. Acesse **Cadastros → Produtos** e abra o produto indicado na mensagem.\n2. Entre na aba **Tributação**.\n3. Confira qual **Grupo Tributário** está selecionado. O produto deve apontar para o grupo cuja regra foi revisada.\n4. Se estiver selecionado um grupo incorreto, escolha o grupo adequado e salve o produto. Se já estiver correto, não é necessário alterar o produto apenas para tentar corrigir o CST.\n\n## Teste na nota\n\nVolte à nota, atualize ou remova e adicione novamente o item, conforme o funcionamento da tela, para que o sistema recalcule os impostos com a regra revisada. Confira o resultado antes de transmitir.\n\n## Se o aviso continuar\n\n- Verifique se existe uma regra que corresponda à Natureza de Operação, CFOP, destinatário e UF de destino da nota.\n- Confira se o produto está vinculado ao grupo que foi efetivamente corrigido.\n- Verifique se há mais de uma regra e se outra regra aplicável está sendo selecionada.\n- Não crie regras duplicadas nem altere códigos fiscais por tentativa.\n- Se ainda houver divergência, encaminhe à contabilidade o regime da empresa, a operação, o CFOP e a regra atual para confirmar a parametrização.\n\n**Importante:** a IA deve orientar o caminho correto no sistema, mas não deve determinar por conta própria o CST/CSOSN ou a tributação legal do produto. Esses dados dependem da operação e da orientação fiscal da empresa.\n",
      "hotspots": [
        {
          "h": 5.2,
          "w": 6.8,
          "x": 15.2,
          "y": 17,
          "id": "pt-aba",
          "title": "Aba Tributação",
          "description": "Você está nesta aba. Ela define os impostos do produto."
        },
        {
          "h": 13.8,
          "w": 59.8,
          "x": 7.5,
          "y": 33,
          "id": "pt-grupo",
          "title": "Grupo Tributário",
          "description": "Lista de regras de impostos. **Padrão da Empresa** usa a configuração geral da empresa. **Simples Nacional - CSOSN 102** é comum para empresas do Simples sem permissão de crédito. Os grupos são criados em Cadastros > Grupo Tributário."
        },
        {
          "h": 5.6,
          "w": 29.4,
          "x": 68.2,
          "y": 33,
          "id": "pt-origem",
          "title": "Origem",
          "description": "Indica a procedência da mercadoria: 0 - Nacional, 1 - Estrangeira (importação direta), 2 - Estrangeira (comprada no mercado interno) e outras."
        },
        {
          "h": 5.8,
          "w": 4.6,
          "x": 94.2,
          "y": 47.4,
          "id": "pt-salvar",
          "title": "Salvar",
          "description": "Grava o produto com as regras de tributação escolhidas."
        }
      ],
      "screenshots": [
        {
          "id": "screen-produto-tributacao",
          "caption": "",
          "hotspots": [
            {
              "h": 5.2,
              "w": 6.8,
              "x": 15.2,
              "y": 17,
              "id": "pt-aba",
              "title": "Aba Tributação",
              "description": "Você está nesta aba. Ela define os impostos do produto."
            },
            {
              "h": 13.8,
              "w": 59.8,
              "x": 7.5,
              "y": 33,
              "id": "pt-grupo",
              "title": "Grupo Tributário",
              "description": "Lista de regras de impostos. **Padrão da Empresa** usa a configuração geral da empresa. **Simples Nacional - CSOSN 102** é comum para empresas do Simples sem permissão de crédito. Os grupos são criados em Cadastros > Grupo Tributário."
            },
            {
              "h": 5.6,
              "w": 29.4,
              "x": 68.2,
              "y": 33,
              "id": "pt-origem",
              "title": "Origem",
              "description": "Indica a procedência da mercadoria: 0 - Nacional, 1 - Estrangeira (importação direta), 2 - Estrangeira (comprada no mercado interno) e outras."
            },
            {
              "h": 5.8,
              "w": 4.6,
              "x": 94.2,
              "y": 47.4,
              "id": "pt-salvar",
              "title": "Salvar",
              "description": "Grava o produto com as regras de tributação escolhidas."
            }
          ]
        }
      ],
      "position": 5
    },
    {
      "id": "servicos-lista",
      "module_id": "cadastros",
      "title": "Lista de Serviços",
      "summary": "Onde ficam os serviços usados na nota de serviço (NFS-e).",
      "path": "Cadastros > Serviços",
      "content": "A lista de **Serviços** funciona igual à de produtos. Quando ainda não há nenhum serviço cadastrado, aparece **Nenhum registro**.\n\nClique em **Novo Serviço** para cadastrar o primeiro.",
      "hotspots": [
        {
          "h": 3.6,
          "w": 10.6,
          "x": 6.1,
          "y": 14.6,
          "id": "sl-ordenar",
          "title": "Ordenar por",
          "description": "Escolhe a ordem da lista de serviços."
        },
        {
          "h": 3.6,
          "w": 9,
          "x": 16.7,
          "y": 14.6,
          "id": "sl-procurar",
          "title": "Procurar",
          "description": "Pesquise um serviço pelo nome."
        },
        {
          "h": 5.4,
          "w": 9.1,
          "x": 89.4,
          "y": 13.6,
          "id": "sl-novo",
          "title": "Novo Serviço",
          "description": "Abre o formulário para cadastrar um serviço."
        },
        {
          "h": 3.8,
          "w": 9.6,
          "x": 47.6,
          "y": 28,
          "id": "sl-vazio",
          "title": "Nenhum registro",
          "description": "Ainda não há serviços cadastrados nesta empresa. Depois do primeiro cadastro, eles aparecem aqui."
        }
      ],
      "screenshots": [
        {
          "id": "screen-servicos-lista",
          "caption": "",
          "hotspots": [
            {
              "h": 3.6,
              "w": 10.6,
              "x": 6.1,
              "y": 14.6,
              "id": "sl-ordenar",
              "title": "Ordenar por",
              "description": "Escolhe a ordem da lista de serviços."
            },
            {
              "h": 3.6,
              "w": 9,
              "x": 16.7,
              "y": 14.6,
              "id": "sl-procurar",
              "title": "Procurar",
              "description": "Pesquise um serviço pelo nome."
            },
            {
              "h": 5.4,
              "w": 9.1,
              "x": 89.4,
              "y": 13.6,
              "id": "sl-novo",
              "title": "Novo Serviço",
              "description": "Abre o formulário para cadastrar um serviço."
            },
            {
              "h": 3.8,
              "w": 9.6,
              "x": 47.6,
              "y": 28,
              "id": "sl-vazio",
              "title": "Nenhum registro",
              "description": "Ainda não há serviços cadastrados nesta empresa. Depois do primeiro cadastro, eles aparecem aqui."
            }
          ]
        }
      ],
      "position": 6
    },
    {
      "id": "servico-cadastro",
      "module_id": "cadastros",
      "title": "Cadastrar serviço",
      "summary": "Campos do cadastro de serviço e o que cada um significa.",
      "path": "Cadastros > Serviços > Novo Serviço",
      "content": "**Passo a passo para cadastrar um serviço:**\n1. Vá em **Cadastros > Serviços** e clique em **Novo Serviço**.\n2. Preencha **Descrição**, **Valor** e **Unidade**.\n3. Informe os códigos fiscais: **CNAE**, **Código Trib. Município**, **Item Lista de Serviço**, **Cód. Trib. Nacional** e **NBS**.\n4. Clique em **Salvar**.\n\nOs códigos fiscais dependem da sua prefeitura e da atividade da empresa. Sua contabilidade pode informar os corretos.",
      "hotspots": [
        {
          "h": 7.6,
          "w": 3.6,
          "x": 12.6,
          "y": 24.6,
          "id": "sc-ativo",
          "title": "Ativo",
          "description": "Ligado = o serviço pode ser usado nas notas."
        },
        {
          "h": 5.4,
          "w": 44.2,
          "x": 22.4,
          "y": 27.8,
          "id": "sc-descricao",
          "title": "Descrição",
          "description": "Nome do serviço como vai aparecer na nota (ex.: \"Manutenção de computadores\")."
        },
        {
          "h": 5.4,
          "w": 14,
          "x": 67.6,
          "y": 27.8,
          "id": "sc-valor",
          "title": "Valor",
          "description": "Preço padrão do serviço. Pode ser alterado na hora de emitir a nota."
        },
        {
          "h": 5.4,
          "w": 14,
          "x": 82.7,
          "y": 27.8,
          "id": "sc-unidade",
          "title": "Unidade",
          "description": "Unidade de cobrança: UN, HORA, MÊS etc."
        },
        {
          "h": 5.6,
          "w": 14,
          "x": 7.3,
          "y": 37.6,
          "id": "sc-cnae",
          "title": "CNAE",
          "description": "Código da atividade econômica da empresa ligada a este serviço."
        },
        {
          "h": 5.6,
          "w": 14,
          "x": 22.4,
          "y": 37.6,
          "id": "sc-trib-mun",
          "title": "Código Trib. Município",
          "description": "Código de tributação definido pela prefeitura da sua cidade para este serviço."
        },
        {
          "h": 5.6,
          "w": 21.6,
          "x": 37.5,
          "y": 37.6,
          "id": "sc-item-lista",
          "title": "Item Lista de Serviço",
          "description": "Item da lista oficial de serviços (Lei Complementar 116) que corresponde ao serviço prestado."
        },
        {
          "h": 5.6,
          "w": 14,
          "x": 60.1,
          "y": 37.6,
          "id": "sc-trib-nac",
          "title": "Cód. Trib. Nacional",
          "description": "Código de tributação do padrão nacional da NFS-e."
        },
        {
          "h": 5.6,
          "w": 21.6,
          "x": 75.1,
          "y": 37.6,
          "id": "sc-nbs",
          "title": "NBS",
          "description": "Nomenclatura Brasileira de Serviços: classifica o serviço, parecido com o NCM dos produtos."
        },
        {
          "h": 5.6,
          "w": 4.6,
          "x": 93.4,
          "y": 49.6,
          "id": "sc-salvar",
          "title": "Salvar",
          "description": "Grava o serviço."
        }
      ],
      "screenshots": [
        {
          "id": "screen-servico-cadastro",
          "caption": "",
          "hotspots": [
            {
              "h": 7.6,
              "w": 3.6,
              "x": 12.6,
              "y": 24.6,
              "id": "sc-ativo",
              "title": "Ativo",
              "description": "Ligado = o serviço pode ser usado nas notas."
            },
            {
              "h": 5.4,
              "w": 44.2,
              "x": 22.4,
              "y": 27.8,
              "id": "sc-descricao",
              "title": "Descrição",
              "description": "Nome do serviço como vai aparecer na nota (ex.: \"Manutenção de computadores\")."
            },
            {
              "h": 5.4,
              "w": 14,
              "x": 67.6,
              "y": 27.8,
              "id": "sc-valor",
              "title": "Valor",
              "description": "Preço padrão do serviço. Pode ser alterado na hora de emitir a nota."
            },
            {
              "h": 5.4,
              "w": 14,
              "x": 82.7,
              "y": 27.8,
              "id": "sc-unidade",
              "title": "Unidade",
              "description": "Unidade de cobrança: UN, HORA, MÊS etc."
            },
            {
              "h": 5.6,
              "w": 14,
              "x": 7.3,
              "y": 37.6,
              "id": "sc-cnae",
              "title": "CNAE",
              "description": "Código da atividade econômica da empresa ligada a este serviço."
            },
            {
              "h": 5.6,
              "w": 14,
              "x": 22.4,
              "y": 37.6,
              "id": "sc-trib-mun",
              "title": "Código Trib. Município",
              "description": "Código de tributação definido pela prefeitura da sua cidade para este serviço."
            },
            {
              "h": 5.6,
              "w": 21.6,
              "x": 37.5,
              "y": 37.6,
              "id": "sc-item-lista",
              "title": "Item Lista de Serviço",
              "description": "Item da lista oficial de serviços (Lei Complementar 116) que corresponde ao serviço prestado."
            },
            {
              "h": 5.6,
              "w": 14,
              "x": 60.1,
              "y": 37.6,
              "id": "sc-trib-nac",
              "title": "Cód. Trib. Nacional",
              "description": "Código de tributação do padrão nacional da NFS-e."
            },
            {
              "h": 5.6,
              "w": 21.6,
              "x": 75.1,
              "y": 37.6,
              "id": "sc-nbs",
              "title": "NBS",
              "description": "Nomenclatura Brasileira de Serviços: classifica o serviço, parecido com o NCM dos produtos."
            },
            {
              "h": 5.6,
              "w": 4.6,
              "x": 93.4,
              "y": 49.6,
              "id": "sc-salvar",
              "title": "Salvar",
              "description": "Grava o serviço."
            }
          ]
        }
      ],
      "position": 7
    },
    {
      "id": "clientes-lista",
      "module_id": "cadastros",
      "title": "Lista de Clientes",
      "summary": "Pesquisar, editar e cadastrar clientes, fornecedores e transportadoras.",
      "path": "Cadastros > Clientes",
      "content": "Aqui ficam todos os clientes com **Nome**, **CPF/CNPJ**, **Cidade** e situação.\n\nPara cadastrar, clique em **Novo Cliente**.",
      "hotspots": [
        {
          "h": 3.8,
          "w": 10,
          "x": 6.4,
          "y": 14.4,
          "id": "cl-ordenar",
          "title": "Ordenar por",
          "description": "Escolhe a ordem da lista, por exemplo por Razão Social (nome) ou data de cadastro."
        },
        {
          "h": 3.8,
          "w": 9.1,
          "x": 16.4,
          "y": 14.4,
          "id": "cl-procurar",
          "title": "Procurar",
          "description": "Pesquise pelo nome, CPF ou CNPJ."
        },
        {
          "h": 3.8,
          "w": 7.5,
          "x": 25.6,
          "y": 14.4,
          "id": "cl-busca",
          "title": "Busca Avançada",
          "description": "Filtros extras como cidade, situação e tipo de cadastro."
        },
        {
          "h": 5.4,
          "w": 7.7,
          "x": 81.7,
          "y": 13.6,
          "id": "cl-opcoes",
          "title": "Opções (geral)",
          "description": "Ações para a lista toda, como importar ou exportar clientes."
        },
        {
          "h": 5.4,
          "w": 9.1,
          "x": 89.4,
          "y": 13.6,
          "id": "cl-novo",
          "title": "Novo Cliente",
          "description": "Abre o formulário de cadastro de cliente."
        },
        {
          "h": 7.6,
          "w": 76,
          "x": 6.4,
          "y": 23.4,
          "id": "cl-linha",
          "title": "Linha do cliente",
          "description": "Mostra Nome, CPF/CNPJ e Cidade. Clique para abrir e editar."
        },
        {
          "h": 3.4,
          "w": 3.4,
          "x": 83,
          "y": 25.6,
          "id": "cl-ativo",
          "title": "Situação: Ativo",
          "description": "Cliente disponível para emissão de notas."
        },
        {
          "h": 5,
          "w": 5.1,
          "x": 92.3,
          "y": 24.8,
          "id": "cl-linha-opcoes",
          "title": "Opções do cliente",
          "description": "Editar, inativar ou excluir o cliente."
        }
      ],
      "screenshots": [
        {
          "id": "screen-clientes-lista",
          "caption": "",
          "hotspots": [
            {
              "h": 3.8,
              "w": 10,
              "x": 6.4,
              "y": 14.4,
              "id": "cl-ordenar",
              "title": "Ordenar por",
              "description": "Escolhe a ordem da lista, por exemplo por Razão Social (nome) ou data de cadastro."
            },
            {
              "h": 3.8,
              "w": 9.1,
              "x": 16.4,
              "y": 14.4,
              "id": "cl-procurar",
              "title": "Procurar",
              "description": "Pesquise pelo nome, CPF ou CNPJ."
            },
            {
              "h": 3.8,
              "w": 7.5,
              "x": 25.6,
              "y": 14.4,
              "id": "cl-busca",
              "title": "Busca Avançada",
              "description": "Filtros extras como cidade, situação e tipo de cadastro."
            },
            {
              "h": 5.4,
              "w": 7.7,
              "x": 81.7,
              "y": 13.6,
              "id": "cl-opcoes",
              "title": "Opções (geral)",
              "description": "Ações para a lista toda, como importar ou exportar clientes."
            },
            {
              "h": 5.4,
              "w": 9.1,
              "x": 89.4,
              "y": 13.6,
              "id": "cl-novo",
              "title": "Novo Cliente",
              "description": "Abre o formulário de cadastro de cliente."
            },
            {
              "h": 7.6,
              "w": 76,
              "x": 6.4,
              "y": 23.4,
              "id": "cl-linha",
              "title": "Linha do cliente",
              "description": "Mostra Nome, CPF/CNPJ e Cidade. Clique para abrir e editar."
            },
            {
              "h": 3.4,
              "w": 3.4,
              "x": 83,
              "y": 25.6,
              "id": "cl-ativo",
              "title": "Situação: Ativo",
              "description": "Cliente disponível para emissão de notas."
            },
            {
              "h": 5,
              "w": 5.1,
              "x": 92.3,
              "y": 24.8,
              "id": "cl-linha-opcoes",
              "title": "Opções do cliente",
              "description": "Editar, inativar ou excluir o cliente."
            }
          ]
        }
      ],
      "position": 8
    },
    {
      "id": "cliente-cadastro",
      "module_id": "cadastros",
      "title": "Cadastrar cliente",
      "summary": "Todos os campos do cadastro de cliente, explicados.",
      "path": "Cadastros > Clientes > Novo Cliente",
      "content": "**Passo a passo para cadastrar um cliente:**\n1. Vá em **Cadastros > Clientes** e clique em **Novo Cliente**.\n2. Em **Tipo de Cadastro**, deixe **Cliente** ligado (e ligue Fornecedor/Transportadora se também for).\n3. Digite o **CPF/CNPJ** e o **Nome**.\n4. Defina **Consumidor Final** e **Contribuinte ICMS**.\n5. Preencha telefone e e-mail (o XML e o PDF da nota podem ser enviados para esse e-mail).\n6. Na aba **Endereço Principal**, digite o **CEP** e clique na lupa para preencher o endereço.\n7. Clique em **Salvar** no final da página.",
      "hotspots": [
        {
          "h": 12.2,
          "w": 22.4,
          "x": 6,
          "y": 17,
          "id": "cc-ativo",
          "title": "Ativo",
          "description": "Ligado = cliente disponível para emissão de notas."
        },
        {
          "h": 12.2,
          "w": 69,
          "x": 29.3,
          "y": 17,
          "id": "cc-tipo",
          "title": "Tipo de Cadastro",
          "description": "Defina o papel desse cadastro: **Cliente** (para quem você vende), **Fornecedor** (de quem você compra) e/ou **Transportadora** (quem faz o frete). Pode ligar mais de um."
        },
        {
          "h": 5.4,
          "w": 21.7,
          "x": 7.1,
          "y": 42.8,
          "id": "cc-cpf",
          "title": "CPF/CNPJ",
          "description": "Documento do cliente. Digite só os números: 11 dígitos para pessoa física (CPF) ou 14 para empresa (CNPJ)."
        },
        {
          "h": 5.4,
          "w": 37,
          "x": 29.9,
          "y": 42.8,
          "id": "cc-nome",
          "title": "Nome",
          "description": "Nome completo da pessoa ou Razão Social da empresa, exatamente como no documento."
        },
        {
          "h": 5.4,
          "w": 29.4,
          "x": 67.8,
          "y": 42.8,
          "id": "cc-fantasia",
          "title": "Nome Fantasia",
          "description": "Nome comercial pelo qual a empresa é conhecida. Quando aparece em cinza, o campo não está disponível para edição naquele momento."
        },
        {
          "h": 5.6,
          "w": 14.2,
          "x": 7.1,
          "y": 52.6,
          "id": "cc-consumidor",
          "title": "Consumidor Final",
          "description": "**Sim** quando o cliente compra para uso próprio (não vai revender). Isso muda o cálculo de alguns impostos na nota."
        },
        {
          "h": 5.6,
          "w": 14.2,
          "x": 22.3,
          "y": 52.6,
          "id": "cc-icms",
          "title": "Contribuinte ICMS",
          "description": "**Contribuinte**: empresa com Inscrição Estadual. **Isento**: tem inscrição, mas é isento. **Não contribuinte**: pessoa física ou empresa sem Inscrição Estadual."
        },
        {
          "h": 5.6,
          "w": 21.7,
          "x": 37.5,
          "y": 52.6,
          "id": "cc-ie",
          "title": "Inscrição Estadual",
          "description": "Número de registro da empresa na Secretaria da Fazenda do estado. Obrigatório para contribuintes de ICMS."
        },
        {
          "h": 5.6,
          "w": 21.7,
          "x": 60.3,
          "y": 52.6,
          "id": "cc-im",
          "title": "Inscrição Municipal",
          "description": "Registro da empresa na prefeitura. Usado principalmente em notas de serviço."
        },
        {
          "h": 5.6,
          "w": 14.2,
          "x": 83,
          "y": 52.6,
          "id": "cc-suframa",
          "title": "SUFRAMA",
          "description": "Inscrição na Zona Franca de Manaus. Só preencha se o cliente tiver esse cadastro."
        },
        {
          "h": 5.4,
          "w": 14.2,
          "x": 7.1,
          "y": 62.8,
          "id": "cc-telefone",
          "title": "Telefone",
          "description": "Telefone de contato do cliente."
        },
        {
          "h": 5.4,
          "w": 44.6,
          "x": 22.3,
          "y": 62.8,
          "id": "cc-email",
          "title": "E-mail(s)",
          "description": "E-mail do cliente. Pode informar mais de um. É usado para enviar o XML e o PDF das notas."
        },
        {
          "h": 5.2,
          "w": 22.6,
          "x": 6,
          "y": 74,
          "id": "cc-abas",
          "title": "Abas de Endereço",
          "description": "**Endereço Principal**: endereço do cliente. **Entrega/Retirada**: se a mercadoria for entregue ou retirada em outro lugar. **Ente Governamental**: para vendas a órgãos públicos."
        },
        {
          "h": 5.4,
          "w": 14.2,
          "x": 7.1,
          "y": 84,
          "id": "cc-cep",
          "title": "CEP",
          "description": "Digite o CEP e clique na lupa: endereço, bairro, cidade e estado são preenchidos automaticamente."
        }
      ],
      "screenshots": [
        {
          "id": "screen-cliente-cadastro",
          "caption": "",
          "hotspots": [
            {
              "h": 12.2,
              "w": 22.4,
              "x": 6,
              "y": 17,
              "id": "cc-ativo",
              "title": "Ativo",
              "description": "Ligado = cliente disponível para emissão de notas."
            },
            {
              "h": 12.2,
              "w": 69,
              "x": 29.3,
              "y": 17,
              "id": "cc-tipo",
              "title": "Tipo de Cadastro",
              "description": "Defina o papel desse cadastro: **Cliente** (para quem você vende), **Fornecedor** (de quem você compra) e/ou **Transportadora** (quem faz o frete). Pode ligar mais de um."
            },
            {
              "h": 5.4,
              "w": 21.7,
              "x": 7.1,
              "y": 42.8,
              "id": "cc-cpf",
              "title": "CPF/CNPJ",
              "description": "Documento do cliente. Digite só os números: 11 dígitos para pessoa física (CPF) ou 14 para empresa (CNPJ)."
            },
            {
              "h": 5.4,
              "w": 37,
              "x": 29.9,
              "y": 42.8,
              "id": "cc-nome",
              "title": "Nome",
              "description": "Nome completo da pessoa ou Razão Social da empresa, exatamente como no documento."
            },
            {
              "h": 5.4,
              "w": 29.4,
              "x": 67.8,
              "y": 42.8,
              "id": "cc-fantasia",
              "title": "Nome Fantasia",
              "description": "Nome comercial pelo qual a empresa é conhecida. Quando aparece em cinza, o campo não está disponível para edição naquele momento."
            },
            {
              "h": 5.6,
              "w": 14.2,
              "x": 7.1,
              "y": 52.6,
              "id": "cc-consumidor",
              "title": "Consumidor Final",
              "description": "**Sim** quando o cliente compra para uso próprio (não vai revender). Isso muda o cálculo de alguns impostos na nota."
            },
            {
              "h": 5.6,
              "w": 14.2,
              "x": 22.3,
              "y": 52.6,
              "id": "cc-icms",
              "title": "Contribuinte ICMS",
              "description": "**Contribuinte**: empresa com Inscrição Estadual. **Isento**: tem inscrição, mas é isento. **Não contribuinte**: pessoa física ou empresa sem Inscrição Estadual."
            },
            {
              "h": 5.6,
              "w": 21.7,
              "x": 37.5,
              "y": 52.6,
              "id": "cc-ie",
              "title": "Inscrição Estadual",
              "description": "Número de registro da empresa na Secretaria da Fazenda do estado. Obrigatório para contribuintes de ICMS."
            },
            {
              "h": 5.6,
              "w": 21.7,
              "x": 60.3,
              "y": 52.6,
              "id": "cc-im",
              "title": "Inscrição Municipal",
              "description": "Registro da empresa na prefeitura. Usado principalmente em notas de serviço."
            },
            {
              "h": 5.6,
              "w": 14.2,
              "x": 83,
              "y": 52.6,
              "id": "cc-suframa",
              "title": "SUFRAMA",
              "description": "Inscrição na Zona Franca de Manaus. Só preencha se o cliente tiver esse cadastro."
            },
            {
              "h": 5.4,
              "w": 14.2,
              "x": 7.1,
              "y": 62.8,
              "id": "cc-telefone",
              "title": "Telefone",
              "description": "Telefone de contato do cliente."
            },
            {
              "h": 5.4,
              "w": 44.6,
              "x": 22.3,
              "y": 62.8,
              "id": "cc-email",
              "title": "E-mail(s)",
              "description": "E-mail do cliente. Pode informar mais de um. É usado para enviar o XML e o PDF das notas."
            },
            {
              "h": 5.2,
              "w": 22.6,
              "x": 6,
              "y": 74,
              "id": "cc-abas",
              "title": "Abas de Endereço",
              "description": "**Endereço Principal**: endereço do cliente. **Entrega/Retirada**: se a mercadoria for entregue ou retirada em outro lugar. **Ente Governamental**: para vendas a órgãos públicos."
            },
            {
              "h": 5.4,
              "w": 14.2,
              "x": 7.1,
              "y": 84,
              "id": "cc-cep",
              "title": "CEP",
              "description": "Digite o CEP e clique na lupa: endereço, bairro, cidade e estado são preenchidos automaticamente."
            }
          ]
        }
      ],
      "position": 9
    },
    {
      "id": "aula-vb9gq9",
      "module_id": "cadastros",
      "title": "Gerenciamento e Edição de Veículos",
      "summary": "Nesta aula, você aprenderá a acessar o menu de cadastros de veículos, localizar registros existentes, editar suas informações principais, configurar dados de reboques e salvar as alterações no Emissor Future.",
      "path": "Cadastros > Veículos",
      "content": "## Introdução\nO cadastro correto de veículos é fundamental para empresas que emitem documentos fiscais de transporte (como CTe e MDFe). Nesta aula, vamos acompanhar o passo a passo para navegar até a listagem de veículos, visualizar os registros cadastrados, editar dados como placa, UF, tipo de rodado, carroceria, capacidades e configurar reboques.\n\n---\n\n## Passo a Passo\n\n### Print 1: Acessando o Menu de Cadastros\n1. Posicione o cursor sobre o menu lateral **Cadastros**.\n2. No menu suspenso que se abre, clique na opção **Veículos** para acessar a listagem de veículos.\n\n### Print 2: Localizando e Gerenciando Veículos\n1. Utilize a barra de pesquisa **Procurar** ou ordene os registros conforme necessário.\n2. Visualize as informações básicas na tabela (Placa, UF, Tipo Rodado, Carroceria, Proprietário e status).\n3. Caso queira cadastrar um novo veículo, clique no botão **Novo Veículo**, ou utilize o menu **Opções** para gerenciar os registros existentes.\n\n### Print 3: Editando os Dados do Veículo\n1. Na tela de edição, preencha ou atualize os campos obrigatórios na aba **Dados do Veículo**.\n2. Verifique o status de **Ativo**, a **Placa**, a **UF**, o **Tipo Rodado**, o **Tipo Carroceria** e o **Número de eixos**.\n3. Preencha informações adicionais como Apelido, **Tara (KG)**, **Capacidade em KG** e **Capacidade em M3**.\n4. Marque a caixa **Veículo próprio** se aplicável.\n\n### Print 4: Configurando Reboques e Concluindo\n1. Navegue até a aba **Reboques** para associar reboques favoritos, se necessário.\n2. Clique no botão **Adicionar Reboque** para incluir novos itens.\n3. Por fim, clique no botão **Salvar** para gravar todas as alterações realizadas no cadastro.",
      "hotspots": [
        {
          "h": 21.9,
          "w": 7.8,
          "x": 0,
          "y": 35.6,
          "id": "ponto-1-1-sdr0d7",
          "tip": "Use para acessar a tela de veículos.",
          "title": "Cadastro",
          "description": "Clique nesta opção para abrir a listagem de cadastros"
        },
        {
          "h": 9.9,
          "w": 17.1,
          "x": 7.9,
          "y": 34.2,
          "id": "ponto-gjfin6",
          "title": "Veículos",
          "description": "No menu suspenso que se abre, clique na opção **Veículos** para acessar a listagem de veículos."
        }
      ],
      "screenshots": [
        {
          "id": "print-odvr8q",
          "caption": "Menu lateral com o submenu de cadastros aberto, destacando a opção Veículos.",
          "hotspots": [
            {
              "h": 21.9,
              "w": 7.8,
              "x": 0,
              "y": 35.6,
              "id": "ponto-1-1-sdr0d7",
              "tip": "Use para acessar a tela de veículos.",
              "title": "Cadastro",
              "description": "Clique nesta opção para abrir a listagem de cadastros"
            },
            {
              "h": 9.9,
              "w": 17.1,
              "x": 7.9,
              "y": 34.2,
              "id": "ponto-gjfin6",
              "title": "Veículos",
              "description": "No menu suspenso que se abre, clique na opção **Veículos** para acessar a listagem de veículos."
            }
          ]
        },
        {
          "id": "print-xcp6fn",
          "caption": "Tela de listagem de veículos com opções de busca e cadastro.",
          "hotspots": [
            {
              "h": 13,
              "w": 91.3,
              "x": 7.5,
              "y": 27.1,
              "id": "ponto-2-1-gulz2p",
              "title": "Listagem de Veículos",
              "description": "Neste campo mostra toda a listagens de veículos cadastrados "
            },
            {
              "h": 7.6,
              "w": 10,
              "x": 87.5,
              "y": 28.5,
              "id": "ponto-2-2-eq35yh",
              "title": "Opções",
              "description": "Opções de Duplicar Veículo podendo editar informações e opção de duplicar "
            },
            {
              "h": 6.3,
              "w": 16.2,
              "x": 23.5,
              "y": 13,
              "id": "ponto-2-3-b8h3mq",
              "title": "Procurar",
              "description": "Digite termos para buscar veículos específicos na lista."
            }
          ]
        },
        {
          "id": "print-4si8vt",
          "caption": "Aba de Dados do Veículo na tela de edição.",
          "hotspots": [
            {
              "h": 6.7,
              "w": 14.8,
              "x": 7.6,
              "y": 69.2,
              "id": "ponto-3-1-gkgde8",
              "title": "Veículo próprio",
              "description": "Marque esta caixa se o veículo pertencer à frota própria da empresa."
            },
            {
              "h": 12.7,
              "w": 10.5,
              "x": 89.5,
              "y": 78.9,
              "id": "ponto-3-2-62p711",
              "title": "Salvar / Avançar",
              "description": "Clique para salvar as alterações ou avançar nas etapas de cadastro."
            },
            {
              "h": 15.2,
              "w": 8.2,
              "x": 8,
              "y": 36.1,
              "id": "ponto-fkfcp3",
              "title": "Ativo",
              "description": "Ao Clicar pode ativar ou desativar o cadastro"
            }
          ]
        },
        {
          "id": "print-llyg0q",
          "caption": "Aba de Reboques na tela de edição de veículo.",
          "hotspots": [
            {
              "h": 7.9,
              "w": 14.6,
              "x": 45.5,
              "y": 40,
              "id": "ponto-4-1-1awi6j",
              "title": "Adicionar Reboque",
              "description": "Clique para vincular um reboque favorito ao veículo."
            },
            {
              "h": 15.8,
              "w": 9.3,
              "x": 90.5,
              "y": 49,
              "id": "ponto-4-2-40l1jg",
              "tip": "Essencial para concluir a edição.",
              "title": "Salvar",
              "description": "Clique para salvar definitivamente todas as alterações do veículo."
            }
          ]
        }
      ],
      "position": 10
    },
    {
      "id": "aula-nw60v3",
      "module_id": "cadastros",
      "title": "Cadastro de Condutores",
      "summary": "Aprenda a visualizar, pesquisar e cadastrar novos condutores no sistema Emissor Future.",
      "path": "Cadastros > Condutores",
      "content": "# Introdução\nNesta aula, você aprenderá a gerenciar o cadastro de condutores no Emissor Future, permitindo adicionar novos motoristas e consultar os registros existentes de forma rápida e segura.\n\n## Objetivo\nO objetivo é orientar o usuário na navegação pelo menu de cadastros, utilização da barra de pesquisa e preenchimento correto dos dados de um novo condutor.\n\n## Passo a Passo\n\n### Print 1 - Acessando a Listagem de Condutores\n1. No menu lateral esquerdo, clique na aba **Cadastros**.\n2. No submenu suspenso, selecione a opção **Condutores**.\n3. Utilize o campo **Procurar** para buscar um condutor já cadastrado pelo nome.\n4. Clique no botão **Novo Condutor** para iniciar um novo registro.\n\n### Print 2 - Visualizando Detalhes dos Condutores\n1. Verifique a listagem completa com o **CPF** e **Nome** dos condutores cadastrados.\n2. Utilize o seletor **Ordenar por** para organizar a exibição alfabética por nome.\n3. Acompanhe o status do condutor através da etiqueta **Ativo** e gerencie opções individuais clicando em **Opções**.\n\n### Print 3 - Cadastrando um Novo Condutor\n1. Ative a chave **Ativo** para garantir que o cadastro esteja habilitado.\n2. Preencha o campo **CPF** com o número de identificação do motorista.\n3. Digite o **Nome** completo do condutor no campo correspondente.\n4. Clique no botão **Salvar** para concluir o cadastro.",
      "hotspots": [
        {
          "h": 28.3,
          "w": 7.2,
          "x": 0.4,
          "y": 31.7,
          "id": "ponto-1-1-vc564w",
          "tip": "Acesse itens como produtos, clientes e condutores.",
          "title": "Menu Cadastros",
          "description": "Clique para abrir as opções de cadastros do sistema."
        },
        {
          "h": 13.5,
          "w": 17.9,
          "x": 6.5,
          "y": 42,
          "id": "ponto-1-2-ncnydv",
          "title": "Condutores",
          "description": "Selecione esta opção para acessar a gestão de condutores."
        },
        {
          "h": 11,
          "w": 13.5,
          "x": 21.5,
          "y": 11.5,
          "id": "ponto-1-3-9heb4a",
          "title": "Campo Procurar",
          "description": "Digite para pesquisar condutores já cadastrados."
        },
        {
          "h": 12.5,
          "w": 18,
          "x": 82,
          "y": 11,
          "id": "ponto-1-4-wrtqd9",
          "title": "Botão Novo Condutor",
          "description": "Clique para abrir o formulário de cadastro de um novo condutor."
        }
      ],
      "screenshots": [
        {
          "id": "print-jnl92b",
          "caption": "Tela inicial da listagem de condutores com o menu de cadastros aberto",
          "hotspots": [
            {
              "h": 28.3,
              "w": 7.2,
              "x": 0.4,
              "y": 31.7,
              "id": "ponto-1-1-vc564w",
              "tip": "Acesse itens como produtos, clientes e condutores.",
              "title": "Menu Cadastros",
              "description": "Clique para abrir as opções de cadastros do sistema."
            },
            {
              "h": 13.5,
              "w": 17.9,
              "x": 6.5,
              "y": 42,
              "id": "ponto-1-2-ncnydv",
              "title": "Condutores",
              "description": "Selecione esta opção para acessar a gestão de condutores."
            },
            {
              "h": 11,
              "w": 13.5,
              "x": 21.5,
              "y": 11.5,
              "id": "ponto-1-3-9heb4a",
              "title": "Campo Procurar",
              "description": "Digite para pesquisar condutores já cadastrados."
            },
            {
              "h": 12.5,
              "w": 18,
              "x": 82,
              "y": 11,
              "id": "ponto-1-4-wrtqd9",
              "title": "Botão Novo Condutor",
              "description": "Clique para abrir o formulário de cadastro de um novo condutor."
            }
          ]
        },
        {
          "id": "print-xo7umz",
          "caption": "Listagem de condutores detalhando CPF e Nome",
          "hotspots": [
            {
              "h": 6.2,
              "w": 12.9,
              "x": 8.1,
              "y": 12.7,
              "id": "ponto-2-1-34amj7",
              "title": "Ordenar por Nome",
              "description": "Selecione o critério de ordenação da lista de condutores."
            },
            {
              "h": 6.8,
              "w": 14.6,
              "x": 20.5,
              "y": 12,
              "id": "ponto-2-2-22t2sa",
              "title": "Campo Procurar",
              "description": "Busque rapidamente por condutores na lista."
            },
            {
              "h": 12.7,
              "w": 16.5,
              "x": 82.5,
              "y": 9,
              "id": "ponto-2-3-vr8lgf",
              "title": "Botão Novo Condutor",
              "description": "Inicie o cadastro de um novo condutor a partir desta tela."
            },
            {
              "h": 9.4,
              "w": 9.4,
              "x": 88.5,
              "y": 29.5,
              "id": "ponto-2-4-icxvrn",
              "title": "Botão Opções",
              "description": "Exibe ações adicionais para o registro do condutor. Editar"
            }
          ]
        },
        {
          "id": "print-ohng1e",
          "caption": "Formulário para cadastrar um novo condutor",
          "hotspots": [
            {
              "h": 15.8,
              "w": 7.6,
              "x": 13,
              "y": 29,
              "id": "ponto-3-1-dfmwfk",
              "tip": "Mantenha ativado para uso imediato.",
              "title": "Chave Ativo",
              "description": "Ative ou desative o status do cadastro do condutor."
            },
            {
              "h": 13.8,
              "w": 23.4,
              "x": 23,
              "y": 31,
              "id": "ponto-3-2-lsdw8u",
              "title": "Campo CPF",
              "description": "Digite o número de CPF válido do condutor."
            },
            {
              "h": 15.1,
              "w": 52.7,
              "x": 46,
              "y": 30,
              "id": "ponto-3-3-o19t8y",
              "title": "Campo Nome",
              "description": "Informe o nome completo do condutor."
            },
            {
              "h": 12.7,
              "w": 10.9,
              "x": 89,
              "y": 51,
              "id": "ponto-3-4-m4plzc",
              "tip": "Verifique os dados antes de salvar.",
              "title": "Botão Salvar",
              "description": "Clique para gravar as informações do novo condutor."
            }
          ]
        }
      ],
      "position": 11
    },
    {
      "id": "aula-ysay7f",
      "module_id": "cadastros",
      "title": "Natureza de Operação",
      "summary": "Aprenda a consultar, gerenciar, importar/exportar e cadastrar novas naturezas de operação no sistema, configurando corretamente o tipo de movimentação, a finalidade da nota fiscal e as regras de cálculo de impostos (como IBPT e ICMS).",
      "path": "Cadastros > Natureza de Operação",
      "content": "1.   **Acessar o menu de cadastros**\n\t• No menu lateral esquerdo, clique em Cadastros.\n\t• Selecione a opção Natureza de Operação.\n2. **Consultar e gerenciar registros existentes**\n\t• Utilize a barra Procurar ou o filtro Ordenar por para localizar uma natureza já cadastrada.\n\t• Clique no botão Opções (no canto superior direito) para Exportar Naturezas ou Importar Naturezas em lote.\n\t• Para editar ou gerenciar um item específico da lista, clique no botão Opções na linha correspondente.\n3. **Cadastrar uma nova Natureza de Operação**\n\t• Clique no botão roxo Nova Natureza no canto superior direito.\n\t• Defina os status iniciais ativando ou desativando as chaves Ativa e Padrão (que define a operação principal para suas emissões).\n\t• Preencha o Nome de identificação interna da operação.\n\t• Selecione o Tipo de operação (Entrada ou Saída) e a Finalidade de emissão da NF-e.\n4. **Configurar descrições e observações fiscais**\n\t• Digite a Descrição da natureza, lembrando que esse texto será impresso no cabeçalho da Nota Fiscal.\n\t• Caso necessário, adicione informações complementares padrão no campo Observações NFe/NFCe.\n5. **Definir regras tributárias e de cálculo**\n\t• Em Cálculo IBPT, escolha como o sistema deve calcular a lei da transparência fiscal (Automático, Sempre ou Nunca).\n\t• Marque as caixas de seleção inferiores conforme a necessidade fiscal da sua empresa:\n\t\t• Somar ICMS desonerado no total da NFe\n\t\t• Zerar bases de cálculo e alíquotas\n\t\t• Somar IBS/CBS no ICMS\n\t\t• Incluir valor ICMS na base PIS/COFINS\n\t\t• Não somar imposto de Importação no Total da Nota\n",
      "hotspots": [
        {
          "h": 25.7,
          "w": 7.2,
          "x": 0.3,
          "y": 30.1,
          "id": "ponto-uj5jjb",
          "title": "Menu Cadastro",
          "description": "Abre as opções de registros gerais do sistema"
        },
        {
          "h": 10.8,
          "w": 16.8,
          "x": 7.4,
          "y": 51,
          "id": "ponto-7fc9ma",
          "title": "Natureza de Operação",
          "description": "Acessa a tela de listagem e configuração das naturezas fiscais"
        }
      ],
      "screenshots": [
        {
          "id": "print-kdsz6v",
          "caption": "natureza da operação 1",
          "hotspots": [
            {
              "h": 25.7,
              "w": 7.2,
              "x": 0.3,
              "y": 30.1,
              "id": "ponto-uj5jjb",
              "title": "Menu Cadastro",
              "description": "Abre as opções de registros gerais do sistema"
            },
            {
              "h": 10.8,
              "w": 16.8,
              "x": 7.4,
              "y": 51,
              "id": "ponto-7fc9ma",
              "title": "Natureza de Operação",
              "description": "Acessa a tela de listagem e configuração das naturezas fiscais"
            }
          ]
        },
        {
          "id": "print-omjkql",
          "caption": "natureza da operação 2",
          "hotspots": [
            {
              "h": 8,
              "w": 26.4,
              "x": 8.5,
              "y": 11.8,
              "id": "ponto-yqplar",
              "title": "Ordenar por / Procurar",
              "description": "Filtra e organiza as naturezas de operação já cadastradas."
            },
            {
              "h": 8.6,
              "w": 10.9,
              "x": 73.5,
              "y": 11.1,
              "id": "ponto-fnpvfx",
              "title": "Botão Opções",
              "description": "Permite exportar ou importar planilhas/arquivos de naturezas de operação."
            },
            {
              "h": 7.7,
              "w": 14,
              "x": 85,
              "y": 12.1,
              "id": "ponto-yskwnh",
              "title": "Nova Natureza",
              "description": "Ao clicar vai para o cadastro de uma nova natureza, podendo criar quantas quiser "
            },
            {
              "h": 25.3,
              "w": 63.8,
              "x": 9,
              "y": 27.1,
              "id": "ponto-ecqoat",
              "title": "Lista de Naturezas Cadastradas",
              "description": "Lista de Naturezas Cadastradas, mostrando qual esta ativa e a que esta com o padrão vai ser usada na emissão."
            },
            {
              "h": 9.3,
              "w": 7.7,
              "x": 89.9,
              "y": 29,
              "id": "ponto-1d77bj",
              "title": "Opção",
              "description": "Editar a Natureza cadastrada"
            }
          ]
        },
        {
          "id": "print-jzjprw",
          "caption": "natureza da operação 3",
          "hotspots": [
            {
              "h": 14.2,
              "w": 20.1,
              "x": 14.1,
              "y": 1.8,
              "id": "ponto-vt0an1",
              "title": "Ativa / Padrão",
              "description": "Define se a operação está disponível para uso e se será selecionada automaticamente nas notas"
            },
            {
              "h": 14.8,
              "w": 59.3,
              "x": 38.2,
              "y": 1.8,
              "id": "ponto-pi1eoe",
              "title": "Nome / Tipo / Finalidade",
              "description": "Dados principais que classificam o movimento fiscal da nota.\n\nNome\n\nTipo de Operação - Saída e Entrada\n\nFinalidade de emissão da NF-e \n\n• 1 - NF-e normal (opção selecionada/destacada)\n• 2 - NF-e complementar\n• 3 - NF-e de ajuste\n• 4 - Devolução/Retorno\n• 5 - Nota de Crédito\n• 6 - Nota de Débito\nSe você precisar de ajuda para escolher ou entender a diferença entre essas finalidades de NF-e, informe qual tipo de operação fiscal deseja realizar para que eu possa explicar a opção ideal.\n"
            },
            {
              "h": 12.3,
              "w": 87.6,
              "x": 9.8,
              "y": 16,
              "id": "ponto-kges10",
              "title": "Descrição da natureza",
              "description": "Texto oficial que sairá impresso no documento fiscal"
            },
            {
              "h": 14.5,
              "w": 29.4,
              "x": 9.5,
              "y": 50.7,
              "id": "ponto-r8jv6x",
              "title": "Cálculo IBPT e Regras Fiscais",
              "description": "Parametrizações avançadas para composição de impostos e totais da NF-e.\n"
            }
          ]
        }
      ],
      "position": 12
    },
    {
      "id": "aula-62p25r",
      "module_id": "cadastros",
      "title": "Gerenciamento e Edição de Grupos Tributários",
      "summary": "Nesta aula, você aprenderá a navegar pelos Grupos Tributários, visualizar a lista de cadastros, editar as informações principais de um grupo e configurar as regras tributárias detalhadas para ICMS, PIS, COFINS e IPI.",
      "path": "Cadastros > Grupo Tributário",
      "content": "\n# Situação prática: aviso de CST incompatível com o regime tributário\n\nSe, ao emitir uma nota, aparecer uma mensagem indicando que um produto está com CST em uma empresa do Simples Nacional, comece a conferência por **Cadastros → Grupo Tributário**. O CST/CSOSN da regra fiscal é configurado dentro do grupo, na seção **Regras Tributárias**. O cadastro do produto apenas seleciona o grupo e a origem; ele não é o local para editar os detalhes da regra.\n\nAntes de alterar, localize o grupo vinculado ao produto e confira se existe uma regra que corresponda à Natureza de Operação, CFOP, tipo de destinatário e UF de destino da nota. Edite a regra aplicável e revise o campo **CST / CSOSN** na seção ICMS. Se não existir regra compatível, avalie adicionar uma, sem duplicar regras existentes.\n\nDepois de salvar, volte a **Cadastros → Produtos → produto desejado → aba Tributação** e confirme se o grupo correto está selecionado. O código fiscal não deve ser escolhido por tentativa: confirme a classificação adequada com a contabilidade, considerando o regime e a operação.\n\n---\n\n\n\n## Introdução\n\nNesta aula prática, vamos explorar o módulo de **Grupos Tributários** do Emissor Future. O gerenciamento correto dos grupos tributários garante que a emissão dos seus documentos fiscais ocorra de maneira automatizada e em conformidade com a legislação aplicável ao seu regime de tributação.\n\n---\n\n## Print 1: Acessando a Tela Inicial de Grupos Tributários\n\nNo primeiro print, visualizamos a navegação lateral onde a seção **Cadastros** está selecionada, destacando a opção **Grupo Tributário**.\n\n### O que fazer nesta tela:\n1. Observe o menu lateral esquerdo para confirmar que está na seção correta (**Cadastros**).\n2. Clique em **Grupo Tributário** para abrir a listagem geral.\n3. Utilize a barra de pesquisa **Procurar** se precisar localizar um grupo específico já cadastrado.\n4. Use o botão **Opções** ou clique em **Novo Grupo Tributário** caso deseje iniciar um novo cadastro do zero.\n\n---\n\n## Print 2: Visualizando a Listagem de Grupos\n\nAqui temos a tela de listagem de grupos tributários carregada, mostrando registros como *Produto Substituído*, *Padrão - Simples Nacional* e *Fabricação - Simples Nacional*.\n\n### O que fazer nesta tela:\n1. Utilize o seletor **Ordenar por** para organizar a visualização dos cadastros.\n2. Utilize a barra **Procurar** para filtrar rapidamente pelo nome do grupo.\n3. Clique no botão **Opções** ao lado de cada registro para acessar ações secundárias, como editar ou excluir o grupo tributário desejado.\n\n---\n\n## Print 3: Editando Dados do Grupo Tributário\n\nNesta etapa, abrimos a tela de edição de um grupo tributário existente (ex: *Padrão - Simples Nacional*).\n\n### O que fazer nesta tela:\n1. Revise o campo **Nome** e a **Descrição** opcional do grupo tributário.\n2. Alterne a chave **Padrão** caso deseje definir este grupo como o padrão para novos cadastros.\n3. Role a página para baixo até a seção **Regras Tributárias** e clique no botão **Adicionar Regra** para incluir ou ajustar tributações específicas (como CFOP, UFs, CST de ICMS, PIS e COFINS).\n\n---\n\n## Print 4: Configurando a Regra Tributária Detalhada\n\nO último print exibe a janela modal de configuração de regras tributárias para o grupo.\n\n### O que fazer nesta tela:\n1. Preencha os campos de **Identificação**: selecione a **Natureza de Operação**, o **CFOP**, o **Tipo Destinatário** e as **UFs Destino**.\n2. Configure a seção **ICMS** escolhendo o **CST / CSOSN** adequado.\n3. Defina os parâmetros de **PIS / COFINS** e **IPI** preenchendo os CSTs e alíquotas correspondentes.\n4. Ao finalizar todas as parametrizações fiscais, clique no botão **Salvar** localizado no canto inferior direito da janela modal para gravar as alterações.",
      "hotspots": [
        {
          "h": 24,
          "w": 6.3,
          "x": 0.3,
          "y": 25.5,
          "id": "ponto-utl1q8",
          "title": "Cadastro",
          "description": "Listagem de cadastro disponíveis no sistema"
        },
        {
          "h": 8.9,
          "w": 15.4,
          "x": 6.7,
          "y": 54,
          "id": "ponto-uw8efs",
          "title": "Grupo Tributário",
          "description": "Listagem e cadastro de Grupos Tributários e Regras Tributarias "
        },
        {
          "h": 1,
          "w": 1,
          "x": 70.5,
          "y": 12.5,
          "id": "ponto-1-1-ngrcb5",
          "tip": "Clique para ver mais ações",
          "title": "Botão Opções",
          "description": "Opções de Exportar e importar grupos em Excel"
        },
        {
          "h": 1,
          "w": 1,
          "x": 81.5,
          "y": 13.5,
          "id": "ponto-1-2-3g3fd6",
          "tip": "Use para criar um grupo",
          "title": "Novo Grupo Tributário",
          "description": "Abre o formulário para cadastrar um novo grupo tributário no sistema."
        },
        {
          "h": 1,
          "w": 1,
          "x": 22.5,
          "y": 13.5,
          "id": "ponto-1-3-xmymll",
          "tip": "Digite para filtrar",
          "title": "Barra de Pesquisa (Procurar)",
          "description": "Permite buscar grupos tributários já cadastrados digitando parte do nome."
        },
        {
          "h": 1,
          "w": 1,
          "x": 89.5,
          "y": 41.5,
          "id": "ponto-1-4-lv1616",
          "title": "Botão Opções da Linha",
          "description": "Abre o menu contextual para editar, duplicar, exportar e excluir o grupo tributário específico da linha."
        }
      ],
      "screenshots": [
        {
          "id": "print-slp2v1",
          "caption": "Menu lateral e barra de ações da listagem de Grupos Tributários",
          "hotspots": [
            {
              "h": 24,
              "w": 6.3,
              "x": 0.3,
              "y": 25.5,
              "id": "ponto-utl1q8",
              "title": "Cadastro",
              "description": "Listagem de cadastro disponíveis no sistema"
            },
            {
              "h": 8.9,
              "w": 15.4,
              "x": 6.7,
              "y": 54,
              "id": "ponto-uw8efs",
              "title": "Grupo Tributário",
              "description": "Listagem e cadastro de Grupos Tributários e Regras Tributarias "
            },
            {
              "h": 1,
              "w": 1,
              "x": 70.5,
              "y": 12.5,
              "id": "ponto-1-1-ngrcb5",
              "tip": "Clique para ver mais ações",
              "title": "Botão Opções",
              "description": "Opções de Exportar e importar grupos em Excel"
            },
            {
              "h": 1,
              "w": 1,
              "x": 81.5,
              "y": 13.5,
              "id": "ponto-1-2-3g3fd6",
              "tip": "Use para criar um grupo",
              "title": "Novo Grupo Tributário",
              "description": "Abre o formulário para cadastrar um novo grupo tributário no sistema."
            },
            {
              "h": 1,
              "w": 1,
              "x": 22.5,
              "y": 13.5,
              "id": "ponto-1-3-xmymll",
              "tip": "Digite para filtrar",
              "title": "Barra de Pesquisa (Procurar)",
              "description": "Permite buscar grupos tributários já cadastrados digitando parte do nome."
            },
            {
              "h": 1,
              "w": 1,
              "x": 89.5,
              "y": 41.5,
              "id": "ponto-1-4-lv1616",
              "title": "Botão Opções da Linha",
              "description": "Abre o menu contextual para editar, duplicar, exportar e excluir o grupo tributário específico da linha."
            }
          ]
        },
        {
          "id": "print-0bcroz",
          "caption": "Tela principal de Grupos Tributários com a listagem completa de cadastros",
          "hotspots": [
            {
              "h": 8.1,
              "w": 14.4,
              "x": 8,
              "y": 10,
              "id": "ponto-2-1-7157oj",
              "tip": "Selecione a ordenação",
              "title": "Ordenar por",
              "description": "Permite ordenar a listagem de grupos por data de cadastro ou outros critérios."
            },
            {
              "h": 7.4,
              "w": 13.3,
              "x": 22.5,
              "y": 10.5,
              "id": "ponto-2-2-o5ihyb",
              "title": "Procurar",
              "description": "Campo de busca rápida para filtrar registros na tabela."
            },
            {
              "h": 1,
              "w": 1,
              "x": 89,
              "y": 40,
              "id": "ponto-2-3-42zryb",
              "title": "Opções",
              "description": "Abre o menu de opções gerais para a listagem."
            },
            {
              "h": 1,
              "w": 1,
              "x": 81,
              "y": 12.5,
              "id": "ponto-2-4-nn1u60",
              "tip": "Clique para novo cadastro",
              "title": "Novo Grupo Tributário",
              "description": "Permite iniciar o cadastro de um novo grupo tributário."
            }
          ]
        },
        {
          "id": "print-xlq79z",
          "caption": "Painel de edição do grupo tributário e suas regras tributárias associadas",
          "hotspots": [
            {
              "h": 1,
              "w": 1,
              "x": 11,
              "y": 23,
              "id": "ponto-3-1-8728jz",
              "tip": "Ative se for o padrão",
              "title": "Chave Padrão",
              "description": "Define se este grupo tributário será marcado como padrão no sistema."
            },
            {
              "h": 1,
              "w": 1,
              "x": 87,
              "y": 59,
              "id": "ponto-3-2-8ycyvx",
              "tip": "Clique para nova regra",
              "title": "Adicionar Regra",
              "description": "Abre a janela para adicionar uma nova regra tributária ao grupo."
            },
            {
              "h": 1,
              "w": 1,
              "x": 88,
              "y": 75.5,
              "id": "ponto-3-3-8xavew",
              "title": "Editar Regra",
              "description": "Permite editar a regra tributária correspondente à linha."
            },
            {
              "h": 1,
              "w": 1,
              "x": 92,
              "y": 75.5,
              "id": "ponto-3-4-kqxuc0",
              "title": "Duplicar Regra",
              "description": "Cria uma cópia da regra tributária selecionada."
            },
            {
              "h": 1,
              "w": 1,
              "x": 96,
              "y": 75.5,
              "id": "ponto-3-5-lmu2eq",
              "title": "Excluir Regra",
              "description": "Remove a regra tributária do grupo."
            }
          ]
        },
        {
          "id": "print-b6rdh6",
          "caption": "Janela modal para cadastro ou edição de Regra Tributária",
          "hotspots": [
            {
              "h": 9.3,
              "w": 19.7,
              "x": 21.5,
              "y": 9.5,
              "id": "ponto-4-1-oy6f45",
              "tip": "Escolha a natureza",
              "title": "Natureza de Operação",
              "description": "Selecione a natureza de operação aplicável a esta regra fiscal."
            },
            {
              "h": 9.8,
              "w": 18.5,
              "x": 41,
              "y": 9,
              "id": "ponto-4-2-esmwkb",
              "tip": "Informe o CFOP",
              "title": "CFOP",
              "description": "Selecione o Código Fiscal de Operações e Prestações correspondente."
            },
            {
              "h": 10.1,
              "w": 19.2,
              "x": 59,
              "y": 9,
              "id": "ponto-4-3-twjyuf",
              "tip": "Selecione o público",
              "title": "Tipo Destinatário",
              "description": "Define se a regra se aplica a todos os destinatários ou a tipos específicos."
            },
            {
              "h": 9.3,
              "w": 56.3,
              "x": 22,
              "y": 20,
              "id": "ponto-4-4-hkykoe",
              "tip": "Deixe vazio para todas as UFs",
              "title": "UFs Destino",
              "description": "Informe os estados de destino em que esta regra tributária será aplicada."
            },
            {
              "h": 7.9,
              "w": 45.7,
              "x": 22.5,
              "y": 39,
              "id": "ponto-4-5-ki3v58",
              "tip": "Selecione o CST correto",
              "title": "CST / CSOSN",
              "description": "Selecione o Código de Situação Tributária aplicável ao ICMS."
            },
            {
              "h": 8.6,
              "w": 8.2,
              "x": 69.2,
              "y": 38,
              "id": "ponto-50gasj",
              "title": "Código Benef. Fiscal",
              "description": "Identifica o código de benefício fiscal (cBenef) concedido pelo estado para operações com isenção, redução de base de cálculo ou diferimento de ICMS. Deve ser preenchido apenas se a legislação da UF de destino exigir e o produto possuir incentivo fiscal"
            },
            {
              "h": 9.7,
              "w": 12.5,
              "x": 23.1,
              "y": 54.1,
              "id": "ponto-yyz5yi",
              "title": "CST PIS",
              "description": "Define o Código de Situação Tributária do PIS para a operação, indicando se o produto é tributado, isento, alíquota zero ou monofásico. Quando deixado como \"Padrão da Empresa\", o sistema utiliza a configuração geral já definida no cadastro fiscal da empresa."
            },
            {
              "h": 8.9,
              "w": 13,
              "x": 37.2,
              "y": 54.7,
              "id": "ponto-wzedc2",
              "title": "Alíquota PIS",
              "description": "• Indica o percentual de imposto do PIS a ser aplicado sobre o valor do produto. Para empresas optantes pelo Simples Nacional ou produtos com alíquota zero, esse campo costuma permanecer em 0,0000 %."
            },
            {
              "h": 8.3,
              "w": 13.8,
              "x": 50.5,
              "y": 54.7,
              "id": "ponto-bvwrra",
              "title": "CST COFINS",
              "description": "Define o Código de Situação Tributária da COFINS para a operação, seguindo a mesma lógica de tributação do PIS. Ao manter \"Padrão da Empresa\", o sistema herda a regra tributária principal configurada para o emitente."
            },
            {
              "h": 9.2,
              "w": 13.3,
              "x": 64.4,
              "y": 54.4,
              "id": "ponto-1tna58",
              "title": "Alíquota COFINS",
              "description": "Indica o percentual de imposto da COFINS calculado na operação. Assim como no PIS, permanece zerado para empresas do Simples Nacional (que recolhem via DAS) ou em operações isentas."
            },
            {
              "h": 8.3,
              "w": 12.5,
              "x": 23.3,
              "y": 71.6,
              "id": "ponto-kglbrq",
              "title": "CST IPI",
              "description": "Define o Código de Situação Tributária do Imposto sobre Produtos Industrializados. O código \"99 - Outras saídas\" é o padrão mais utilizado por empresas comerciais (varejistas ou atacadistas) que não são contribuintes do IPI."
            },
            {
              "h": 8,
              "w": 14,
              "x": 36.4,
              "y": 71.9,
              "id": "ponto-pei0m8",
              "title": "Alíquota IPI",
              "description": "• Informa o percentual do IPI incidente sobre a mercadoria. Para empresas não equiparadas a indústria ou operações sem incidência, deve ser mantido em 0,00 %."
            },
            {
              "h": 8,
              "w": 13.8,
              "x": 50.9,
              "y": 71.9,
              "id": "ponto-hpcpc1",
              "title": "Cod. Enquadramento Legal",
              "description": "• Identifica o enquadramento legal da operação junto à Receita Federal para justificar a tributação ou isenção do IPI. O código \"999\" é o padrão geral utilizado para operações tributadas normalmente ou outras saídas sem enquadramento específico."
            },
            {
              "h": 4.3,
              "w": 11.4,
              "x": 22.6,
              "y": 80.7,
              "id": "ponto-gyp96g",
              "title": "IPI soma na BC do ICMS",
              "description": "• Caixa de seleção que determina se o valor do IPI destacado deve ser somado ao valor total dos produtos para formar a Base de Cálculo do ICMS. Geralmente fica desmarcada em vendas destinadas à revenda ou industrialização, sendo marcada apenas em vendas para consumidor final não contribuinte quando há incidência de IPI.\n"
            },
            {
              "h": 7.5,
              "w": 27.5,
              "x": 22.9,
              "y": 91.1,
              "id": "ponto-jn4ykn",
              "title": "CST IBS/CBS",
              "description": "Define o Código de Situação Tributária referente aos novos tributos da Reforma Tributária (Imposto sobre Bens e Serviços e Contribuição sobre Bens e Serviços). Este campo será utilizado conforme o cronograma de transição e obrigatoriedade da Receita Federal"
            },
            {
              "h": 7.7,
              "w": 27.3,
              "x": 51,
              "y": 90.5,
              "id": "ponto-kq5b42",
              "title": "Classificação Tributária (cClassTrib)",
              "description": "• Identifica a classificação específica da mercadoria ou operação dentro das novas regras de IBS e CBS, determinando alíquotas diferenciadas, reduções ou regimes específicos conforme a legislação vigente.\n"
            }
          ]
        }
      ],
      "position": 13
    },
    {
      "id": "aula-fxuptb",
      "module_id": "documentos",
      "title": "Emissão e Consulta de NFe",
      "summary": "Nesta aula, você aprenderá a acessar o painel de notas eletrônicas, navegar pelas listagens de NFe autorizadas, preencher os dados de emissão, adicionar produtos, configurar transporte e pagamentos, e concluir a emissão da Nota Fiscal Eletrônica.",
      "path": "Documentos > Nota Eletrônica > NFe",
      "content": "# Emissão e Consulta de NFe\n\nOlá! Seja bem-vindo(a) à nossa aula prática sobre o **Emissor Future**. Nesta aula, vamos percorrer o processo completo para consultar notas fiscais eletrônicas já emitidas e realizar o lançamento de uma nova NFe, preenchendo todas as abas obrigatórias do sistema.\n\n## Objetivo\nCapacitar o operador a navegar pelo módulo de Notas Eletrônicas, utilizar os filtros de busca, iniciar uma nova emissão de NFe e preencher corretamente os dados de cabeçalho, cliente, itens, impostos, totais, transporte, pagamentos e informações adicionais até a finalização.\n\n---\n\n## Passo a Passo Detalhado\n\n### Print 1: Acesso ao Menu de Notas Eletrônicas\n1. No menu lateral esquerdo, clique em **DOCUMENTOS**.\n2. No menu suspenso que se abre, passe o mouse ou clique em **Nota Eletrônica**.\n3. Observe as opções disponíveis como Nota do Consumidor, Nota de Serviço, MDFe, CTe e Exportar XML.\n\n### Print 2: Tela Inicial de Listagem de NFe\n1. Visualize a listagem das notas fiscais eletrônicas emitidas.\n2. Utilize a barra de **Procurar** ou a **Busca Avançada** para localizar notas específicas.\n3. Clique no botão **Emitir NFe** (no canto superior direito) para iniciar a criação de um novo documento.\n\n### Print 3: Cabeçalho e Dados do Cliente\n1. Preencha ou confira a **Data Emissão**.\n2. Selecione a **Natureza da operação** (ex.: Venda), **Tipo de operação** e **Finalidade**.\n3. Na seção **Destinatário/Cliente**, selecione o cliente desejado utilizando o campo de busca ou o botão de cadastro rápido.\n\n### Print 4: Lançamento de Produtos e Impostos\n1. Na seção de itens, utilize a **Busca por Código** para localizar o produto.\n2. Informe a **Quantidade** e verifique o **Valor Unitário** e **Valor Total**.\n3. Clique em **+ Adicionar** para incluir o item na tabela da nota.\n4. Confira os campos de **Impostos** (BC ICMS, Valor ICMS, PIS, COFINS, etc.) conforme a regra fiscal aplicável.\n\n### Print 5: Totais, Transporte e Faturamento\n1. Confira o resumo na seção **Totais** (quantidade de itens, valor dos produtos e valor total da nota).\n2. Configure a seção **Transporte** selecionando o tipo de operação e preenchendo os dados de peso, se houver.\n3. Na aba **Pagamentos** / **Faturas**, configure o intervalo de dias e número de parcelas, clicando em **Gerar Faturas**.\n\n### Print 6: Finalização e Emissão\n1. Role até o final da página e confira seções opcionais como **Outras Informações** e **Referências**.\n2. Utilize o botão **Salvar** para rascunhos ou **Pré-visualizar** para conferir o DANFE.\n3. Clique no botão verde **Gerar NFe** para transmitir a nota fiscal à SEFAZ.",
      "hotspots": [
        {
          "h": 28.6,
          "w": 7.9,
          "x": 0,
          "y": 57.1,
          "id": "ponto-1-1-gxvt02",
          "tip": "Clique para abrir o submenu",
          "title": "Menu Documentos",
          "description": "Acesse este menu para visualizar os documentos fiscais disponíveis no sistema para emissão."
        },
        {
          "h": 9.4,
          "w": 17.5,
          "x": 7.2,
          "y": 4.6,
          "id": "ponto-1-2-vhx5q0",
          "tip": "Atalho principal para nova emissão",
          "title": "NFe Nota Eletrônica",
          "description": "Módulo utilizado para emitir notas fiscais de venda, devolução ou remessa de produtos físicos."
        }
      ],
      "screenshots": [
        {
          "id": "print-5da6go",
          "caption": "Menu lateral expandido mostrando as opções de documentos e Nota Eletrônica.",
          "hotspots": [
            {
              "h": 28.6,
              "w": 7.9,
              "x": 0,
              "y": 57.1,
              "id": "ponto-1-1-gxvt02",
              "tip": "Clique para abrir o submenu",
              "title": "Menu Documentos",
              "description": "Acesse este menu para visualizar os documentos fiscais disponíveis no sistema para emissão."
            },
            {
              "h": 9.4,
              "w": 17.5,
              "x": 7.2,
              "y": 4.6,
              "id": "ponto-1-2-vhx5q0",
              "tip": "Atalho principal para nova emissão",
              "title": "NFe Nota Eletrônica",
              "description": "Módulo utilizado para emitir notas fiscais de venda, devolução ou remessa de produtos físicos."
            }
          ]
        },
        {
          "id": "print-qw7oca",
          "caption": "Tela de listagem de NFe com informações de número, série, data, destinatário, valor e status.",
          "hotspots": [
            {
              "h": 4,
              "w": 13,
              "x": 24,
              "y": 14,
              "id": "ponto-2-1-2ctlhv",
              "tip": "Busca rápida por texto",
              "title": "Campo Procurar",
              "description": "Filtros rápidos para localizar notas antigas por número, data, status ou nome do cliente"
            },
            {
              "h": 4,
              "w": 10,
              "x": 38,
              "y": 14,
              "id": "ponto-2-2-vnj5mk",
              "tip": "Filtros avançados",
              "title": "Busca Avançada",
              "description": "Clique para abrir filtros detalhados de pesquisa por período, status ou cliente."
            },
            {
              "h": 7.9,
              "w": 11.4,
              "x": 75,
              "y": 12,
              "id": "ponto-2-3-jqr9gx",
              "tip": "Ações complementares",
              "title": "Opções",
              "description": "Inutilizar Numeração"
            },
            {
              "h": 7.9,
              "w": 12.8,
              "x": 86,
              "y": 12,
              "id": "ponto-2-4-yy231s",
              "tip": "Criar nova nota",
              "title": "Emitir NFe",
              "description": "Botão para iniciar a emissão de uma nova NFe."
            },
            {
              "h": 72.8,
              "w": 79.3,
              "x": 8.9,
              "y": 27.2,
              "id": "ponto-9lvcih",
              "title": "Listagem de notas Emitidas e Status ",
              "description": "Listagem de notas Emitidas e Status "
            },
            {
              "h": 10.5,
              "w": 9.1,
              "x": 89.2,
              "y": 27.8,
              "id": "ponto-qe84ej",
              "title": "Opções",
              "description": "Visualizar\nEnviar por e-mail\nDuplicar\nCarta de Correção\nCancelar"
            }
          ]
        },
        {
          "id": "print-dfok04",
          "caption": "Formulário de emissão de NFe: dados gerais, emitente e destinatário.",
          "hotspots": [
            {
              "h": 44.3,
              "w": 21.9,
              "x": 9.1,
              "y": 16.3,
              "id": "ponto-3-1-m7pz9g",
              "tip": "Confira a data",
              "title": "Número / Data Emissão / Data de Saída",
              "description": "O número é gerado automaticamente pelo sistema na autorização. A data de emissão vem preenchida com o dia atual, e a data de saída deve ser informada apenas se a mercadoria sair em outro dia"
            },
            {
              "h": 5,
              "w": 20,
              "x": 34,
              "y": 45,
              "id": "ponto-3-2-cyaec5",
              "tip": "Campo obrigatório",
              "title": "Natureza da operação",
              "description": "Define o motivo da nota (ex: Venda, Devolução, Remessa). É este campo que puxa as regras tributárias configuradas anteriormente"
            },
            {
              "h": 5,
              "w": 14,
              "x": 56,
              "y": 45,
              "id": "ponto-3-3-b3ap88",
              "tip": "Geralmente Saída",
              "title": "Tipo de Operação",
              "description": "Indica se a mercadoria está saindo da empresa (Saída) ou entrando (Entrada, comum em devoluções de clientes)."
            },
            {
              "h": 5,
              "w": 20,
              "x": 72,
              "y": 45,
              "id": "ponto-3-4-p31s4i",
              "tip": "Normal",
              "title": "Finalidade",
              "description": "Define a finalidade da emissão da NF-e (ex.: Normal, Ajuste)."
            },
            {
              "h": 6,
              "w": 32,
              "x": 10,
              "y": 82,
              "id": "ponto-3-5-ph5htq",
              "tip": "Busque pelo nome ou CNPJ - Se o cliente não aparecer na busca, clique no ícone de + ao lado do campo para fazer um cadastro rápido sem sair da tela da nota",
              "title": "Destinatário / Cliente",
              "description": "Selecione o cliente para quem a nota será emitida."
            },
            {
              "h": 4,
              "w": 3,
              "x": 43,
              "y": 84,
              "id": "ponto-3-6-knydxk",
              "tip": "Novo cadastro",
              "title": "Adicionar Cliente",
              "description": "Clique no ícone de mais para cadastrar um novo cliente rapidamente."
            },
            {
              "h": 10.9,
              "w": 9.6,
              "x": 78.8,
              "y": 78.8,
              "id": "ponto-xn98dy",
              "title": "Uso e consumo",
              "description": "Chave que deve ser ativada caso o cliente esteja comprando o produto para uso próprio e não para revenda."
            }
          ]
        },
        {
          "id": "print-b4byih",
          "caption": "Seção de produtos, itens e apuração de impostos da NFe.",
          "hotspots": [
            {
              "h": 7.8,
              "w": 24.2,
              "x": 10.9,
              "y": 10.7,
              "id": "ponto-4-1-v9rdh7",
              "tip": "Pesquisar produto",
              "title": "Busca por Código",
              "description": "Digite o código ou descrição do produto para adicioná-lo."
            },
            {
              "h": 7.5,
              "w": 4.2,
              "x": 35.2,
              "y": 10.7,
              "id": "ponto-4-2-6nnqgr",
              "tip": "Inserir item",
              "title": "Adicionar Produto",
              "description": "Clique para incluir o produto buscado."
            },
            {
              "h": 8.8,
              "w": 12.9,
              "x": 40,
              "y": 11,
              "id": "ponto-4-3-p8zvip",
              "tip": "Qtd do item",
              "title": "Quantidade",
              "description": "Informe a quantidade do produto vendido."
            },
            {
              "h": 8.1,
              "w": 12.8,
              "x": 54.8,
              "y": 10.7,
              "id": "ponto-4-4-9mqs5l",
              "tip": "Preço unitário",
              "title": "Valor Unitário",
              "description": "Valor unitário do item selecionado."
            },
            {
              "h": 9.1,
              "w": 7.6,
              "x": 90,
              "y": 11,
              "id": "ponto-4-5-i9hvq6",
              "tip": "Incluir na lista",
              "title": "Botão Adicionar",
              "description": "Confirma a inclusão do item na tabela da nota."
            },
            {
              "h": 38.7,
              "w": 86.9,
              "x": 11,
              "y": 56.2,
              "id": "ponto-8xwbe8",
              "title": "Impostos",
              "description": "Quadro cinza de visualização automática (BC ICMS, Valor ICMS, IPI, PIS, COFINS). Os valores aparecem aqui conforme as regras fiscais configuradas no produto."
            }
          ]
        },
        {
          "id": "print-hfw156",
          "caption": "Totais, transporte, volumes e formas de pagamento da NFe.",
          "hotspots": [
            {
              "h": 23.7,
              "w": 87.5,
              "x": 11.2,
              "y": 0.1,
              "id": "ponto-0hbwac",
              "title": "Totais",
              "description": "Resumo geral da nota. Permite lançar valores extras de Frete, Acréscimos ou Desconto (em reais ou porcentagem) que afetam o Valor Nota"
            },
            {
              "h": 29.6,
              "w": 43.3,
              "x": 10.1,
              "y": 30.1,
              "id": "ponto-5-1-owz47w",
              "tip": "Opcional",
              "title": "Transporte ",
              "description": "(Tipo de operação): Define quem é o responsável pelo frete (ex: 0-Por conta do Emitente, 1-Por conta do Destinatário ou 9-Sem Ocorrência de Transporte quando o cliente retira no balcão)."
            },
            {
              "h": 42.2,
              "w": 43.3,
              "x": 9.9,
              "y": 57.8,
              "id": "ponto-5-3-6q8100",
              "tip": "Ex: 9-Sem Ocorrência",
              "title": "Transportadora",
              "description": "Campo para selecionar a empresa transportadora caso o frete seja terceirizado."
            },
            {
              "h": 68.5,
              "w": 44.9,
              "x": 54,
              "y": 31.5,
              "id": "ponto-5-6-hbc5if",
              "tip": "• Se a venda for à vista e sem envio por transportadora, mantenha o transporte na opção 9-Sem Ocorrência e gere apenas 1 parcela com vencimento para o mesmo dia.",
              "title": "Pagamentos (Faturas / Pagamentos)",
              "description": "Na aba Faturas, informe o intervalo de dias e o número de parcelas, depois clique em Gerar Faturas para criar as datas de vencimento. Na aba Pagamentos, defina a forma (Boleto, Pix, Dinheiro, Cartão)."
            }
          ]
        },
        {
          "id": "print-mdir24",
          "caption": "Rodapé com botões de ação para salvar, pré-visualizar e emitir a NFe.",
          "hotspots": [
            {
              "h": 51.3,
              "w": 41.7,
              "x": 10.8,
              "y": 5.2,
              "id": "ponto-16myqq",
              "title": "Volumes",
              "description": "Campos usados quando há transporte de carga (Peso líquido, Peso bruto, Quantidade de caixas, Espécie como \"Caixa\" ou \"Fardo\", Marca e Numeração)."
            },
            {
              "h": 14.2,
              "w": 86.9,
              "x": 11.2,
              "y": 57.7,
              "id": "ponto-hockqd",
              "title": "Outras Informações",
              "description": "Chave que abre um campo de texto livre para observações que sairão impressas no rodapé da nota (ex: dados bancários para depósito, número do pedido ou mensagens exigidas por lei)."
            },
            {
              "h": 13,
              "w": 87,
              "x": 11.5,
              "y": 72.9,
              "id": "ponto-cksvm4",
              "title": "Referências",
              "description": "Chave utilizada exclusivamente quando você precisa vincular a chave de acesso de outra nota fiscal (obrigatório em notas de devolução ou complementares)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 71,
              "y": 90,
              "id": "ponto-6-1-5qfr7m",
              "tip": "Salvar rascunho",
              "title": "Salvar",
              "description": "Salva a nota fiscal como rascunho para edição posterior."
            },
            {
              "h": 1,
              "w": 1,
              "x": 79.5,
              "y": 90,
              "id": "ponto-6-2-hd0og6",
              "tip": "Visualizar DANFE",
              "title": "Pré-visualizar",
              "description": "Gera uma visualização em PDF (DANFE) para conferência dos dados."
            },
            {
              "h": 1,
              "w": 1,
              "x": 89,
              "y": 90,
              "id": "ponto-6-3-1i34yj",
              "tip": "Emitir nota",
              "title": "Gerar NFe",
              "description": "Transmite oficialmente a Nota Fiscal Eletrônica para a SEFAZ."
            }
          ]
        },
        {
          "id": "print-0cu8bp",
          "caption": "07",
          "hotspots": [
            {
              "h": 7,
              "w": 42.7,
              "x": 49,
              "y": 93,
              "id": "ponto-gg9en5",
              "title": "Opções",
              "description": "Baixar xml - baixar PDF - Enviar por e-mail - Imprimir - fechar"
            }
          ]
        }
      ],
      "position": 14
    },
    {
      "id": "aula-haer6g",
      "module_id": "documentos",
      "title": "Emissão e Gestão de Notas do Consumidor (NFC-e)",
      "summary": "Nesta aula, você aprenderá a navegar pelo painel principal, emitir novas NFC-es adicionando produtos, selecionar formas de pagamento e visualizar ou imprimir documentos já autorizados.",
      "path": "Menu lateral > Documentos > Nota do Consumidor",
      "content": "# Introdução\nBem-vindo à aula de emissão e gerenciamento de Notas Fiscais de Consumidor Eletrônicas (NFC-e) no Emissor Future. Nesta aula, vamos cobrir desde a visualização do painel inicial e listagem de notas até o lançamento de produtos, fechamento de pagamento e consulta do DANFE.\n\n## Objetivo\nCapacitar o operador a emitir uma NFC-e de forma rápida, gerenciar vendas e utilizar as opções de pós-venda como envio, impressão e exportação de documentos.\n\n---\n\n## Passo a Passo Detalhado\n\n### Print 1: Painel Inicial\n- **Objetivo**: Visualizar os indicadores e acessar os atalhos rápidos de documentos e cadastros.\n- **O que fazer**: No menu lateral esquerdo, clique em **Documentos** para expandir as opções de notas fiscais.\n\n### Print 2: Listagem de Notas do Consumidor\n- **Objetivo**: Consultar as NFC-es emitidas e gerenciar documentos autorizados.\n- **O que fazer**: Utilize a barra de pesquisa ou clique no botão **Emitir NFCe** para iniciar uma nova venda. No menu **Opções** de cada linha, você pode visualizar, reenviar por e-mail ou cancelar o documento.\n\n### Print 3: Lançamento de Produtos\n- **Objetivo**: Adicionar os itens que compõem a venda.\n- **O que fazer**: Digite o nome ou código do produto no campo de busca, ajuste a quantidade desejada e clique em **Incluir (Enter)**. Confira a lista de itens e clique em **Finalizar Venda** para prosseguir.\n\n### Print 4: Forma de Pagamento e Finalização\n- **Objetivo**: Informar a modalidade de pagamento e concluir a transação.\n- **O que fazer**: Selecione a forma de pagamento adequada (Dinheiro, Cartão de Crédito/Débito ou Outros), preencha o valor recebido e clique no botão verde **Finalizar Venda**.\n\n### Print 5: Visualização e Impressão do DANFE\n- **Objetivo**: Conferir o comprovante fiscal gerado e realizar o pós-atendimento.\n- **O que fazer**: Utilize os botões na parte inferior para baixar o PDF, exportar o XML, enviar por e-mail, imprimir diretamente ou fechar a janela.",
      "hotspots": [
        {
          "h": 29,
          "w": 7.6,
          "x": 0,
          "y": 20,
          "id": "ponto-1-1-ewcnfm",
          "tip": "Clique para abrir as opções de notas.",
          "title": "Menu Documentos",
          "description": "Acesse a listagem de documentos fiscais emitidos."
        },
        {
          "h": 10,
          "w": 17.2,
          "x": 7.5,
          "y": 11.5,
          "id": "ponto-1-2-stbsn7",
          "title": "Emitir NFCe",
          "description": "Atalho rápido para iniciar a emissão de uma nova Nota do Consumidor."
        }
      ],
      "screenshots": [
        {
          "id": "print-t291g6",
          "caption": "Painel principal do sistema exibindo atalhos de cadastros, notas e o menu lateral.",
          "hotspots": [
            {
              "h": 29,
              "w": 7.6,
              "x": 0,
              "y": 20,
              "id": "ponto-1-1-ewcnfm",
              "tip": "Clique para abrir as opções de notas.",
              "title": "Menu Documentos",
              "description": "Acesse a listagem de documentos fiscais emitidos."
            },
            {
              "h": 10,
              "w": 17.2,
              "x": 7.5,
              "y": 11.5,
              "id": "ponto-1-2-stbsn7",
              "title": "Emitir NFCe",
              "description": "Atalho rápido para iniciar a emissão de uma nova Nota do Consumidor."
            }
          ]
        },
        {
          "id": "print-f518zd",
          "caption": "Tela de listagem de Notas do Consumidor com opções de busca e gerenciamento.",
          "hotspots": [
            {
              "h": 11.4,
              "w": 13.8,
              "x": 85,
              "y": 9.5,
              "id": "ponto-2-1-rojzeq",
              "title": "Emitir NFCe",
              "description": "Botão principal para iniciar uma nova emissão de NFC-e."
            },
            {
              "h": 12.2,
              "w": 11.2,
              "x": 73.3,
              "y": 8.9,
              "id": "ponto-2-2-3vb6u7",
              "title": "Opções",
              "description": "Inutilizar Numeração\nPagamentos"
            },
            {
              "h": 40.6,
              "w": 15.9,
              "x": 83.5,
              "y": 28,
              "id": "ponto-2-3-xzogmi",
              "title": "Opções da Linha",
              "description": "Acesse ações específicas para esta NFC-e, como Visualizar, Enviar por e-mail ou Cancelar."
            }
          ]
        },
        {
          "id": "print-gr7g1t",
          "caption": "Interface de lançamento de itens para a venda com resumo do subtotal.",
          "hotspots": [
            {
              "h": 12.7,
              "w": 35.7,
              "x": 9,
              "y": 9,
              "id": "ponto-3-1-o7pwn5",
              "tip": "Pressione Enter para agilizar",
              "title": "Produto",
              "description": "Adiciona o produto selecionado à lista da venda."
            },
            {
              "h": 16.2,
              "w": 35,
              "x": 9.8,
              "y": 24.3,
              "id": "ponto-medj7s",
              "title": "Quantidade / Valor Unitário / Valor Total",
              "description": "Coloque as quantidade de cada item apos clique em incluir, se precisar adicionar mais basta repetir o processo."
            },
            {
              "h": 12.7,
              "w": 34,
              "x": 10,
              "y": 41.3,
              "id": "ponto-zn1srt",
              "title": "Incluir",
              "description": "Apos selecionar o item e quantidades sempre tem que clicar em incluir para incluir os itens na lista."
            },
            {
              "h": 20,
              "w": 17.9,
              "x": 9,
              "y": 59,
              "id": "ponto-3-2-erv6lm",
              "tip": "Atalho F9",
              "title": "Cancelar Venda",
              "description": "Interrompe e descarta o atendimento atual."
            },
            {
              "h": 19.3,
              "w": 18.8,
              "x": 27.5,
              "y": 59.5,
              "id": "ponto-3-3-m4yzy4",
              "tip": "Atalho F4",
              "title": "Salvar",
              "description": "Salva a venda em aberto para continuar mais tarde."
            },
            {
              "h": 18.3,
              "w": 36.6,
              "x": 9,
              "y": 81,
              "id": "ponto-3-4-f5hxs5",
              "tip": "Atalho F3",
              "title": "Finalizar Venda",
              "description": "Avança para a tela de formas de pagamento."
            },
            {
              "h": 11.7,
              "w": 49.7,
              "x": 47.9,
              "y": 13.1,
              "id": "ponto-hp7cy4",
              "title": "Itens",
              "description": "Itens Adicionados "
            },
            {
              "h": 16.5,
              "w": 51.6,
              "x": 47.4,
              "y": 79.3,
              "id": "ponto-t64b77",
              "title": "Total",
              "description": "Total da soma dos itens"
            }
          ]
        },
        {
          "id": "print-jm8zsy",
          "caption": "Janela de seleção de forma de pagamento e encerramento da venda.",
          "hotspots": [
            {
              "h": 21.6,
              "w": 16.2,
              "x": 9,
              "y": 15,
              "id": "ponto-4-1-r3v3k8",
              "tip": "Atalho F1",
              "title": "Dinheiro",
              "description": "Seleciona o pagamento em dinheiro."
            },
            {
              "h": 21.1,
              "w": 16,
              "x": 27,
              "y": 15,
              "id": "ponto-4-2-rh3qku",
              "tip": "Atalho F2",
              "title": "Cartão Crédito",
              "description": "Seleciona o pagamento via cartão de crédito."
            },
            {
              "h": 21,
              "w": 16,
              "x": 9,
              "y": 40,
              "id": "ponto-4-3-u9e012",
              "tip": "Atalho F3",
              "title": "Cartão Débito",
              "description": "Seleciona o pagamento via cartão de débito."
            },
            {
              "h": 20.3,
              "w": 15.8,
              "x": 27,
              "y": 41,
              "id": "ponto-4-4-xp75gu",
              "tip": "Atalho F4",
              "title": "Outros",
              "description": "Outras formas de pagamento disponíveis."
            },
            {
              "h": 15.4,
              "w": 33.3,
              "x": 9.5,
              "y": 63.9,
              "id": "ponto-b3pa46",
              "title": "Confirmar valor recebido",
              "description": "Apos selecionar o método de pagamento informe o valor recebido e clique no + para validar o método de pagamento selecionado "
            },
            {
              "h": 19.1,
              "w": 45.7,
              "x": 45,
              "y": 7.4,
              "id": "ponto-jvdtpq",
              "title": "Descontos e acréscimos ",
              "description": "Descontos e acréscimos "
            },
            {
              "h": 15.7,
              "w": 42.4,
              "x": 44.2,
              "y": 64.8,
              "id": "ponto-1kdq6b",
              "title": "Cpf ou Cnpj na nota",
              "description": "Cpf ou Cnpj na nota"
            },
            {
              "h": 17,
              "w": 29.6,
              "x": 64,
              "y": 83,
              "id": "ponto-4-5-0w13c2",
              "tip": "Pressione Enter",
              "title": "Finalizar Venda",
              "description": "Conclui a transação e autoriza a NFC-e."
            }
          ]
        },
        {
          "id": "print-ljxmsr",
          "caption": "Visualização do DANFE da nota autorizada com opções de exportação e impressão.",
          "hotspots": [
            {
              "h": 1,
              "w": 1,
              "x": 49,
              "y": 91.5,
              "id": "ponto-5-1-l1y4es",
              "title": "PDF",
              "description": "Baixe o documento em formato PDF."
            },
            {
              "h": 1,
              "w": 1,
              "x": 55.5,
              "y": 91.5,
              "id": "ponto-5-2-utexnf",
              "title": "XML",
              "description": "Baixe o arquivo XML da nota fiscal."
            },
            {
              "h": 1,
              "w": 1,
              "x": 62,
              "y": 92,
              "id": "ponto-5-3-tfr7cn",
              "title": "Enviar por e-mail",
              "description": "Envie o DANFE e XML diretamente para o cliente."
            },
            {
              "h": 1,
              "w": 1,
              "x": 74.5,
              "y": 92,
              "id": "ponto-5-4-wgs5ex",
              "title": "Imprimir",
              "description": "Imprima o comprovante fiscal na impressora padrão."
            },
            {
              "h": 1,
              "w": 1,
              "x": 84,
              "y": 91.5,
              "id": "ponto-5-5-gthtab",
              "title": "Fechar",
              "description": "Fecha a visualização do documento."
            }
          ]
        }
      ],
      "position": 15
    },
    {
      "id": "aula-rzhw0d",
      "module_id": "documentos",
      "title": "Como Emitir e Gerenciar Notas Fiscais de Serviço (NFSe)",
      "summary": "Nesta aula, você aprenderá a navegar pelo painel de controle, acessar a listagem de NFSe, preencher os dados de emissão, configurar tributos federais e municipais, e concluir a geração da sua Nota Fiscal de Serviço.",
      "path": "Menu lateral > Documentos > NFSe Nota de Serviço",
      "content": "# Introdução\nA emissão de Notas Fiscais de Serviço (NFSe) é uma etapa fundamental para a rotina fiscal da sua empresa. Nesta aula guiada pelo Emissor Future, vamos acompanhar o passo a passo completo, desde a tela inicial do dashboard até a finalização da emissão da nota.\n\n--- \n\n## Print 1: Tela Inicial e Menu de Documentos\n### Objetivo\nAcessar a área de gerenciamento de documentos fiscais e visualizar o painel principal.\n\n### Passo a Passo\n1. No menu lateral esquerdo, clique em **Documentos** (ou passe o cursor para abrir o menu suspenso).\n2. Selecione a opção **NFSe Nota de Serviço** para abrir o gerenciador de notas.\n3. Utilize os atalhos rápidos do dashboard para consultar cadastros de Clientes e Serviços, se necessário.\n\n--- \n\n## Print 2: Listagem de Notas Fiscais e Opções de Ação\n### Objetivo\nGerenciar notas emitidas, consultar status e iniciar a emissão de uma nova NFSe.\n\n### Passo a Passo\n1. Na listagem de notas, utilize os filtros de ordenação ou a barra de pesquisa para localizar documentos específicos.\n2. Clique no botão **Opções** em qualquer nota da lista para visualizar ações como: Visualizar, Enviar por e-mail, Duplicar, Substituir, Cancelar ou Atualizar Status.\n3. Para iniciar um novo documento, clique no botão roxo **Emitir NFSe** localizado no canto superior direito.\n\n--- \n\n## Print 3: Dados Gerais e Informações do Tomador\n### Objetivo\nPreencher as datas de emissão/competência, dados de tributação e identificar o cliente (Tomador).\n\n### Passo a Passo\n1. Confirme a **Data Emissão** e a **Data Competência**.\n2. Selecione a **Tributação do ISSQN**, o **Município prestação** e o **Município Incidência ISS**.\n3. No bloco **Tomador/Cliente**, selecione o cliente cadastrado para preencher automaticamente o CPF/CNPJ e inscrições.\n\n--- \n\n## Print 4: Descrição do Serviço e Valores\n### Objetivo\nDetalhar o serviço prestado, informar valores monetários, deduções e alíquotas do ISS.\n\n### Passo a Passo\n1. No campo **Descrição Serviço**, detalhe com clareza o serviço executado.\n2. Informe o **Valor Serviço** e verifique os campos calculados automaticamente, como Base de Cálculo e Valor ISS.\n3. Marque a caixa **ISS Retido** caso o imposto deva ser retido na fonte conforme a legislação.\n\n--- \n\n## Print 5: Reforma Tributária (IBS/CBS) e Tributos Federais\n### Objetivo\nConfigurar os campos referentes à Reforma Tributária e verificar as alíquotas e valores de PIS, COFINS, CSLL, INSS e IR.\n\n### Passo a Passo\n1. Ative a chave de **IBS/CBS - Reforma Tributária**, se aplicável à operação, e preencha o código indicador, CST e classificação tributária.\n2. No bloco de **Tributos Federais**, confira as alíquotas e marque a opção **Retido** para os tributos federais que possuem retenção obrigatória.\n\n--- \n\n## Print 6: Informações Complementares e Conclusão\n### Objetivo\nAdicionar observações pertinentes à nota e finalizar o processo de emissão.\n\n### Passo a Passo\n1. Utilize o campo **Observações da Nota** para inserir informações de interesse do tomador ou exigências legais.\n2. Clique no botão **Salvar** para rascunhos ou em **Gerar** para concluir a emissão da NFSe.",
      "hotspots": [
        {
          "h": 30.2,
          "w": 8.1,
          "x": 0,
          "y": 19,
          "id": "ponto-1-1-6dl9fc",
          "tip": "Clique para expandir as opções de documentos.",
          "title": "Menu Documentos",
          "description": "Acesse a seção para gerenciar e emitir documentos fiscais como notas de serviço."
        },
        {
          "h": 9.4,
          "w": 16.8,
          "x": 8,
          "y": 5,
          "id": "ponto-1-2-jfy5xh",
          "tip": "Use para adicionar serviços recorrentes.",
          "title": "Novo Serviço",
          "description": "Atalho rápido para cadastrar um novo serviço no sistema."
        }
      ],
      "screenshots": [
        {
          "id": "print-o657q9",
          "caption": "Painel inicial do sistema com o menu lateral expandido mostrando as opções de NFSe.",
          "hotspots": [
            {
              "h": 30.2,
              "w": 8.1,
              "x": 0,
              "y": 19,
              "id": "ponto-1-1-6dl9fc",
              "tip": "Clique para expandir as opções de documentos.",
              "title": "Menu Documentos",
              "description": "Acesse a seção para gerenciar e emitir documentos fiscais como notas de serviço."
            },
            {
              "h": 9.4,
              "w": 16.8,
              "x": 8,
              "y": 5,
              "id": "ponto-1-2-jfy5xh",
              "tip": "Use para adicionar serviços recorrentes.",
              "title": "Novo Serviço",
              "description": "Atalho rápido para cadastrar um novo serviço no sistema."
            }
          ]
        },
        {
          "id": "print-r401xg",
          "caption": "Tela de listagem de Notas Fiscais de Serviço com o menu de opções aberto.",
          "hotspots": [
            {
              "h": 8.9,
              "w": 13.2,
              "x": 85.5,
              "y": 12,
              "id": "ponto-2-1-0d1jr1",
              "tip": "Essencial para começar novas emissões.",
              "title": "Botão Emitir NFSe",
              "description": "Clique neste botão para iniciar o preenchimento de uma nova Nota Fiscal de Serviço."
            },
            {
              "h": 62.6,
              "w": 14.5,
              "x": 83,
              "y": 27,
              "id": "ponto-2-2-ijryw6",
              "tip": "Clique para gerenciar notas já existentes.",
              "title": "Botão Opções",
              "description": "Abre o menu de ações para visualizar, enviar por e-mail, duplicar, substituir ou cancelar a nota."
            },
            {
              "h": 9.3,
              "w": 40.5,
              "x": 9.3,
              "y": 11.6,
              "id": "ponto-qsrmsk",
              "title": "Procurar",
              "description": "Buscar por data de emissão, numero, destinatário e busca avançada "
            },
            {
              "h": 71.3,
              "w": 69.3,
              "x": 9.9,
              "y": 28.3,
              "id": "ponto-jk631x",
              "title": "Listagem de notas emitidas",
              "description": "Listagem de notas emitidas"
            }
          ]
        },
        {
          "id": "print-40gzli",
          "caption": "Formulário de nova NFSe com campos de datas, tributação e dados do tomador.",
          "hotspots": [
            {
              "h": 17.1,
              "w": 26.5,
              "x": 10.9,
              "y": 6.9,
              "id": "ponto-w7noqe",
              "title": "Data de Emissão e de Competência",
              "description": "• Data Emissão: Exibe a data atual em que o documento está sendo emitido (campo preenchido automaticamente).\n• Data Competência: Indica a data (ou mês/ano) em que o serviço foi efetivamente prestado."
            },
            {
              "h": 15.8,
              "w": 18.6,
              "x": 40.9,
              "y": 7.5,
              "id": "ponto-zlqhkx",
              "title": "Tributação do ISSQN",
              "description": "Define a natureza da operação perante o imposto municipal (ex.: Operação tributável, isenta, imune)."
            },
            {
              "h": 15.1,
              "w": 18.3,
              "x": 60.3,
              "y": 7.5,
              "id": "ponto-x7gag0",
              "title": "Município prestação",
              "description": "Local onde o serviço foi executado."
            },
            {
              "h": 14.8,
              "w": 18.3,
              "x": 79,
              "y": 7.2,
              "id": "ponto-wf4e1c",
              "title": "Município Incidência ISS",
              "description": "• Cidade responsável pelo recolhimento do Imposto Sobre Serviços (ISS)."
            },
            {
              "h": 18.2,
              "w": 36.1,
              "x": 10.4,
              "y": 44.8,
              "id": "ponto-wh2oei",
              "title": "Tomador/Cliente",
              "description": "• Campo de busca para selecionar um cliente já cadastrado no sistema. O ícone (+) ao lado permite cadastrar um novo cliente rapidamente sem sair da tela."
            },
            {
              "h": 17.8,
              "w": 41.9,
              "x": 47.8,
              "y": 44.5,
              "id": "ponto-yl79d6",
              "title": "CPF/CNPJ, Inscrição Municipal e Inscrição Estadual",
              "description": "• Preenchidos automaticamente após a seleção do cliente, exibindo seus dados fiscais. (A seta no canto direito expande informações adicionais do cliente, como endereço).\n"
            },
            {
              "h": 15.8,
              "w": 85.4,
              "x": 10.9,
              "y": 84.2,
              "id": "ponto-hbjc4x",
              "title": "Serviço",
              "description": "• Busca Serviço: Permite localizar um serviço previamente cadastrado ou adicionar um novo pelo ícone (+).\n• Códigos Fiscais (CNAE, Código Trib. Municipal, Item Lista de Serviço, Cód. Trib. Nacional e NBS): Classificações exigidas pela legislação para identificar a atividade prestada. Costumam ser preenchidos automaticamente ao selecionar o serviço."
            }
          ]
        },
        {
          "id": "print-bwq8nj",
          "caption": "Seção de descrição do serviço prestado, valores e retenção de ISS.",
          "hotspots": [
            {
              "h": 43.3,
              "w": 88.3,
              "x": 9.5,
              "y": 0,
              "id": "ponto-4-1-ueio7r",
              "tip": "Seja claro e detalhado na descrição.",
              "title": "Descrição Serviço",
              "description": "Campo de texto livre para detalhar o serviço prestado conforme exigido pelo município."
            },
            {
              "h": 26.3,
              "w": 87.4,
              "x": 10,
              "y": 46,
              "id": "ponto-4-2-rpqx17",
              "tip": "Consulte seu contador em caso de dúvida.",
              "title": "Valor do Serviço e impostos",
              "description": "• Valor Serviço: Valor bruto cobrado pela prestação do serviço.\n• Desconto: Valor de desconto concedido ao cliente, caso exista.\n• Base Cálculo: Valor sobre o qual os impostos serão calculados (calculado automaticamente).\n• Valor Deduções BC: Valores que podem ser abatidos legalmente da base de cálculo (ex.: materiais aplicados em obras).\n• Alíq. ISS: Percentual do imposto municipal aplicado sobre o serviço.\n• Valor ISS: Valor em reais do imposto calculado automaticamente.\n• ISS Retido: Caixa de seleção que deve ser marcada quando a responsabilidade pelo pagamento do ISS for do cliente (tomador) e não do prestador.\n• Valor Nota: Valor líquido final do documento fiscal.\n"
            },
            {
              "h": 13.2,
              "w": 87.6,
              "x": 9.9,
              "y": 73.6,
              "id": "ponto-cz12g1",
              "title": "Imóvel e Obra (Uso específico)",
              "description": "• Imóvel / Obra: Seções utilizadas apenas quando a atividade selecionada exige vinculação a um imóvel ou cadastro de obra (como serviços de construção civil). Permanecem bloqueadas para atividades comuns.\n"
            },
            {
              "h": 12.2,
              "w": 86.7,
              "x": 9.9,
              "y": 87.8,
              "id": "ponto-cr6wc9",
              "title": "IBS / CBS - Reforma Tributária",
              "description": "Seção habilitada pelo botão seletor (roxo) no canto superior direito para adequação às regras da Reforma Tributária:"
            }
          ]
        },
        {
          "id": "print-xwdi63",
          "caption": "Painel de configuração da Reforma Tributária (IBS/CBS) e alíquotas de Tributos Federais.",
          "hotspots": [
            {
              "h": 49,
              "w": 89.5,
              "x": 8.5,
              "y": 0,
              "id": "ponto-5-1-229b8q",
              "tip": "Ative apenas se exigido pela legislação vigente.",
              "title": "Chave IBS/CBS",
              "description": "• Código indicador da operação: Classifica o tipo de operação conforme a nova legislação.\n• CST IBS/CBS: Código de Situação Tributária referente aos novos tributos (Imposto sobre Bens e Serviços e Contribuição sobre Bens e Serviços).\n• Classificação Tributária: Enquadramento específico da operação dentro das regras do IBS/CBS.\n• Uso e consumo: Indica se o serviço adquirido destina-se ao uso e consumo próprio do tomador.\n• Ente governamental: Identifica se a operação envolve algum órgão público (União, Estado ou Município)."
            },
            {
              "h": 49.3,
              "w": 89.4,
              "x": 8.5,
              "y": 50.5,
              "id": "ponto-5-2-6hhp8l",
              "tip": "Verifique as retenções federais aplicáveis.",
              "title": "Tributos Federais",
              "description": "• Alíquota PIS, COFINS e CSLL: Percentuais de cada contribuição. Cada um possui a caixa Retido ao lado, que deve ser marcada caso o imposto seja descontado do valor a receber.\n• Alíquota INSS e IR: Percentuais de retenção previdenciária e de Imposto de Renda.\n• Outras Retenções: Campo em reais para informar eventuais retenções diversas não listadas anteriormente.\n• Valor PIS, COFINS, CSLL, INSS e IR: Campos bloqueados que exibem automaticamente o valor calculado em reais para cada tributo.\n"
            }
          ]
        },
        {
          "id": "print-tlimxn",
          "caption": "Seção de Informações Complementares e botões finais de salvamento e geração da nota.",
          "hotspots": [
            {
              "h": 45,
              "w": 88.7,
              "x": 9.7,
              "y": 25.5,
              "id": "ponto-6-1-j4mcfo",
              "tip": "Campo opcional para recados e observações.",
              "title": "Observações da Nota",
              "description": "Campo ativado pela chave seletora para inserir textos adicionais que sairão impressos na nota (como dados bancários para depósito, número de pedido ou observações legais)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 82,
              "y": 85,
              "id": "ponto-6-2-jdn3gq",
              "tip": "Útil para continuar a edição mais tarde.",
              "title": "Botão Salvar",
              "description": "Salva os dados preenchidos como rascunho sem transmitir a nota."
            },
            {
              "h": 1,
              "w": 1,
              "x": 89.5,
              "y": 85.5,
              "id": "ponto-6-3-t4hma8",
              "tip": "Clique para concluir a emissão da NFSe.",
              "title": "Botão Gerar",
              "description": "Finaliza o preenchimento, valida os dados e transmite a Nota Fiscal de Serviço para autorização junto à prefeitura."
            }
          ]
        }
      ],
      "position": 16
    },
    {
      "id": "aula-4igi65",
      "module_id": "documentos",
      "title": "Emissão e Gerenciamento de CT-e",
      "summary": "Nesta aula, você aprenderá a acessar a listagem de CT-es, utilizar as opções de gerenciamento e preencher o formulário completo de emissão de um novo Conhecimento de Transporte Eletrônico.",
      "path": "Documentos > CT-e",
      "content": "# Emissão e Gerenciamento de CT-e\n\nBem-vindo à aula de emissão de Conhecimento de Transporte Eletrônico (CT-e) no **Emissor Future**. Nesta aula, vamos cobrir o fluxo completo desde a listagem de documentos emitidos até o preenchimento de um novo CT-e.\n\n## Objetivo\nCapacitar o operador a localizar CT-es existentes, utilizar o menu de opções para gerenciamento (como visualização e envio) e preencher os dados de carga, valores e documentos para emitir um novo CT-e.\n\n---\n\n## Passo a Passo\n\n### 1. Acesso à Listagem de CT-e\n- **Print 1:** Na barra lateral esquerda, clique em **Documentos** e selecione a opção **CT-e** no menu suspenso para abrir a tela de gerenciamento de Conhecimentos de Transporte.\n\n### 2. Gerenciamento de CT-e Existentes\n- **Print 2:** Na tela de listagem, utilize a barra de pesquisa ou os filtros de ordenação. Clique no botão **Opções** ao lado de um documento para visualizar, enviar por e-mail, duplicar, emitir carta de correção ou cancelar.\n\n### 3. Iniciando a Emissão de um Novo CT-e\n- **Print 3:** Clique no botão **Emitir CT-e** no canto superior direito para abrir o formulário de emissão. Preencha os dados básicos como série, data de emissão, município de início, tipo de CT-e, tipo de serviço e CFOP, além dos atores envolvidos (Tomador, Remetente e Destinatário).\n\n### 4. Informações de Carga e Valores\n- **Print 4:** Na seção de **Carga**, informe o valor, produto predominante e as quantidades (unidade de medida e peso/volume). Na seção de **Serviço**, preencha o valor total e adicione os componentes do valor se necessário.\n\n### 5. Finalização e Salvamento\n- **Print 5:** Role até o final do formulário para verificar seções adicionais como Impostos, Faturas, Documentos vinculados e Informações Adicionais. Por fim, utilize os botões **Salvar**, **Pré-visualizar** ou **Gerar/Emitir** para concluir o processo.",
      "hotspots": [
        {
          "h": 28.5,
          "w": 7.7,
          "x": 0,
          "y": 57.2,
          "id": "ponto-jcs2bd",
          "title": "Documentos",
          "description": "Abre emissão de documentos"
        },
        {
          "h": 8.9,
          "w": 17,
          "x": 7.5,
          "y": 34.1,
          "id": "ponto-0es2tx",
          "title": "CTe",
          "description": "Acessa a tela principal de gerenciamento e emissão do Conhecimento de Transporte Eletrônico."
        }
      ],
      "screenshots": [
        {
          "id": "print-usgix0",
          "caption": "Menu lateral aberto exibindo as opções de documentos, com destaque para a seleção de CT-e e a listagem de Conhecimentos de Transporte.",
          "hotspots": [
            {
              "h": 28.5,
              "w": 7.7,
              "x": 0,
              "y": 57.2,
              "id": "ponto-jcs2bd",
              "title": "Documentos",
              "description": "Abre emissão de documentos"
            },
            {
              "h": 8.9,
              "w": 17,
              "x": 7.5,
              "y": 34.1,
              "id": "ponto-0es2tx",
              "title": "CTe",
              "description": "Acessa a tela principal de gerenciamento e emissão do Conhecimento de Transporte Eletrônico."
            }
          ]
        },
        {
          "id": "print-clh6hv",
          "caption": "Tela de listagem de CT-e com o menu de contexto aberto para um documento específico.",
          "hotspots": [
            {
              "h": 5,
              "w": 16.5,
              "x": 8,
              "y": 13,
              "id": "ponto-2-1-mx643l",
              "title": "Ordenar por",
              "description": "Selecione o critério de ordenação da tabela de CT-es."
            },
            {
              "h": 5.7,
              "w": 14,
              "x": 24,
              "y": 13,
              "id": "ponto-2-2-2yf3oa",
              "title": "Pesquisar",
              "description": "Busque rapidamente por um CT-e na listagem."
            },
            {
              "h": 6.1,
              "w": 12,
              "x": 37.5,
              "y": 12,
              "id": "ponto-2-3-tmyybc",
              "title": "Busca Avançada",
              "description": "Filtre os documentos por período, status ou tomador."
            },
            {
              "h": 9.6,
              "w": 12.2,
              "x": 74,
              "y": 11,
              "id": "ponto-2-4-5di7ea",
              "title": "Opções Globais",
              "description": "Ações gerais para os registros listados."
            },
            {
              "h": 9.1,
              "w": 12.5,
              "x": 86,
              "y": 11.5,
              "id": "ponto-2-5-slfba5",
              "title": "Emitir CT-e",
              "description": "Inicia a emissão de um novo documento."
            },
            {
              "h": 50.7,
              "w": 14.8,
              "x": 83,
              "y": 29,
              "id": "ponto-2-6-xhi274",
              "title": "Opções do Documento",
              "description": "• Visualizar: Abre o DACTE (PDF) e os detalhes do documento emitido.\n• Enviar por e-mail: Encaminha o XML e o PDF do CTe para o cliente.\n• Duplicar: Cria um novo rascunho copiando todos os dados do CTe selecionado (útil para fretes recorrentes).\n• Carta de correção: Permite emitir uma CC-e para corrigir erros pontuais em um CTe já autorizado (sem alterar valores ou impostos).\n• Cancelar: Solicita o cancelamento legal do CTe junto à SEFAZ (dentro do prazo permitido).\n"
            }
          ]
        },
        {
          "id": "print-ib9n4j",
          "caption": "Formulário de emissão de CT-e com o menu 'Opções' superior aberto.",
          "hotspots": [
            {
              "h": 1,
              "w": 1,
              "x": 89,
              "y": 1,
              "id": "ponto-3-1-f7g2dx",
              "title": "Opções de Emissão",
              "description": "Menu superior com ferramentas auxiliares para o preenchimento."
            },
            {
              "h": 1,
              "w": 1,
              "x": 81,
              "y": 11,
              "id": "ponto-3-2-gdd1pz",
              "title": "Importar Documentos",
              "description": "Importe dados de notas fiscais ou XMLs para agilizar o preenchimento."
            },
            {
              "h": 1,
              "w": 1,
              "x": 81.5,
              "y": 24,
              "id": "ponto-3-3-2e39r4",
              "title": "Calculadora Frete Mínimo",
              "description": "Ferramenta para auxiliar no cálculo do piso mínimo de frete."
            },
            {
              "h": 1,
              "w": 1,
              "x": 11,
              "y": 21,
              "id": "ponto-3-4-b3rl4h",
              "tip": "Campo automático",
              "title": "Número",
              "description": "Número do CT-e gerado automaticamente pelo sistema."
            },
            {
              "h": 1,
              "w": 1,
              "x": 21,
              "y": 21,
              "id": "ponto-3-5-spn4ux",
              "title": "Série",
              "description": "Série utilizada para a emissão do documento."
            },
            {
              "h": 1,
              "w": 1,
              "x": 31,
              "y": 21,
              "id": "ponto-3-6-d4ru7i",
              "title": "Data Emissão",
              "description": "Data e hora atuais da emissão do CT-e."
            },
            {
              "h": 1,
              "w": 1,
              "x": 53,
              "y": 23,
              "id": "ponto-3-7-9xe179",
              "tip": "Obrigatório",
              "title": "Município Início",
              "description": "Informe a cidade de onde se inicia a prestação do serviço de transporte."
            },
            {
              "h": 1,
              "w": 1,
              "x": 11,
              "y": 47,
              "id": "ponto-3-8-mhj7vr",
              "title": "Tipo de CT-e",
              "description": "Define a finalidade do documento (ex.: 0 - Normal, Complemento, Anulação ou Substituição)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 33,
              "y": 49,
              "id": "ponto-3-9-dfiou8",
              "title": "Tipo de Serviço",
              "description": "Indica a modalidade da operação (ex.: 0 - Normal, Subcontratação, Redespacho)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 53,
              "y": 51,
              "id": "ponto-3-10-xfo7ke",
              "tip": "Confira com seu contador",
              "title": "CFOP",
              "description": "Código Fiscal de Operações e Prestações, que define a natureza tributária do transporte."
            },
            {
              "h": 1,
              "w": 1,
              "x": 9,
              "y": 81,
              "id": "ponto-3-11-cthyp9",
              "title": "Tomador",
              "description": "Define quem é o responsável pelo pagamento do frete (ex.: 0 - Remetente, Destinatário, Expedidor, Recebedor ou Outros)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 31.5,
              "y": 82.5,
              "id": "ponto-3-12-1r4tor",
              "title": "Remetente",
              "description": "Empresa ou pessoa que está enviando a mercadoria (o botão + permite cadastrar um novo cliente na hora)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 61,
              "y": 83,
              "id": "ponto-3-13-0r2yli",
              "title": "Destinatário",
              "description": "• Empresa ou pessoa que vai receber a mercadoria (também possui o botão + para cadastro rápido).\n"
            }
          ]
        },
        {
          "id": "print-7fxrxv",
          "caption": "Seções de Carga, Quantidades e Valores do serviço no formulário de CT-e.",
          "hotspots": [
            {
              "h": 6.9,
              "w": 7,
              "x": 46,
              "y": 3.5,
              "id": "ponto-4-1-zkrbxj",
              "title": "Ativar Seção Carga",
              "description": "Interruptor para habilitar ou desabilitar o preenchimento dos dados de carga."
            },
            {
              "h": 48.1,
              "w": 41.9,
              "x": 10.8,
              "y": 12,
              "id": "ponto-jsu4mg",
              "title": "Dados da Carga",
              "description": "• Valor da carga: Valor total das mercadorias transportadas (baseado nas notas fiscais).\n• Produto Predominante: Nome do item principal que está sendo transportado.\n• Outras Características: Detalhes adicionais sobre a carga (ex.: Granel, Frágil, Caixa).\n• Quantidades (Un. Medida / Tipo Medida / Quantidade): Informa o peso ou volume da carga (ex.: M3, KG, Peso Bruto, Peso Declarado). O botão + Adicionar Quantidade permite inserir múltiplas medidas."
            },
            {
              "h": 59.7,
              "w": 43.6,
              "x": 55,
              "y": 2.3,
              "id": "ponto-jgdxlc",
              "title": "Serviço",
              "description": "• Valor total do serviço: Valor cheio cobrado pelo frete.\n• Valor a receber: Valor líquido que a transportadora efetivamente receberá.\n• Componentes do Valor (+ Adicionar Componente): Permite detalhar a composição do preço do frete (ex.: Frete Peso, Pedágio, GRIS, Ad Valorem).\n"
            },
            {
              "h": 10.1,
              "w": 43.1,
              "x": 10.5,
              "y": 67.7,
              "id": "ponto-qlah1f",
              "title": "Impostos",
              "description": "Ativa os campos para preenchimento de tributação (ICMS, CST, alíquotas e base de cálculo)."
            },
            {
              "h": 10.4,
              "w": 43.4,
              "x": 55.3,
              "y": 68,
              "id": "ponto-ng66r6",
              "title": "Faturas",
              "description": "Ativa os campos para gerar cobrança/duplicata vinculada ao CTe."
            },
            {
              "h": 8.2,
              "w": 86.7,
              "x": 10.6,
              "y": 81.5,
              "id": "ponto-8gh4hy",
              "title": "Documentos ",
              "description": "Obrigatório na maioria das operações; vincula a chave de acesso da NF-e ou os dados da declaração/nota fiscal que acompanha a carga."
            },
            {
              "h": 5.7,
              "w": 13.4,
              "x": 47.5,
              "y": 90,
              "id": "ponto-miycil",
              "title": "Informações Adicionais",
              "description": "• Ativa um campo de texto livre para observações fiscais ou instruções de entrega que sairão impressas no DACTE.\n"
            }
          ]
        },
        {
          "id": "print-cyywlr",
          "caption": "Finalização do formulário de CT-e com as seções de documentos, informações adicionais e botões de ação.",
          "hotspots": [
            {
              "h": 1,
              "w": 1,
              "x": 73,
              "y": 85,
              "id": "ponto-5-6-wn36br",
              "tip": "Use para continuar depois",
              "title": "Salvar",
              "description": "Salva o rascunho do CT-e sem enviá-lo à SEFAZ."
            },
            {
              "h": 1,
              "w": 1,
              "x": 80.5,
              "y": 85,
              "id": "ponto-5-7-wynwr6",
              "tip": "Sempre confira antes de emitir",
              "title": "Pré-visualizar",
              "description": "Gera uma prévia em PDF (DANTE) para conferência dos dados."
            },
            {
              "h": 7.9,
              "w": 7.7,
              "x": 90.2,
              "y": 84.8,
              "id": "ponto-7fssfs",
              "title": "Gerar ",
              "description": "• Assina digitalmente e transmite o CTe para autorização da SEFAZ.\n"
            }
          ]
        }
      ],
      "position": 17
    },
    {
      "id": "aula-egjvzd",
      "module_id": "documentos",
      "title": "Emissão e Consulta de MDF-e",
      "summary": "Nesta aula, você aprenderá a navegar pelo módulo de MDF-e, utilizar os filtros de busca, preencher os dados gerais do manifesto, configurar percursos, veículos, motoristas e concluir a emissão do documento fiscal no sistema.",
      "path": "Documentos > MDFe > MDF-e",
      "content": "# Emissão e Consulta de MDF-e\n\nBem-vindo à aula de emissão e gerenciamento de MDF-e no **Emissor Future**. O Manifesto de Documentos Fiscais Eletrônico é essencial para vincular as notas fiscais que estão sendo transportadas em uma viagem.\n\n## Objetivo\nCapacitar o operador a consultar manifestos anteriores e preencher corretamente um novo MDF-e, contemplando dados de emitente, percurso, veículo, condutores e seguros.\n\n---\n\n## Print 1: Acessando a Listagem de MDF-e\n1. No menu lateral esquerdo, clique em **Documentos**.\n2. No submenu que se abre, selecione **MDFe** para visualizar a listagem dos manifestos.\n3. Utilize a barra de pesquisa **Procurar** ou clique em **Busca Avançada** para filtrar os registros por período ou status.\n4. Para iniciar um novo manifesto, clique no botão roxo **Emitir MDFe** no canto superior direito.",
      "hotspots": [
        {
          "h": 28.5,
          "w": 7.9,
          "x": 0,
          "y": 57.5,
          "id": "ponto-1-1-pnk531",
          "title": "Menu Documentos",
          "description": "Acessa a seção de documentos fiscais do sistema."
        },
        {
          "h": 8.6,
          "w": 16.7,
          "x": 7.6,
          "y": 19.8,
          "id": "ponto-btep49",
          "title": "Mdfe",
          "description": "Manifesto de Documentos Fiscais"
        }
      ],
      "screenshots": [
        {
          "id": "print-9fzzgm",
          "caption": "Menu lateral e listagem de MDF-e com opções de busca e botão de emissão.",
          "hotspots": [
            {
              "h": 28.5,
              "w": 7.9,
              "x": 0,
              "y": 57.5,
              "id": "ponto-1-1-pnk531",
              "title": "Menu Documentos",
              "description": "Acessa a seção de documentos fiscais do sistema."
            },
            {
              "h": 8.6,
              "w": 16.7,
              "x": 7.6,
              "y": 19.8,
              "id": "ponto-btep49",
              "title": "Mdfe",
              "description": "Manifesto de Documentos Fiscais"
            }
          ]
        },
        {
          "id": "print-xyw6gg",
          "caption": "Tela de listagem de MDF-e exibindo a ordenação e os registros salvos.",
          "hotspots": [
            {
              "h": 5.9,
              "w": 16.2,
              "x": 8,
              "y": 13,
              "id": "ponto-2-1-6bwq96",
              "title": "Ordenar por",
              "description": "Permite alterar o critério de ordenação da tabela, como por Data Emissão."
            },
            {
              "h": 7.2,
              "w": 13.7,
              "x": 24,
              "y": 12.5,
              "id": "ponto-2-2-lmionw",
              "title": "Procurar",
              "description": "Campo de busca rápida por texto."
            },
            {
              "h": 6.3,
              "w": 11.8,
              "x": 37.5,
              "y": 13,
              "id": "ponto-2-3-zt8xl2",
              "title": "Busca Avançada",
              "description": "Filtros avançados para localização de documentos."
            },
            {
              "h": 8.5,
              "w": 10,
              "x": 64,
              "y": 12,
              "id": "ponto-2-4-zj0dvy",
              "title": "CIOT",
              "description": "Abre o painel de gerenciamento/emissão de Código Identificador da Operação de Transporte."
            },
            {
              "h": 9.4,
              "w": 11.8,
              "x": 73.5,
              "y": 11.5,
              "id": "ponto-2-5-qy57te",
              "title": "Opções",
              "description": "Encerrar Mdfe Avulso\nCalculadora Frete Minimo"
            },
            {
              "h": 9.5,
              "w": 13.5,
              "x": 85,
              "y": 11,
              "id": "ponto-2-6-nexw51",
              "title": "Emitir MDFe",
              "description": "Botão para iniciar a emissão de um novo MDF-e."
            },
            {
              "h": 9.1,
              "w": 7.8,
              "x": 89,
              "y": 29,
              "id": "ponto-2-7-0intf6",
              "title": "Opções do Registro",
              "description": "Permite visualizar, imprimir ou cancelar um MDF-e específico."
            },
            {
              "h": 71.1,
              "w": 79.9,
              "x": 9.4,
              "y": 27.6,
              "id": "ponto-zayc49",
              "title": "Mdfe Emitidos",
              "description": "Listagem de Mdfe Emitidos"
            }
          ]
        },
        {
          "id": "print-qmzzoj",
          "caption": "Formulário de emissão de MDF-e: dados gerais, emitente e municípios de carregamento.",
          "hotspots": [
            {
              "h": 22.7,
              "w": 36,
              "x": 10,
              "y": 16.3,
              "id": "ponto-7unjof",
              "title": "Numero / Data ",
              "description": "• Campo \"Número\": Preenchido automaticamente pelo sistema na sequência fiscal.\n• Campo \"Data Emissão\": Define a data de criação do documento (preenchido com a data atual, editável se necessário).\n• Campo \"Data Saída\": Campo para informar a data prevista de início da viagem."
            },
            {
              "h": 22.3,
              "w": 51,
              "x": 47.5,
              "y": 17,
              "id": "ponto-0d35tz",
              "title": "Tipo de Emitente e Transportador",
              "description": "• Caixa \"Tipo de Emitente\": Define o perfil do emissor (ex: 1 - Prestador de serviço de transporte ou 2 - Transportador de Carga Própria).\n• Caixa \"Tipo de Transportador\": Identifica a categoria do transportador (ex: ETC, TAC ou CTC), quando aplicável."
            },
            {
              "h": 21.4,
              "w": 41.9,
              "x": 10.5,
              "y": 43.8,
              "id": "ponto-4ja1jt",
              "title": "Municípios Carregamento",
              "description": "Municípios Carregamento: Seleciona a cidade onde a carga foi embarcada."
            },
            {
              "h": 20.4,
              "w": 44,
              "x": 53.6,
              "y": 43.8,
              "id": "ponto-m0048m",
              "title": "Municípios Descarregamento",
              "description": "Municípios Descarregamento\": Seleciona a cidade de destino onde a mercadoria será entregue."
            },
            {
              "h": 7.1,
              "w": 86,
              "x": 11.5,
              "y": 66.2,
              "id": "ponto-d5gs2q",
              "title": "Adicionar Município",
              "description": "Insere um novo campo para adicionar outros destinos na mesma viagem."
            },
            {
              "h": 12.3,
              "w": 86.9,
              "x": 10.9,
              "y": 74.6,
              "id": "ponto-jm9s6o",
              "title": "UF's Percurso",
              "description": "Permite selecionar as siglas dos estados intermediários por onde o veículo vai passar (obrigatório quando origem e destino não fazem divisa)."
            }
          ]
        },
        {
          "id": "print-zvw5c4",
          "caption": "Seção de totais da carga, produto predominante e veículos de tração.",
          "hotspots": [
            {
              "h": 63.5,
              "w": 89.1,
              "x": 9.3,
              "y": 1.4,
              "id": "ponto-87ts6m",
              "title": "Documentos, Totais e Produto Predominante",
              "description": "• Área \"Documentos\": Habilitada após escolher o município de descarregamento; serve para vincular os CT-es ou NF-es da viagem.\n• Campo \"Quantidade Documentos\": Contador automático que exibe o total de notas/conhecimentos vinculados.\n• Campo \"Valor Carga\": Soma (ou permite digitar) o valor total das mercadorias transportadas.\n• Campo \"Peso Bruto Carga\": Soma (ou permite digitar) o peso total da carga.\n• Caixa \"Unidade Medida Peso\": Define a unidade de medida do peso informado (ex: KG ou TON).\n• Chave Seletora \"Produto Predominante\": Ativa/desativa os campos para descrever a carga principal (nome, NCM, tipo de carga), exigido para carga lotação."
            },
            {
              "h": 28,
              "w": 87.9,
              "x": 10.3,
              "y": 67.9,
              "id": "ponto-owuq80",
              "title": "Veículos e Condutores",
              "description": "• Caixa \"Veículo de Tração\": Lista os veículos cadastrados no sistema para selecionar o caminhão ou cavalo mecânico principal.\n• Caixa \"Condutor\": Seleciona o motorista responsável pela condução do veículo.\n• Botão \"+ Adicionar Condutor\": Abre uma nova linha para incluir motoristas adicionais (revezamento).\n• Botão \"+ Adicionar Reboque\": Abre os campos Placa e Capacidade (KG) para vincular carretas ou semirreboques ao conjunto.\n"
            }
          ]
        },
        {
          "id": "print-7fift9",
          "caption": "Cadastro de condutores, reboques e aba de seguros e contratantes.",
          "hotspots": [
            {
              "h": 22,
              "w": 42.1,
              "x": 11,
              "y": 7,
              "id": "ponto-5-1-jxw5ny",
              "title": "Adicionar Condutor",
              "description": "Clique para vincular o motorista responsável pela viagem."
            },
            {
              "h": 21.3,
              "w": 41.1,
              "x": 55,
              "y": 7,
              "id": "ponto-5-2-ib74iy",
              "title": "Adicionar Reboque",
              "description": "Adicione informações de reboques vinculados ao veículo de tração."
            },
            {
              "h": 1,
              "w": 1,
              "x": 92,
              "y": 60,
              "id": "ponto-5-3-gcm3ey",
              "title": "Outros",
              "description": "Ativa ou desativa a seção de informações complementares como seguros e pedágios."
            },
            {
              "h": 1,
              "w": 1,
              "x": 11,
              "y": 73,
              "id": "ponto-5-4-a609t7",
              "title": "Seguros & Contratantes",
              "description": "• Seguros: Clique em Adicionar Seguro para registrar a apólice que cobre a carga transportada. Preencha quem é o Resp. Pagamento (emitente ou contratante), o CPF/CNPJ Responsável, o Nome e CNPJ da Seguradora, além do Nº Apólice e Nº Averbação."
            },
            {
              "h": 1,
              "w": 1,
              "x": 25,
              "y": 71.5,
              "id": "ponto-5-5-psogsv",
              "title": "Vale Pedágio",
              "description": "Vale Pedágio: Aba destinada ao registro dos dados do fornecedor e comprovante de compra do vale-pedágio obrigatório."
            },
            {
              "h": 1,
              "w": 1,
              "x": 34,
              "y": 71,
              "id": "ponto-5-6-i9todm",
              "title": "Lacres",
              "description": "Lacres: Aba utilizada para informar os números dos lacres aplicados na unidade de carga ou contêiner."
            }
          ]
        },
        {
          "id": "print-556bgv",
          "caption": "Tomadores, CIOT, informações adicionais e botões finais de salvamento e geração.",
          "hotspots": [
            {
              "h": 24.2,
              "w": 86.3,
              "x": 11,
              "y": 4,
              "id": "ponto-6-1-qdo8kv",
              "title": "Adicionar Contratante",
              "description": "• Tomadores/Contratantes: Clique em Adicionar Contratante para informar o CPF/CNPJ e o Nome de quem contratou o serviço de transporte (obrigatório para transportadores autônomos ou em operações específicas)."
            },
            {
              "h": 1,
              "w": 1,
              "x": 87,
              "y": 33.5,
              "id": "ponto-6-2-idtrpc",
              "title": "Emitir CIOT",
              "description": "Emitir CIOT: Gera o código diretamente de forma integrada pelo sistema."
            },
            {
              "h": 1,
              "w": 1,
              "x": 47.5,
              "y": 52,
              "id": "ponto-6-3-q7gep8",
              "title": "Adicionar CIOT manual",
              "description": "Adicionar CIOT manual: Permite digitar o CPF/CNPJ e o número do CIOT caso já tenha sido gerado externamente."
            },
            {
              "h": 10.5,
              "w": 89.7,
              "x": 10,
              "y": 68,
              "id": "ponto-6-4-ohq964",
              "title": "Informações Adicionais",
              "description": "• Informações Adicionais: Ative a chave seletora à direita para abrir o campo de texto livre, onde podem ser inseridas observações de interesse do fisco ou dados complementares do transporte.\n• Salvar: Grava o preenchimento atua"
            },
            {
              "h": 1,
              "w": 1,
              "x": 72.5,
              "y": 86,
              "id": "ponto-6-5-ttu6b5",
              "title": "Salvar",
              "description": "Salva o rascunho do MDF-e sem transmiti-lo imediatamente."
            },
            {
              "h": 1,
              "w": 1,
              "x": 79,
              "y": 86,
              "id": "ponto-6-6-m1z0z7",
              "title": "Pré-visualizar",
              "description": "Gera uma prévia do documento para conferência dos dados preenchidos."
            },
            {
              "h": 1,
              "w": 1,
              "x": 89.5,
              "y": 85.5,
              "id": "ponto-6-7-17j8ru",
              "title": "Gerar",
              "description": "Transmite e autoriza o MDF-e junto à SEFAZ."
            }
          ]
        }
      ],
      "position": 18
    },
    {
      "id": "aula-h23md3",
      "module_id": "documentos",
      "title": "Emissão de Ciot",
      "summary": "Aprenda como acessar a tela de gerenciamento de CIOT, preencher os dados da operação, envolvidos, carga, viagem, veículo e pagamento para emitir um novo Código Identificador da Operação de Transporte no sistema.",
      "path": "Documentos > MDFe > CIOT > Emitir CIOT",
      "content": "Passo a passo\n1. No menu lateral esquerdo, clique em Documentos e selecione MDFe.\n2. No canto superior direito da tela de gestão de MDF-e, clique no botão CIOT e, em seguida, clique em Emitir CIOT.\n3. Na seção Operação, preencha os dados iniciais:\n\t• Selecione o Emitente (Contratada ou Contratante).\n\t• Defina o Tipo de operação (ex.: Lotação).\n\t• Informe as datas de Início Viagem e Fim Viagem.\n4. Na seção Envolvidos, vincule os participantes do transporte:\n\t• Busque e selecione o Contratante (ou clique em + para cadastrar um novo).\n\t• Confira os dados do Contratado e selecione o Destinatário da carga.\n5. Na seção Carga, informe os valores e características da mercadoria:\n\t• Preencha o Valor do frete (você pode usar a Calculadora frete mínimo como apoio) e o Peso total em KG.\n\t• Selecione a Natureza da carga e o Tipo da carga.\n6. Na seção Viagens, defina o trajeto:\n\t• Selecione os municípios de Origem e Destino.\n\t• Informe a Distância total do percurso em KM.\n7. Na seção Veículos, selecione o Veículo automotor, confira o RNTRC do veículo e o Número de eixos (clique em Adicionar veículo caso haja reboques).\n8. Em Indicador operacional, ative as chaves caso a viagem se enquadre em Veículo alto desempenho, Retorno vazio ou Composição veicular.\n9. Na seção Pagamento, defina as condições financeiras:\n\t• Escolha a Forma de pagamento (À vista ou Parcelado) e confira o Recebedor do pagamento.\n\t• Selecione o Tipo de pagamento (ex.: PIX) e informe a Chave PIX.\n10. Para finalizar, clique em Emitir CIOT para transmitir o documento (ou clique em Salvar rascunho para concluir depois).\n",
      "hotspots": [
        {
          "h": 26.7,
          "w": 7.6,
          "x": 0.2,
          "y": 57.1,
          "id": "ponto-dqhgc9",
          "title": "Documentos",
          "description": "Na barra lateral esquerda, o menu exibe as opções de emissão fiscal"
        },
        {
          "h": 7.9,
          "w": 17.3,
          "x": 7.4,
          "y": 19.6,
          "id": "ponto-2szusp",
          "title": "Mdfe",
          "description": "Para emitir o Ciot tem que entrar no MDFE"
        },
        {
          "h": 10.5,
          "w": 12.5,
          "x": 85.9,
          "y": 12.3,
          "id": "ponto-ukkojg",
          "title": "Ciot",
          "description": " Atalho direto para acessar o painel de gerenciamento de CIOT."
        }
      ],
      "screenshots": [
        {
          "id": "print-8k8oyq",
          "caption": "01",
          "hotspots": [
            {
              "h": 26.7,
              "w": 7.6,
              "x": 0.2,
              "y": 57.1,
              "id": "ponto-dqhgc9",
              "title": "Documentos",
              "description": "Na barra lateral esquerda, o menu exibe as opções de emissão fiscal"
            },
            {
              "h": 7.9,
              "w": 17.3,
              "x": 7.4,
              "y": 19.6,
              "id": "ponto-2szusp",
              "title": "Mdfe",
              "description": "Para emitir o Ciot tem que entrar no MDFE"
            },
            {
              "h": 10.5,
              "w": 12.5,
              "x": 85.9,
              "y": 12.3,
              "id": "ponto-ukkojg",
              "title": "Ciot",
              "description": " Atalho direto para acessar o painel de gerenciamento de CIOT."
            }
          ]
        },
        {
          "id": "print-eg8bzb",
          "caption": "02",
          "hotspots": [
            {
              "h": 8.9,
              "w": 9.6,
              "x": 64.2,
              "y": 12,
              "id": "ponto-8hw3aj",
              "title": "CIOT",
              "description": "Atalho direto para acessar o painel de gerenciamento de CIOT."
            }
          ]
        },
        {
          "id": "print-xujzxm",
          "caption": "03",
          "hotspots": [
            {
              "h": 7.4,
              "w": 35.9,
              "x": 9.1,
              "y": 12.1,
              "id": "ponto-e1452r",
              "title": "Filtros e Busca",
              "description": "• Ordenar por: Organiza a lista por critério selecionado (ex.: Data Cadastro).\n• Buscar: Pesquisa rápida por número do CIOT, contratante ou contratado.\n• Status: Filtra os registros pela situação atual (Aberto, Encerrado, Rejeitado)."
            },
            {
              "h": 9.3,
              "w": 9.6,
              "x": 75.9,
              "y": 12.1,
              "id": "ponto-uboaaf",
              "title": "MDFe",
              "description": "Retorna para a tela de gerenciamento de MDF-e."
            },
            {
              "h": 7.7,
              "w": 12.8,
              "x": 86.2,
              "y": 13.3,
              "id": "ponto-32q4fj",
              "title": "Emitir CIOT",
              "description": "Abre a janela para cadastro e emissão de um novo CIOT."
            },
            {
              "h": 71.9,
              "w": 89.8,
              "x": 8.9,
              "y": 28.099999999999994,
              "id": "ponto-j40v24",
              "title": "Listagem de Registros",
              "description": "• Apresenta o número do CIOT, data de Emissão, Contratante, Contratado, valor do Frete, Status e o menu Opções para ações individuais no registro.\n"
            }
          ]
        },
        {
          "id": "print-03j0xc",
          "caption": "04",
          "hotspots": [
            {
              "h": 10.6,
              "w": 19.4,
              "x": 20.9,
              "y": 16.2,
              "id": "ponto-lnkfec",
              "title": "Emitente",
              "description": "Define quem está emitindo o documento (Contratada ou Contratante)."
            },
            {
              "h": 9.7,
              "w": 18.8,
              "x": 40.9,
              "y": 16.5,
              "id": "ponto-ctfsqx",
              "title": "Tipo de operação",
              "description": "Seleciona a modalidade do transporte (ex.: Lotação)."
            },
            {
              "h": 10.3,
              "w": 19.4,
              "x": 60.6,
              "y": 16.2,
              "id": "ponto-x10w8s",
              "title": "Início Viagem / Fim Viagem",
              "description": "• Datas previstas para o início e término da operação de transporte."
            },
            {
              "h": 11.1,
              "w": 18.9,
              "x": 20.9,
              "y": 38.7,
              "id": "ponto-b6n9fz",
              "title": "Contratante",
              "description": "Campo de busca para selecionar a empresa ou pessoa que contratou o frete (o botão + permite cadastrar um novo)."
            },
            {
              "h": 10.8,
              "w": 19.1,
              "x": 40.6,
              "y": 38.4,
              "id": "ponto-gh134r",
              "title": "Contratado",
              "description": "Exibe os dados do transportador que realizará o serviço (preenchido automaticamente com a empresa emitente quando selecionada como contratada)."
            },
            {
              "h": 10,
              "w": 19.6,
              "x": 60.5,
              "y": 39.3,
              "id": "ponto-sbss6e",
              "title": "Destinatário",
              "description": "Campo para selecionar quem receberá a carga no destino."
            },
            {
              "h": 7.4,
              "w": 12.6,
              "x": 67.2,
              "y": 54.7,
              "id": "ponto-fgv90z",
              "title": "Calculadora frete mínimo",
              "description": "Ferramenta auxiliar para calcular o piso mínimo do frete conforme a tabela da ANTT."
            },
            {
              "h": 9.4,
              "w": 59.1,
              "x": 20.4,
              "y": 63,
              "id": "ponto-407rm7",
              "title": "Carga",
              "description": "• Valor do frete: Valor total acordado para o transporte.\n• Peso: Peso total da carga em quilogramas (KG).\n• Natureza da carga: Classificação fiscal/comercial da mercadoria (ex.: 0001 - Outros/Genérico).\n• Tipo da carga: Categoria da carga transportada (ex.: Carga geral)."
            },
            {
              "h": 18,
              "w": 58.7,
              "x": 21,
              "y": 78.4,
              "id": "ponto-zsgqzn",
              "title": " Viagens",
              "description": "• Origem / Destino: Campos de busca para definir os municípios de coleta e entrega da carga.\n• Distância: Quilometragem total do percurso entre origem e destino (em KM)."
            }
          ]
        },
        {
          "id": "print-2rajoi",
          "caption": "05",
          "hotspots": [
            {
              "h": 26.7,
              "w": 58.5,
              "x": 21.1,
              "y": 3.6,
              "id": "ponto-tw6yn4",
              "title": "Veículos",
              "description": "• Veículo automotor: Seleciona a placa do veículo cadastrado no sistema.\n• RNTRC do veículo: Registro Nacional de Transportadores Rodoviários de Cargas vinculado ao veículo.\n• Número de eixos: Quantidade total de eixos da composição veicular (utilizada para cálculo de pedágio e piso de frete).\n• Adicionar veículo: Permite incluir reboques ou veículos adicionais na mesma operação."
            },
            {
              "h": 18.5,
              "w": 58.5,
              "x": 21.4,
              "y": 32.2,
              "id": "ponto-tbwkaj",
              "title": " Indicador operacional",
              "description": "• Veículo alto desempenho: Indica se o veículo atende aos critérios de alto desempenho.\n• Retorno vazio: Sinaliza se haverá deslocamento de retorno sem carga.\n• Composição veicular: Indica o uso de conjunto articulado (cavalo mecânico + carreta)."
            },
            {
              "h": 32.3,
              "w": 58.7,
              "x": 21.4,
              "y": 51.5,
              "id": "ponto-wmqnno",
              "title": " Pagamento",
              "description": "• Forma de pagamento: Define se o frete será pago À vista ou Parcelado.\n• Recebedor do pagamento: Exibe o CPF ou CNPJ do titular que receberá o valor do frete.\n• Tipo de pagamento: Meio utilizado para a transferência (ex.: PIX, transferência bancária, etc.).\n• Chave PIX: Chave cadastrada para o recebimento do pagamento."
            },
            {
              "h": 8.1,
              "w": 22.3,
              "x": 58.9,
              "y": 90.3,
              "id": "ponto-cp86dc",
              "title": " Ações Finais",
              "description": "• Cancelar: Fecha a janela e descarta as informações preenchidas.\n• Salvar rascunho: Salva os dados inseridos sem transmitir o CIOT, permitindo finalizar depois.\n• Emitir CIOT: Valida os campos e transmite o registro para geração oficial do número CIOT."
            }
          ]
        }
      ],
      "position": 19
    },
    {
      "id": "aula-r1ohxi",
      "module_id": "documentos",
      "title": "Emitir Cteos",
      "summary": "Aprenda como acessar o módulo de Conhecimento de Transporte Outros Serviços (CTe OS), preencher os dados do tomador, trajeto, serviço, veículo, seguro e valores para emitir e transmitir o documento à SEFAZ.",
      "path": "Documentos > CTe OS > Emitir CTe OS",
      "content": "1. No menu lateral esquerdo, clique em Documentos e selecione CTe OS.\n2. No canto superior direito da tela, clique no botão Emitir CTe OS.\n3. Nos dados iniciais, confira o Número, a Série e a Data Emissão, e selecione o Tipo de CTe OS e o CFOP da operação.\n4. Selecione o Tomador do serviço (ou clique em + para cadastrar um novo) e defina o Município início e o Município fim da viagem.\n5. Na seção Serviço, preencha os detalhes do transporte:\n\t• Selecione o Tipo de Serviço (ex.: Transporte de Pessoas).\n\t• Informe a Descrição do Serviço, o Tipo de Fretamento e o Nº de Passageiros.\n6. Na seção Transporte/Seguro, preencha os dados operacionais:\n\t• Na aba Veículo, selecione o Veículo, informe a Data/Hora Viagem, o TAF e o Nº Registro Estadual.\n\t• Na aba Seguros, informe os dados da seguradora e da apólice, se aplicável.\n7. Na seção Valores, informe o Valor total do serviço e o Valor a receber (caso precise detalhar taxas, clique em Adicionar Componente).\n8. Se necessário, ative as chaves seletoras das seções Impostos, Faturas, Documentos ou Informações Adicionais para incluir dados complementares.\n9. Clique em Pré-visualizar para conferir os dados do documento ou em Salvar para gravar um rascunho.\n10. Para finalizar e transmitir o documento à SEFAZ, clique em Gerar CTe.",
      "hotspots": [
        {
          "h": 27.5,
          "w": 7.1,
          "x": 0.2,
          "y": 57.1,
          "id": "ponto-4czyim",
          "title": "Documentos ",
          "description": "Ao clicar em Documentos no menu lateral esquerdo e selecionar CTe OS, abre-se o painel principal de gerenciamento:"
        },
        {
          "h": 9.5,
          "w": 17.2,
          "x": 7.1,
          "y": 41,
          "id": "ponto-5j3f1z",
          "title": " CTe OS",
          "description": "Ao clicar em Documentos no menu lateral esquerdo e selecionar CTe OS, abre-se o painel principal de gerenciamento:"
        }
      ],
      "screenshots": [
        {
          "id": "print-99ie7m",
          "caption": "01",
          "hotspots": [
            {
              "h": 27.5,
              "w": 7.1,
              "x": 0.2,
              "y": 57.1,
              "id": "ponto-4czyim",
              "title": "Documentos ",
              "description": "Ao clicar em Documentos no menu lateral esquerdo e selecionar CTe OS, abre-se o painel principal de gerenciamento:"
            },
            {
              "h": 9.5,
              "w": 17.2,
              "x": 7.1,
              "y": 41,
              "id": "ponto-5j3f1z",
              "title": " CTe OS",
              "description": "Ao clicar em Documentos no menu lateral esquerdo e selecionar CTe OS, abre-se o painel principal de gerenciamento:"
            }
          ]
        },
        {
          "id": "print-3tp48z",
          "caption": "02",
          "hotspots": [
            {
              "h": 8.2,
              "w": 40.8,
              "x": 9,
              "y": 11.3,
              "id": "ponto-50t5fm",
              "title": "Filtros e Busca",
              "description": "• Permite organizar os registros em Ordenar por: Data Emissão, pesquisar rapidamente no campo Procurar ou refinar a pesquisa em Busca Avançada."
            },
            {
              "h": 7.9,
              "w": 11.2,
              "x": 73.3,
              "y": 11.6,
              "id": "ponto-4uibpi",
              "title": "Opção",
              "description": "Inutilizar Numeração"
            },
            {
              "h": 8.8,
              "w": 13.9,
              "x": 84.6,
              "y": 11.9,
              "id": "ponto-t8rnix",
              "title": "Emitir CTe OS",
              "description": "Inicia o formulário para criar um novo documento."
            },
            {
              "h": 73.6,
              "w": 88.4,
              "x": 9.5,
              "y": 26.4,
              "id": "ponto-k2yyvn",
              "title": "Listagem de Documentos",
              "description": "Exibe Número / Série, Data Emissão, Tipo CTe OS, Tipo Serviço, Tomador, Valor Serviço, Status (ex.: Autorizado, Cancelado) e o botão Opções (para baixar PDF/XML, cancelar, etc.)."
            }
          ]
        },
        {
          "id": "print-6biylv",
          "caption": "03",
          "hotspots": [
            {
              "h": 16.7,
              "w": 33.6,
              "x": 11.5,
              "y": 17.6,
              "id": "ponto-jqx4yz",
              "title": "Identificação",
              "description": "Exibe o Número e a Série (gerados automaticamente) e a Data Emissão do documento."
            },
            {
              "h": 16.7,
              "w": 50.6,
              "x": 48,
              "y": 17.6,
              "id": "ponto-nv7hwd",
              "title": "Tipo de CTe OS / CFOP",
              "description": "• Tipo de CTe OS: Define a finalidade da emissão (ex.: 0 - Normal).\n• CFOP: Seleciona o Código Fiscal de Operações e Prestações correspondente ao serviço prestado (ex.: 5352 - Prestação de serviço de transporte...)."
            },
            {
              "h": 16.4,
              "w": 29,
              "x": 10.3,
              "y": 43.7,
              "id": "ponto-3q3vt0",
              "title": "Tomador",
              "description": "Seleciona o cliente/contratante responsável pelo pagamento do serviço (o botão + permite cadastrar um novo)."
            },
            {
              "h": 14.8,
              "w": 57.8,
              "x": 40.3,
              "y": 44.6,
              "id": "ponto-sek3zw",
              "title": "Município início / Município fim",
              "description": "• Define as cidades de origem e destino da prestação do serviço."
            },
            {
              "h": 25.5,
              "w": 86.4,
              "x": 11.5,
              "y": 69.2,
              "id": "ponto-kfb5cp",
              "title": "Serviço",
              "description": "• Tipo de Serviço: Seleciona a modalidade da operação (ex.: Transporte de Pessoas, Transporte de Valores ou Excesso de Bagagem).\n• Descrição do Serviço: Campo de texto para detalhar o serviço prestado.\n• Tipo de Fretamento: Especifica a natureza do fretamento (ex.: Eventual ou Contínuo).\n• Nº de Passageiros: Informa a quantidade total de passageiros transportados na viagem."
            }
          ]
        },
        {
          "id": "print-20tkfb",
          "caption": "04",
          "hotspots": [
            {
              "h": 46.8,
              "w": 43.1,
              "x": 8.2,
              "y": 2.4,
              "id": "ponto-6kav1k",
              "title": "Transporte / Seguro",
              "description": "• \n\t• Veículo: Seleciona o veículo cadastrado que realizará o transporte (o botão + permite cadastrar um novo).\n\t• Data/Hora Viagem: Informa a data e o horário previstos para a viagem.\n\t• TAF: Número do Termo de Autorização de Fretamento (para transporte interestadual/internacional).\n\t• Nº Registro Estadual: Número de registro do veículo no órgão regulador estadual.\n• Aba Seguros: Destinada ao preenchimento dos dados da seguradora, número da apólice e averbação."
            },
            {
              "h": 46.5,
              "w": 43.9,
              "x": 53.6,
              "y": 2.4,
              "id": "ponto-graxx5",
              "title": "Valores",
              "description": "• Valor total do serviço: Valor bruto cobrado pela prestação do transporte.\n• Valor a receber: Valor líquido a ser recebido pelo emitente.\n• Componentes do Valor: Clique em Adicionar Componente para discriminar parcelas que compõem o preço final (ex.: Frete, Pedágio, Taxas), informando a Descrição e o Valor de cada item.\n"
            },
            {
              "h": 32.4,
              "w": 89.5,
              "x": 7.7,
              "y": 52.9,
              "id": "ponto-3yhiek",
              "title": "Seções Complementares e Ações Finais",
              "description": "• Impostos: Permite configurar ou ajustar as alíquotas e valores tributários incidentes (como ICMS, PIS e COFINS).\n• Faturas: Habilita a geração de cobrança/duplicatas vinculadas ao serviço prestado.\n• Documentos: Permite vincular documentos fiscais anteriores ou referenciados à operação.\n• Informações Adicionais: Abre o campo de texto livre para observações complementares ou exigências fiscais."
            },
            {
              "h": 9,
              "w": 21.2,
              "x": 76.2,
              "y": 88.5,
              "id": "ponto-a2k1b0",
              "title": "Ações Finais",
              "description": "• Salvar: Grava o preenchimento atual como rascunho para continuar depois.\n• Pré-visualizar: Gera uma prévia do documento (DACTE OS) para conferência antes da transmissão.\n• Gerar CTe: Valida todos os dados e transmite o documento para autorização na SEFAZ.\n"
            }
          ]
        }
      ],
      "position": 20
    },
    {
      "id": "aula-uafdcq",
      "module_id": "documentos",
      "title": "Exportar XML",
      "summary": "Aprenda como filtrar o período e o ambiente desejado para gerar, baixar ou enviar automaticamente os arquivos XML dos documentos fiscais emitidos para a contabilidade e outros destinatários.",
      "path": "Documentos > Exportar XML",
      "content": "1. No menu lateral esquerdo, clique em Documentos e selecione Exportar XML.\n2. No campo Período, selecione a data inicial e a data final referente aos documentos que deseja exportar.\n3. Defina se deseja encaminhar os arquivos diretamente para a contabilidade ativando ou desativando a chave Enviar para o contador?.\n4. Caso queira enviar para outras pessoas, digite os endereços no campo E-mail(s) Destinatário(s).\n5. No campo Ambiente, selecione entre 1 - Produção (documentos fiscais oficiais) ou 2 - Homologação (documentos de teste).\n6. Se precisar filtrar modelos específicos de documentos, clique na seta de expansão (v) à direita para exibir as opções adicionais.\n7. Clique no botão Enviar para concluir a exportação e realizar o envio/download dos arquivos XML.",
      "hotspots": [
        {
          "h": 22.6,
          "w": 6.1,
          "x": 0.3,
          "y": 44.3,
          "id": "ponto-taa11o",
          "title": "Documentos",
          "description": "Menu localizado na barra lateral esquerda que direciona para a ferramenta de geração, download e envio em lote dos arquivos XML das notas e documentos fiscais emitidos."
        },
        {
          "h": 7.5,
          "w": 14,
          "x": 6.2,
          "y": 39.3,
          "id": "ponto-b68r6m",
          "title": "Exportar XML",
          "description": "Menu localizado na barra lateral esquerda que direciona para a ferramenta de geração, download e envio em lote dos arquivos XML das notas e documentos fiscais emitidos."
        }
      ],
      "screenshots": [
        {
          "id": "print-ms4pck",
          "caption": "01",
          "hotspots": [
            {
              "h": 22.6,
              "w": 6.1,
              "x": 0.3,
              "y": 44.3,
              "id": "ponto-taa11o",
              "title": "Documentos",
              "description": "Menu localizado na barra lateral esquerda que direciona para a ferramenta de geração, download e envio em lote dos arquivos XML das notas e documentos fiscais emitidos."
            },
            {
              "h": 7.5,
              "w": 14,
              "x": 6.2,
              "y": 39.3,
              "id": "ponto-b68r6m",
              "title": "Exportar XML",
              "description": "Menu localizado na barra lateral esquerda que direciona para a ferramenta de geração, download e envio em lote dos arquivos XML das notas e documentos fiscais emitidos."
            }
          ]
        },
        {
          "id": "print-yeavp1",
          "caption": "02",
          "hotspots": [
            {
              "h": 12.9,
              "w": 22.1,
              "x": 9,
              "y": 22.4,
              "id": "ponto-lq6nwg",
              "title": "Período",
              "description": "Seletor de data utilizado para definir o intervalo inicial e final dos documentos fiscais que serão exportados (ex.: 01/10/2026 - 31/10/2026)."
            },
            {
              "h": 12.9,
              "w": 11.6,
              "x": 32.9,
              "y": 22.7,
              "id": "ponto-zl78ua",
              "title": "Enviar para o contador",
              "description": "Chave seletora que, quando ativada, encaminha automaticamente os arquivos XML gerados para o e-mail da contabilidade cadastrada no sistema."
            },
            {
              "h": 12.6,
              "w": 29.3,
              "x": 45.7,
              "y": 22.1,
              "id": "ponto-jz4hdc",
              "title": "E-mail(s) Destinatário(s)",
              "description": "Campo de texto livre para inserir manualmente um ou mais endereços de e-mail adicionais que devem receber os arquivos exportados."
            },
            {
              "h": 11,
              "w": 19.3,
              "x": 75.7,
              "y": 22.4,
              "id": "ponto-6nrect",
              "title": "Ambiente",
              "description": "Permite escolher de qual ambiente fiscal os documentos serão extraídos (1 - Produção, para documentos com validade fiscal, ou 2 - Homologação, para testes)."
            },
            {
              "h": 7.2,
              "w": 6.2,
              "x": 92.3,
              "y": 40.6,
              "id": "ponto-lt6ggo",
              "title": "Enviar",
              "description": "Processa a solicitação conforme o período e os filtros definidos, realizando o download e/ou o envio dos arquivos XML para os destinatários configurados."
            }
          ]
        }
      ],
      "position": 21
    },
    {
      "id": "aula-zqvgnw",
      "module_id": "relatorios",
      "title": "Relatórios",
      "summary": "Nesta aula, você vai conhecer a tela principal de Relatórios do sistema e entender como as informações estão organizadas por categorias (Cadastros, NFe, NFCe, NFSe, CTe e CTeOS) para facilitar a consulta e exportação dos seus dados fiscais e gerenciais.",
      "path": "Menu lateral > Relatórios",
      "content": "1. No menu lateral esquerdo (barra roxa), clique na opção Relatórios.\n2. Na tela principal, você verá seis abas expansíveis divididas por tipo de informação:\n\t• Cadastros: para consultar listagens de clientes, fornecedores, transportadoras e produtos/serviços.\n\t• NFe: para relatórios de Notas Fiscais de Produto (modelo 55).\n\t• NFCe: para relatórios de Notas Fiscais de Consumidor / varejo (modelo 65).\n\t• NFSe: para relatórios de Notas Fiscais de Serviço.\n\t• CTe: para relatórios de Conhecimento de Transporte de cargas (modelo 57).\n\t• CTeOS: para relatórios de Conhecimento de Transporte para Outros Serviços (modelo 67).\n3. Clique sobre a seta ao lado direito da categoria desejada para expandir a aba e visualizar os relatórios específicos disponíveis dentro dela.",
      "hotspots": [
        {
          "h": 22.7,
          "w": 6,
          "x": 0,
          "y": 64.8,
          "id": "ponto-unh7yu",
          "title": "Relatórios",
          "description": "Área destinada à consulta, filtragem e exportação de dados gerenciais e fiscais registrados no sistema."
        },
        {
          "h": 7.8,
          "w": 89,
          "x": 8.2,
          "y": 12.8,
          "id": "ponto-iwxu6i",
          "title": "Cadastros",
          "description": "Permite gerar relatórios referentes aos registros base do sistema, como listagens de clientes, fornecedores, transportadoras e produtos/serviços cadastrados."
        },
        {
          "h": 9.6,
          "w": 88.8,
          "x": 8.5,
          "y": 20.9,
          "id": "ponto-ryxpgu",
          "title": "NFe ",
          "description": "Exibe as opções de relatórios para acompanhamento de notas fiscais de produtos (modelo 55), possibilitando consultar documentos emitidos, cancelados, inutilizados ou por período."
        },
        {
          "h": 8.1,
          "w": 89,
          "x": 8.5,
          "y": 30.2,
          "id": "ponto-3tjo55",
          "title": "NFCe ",
          "description": "Reúne os relatórios voltados para vendas no varejo ao consumidor final (modelo 65), facilitando o fechamento de caixa e a conferência de vendas."
        },
        {
          "h": 8.4,
          "w": 90.2,
          "x": 8,
          "y": 38.3,
          "id": "ponto-c0q729",
          "title": "NFSe ",
          "description": "Apresenta os relatórios específicos de prestação de serviços, permitindo analisar o faturamento e os impostos retidos/devidos sobre serviços prestados."
        },
        {
          "h": 7.5,
          "w": 89.4,
          "x": 8.2,
          "y": 46.4,
          "id": "ponto-sxekgx",
          "title": "CTe ",
          "description": "Disponibiliza relatórios relacionados aos documentos fiscais de transporte de cargas (modelo 57), auxiliando no controle logístico e fiscal de fretes.\n"
        },
        {
          "h": 8.1,
          "w": 89.4,
          "x": 8.4,
          "y": 56.1,
          "id": "ponto-tguw99",
          "title": "CTeOS ",
          "description": "Concentra os relatórios de documentos fiscais emitidos para transporte de pessoas, valores ou excesso de bagagem (modelo 67)."
        }
      ],
      "screenshots": [
        {
          "id": "print-kcosrc",
          "caption": "Captura de tela 2026-11-19 154130",
          "hotspots": [
            {
              "h": 22.7,
              "w": 6,
              "x": 0,
              "y": 64.8,
              "id": "ponto-unh7yu",
              "title": "Relatórios",
              "description": "Área destinada à consulta, filtragem e exportação de dados gerenciais e fiscais registrados no sistema."
            },
            {
              "h": 7.8,
              "w": 89,
              "x": 8.2,
              "y": 12.8,
              "id": "ponto-iwxu6i",
              "title": "Cadastros",
              "description": "Permite gerar relatórios referentes aos registros base do sistema, como listagens de clientes, fornecedores, transportadoras e produtos/serviços cadastrados."
            },
            {
              "h": 9.6,
              "w": 88.8,
              "x": 8.5,
              "y": 20.9,
              "id": "ponto-ryxpgu",
              "title": "NFe ",
              "description": "Exibe as opções de relatórios para acompanhamento de notas fiscais de produtos (modelo 55), possibilitando consultar documentos emitidos, cancelados, inutilizados ou por período."
            },
            {
              "h": 8.1,
              "w": 89,
              "x": 8.5,
              "y": 30.2,
              "id": "ponto-3tjo55",
              "title": "NFCe ",
              "description": "Reúne os relatórios voltados para vendas no varejo ao consumidor final (modelo 65), facilitando o fechamento de caixa e a conferência de vendas."
            },
            {
              "h": 8.4,
              "w": 90.2,
              "x": 8,
              "y": 38.3,
              "id": "ponto-c0q729",
              "title": "NFSe ",
              "description": "Apresenta os relatórios específicos de prestação de serviços, permitindo analisar o faturamento e os impostos retidos/devidos sobre serviços prestados."
            },
            {
              "h": 7.5,
              "w": 89.4,
              "x": 8.2,
              "y": 46.4,
              "id": "ponto-sxekgx",
              "title": "CTe ",
              "description": "Disponibiliza relatórios relacionados aos documentos fiscais de transporte de cargas (modelo 57), auxiliando no controle logístico e fiscal de fretes.\n"
            },
            {
              "h": 8.1,
              "w": 89.4,
              "x": 8.4,
              "y": 56.1,
              "id": "ponto-tguw99",
              "title": "CTeOS ",
              "description": "Concentra os relatórios de documentos fiscais emitidos para transporte de pessoas, valores ou excesso de bagagem (modelo 67)."
            }
          ]
        }
      ],
      "position": 22
    },
    {
      "id": "aula-1ey8sq",
      "module_id": "configuracoes",
      "title": "Configurando os Dados Gerais da Empresa",
      "summary": "Nesta aula, você aprenderá a preencher e atualizar as informações cadastrais principais da sua empresa, como CNPJ, inscrições, razão social, contatos e a logomarca que sairá nos documentos fiscais.",
      "path": "Configurações > Empresa",
      "content": "Acessando a área da Empresa\n• No menu lateral esquerdo (barra roxa), clique em Configurações e selecione Empresa.\n2. Aba: Dados da Empresa\n• Logo Empresa: Clique ou arraste a imagem da sua logomarca para que ela apareça nas impressões das notas.\n• CPF/CNPJ: Digite o CNPJ da empresa e clique na lupa para buscar os dados cadastrais automaticamente.\n• Isento IE / Inscrição Estadual / Inscrição Municipal: Ative a chave caso seja isento de IE ou preencha as inscrições estadual e municipal conforme a atividade da empresa.\n• Razão Social e Nome Fantasia: Confira o nome jurídico e o nome comercial.\n• Telefone e E-mail: Informe os contatos principais da empresa.\n3. Aba: Tributação\n• Clique na aba superior Tributação.\n• Regime Tributário e Alíquota SN: Selecione o enquadramento fiscal (ex.: 1 - Simples Nacional) e informe a alíquota correspondente.\n• PIS/COFINS: Defina a Situação Tributária padrão (ex.: 99 - Outras Operações) e preencha os campos Alíquota PIS e Alíquota COFINS.\n• Clique em Salvar Tributação no canto inferior direito antes de mudar de aba.\n4. Aba: Certificado Digital\n• Clique na aba superior Certificado Digital.\n• Confira os dados do Certificado Digital A1 instalado (Empresa, Emissor e data de Vencimento).\n• Caso precise instalar ou renovar o arquivo .pfx, clique no botão Opções à direita.\n5. Aba: Notas Fiscais (Configurações Gerais e Contabilidade)\n• Clique na aba superior Notas Fiscais.\n• Na seção Geral, defina a quantidade de casas decimais em Decimais Quantidade (ex.: 3) e Decimais Valor (R$) (ex.: 2).\n• Na seção Contabilidade, informe o Dia Envio Agendado e adicione os endereços em E-mail(s) Contador para automatizar o envio mensal dos XMLs e relatórios.\n6. Aba: Notas Fiscais (Parâmetros por Tipo de Documento)\n• Ainda na aba Notas Fiscais, role até a parte inferior e configure apenas as sub-abas dos documentos que a sua empresa emite:\n\t• NF-e: Preencha Série NF-e, Última NF-e (ou marque Série Dinâmica), formato de Impressão (DANFE A4), Ambiente de Emissão (Produção ou Homologação), status de Contingência e se deseja Enviar e-mail ao emitir/cancelar NF-e.\n\t• NFC-e: Informe Série, Última NFC-e, os códigos CSC e ID CSC (gerados na SEFAZ), Impressão (80MM), Natureza Padrão (Venda), Ambiente de Emissão e Contingência.\n\t• NFS-e: Preencha Série RPS, Próximo RPS, Regime de Apuração do SN, Regime Trib. Especial, Tributação Padrão do ISSQN, Ambiente de Emissão e envio automático de e-mail.\n\t• CT-e: Configure Série, Último CT-e, RNTRC, CFOP Padrão, Ambiente de Emissão, Versão (4.00), Contingência e envio de e-mail.\n\t• CT-e OS: Informe Série, Último CT-e OS, CFOP Padrão, Nro Registro Estadual, TAF, Ambiente de Emissão, Versão (4.00), Contingência e envio de e-mail.\n\t• MDF-e: Preencha Série, Último MDF-e, RNTRC, Tipo Emitente e Ambiente de Emissão.\n7. Finalizando\n• Após revisar todas as abas configuradas, clique no botão Salvar Configurações no canto inferior direito para gravar as alterações.",
      "hotspots": [
        {
          "h": 19.8,
          "w": 5.2,
          "x": 0.3,
          "y": 77.7,
          "id": "ponto-5uahe6",
          "title": "Configurações ",
          "description": "Configurações da empresa, documentos, usuários e assinaturas"
        },
        {
          "h": 8.2,
          "w": 12.2,
          "x": 6.1,
          "y": 5,
          "id": "ponto-9otbdq",
          "title": "Dados da Empresa",
          "description": "Preencher e atualizar as informações cadastrais principais da sua empresa, como CNPJ, inscrições, razão social, contatos e a logomarca que sairá nos documentos fiscais."
        }
      ],
      "screenshots": [
        {
          "id": "print-e32gd2",
          "caption": "01",
          "hotspots": [
            {
              "h": 19.8,
              "w": 5.2,
              "x": 0.3,
              "y": 77.7,
              "id": "ponto-5uahe6",
              "title": "Configurações ",
              "description": "Configurações da empresa, documentos, usuários e assinaturas"
            },
            {
              "h": 8.2,
              "w": 12.2,
              "x": 6.1,
              "y": 5,
              "id": "ponto-9otbdq",
              "title": "Dados da Empresa",
              "description": "Preencher e atualizar as informações cadastrais principais da sua empresa, como CNPJ, inscrições, razão social, contatos e a logomarca que sairá nos documentos fiscais."
            }
          ]
        },
        {
          "id": "print-zg88wf",
          "caption": "02",
          "hotspots": [
            {
              "h": 34.9,
              "w": 13.1,
              "x": 46.4,
              "y": 19.3,
              "id": "ponto-4vbsg0",
              "title": "Logo Empresa",
              "description": "Clique ou arraste a imagem da sua marca para exibi-la nas impressões das notas."
            },
            {
              "h": 14.3,
              "w": 29.8,
              "x": 8.2,
              "y": 56.4,
              "id": "ponto-bhqw37",
              "title": "CPF/CNPJ",
              "description": "Informe o documento da empresa (use o ícone de lupa para buscar os dados automaticamente)."
            },
            {
              "h": 12.5,
              "w": 4.9,
              "x": 37.9,
              "y": 57.6,
              "id": "ponto-hggh45",
              "title": "Isento IE",
              "description": "Ative esta chave caso a empresa seja isenta de Inscrição Estadual."
            }
          ]
        },
        {
          "id": "print-551dvf",
          "caption": "03",
          "hotspots": [
            {
              "h": 13.8,
              "w": 89.3,
              "x": 8,
              "y": 27.5,
              "id": "ponto-oiwl11",
              "title": "Regime Tributário",
              "description": "• Regime Tributário: Selecione o enquadramento fiscal (ex.: 1 - Simples Nacional).\n• Alíquota SN: Informe o percentual da alíquota do Simples Nacional aplicável à sua faixa de faturamento."
            },
            {
              "h": 37.5,
              "w": 88.4,
              "x": 9,
              "y": 46.9,
              "id": "ponto-nxj0nx",
              "title": "PIS/COFINS",
              "description": "1. • Situação Tributária: Escolha o CST padrão para as operações (ex.: 99 - Outras Operações).\n\t• Alíquota PIS e Alíquota COFINS: Digite os percentuais padrão desses tributos.\n2. Clique no botão Salvar Tributação no canto inferior direito."
            }
          ]
        },
        {
          "id": "print-5306ek",
          "caption": "04",
          "hotspots": [
            {
              "h": 23.3,
              "w": 89.8,
              "x": 8.5,
              "y": 20.4,
              "id": "ponto-wy9478",
              "title": "Certificado Digital",
              "description": "1. Acesse Configurações > Empresa e clique na aba Certificado Digital.\n2. Na seção Certificado Digital A1, verifique as informações do certificado ativo:\n\t• Empresa: Razão social vinculada ao certificado.\n\t• Emissor: Autoridade certificadora responsável pela emissão.\n\t• Vencimento: Data limite de validade do arquivo digital.\n3. Clique no botão Opções (à direita) para enviar um novo arquivo .pfx ou atualizar a senha quando o certificado vencer."
            }
          ]
        },
        {
          "id": "print-bkxzxq",
          "caption": "05",
          "hotspots": [
            {
              "h": 7.5,
              "w": 8.7,
              "x": 35,
              "y": 3.1,
              "id": "ponto-2x504x",
              "title": "Notas Fiscais",
              "description": "Configurações Gerais e Contabilidade"
            },
            {
              "h": 42.7,
              "w": 89.4,
              "x": 8.1,
              "y": 10.1,
              "id": "ponto-1vjcnn",
              "title": "Geral",
              "description": "1. \n\t• Decimais Quantidade: Define quantas casas decimais serão usadas na quantidade dos produtos (ex.: 3).\n\t• Decimais Valor (R$): Define as casas decimais para valores monetários (ex.: 2).\n2. Na seção Contabilidade, configure o envio automático:\n\t• Dia Envio Agendado: Escolha o dia do mês em que o sistema enviará o fechamento fiscal automaticamente.\n\t• E-mail(s) Contador: Insira um ou mais endereços de e-mail da contabilidade para receberem os arquivos."
            },
            {
              "h": 37.4,
              "w": 89.1,
              "x": 8.1,
              "y": 61.5,
              "id": "ponto-trsqzd",
              "title": "NF-e",
              "description": "• Série NF-e / Última NF-e: Número da série e o último número emitido para controle sequencial. (Marque Série Dinâmica se utilizar múltiplas séries).\n• Impressão: Formato padrão do DANFE (ex.: DANFE A4).\n• Ambiente de Emissão: Escolha entre 1 - Produção (validade jurídica) ou 2 - Homologação (testes).\n• Contingência: Botão que indica ou ativa o modo de emissão offline/contingência.\n• Enviar e-mail ao emitir/cancelar NF-e: Define se o cliente recebe o XML/PDF automaticamente."
            }
          ]
        },
        {
          "id": "print-bofb5k",
          "caption": "06",
          "hotspots": [
            {
              "h": 37,
              "w": 89.8,
              "x": 7.4,
              "y": 62.6,
              "id": "ponto-6poe5g",
              "title": "NFC-e",
              "description": "• \n\t• Série / Última NFC-e: Controle sequencial da numeração de vendas no varejo.\n\t• CSC e ID CSC: Código de Segurança do Contribuinte e seu identificador, fornecidos pela SEFAZ para gerar o QR Code.\n\t• Impressão: Largura da bobina térmica (ex.: 80MM).\n\t• Natureza Padrão: Operação padrão de saída (ex.: Venda).\n\t• Ambiente de Emissão e Contingência: Definição do ambiente e status de contingência."
            }
          ]
        },
        {
          "id": "print-vry1wi",
          "caption": "07",
          "hotspots": [
            {
              "h": 39.2,
              "w": 90.7,
              "x": 7.7,
              "y": 60.8,
              "id": "ponto-ty7xu6",
              "title": "NFS-e",
              "description": "• \n\t• Série RPS e Próximo RPS: Controle de numeração do Recibo Provisório de Serviços.\n\t• Regime de Apuração do SN / Regime Trib. Especial: Enquadramento tributário específico exigido pela prefeitura.\n\t• Tributação Padrão do ISSQN: Define a regra padrão de incidência do ISS (ex.: 1 - Operação tributável).\n\t• Ambiente de Emissão e Envio de E-mail: Configuração de ambiente e disparo automático ao tomador."
            }
          ]
        },
        {
          "id": "print-6334de",
          "caption": "08",
          "hotspots": [
            {
              "h": 36.8,
              "w": 90.5,
              "x": 7.9,
              "y": 62.8,
              "id": "ponto-89bm98",
              "title": "CT-e",
              "description": "• \n\t• Série / Último CT-e: Numeração sequencial do transporte de cargas.\n\t• RNTRC: Registro Nacional de Transportadores Rodoviários de Cargas (ANTT).\n\t• CFOP Padrão: Código Fiscal de Operações padrão para os fretes.\n\t• Ambiente de Emissão, Versão e Contingência: Define o ambiente, a versão do layout (ex.: 4.00) e o status de contingência."
            }
          ]
        },
        {
          "id": "print-7vjnce",
          "caption": "09",
          "hotspots": [
            {
              "h": 37,
              "w": 90.7,
              "x": 8.1,
              "y": 63,
              "id": "ponto-zuutz7",
              "title": "CT-e OS",
              "description": "• \n\t• Série / Último CT-e OS / CFOP Padrão: Controle de numeração e CFOP padrão para transporte de pessoas/valores.\n\t• Nro Registro Estadual e TAF: Número do Termo de Autorização de Fretamento (ANTT) ou registro estadual correspondente.\n\t• Ambiente de Emissão, Versão e Contingência: Configurações técnicas de transmissão e contingência."
            }
          ]
        },
        {
          "id": "print-zlvtcy",
          "caption": "10",
          "hotspots": [
            {
              "h": 38.7,
              "w": 91.3,
              "x": 7.9,
              "y": 61.1,
              "id": "ponto-i31yv8",
              "title": "MDF-e",
              "description": "• \n\t• Série / Último MDF-e: Controle sequencial dos manifestos de carga.\n\t• RNTRC: Registro da ANTT do transportador.\n\t• Tipo Emitente: Define se o emitente é prestador de serviço de transporte ou transportador de carga própria.\n\t• Ambiente de Emissão: Escolha entre Produção ou Homologação.\n2. Após preencher as abas dos documentos que sua empresa emite, clique em Salvar Configurações no canto inferior direito."
            }
          ]
        }
      ],
      "position": 23
    },
    {
      "id": "aula-zgj4zl",
      "module_id": "configuracoes",
      "title": "Criando Usuários de Acesso",
      "summary": "Nesta aula, você aprenderá a consultar os usuários já cadastrados, verificar o status de acesso e criar novos perfis para colaboradores ou contadores que precisam acessar o sistema.",
      "path": "Configurações > Usuários",
      "content": "Acessando a gestão de usuários\n• No menu lateral esquerdo (barra roxa), clique em Configurações e selecione Usuários.\n2. Conhecendo a tela de listagem\n• Campo de Busca (Lupa): Digite o nome ou e-mail na barra superior esquerda para localizar rapidamente um usuário cadastrado.\n• Lista de Usuários: Exibe os registros cadastrados junto com a etiqueta de status (Ativo ou inativo).\n• Botão Opções: À direita de cada usuário, permite editar dados, alterar permissões, redefinir senha ou inativar o acesso.\n• Paginação (canto inferior direito): Permite controlar quantos usuários são exibidos por página (ex.: 20).\n3. Criando um novo usuário\n• Clique no botão roxo Novo Usuário no canto superior direito da tela.\n• Preencha os dados de identificação, login/senha e defina as permissões de acesso do colaborador na tela seguinte.",
      "hotspots": [
        {
          "h": 14.4,
          "w": 6.3,
          "x": 0,
          "y": 85.6,
          "id": "ponto-iblvb9",
          "title": "Configurações ",
          "description": "Configurações da empresa, usuários e assinaturas"
        },
        {
          "h": 8.1,
          "w": 12.4,
          "x": 6.1,
          "y": 10.4,
          "id": "ponto-9hcw6p",
          "title": "Usuários",
          "description": "Usuários já cadastrados, verificar o status de acesso e criar novos perfis para colaboradores ou contadores que precisam acessar o sistema."
        },
        {
          "h": 42,
          "w": 78,
          "x": 20,
          "y": 18.6,
          "id": "ponto-ilglpy",
          "title": "Tela de listagem",
          "description": " Exibe os registros cadastrados junto com a etiqueta de status (Ativo ou inativo)."
        },
        {
          "h": 8.5,
          "w": 11.6,
          "x": 87.3,
          "y": 7.8,
          "id": "ponto-6y2j2z",
          "title": "Novo Usuário",
          "description": "Preencha os dados de identificação, login/senha e defina as permissões de acesso do colaborador na tela seguinte."
        }
      ],
      "screenshots": [
        {
          "id": "print-aupwim",
          "caption": "Captura de tela 2026-11-19 161539",
          "hotspots": [
            {
              "h": 14.4,
              "w": 6.3,
              "x": 0,
              "y": 85.6,
              "id": "ponto-iblvb9",
              "title": "Configurações ",
              "description": "Configurações da empresa, usuários e assinaturas"
            },
            {
              "h": 8.1,
              "w": 12.4,
              "x": 6.1,
              "y": 10.4,
              "id": "ponto-9hcw6p",
              "title": "Usuários",
              "description": "Usuários já cadastrados, verificar o status de acesso e criar novos perfis para colaboradores ou contadores que precisam acessar o sistema."
            },
            {
              "h": 42,
              "w": 78,
              "x": 20,
              "y": 18.6,
              "id": "ponto-ilglpy",
              "title": "Tela de listagem",
              "description": " Exibe os registros cadastrados junto com a etiqueta de status (Ativo ou inativo)."
            },
            {
              "h": 8.5,
              "w": 11.6,
              "x": 87.3,
              "y": 7.8,
              "id": "ponto-6y2j2z",
              "title": "Novo Usuário",
              "description": "Preencha os dados de identificação, login/senha e defina as permissões de acesso do colaborador na tela seguinte."
            }
          ]
        }
      ],
      "position": 24
    },
    {
      "id": "aula-fe7tpx",
      "module_id": "configuracoes",
      "title": "Pagamentos e Faturas",
      "summary": "Nesta aula, você aprenderá a consultar os detalhes do seu plano ativo, alterar o método de pagamento, acompanhar as datas de cobrança e acessar o histórico de faturas pagas ou em aberto.",
      "path": "Configurações > Assinatura",
      "content": "Acessando a área de assinatura\n• No menu lateral esquerdo (barra roxa), clique em Configurações e selecione Assinatura.\n2. Conferindo os dados do plano atual (Card superior)\n• Plano: Exibe o nome do plano contratado atualmente (ex.: Plano básico).\n• Método de Pagamento: Mostra a forma de pagamento configurada (ex.: PIX). Clique na seta ao lado para alterar o método, se disponível.\n• Valor: Indica o valor recorrente da assinatura.\n• Data de Adesão: Data em que o plano foi contratado.\n• Última Cobrança / Próxima Cobrança: Datas da última fatura gerada e da próxima renovação automática.\n• Cancelar assinatura: Botão vermelho no canto superior direito para solicitar o cancelamento do plano.\n3. Consultando o histórico de faturas (Lista inferior)\n• Na parte inferior da tela, você visualiza todas as mensalidades geradas com as colunas Forma de Pagamento, Data Vencimento, Data Pagamento, Valor e a etiqueta de status (ex.: Pago).\n• Clique no botão Opções à direita de qualquer fatura para visualizar o comprovante, segunda via de cobrança ou detalhes do pagamento.",
      "hotspots": [
        {
          "h": 19.4,
          "w": 6.2,
          "x": 0,
          "y": 80.6,
          "id": "ponto-6q6iu6",
          "title": "Configurações ",
          "description": "Configurações "
        },
        {
          "h": 8.4,
          "w": 13.1,
          "x": 5.8,
          "y": 16.6,
          "id": "ponto-6j9oj4",
          "title": "Assinatura",
          "description": "Histórico de faturas pagas ou em aberto e opções de pagamentos."
        },
        {
          "h": 20.5,
          "w": 77.7,
          "x": 19.9,
          "y": 14.7,
          "id": "ponto-6f4cdl",
          "title": "Conferindo os dados do plano atual",
          "description": "• Plano: Exibe o nome do plano contratado atualmente (ex.: Plano básico).\n• Método de Pagamento: Mostra a forma de pagamento configurada (ex.: PIX). Clique na seta ao lado para alterar o método, se disponível.\n• Valor: Indica o valor recorrente da assinatura.\n• Data de Adesão: Data em que o plano foi contratado.\n• Última Cobrança / Próxima Cobrança: Datas da última fatura gerada e da próxima renovação automática.\n• Cancelar assinatura: Botão vermelho no canto superior direito para solicitar o cancelamento do plano."
        },
        {
          "h": 20.5,
          "w": 70.3,
          "x": 20.5,
          "y": 48.5,
          "id": "ponto-68rd0a",
          "title": "Histórico de faturas",
          "description": "Na parte inferior da tela, você visualiza todas as mensalidades geradas com as colunas Forma de Pagamento, Data Vencimento, Data Pagamento, Valor e a etiqueta de status (ex.: Pago)."
        },
        {
          "h": 7.8,
          "w": 6.9,
          "x": 91.3,
          "y": 49.1,
          "id": "ponto-aat4uc",
          "title": "Opções ",
          "description": "Clique em uma fatura em aberta para pagar - Boleto - Pix ou Cartão - pagamentos no pix libera sistema na hora."
        }
      ],
      "screenshots": [
        {
          "id": "print-2l13ea",
          "caption": "Captura de tela 2026-11-19 163519",
          "hotspots": [
            {
              "h": 19.4,
              "w": 6.2,
              "x": 0,
              "y": 80.6,
              "id": "ponto-6q6iu6",
              "title": "Configurações ",
              "description": "Configurações "
            },
            {
              "h": 8.4,
              "w": 13.1,
              "x": 5.8,
              "y": 16.6,
              "id": "ponto-6j9oj4",
              "title": "Assinatura",
              "description": "Histórico de faturas pagas ou em aberto e opções de pagamentos."
            },
            {
              "h": 20.5,
              "w": 77.7,
              "x": 19.9,
              "y": 14.7,
              "id": "ponto-6f4cdl",
              "title": "Conferindo os dados do plano atual",
              "description": "• Plano: Exibe o nome do plano contratado atualmente (ex.: Plano básico).\n• Método de Pagamento: Mostra a forma de pagamento configurada (ex.: PIX). Clique na seta ao lado para alterar o método, se disponível.\n• Valor: Indica o valor recorrente da assinatura.\n• Data de Adesão: Data em que o plano foi contratado.\n• Última Cobrança / Próxima Cobrança: Datas da última fatura gerada e da próxima renovação automática.\n• Cancelar assinatura: Botão vermelho no canto superior direito para solicitar o cancelamento do plano."
            },
            {
              "h": 20.5,
              "w": 70.3,
              "x": 20.5,
              "y": 48.5,
              "id": "ponto-68rd0a",
              "title": "Histórico de faturas",
              "description": "Na parte inferior da tela, você visualiza todas as mensalidades geradas com as colunas Forma de Pagamento, Data Vencimento, Data Pagamento, Valor e a etiqueta de status (ex.: Pago)."
            },
            {
              "h": 7.8,
              "w": 6.9,
              "x": 91.3,
              "y": 49.1,
              "id": "ponto-aat4uc",
              "title": "Opções ",
              "description": "Clique em uma fatura em aberta para pagar - Boleto - Pix ou Cartão - pagamentos no pix libera sistema na hora."
            }
          ]
        }
      ],
      "position": 25
    }
  ]
};

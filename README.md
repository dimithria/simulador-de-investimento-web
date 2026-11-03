# InvesteSimples — Simulador de Investimentos

Aplicação web estática e educacional para explorar como aportes mensais e uma taxa hipotética de rendimento podem afetar a evolução de um patrimônio. Ela também apresenta uma distribuição ilustrativa do aporte entre categorias de Fundos de Investimento Imobiliário (FIIs), de acordo com um perfil selecionado.

O projeto foi inspirado na planilha `simulador-simples-de-investimento.xlsx`. Os cálculos são feitos no próprio navegador: não há servidor, banco de dados ou necessidade de criar uma conta.

## Estrutura do projeto

```text

simulador-de-investimento-web/
├── css/
│   └── style.css
└── js/
    └── script.js
├── README.md
├── index.html
```

### Responsabilidade de cada arquivo

- `index.html`: define o conteúdo da página, os campos de entrada, os indicadores, a tabela de cenários e os espaços dos gráficos. Também carrega as fontes, a folha de estilos e a biblioteca Chart.js.
- `css/style.css`: define cores, tipografia, cartões, formulários, gráficos e tabela, além do layout responsivo para telas menores.
- `js/script.js`: contém os valores iniciais, as fórmulas, as distribuições por perfil e a lógica que atualiza os resultados e os gráficos.
- `README.md`: documentação desta aplicação.

### Parâmetros da simulação

O painel **Parâmetros** permite informar:

| Parâmetro | Para que serve |
|---|---|
| Salário mensal | Calcula uma sugestão informativa de aporte equivalente a 30% do salário. |
| Aporte mensal | Valor usado na projeção do patrimônio e na divisão ilustrativa entre categorias de FIIs. |
| Prazo | Número de anos da projeção principal. |
| Taxa de rendimento mensal | Taxa usada para projetar o crescimento composto do patrimônio. |
| Rendimento mensal da carteira | Percentual aplicado ao patrimônio projetado para estimar dividendos mensais. |

Os valores iniciais são salário de **R$ 2.000**, aporte de **R$ 200**, prazo de **5 anos**, taxa de rendimento de **1,08% ao mês**, rendimento da carteira de **0,60% ao mês** e perfil **Conservador**. A sugestão de 30% do salário é exibida separadamente; ela não altera automaticamente o valor do aporte.

Ao editar os campos, os indicadores, a tabela e a alocação são recalculados. O botão **Restaurar valores iniciais** repõe os parâmetros e o perfil originais.

### Indicadores e visualizações

- **Patrimônio projetado:** valor futuro calculado para o prazo selecionado.
- **Dividendos mensais estimados:** patrimônio projetado multiplicado pelo rendimento mensal da carteira.
- **Total investido:** aporte mensal multiplicado pela quantidade de meses, sem incluir rendimentos.
- **Evolução do patrimônio:** gráfico de linha com pontos ao longo do período.
- **Simulação por período:** tabela que compara patrimônio e dividendos mensais estimados em 2, 5, 10, 20 e 30 anos. Esses prazos são fixos, independentemente do prazo informado no painel.
- **Alocação mensal em FIIs:** gráfico de rosca e lista com o valor e o percentual destinados a cada categoria no perfil selecionado.

### Perfis de alocação ilustrativa

As proporções abaixo são aplicadas ao aporte mensal:

| Categoria | Conservador | Moderado | Agressivo |
|---|---:|---:|---:|
| Papel | 30% | 32% | 30% |
| Tijolo | 10% | 35% | 0% |
| Híbridos | 10% | 8% | 10% |
| FOFs | 10% | 5% | 20% |
| Desenvolvimento | 20% | 10% | 30% |
| Hotelarias | 20% | 10% | 10% |
| **Total** | **100%** | **100%** | **100%** |

## Como os cálculos funcionam

O prazo em anos é convertido em meses (`n = anos × 12`). Para uma taxa mensal diferente de zero, o patrimônio projetado é calculado como uma série de aportes iguais feitos ao fim de cada mês:

```text
patrimônio = aporte mensal × ((1 + taxa mensal)^n - 1) / taxa mensal
```

Quando a taxa é zero, o cálculo é `aporte mensal × n`. O total investido é sempre `aporte mensal × n`, sem rendimentos. A estimativa de dividendos é `patrimônio × rendimento mensal da carteira`. A sugestão de aporte é `salário mensal × 30%`.

Os percentuais digitados para as taxas são convertidos para decimais antes dos cálculos (por exemplo, 1% passa a ser 0,01). Os valores monetários e percentuais são apresentados conforme a localidade brasileira.

## Tecnologias e dependências externas

- **HTML5** para a estrutura e os campos da página.
- **CSS3** para o visual e a adaptação a diferentes larguras de tela.
- **JavaScript** para cálculos e atualização dinâmica da interface.
- **Chart.js**, carregado pelo jsDelivr CDN, para os gráficos.
- **Google Fonts** para as fontes DM Sans e Manrope.

Chart.js e Google Fonts são recursos externos; é necessária uma conexão com a internet para carregá-los. Sem Chart.js, os cálculos e outros elementos da página continuam no código, mas os gráficos não são renderizados.

## Como executar localmente

1. Abra a pasta `simulador-de-investimento-web/`.
2. Abra `index.html` diretamente no navegador; ou use uma extensão como **Live Server** no VS Code.
3. Mantenha uma conexão com a internet para carregar os gráficos e as fontes externas.

Não é necessário instalar dependências ou executar um processo de build.

## ⚠️ Aviso e Limitações

Esta ferramenta serve somente para fins educacionais e planejamento hipotético. É uma projeção matemática, não uma previsão de retorno. O simulador não considera impostos, taxas, inflação, oscilações no preço das cotas, reinvestimento de dividendos separado, alterações nos rendimentos ou outros fatores de mercado. 
As distribuições por perfil são exemplos herdados da planilha de referência e **não são recomendação de investimento**. Rentabilidade passada ou projetada não garante resultados futuros.
## 👤 Autor

Desenvolvido por **Dimítria**.

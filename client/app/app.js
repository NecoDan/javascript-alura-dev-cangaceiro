/* Dica preciosa, quando trata-se de variáveis a serem trabalhadas em JS:
 * 1 - Use "const" sempre que possível;
 * 2 - Utilize "let" apenas se a variável precisa receber novas atribuições, exemplo, variável totalizadora 
 * 3 - Não use "var", pois a única maneira da variável ter escopo é quando declarada dentro de uma função
*/

// instância de classe NegociacaoController
const controller = new NegociacaoController();

// função que cria uma tabela e adiciona itens a partir da inserção nos formulários
document
    .querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller));


// função que apaga todos os itens da tabela já adicionados, zera a lista de negociações lançadas anteriormentes.
document
    .querySelector('#botao-apaga')
    .addEventListener('click', controller.apaga.bind(controller));
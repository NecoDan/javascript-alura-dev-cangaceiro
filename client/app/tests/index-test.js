/* Criando um array de campos que armazenará uma referência para cada um dos elementos 
de entrada do formulário. A busca	será feita através	de document.querySelector(), uma API do DOM que nos permite	buscar	elementos	através	de	seletores CSS */
var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
]

// seleciona o elemento table tbody da página
var tbody = document.querySelector('table tbody');

// função que cria uma tabela e adiciona itens a partir da inserção nos formulários
document.querySelector('.form').
addEventListener('submit', (event) =>{
    // cancelando a submissão do formulário
    event.preventDefault();

    // adiciona a tr no tbody (corpo principal da página)
    tbody.appendChild(criaLinhaTr());
    limpaCampos();
});

function criaLinhaTr(){
    // cria um tr 
    var tr = document.createElement('tr');

    // iterando sobre a classe campos
    this.campos.forEach((campo) =>{
        // cria uma td sem informações
        var td = document.createElement('td');

        // atribui o valor do campo à td
        td.textContent = campo.value;

        // adiciona a td na tr
        tr.appendChild(td);
    });

    // as posições 1 e 2 do array armazenam campos 
    var valor = this.campos[1].value;
    var qtde = this.campos[2].value;

    // nova td que armazena o volume da negociação
    var tdVolume = document.createElement('td');
    tdVolume.textContent = (calculaVolume(valor, qtde));

    // adiciona a tdVolume na tr
    tr.appendChild(tdVolume);
    return tr;
}

function calculaVolume(valor, qtde) {
    var volume = (valor * qtde);
    return volume;
}

function limpaCampos() {
    // limpa o campo data
    this.campos[0].value = '';
    // limpa o campo quantidade, inicializando pelo menos com 1 quantidade
    this.campos[1].value = 1;
    // limpa o campo valor
    this.campos[2].value = 0;
    // define o focus inicial no campo data
    this.campos[0].focus();
}
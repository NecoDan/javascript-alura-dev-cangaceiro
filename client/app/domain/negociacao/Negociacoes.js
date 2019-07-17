// Classe Domínio Negociacoes - classe que encapsula o array de negociações de uma instância de Negociacao
class Negociacoes {

    // constructor(armadilha) {}

    constructor() {
        this.inicializar();
    }
    
    inicializar() {
        this._negociacoes = [];
        this._armadilha = false;
        
        /* Congelando o objeto (instância) referenciando a ele mesmo, tornando o "imutável"*/
        Object.freeze(this);
    }

    inicialiazaComArmadilha() {
        /* Armadilhas: maneira de colocarmos a lógica de atualização de uma View sempre que o modelo/domínio for atualizado.
         * Isto é, são funções que são chamadas em métodos que alteram o estado do modelo/dominio.
         */
        // this._armadilha = armadilha;
    }

    /////////////////////////////// Getters & Setters
    get volumeTotalSemReduce() {
        let volumeTotal = 0;

        for (let iterator = 0; iterator < this._negociacoes.length; iterator++)
            volumeTotal += this._negociacoes[iterator].volume;

        return volumeTotal;
    }

    get volumeTotalComReduce() {
        // Utilizando o mecanismo "reduce()": permite reduzir todos os elementos do array a único valor com a função reduce().
        return this._negociacoes.reduce(
            (volumeTotal, negociacao) =>
            volumeTotal + negociacao.volume, 0
        );
    }

    /////////////////////////////// Métodos De Ação
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    adicionaComArmadilha(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }

    // Retorna uma nova referência criada com os itens do array this._negociacoes
    paraArrayNegociacoes() {
        /* Ao passar o array desta, dentro do método "concat()", o retorno será uma nova lista, um novo "array". Isto é, nada acontece com a lista encapsulada 
         * pela instância de Negociacoes, pois estamos modificando uma cópia do array, e não o array original. 
         */

        return [].concat(this._negociacoes);
    }

    removeAll() {
        this._negociacoes.length = 0;
    }

    removeAllComArmadilha() {
        this._negociacoes.length = 0;
        this._armadilha(this);
    }

}
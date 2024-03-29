// Classe Domínio Negociação
class Negociacao {

    constructor(_data, _quantidade, _valor) {
        Object.assign(this, {
            _quantidade,
            _valor
        });

        /* Criando uma nova data, uma nova referência, para que o objeto data torne-se imutável. 
        Por meio da programação defensiva: retorna um novo objeto Date toda vez que o getter da data for acessado*/
        this._data = new Date(_data.getTime()),

        /* Congelando o objeto referenciando a ele mesmo, tornando o "imutável"*/
        Object.freeze(this);
    }

    /////////////////////////////// Getters

    /* Criando uma nova data, uma nova referência, para que o objeto data torne-se imutável.
       Por meio da programação defensiva: retorna um novo objeto Date toda vez que o getter da data for acessado*/
    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    /////////////////////////////// Métodos De Ação 
    get volume() {
        return (this._quantidade * this._valor);
    }

    isCongelado() {
        return Object.isFrozen(this);
    }

}
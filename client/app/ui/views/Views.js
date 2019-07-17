class Views {

    constructor(seletor) {
        // Adicionando ao construtor um seletor CSS. Com o intuito, a partir do seletor, buscar o elemento do DOM guardando-o na propriedade this._elemento.
        this._elemento = document.querySelector(seletor);
    }

    /* Atualmente, o innerHTML é bem performático.No entanto, se a quantidade de dados  a ser renderizada for exorbitante, a solução de incluir cada "<tr>" individualmente
    se destacaria, apesar de mais verbosa. Porém,é uma boa prática utilizar paginação quando trabalhamos com uma massa de dados considerável, o que minimizaria possíveis 
    problemas de performance do innerHTML. */

    // Mètodo "update": O mesmo funcionamento que um método setter
    update = function (modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

    template = function(modelo){
        throw new Error('Você precisa implementar o método template() por contrato, de acordo com o nivel de abstração estabelecido por POO, via classes abstratas.');
    }

}
class MensagemView extends Views {

    // Método "template": Criando uma "template engine" somente com JS
    template = function (modelo) {
        return modelo.texto ? `<p class='alert alert-info'>${modelo.texto}</p>` : `<p></p>`;
    }

}
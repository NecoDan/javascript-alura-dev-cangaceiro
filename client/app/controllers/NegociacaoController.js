class NegociacaoController {

    /* Com o intuito de torná-lo mais perfomático e aplicando boas práticas: Adiciona-se ao construtor da classe os elementos de entrada.
     * Ao invés de criar variáveis, cria-se propriedades em "this", isto é, na busca pelos elementos do DOM só serão realizadas uma única vez no próprio construtor.
     * De sorte que, essas propriedades só fazem sentido ao serem acessadas pela própria classe "NegociacaoController".
     * Logo, temos a boa prática da convenção para propriedades privadas.
     */
    constructor() {
        this.inicializar();
    }

    inicializar() {
        /* Uma breve homenagem ao JQuery, com $
         * Função bind: trata o "querySelector" como uma função separada, mas que ainda mantém o "document" como seu contexto. 
         */
        const $ = document.querySelector.bind(document);

        // Passando para o construtor o seletor CSS de ID
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this.inicializarDependencias();
    }

    /*Criação e inicialização das instâncias */
    inicializarDependencias() {
        // this.iniciaArrayNegociacoesComArrowFunction();
        // this.inicializaAPartirPatternProxyMetodoArmadilhaSubstituto();

        this.inicializaAPartirPatternProxyEFactoryMetodoArmadilhaSubstituto();
        this.inicializaECarregaMensageriaProxyEFactory();
    }

    inicializaAPartirPatternProxyEFactoryMetodoArmadilhaSubstituto() {
        this._negociacoes = new BindUtil(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'), // passamos para o construtor o seletor CSS de ID
            'adiciona', 'removeAll'
        );
    }

    inicializaECarregaMensageriaProxyEFactory() {
        // Criação e inicialização da instância da View referente a exibição das mensagens dos eventos
        this._mensagem = new BindUtil(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        );
    }

    inicializaAPartirPatternProxyMetodoArmadilhaSubstituto() {
        const self = this;
        this._negociacoes = new Proxy(new Negociacoes(), {

            get(target, propriedade, receiver) {

                // verifica-se a propriedade que está sendo interceptada é uma função/método por meio do "typeof"
                // testando também se a propriedade está incluída na lista de métodos que deseja-se interceptar por meio do método "includes()" do array

                if (typeof (target[propriedade]) == typeof (Function) && ['adiciona', 'removeAll'].includes(propriedade)) {

                    // retorna uma nova função com contexto dinâmico (função substituta). Antes que o apply aplicado por padrão pelo interceptador seja chamado
                    return function () {
                        console.log(`${propriedade} disparou a armadilha`);

                        // sendo target é a instância real de Negociacoes.
                        target[propriedade].apply(target, arguments);
                        self._negociacoesView.update(target); // Atualizando a view        
                    }
                } else {

                    // realizando um GET padrão: se é propriedade/atributo, retorna o valor normalmente
                    return Reflect.get(target, propriedade);
                }
            }
        });
    }

    adiciona(event) {
        try {
            event.preventDefault();

            // Add uma instẫncia de Negociação, em uma lista encapsulada de Negociacoes
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso.';

            this._limpar();
            
        } catch (error) {
            console.log(error);
            console.log(error.stack);

            if(error instanceof DataInvalidException){
                this._mensagem.texto = error.message;
            } else{
                this._mensagem.texto = 'Um erro não esperado ocorreu. Entre em contato com o suporte.';
            }
        }
    }

    apaga(event) {
        this._negociacoes.removeAll();
        this._mensagem.texto = 'Negociações removidas com sucesso.';

        this._limpar();
    }

    /* Passando a estratégia a ser utilizada - Empregando uma "arrow function", não apenas por ser uma maneira sucinta de escrever-se função em JS, 
     * mas também por possuir uma característisca única, o escopo do seu "this" é "léxico (estático)" em vez de dinâmico.
     * O "this" de uma "arrow function" obtém seu valor do "código ao redor", mantendo este valor independente do lugar onde é chamado.
     * O "this" da função "armadilha" passada aponta para a instância da classe "NegociacaoController". 
     */
    iniciaArrayNegociacoesComArrowFunction() {
        // this._negociacoes = new Negociacoes(modelo => {
        //     this._negociacoesView.update(modelo); // Atualizando a view        
        // });
    }

    // Definição de um método PRIVADO com o underline(_): _criaNegociacao()
    _criaNegociacao() {
        let data = DateUtil.converterTextoEmDataFuncional(this._inputData.value);

        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        return negociacao;
    }

    // Definição de um método PRIVADO com o underline(_): _limpar()
    _limpar() {
        // limpa o campo data
        this._inputData.value = '';
        // limpa o campo quantidade, inicializando pelo menos com 1 quantidade
        this._inputQuantidade.value = 1;
        // limpa o campo valor
        this._inputValor.value = 0.0;
        // define o focus inicial no campo data
        this._inputData.focus();
    }

}
class ControllerTeste {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*Demais Métodos Principais*/
    static exibeLog = function (value) {
        console.log(value);
    }

    static mostraNaPagina = function (value) {
        document.write()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static testaNegociacaoModelo = function () {
        this.exibeLog("testaNegociacaoModelo");
        let hoje = new Date();
        let negociacao = new Negociacao(hoje, 100, 25.00);

        this.exibeLog(negociacao);
        this.exibeLog("Quantidade = " + negociacao.quantidade);
        this.exibeLog("Valor = " + negociacao.valor);
        this.exibeLog("Data = " + negociacao.data);
        this.exibeLog("Volume = " + negociacao.volume);

        hoje.setDate(11);
        this.exibeLog("Data = " + negociacao.data);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static testaDataComDateEAlteraValorDoDate = function () {
        this.exibeLog("testaDataComDateEAlteraValorDoDate");
        var dtHoje = new Date();
        this.exibeLog(dtHoje);

        var negociacao = new Negociacao(dtHoje, 500, 550.00);
        this.exibeLog(negociacao.data);

        dtHoje.setDate(11);
        this.exibeLog(dtHoje);
        this.exibeLog(negociacao.data);
    }

    static testaConversaoDataQuandoString = function () {
        let data = undefined;
        console.log(data);

        var dataString = '2019-06-24';
        var lista = dataString.split('-');
        lista = lista.join(',');
        console.log(lista);
    }

    static testaCriacaoData = function () {
        var dataString = '2019-06-24';
        exibeLog(dataString);

        let dataTeste = new Date(dataString);
        exibeLog(dataTeste);

        let dataTeste1 = new Date(dataString.split('-'));
        exibeLog(dataTeste1);

        let dataTeste2 = new Date(dataString.replace(/-/g, ','));
        exibeLog(dataTeste2);

        // os meses em JS são decrementando em -1, exemplo janeiro(0) ou dezembro(11);
        let dataTeste3 = new Date(2019, 6, 24);
        exibeLog(dataTeste3);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* O método Object.assign() é usado para copiar os valores de todas as propriedades próprias
    enumeráveis de um ou mais objetos de origem para um objeto destino. Ele retornará o objeto
    destino. */

    /* var dest = {nome: 'Daniel'};
    var orig = {idade: 30};

    var copia = Object.assign({}, dest, orig);
    console.log(copia);

    var origem = {idade: 30};
    var destino = {nome: 'Daniel'};

    Object.assign(destino, origem);
    console.log(destino); */

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* propriedade de objetos literais*/

    /* var perfil = 'Daniel';
    var objeto = {
        perfil: perfil
    };
    console.log(objeto);

    var objeto = {
        perfil
    };
    console.log(objeto); */

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* escopo de bloco com a declaracao tipada VAR*/

    /* for (var i = 1; i <= 100; i++) {
        document.write(i);
    }
    document.write(i);

    function exibeNome(){
        var nome = 'Daniel';
        document.write(nome);
    }

    exibeNome();
    document.write(nome);

    function funcaoVar1(){
        document.write("<br>" + nome);
        var nome = 'Daniel;'
    }

    this.funcaoVar1();

    function funcaoVar2(){
        if(!nome){
            var nome = 'Daniel';
        }
        
        document.write("<br>" + nome);
    }
    this.funcaoVar2(); */


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* escopo de bloco com a declaracao tipada LET*/

    /* for (let i = 1; i <= 100; i++) {
        console.log(i);
    }
    document.write(i);

    for (let i = 1; i <= 100; i++) {
        let nome = 'Daniel';
        console.log(i);
    }
    document.write(i);
    document.write(nome); 

    function funcaoLet1() {
        let nome = 'Daniel';
        let nome = 'Santos';
    }
    this.funcaoLet1();

    let nome = 'Daniel';

    function funcaoLet2() {
        let nome = 'Santos';
        document.write(nome);
    }
    this.funcaoLet2();
    document.write(nome);
    */

    /* function funcaoLet3(){
        let nome = undefined;
        document.write(nome);
        nome = 'Daniel';
    }
    this.funcaoLet3(); */

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* O padrão de projeto Proxy / Aprendendo trabalhar com Proxy / Construindo armadilhas de leitura / Contruindo armadilhas de escrita*/
    static testaPadraoProxyEHandler() {
        console.log("Chegou aqui: testaPadraoProxyEHandler()");

        const negociacao = new Proxy(new Negociacao(new Date, 2, 100), {
            /* Params do método de leitura: GET
             * target: referência para o objeto encapsulado pelo Proxy, o objeto e/ou instância verdadeira
             * prop: string com o nome da propriedade/atributo que está sendo acessada
             * receiver: uma referência para o próprio Proxy (instância)(
             */
            get(target, propriedade, receiver) {
                console.log(`a propriedade "${propriedade}" caiu na armadilha`);
                return target[propriedade];
            },

            /* Params do método de escrita: SET
             * target: referência para o objeto encapsulado pelo Proxy, o objeto e/ou instância verdadeira
             * prop: string com o nome da propriedade/atributo que está sendo acessada no Proxy
             * value: valor que está sendo atribuido a propriedade que está sendo acessada no Proxy
             * receiver: uma referência para o próprio Proxy (instância)
             */
            set(target, propriedade, value, receiver) {
                console.log(`${propriedade} guarda ${target[propriedade]}, receberá ${value}`);
                target[propriedade] = value;
                return target[propriedade] == value;
            }
        });

        negociacao._quantidade = 100;
        negociacao._valor = 2000;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* Trabalhando com API "Reflect": centraliza uma série de métodos estáticos que permitem a leitura, escrita e chamada de métodos 
     * e funções dinamicamente, tais como: "Reflect.set()" 
     */
    static testaPadraoProxyEHandlerComReflect() {
        console.log("Chegou aqui: testaPadraoProxyEHandlerComReflect()");

        const negociacao = new Proxy(new Negociacao(new Date, 2, 100), {
            /* Params do método de leitura: GET
             * target: referência para o objeto encapsulado pelo Proxy, o objeto e/ou instância verdadeira
             * prop: string com o nome da propriedade/atributo que está sendo acessada
             * receiver: uma referência para o próprio Proxy (instância)
             */
            get(target, propriedade, receiver) {
                console.log(`a propriedade "${propriedade}" caiu na armadilha`);
                return Reflect.get(target, propriedade);
            },

            /* Params do método de escrita: SET
             * target: referência para o objeto encapsulado pelo Proxy, o objeto e/ou instância verdadeira
             * prop: string com o nome da propriedade/atributo que está sendo acessada no Proxy
             * value: valor que está sendo atribuido a propriedade que está sendo acessada no Proxy
             * receiver: uma referência para o próprio Proxy (instância)
             */
            set(target, propriedade, value, receiver) {
                console.log(`${propriedade} guarda ${target[propriedade]}, receberá ${value}`);
                return Reflect.set(target, propriedade, value);
            }
        });

        negociacao._quantidade = 100;
        negociacao._valor = 2000;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* Construindo armardilhas para métodos: uso "typeof", "includes", "apply", "arguments"
     * Definindo um método/função substituta para burlar o JavaScript
     */
    static testaPadraoProxyEHandlerChamandoFuncaoSubstituta() {
        console.log("iniciou aqui...");
        const negociacoes = new Proxy(new Negociacoes(), {

            get(target, propriedade, receiver) {
                console.log("GET...");

                // verifica-se a propriedade que está sendo interceptada é uma função/método por meio do "typeof"
                // testando também se a propriedade está incluída na lista de métodos que deseja-se interceptar por meio do método "includes()" do array
                if (typeof (target[propriedade]) == typeof (Function) && ['adiciona', 'removeAll'].includes(propriedade)) {
                    // retorna uma nova função com contexto dinâmico (função substituta). Antes que o apply aplicado por padrão pelo interceptador seja chamado
                    return function () {
                        console.log(`${propriedade} disparou a armadilha`);
                        target[propriedade].aplly(target, arguments);
                    }
                } else {
                    // realizando um GET padrão: se é propriedade/atributo, retorna o valor normalmente
                    return Reflect.get(target, propriedade);
                }
            },

            set(target, propriedade, value, receiver) {
                console.log("SET...");
                console.log(`${propriedade} guarda ${target[propriedade]}, receberá ${value}`);
                return Reflect.set(target, propriedade, value);
            }
        });

        negociacoes.adiciona(new Negociacao(new Date(), 1, 100));
        console.log("finalizando aqui");
    }


}
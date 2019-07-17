class ProxyFactory {

    /* Params create()
     * objeto: objeto alvo do proxy 
     * props: array com os métodos que desejamos interceptar
     * armadilha: uma função que desejamos que execute para os métodos presentes do array props
     */
    static create(objeto, props, armadilha) {

        // recebe o "objeto" original como parâmetro
        return new Proxy(objeto, {

            get(target, prop, receiver) {

                // verifica-se a propriedade que está sendo interceptada é uma função/método por meio do "typeof"
                // testando também se a propriedade está incluída na lista de métodos que deseja-se interceptar por meio do método "includes()" do array
                // usa o array "props" para realizar o includes    

                if (ProxyFactory.isFunction(target[prop]) && props.includes(prop)) {

                    // retorna uma nova função com contexto dinâmico (função substituta). Antes que o apply aplicado por padrão pelo interceptador seja chamado
                    return function () {
                        console.log(`${prop} disparou a armadilha`);

                        // sendo target é a instância real do "objeto" original passado como parâmetro.
                        target[prop].apply(target, arguments);

                        // executa a armadilha que recebe o objeto original
                        armadilha(target);
                    }
                } else {

                    // realizando um GET padrão: se é propriedade/atributo, retorna o valor normalmente
                    return Reflect.get(target, prop);
                }
            },

            set(target, prop, value, receiver) {
                const updated = Reflect.set(target, prop, value);

                if (props.includes(prop)) {
                    console.log(`${prop} guarda ${target[prop]}, receberá ${value}`);

                    // executa a armadilha que recebe o objeto original
                    armadilha(target);
                }

                return updated;
            }
        });
    }

    static isFunction(funcao) {
        return (typeof (funcao) == typeof (Function));

    }
}
/* class BindUtil
 * Responsável por associar um modelo/domínio com a View. Também, por executar ações de "update" (atualização ou mudanças) automaticamente entre a View e o modelo/domínio
 */

class BindUtil {

    /* Params construtor()
     * modelo: objeto do modelo associado 
     * view: referência que deve ser atualizada a cada mudança do modelo
     * props: parâmetro REST, array com os nomes de propriedades/atributos e métodos que devem disparar a atualização
     */
    constructor(modelo, view, ...props) {
        // Cria-se um proxy por meio do ProxyFactory

        const proxy = ProxyFactory.create(modelo, props, modelo => {

            // Toda View na aplicação possui o método "update()" que recebe um "modelo/dominio", chamamos, portanto, o método "update()" na armadilha do proxy criado.
            view.update(modelo)
        });

        // Força-se uma chamada ao método "update()" da View
        view.update(modelo);

        // Em JS, um construtor pode retornar um objeto de um tipo diferente da classe à qual pertence. Magia do JS!
        // Retornar-se o objeto proxy criado no construtor
        return proxy;
    }

    /* Sobre o parâmetros REST, quando o adicionamos, antes do último parâmetro, estamos indicando que todos os parâmetros a partir do terceiro, inclusive,
     * serão considerados como fazendo parte de um "array". Isso torna flexível a quantidade de parâmetros que um método ou função pode receber. No entanto,
     * só pode ser utilizado o operator no último parâmetro
     */

}
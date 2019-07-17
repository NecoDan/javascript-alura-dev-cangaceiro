class DateUtil {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static converterDataEmTexto (data) {
        let dataDiaMesAno = data.getDate() +
            "/" + (data.getMonth() + 1) +
            "/" + data.getFullYear();

        return dataDiaMesAno;
    }

    static converterDataEmTextoFuncional (data) {
        /* Utilizando o mecanimo de "template literal": permite declarar-se "string" de uma forma diferente, evitando o processo de concatenação.
           Por meio do maquinismo da interpolação, isto é, a expressão interpola o conteúdo das variáveis
         */
        let dataDiaMesAno = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
        return dataDiaMesAno;
    }

    static converterTextoEmData (textoData) {
        // 1* - Utilizando o "spread operator": permite tratar cada elemento do array como um elemento individualmente.
        // 2* - Utilizando o  "map": que atua cada elemento do array, retornando um novo array no final, podendo disponibilizar a posição do elemento a partir do segundo parâmetro
        let novaData = new Date(
            ...textoData
            .split('-')
            .map((item, indice) => { // 3* - Utilizando o "arrow functions": forma diferente de declarar funções, removendo a palavra reservada "function"
                return item - (indice % 2);
            })
        );

        return novaData;
    }

    static converterTextoEmDataFuncional (textoData) {
        if(!/\d{2}\/\d{2}\/\d{4}$/.test(textoData))
            throw new DataInvalidException();

        // 1* - Utilizando o "spread operator": permite tratar cada elemento do array como um elemento individualmente.
        // 2* - Utilizando o  "map": que atua cada elemento do array, retornando um novo array no final, podendo disponibilizar a posição do elemento a partir do segundo parâmetro
        let novaData = new Date(
            ...textoData
            .split('/')
            .reverse()          // 3* - Invertendo as ordens dos elementos com a função "reverse()"
            .map((item, indice) => item - (indice % 2)) // 4* - Utilizando o "arrow functions": forma diferente de declarar funções, removendo a palavra reservada "function"
        );

        return novaData;
    }


}
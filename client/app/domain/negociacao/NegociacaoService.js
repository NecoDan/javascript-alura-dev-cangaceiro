class NegociacaoService {

    obterNegociacoesDaSemana(varCallback) {
        // instância de XMLHttpRequest
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', 'negociacoes/semana');

        // função de configuração antes de envio da requisição
        xmlHttpRequest.onreadystatechange = () => {
            /* Estados retornados pelo servidor após efetuada a requisição
                0: requisição ainda não inicializada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisição
                4: requisição está concluída e a resposta está pronta                
            */

            if (xmlHttpRequest.readyState == 4) {
                if (xmlHttpRequest.status == 200) {
                    console.log('Obtendo as negociações do servidor...');

                    // realizando o parse com o JSON
                    console.log(JSON.parse(xmlHttpRequest.responseText));

                    // convertendo cada objeto para uma instância de Negociacao
                    const negociacoes = JSON
                    .parse(xmlHttpRequest.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                    varCallback(null, negociacoes);
                } else {
                    console.log(xmlHttpRequest.responseText);
                    varCallback('Não foi possível obter as negociações da semana.', null);
                }
            }
        };

        xmlHttpRequest.send();
    }

}
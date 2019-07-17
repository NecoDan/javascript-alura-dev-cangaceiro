class NegociacoesView extends Views{

    // Criando uma "template engine" somente com JS
    template = function (modelo) {
        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR (R$)</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        <tbody>
            <!-- Realizando conversão por meio do "map()" a partir do array() -->
            ${modelo.paraArrayNegociacoes().map(negociacao =>
                `
                <tr>
                <td>${DateUtil.converterDataEmTextoFuncional(negociacao.data)}</td>
                <td>${negociacao.quantidade}</td>
                <td>${negociacao.valor}</td>
                <td>${negociacao.volume}</td>                
                </tr>
                `
            // Realizando a concatenação dos elementos  por meio do "join()" a partir do array()
            ).join('')}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"></td>
                <td>${modelo.volumeTotalComReduce}</td>
            </tr>
        </tfoot>
    </table>`
    }

}
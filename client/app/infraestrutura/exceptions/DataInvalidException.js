class DataInvalidException extends ApplicationException {

    constructor() {
        super('A data deve estar no formato dd/MM/aaaa');
    }

}
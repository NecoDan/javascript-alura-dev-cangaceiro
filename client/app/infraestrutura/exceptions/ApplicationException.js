class ApplicationException extends Error {

    constructor(msg = '') {
        super(msg);

        // Responsável por ajustar o nome do erro!
        this.name = this.constructor.name;
    }
}
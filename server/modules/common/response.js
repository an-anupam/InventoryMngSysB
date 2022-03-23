export default class Response {
    constructor() {
        this.success = null;
        this.data = null;
        this.errorCode = null;
        this.errorMessage = null;
    }

    setError(errorCode, errorMessage, data) {
        this.success = false;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.data = data;
    }

    setSuccess(data) {
        this.success = true;
        this.data = data;
        this.errorCode = null;
        this.errorMessage = null;
    }
}
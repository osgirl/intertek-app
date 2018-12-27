import { uniqueId, isString } from 'lodash';

const defaultMessage =
    'An unknown error occured. Please try again later or contact support.';

export default class ErrorModel {
    constructor(data) {
        const title = isString(data) ? data : data.title;
        const messages = !isString(data)
            ? data.messages.map((m) => ({ id: uniqueId('error-message-'), text: m }))
            : [];

        this.title = title || null;
        this.messages = messages || [];
    }

    static fromException(exception) {
        const title = exception && exception.error && exception.error.publicMessage
            ? exception.error.publicMessage
            : defaultMessage;
        const messages = exception.publicErrors
            ? exception.publicErrors
            : [];
        return new ErrorModel({ title, messages });
    }
}

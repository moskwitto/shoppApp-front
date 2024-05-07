export interface ResponseModel {
    /**
     * The response status.
     */
    status: ResponseStatus,

    /**
     * The error message, if any.
     */
    message?: string
}

export enum ResponseStatus {
    SUCCESS = 'success',
    ERROR = 'error'
}

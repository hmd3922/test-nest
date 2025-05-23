export interface ResponseInterface<T = any> {
    code: number;
    data?: T;
    message: string;
}
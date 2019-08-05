export interface Options {
    collapsed: boolean;
}
export interface Logger {
    log(message?: any, ...optionalParams: any[]): void;
    group(...label: any[]): void;
    groupEnd(...label: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

export interface drivhusint {

    readonly id: number;
    readonly temp: number;
    readonly humi: number;
}

export interface RootObject {
    id: number;
    warningstype: string;
    status: string;
}
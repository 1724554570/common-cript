export interface Users {
    uuid?: string;
    username: string;
    password: string;
    age: number;
    sex: string;
    valid?: number | 1;
    atime?: number;
    utime?: number;
    created?: number;
    updated?: number;
}

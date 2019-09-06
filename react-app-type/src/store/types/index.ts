export interface UserModel {
    id?: string;
    name: string;
    completed: boolean;
}

export interface ICountState {
    count: number;
}

export interface StoreState {
    languageName: string;
    enthusiasmLevel: number;
}

export interface IStoreState {
    count: ICountState
}
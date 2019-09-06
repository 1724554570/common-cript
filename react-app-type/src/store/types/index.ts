export interface UserModel {
    id?: string;
    name: string;
    completed: boolean;
}

export interface CountModel {
    count: number;
}

export interface StoreState {
    languageName: string;
    enthusiasmLevel: number;
}
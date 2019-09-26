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

// 
export interface IAction {
    type: string,
    payload: any;
}

export interface IGlobalStoreState {
    globalSyncId: string;
    globalAsyncId: string;
}
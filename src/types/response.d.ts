declare type Res<T> = {
    code: number;
    msg: string;
    curPage?: number;
    pageSize?: number;
    totalSize?: number;
    total?: null;
    data: T;
};

declare type Data<T> = {
    pageNumber?: number;
    pageSize?: number;
    total?: null;
    records: T;
};
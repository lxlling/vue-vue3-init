import service from './service';

function request<Data>(config: Record<any, any>): Promise<Data> {
    return service(config).then((response) => {
        return response as unknown as Data;
    });
}

export default request;

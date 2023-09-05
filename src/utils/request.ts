interface requestType {
    method: 'GET' | 'POST' | 'DELETE';
    path?: string;
    data?: object;
}
const IP = '192.168.209.182';
const API_BASE_URL = `http://${IP}:8080`;
function Api() {
    function get(path: string) {
        const obj: requestType = {
            method: 'GET',
        };
        return request(obj, path);
    }
    function post(path: string, data: any) {
        const obj: requestType = {
            method: 'POST',
            data: data,
        };
        return request(obj, path);
    }
    function deleteOrder(path: string) {
        const obj: requestType = {
            method: 'DELETE',
        };
        return request(obj, path);
    }
    function deleteData(path: string) {
        const obj: requestType = {
            method: 'DELETE',
        };
        return request(obj, path);
    }
    function rendImageSrc(name: string) {
        return API_BASE_URL + '/' + name;
    }
    function request(obj: any, path: string) {
        return new Promise((resolve, reject) => {
            uni.request({
                url: API_BASE_URL + path,
                ...obj,
                header: {
                    'Content-Type': 'application/json',
                },
                success: (res: any) => {
                    if (res.data.code === 200) {
                        resolve(res.data.data);
                    }
                },
                fail: (err: any) => {
                    reject(err);
                },
            });
        });
    }
    return {
        get,
        deleteOrder,
        post,
        deleteData,
        rendImageSrc,
    };
}

export { Api };

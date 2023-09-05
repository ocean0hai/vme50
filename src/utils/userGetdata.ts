import { onMounted, ref } from 'vue';
import { Api } from './request';
export function useGetdata(getPath: string, deletepath?: string) {
    const { get, deleteData } = Api();
    const data = ref<Array<any>>([]);
    onMounted(() => {
        getData();
    });
    async function getData() {
        await get(getPath)
            .then((res: any) => {
                data.value = res;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function deleteFun(id: string) {
        deleteData(deletepath + id).then((res) => {
            getData();
            console.log(res);
        });
    }
    return {
        data,
        deleteFun,
    };
}

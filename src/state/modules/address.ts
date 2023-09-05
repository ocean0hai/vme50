import { defineStore } from 'pinia';
import { ref } from 'vue';
interface addType {
    id: string;
    name: string;
    number: string;
    address: string;
    checked?: boolean;
}
export const AddressInfo = defineStore('AddressInfo', () => {
    const addressArr = ref<Array<addType>>([
        {
            id: '1',
            name: '张三',
            number: '12345678901',
            address: '如皋市某区某地址',
            checked: true,
        },
        {
            id: '2',
            name: '李四',
            number: '12345678901',
            address: '常熟市某路某地址',
            checked: false,
        },
    ]);

    function addData(obj: addType) {
        if (checkData(obj['address'], 'address') === -1) {
            if (addressArr.value.length === 0) {
                obj.checked = true;
            } else {
                obj.checked = false;
            }
            addressArr.value.push(obj);
        }
    }
    function editData(obj: addType) {
        const key = checkData(obj['id'], 'id');
        if (key !== -1) {
            addressArr.value[key] = obj;
        }
    }

    function deleteData(id: string) {
        const index = checkData(id, 'id');
        addressArr.value.splice(index, index + 1);
    }
    function chechBox(id: string) {
        for (let i = 0; i < addressArr.value.length; i++) {
            addressArr.value[i].checked = addressArr.value[i].id === id;
        }
    }
    function checkData(value: string, key: keyof addType) {
        let index = -1;
        addressArr.value.map((item, i) => {
            if (value === item[key]) {
                index = i;
            }
        });
        return index;
    }
    return {
        addressArr,
        addData,
        chechBox,
        editData,
        deleteData,
    };
});
